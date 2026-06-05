import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function loadSchema() {
  return readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8");
}

async function loadSmokeTest() {
  return readFile(new URL("../supabase/smoke-test.sql", import.meta.url), "utf8");
}

test("schema protege turnos superpuestos en base de datos", async () => {
  const schema = await loadSchema();

  assert.match(schema, /create extension if not exists "btree_gist"/);
  assert.match(schema, /appointments_no_overlapping_active_slots/);
  assert.match(schema, /blocks_no_overlapping_slots/);
  assert.match(schema, /validate_appointment_schedule_before_write/);
  assert.match(schema, /validate_block_schedule_before_write/);
  assert.match(schema, /pg_advisory_xact_lock/);
});

test("schema expone una RPC publica limitada para crear reservas", async () => {
  const schema = await loadSchema();

  assert.match(schema, /create or replace function public\.create_public_appointment/);
  assert.match(schema, /security definer/);
  assert.match(schema, /professional_cannot_do_service/);
  assert.match(schema, /appointment_too_soon/);
  assert.match(schema, /slot_not_available/);
  assert.match(schema, /grant execute on function public\.create_public_appointment/);
});

test("schema expone RPCs publicas de lectura limitada para el link cliente", async () => {
  const schema = await loadSchema();

  assert.match(schema, /create or replace function public\.get_public_booking_page/);
  assert.match(schema, /create or replace function public\.get_public_available_slots/);
  assert.match(schema, /grant execute on function public\.get_public_booking_page\(text\) to anon, authenticated/);
  assert.match(schema, /grant execute on function public\.get_public_available_slots\(text, uuid, date, uuid\) to anon, authenticated/);
  assert.match(schema, /services\.active = true/);
  assert.match(schema, /services\.online = true/);
  assert.match(schema, /appointments\.status in \('pending', 'confirmed'\)/);
  assert.match(schema, /public\.appointment_time_range\(blocks\.date, blocks\.start_time, blocks\.end_time\)/);
});

test("smoke test valida reserva publica y conflicto de horario", async () => {
  const smokeTest = await loadSmokeTest();

  assert.match(smokeTest, /begin;/);
  assert.match(smokeTest, /rollback;/);
  assert.match(smokeTest, /public\.get_public_booking_page\('centro-demo'\)/);
  assert.match(smokeTest, /public\.get_public_available_slots/);
  assert.match(smokeTest, /public\.create_public_appointment/);
  assert.match(smokeTest, /slot_not_available/);
  assert.match(smokeTest, /expected_slot_conflict_but_booking_was_created/);
});
