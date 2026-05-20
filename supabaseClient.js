(function attachSupabaseClient(global) {
  function getConfig(config = global.TURNIA_CONFIG || {}) {
    return {
      dataMode: config.dataMode || "local",
      supabaseUrl: config.supabaseUrl || "",
      supabaseAnonKey: config.supabaseAnonKey || "",
    };
  }

  function getMissingConfig(config = getConfig()) {
    const missing = [];
    if (!config.supabaseUrl) missing.push("supabaseUrl");
    if (!config.supabaseAnonKey) missing.push("supabaseAnonKey");
    return missing;
  }

  function canCreateClient(config = getConfig()) {
    return (
      config.dataMode === "supabase" &&
      getMissingConfig(config).length === 0 &&
      Boolean(global.supabase?.createClient)
    );
  }

  function createClient(config = getConfig()) {
    if (!canCreateClient(config)) {
      return null;
    }

    return global.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  global.TurniaSupabaseClient = {
    getConfig,
    getMissingConfig,
    canCreateClient,
    createClient,
  };
})(typeof window !== "undefined" ? window : globalThis);
