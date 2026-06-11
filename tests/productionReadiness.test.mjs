import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("netlify define CSP, HSTS y cache de assets", async () => {
  const netlify = await read("netlify.toml");

  assert.match(netlify, /Content-Security-Policy/);
  assert.match(netlify, /Strict-Transport-Security/);
  assert.match(netlify, /frame-ancestors 'none'/);
  assert.match(netlify, /Cache-Control = "public, max-age=31536000, immutable"/);
});

test("config runtime se genera desde variables de entorno", async () => {
  const script = await read("scripts/write-config.mjs");
  const configExample = await read("turnia.config.example.js");

  assert.match(script, /TURNIA_APP_ENV/);
  assert.match(script, /TURNIA_DATA_MODE/);
  assert.match(script, /TURNIA_SUPABASE_URL/);
  assert.match(script, /TURNIA_SUPABASE_ANON_KEY/);
  assert.match(script, /TURNIA_SENTRY_DSN/);
  assert.match(configExample, /sentryDsn/);
});

test("configs estaticos no incluyen keys reales de Supabase", async () => {
  const configs = [
    await read("config.js"),
    await read("app/config.js"),
    await read("public-demo-2026-05-21/config.js"),
  ].join("\n");

  assert.doesNotMatch(configs, /sb_publishable_/);
  assert.doesNotMatch(configs, /supabase\.co/);
});

test("demo inicializa Sentry solo si hay DSN configurado", async () => {
  const demo = await read("demo.html");

  assert.match(demo, /browser\.sentry-cdn\.com/);
  assert.match(demo, /window\.TURNIA_CONFIG\?\.sentryDsn/);
  assert.match(demo, /Sentry\.init/);
});
