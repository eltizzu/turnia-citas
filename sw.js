// v2: se agregan las librerias de vendor/ y los dos modulos de Supabase que
// faltaban. Al cambiar el nombre, el navegador descarta la cache vieja.
const CACHE_NAME = "turnia-demo-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./agendaRules.js",
  "./turniaMetrics.js",
  "./turniaClients.js",
  "./inputValidation.js",
  "./dataAdapter.js",
  "./supabaseClient.js",
  "./publicBookingApi.js",
  "./supabaseDataApi.js",
  "./dataProviders.js",
  "./authProvider.js",
  "./app.js",
  "./vendor/chart.umd.min.js",
  "./vendor/supabase.js",
  "./vendor/sentry.min.js",
  "./manifest.webmanifest",
  "./assets/favicon.svg",
  "./assets/favicon.ico",
  "./assets/app-icon.svg",
  "./assets/turnia-mark.svg",
  "./assets/turnia-mark-monochrome.svg",
  "./assets/turnia-logo.svg",
  "./assets/turnia-logo-dark.svg",
  "./assets/turnia-mark-512.png",
  "./assets/turnia-mark-1024.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
  );
});
