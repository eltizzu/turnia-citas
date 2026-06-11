import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadClients() {
  const code = await readFile(new URL("../turniaClients.js", import.meta.url), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaClients;
}

const clients = [
  {
    name: "Lucia Gomez",
    phone: "+34 611 234 120",
    email: "lucia@example.com",
    createdAt: "2026-05-01",
    note: "Prefiere tarde.",
  },
  {
    name: "Paula Sosa",
    phone: "+34 622 903 881",
    note: "Sin email.",
  },
];

const appointments = [
  {
    date: "2026-05-11",
    time: "09:30",
    client: "Lucia Gomez",
    phone: "+34 611 234 120",
    service: "Color",
    professional: "Mara",
    status: "Confirmada",
    price: 60,
  },
  {
    date: "2026-05-13",
    time: "12:00",
    client: "Lucia Gomez",
    phone: "+34 611 234 120",
    service: "Corte",
    professional: "Mara",
    status: "Pendiente",
    price: 20,
  },
  {
    date: "2026-05-10",
    time: "10:00",
    client: "Paula Sosa",
    phone: "+34 622 903 881",
    service: "Semipermanente",
    professional: "Noe",
    status: "Cancelada",
    price: 24,
  },
];

test("arma perfiles de clientes con contacto, totales e historial", async () => {
  const turniaClients = await loadClients();
  const profiles = turniaClients.buildClientProfiles({ clients, appointments });

  assert.equal(profiles[0].name, "Lucia Gomez");
  assert.equal(profiles[0].email, "lucia@example.com");
  assert.equal(profiles[0].firstContact, "2026-05-01");
  assert.equal(profiles[0].totalAppointments, 2);
  assert.equal(profiles[0].estimatedRevenue, 60);
  assert.equal(profiles[0].history[0].service, "Corte");
});

test("filtra clientes por nombre o teléfono", async () => {
  const turniaClients = await loadClients();

  const byName = turniaClients.buildClientProfiles({ clients, appointments, query: "paula" });
  const byPhone = turniaClients.buildClientProfiles({ clients, appointments, query: "611" });

  assert.equal(byName.length, 1);
  assert.equal(byName[0].name, "Paula Sosa");
  assert.equal(byPhone.length, 1);
  assert.equal(byPhone[0].name, "Lucia Gomez");
});
