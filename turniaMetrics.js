(function (global) {
  const STATUS_LABELS = ["Pendiente", "Confirmada", "Finalizada", "Cancelada", "No asistio"];
  const DAY_LABELS = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  function parseLocalDate(dateString) {
    if (!dateString) return null;
    const [year, month, day] = String(dateString).split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  }

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function addMonths(date, months) {
    return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
  }

  function getPeriodRange(period, referenceDate) {
    const ref = startOfDay(parseLocalDate(referenceDate) || new Date());

    if (period === "week") {
      const mondayOffset = (ref.getDay() + 6) % 7;
      const start = addDays(ref, -mondayOffset);
      return { start, end: addDays(start, 7), label: "Esta semana" };
    }

    if (period === "threeMonths") {
      return {
        start: addMonths(new Date(ref.getFullYear(), ref.getMonth(), 1), -2),
        end: new Date(ref.getFullYear(), ref.getMonth() + 1, 1),
        label: "Ultimos 3 meses",
      };
    }

    return {
      start: new Date(ref.getFullYear(), ref.getMonth(), 1),
      end: new Date(ref.getFullYear(), ref.getMonth() + 1, 1),
      label: "Este mes",
    };
  }

  function isInRange(appointment, range) {
    const date = parseLocalDate(appointment.date);
    return Boolean(date && date >= range.start && date < range.end);
  }

  function countBy(items, getKey) {
    const counts = new Map();
    items.forEach((item) => {
      const key = getKey(item);
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return counts;
  }

  function topFromCountMap(counts, limit = 5) {
    return Array.from(counts.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, limit);
  }

  function makeStatusCounts(items) {
    return STATUS_LABELS.reduce((acc, status) => {
      acc[status] = items.filter((item) => item.status === status).length;
      return acc;
    }, {});
  }

  function getRevenueItems(items) {
    return items.filter((item) => ["Confirmada", "Finalizada"].includes(item.status));
  }

  function buildDashboardMetrics({ appointments = [], period = "month", referenceDate } = {}) {
    const range = getPeriodRange(period, referenceDate);
    const filteredAppointments = appointments.filter((appointment) => isInRange(appointment, range));
    const revenueItems = getRevenueItems(filteredAppointments);
    const estimatedRevenue = revenueItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const totalAppointments = filteredAppointments.length;
    const averageTicket = revenueItems.length ? estimatedRevenue / revenueItems.length : 0;
    const statusCounts = makeStatusCounts(filteredAppointments);
    const topServices = topFromCountMap(countBy(filteredAppointments, (item) => item.service || "Sin servicio"));
    const demandByHour = topFromCountMap(countBy(filteredAppointments, (item) => item.time || "Sin hora"), 8);
    const demandByDay = topFromCountMap(
      countBy(filteredAppointments, (item) => {
        const date = parseLocalDate(item.date);
        return date ? DAY_LABELS[date.getDay()] : "";
      }),
      7,
    );

    return {
      range,
      appointments: filteredAppointments,
      totalAppointments,
      estimatedRevenue,
      averageTicket,
      statusCounts,
      topServices,
      demandByHour,
      demandByDay,
      busiestHour: demandByHour[0] || null,
      busiestDay: demandByDay[0] || null,
    };
  }

  global.TurniaMetrics = {
    STATUS_LABELS,
    buildDashboardMetrics,
    getPeriodRange,
  };
})(typeof window !== "undefined" ? window : globalThis);
