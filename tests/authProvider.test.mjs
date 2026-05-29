import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadAuthProvider(extraSandbox = {}) {
  const code = await readFile(new URL("../authProvider.js", import.meta.url), "utf8");
  const sandbox = { ...extraSandbox };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaAuthProvider;
}

test("login demo con email conocido devuelve negocio asignado", async () => {
  const auth = await loadAuthProvider();
  const provider = auth.createDemoAuthProvider();
  const session = await provider.signInWithEmail({ email: "demo@turnia.app" });

  assert.equal(session.user.provider, "email");
  assert.equal(session.business.name, "Centro Demo");
  assert.equal(provider.getSession().business.role, "admin");
});

test("login demo con email desconocido queda sin negocio asignado", async () => {
  const auth = await loadAuthProvider();
  const provider = auth.createDemoAuthProvider();
  const session = await provider.signInWithEmail({ email: "nuevo@cliente.com" });

  assert.equal(session.user.email, "nuevo@cliente.com");
  assert.equal(session.business, null);
});

test("login demo con Google devuelve un usuario asociado al negocio demo", async () => {
  const auth = await loadAuthProvider();
  const provider = auth.createDemoAuthProvider();
  const session = await provider.signInWithGoogle();

  assert.equal(session.user.provider, "google");
  assert.equal(session.business.id, "business_demo_centro");
});

test("factory prepara modo Supabase cuando la configuracion lo pide", async () => {
  const auth = await loadAuthProvider({
    TURNIA_CONFIG: { dataMode: "supabase" },
  });
  const provider = auth.createAuthProvider();

  assert.equal(provider.mode, "supabase-pending");
  await assert.rejects(() => provider.signInWithGoogle(), /Supabase todavia no esta conectado/);
});

test("provider Supabase listo inicia sesion con password y busca negocio", async () => {
  const auth = await loadAuthProvider();
  const calls = [];
  const client = {
    auth: {
      async signInWithPassword(payload) {
        calls.push(["password", payload]);
        return {
          data: {
            user: {
              id: "user-1",
              email: "dueno@demo.com",
              app_metadata: { provider: "email" },
              user_metadata: { full_name: "Dueno" },
            },
          },
          error: null,
        };
      },
    },
    from(table) {
      calls.push(["from", table]);
      return {
        select() {
          return this;
        },
        eq() {
          return this;
        },
        async maybeSingle() {
          return {
            data: {
              role: "admin",
              businesses: {
                id: "business-1",
                name: "Centro",
                slug: "centro",
              },
            },
            error: null,
          };
        },
      };
    },
  };

  const provider = auth.createSupabaseAuthProvider({ client });
  const session = await provider.signInWithEmail({
    email: "dueno@demo.com",
    password: "secret",
  });

  assert.equal(provider.mode, "supabase-ready");
  assert.equal(session.business.name, "Centro");
  assert.equal(session.user.name, "Dueno");
  assert.equal(calls[0][0], "password");
});

test("provider Supabase listo prepara OAuth Google", async () => {
  const auth = await loadAuthProvider({
    location: { origin: "http://127.0.0.1:5280" },
  });
  const calls = [];
  const client = {
    auth: {
      async signInWithOAuth(payload) {
        calls.push(payload);
        return { error: null };
      },
    },
  };

  const provider = auth.createSupabaseAuthProvider({ client });
  const result = await provider.signInWithGoogle();

  assert.equal(result.pendingRedirect, true);
  assert.equal(calls[0].provider, "google");
  assert.equal(calls[0].options.redirectTo, "http://127.0.0.1:5280");
});
