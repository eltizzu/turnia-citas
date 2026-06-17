import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const testSupabaseUrl = process.env.TURNIA_TEST_SUPABASE_URL || "https://example.invalid";
const testSupabaseAnonKey = process.env.TURNIA_TEST_SUPABASE_ANON_KEY || "test-anon-key";

async function loadProviders(extraSandbox = {}) {
  const code = await readFile(new URL("../dataProviders.js", import.meta.url), "utf8");
  const sandbox = { ...extraSandbox };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaDataProviders;
}

function createMemoryStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, value);
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

test("localStorage provider guarda, carga y limpia datos", async () => {
  const providers = await loadProviders();
  const storage = createMemoryStorage();
  const provider = providers.createLocalStorageProvider({
    storageKey: "turnia-test",
    storage,
  });

  provider.save({ business: { name: "Salon" } });
  assert.deepEqual(JSON.parse(JSON.stringify(provider.load())), { business: { name: "Salon" } });

  provider.clear();
  assert.equal(provider.load(), null);
});

test("factory usa modo local por defecto", async () => {
  const providers = await loadProviders();
  const storage = createMemoryStorage();
  const provider = providers.createDataProvider({
    storageKey: "turnia-test",
    storage,
  });

  assert.equal(provider.mode, "local");
});

test("factory permite preparar modo supabase sin romper la demo", async () => {
  const calls = [];
  const providers = await loadProviders({
    TURNIA_CONFIG: { dataMode: "supabase" },
    TurniaDataAdapter: {
      mapDemoToProduction(data) {
        calls.push(data);
        return { mapped: true };
      },
    },
  });

  const provider = providers.createDataProvider({ storageKey: "turnia-test" });
  provider.save({ demo: true });

  assert.equal(provider.mode, "supabase-pending");
  assert.deepEqual(calls, [{ demo: true }]);
});

test("factory marca Supabase como preview si puede crear cliente", async () => {
  const providers = await loadProviders({
    TURNIA_CONFIG: {
      dataMode: "supabase",
      supabaseUrl: testSupabaseUrl,
      supabaseAnonKey: testSupabaseAnonKey,
    },
    TurniaSupabaseClient: {
      createClient() {
        return { ready: true };
      },
    },
  });

  const provider = providers.createDataProvider({ storageKey: "turnia-test" });

  assert.equal(provider.mode, "supabase-preview");
  assert.equal(provider.persistenceReady, false);
});
