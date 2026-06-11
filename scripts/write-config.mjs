import { writeFile } from "node:fs/promises";

const appEnv = process.env.TURNIA_APP_ENV || "local";
const dataMode = process.env.TURNIA_DATA_MODE || "demo";
const supabaseUrl = process.env.TURNIA_SUPABASE_URL || "";
const supabaseAnonKey = process.env.TURNIA_SUPABASE_ANON_KEY || "";
const sentryDsn = process.env.TURNIA_SENTRY_DSN || "";
const release = process.env.TURNIA_RELEASE || "";

const config = {
  appEnv,
  dataMode,
  supabaseUrl,
  supabaseAnonKey,
  sentryDsn,
  release,
};

if (dataMode === "supabase" && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error("TURNIA_DATA_MODE=supabase requiere TURNIA_SUPABASE_URL y TURNIA_SUPABASE_ANON_KEY.");
}

const contents = `// Archivo generado por scripts/write-config.mjs.
// No guardar secretos aca. La service_role key nunca debe ir al navegador.
window.TURNIA_CONFIG = ${JSON.stringify(config, null, 2)};
`;

await writeFile(new URL("../config.js", import.meta.url), contents, "utf8");
console.log(`config.js generado para ${appEnv} (${dataMode}).`);
