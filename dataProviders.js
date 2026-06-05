(function attachDataProviders(global) {
  function createLocalStorageProvider({ storageKey, storage = global.localStorage }) {
    return {
      mode: "local",
      load() {
        try {
          const raw = storage.getItem(storageKey);
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      },
      save(data) {
        storage.setItem(storageKey, JSON.stringify(data));
      },
      clear() {
        storage.removeItem(storageKey);
      },
    };
  }

  function createSupabaseProvider({ adapter = global.TurniaDataAdapter, client = null } = {}) {
    return {
      mode: client ? "supabase-preview" : "supabase-pending",
      persistenceReady: false,
      load() {
        return null;
      },
      save(data) {
        if (!adapter) {
          return;
        }

        const productionPayload = adapter.mapDemoToProduction(data);
        global.__TURNIA_LAST_PRODUCTION_PAYLOAD__ = productionPayload;
      },
      clear() {},
    };
  }

  function createDataProvider(options) {
    const config = options.config || global.TURNIA_CONFIG || {};

    if (config.dataMode === "supabase") {
      const client = options.client || global.TurniaSupabaseClient?.createClient(config);
      return createSupabaseProvider({ adapter: options.adapter, client });
    }

    return createLocalStorageProvider({
      storageKey: options.storageKey,
      storage: options.storage,
    });
  }

  global.TurniaDataProviders = {
    createLocalStorageProvider,
    createSupabaseProvider,
    createDataProvider,
  };
})(typeof window !== "undefined" ? window : globalThis);
