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
    await read("turnia.config.example.js"),
  ].join("\n");

  assert.doesNotMatch(configs, /sb_publishable_/);
  assert.doesNotMatch(configs, /supabase\.co/);
});

test("demo inicializa Sentry solo si hay DSN configurado", async () => {
  const demo = await read("demo.html");

  assert.match(demo, /\.\/vendor\/sentry\.min\.js/);
  assert.match(demo, /window\.TURNIA_CONFIG\?\.sentryDsn/);
  assert.match(demo, /Sentry\.init/);
});

test("las librerias se sirven desde el propio sitio, no desde CDN ajenos", async () => {
  const demo = await read("demo.html");

  // Si un CDN externo falla, la app pierde graficos o conexion sin avisar.
  assert.doesNotMatch(demo, /cdn\.jsdelivr\.net/);
  assert.doesNotMatch(demo, /browser\.sentry-cdn\.com/);
  assert.match(demo, /\.\/vendor\/chart\.umd\.min\.js/);
  assert.match(demo, /\.\/vendor\/supabase\.js/);
});

test("la CSP no habilita scripts de dominios externos", async () => {
  const vercel = JSON.parse(await read("vercel.json"));
  const csp = vercel.headers[0].headers.find((h) => h.key === "Content-Security-Policy").value;
  const scriptSrc = csp.split(";").find((part) => part.trim().startsWith("script-src"));

  assert.doesNotMatch(scriptSrc, /https:/);
});

test("el service worker cachea las librerias de vendor", async () => {
  const sw = await read("sw.js");

  // Sin esto la app instalable seguiria dependiendo de la red para los graficos.
  assert.match(sw, /vendor\/chart\.umd\.min\.js/);
  assert.match(sw, /vendor\/supabase\.js/);
});

test("demo avisa en pantalla si una libreria esencial no cargo", async () => {
  const demo = await read("demo.html");

  // Antes fallaba en silencio: sin Chart.js los graficos quedaban en blanco.
  assert.match(demo, /typeof window\.Chart === "undefined"/);
  assert.match(demo, /role", "alert/);
});
