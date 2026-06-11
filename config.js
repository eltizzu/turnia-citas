// Config local segura. En staging/produccion este archivo se genera con scripts/write-config.mjs.
// No guardar secretos aca. La service_role key nunca debe ir al navegador.
window.TURNIA_CONFIG = {
  appEnv: "local",
  dataMode: "demo",
  supabaseUrl: "",
  supabaseAnonKey: "",
  sentryDsn: "",
  release: "",
};
