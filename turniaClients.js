(function (global) {
  function normalizePhone(phone) {
    return String(phone || "").replace(/[^\d]/g, "");
  }

  function normalizeText(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function toDateValue(dateString) {
    const value = String(dateString || "").slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
  }

  function getClientKey(client) {
    return normalizePhone(client.phone) || normalizeText(client.name);
  }

  function sortHistory(a, b) {
    const dateCompare = String(b.date || "").localeCompare(String(a.date || ""));
    if (dateCompare) return dateCompare;
    return String(b.time || "").localeCompare(String(a.time || ""));
  }

  function getFirstContact(client, history) {
    const dates = [toDateValue(client.createdAt || client.created_at)]
      .concat(history.map((appointment) => toDateValue(appointment.date)))
      .filter(Boolean)
      .sort();

    return dates[0] || "";
  }

  function buildProfile(client, appointments) {
    const key = getClientKey(client);
    const history = appointments
      .filter((appointment) => {
        const appointmentKey = normalizePhone(appointment.phone) || normalizeText(appointment.client);
        return appointmentKey === key;
      })
      .slice()
      .sort(sortHistory);
    const estimatedRevenue = history
      .filter((appointment) => ["Confirmada", "Finalizada"].includes(appointment.status))
      .reduce((sum, appointment) => sum + Number(appointment.price || 0), 0);

    return {
      ...client,
      key,
      name: client.name || "Cliente",
      phone: client.phone || "Sin telefono",
      email: client.email || "",
      note: client.note || "Sin notas.",
      firstContact: getFirstContact(client, history),
      totalAppointments: history.length,
      estimatedRevenue,
      lastAppointment: history[0] || null,
      history,
    };
  }

  function matchesQuery(profile, query) {
    const value = normalizeText(query);
    const phoneQuery = normalizePhone(query);
    if (!value && !phoneQuery) return true;

    return (
      Boolean(value && normalizeText(profile.name).includes(value)) ||
      Boolean(value && normalizeText(profile.email).includes(value)) ||
      Boolean(phoneQuery && normalizePhone(profile.phone).includes(phoneQuery))
    );
  }

  function buildClientProfiles({ clients = [], appointments = [], query = "" } = {}) {
    return clients
      .map((client) => buildProfile(client, appointments))
      .filter((profile) => matchesQuery(profile, query))
      .sort((a, b) => {
        const appointmentCompare = b.totalAppointments - a.totalAppointments;
        if (appointmentCompare) return appointmentCompare;
        return a.name.localeCompare(b.name);
      });
  }

  global.TurniaClients = {
    buildClientProfiles,
    normalizePhone,
  };
})(typeof window !== "undefined" ? window : globalThis);
