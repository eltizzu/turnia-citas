(function attachPublicBookingApi(global) {
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

      createAppointment({
        slug,
        serviceId,
        professionalId,
        date,
        startTime,
        clientName,
        clientPhone,
        clientNote = "",
      }) {
        return callRpc(client, "create_public_appointment", {
          p_business_slug: slug,
          p_service_id: serviceId,
          p_professional_id: professionalId,
          p_date: date,
          p_start_time: startTime,
          p_client_name: clientName,
          p_client_phone: clientPhone,
          p_client_note: clientNote || null,
        });
      },
    };
  }

  global.TurniaPublicBookingApi = {
    createPublicBookingApi,
  };
})(typeof window !== "undefined" ? window : globalThis);
