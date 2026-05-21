(function attachAgendaRules(global) {
  function toMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function toTime(minutes) {
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  }

  function rangesOverlap(startA, endA, startB, endB) {
    return startA < endB && endA > startB;
  }

  function isBlockingAppointment(appointment) {
    return appointment.status !== "Cancelada" && appointment.status !== "Finalizada";
  }

  function isSlotFree({
    professionalName,
    startTime,
    duration,
    date,
    team,
    appointments,
    blocks,
    ignoredAppointmentId = "",
    getAppointmentId,
  }) {
    const person = team.find((item) => item.name === professionalName);
    const start = toMinutes(startTime);
    const end = start + duration;

    if (!person || start < toMinutes(person.workStart) || end > toMinutes(person.workEnd)) {
      return false;
    }

    const hasAppointmentConflict = appointments.some((appointment) => {
      if (getAppointmentId(appointment) === ignoredAppointmentId) {
        return false;
      }

      if (
        appointment.date !== date ||
        appointment.professional !== professionalName ||
        !isBlockingAppointment(appointment)
      ) {
        return false;
      }

      const appointmentStart = toMinutes(appointment.time);
      const appointmentEnd = appointmentStart + appointment.duration;
      return rangesOverlap(start, end, appointmentStart, appointmentEnd);
    });

    if (hasAppointmentConflict) {
      return false;
    }

    return !blocks.some((block) => {
      if (block.date !== date || block.professional !== professionalName) {
        return false;
      }

      return rangesOverlap(start, end, toMinutes(block.start), toMinutes(block.end));
    });
  }

  function getAvailableSlots({
    service,
    preferredProfessional = "Cualquiera",
    ignoredAppointmentId = "",
    date,
    businessHours,
    team,
    appointments,
    blocks,
    getAppointmentId,
    limit = 9,
  }) {
    if (!service) {
      return [];
    }

    const professionals =
      preferredProfessional === "Cualquiera"
        ? service.professionals
        : service.professionals.filter((name) => name === preferredProfessional);

    const slots = [];
    for (
      let minutes = toMinutes(businessHours.start);
      minutes + service.duration <= toMinutes(businessHours.end);
      minutes += businessHours.step
    ) {
      const time = toTime(minutes);
      const freeProfessionals = professionals.filter((name) =>
        isSlotFree({
          professionalName: name,
          startTime: time,
          duration: service.duration,
          date,
          team,
          appointments,
          blocks,
          ignoredAppointmentId,
          getAppointmentId,
        }),
      );

      if (freeProfessionals.length) {
        slots.push({
          time,
          professionals: freeProfessionals,
          label:
            freeProfessionals.length === 1
              ? freeProfessionals[0]
              : `${freeProfessionals.length} profesionales libres`,
        });
      }
    }

    return slots.slice(0, limit);
  }

  global.TurniaAgendaRules = {
    toMinutes,
    toTime,
    rangesOverlap,
    isBlockingAppointment,
    isSlotFree,
    getAvailableSlots,
  };
})(window);
