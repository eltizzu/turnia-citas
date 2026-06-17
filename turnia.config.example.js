window.TURNIA_CONFIG = {
  appEnv: "local",
  dataMode: "demo",
  supabaseUrl: "",
  supabaseAnonKey: "",
  sentryDsn: "",
  release: "",
};

// En hosting real no pegues claves aca.
// Vercel/Netlify deben generar config.js con scripts/write-config.mjs
// usando process.env.TURNIA_APP_ENV, process.env.TURNIA_DATA_MODE,
// process.env.TURNIA_SUPABASE_URL, process.env.TURNIA_SUPABASE_ANON_KEY,
// process.env.TURNIA_SENTRY_DSN y process.env.TURNIA_RELEASE.
// La service_role key nunca va en este archivo ni en el navegador.
