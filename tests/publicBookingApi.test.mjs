import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadPublicBookingApi() {
  const code = await readFile(new URL("../publicBookingApi.js", import.meta.url), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaPublicBookingApi;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

test("public booking api llama la RPC de ficha publica", async () => {
  const apiFactory = await loadPublicBookingApi();
  const calls = [];
  const api = apiFactory.createPublicBookingApi({
    client: {
      async rpc(name, payload) {
        calls.push({ name, payload });
        return { data: { ok: true }, error: null };
      },
    },
  });

  const result = await api.getBookingPage("centro-demo");

  assert.equal(api.isReady, true);
  assert.deepEqual(result, { ok: true });
  assert.deepEqual(plain(calls), [
    {
      name: "get_public_booking_page",
      payload: { p_business_slug: "centro-demo" },
    },
  ]);
});

test("public booking api llama la RPC de horarios disponibles", async () => {
  const apiFactory = await loadPublicBookingApi();
  const calls = [];
  const api = apiFactory.createPublicBookingApi({
    client: {
      async rpc(name, payload) {
        calls.push({ name, payload });
        return { data: { slots: [] }, error: null };
      },
    },
  });

  await api.getAvailableSlots({
    slug: "centro-demo",
    serviceId: "service-1",
    date: "2026-06-23",
  });

  assert.deepEqual(plain(calls), [
    {
      name: "get_public_available_slots",
      payload: {
        p_business_slug: "centro-demo",
        p_service_id: "service-1",
        p_date: "2026-06-23",
        p_professional_id: null,
      },
    },
  ]);
});

test("public booking api llama la RPC de crear reserva", async () => {
  const apiFactory = await loadPublicBookingApi();
  const calls = [];
  const api = apiFactory.createPublicBookingApi({
    client: {
      async rpc(name, payload) {
        calls.push({ name, payload });
        return { data: { appointment_id: "appointment-1" }, error: null };
      },
    },
  });

  const result = await api.createAppointment({
    slug: "centro-demo",
    serviceId: "service-1",
    professionalId: "professional-1",
    date: "2026-06-23",
    startTime: "10:00",
    clientName: "Cliente",
    clientPhone: "+34 600 000 000",
  });

  assert.equal(result.appointment_id, "appointment-1");
  assert.deepEqual(plain(calls), [
    {
      name: "create_public_appointment",
      payload: {
        p_business_slug: "centro-demo",
        p_service_id: "service-1",
        p_professional_id: "professional-1",
        p_date: "2026-06-23",
        p_start_time: "10:00",
        p_client_name: "Cliente",
        p_client_phone: "+34 600 000 000",
        p_client_note: null,
      },
    },
  ]);
});

test("public booking api falla claro si Supabase no esta conectado", async () => {
  const apiFactory = await loadPublicBookingApi();
  const api = apiFactory.createPublicBookingApi();

  assert.equal(api.isReady, false);
  await assert.rejects(() => api.getBookingPage("centro-demo"), /Supabase no esta conectado/);
});
