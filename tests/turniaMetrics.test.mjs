import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadMetrics() {
  const code = await readFile(new URL("../turniaMetrics.js", import.meta.url), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaMetrics;
}

const appointments = [
  {
    date: "2026-05-11",
    time: "09:30",
    service: "Color",
    price: 60,
    status: "Confirmada",
  },
  {
    date: "2026-05-12",
    time: "09:30",
    service: "Color",
    price: 60,
    status: "Finalizada",
  },
  {
    date: "2026-05-13",
    time: "16:00",
    service: "Corte",
    price: 20,
    status: "Pendiente",
  },
  {
    date: "2026-04-20",
    time: "11:00",
    service: "Masaje",
    price: 40,
    status: "Cancelada",
  },
];

test("calcula métricas del mes filtrando por período", async () => {
  const metrics = await loadMetrics();

  const result = metrics.buildDashboardMetrics({
    appointments,
    period: "month",
    referenceDate: "2026-05-15",
  });

  assert.equal(result.totalAppointments, 3);
  assert.equal(result.estimatedRevenue, 120);
  assert.deepEqual(JSON.parse(JSON.stringify(result.statusCounts)), {
    Pendiente: 1,
    Confirmada: 1,
    Finalizada: 1,
    Cancelada: 0,
    "No asistio": 0,
  });
  assert.deepEqual(JSON.parse(JSON.stringify(result.topServices[0])), { label: "Color", count: 2 });
});

test("calcula demanda por día y hora", async () => {
  const metrics = await loadMetrics();

  const result = metrics.buildDashboardMetrics({
    appointments,
    period: "threeMonths",
    referenceDate: "2026-05-15",
  });

  assert.equal(result.demandByHour[0].label, "09:30");
  assert.equal(result.demandByHour[0].count, 2);
  assert.equal(result.busiestHour.label, "09:30");
  assert.equal(result.busiestDay.label, "Lunes");
});
