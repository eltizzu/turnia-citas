(function attachInputValidation(global) {
  const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  const phonePattern = /^\+?[0-9\s().-]{6,40}$/;
  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const htmlPattern = /<[^>]*>|<\/|<|>|javascript:|data:text\/html|on\w+\s*=/i;

  const defaultLabels = {
    appointmentId: "Cita",
    businessName: "Nombre comercial",
    businessPhone: "Telefono del negocio",
    cancelTemplate: "Plantilla de cancelacion",
    category: "Categoria",
    city: "Ciudad",
    client: "Nombre",
    confirmTemplate: "Plantilla de confirmacion",
    date: "Fecha",
    duration: "Duracion",
    email: "Email",
    end: "Fin",
    minNotice: "Anticipacion minima",
    name: "Nombre",
    note: "Nota",
    phone: "Telefono",
    price: "Precio",
    professional: "Profesional",
    professionals: "Profesionales",
    reason: "Motivo",
    role: "Especialidad",
    service: "Servicio",
    services: "Servicios",
    slug: "Slug",
    start: "Inicio",
    step: "Intervalo",
    time: "Hora",
    workEnd: "Fin",
    workStart: "Inicio",
  };

  function normalizeText(value) {
    return String(value ?? "")
      .replace(/[\u0000-\u001f\u007f]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function labelFor(name, rule = {}) {
    return rule.label || defaultLabels[name] || name;
  }

  function hasUnsafeHtml(value) {
    return htmlPattern.test(String(value ?? ""));
  }

  function validateFields(source, schema) {
    const values = {};
    const errors = [];

    Object.entries(schema).forEach(([name, rule]) => {
      const label = labelFor(name, rule);
      const rawValue = Array.isArray(source?.[name]) ? source[name] : source?.[name];
      const isArrayRule = rule.type === "array";
      const normalized = isArrayRule
        ? (Array.isArray(rawValue) ? rawValue : []).map(normalizeText).filter(Boolean)
        : normalizeText(rawValue);

      if (rule.required && (isArrayRule ? normalized.length === 0 : !normalized)) {
        errors.push(`${label} es obligatorio.`);
        return;
      }

      if (!isArrayRule && normalized && hasUnsafeHtml(normalized)) {
        errors.push(`${label} no puede incluir HTML ni scripts.`);
        return;
      }

      if (isArrayRule && normalized.some(hasUnsafeHtml)) {
        errors.push(`${label} no puede incluir HTML ni scripts.`);
        return;
      }

      if (!isArrayRule && rule.max && normalized.length > rule.max) {
        errors.push(`${label} supera el maximo de ${rule.max} caracteres.`);
        return;
      }

      if (isArrayRule && rule.maxItems && normalized.length > rule.maxItems) {
        errors.push(`${label} permite como maximo ${rule.maxItems} opciones.`);
        return;
      }

      if (rule.type === "email" && normalized && !emailPattern.test(normalized)) {
        errors.push(`${label} invalido.`);
        return;
      }

      if (rule.type === "phone" && normalized && !phonePattern.test(normalized)) {
        errors.push(`${label} invalido.`);
        return;
      }

      if (rule.type === "number") {
        const numberValue = Number(normalized);
        if (normalized && !Number.isFinite(numberValue)) {
          errors.push(`${label} debe ser numerico.`);
          return;
        }
        if (normalized && rule.min !== undefined && numberValue < rule.min) {
          errors.push(`${label} debe ser mayor o igual a ${rule.min}.`);
          return;
        }
        if (normalized && rule.max !== undefined && numberValue > rule.max) {
          errors.push(`${label} debe ser menor o igual a ${rule.max}.`);
          return;
        }
        values[name] = normalized ? numberValue : "";
        return;
      }

      if (rule.type === "date" && normalized && !datePattern.test(normalized)) {
        errors.push(`${label} invalida.`);
        return;
      }

      if (rule.type === "time" && normalized && !timePattern.test(normalized)) {
        errors.push(`${label} invalida.`);
        return;
      }

      values[name] = normalized;
    });

    return { ok: errors.length === 0, errors, values };
  }

  function formToObject(formData) {
    const data = {};
    formData.forEach((value, key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
      } else {
        data[key] = value;
      }
    });
    return data;
  }

  function validateFormData(formData, schema) {
    return validateFields(formToObject(formData), schema);
  }

  global.TurniaInputValidation = {
    formToObject,
    hasUnsafeHtml,
    normalizeText,
    validateFields,
    validateFormData,
  };
})(typeof window !== "undefined" ? window : globalThis);

