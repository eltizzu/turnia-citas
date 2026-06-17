(function attachPublicBookingApi(global) {
  const inputValidation = global.TurniaInputValidation;
  const appointmentSchema = {
    slug: { type: "text", required: true, max: 100 },
    serviceId: { type: "text", required: true, max: 80 },
    professionalId: { type: "text", required: true, max: 80 },
    date: { type: "date", required: true },
    startTime: { type: "time", required: true },
    clientName: { type: "text", required: true, max: 100, label: "Nombre" },
    clientPhone: { type: "phone", required: true, max: 40, label: "Telefono" },
    clientNote: { type: "text", max: 500, label: "Nota" },
  };

  function assertClient(client) {
    if (!client || typeof client.rpc !== "function") {
      throw new Error("Supabase no esta conectado para reservas publicas.");
    }
  }

  async function callRpc(client, name, payload) {
    assertClient(client);
    const { data, error } = await client.rpc(name, payload);

    if (error) {
      throw new Error(error.message || `No se pudo ejecutar ${name}.`);
    }

    return data;
  }

  function validateAppointment(payload) {
    if (!inputValidation?.validateFields) {
      return payload;
    }

    const result = inputValidation.validateFields(payload, appointmentSchema);
    if (!result.ok) {
      throw new Error(result.errors.join("\n"));
    }

    return result.values;
  }

  function createPublicBookingApi({ client = null } = {}) {
    return {
      isReady: Boolean(client && typeof client.rpc === "function"),

      getBookingPage(slug) {
        return callRpc(client, "get_public_booking_page", {
          p_business_slug: slug,
        });
      },

      getAvailableSlots({ slug, serviceId, date, professionalId = null }) {
        return callRpc(client, "get_public_available_slots", {
          p_business_slug: slug,
          p_service_id: serviceId,
          p_date: date,
          p_professional_id: professionalId || null,
        });
      },

      async createAppointment({
        slug,
        serviceId,
        professionalId,
        date,
        startTime,
        clientName,
        clientPhone,
        clientNote = "",
      }) {
        const values = validateAppointment({
          slug,
          serviceId,
          professionalId,
          date,
          startTime,
          clientName,
          clientPhone,
          clientNote,
        });

        return callRpc(client, "create_public_appointment", {
          p_business_slug: values.slug,
          p_service_id: values.serviceId,
          p_professional_id: values.professionalId,
          p_date: values.date,
          p_start_time: values.startTime,
          p_client_name: values.clientName,
          p_client_phone: values.clientPhone,
          p_client_note: values.clientNote || null,
        });
      },
    };
  }

  global.TurniaPublicBookingApi = {
    createPublicBookingApi,
  };
})(typeof window !== "undefined" ? window : globalThis);
