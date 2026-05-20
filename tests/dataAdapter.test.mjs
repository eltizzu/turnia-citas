import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadAdapter() {
  const code = await readFile(new URL("../dataAdapter.js", import.meta.url), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaDataAdapter;
}

const adapter = await loadAdapter();

const demoState = {
  businessHours: {
    start: "09:00",
    end: "18:00",
    step: 30,
  },
  business: {
    name: "Salon Demo",
    slug: "salon-demo",
    city: "Madrid",
    phone: "+34 600 000 000",
    minNotice: 12,
    autoConfirm: false,
    allowClientCancel: true,
    confirmTemplate: "Confirmada {cliente}",
    cancelTemplate: "Cancelada {cliente}",
  },
  team: [
    {
      name: "Mara",
      role: "Colorista",
      workStart: "09:00",
      workEnd: "18:00",
      services: ["Corte"],
    },
  ],
  services: [
    {
      name: "Corte",
      category: "Peluqueria",
      duration: 45,
      price: 18,
      professionals: ["Mara"],
      online: true,
    },
  ],
  clients: [
    {
      name: "Lucia Gomez",
      phone: "+34 611 234 120",
      note: "Cliente frecuente.",
    },
  ],
  appointments: [
    {
      date: "2026-05-13",
      time: "10:00",
      client: "Lucia Gomez",
      phone: "+34 611 234 120",
      service: "Corte",
      professional: "Mara",
      duration: 45,
      price: 18,
      status: "Confirmada",
      note: "Puntual.",
    },
  ],
  blocks: [
    {
      date: "2026-05-13",
      professional: "Mara",
      start: "14:00",
      end: "14:30",
      reason: "Comida",
    },
  ],
};

test("normaliza textos para slugs e ids estables", () => {
  assert.equal(adapter.slugify("Lifting de pestañas"), "lifting-de-pestanas");
  assert.equal(adapter.stableId("service", "Corte"), adapter.stableId("service", "Corte"));
});

test("convierte importes y horarios al formato de produccion", () => {
  assert.equal(adapter.toCents(18.5), 1850);
  assert.equal(adapter.addMinutes("10:45", 50), "11:35");
});

test("mapea la demo al modelo de produccion", () => {
  const mapped = adapter.mapDemoToProduction(demoState, { businessId: "business_test" });

  assert.equal(mapped.business.id, "business_test");
  assert.equal(mapped.business.settings.businessHours.start, "09:00");
  assert.equal(mapped.professionals[0].work_start, "09:00");
  assert.equal(mapped.services[0].duration_minutes, 45);
  assert.equal(mapped.services[0].price_cents, 1800);
  assert.equal(mapped.professional_services.length, 1);
  assert.equal(mapped.clients[0].phone, "+34 611 234 120");
  assert.equal(mapped.appointments[0].status, "confirmed");
  assert.equal(mapped.appointments[0].end_time, "10:45");
  assert.equal(mapped.blocks[0].start_time, "14:00");
  assert.equal(mapped.message_templates.length, 2);
});
