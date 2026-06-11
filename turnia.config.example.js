window.TURNIA_CONFIG = {
  appEnv: "local",
  dataMode: "demo",
  supabaseUrl: "https://TU-PROYECTO.supabase.co",
  supabaseAnonKey: "TU-ANON-KEY",
  sentryDsn: "",
  release: "",
};

// En hosting real conviene generar config.js con scripts/write-config.mjs
// usando variables TURNIA_APP_ENV, TURNIA_DATA_MODE, TURNIA_SUPABASE_URL,
// TURNIA_SUPABASE_ANON_KEY y TURNIA_SENTRY_DSN.
// La service_role key nunca va en este archivo ni en el navegador.
