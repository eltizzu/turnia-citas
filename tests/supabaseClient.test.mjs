import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const testSupabaseUrl = process.env.TURNIA_TEST_SUPABASE_URL || "https://example.invalid";
const testSupabaseAnonKey = process.env.TURNIA_TEST_SUPABASE_ANON_KEY || "test-anon-key";

async function loadSupabaseClient(extraSandbox = {}) {
  const code = await readFile(new URL("../supabaseClient.js", import.meta.url), "utf8");
  const sandbox = { ...extraSandbox };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaSupabaseClient;
}

test("detecta configuracion faltante", async () => {
  const helper = await loadSupabaseClient();

  assert.deepEqual(JSON.parse(JSON.stringify(helper.getMissingConfig({ dataMode: "supabase" }))), [
    "supabaseUrl",
    "supabaseAnonKey",
  ]);
});

test("no crea cliente sin SDK global de Supabase", async () => {
  const helper = await loadSupabaseClient();

  assert.equal(
    helper.canCreateClient({
      dataMode: "supabase",
      supabaseUrl: testSupabaseUrl,
      supabaseAnonKey: testSupabaseAnonKey,
    }),
    false,
  );
  assert.equal(
    helper.createClient({
      dataMode: "supabase",
      supabaseUrl: testSupabaseUrl,
      supabaseAnonKey: testSupabaseAnonKey,
    }),
    null,
  );
});

test("crea cliente si hay config y SDK disponible", async () => {
  const calls = [];
  const helper = await loadSupabaseClient({
    supabase: {
      createClient(url, key) {
        calls.push({ url, key });
        return { url, key };
      },
    },
  });

  const client = helper.createClient({
    dataMode: "supabase",
    supabaseUrl: testSupabaseUrl,
    supabaseAnonKey: testSupabaseAnonKey,
  });

  assert.deepEqual(client, { url: testSupabaseUrl, key: testSupabaseAnonKey });
  assert.deepEqual(calls, [{ url: testSupabaseUrl, key: testSupabaseAnonKey }]);
});
