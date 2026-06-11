(function attachSupabaseDataApi(global) {
  const statusToDemo = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    completed: "Finalizada",
    cancelled: "Cancelada",
    no_show: "No asistio",
  };

  const templateTypeToBusinessKey = {
    confirmation: "confirmTemplate",
    cancellation: "cancelTemplate",
  };

  function assertClient(client) {
    if (!client || typeof client.from !== "function") {
      throw new Error("Supabase no esta conectado para cargar datos reales.");
    }
  }

  async function selectMany(query, fallback = []) {
    const { data, error } = await query;
    if (error) throw new Error(error.message || "No se pudieron cargar datos.");
    return data || fallback;
  }

  async function selectOne(query) {
    const { data, error } = await query;
    if (error) throw new Error(error.message || "No se pudo cargar el negocio.");
    return data || null;
  }

  function toEuros(cents) {
    return Number(cents || 0) / 100;
  }

  function trimTime(value) {
    return String(value || "").slice(0, 5);
  }

  function mapBusiness(row, templates = []) {
    const settings = row?.settings || {};
    const business = {
      name: row?.name || "Centro Demo",
      slug: row?.slug || "centro-demo",
      city: row?.city || "",
      phone: row?.phone || "",
      type: settings.businessType || "Negocio con turnos",
      minNotice: Number(settings.minNotice || 0),
      autoConfirm: Boolean(settings.autoConfirm),
      allowClientCancel: settings.allowClientCancel !== false,
      confirmTemplate:
        "Hola {cliente}, tu cita en {negocio} fue confirmada.\n\nServicio: {servicio}\nHora: {hora}\nProfesional: {profesional}\nPrecio: {precio}\n\nTe esperamos.",
      cancelTemplate:
        "Hola {cliente}, desde {negocio} te avisamos que no podemos confirmar tu cita de {servicio} a las {hora}.\n\nEscribinos y buscamos otro horario disponible.",
    };

    templates.forEach((template) => {
      const key = templateTypeToBusinessKey[template.type];
      if (key && template.body) {
        business[key] = template.body;
      }
    });

    return {
      business,
      businessHours: {
        start: settings.businessHours?.start || "09:00",
        end: settings.businessHours?.end || "18:00",
        step: Number(settings.businessHours?.step || 30),
      },
    };
  }

  function mapServices(rows, links) {
    return rows.map((service) => ({
      id: service.id,
      name: service.name,
      duration: Number(service.duration_minutes || 0),
      price: toEuros(service.price_cents),
      category: service.category || "General",
      professionals: links
        .filter((link) => link.service_id === service.id)
        .map((link) => link.professionalName)
        .filter(Boolean),
      online: Boolean(service.online),
    }));
  }

  function mapTeam(rows, links) {
    return rows.map((person) => ({
      id: person.id,
      name: person.name,
      role: person.role || "Profesional",
      workStart: trimTime(person.work_start),
      workEnd: trimTime(person.work_end),
      services: links
        .filter((link) => link.professional_id === person.id)
        .map((link) => link.serviceName)
        .filter(Boolean),
    }));
  }

  function mapClients(rows) {
    return rows.map((client) => ({
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email || "",
      createdAt: client.created_at,
      note: client.note || "Sin notas.",
    }));
  }

  function mapAppointments(rows) {
    return rows.map((appointment) => ({
      id: appointment.id,
      date: appointment.date,
      time: trimTime(appointment.start_time),
      client: appointment.clients?.name || "Cliente",
      phone: appointment.clients?.phone || "Sin telefono",
      service: appointment.services?.name || "Servicio",
      professional: appointment.professionals?.name || "Profesional",
      duration: Number(appointment.duration_minutes || appointment.services?.duration_minutes || 0),
      price: toEuros(appointment.price_cents),
      status: statusToDemo[appointment.status] || "Pendiente",
      note: appointment.client_note || appointment.internal_note || "Sin notas.",
    }));
  }

  function mapBlocks(rows) {
    return rows.map((block) => ({
      id: block.id,
      date: block.date,
      professional: block.professionals?.name || "Profesional",
      start: trimTime(block.start_time),
      end: trimTime(block.end_time),
      reason: block.reason || "Bloqueo",
    }));
  }

  function createBusinessDataApi({ client = null } = {}) {
    return {
      isReady: Boolean(client && typeof client.from === "function"),

      async loadBusinessState(businessId) {
        assertClient(client);

        const [
          business,
          professionals,
          services,
          professionalServices,
          clients,
          appointments,
          blocks,
          templates,
        ] = await Promise.all([
          selectOne(client.from("businesses").select("*").eq("id", businessId).maybeSingle()),
          selectMany(client.from("professionals").select("*").eq("business_id", businessId).eq("active", true).order("name")),
          selectMany(client.from("services").select("*").eq("business_id", businessId).eq("active", true).order("name")),
          selectMany(client.from("professional_services").select("professional_id, service_id").eq("business_id", businessId)),
          selectMany(client.from("clients").select("*").eq("business_id", businessId).order("name")),
          selectMany(
            client
              .from("appointments")
              .select("*, clients(name, phone, note), professionals(name), services(name, duration_minutes, price_cents)")
              .eq("business_id", businessId)
              .order("date", { ascending: true })
              .order("start_time", { ascending: true }),
          ),
          selectMany(
            client
              .from("blocks")
              .select("*, professionals(name)")
              .eq("business_id", businessId)
              .order("date", { ascending: true })
              .order("start_time", { ascending: true }),
          ),
          selectMany(client.from("message_templates").select("*").eq("business_id", businessId)),
        ]);

        const professionalById = new Map(professionals.map((person) => [person.id, person]));
        const serviceById = new Map(services.map((service) => [service.id, service]));
        const links = professionalServices.map((link) => ({
          ...link,
          professionalName: professionalById.get(link.professional_id)?.name || "",
          serviceName: serviceById.get(link.service_id)?.name || "",
        }));
        const mappedBusiness = mapBusiness(business, templates);

        return {
          businessHours: mappedBusiness.businessHours,
          business: mappedBusiness.business,
          clients: mapClients(clients),
          appointments: mapAppointments(appointments),
          blocks: mapBlocks(blocks),
          services: mapServices(services, links),
          team: mapTeam(professionals, links),
        };
      },
    };
  }

  global.TurniaSupabaseDataApi = {
    createBusinessDataApi,
  };
})(typeof window !== "undefined" ? window : globalThis);
