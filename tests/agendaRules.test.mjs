import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadRules() {
  const code = await readFile(new URL("../agendaRules.js", import.meta.url), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.TurniaAgendaRules;
}

const rules = await loadRules();

const baseTeam = [
  {
    name: "Mara",
    role: "Colorista",
    workStart: "09:00",
    workEnd: "13:00",
    services: ["Corte"],
  },
  {
    name: "Noe",
    role: "Manicura",
    workStart: "09:00",
    workEnd: "13:00",
    services: ["Corte"],
  },
];

const getAppointmentId = (appointment) =>
  `${appointment.date}-${appointment.time}-${appointment.professional}-${appointment.service}`;

test("convierte horarios a minutos y vuelve a HH:mm", () => {
  assert.equal(rules.toMinutes("09:30"), 570);
  assert.equal(rules.toTime(570), "09:30");
});

test("detecta solapamientos de rangos", () => {
  assert.equal(rules.rangesOverlap(600, 660, 630, 690), true);
  assert.equal(rules.rangesOverlap(600, 660, 660, 720), false);
});

test("no libera un horario ocupado por una cita pendiente", () => {
  const isFree = rules.isSlotFree({
    professionalName: "Mara",
    startTime: "10:30",
    duration: 30,
    date: "2026-05-13",
    team: baseTeam,
    appointments: [
      {
        date: "2026-05-13",
        time: "10:00",
        professional: "Mara",
        service: "Corte",
        duration: 60,
        status: "Pendiente",
      },
    ],
    blocks: [],
    getAppointmentId,
  });

  assert.equal(isFree, false);
});

test("ignora citas canceladas y finalizadas para calcular disponibilidad", () => {
  const shared = {
    professionalName: "Mara",
    startTime: "10:30",
    duration: 30,
    date: "2026-05-13",
    team: baseTeam,
    blocks: [],
    getAppointmentId,
  };

  assert.equal(
    rules.isSlotFree({
      ...shared,
      appointments: [
        {
          date: "2026-05-13",
          time: "10:00",
          professional: "Mara",
          service: "Corte",
          duration: 60,
          status: "Cancelada",
        },
      ],
    }),
    true,
  );

  assert.equal(
    rules.isSlotFree({
      ...shared,
      appointments: [
        {
          date: "2026-05-13",
          time: "10:00",
          professional: "Mara",
          service: "Corte",
          duration: 60,
          status: "Finalizada",
        },
      ],
    }),
    true,
  );
});

test("respeta bloqueos de profesional", () => {
  const isFree = rules.isSlotFree({
    professionalName: "Mara",
    startTime: "11:00",
    duration: 30,
    date: "2026-05-13",
    team: baseTeam,
    appointments: [],
    blocks: [
      {
        date: "2026-05-13",
        professional: "Mara",
        start: "10:45",
        end: "11:30",
        reason: "Comida",
      },
    ],
    getAppointmentId,
  });

  assert.equal(isFree, false);
});

test("calcula profesionales libres por horario", () => {
  const slots = rules.getAvailableSlots({
    service: {
      name: "Corte",
      duration: 30,
      professionals: ["Mara", "Noe"],
    },
    date: "2026-05-13",
    businessHours: {
      start: "09:00",
      end: "11:00",
      step: 30,
    },
    team: baseTeam,
    appointments: [
      {
        date: "2026-05-13",
        time: "09:30",
        professional: "Mara",
        service: "Corte",
        duration: 30,
        status: "Confirmada",
      },
    ],
    blocks: [],
    getAppointmentId,
  });

  const normalizedSlots = JSON.parse(
    JSON.stringify(slots.map((slot) => ({ time: slot.time, professionals: slot.professionals }))),
  );

  assert.deepEqual(
    normalizedSlots,
    [
      { time: "09:00", professionals: ["Mara", "Noe"] },
      { time: "09:30", professionals: ["Noe"] },
      { time: "10:00", professionals: ["Mara", "Noe"] },
      { time: "10:30", professionals: ["Mara", "Noe"] },
    ],
  );
});

test("permite ignorar la cita actual al reprogramar", () => {
  const appointment = {
    date: "2026-05-13",
    time: "10:00",
    professional: "Mara",
    service: "Corte",
    duration: 30,
    status: "Confirmada",
  };

  const isFree = rules.isSlotFree({
    professionalName: "Mara",
    startTime: "10:00",
    duration: 30,
    date: "2026-05-13",
    team: baseTeam,
    appointments: [appointment],
    blocks: [],
    ignoredAppointmentId: getAppointmentId(appointment),
    getAppointmentId,
  });

  assert.equal(isFree, true);
});
