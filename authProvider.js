(function attachAuthProvider(global) {
  const demoBusiness = {
    id: "business_demo_centro",
    name: "Centro Demo",
    role: "admin",
  };

  function createDemoAuthProvider() {
    let session = null;

    return {
      mode: "demo",
      getSession() {
        return session;
      },
      async signInWithEmail({ email }) {
        const normalizedEmail = String(email || "").trim().toLowerCase();
        const hasBusiness = normalizedEmail === "demo@turnia.app";

        session = {
          user: {
            id: hasBusiness ? "demo-user-owner" : `demo-user-${normalizedEmail || "unknown"}`,
            email: normalizedEmail || "sin-email@demo.local",
            name: hasBusiness ? "Dueno Demo" : "Usuario sin negocio",
            provider: "email",
          },
          business: hasBusiness ? demoBusiness : null,
        };

        return session;
      },
      async signInWithGoogle() {
        session = {
          user: {
            id: "demo-user-google",
            email: "dueno.demo@gmail.com",
            name: "Dueno Demo",
            provider: "google",
          },
          business: demoBusiness,
        };

        return session;
      },
      async signOut() {
        session = null;
      },
    };
  }

  function mapSupabaseUser(user, business = null) {
    if (!user) return null;

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email || "Usuario",
        provider: user.app_metadata?.provider || "email",
      },
      business,
    };
  }

  async function getBusinessForCurrentUser(client, userId) {
    if (!client || !userId) return null;

    const { data, error } = await client
      .from("business_users")
      .select("role, businesses(id, name, slug)")
      .eq("auth_user_id", userId)
      .eq("active", true)
      .maybeSingle();

    if (error || !data?.businesses) {
      return null;
    }

    return {
      id: data.businesses.id,
      name: data.businesses.name,
      slug: data.businesses.slug,
      role: data.role,
    };
  }

  function createSupabaseAuthProvider({ client = null } = {}) {
    let session = null;

    return {
      mode: client ? "supabase-ready" : "supabase-pending",
      async getSession() {
        if (!client) return null;

        const { data } = await client.auth.getSession();
        const user = data?.session?.user;
        const business = await getBusinessForCurrentUser(client, user?.id);
        session = mapSupabaseUser(user, business);
        return session;
      },
      async signInWithEmail({ email, password }) {
        if (!client) {
          throw new Error("Supabase todavia no esta conectado.");
        }

        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) {
          throw new Error(error.message || "No se pudo iniciar sesion.");
        }

        const business = await getBusinessForCurrentUser(client, data.user?.id);
        session = mapSupabaseUser(data.user, business);
        return session;
      },
      async signInWithGoogle() {
        if (!client) {
          throw new Error("Supabase todavia no esta conectado.");
        }

        const { error } = await client.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: global.location?.origin,
          },
        });
        if (error) {
          throw new Error(error.message || "No se pudo iniciar sesion con Google.");
        }

        return {
          pendingRedirect: true,
          message: "Te estamos llevando a Google para iniciar sesion.",
        };
      },
      async signOut() {
        session = null;
        if (client) {
          await client.auth.signOut();
        }
      },
    };
  }

  function createAuthProvider(options = {}) {
    const config = options.config || global.TURNIA_CONFIG || {};

    if (config.dataMode === "supabase") {
      const client = options.client || global.TurniaSupabaseClient?.createClient(config);
      return createSupabaseAuthProvider({ client });
    }

    return createDemoAuthProvider();
  }

  global.TurniaAuthProvider = {
    createDemoAuthProvider,
    createSupabaseAuthProvider,
    createAuthProvider,
    mapSupabaseUser,
  };
})(typeof window !== "undefined" ? window : globalThis);
