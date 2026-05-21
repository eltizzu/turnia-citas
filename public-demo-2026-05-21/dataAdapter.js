(function attachDataAdapter(global) {
  const statusMap = {
    Pendiente: "pending",
    Confirmada: "confirmed",
    Finalizada: "completed",
    Cancelada: "cancelled",
    "No asistio": "no_show",
  };

  function slugify(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function stableId(prefix, value) {
    const slug = slugify(value) || "item";
    let hash = 0;
    for (const character of String(value || "")) {
      hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
    }
    return `${prefix}_${slug}_${hash.toString(36)}`;
  }

  function toCents(value) {
    return Math.round(Number(value || 0) * 100);
  }

  function addMinutes(time, minutesToAdd) {
    const [hours, minutes] = time.split(":").map(Number);
    const total = hours * 60 + minutes + minutesToAdd;
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  }

  function mapDemoToProduction(demoState, options = {}) {
    const businessId = options.businessId || stableId("business", demoState.business.slug || demoState.business.name);

    const business = {
      id: businessId,
      name: demoState.business.name,
      slug: demoState.business.slug,
      city: demoState.business.city,
      phone: demoState.business.phone,
      timezone: options.timezone || "Europe/Madrid",
      settings: {
        businessHours: demoState.businessHours,
        minNotice: demoState.business.minNotice,
        autoConfirm: demoState.business.autoConfirm,
        allowClientCancel: demoState.business.allowClientCancel,
      },
    };

    const professionals = demoState.team.map((person) => ({
      id: stableId("professional", `${businessId}-${person.name}`),
      business_id: businessId,
      name: person.name,
      role: person.role,
      work_start: person.workStart,
      work_end: person.workEnd,
      active: true,
    }));

    const services = demoState.services.map((service) => ({
      id: stableId("service", `${businessId}-${service.name}`),
      business_id: businessId,
      name: service.name,
      category: service.category,
      duration_minutes: service.duration,
      price_cents: toCents(service.price),
      online: Boolean(service.online),
      active: true,
    }));

    const professionalServices = demoState.team.flatMap((person) => {
      const professional = professionals.find((item) => item.name === person.name);
      return person.services
        .map((serviceName) => {
          const service = services.find((item) => item.name === serviceName);
          if (!professional || !service) return null;
          return {
            business_id: businessId,
            professional_id: professional.id,
            service_id: service.id,
          };
        })
        .filter(Boolean);
    });

    const clients = demoState.clients.map((client) => ({
      id: stableId("client", `${businessId}-${client.phone || client.name}`),
      business_id: businessId,
      name: client.name,
      phone: client.phone,
      email: client.email || null,
      note: client.note || null,
    }));

    const clientByPhone = new Map(clients.map((client) => [client.phone, client]));
    const professionalByName = new Map(professionals.map((person) => [person.name, person]));
    const serviceByName = new Map(services.map((service) => [service.name, service]));

    const appointments = demoState.appointments.map((appointment) => {
      const client = clientByPhone.get(appointment.phone) || {
        id: stableId("client", `${businessId}-${appointment.phone || appointment.client}`),
      };
      const professional = professionalByName.get(appointment.professional);
      const service = serviceByName.get(appointment.service);
      const duration = appointment.duration || service?.duration_minutes || 0;

      return {
        id: stableId(
          "appointment",
          `${businessId}-${appointment.date}-${appointment.time}-${appointment.phone}-${appointment.service}`,
        ),
        business_id: businessId,
        client_id: client.id,
        professional_id: professional?.id || null,
        service_id: service?.id || null,
        date: appointment.date,
        start_time: appointment.time,
        end_time: addMinutes(appointment.time, duration),
        duration_minutes: duration,
        price_cents: toCents(appointment.price),
        status: statusMap[appointment.status] || "pending",
        source: appointment.source || "business",
        client_note: appointment.note || null,
        internal_note: null,
      };
    });

    const blocks = demoState.blocks.map((block) => {
      const professional = professionalByName.get(block.professional);
      return {
        id: stableId("block", `${businessId}-${block.date}-${block.professional}-${block.start}-${block.end}`),
        business_id: businessId,
        professional_id: professional?.id || null,
        date: block.date,
        start_time: block.start,
        end_time: block.end,
        reason: block.reason,
      };
    });

    const messageTemplates = [
      {
        id: stableId("template", `${businessId}-confirmation`),
        business_id: businessId,
        type: "confirmation",
        body: demoState.business.confirmTemplate,
      },
      {
        id: stableId("template", `${businessId}-cancellation`),
        business_id: businessId,
        type: "cancellation",
        body: demoState.business.cancelTemplate,
      },
    ];

    return {
      business,
      professionals,
      services,
      professional_services: professionalServices,
      clients,
      appointments,
      blocks,
      message_templates: messageTemplates,
    };
  }

  global.TurniaDataAdapter = {
    slugify,
    stableId,
    toCents,
    addMinutes,
    mapDemoToProduction,
  };
})(typeof window !== "undefined" ? window : globalThis);
