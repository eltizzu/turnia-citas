import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadSupabaseDataApi() {
  const code = await readFile(new URL("../supabaseDataApi.js", import.meta.url), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaSupabaseDataApi;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function createQuery(data) {
  return {
    select() {
      return this;
    },
    eq() {
      return this;
    },
    order() {
      return this;
    },
    maybeSingle() {
      return Promise.resolve({ data, error: null });
    },
    then(resolve) {
      return Promise.resolve({ data, error: null }).then(resolve);
    },
  };
}

test("supabase data api mapea datos reales al formato de la UI", async () => {
  const apiFactory = await loadSupabaseDataApi();
  const tables = {
    businesses: {
      id: "business-1",
      name: "Centro Demo",
      slug: "centro-demo",
      city: "Madrid",
      phone: "+34 600 000 000",
      settings: {
        businessHours: { start: "09:00", end: "19:00", step: 30 },
        businessType: "Fisioterapia y bienestar",
        minNotice: 12,
        autoConfirm: false,
        allowClientCancel: true,
      },
    },
    professionals: [
      {
        id: "professional-1",
        name: "Mara",
        role: "Especialista capilar",
        work_start: "09:00:00",
        work_end: "18:00:00",
      },
    ],
    services: [
      {
        id: "service-1",
        name: "Corte express",
        category: "Peluqueria",
        duration_minutes: 35,
        price_cents: 1800,
        online: true,
      },
    ],
    professional_services: [
      {
        professional_id: "professional-1",
        service_id: "service-1",
      },
    ],
    clients: [
      {
        id: "client-1",
        name: "Lucia Gomez",
        phone: "+34 611 234 120",
        note: "Prefiere tonos miel.",
      },
    ],
    appointments: [
      {
        id: "appointment-1",
        date: "2026-06-25",
        start_time: "09:30:00",
        duration_minutes: 35,
        price_cents: 1800,
        status: "confirmed",
        client_note: "Sin notas.",
        clients: { name: "Lucia Gomez", phone: "+34 611 234 120" },
        professionals: { name: "Mara" },
        services: { name: "Corte express", duration_minutes: 35, price_cents: 1800 },
      },
    ],
    blocks: [
      {
        id: "block-1",
        date: "2026-06-25",
        start_time: "14:00:00",
        end_time: "14:45:00",
        reason: "Comida",
        professionals: { name: "Mara" },
      },
    ],
    message_templates: [
      {
        type: "confirmation",
        body: "Confirmada {cliente}",
      },
    ],
  };

  const api = apiFactory.createBusinessDataApi({
    client: {
      from(table) {
        return createQuery(tables[table]);
      },
    },
  });

  const result = await api.loadBusinessState("business-1");

  assert.equal(api.isReady, true);
  assert.equal(result.business.name, "Centro Demo");
  assert.equal(result.business.confirmTemplate, "Confirmada {cliente}");
  assert.deepEqual(plain(result.businessHours), { start: "09:00", end: "19:00", step: 30 });
  assert.equal(result.services[0].professionals[0], "Mara");
  assert.equal(result.team[0].services[0], "Corte express");
  assert.equal(result.clients[0].phone, "+34 611 234 120");
  assert.equal(result.appointments[0].status, "Confirmada");
  assert.equal(result.appointments[0].price, 18);
  assert.equal(result.blocks[0].professional, "Mara");
});
