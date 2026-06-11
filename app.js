const STORAGE_KEY = "turnia-demo-state-v2";
const demoDate = "2026-05-11";
const dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const initialUrlParams = new URLSearchParams(window.location.search);

if (initialUrlParams.has("reset-demo")) {
  localStorage.removeItem(STORAGE_KEY);
  window.history.replaceState({}, "", window.location.pathname);
}

const shouldOpenClientView =
  initialUrlParams.has("reserva") ||
  initialUrlParams.has("cliente") ||
  initialUrlParams.has("publico");

const demoData = {
  businessHours: {
    start: "09:00",
    end: "19:00",
    step: 30,
  },
  business: {
    name: "Centro Demo",
    slug: "centro-demo",
    city: "Madrid",
    phone: "+34 600 000 000",
    type: "Fisioterapia y bienestar",
    minNotice: 12,
    autoConfirm: false,
    allowClientCancel: true,
    confirmTemplate:
      "Hola {cliente}, tu cita en {negocio} fue confirmada.\n\nServicio: {servicio}\nHora: {hora}\nProfesional: {profesional}\nPrecio: {precio}\n\nTe esperamos.",
    cancelTemplate:
      "Hola {cliente}, desde {negocio} te avisamos que no podemos confirmar tu cita de {servicio} a las {hora}.\n\nEscribinos y buscamos otro horario disponible.",
  },
  clients: [
    {
      name: "Lucia Gomez",
      phone: "+34 611 234 120",
      email: "lucia.gomez@email.com",
      createdAt: "2026-04-02",
      note: "Prefiere tonos miel y suele reservar cada 6 semanas.",
    },
    {
      name: "Paula Sosa",
      phone: "+34 622 903 881",
      email: "paula.sosa@email.com",
      createdAt: "2026-04-18",
      note: "Le gusta recibir confirmacion por WhatsApp.",
    },
    {
      name: "Candela Ruiz",
      phone: "+34 633 118 440",
      email: "candela.ruiz@email.com",
      createdAt: "2026-03-22",
      note: "Cliente frecuente. Suele pedir corte express cada 5 semanas.",
    },
    {
      name: "Rocio Vera",
      phone: "+34 644 902 110",
      email: "rocio.vera@email.com",
      createdAt: "2026-05-03",
      note: "Primera visita. Pregunto por una sesion de fisioterapia.",
    },
    {
      name: "Marta Leon",
      phone: "+34 655 901 234",
      email: "marta.leon@email.com",
      createdAt: "2026-05-08",
      note: "Prefiere horarios de tarde y confirmar siempre por WhatsApp.",
    },
    {
      name: "Nadia Ferrer",
      phone: "+34 666 210 874",
      email: "nadia.ferrer@email.com",
      createdAt: "2026-05-09",
      note: "Quiere probar manicura antes de un evento.",
    },
    {
      name: "Sofia Martin",
      phone: "+34 677 451 903",
      email: "sofia.martin@email.com",
      createdAt: "2026-05-10",
      note: "Suele venir con poco margen, revisar huecos libres.",
    },
  ],
  blocks: [
    {
      date: "2026-05-11",
      professional: "Mara",
      start: "14:00",
      end: "14:45",
      reason: "Comida",
    },
    {
      date: "2026-05-11",
      professional: "Eva",
      start: "12:30",
      end: "13:00",
      reason: "Preparacion de cabina",
    },
    {
      date: "2026-05-12",
      professional: "Noe",
      start: "15:00",
      end: "15:45",
      reason: "Descanso",
    },
  ],
  appointments: [
    {
      date: "2026-05-11",
      time: "09:30",
      client: "Lucia Gomez",
      phone: "+34 611 234 120",
      service: "Color + corte",
      professional: "Mara",
      duration: 90,
      price: 58,
      status: "Confirmada",
      note: "Prefiere tonos miel y corte por debajo del hombro.",
    },
    {
      date: "2026-05-11",
      time: "10:45",
      client: "Paula Sosa",
      phone: "+34 622 903 881",
      service: "Semipermanente",
      professional: "Noe",
      duration: 50,
      price: 24,
      status: "Pendiente",
      note: "Avisar si queda hueco antes de las 10:00.",
    },
    {
      date: "2026-05-12",
      time: "12:00",
      client: "Candela Ruiz",
      phone: "+34 633 118 440",
      service: "Corte express",
      professional: "Mara",
      duration: 35,
      price: 18,
      status: "Finalizada",
      note: "Cliente frecuente. Suele reservar cada 5 semanas.",
    },
    {
      date: "2026-05-13",
      time: "13:15",
      client: "Rocio Vera",
      phone: "+34 644 902 110",
      service: "Fisioterapia inicial",
      professional: "Eva",
      duration: 60,
      price: 45,
      status: "Confirmada",
      note: "Primera visita.",
    },
    {
      date: "2026-05-14",
      time: "16:30",
      client: "Marta Leon",
      phone: "+34 655 901 234",
      service: "Barba + perfilado",
      professional: "Noe",
      duration: 30,
      price: 16,
      status: "Pendiente",
      note: "Quiere confirmar por WhatsApp.",
    },
    {
      date: "2026-05-11",
      time: "12:15",
      client: "Nadia Ferrer",
      phone: "+34 666 210 874",
      service: "Semipermanente",
      professional: "Noe",
      duration: 50,
      price: 24,
      status: "Confirmada",
      note: "Evento el fin de semana. Prefiere tonos nude.",
    },
    {
      date: "2026-05-11",
      time: "15:30",
      client: "Sofia Martin",
      phone: "+34 677 451 903",
      service: "Corte express",
      professional: "Mara",
      duration: 35,
      price: 18,
      status: "Pendiente",
      note: "Pidio aviso si queda un hueco antes.",
    },
    {
      date: "2026-05-12",
      time: "10:00",
      client: "Lucia Gomez",
      phone: "+34 611 234 120",
      service: "Color + corte",
      professional: "Mara",
      duration: 90,
      price: 58,
      status: "Confirmada",
      note: "Mantener tono miel.",
    },
    {
      date: "2026-05-15",
      time: "11:30",
      client: "Rocio Vera",
      phone: "+34 644 902 110",
      service: "Masaje descontracturante",
      professional: "Eva",
      duration: 60,
      price: 42,
      status: "Cancelada",
      note: "Aviso que no podia asistir.",
    },
  ],
  services: [
    {
      name: "Corte express",
      duration: 35,
      price: 18,
      category: "Peluqueria",
      professionals: ["Mara"],
      online: true,
    },
    {
      name: "Color + corte",
      duration: 90,
      price: 58,
      category: "Peluqueria",
      professionals: ["Mara"],
      online: true,
    },
    {
      name: "Semipermanente",
      duration: 50,
      price: 24,
      category: "Unas",
      professionals: ["Noe"],
      online: true,
    },
    {
      name: "Fisioterapia inicial",
      duration: 60,
      price: 45,
      category: "Salud",
      professionals: ["Eva"],
      online: true,
    },
    {
      name: "Masaje descontracturante",
      duration: 60,
      price: 42,
      category: "Bienestar",
      professionals: ["Eva"],
      online: true,
    },
    {
      name: "Barba + perfilado",
      duration: 30,
      price: 16,
      category: "Barberia",
      professionals: ["Noe"],
      online: true,
    },
  ],
  team: [
    {
      name: "Mara",
      role: "Especialista capilar",
      workStart: "09:00",
      workEnd: "18:00",
      services: ["Corte express", "Color + corte"],
    },
    {
      name: "Noe",
      role: "Unas y barberia",
      workStart: "10:00",
      workEnd: "19:00",
      services: ["Semipermanente", "Barba + perfilado"],
    },
    {
      name: "Eva",
      role: "Fisioterapia y bienestar",
      workStart: "09:00",
      workEnd: "17:00",
      services: ["Fisioterapia inicial", "Masaje descontracturante"],
    },
  ],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const appConfig = window.TURNIA_CONFIG || {};
const supabaseClient = TurniaSupabaseClient?.createClient(appConfig);
const publicBookingApi = TurniaPublicBookingApi?.createPublicBookingApi({
  client: supabaseClient,
});
const supabaseDataApi = TurniaSupabaseDataApi?.createBusinessDataApi({
  client: supabaseClient,
});

const dataProvider = TurniaDataProviders.createDataProvider({
  storageKey: STORAGE_KEY,
  adapter: TurniaDataAdapter,
  client: supabaseClient,
});
const authProvider = TurniaAuthProvider.createAuthProvider({
  client: supabaseClient,
});

const persistedData = loadPersistedData();
const businessHours = persistedData?.businessHours || clone(demoData.businessHours);
const state = {
  business: persistedData?.business || clone(demoData.business),
  activeView: "agenda",
  activeProfessional: "Todos",
  selectedDate: persistedData?.selectedDate || demoDate,
  selectedClientSlot: "",
  lastMessage: null,
  selectedClientPhone: "",
  clients: persistedData?.clients || clone(demoData.clients),
  blocks: persistedData?.blocks || clone(demoData.blocks),
  appointments: persistedData?.appointments || clone(demoData.appointments),
};
const services = persistedData?.services || clone(demoData.services);
const team = persistedData?.team || clone(demoData.team);
let currentSession = null;
let publicSlotsRequestId = 0;
let reportPeriod = "month";
let clientSearchQuery = "";
const reportCharts = {};

function replaceArray(target, items) {
  target.splice(0, target.length, ...(items || []));
}

function replaceStateFromData(data) {
  if (!data) return;

  Object.keys(businessHours).forEach((key) => delete businessHours[key]);
  Object.assign(businessHours, data.businessHours || clone(demoData.businessHours));

  Object.assign(state.business, data.business || clone(demoData.business));
  replaceArray(state.clients, data.clients || []);
  replaceArray(state.blocks, data.blocks || []);
  replaceArray(state.appointments, data.appointments || []);
  replaceArray(services, data.services || []);
  replaceArray(team, data.team || []);

  if (!state.selectedClientPhone && state.clients[0]) {
    state.selectedClientPhone = state.clients[0].phone;
  }
}

function getPublicSlug() {
  return initialUrlParams.get("slug") || initialUrlParams.get("negocio") || state.business.slug || "centro-demo";
}

function shouldUsePublicBookingApi() {
  return Boolean(publicBookingApi?.isReady && document.body.classList.contains("public-mode"));
}

function loadPersistedData() {
  return dataProvider.load();
}

async function loadBusinessFromSupabase(businessId) {
  if (!supabaseDataApi?.isReady || !businessId) return false;

  const data = await supabaseDataApi.loadBusinessState(businessId);
  replaceStateFromData(data);
  fillFormOptions();
  renderAll();
  return true;
}

function mapPublicBookingPage(data) {
  const business = data?.business || {};
  const publicServices = data?.services || [];
  const professionalsById = new Map();

  publicServices.forEach((service) => {
    (service.professionals || []).forEach((professional) => {
      if (!professionalsById.has(professional.id)) {
        professionalsById.set(professional.id, {
          id: professional.id,
          name: professional.name,
          role: professional.role || "Profesional",
          workStart: business.business_hours?.start || "09:00",
          workEnd: business.business_hours?.end || "18:00",
          services: [],
        });
      }
      professionalsById.get(professional.id).services.push(service.name);
    });
  });

  return {
    businessHours: {
      start: business.business_hours?.start || "09:00",
      end: business.business_hours?.end || "18:00",
      step: Number(business.business_hours?.step || 30),
    },
    business: {
      ...state.business,
      name: business.name || state.business.name,
      slug: business.slug || getPublicSlug(),
      city: business.city || state.business.city,
      type: business.business_type || state.business.type,
      minNotice: Number(business.min_notice || 0),
      autoConfirm: Boolean(business.auto_confirm),
    },
    clients: state.clients,
    appointments: state.appointments,
    blocks: state.blocks,
    services: publicServices.map((service) => ({
      id: service.id,
      name: service.name,
      category: service.category || "General",
      duration: Number(service.duration_minutes || 0),
      price: Number(service.price_cents || 0) / 100,
      professionals: (service.professionals || []).map((professional) => professional.name),
      online: true,
    })),
    team: Array.from(professionalsById.values()),
  };
}

async function loadPublicBookingFromSupabase() {
  if (!publicBookingApi?.isReady) return false;

  const data = await publicBookingApi.getBookingPage(getPublicSlug());
  replaceStateFromData(mapPublicBookingPage(data));
  fillFormOptions();
  renderAll();
  return true;
}

function getPersistableState() {
  return {
    businessHours,
    selectedDate: state.selectedDate,
    business: state.business,
    clients: state.clients,
    blocks: state.blocks,
    appointments: state.appointments,
    services,
    team,
  };
}

function saveState() {
  dataProvider.save(getPersistableState());
}

function resetDemoState() {
  dataProvider.clear();
  window.location.reload();
}

function downloadFile(filename, content, type) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const textEncoder = new TextEncoder();
let crcTable = null;

function xmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const escapeAttr = escapeHtml;

function columnName(index) {
  let name = "";
  let current = index + 1;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    current = Math.floor((current - 1) / 26);
  }
  return name;
}

function getCrcTable() {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let crc = index;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
    crcTable[index] = crc >>> 0;
  }
  return crcTable;
}

function crc32(bytes) {
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16(value) {
  return new Uint8Array([value & 0xff, (value >>> 8) & 0xff]);
}

function writeUint32(value) {
  return new Uint8Array([
    value & 0xff,
    (value >>> 8) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 24) & 0xff,
  ]);
}

function concatBytes(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  parts.forEach((part) => {
    output.set(part, offset);
    offset += part.length;
  });
  return output;
}

function createZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = textEncoder.encode(file.name);
    const dataBytes = typeof file.content === "string" ? textEncoder.encode(file.content) : file.content;
    const crc = crc32(dataBytes);

    const localHeader = concatBytes([
      writeUint32(0x04034b50),
      writeUint16(20),
      writeUint16(0),
      writeUint16(0),
      writeUint16(0),
      writeUint16(0),
      writeUint32(crc),
      writeUint32(dataBytes.length),
      writeUint32(dataBytes.length),
      writeUint16(nameBytes.length),
      writeUint16(0),
      nameBytes,
    ]);

    localParts.push(localHeader, dataBytes);

    centralParts.push(
      concatBytes([
        writeUint32(0x02014b50),
        writeUint16(20),
        writeUint16(20),
        writeUint16(0),
        writeUint16(0),
        writeUint16(0),
        writeUint16(0),
        writeUint32(crc),
        writeUint32(dataBytes.length),
        writeUint32(dataBytes.length),
        writeUint16(nameBytes.length),
        writeUint16(0),
        writeUint16(0),
        writeUint16(0),
        writeUint16(0),
        writeUint32(0),
        writeUint32(offset),
        nameBytes,
      ]),
    );

    offset += localHeader.length + dataBytes.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const end = concatBytes([
    writeUint32(0x06054b50),
    writeUint16(0),
    writeUint16(0),
    writeUint16(files.length),
    writeUint16(files.length),
    writeUint32(centralDirectory.length),
    writeUint32(offset),
    writeUint16(0),
  ]);

  return concatBytes([...localParts, centralDirectory, end]);
}

function worksheetCell(reference, value, style = 0, type = "text") {
  const styleAttr = style ? ` s="${style}"` : "";
  if (type === "number" && value !== "" && value !== null && value !== undefined) {
    return `<c r="${reference}"${styleAttr}><v>${Number(value)}</v></c>`;
  }
  return `<c r="${reference}" t="inlineStr"${styleAttr}><is><t>${xmlEscape(value)}</t></is></c>`;
}

function buildWorksheet({ title, headers, rows }) {
  const headerRowIndex = 4;
  const firstDataRow = 5;
  const lastColumn = columnName(headers.length - 1);
  const lastRow = Math.max(firstDataRow, rows.length + firstDataRow - 1);
  const columnWidths = headers
    .map((header, index) => `<col min="${index + 1}" max="${index + 1}" width="${header.width || 18}" customWidth="1"/>`)
    .join("");

  const titleRow = `<row r="1">${worksheetCell("A1", title, 1)}</row>`;
  const subtitleRow = `<row r="2">${worksheetCell("A2", `Exportado desde Turnia - ${new Date().toLocaleDateString("es-ES")}`, 4)}</row>`;
  const headerRow = `<row r="${headerRowIndex}">${headers
    .map((header, index) => worksheetCell(`${columnName(index)}${headerRowIndex}`, header.label, 2))
    .join("")}</row>`;
  const dataRows = rows
    .map((row, rowIndex) => {
      const rowNumber = firstDataRow + rowIndex;
      const cells = headers
        .map((header, columnIndex) =>
          worksheetCell(
            `${columnName(columnIndex)}${rowNumber}`,
            row[header.key],
            header.type === "money" ? 3 : 0,
            header.type === "number" || header.type === "money" ? "number" : "text",
          ),
        )
        .join("");
      return `<row r="${rowNumber}">${cells}</row>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="4" topLeftCell="A5" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <cols>${columnWidths}</cols>
  <sheetData>${titleRow}${subtitleRow}<row r="3"/>${headerRow}${dataRows}</sheetData>
  <autoFilter ref="A${headerRowIndex}:${lastColumn}${lastRow}"/>
  <mergeCells count="1"><mergeCell ref="A1:${lastColumn}1"/></mergeCells>
</worksheet>`;
}

function createWorkbookBlob({ title, headers, rows }) {
  const worksheet = buildWorksheet({ title, headers, rows });
  const files = [
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    },
    {
      name: "xl/workbook.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Turnia" sheetId="1" r:id="rId1"/></sheets>
</workbook>`,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
    },
    {
      name: "xl/styles.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0 &quot;EUR&quot;"/></numFmts>
  <fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="16"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts>
  <fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2F7D68"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"/><right style="thin"/><top style="thin"/><bottom style="thin"/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`,
    },
    { name: "xl/worksheets/sheet1.xml", content: worksheet },
  ];

  const zip = createZip(files);
  return new Blob([zip], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

function exportClientsExcel() {
  syncClientsFromAppointments();
  const headers = [
    { key: "nombre", label: "Nombre", width: 24 },
    { key: "telefono", label: "Telefono", width: 20 },
    { key: "nota", label: "Nota", width: 46 },
    { key: "citas", label: "Citas", width: 10, type: "number" },
    { key: "ingresos_estimados", label: "Ingresos estimados", width: 20, type: "money" },
  ];
  const rows = state.clients.map((client) => {
    const appointments = getAppointmentsForClient(client.phone);
    const revenue = appointments
      .filter((appointment) => ["Confirmada", "Finalizada"].includes(appointment.status))
      .reduce((sum, appointment) => sum + appointment.price, 0);

    return {
      nombre: client.name,
      telefono: client.phone,
      nota: client.note,
      citas: appointments.length,
      ingresos_estimados: revenue,
    };
  });

  downloadFile(
    "turnia-clientes.xlsx",
    createWorkbookBlob({ title: "Turnia - Clientes", headers, rows }),
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
}

function exportAppointmentsExcel() {
  const headers = [
    { key: "fecha", label: "Fecha", width: 14 },
    { key: "cliente", label: "Cliente", width: 24 },
    { key: "telefono", label: "Telefono", width: 20 },
    { key: "servicio", label: "Servicio", width: 24 },
    { key: "profesional", label: "Profesional", width: 18 },
    { key: "hora", label: "Hora", width: 10 },
    { key: "duracion", label: "Duracion min", width: 14, type: "number" },
    { key: "precio", label: "Precio", width: 12, type: "money" },
    { key: "estado", label: "Estado", width: 16 },
    { key: "nota", label: "Nota", width: 46 },
  ];
  const rows = state.appointments.map((appointment) => ({
    fecha: appointment.date || demoDate,
    cliente: appointment.client,
    telefono: appointment.phone,
    servicio: appointment.service,
    profesional: appointment.professional,
    hora: appointment.time,
    duracion: appointment.duration,
    precio: appointment.price,
    estado: appointment.status,
    nota: appointment.note,
  }));

  downloadFile(
    "turnia-citas.xlsx",
    createWorkbookBlob({ title: "Turnia - Citas", headers, rows }),
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
}

function exportBackupJson() {
  downloadFile(
    "turnia-backup.json",
    JSON.stringify(getPersistableState(), null, 2),
    "application/json;charset=utf-8",
  );
}

function toMinutes(time) {
  return TurniaAgendaRules.toMinutes(time);
}

function toTime(minutes) {
  return TurniaAgendaRules.toTime(minutes);
}

function dateFromString(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(dateString, days) {
  const date = dateFromString(dateString);
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

function getWeekStart(dateString) {
  const date = dateFromString(dateString);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return toDateString(date);
}

function formatDateLabel(dateString) {
  const date = dateFromString(dateString);
  return `${dayNames[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
}

function formatFullDate(dateString) {
  if (!dateString) return "Sin fecha";
  const date = dateFromString(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function money(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizePhone(phone) {
  return phone.replace(/[^\d]/g, "");
}

function getAppointmentId(appointment) {
  return `${appointment.date || demoDate}-${appointment.time}-${appointment.phone}-${appointment.service}`;
}

function getBlockId(block) {
  return `${block.date || demoDate}-${block.professional}-${block.start}-${block.end}-${block.reason}`;
}

function buildClientMessage(appointment, action, extra = {}) {
  if (action === "reschedule") {
    return `Hola ${appointment.client}, desde ${state.business.name} reprogramamos tu cita.\n\nServicio: ${appointment.service}\nNuevo dia: ${formatDateLabel(appointment.date || state.selectedDate)}\nNuevo horario: ${appointment.time}\nProfesional: ${appointment.professional}\n\n${extra.note || "Si necesitas otro cambio, respondemos por aqui."}`;
  }

  const template =
    action === "confirm" ? state.business.confirmTemplate : state.business.cancelTemplate;

  return template
    .replaceAll("{cliente}", appointment.client)
    .replaceAll("{negocio}", state.business.name)
    .replaceAll("{servicio}", appointment.service)
    .replaceAll("{hora}", appointment.time)
    .replaceAll("{profesional}", appointment.professional)
    .replaceAll("{precio}", money(appointment.price));
}

function getWhatsappUrl(phone, message) {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}

function getClientId(client) {
  return normalizePhone(client.phone) || client.name.toLowerCase().replaceAll(" ", "-");
}

function getClientByPhone(phone) {
  const normalized = normalizePhone(phone);
  return state.clients.find((client) => normalizePhone(client.phone) === normalized);
}

function upsertClientFromAppointment(appointment) {
  const existing = getClientByPhone(appointment.phone);
  if (existing) {
    existing.name = appointment.client;
    existing.createdAt ||= appointment.date || demoDate;
    return;
  }

  state.clients.push({
    name: appointment.client,
    phone: appointment.phone,
    email: appointment.email || "",
    createdAt: appointment.date || demoDate,
    note: appointment.note || "Cliente creado desde una cita.",
  });
}

function syncClientsFromAppointments() {
  state.appointments.forEach(upsertClientFromAppointment);
}

function normalizeMissingDays() {
  state.appointments.forEach((appointment) => {
    appointment.date ||= appointment.day
      ? addDays(demoDate, Math.max(0, ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"].indexOf(appointment.day)))
      : demoDate;
  });
  state.blocks.forEach((block) => {
    block.date ||= demoDate;
  });
}

function getRevenueAppointments() {
  return state.appointments.filter((appointment) =>
    ["Confirmada", "Finalizada"].includes(appointment.status),
  );
}

function getService(name) {
  return services.find((service) => service.name === name);
}

function getTeamMember(name) {
  return team.find((person) => person.name === name);
}

function isBlockingAppointment(appointment) {
  return TurniaAgendaRules.isBlockingAppointment(appointment);
}

function canProfessionalDoService(professionalName, serviceName) {
  const person = getTeamMember(professionalName);
  return Boolean(person && person.services.includes(serviceName));
}

function syncServiceProfessionals() {
  services.forEach((service) => {
    service.professionals = team
      .filter((person) => person.services.includes(service.name))
      .map((person) => person.name);
  });
}

function isSlotFree(professionalName, startTime, duration, ignoredAppointmentId = "", date = state.selectedDate) {
  return TurniaAgendaRules.isSlotFree({
    professionalName,
    startTime,
    duration,
    ignoredAppointmentId,
    date,
    team,
    appointments: state.appointments.map((appointment) => ({
      ...appointment,
      date: appointment.date || demoDate,
    })),
    blocks: state.blocks.map((block) => ({
      ...block,
      date: block.date || demoDate,
    })),
    getAppointmentId,
  });
}

function getAvailableSlots(serviceName, preferredProfessional = "Cualquiera", ignoredAppointmentId = "", date = state.selectedDate) {
  return TurniaAgendaRules.getAvailableSlots({
    service: getService(serviceName),
    preferredProfessional,
    ignoredAppointmentId,
    date,
    businessHours,
    team,
    appointments: state.appointments.map((appointment) => ({
      ...appointment,
      date: appointment.date || demoDate,
    })),
    blocks: state.blocks.map((block) => ({
      ...block,
      date: block.date || demoDate,
    })),
    getAppointmentId,
  });
}

function getBusinessLink() {
  return `turnia.app/${state.business.slug}`;
}

function getRecommendedOpenings() {
  return services
    .filter((service) => service.online)
    .flatMap((service) =>
      getAvailableSlots(service.name).slice(0, 1).map((slot) => ({
        time: slot.time,
        professional: slot.professionals[0],
        label: `${service.name} - ${service.duration} min`,
      })),
    )
    .slice(0, 4);
}

function renderStats() {
  const confirmed = state.appointments.filter((item) => item.status === "Confirmada").length;
  const pending = state.appointments.filter((item) => item.status === "Pendiente").length;

  document.getElementById("stat-appointments").textContent = state.appointments.length;
  document.getElementById("stat-confirmed").textContent = confirmed;
  document.getElementById("stat-pending").textContent = pending;
  document.getElementById("stat-openings").textContent = getRecommendedOpenings().length;
}

function renderAgenda() {
  const root = document.getElementById("agenda-list");
  const appointments = state.appointments
    .filter(
      (item) =>
        (item.date || demoDate) === state.selectedDate &&
        (state.activeProfessional === "Todos" ||
          item.professional === state.activeProfessional),
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  const agendaItems = [
    ...appointments.map((appointment) => ({ type: "appointment", time: appointment.time, item: appointment })),
    ...state.blocks
      .filter(
        (block) =>
          (block.date || demoDate) === state.selectedDate &&
          (state.activeProfessional === "Todos" ||
            block.professional === state.activeProfessional),
      )
      .map((block) => ({ type: "block", time: block.start, item: block })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  root.innerHTML = agendaItems
    .map(({ type, item }) => {
      if (type === "block") {
        return `
          <article class="agenda-item agenda-block">
            <div class="agenda-time">
              <strong>${escapeHtml(item.start)}</strong>
              <span>hasta ${escapeHtml(item.end)}</span>
            </div>
            <div class="agenda-main">
              <div>
                <h3>${escapeHtml(item.reason)}</h3>
                <span>${escapeHtml(item.professional)}</span>
              </div>
              <p>Horario bloqueado. No aparece disponible en el link publico.</p>
            </div>
            <div class="agenda-side">
              <span class="status-tag bloqueado">Bloqueado</span>
            </div>
          </article>
        `;
      }

      const id = getAppointmentId(item);
      const actions =
        item.status === "Pendiente"
          ? `
            <div class="appointment-actions">
              <button type="button" data-action="confirm" data-appointment-id="${escapeAttr(id)}">Confirmar</button>
              <button type="button" data-action="reschedule" data-appointment-id="${escapeAttr(id)}">Reprogramar</button>
              <button class="optional-action" type="button" data-action="cancel" data-appointment-id="${escapeAttr(id)}">Cancelar</button>
            </div>
          `
          : item.status === "Confirmada"
            ? `
              <div class="appointment-actions">
                <button type="button" data-action="whatsapp" data-appointment-id="${escapeAttr(id)}">WhatsApp</button>
                <button type="button" data-action="reschedule" data-appointment-id="${escapeAttr(id)}">Reprogramar</button>
                <button class="optional-action" type="button" data-action="finish" data-appointment-id="${escapeAttr(id)}">Finalizar</button>
                <button class="optional-action" type="button" data-action="no-show" data-appointment-id="${escapeAttr(id)}">No asistio</button>
              </div>
            `
            : "";

      return `
        <article class="agenda-item">
          <div class="agenda-time">
            <strong>${escapeHtml(item.time)}</strong>
            <span>${escapeHtml(item.duration)} min</span>
          </div>
          <div class="agenda-main">
            <div>
              <h3>${escapeHtml(item.client)}</h3>
              <span>${escapeHtml(item.service)} con ${escapeHtml(item.professional)}</span>
            </div>
            <p>${escapeHtml(item.note)}</p>
          </div>
          <div class="agenda-side">
            <span class="status-tag ${escapeAttr(getStatusClass(item.status))}">${escapeHtml(item.status)}</span>
            <strong>${escapeHtml(money(item.price))}</strong>
          </div>
          ${actions}
        </article>
      `;
    })
    .join("");

  bindAppointmentActions();
}

function renderProfessionalFilters() {
  const root = document.querySelector(".segmented-control");
  root.innerHTML = [
    '<button class="segment active" type="button" data-filter="Todos">Todos</button>',
    ...team.map(
      (person) => `<button class="segment" type="button" data-filter="${escapeAttr(person.name)}">${escapeHtml(person.name)}</button>`,
    ),
  ].join("");

  bindProfessionalFilters();
}

function renderWeekProfessionalOptions() {
  const select = document.getElementById("week-professional");
  if (!select) return;

  const current = select.value || "Todos";
  select.innerHTML = [
    '<option value="Todos">Todos los profesionales</option>',
    ...team.map((person) => `<option value="${escapeAttr(person.name)}">${escapeHtml(person.name)}</option>`),
  ].join("");
  select.value = [...team.map((person) => person.name), "Todos"].includes(current)
    ? current
    : "Todos";
}

function renderWeek() {
  const root = document.getElementById("week-grid");
  if (!root) return;

  const selectedProfessional = document.getElementById("week-professional")?.value || "Todos";
  const weekStart = getWeekStart(state.selectedDate);
  const weekDates = Array.from({ length: 6 }, (_, index) => addDays(weekStart, index));
  root.innerHTML = weekDates
    .map((date) => {
      const dayAppointments = state.appointments
        .filter(
          (appointment) =>
            (appointment.date || demoDate) === date &&
            (selectedProfessional === "Todos" ||
              appointment.professional === selectedProfessional),
        )
        .map((appointment) => ({ type: "appointment", time: appointment.time, item: appointment }));

      const dayBlocks = state.blocks
        .filter(
          (block) =>
            (block.date || demoDate) === date &&
            (selectedProfessional === "Todos" || block.professional === selectedProfessional),
        )
        .map((block) => ({ type: "block", time: block.start, item: block }));

      const items = [...dayAppointments, ...dayBlocks].sort((a, b) =>
        a.time.localeCompare(b.time),
      );

      return `
        <section class="week-day">
          <div class="week-day-head">
            <strong>${escapeHtml(formatDateLabel(date))}</strong>
            <span>${escapeHtml(items.length)} evento(s)</span>
          </div>
          <div class="week-items">
            ${
              items.length
                ? items
                    .map(({ type, item }) =>
                      type === "block"
                        ? `
                          <article class="week-item block-item">
                            <strong>${escapeHtml(item.start)} - ${escapeHtml(item.end)}</strong>
                            <span>${escapeHtml(item.professional)} - ${escapeHtml(item.reason)}</span>
                          </article>
                        `
                        : `
                          <article class="week-item">
                            <strong>${escapeHtml(item.time)} - ${escapeHtml(item.client)}</strong>
                            <span>${escapeHtml(item.service)} - ${escapeHtml(item.professional)} - ${escapeHtml(item.status)}</span>
                          </article>
                        `,
                    )
                    .join("")
                : '<p class="empty-state">Sin movimientos</p>'
            }
          </div>
        </section>
      `;
    })
    .join("");
}

function renderOpenings() {
  const root = document.getElementById("opening-list");
  root.innerHTML = getRecommendedOpenings()
    .map(
      (item) => `
        <article class="opening-item">
          <strong>${escapeHtml(item.time)}</strong>
          <div>
            <span>${escapeHtml(item.professional)}</span>
            <p>${escapeHtml(item.label)}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderBlocks() {
  const root = document.getElementById("block-list");
  if (!root) return;

  const blocks =
    state.activeProfessional === "Todos"
      ? state.blocks.filter((block) => (block.date || demoDate) === state.selectedDate)
      : state.blocks.filter(
          (block) =>
            (block.date || demoDate) === state.selectedDate &&
            block.professional === state.activeProfessional,
        );

  root.innerHTML = blocks.length
    ? blocks
        .map(
          (block) => `
            <article class="opening-item block-item">
              <strong>${escapeHtml(block.start)}</strong>
              <div>
                <span>${escapeHtml(block.professional)} hasta ${escapeHtml(block.end)}</span>
                <p>${escapeHtml(block.reason)}</p>
              </div>
              <button class="mini-danger" type="button" data-delete-block="${escapeAttr(getBlockId(block))}">Eliminar</button>
            </article>
          `,
        )
        .join("")
    : '<p class="empty-state">Sin bloqueos para este filtro.</p>';
}

function renderClients() {
  syncClientsFromAppointments();
  const input = document.getElementById("client-search");
  if (input && input.value !== clientSearchQuery) {
    input.value = clientSearchQuery;
  }

  const profiles = TurniaClients.buildClientProfiles({
    clients: state.clients,
    appointments: state.appointments,
    query: clientSearchQuery,
  });

  document.getElementById("client-list").innerHTML = profiles.length
    ? profiles
        .map((client) => {
          const lastAppointment = client.lastAppointment;
          return `
            <button class="info-card client-card ${state.selectedClientPhone === client.phone ? "active" : ""}" type="button" data-client-phone="${escapeAttr(client.phone)}">
              <span class="client-card-meta">${escapeHtml(client.firstContact ? formatFullDate(client.firstContact) : "Primer contacto pendiente")}</span>
              <h3>${escapeHtml(client.name)}</h3>
              <p>${escapeHtml(client.phone)}</p>
              <p>${escapeHtml(client.email || "Sin email")}</p>
              <strong>${escapeHtml(client.totalAppointments)} cita(s)</strong>
              <small>${lastAppointment ? `${escapeHtml(formatFullDate(lastAppointment.date))} - ${escapeHtml(lastAppointment.service)} - ${escapeHtml(lastAppointment.status)}` : "Sin citas aun"}</small>
              <span class="card-actions">
                <span class="mini-danger" data-delete-client="${escapeAttr(client.phone)}">Eliminar</span>
              </span>
            </button>
          `;
        })
        .join("")
    : '<p class="empty-state">No encontramos clientes con esa busqueda.</p>';

  bindClientCards();
  bindDeleteActions();
  renderClientDetail();
}

function getAppointmentsForClient(phone) {
  const normalized = normalizePhone(phone);
  return state.appointments.filter((appointment) => normalizePhone(appointment.phone) === normalized);
}

function renderClientDetail() {
  const root = document.getElementById("client-detail");
  if (!root) return;

  const profiles = TurniaClients.buildClientProfiles({
    clients: state.clients,
    appointments: state.appointments,
  });
  const client = profiles.find((item) => normalizePhone(item.phone) === normalizePhone(state.selectedClientPhone)) || profiles[0];

  if (!client) {
    root.innerHTML = "<p>Todavia no hay clientes cargados.</p>";
    return;
  }

  state.selectedClientPhone = client.phone;
  const message = `Hola ${client.name}, te escribimos desde ${state.business.name}.`;

  root.innerHTML = `
    <div class="client-detail-head">
      <div>
        <span class="eyebrow">Ficha cliente</span>
        <h3>${escapeHtml(client.name)}</h3>
        <p>${escapeHtml(client.phone)}${client.email ? ` - ${escapeHtml(client.email)}` : ""}</p>
      </div>
      <div class="detail-actions">
        <button class="ghost-btn mini-action" type="button" data-edit-client="${escapeAttr(client.phone)}">Editar</button>
        <a class="whatsapp-link" href="${escapeAttr(getWhatsappUrl(client.phone, message))}" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </div>
    <div class="client-note">
      <strong>Nota interna</strong>
      <p>${escapeHtml(client.note || "Sin notas.")}</p>
    </div>
    <div class="client-metrics">
      <article><strong>${escapeHtml(client.firstContact ? formatFullDate(client.firstContact) : "Sin fecha")}</strong><span>Primer contacto</span></article>
      <article><strong>${escapeHtml(client.totalAppointments)}</strong><span>Total citas</span></article>
      <article><strong>${escapeHtml(money(client.estimatedRevenue))}</strong><span>Ingresos estimados</span></article>
      <article><strong>${escapeHtml(client.email || "Sin email")}</strong><span>Email</span></article>
    </div>
    <h3>Historial</h3>
    <div class="client-history">
      ${
        client.history.length
          ? client.history
              .map(
                (appointment) => `
                  <article>
                    <strong>${escapeHtml(formatFullDate(appointment.date))} · ${escapeHtml(appointment.time)} · ${escapeHtml(appointment.service)}</strong>
                    <span>${escapeHtml(appointment.professional)} · ${escapeHtml(appointment.status)} · ${escapeHtml(money(appointment.price))}</span>
                    <p>${escapeHtml(appointment.note || "Sin nota.")}</p>
                  </article>
                `,
              )
              .join("")
          : "<p>Este cliente todavia no tiene citas.</p>"
      }
    </div>
  `;
}

function renderServices() {
  document.getElementById("service-list").innerHTML = services
    .map(
      (service) => `
        <article class="info-card">
          <span>${escapeHtml(service.category)}</span>
          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.duration)} minutos - ${service.professionals.map(escapeHtml).join(", ")}</p>
          <strong>${escapeHtml(money(service.price))}</strong>
          <small>${service.online ? "Visible online" : "Solo interno"}</small>
          <button class="ghost-btn mini-action" type="button" data-edit-service="${escapeAttr(service.name)}">Editar</button>
          <button class="mini-danger" type="button" data-delete-service="${escapeAttr(service.name)}">Eliminar</button>
        </article>
      `,
    )
    .join("");

  bindDeleteActions();
}

function renderTeam() {
  document.getElementById("team-list").innerHTML = team
    .map((person) => {
      const appointments = state.appointments.filter(
        (item) => item.professional === person.name && isBlockingAppointment(item),
      ).length;
      const nextSlot = services
        .filter((service) => person.services.includes(service.name))
        .flatMap((service) => getAvailableSlots(service.name, person.name))
        .sort((a, b) => a.time.localeCompare(b.time))[0];

      return `
        <article class="info-card professional-card">
          <div class="avatar">${escapeHtml(person.name.slice(0, 1))}</div>
          <h3>${escapeHtml(person.name)}</h3>
          <p>${escapeHtml(person.role)}</p>
          <strong>${escapeHtml(appointments)} citas - libre ${escapeHtml(nextSlot ? nextSlot.time : "sin huecos")}</strong>
          <button class="ghost-btn mini-action" type="button" data-edit-professional="${escapeAttr(person.name)}">Editar</button>
          <button class="mini-danger" type="button" data-delete-professional="${escapeAttr(person.name)}">Eliminar</button>
        </article>
      `;
    })
    .join("");

  bindDeleteActions();
}

function groupCount(items, keyGetter) {
  return items.reduce((acc, item) => {
    const key = keyGetter(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function formatReportDate(date) {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(date);
}

function renderChart(chartKey, canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;

  if (reportCharts[chartKey]) {
    reportCharts[chartKey].destroy();
  }

  reportCharts[chartKey] = new Chart(canvas, config);
}

function renderReportCharts(metrics) {
  const statusLabels = TurniaMetrics.STATUS_LABELS;
  const statusValues = statusLabels.map((status) => metrics.statusCounts[status] || 0);
  const demandLabels = metrics.demandByHour.map((item) => item.label);
  const demandValues = metrics.demandByHour.map((item) => item.count);

  renderChart("status", "status-chart", {
    type: "bar",
    data: {
      labels: statusLabels,
      datasets: [
        {
          data: statusValues,
          backgroundColor: ["#f59e0b", "#7c9e8f", "#b5835a", "#ef4444", "#8c7b72"],
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, ticks: { precision: 0 } },
      },
    },
  });

  renderChart("demand", "demand-chart", {
    type: "line",
    data: {
      labels: demandLabels.length ? demandLabels : ["Sin datos"],
      datasets: [
        {
          data: demandValues.length ? demandValues : [0],
          borderColor: "#b5835a",
          backgroundColor: "rgba(181, 131, 90, 0.16)",
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: "#b5835a",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, ticks: { precision: 0 } },
      },
    },
  });
}

function renderReports() {
  const metrics = TurniaMetrics.buildDashboardMetrics({
    appointments: state.appointments,
    period: reportPeriod,
    referenceDate: state.selectedDate,
  });
  const pending = metrics.statusCounts.Pendiente || 0;
  const confirmed = metrics.statusCounts.Confirmada || 0;
  const cancelled = metrics.statusCounts.Cancelada || 0;
  const finished = metrics.statusCounts.Finalizada || 0;

  const stats = [
    { label: "Citas del periodo", value: metrics.totalAppointments },
    { label: "Ingresos estimados", value: money(metrics.estimatedRevenue) },
    { label: "Ticket medio", value: money(metrics.averageTicket) },
    { label: "Pendientes", value: pending },
    { label: "Confirmadas", value: confirmed },
    { label: "Finalizadas", value: finished },
    { label: "Canceladas", value: cancelled },
    { label: "Hora fuerte", value: metrics.busiestHour?.label || "Sin datos" },
    { label: "Dia fuerte", value: metrics.busiestDay?.label || "Sin datos" },
  ];

  document.querySelectorAll("[data-report-period]").forEach((button) => {
    button.classList.toggle("active", button.dataset.reportPeriod === reportPeriod);
  });

  document.getElementById("report-title").textContent = `Resumen - ${metrics.range.label}`;
  const reportEndDate = dateFromString(addDays(toDateString(metrics.range.end), -1));
  document.getElementById("report-period-label").textContent =
    `${formatReportDate(metrics.range.start)} al ${formatReportDate(reportEndDate)}`;

  document.getElementById("report-grid").innerHTML = stats
    .map(
      (stat) => `
        <article class="report-card">
          <span>${escapeHtml(stat.label)}</span>
          <strong>${escapeHtml(stat.value)}</strong>
        </article>
      `,
    )
    .join("");

  document.getElementById("top-services").innerHTML = metrics.topServices.length
    ? metrics.topServices
        .map(
          (item) => `
            <article>
              <strong>${escapeHtml(item.label)}</strong>
              <span>${escapeHtml(item.count)} turnos</span>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-state">Todavia no hay citas en este periodo.</p>`;

  document.getElementById("professional-report").innerHTML = team
    .map((person) => {
      const appointments = metrics.appointments.filter((item) => item.professional === person.name);
      const income = appointments
        .filter((item) => ["Confirmada", "Finalizada"].includes(item.status))
        .reduce((sum, item) => sum + item.price, 0);

      return `
        <article>
          <strong>${escapeHtml(person.name)}</strong>
          <span>${escapeHtml(appointments.length)} turnos - ${escapeHtml(money(income))}</span>
        </article>
      `;
    })
    .join("");

  const bestService = metrics.topServices[0]?.label || "todavia sin datos";
  const strongestDemand = metrics.busiestHour?.label
    ? `La hora con mas movimiento es ${metrics.busiestHour.label}`
    : "Todavia no hay una hora destacada";
  document.getElementById("report-insight").textContent =
    `${metrics.range.label}: el servicio con mas movimiento es ${bestService}. ${strongestDemand}. Hay ${pending} cita(s) pendiente(s) para revisar.`;

  renderReportCharts(metrics);
}

function renderBusinessIdentity() {
  document.querySelectorAll("[data-business-name]").forEach((item) => {
    item.textContent = state.business.name;
  });

  document.querySelectorAll("[data-business-link]").forEach((item) => {
    item.textContent = getBusinessLink();
  });
}

function renderSettings() {
  const form = document.getElementById("settings-form");
  if (!form) return;

  if (state.activeView !== "configuracion") {
    form.elements.businessName.value = state.business.name;
    form.elements.slug.value = state.business.slug;
    form.elements.city.value = state.business.city;
    form.elements.businessPhone.value = state.business.phone;
    form.elements.businessType.value = state.business.type || "Fisioterapia y bienestar";
    form.elements.start.value = businessHours.start;
    form.elements.end.value = businessHours.end;
    form.elements.step.value = String(businessHours.step);
    form.elements.minNotice.value = String(state.business.minNotice);
    form.elements.autoConfirm.checked = state.business.autoConfirm;
    form.elements.allowClientCancel.checked = state.business.allowClientCancel;
    form.elements.confirmTemplate.value = state.business.confirmTemplate;
    form.elements.cancelTemplate.value = state.business.cancelTemplate;
  }

  document.getElementById("setup-summary").innerHTML = `
    <article><strong>${escapeHtml(state.business.name)}</strong><span>${escapeHtml(state.business.city)}</span></article>
    <article><strong>${escapeHtml(state.business.type || "Negocio con turnos")}</strong><span>Tipo de negocio</span></article>
    <article><strong>${escapeHtml(getBusinessLink())}</strong><span>Link publico</span></article>
    <article><strong>${escapeHtml(businessHours.start)} - ${escapeHtml(businessHours.end)}</strong><span>Horario general</span></article>
    <article><strong>${escapeHtml(businessHours.step)} min</strong><span>Intervalo de reserva</span></article>
    <article><strong>${state.business.autoConfirm ? "Automatica" : "Pendiente"}</strong><span>Entrada de reservas online</span></article>
  `;
}

function selectMultipleOptions(select, values) {
  Array.from(select.options).forEach((option) => {
    option.selected = values.includes(option.value);
  });
}

function openServiceModal(serviceName = "") {
  fillFormOptions();
  const form = document.getElementById("service-form");
  const title = document.getElementById("service-title");
  form.reset();
  form.elements.originalName.value = "";

  if (serviceName) {
    const service = getService(serviceName);
    if (!service) return;

    title.textContent = "Editar servicio";
    form.elements.originalName.value = service.name;
    form.elements.name.value = service.name;
    form.elements.category.value = service.category;
    form.elements.duration.value = service.duration;
    form.elements.price.value = service.price;
    form.elements.online.checked = service.online;
    selectMultipleOptions(form.elements.professionals, service.professionals);
  } else {
    title.textContent = "Nuevo servicio";
  }

  document.getElementById("service-modal").classList.add("visible");
  document.getElementById("service-modal").setAttribute("aria-hidden", "false");
}

function openProfessionalModal(professionalName = "") {
  fillFormOptions();
  const form = document.getElementById("professional-form");
  const title = document.getElementById("professional-title");
  form.reset();
  form.elements.originalName.value = "";

  if (professionalName) {
    const person = getTeamMember(professionalName);
    if (!person) return;

    title.textContent = "Editar profesional";
    form.elements.originalName.value = person.name;
    form.elements.name.value = person.name;
    form.elements.role.value = person.role;
    form.elements.workStart.value = person.workStart;
    form.elements.workEnd.value = person.workEnd;
    selectMultipleOptions(form.elements.services, person.services);
  } else {
    title.textContent = "Nuevo profesional";
  }

  document.getElementById("professional-modal").classList.add("visible");
  document.getElementById("professional-modal").setAttribute("aria-hidden", "false");
}

function openClientModal(phone = "") {
  const form = document.getElementById("client-form");
  const title = document.getElementById("client-title");
  form.reset();
  form.elements.originalPhone.value = "";

  if (phone) {
    const client = getClientByPhone(phone);
    if (!client) return;

    title.textContent = "Editar cliente";
    form.elements.originalPhone.value = client.phone;
    form.elements.name.value = client.name;
    form.elements.phone.value = client.phone;
    form.elements.email.value = client.email || "";
    form.elements.note.value = client.note;
  } else {
    title.textContent = "Nuevo cliente";
  }

  document.getElementById("client-modal").classList.add("visible");
  document.getElementById("client-modal").setAttribute("aria-hidden", "false");
}

function renderClientProfessionals() {
  const serviceName = document.getElementById("client-service-select").value;
  const service = getService(serviceName);
  const select = document.getElementById("client-professional-select");
  if (!service) {
    select.innerHTML = '<option value="Cualquiera">Cualquiera disponible</option>';
    return;
  }

  select.innerHTML = [
    '<option value="Cualquiera">Cualquiera disponible</option>',
    ...service.professionals.map((name) => `<option value="${escapeAttr(name)}">${escapeHtml(name)}</option>`),
  ].join("");
}

function renderSlotButtons(slots) {
  document.getElementById("slot-list").innerHTML = slots.length
    ? slots
        .map(
          (slot) => `
            <button class="slot-btn ${state.selectedClientSlot === slot.time ? "active" : ""}" type="button" data-slot="${escapeAttr(slot.time)}" data-slot-professional="${escapeAttr(slot.professional || slot.professionals?.[0] || "")}" data-slot-professional-id="${escapeAttr(slot.professionalId || "")}">
              <strong>${escapeHtml(slot.time)}</strong>
              <span>${escapeHtml(slot.label)}</span>
            </button>
          `,
        )
        .join("")
    : '<p class="empty-state">No hay horarios disponibles para esta combinacion.</p>';

  document.querySelectorAll("[data-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedClientSlot = button.dataset.slot;
      document.querySelectorAll("[data-slot]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
    });
  });
}

async function loadPublicSlots({ service, professional, date, requestId }) {
  try {
    const selectedProfessional = getTeamMember(professional);
    const response = await publicBookingApi.getAvailableSlots({
      slug: state.business.slug,
      serviceId: service.id,
      date,
      professionalId: professional === "Cualquiera" ? null : selectedProfessional?.id,
    });

    if (requestId !== publicSlotsRequestId) return;

    renderSlotButtons((response.slots || []).map((slot) => {
      const availableProfessionals = slot.professionals || [];
      const firstProfessional = availableProfessionals[0] || {};
      return {
        time: slot.time,
        label: availableProfessionals.length
          ? availableProfessionals.map((item) => item.name).join(", ")
          : "Disponible",
        professional: firstProfessional.name || "",
        professionalId: firstProfessional.id || "",
      };
    }));
  } catch (error) {
    if (requestId !== publicSlotsRequestId) return;
    document.getElementById("slot-list").innerHTML =
      `<p class="empty-state">${escapeHtml(error.message || "No se pudieron cargar horarios.")}</p>`;
  }
}

function renderClientBooking() {
  const serviceName = document.getElementById("client-service-select").value;
  const professional = document.getElementById("client-professional-select").value;
  const date = document.querySelector("#client-booking-form [name='date']").value || state.selectedDate;
  const service = getService(serviceName);
  if (!service) {
    document.getElementById("service-summary").innerHTML = "<strong>Sin servicios disponibles</strong>";
    document.getElementById("slot-list").innerHTML = '<p class="empty-state">No hay servicios visibles para reservar.</p>';
    return;
  }
  const usePublicApi = shouldUsePublicBookingApi() && service.id;
  const slots = usePublicApi ? [] : getAvailableSlots(serviceName, professional, "", date);

  document.getElementById("service-summary").innerHTML = `
    <strong>${escapeHtml(service.name)}</strong>
    <span>${escapeHtml(service.category)} - ${escapeHtml(service.duration)} min - ${escapeHtml(money(service.price))}</span>
  `;

  if (usePublicApi) {
    const requestId = publicSlotsRequestId + 1;
    publicSlotsRequestId = requestId;
    document.getElementById("slot-list").innerHTML = '<p class="empty-state">Cargando horarios reales...</p>';
    loadPublicSlots({ service, professional, date, requestId });
  } else {
    renderSlotButtons(slots.map((slot) => ({
      ...slot,
      professional: slot.professionals[0],
      label: slot.label,
    })));
  }

  document.getElementById("sync-list").innerHTML = [
    "Citas pendientes bloquean el hueco.",
    "Citas confirmadas bloquean el hueco.",
    "El servicio debe entrar completo.",
    "El profesional debe poder hacer ese servicio.",
  ]
    .map((item) => `<span>${item}</span>`)
    .join("");

}

function fillFormOptions() {
  syncServiceProfessionals();

  document.getElementById("service-select").innerHTML = services
    .map((service) => `<option>${escapeHtml(service.name)}</option>`)
    .join("");

  document.getElementById("professional-select").innerHTML = team
    .map((person) => `<option>${escapeHtml(person.name)}</option>`)
    .join("");

  document.getElementById("block-professional-select").innerHTML = team
    .map((person) => `<option>${escapeHtml(person.name)}</option>`)
    .join("");

  document.getElementById("client-service-select").innerHTML = services
    .filter((service) => service.online)
    .map((service) => `<option>${escapeHtml(service.name)}</option>`)
    .join("");

  document.getElementById("service-professionals").innerHTML = team
    .map((person) => `<option value="${escapeAttr(person.name)}">${escapeHtml(person.name)}</option>`)
    .join("");

  document.getElementById("professional-services").innerHTML = services
    .map((service) => `<option value="${escapeAttr(service.name)}">${escapeHtml(service.name)}</option>`)
    .join("");

  renderClientProfessionals();
}

function renderDateControls() {
  document.getElementById("agenda-date").value = state.selectedDate;
  document.getElementById("agenda-date-label").textContent = formatDateLabel(state.selectedDate);
  document.querySelector("#booking-form [name='date']").value = state.selectedDate;
  document.querySelector("#client-booking-form [name='date']").value ||= state.selectedDate;
  document.querySelector("#block-form [name='date']").value = state.selectedDate;
}

function setView(view) {
  state.activeView = view;

  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `view-${view}`);
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  if (view === "reserva") {
    state.selectedClientSlot = "";
    renderClientBooking();
  }
}

function enterApp(mode = "business") {
  document.getElementById("entry-screen").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  document.body.classList.toggle("public-mode", mode === "client" || mode === "direct-client");
  document.body.classList.toggle("direct-client-mode", mode === "direct-client");
  setView(mode === "client" || mode === "direct-client" ? "reserva" : "agenda");
  if ((mode === "client" || mode === "direct-client") && publicBookingApi?.isReady) {
    loadPublicBookingFromSupabase().catch((error) => {
      document.getElementById("slot-list").innerHTML =
        `<p class="empty-state">${escapeHtml(error.message || "No se pudo cargar el link publico.")}</p>`;
    });
  }
}

function exitApp() {
  authProvider.signOut();
  document.body.classList.remove("public-mode");
  document.body.classList.remove("direct-client-mode");
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("entry-screen").classList.remove("hidden");
}

function showAuthMessage(message, type = "info") {
  const messageBox = document.getElementById("auth-message");
  messageBox.textContent = message;
  messageBox.dataset.type = type;
  messageBox.classList.remove("hidden");
}

function clearAuthMessage() {
  const messageBox = document.getElementById("auth-message");
  messageBox.textContent = "";
  messageBox.classList.add("hidden");
}

async function handleBusinessSession(session) {
  if (session?.pendingRedirect) {
    showAuthMessage(session.message, "info");
    return;
  }

  if (!session.business) {
    showAuthMessage(
      "Tu usuario inicio sesion, pero todavia no tiene un negocio asignado. En produccion, Turnia mostraria esta pantalla hasta que lo asociemos a un negocio.",
      "warning",
    );
    return;
  }

  clearAuthMessage();
  currentSession = session;
  if (supabaseDataApi?.isReady && session.business.id) {
    showAuthMessage("Cargando datos reales del negocio...", "info");
    try {
      await loadBusinessFromSupabase(session.business.id);
      clearAuthMessage();
    } catch (error) {
      showAuthMessage(error.message || "No se pudieron cargar los datos reales.", "warning");
      return;
    }
  }
  enterApp("business");
}

function addAppointmentFromForm(formData, status, forcedTime, forcedProfessional) {
  const selectedService = getService(formData.get("service"));
  const professional = forcedProfessional || formData.get("professional");
  const time = forcedTime || formData.get("time");

  if (!canProfessionalDoService(professional, selectedService.name)) {
    return { ok: false, message: "Ese profesional no realiza este servicio." };
  }

  const date = formData.get("date") || state.selectedDate;

  if (!isSlotFree(professional, time, selectedService.duration, "", date)) {
    return { ok: false, message: "Ese horario ya no esta disponible." };
  }

  state.appointments.push({
    date,
    time,
    client: formData.get("client"),
    phone: formData.get("phone") || "Sin telefono",
    service: selectedService.name,
    professional,
    duration: selectedService.duration,
    price: selectedService.price,
    status,
    note: formData.get("note") || "Sin notas.",
  });

  upsertClientFromAppointment({
    client: formData.get("client"),
    phone: formData.get("phone") || "Sin telefono",
    note: formData.get("note") || "Sin notas.",
  });

  return { ok: true };
}

function findAppointmentById(id) {
  return state.appointments.find((appointment) => getAppointmentId(appointment) === id);
}

function renderMessagePreview() {
  const root = document.getElementById("message-preview");
  if (!root) return;

  if (!state.lastMessage) {
    root.innerHTML = "<p>Cuando confirmes o canceles una cita, Turnia preparara el WhatsApp para enviar.</p>";
    return;
  }

  root.innerHTML = `
    <strong>${escapeHtml(state.lastMessage.title)}</strong>
    <pre>${escapeHtml(state.lastMessage.text)}</pre>
    <a class="whatsapp-link" href="${escapeAttr(state.lastMessage.url)}" target="_blank" rel="noreferrer">Abrir WhatsApp</a>
  `;
}

function prepareWhatsappMessage(appointment, action) {
  const text = buildClientMessage(appointment, action);
  state.lastMessage = {
    title: action === "confirm" ? "Confirmacion lista" : "Cancelacion lista",
    text,
    url: getWhatsappUrl(appointment.phone, text),
  };
  renderMessagePreview();
  window.open(state.lastMessage.url, "_blank");
}

function prepareRescheduleMessage(appointment, note) {
  const text = buildClientMessage(appointment, "reschedule", { note });
  state.lastMessage = {
    title: "Reprogramacion lista",
    text,
    url: getWhatsappUrl(appointment.phone, text),
  };
  renderMessagePreview();
  window.open(state.lastMessage.url, "_blank");
}

function renderRescheduleSlots(appointment) {
  const professional = document.getElementById("reschedule-professional").value;
  const date = document.getElementById("reschedule-date").value || appointment.date || state.selectedDate;
  const slots = getAvailableSlots(
    appointment.service,
    professional,
    getAppointmentId(appointment),
    date,
  );

  document.getElementById("reschedule-time").innerHTML = slots.length
    ? slots
        .map((slot) => `<option value="${escapeAttr(slot.time)}">${escapeHtml(slot.time)} - ${escapeHtml(slot.label)}</option>`)
        .join("")
    : '<option value="">Sin horarios disponibles</option>';
}

function openRescheduleModal(appointment) {
  const modal = document.getElementById("reschedule-modal");
  const professionalSelect = document.getElementById("reschedule-professional");
  const service = getService(appointment.service);

  document.querySelector("#reschedule-form [name='appointmentId']").value =
    getAppointmentId(appointment);
  document.getElementById("reschedule-date").value = appointment.date || state.selectedDate;
  document.getElementById("reschedule-summary").innerHTML = `
    <strong>${escapeHtml(appointment.client)}</strong>
    <span>${escapeHtml(appointment.service)} - ${escapeHtml(formatDateLabel(appointment.date || state.selectedDate))} ${escapeHtml(appointment.time)} con ${escapeHtml(appointment.professional)}</span>
  `;

  professionalSelect.innerHTML = service.professionals
    .map(
      (professional) =>
        `<option value="${escapeAttr(professional)}" ${professional === appointment.professional ? "selected" : ""}>${escapeHtml(professional)}</option>`,
    )
    .join("");

  renderRescheduleSlots(appointment);
  modal.classList.add("visible");
  modal.setAttribute("aria-hidden", "false");
}

function updateAppointmentStatus(id, status, notifyClient = true) {
  const appointment = findAppointmentById(id);
  if (!appointment) return;

  appointment.status = status;
  if (notifyClient) {
    prepareWhatsappMessage(appointment, status === "Confirmada" ? "confirm" : "cancel");
  }
  saveState();
  renderAll();
  setView("agenda");
}

function bindAppointmentActions() {
  document.querySelectorAll("[data-appointment-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const appointment = findAppointmentById(button.dataset.appointmentId);
      if (!appointment) return;

      if (button.dataset.action === "confirm") {
        updateAppointmentStatus(button.dataset.appointmentId, "Confirmada");
      }

      if (button.dataset.action === "cancel") {
        updateAppointmentStatus(button.dataset.appointmentId, "Cancelada");
      }

      if (button.dataset.action === "whatsapp") {
        prepareWhatsappMessage(appointment, "confirm");
        saveState();
      }

      if (button.dataset.action === "finish") {
        updateAppointmentStatus(button.dataset.appointmentId, "Finalizada", false);
      }

      if (button.dataset.action === "no-show") {
        updateAppointmentStatus(button.dataset.appointmentId, "No asistio", false);
      }

      if (button.dataset.action === "reschedule") {
        openRescheduleModal(appointment);
      }
    });
  });
}

function bindEvents() {
  document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const session = await authProvider.signInWithEmail({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      await handleBusinessSession(session);
    } catch (error) {
      showAuthMessage(error.message, "warning");
    }
  });

  document.getElementById("google-login")?.addEventListener("click", async () => {
    try {
      const session = await authProvider.signInWithGoogle();
      await handleBusinessSession(session);
    } catch (error) {
      showAuthMessage(error.message, "warning");
    }
  });

  document.getElementById("enter-client").addEventListener("click", () => {
    enterApp("client");
  });

  document.getElementById("back-entry").addEventListener("click", exitApp);
  document.getElementById("exit-demo").addEventListener("click", exitApp);
  document.getElementById("public-back-entry").addEventListener("click", exitApp);
  document.getElementById("public-back-business").addEventListener("click", () => {
    document.body.classList.remove("public-mode");
    setView("agenda");
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("public-mode", button.dataset.view === "reserva");
      document.body.classList.remove("direct-client-mode");
      setView(button.dataset.view);
    });
  });

  document.getElementById("agenda-date").addEventListener("change", (event) => {
    state.selectedDate = event.target.value || demoDate;
    saveState();
    renderAll();
  });

  bindProfessionalFilters();

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(button.dataset.closeModal);
      modal.classList.remove("visible");
      modal.setAttribute("aria-hidden", "true");
    });
  });

  document.getElementById("open-service").addEventListener("click", () => {
    openServiceModal();
  });

  document.getElementById("reset-demo").addEventListener("click", () => {
    if (confirm("Esto borra los cambios guardados en esta demo y restaura los datos iniciales.")) {
      resetDemoState();
    }
  });

  document.getElementById("open-client").addEventListener("click", () => {
    openClientModal();
  });

  document.getElementById("client-search").addEventListener("input", (event) => {
    clientSearchQuery = event.currentTarget.value;
    renderClients();
  });

  document.getElementById("open-block").addEventListener("click", () => {
    fillFormOptions();
    document.getElementById("block-modal").classList.add("visible");
    document.getElementById("block-modal").setAttribute("aria-hidden", "false");
  });

  document.getElementById("reschedule-professional").addEventListener("change", () => {
    const id = document.querySelector("#reschedule-form [name='appointmentId']").value;
    const appointment = findAppointmentById(id);
    if (appointment) {
      renderRescheduleSlots(appointment);
    }
  });

  document.getElementById("reschedule-date").addEventListener("change", () => {
    const id = document.querySelector("#reschedule-form [name='appointmentId']").value;
    const appointment = findAppointmentById(id);
    if (appointment) {
      renderRescheduleSlots(appointment);
    }
  });

  document.getElementById("reschedule-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const appointment = findAppointmentById(formData.get("appointmentId"));
    if (!appointment) return;

    const newProfessional = formData.get("professional");
    const newDate = formData.get("date");
    const newTime = formData.get("time");
    const service = getService(appointment.service);

    if (!newTime) {
      alert("No hay horario disponible para esa combinacion.");
      return;
    }

    if (!isSlotFree(newProfessional, newTime, service.duration, getAppointmentId(appointment), newDate)) {
      alert("Ese horario ya no esta disponible.");
      renderRescheduleSlots(appointment);
      return;
    }

    appointment.date = newDate;
    appointment.professional = newProfessional;
    appointment.time = newTime;
    appointment.status = "Pendiente";
    appointment.note = formData.get("note") || appointment.note;

    prepareRescheduleMessage(appointment, formData.get("note"));
    event.currentTarget.reset();
    document.getElementById("reschedule-modal").classList.remove("visible");
    document.getElementById("reschedule-modal").setAttribute("aria-hidden", "true");
    saveState();
    renderAll();
    setView("agenda");
  });

  document.getElementById("block-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const start = formData.get("start");
    const end = formData.get("end");

    if (toMinutes(end) <= toMinutes(start)) {
      alert("El fin del bloqueo tiene que ser posterior al inicio.");
      return;
    }

    state.blocks.push({
      date: formData.get("date") || state.selectedDate,
      professional: formData.get("professional"),
      start,
      end,
      reason: formData.get("reason").trim() || "Bloqueo",
    });

    event.currentTarget.reset();
    document.getElementById("block-modal").classList.remove("visible");
    document.getElementById("block-modal").setAttribute("aria-hidden", "true");
    saveState();
    renderAll();
    setView("agenda");
  });

  document.getElementById("client-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phone = formData.get("phone").trim();
    const originalPhone = formData.get("originalPhone");
    const existing = getClientByPhone(originalPhone || phone);

    if (existing) {
      existing.name = formData.get("name").trim();
      existing.phone = phone;
      existing.email = formData.get("email").trim();
      existing.createdAt ||= state.selectedDate || demoDate;
      existing.note = formData.get("note").trim();

      state.appointments.forEach((appointment) => {
        if (normalizePhone(appointment.phone) === normalizePhone(originalPhone)) {
          appointment.client = existing.name;
          appointment.phone = phone;
        }
      });
    } else {
      state.clients.push({
        name: formData.get("name").trim(),
        phone,
        email: formData.get("email").trim(),
        createdAt: state.selectedDate || demoDate,
        note: formData.get("note").trim(),
      });
    }

    state.selectedClientPhone = phone;
    event.currentTarget.reset();
    document.getElementById("client-modal").classList.remove("visible");
    document.getElementById("client-modal").setAttribute("aria-hidden", "true");
    saveState();
    renderAll();
    setView("clientes");
  });

  document.getElementById("open-professional").addEventListener("click", () => {
    openProfessionalModal();
  });

  document.getElementById("service-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const originalName = formData.get("originalName");
    const selectedProfessionals = formData.getAll("professionals");

    if (
      services.some(
        (service) =>
          service.name.toLowerCase() === name.toLowerCase() &&
          service.name !== originalName,
      )
    ) {
      alert("Ya existe un servicio con ese nombre.");
      return;
    }

    const payload = {
      name,
      category: formData.get("category").trim() || "General",
      duration: Number(formData.get("duration")),
      price: Number(formData.get("price")),
      professionals: selectedProfessionals,
      online: formData.has("online"),
    };

    if (originalName) {
      const service = getService(originalName);
      Object.assign(service, payload);
      state.appointments.forEach((appointment) => {
        if (appointment.service === originalName) {
          appointment.service = name;
          appointment.duration = payload.duration;
          appointment.price = payload.price;
        }
      });
    } else {
      services.push(payload);
    }

    selectedProfessionals.forEach((professionalName) => {
      const person = getTeamMember(professionalName);
      if (person && originalName && person.services.includes(originalName)) {
        person.services = person.services.map((service) =>
          service === originalName ? name : service,
        );
      }
      if (person && !person.services.includes(name)) {
        person.services.push(name);
      }
    });
    team.forEach((person) => {
      if (!selectedProfessionals.includes(person.name)) {
        person.services = person.services.filter((service) => service !== name && service !== originalName);
      }
    });

    event.currentTarget.reset();
    document.getElementById("service-modal").classList.remove("visible");
    document.getElementById("service-modal").setAttribute("aria-hidden", "true");
    fillFormOptions();
    saveState();
    renderAll();
    setView("servicios");
  });

  document.getElementById("professional-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const originalName = formData.get("originalName");

    if (
      team.some(
        (person) =>
          person.name.toLowerCase() === name.toLowerCase() &&
          person.name !== originalName,
      )
    ) {
      alert("Ya existe un profesional con ese nombre.");
      return;
    }

    const payload = {
      name,
      role: formData.get("role").trim() || "Profesional",
      workStart: formData.get("workStart"),
      workEnd: formData.get("workEnd"),
      services: formData.getAll("services"),
    };

    if (originalName) {
      const person = getTeamMember(originalName);
      Object.assign(person, payload);
      state.appointments.forEach((appointment) => {
        if (appointment.professional === originalName) {
          appointment.professional = name;
        }
      });
      state.blocks.forEach((block) => {
        if (block.professional === originalName) {
          block.professional = name;
        }
      });
    } else {
      team.push(payload);
    }

    event.currentTarget.reset();
    document.getElementById("professional-modal").classList.remove("visible");
    document.getElementById("professional-modal").setAttribute("aria-hidden", "true");
    fillFormOptions();
    renderProfessionalFilters();
    saveState();
    renderAll();
    setView("equipo");
  });

  bindBookingEvents();
}

function bindProfessionalFilters() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeProfessional = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderAgenda();
    });
  });
}

function bindClientCards() {
  document.querySelectorAll("[data-client-phone]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedClientPhone = button.dataset.clientPhone;
      renderClients();
    });
  });
}

function bindDeleteActions() {
  document.querySelectorAll("[data-delete-block]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = button.dataset.deleteBlock;
      state.blocks = state.blocks.filter((block) => getBlockId(block) !== id);
      saveState();
      renderAll();
    });
  });

  document.querySelectorAll("[data-edit-service]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openServiceModal(button.dataset.editService);
    });
  });

  document.querySelectorAll("[data-edit-professional]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openProfessionalModal(button.dataset.editProfessional);
    });
  });

  document.querySelectorAll("[data-edit-client]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openClientModal(button.dataset.editClient);
    });
  });

  document.querySelectorAll("[data-delete-service]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const serviceName = button.dataset.deleteService;
      const hasAppointments = state.appointments.some(
        (appointment) => appointment.service === serviceName,
      );
      if (hasAppointments) {
        alert("No se puede eliminar un servicio con citas asociadas en esta demo.");
        return;
      }

      const index = services.findIndex((service) => service.name === serviceName);
      if (index >= 0) {
        services.splice(index, 1);
        team.forEach((person) => {
          person.services = person.services.filter((service) => service !== serviceName);
        });
        saveState();
        fillFormOptions();
        renderAll();
      }
    });
  });

  document.querySelectorAll("[data-delete-professional]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const professionalName = button.dataset.deleteProfessional;
      const hasAppointments = state.appointments.some(
        (appointment) => appointment.professional === professionalName,
      );
      if (hasAppointments) {
        alert("No se puede eliminar un profesional con citas asociadas en esta demo.");
        return;
      }

      const index = team.findIndex((person) => person.name === professionalName);
      if (index >= 0) {
        team.splice(index, 1);
        saveState();
        fillFormOptions();
        renderProfessionalFilters();
        renderAll();
      }
    });
  });

  document.querySelectorAll("[data-delete-client]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const phone = button.dataset.deleteClient;
      const hasAppointments = getAppointmentsForClient(phone).length > 0;
      if (hasAppointments) {
        alert("No se puede eliminar un cliente con historial de citas en esta demo.");
        return;
      }

      state.clients = state.clients.filter(
        (client) => normalizePhone(client.phone) !== normalizePhone(phone),
      );
      state.selectedClientPhone = "";
      saveState();
      renderAll();
    });
  });
}

function bindBookingEvents() {
  const modal = document.getElementById("booking-modal");
  document.getElementById("open-booking").addEventListener("click", () => {
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
  });

  document.getElementById("close-booking").addEventListener("click", () => {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
  });

  document.getElementById("booking-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const result = addAppointmentFromForm(
      new FormData(event.currentTarget),
      new FormData(event.currentTarget).get("status"),
    );

    if (!result.ok) {
      alert(result.message);
      return;
    }

    event.currentTarget.reset();
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
    saveState();
    renderAll();
    setView("agenda");
  });

  document.getElementById("client-service-select").addEventListener("change", () => {
    state.selectedClientSlot = "";
    renderClientProfessionals();
    renderClientBooking();
  });

  document.getElementById("client-professional-select").addEventListener("change", () => {
    state.selectedClientSlot = "";
    renderClientBooking();
  });

  document.querySelector("#client-booking-form [name='date']").addEventListener("change", () => {
    state.selectedClientSlot = "";
    renderClientBooking();
  });

  document.getElementById("week-professional").addEventListener("change", renderWeek);

  document.getElementById("client-booking-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.selectedClientSlot) {
      alert("Elegi un horario disponible.");
      return;
    }

    const selectedSlotButton = document.querySelector(`[data-slot="${state.selectedClientSlot}"].active`);
    const professional = selectedSlotButton?.dataset.slotProfessional;
    const professionalId = selectedSlotButton?.dataset.slotProfessionalId;
    const formData = new FormData(event.currentTarget);

    if (shouldUsePublicBookingApi()) {
      const selectedService = getService(formData.get("service"));
      const selectedProfessional = getTeamMember(professional);

      publicBookingApi
        .createAppointment({
          slug: state.business.slug,
          serviceId: selectedService.id,
          professionalId: professionalId || selectedProfessional?.id,
          date: formData.get("date") || state.selectedDate,
          startTime: state.selectedClientSlot,
          clientName: formData.get("client"),
          clientPhone: formData.get("phone"),
          clientNote: formData.get("note"),
        })
        .then(() => {
          alert(
            state.business.autoConfirm
              ? "Reserva confirmada. El negocio ya la vera en agenda."
              : "Reserva enviada. El negocio la vera como pendiente para confirmar.",
          );
          event.currentTarget.reset();
          state.selectedClientSlot = "";
          fillFormOptions();
          renderClientBooking();
        })
        .catch((error) => {
          alert(error.message || "No se pudo crear la reserva.");
          state.selectedClientSlot = "";
          renderClientBooking();
        });
      return;
    }

    const result = addAppointmentFromForm(
      formData,
      state.business.autoConfirm ? "Confirmada" : "Pendiente",
      state.selectedClientSlot,
      professional,
    );

    if (!result.ok) {
      alert(result.message);
      state.selectedClientSlot = "";
      renderClientBooking();
      return;
    }

    alert(
      state.business.autoConfirm
        ? "Reserva confirmada. El negocio ya la vera en agenda."
        : "Reserva enviada. El negocio la vera como pendiente para confirmar.",
    );
    event.currentTarget.reset();
    state.selectedClientSlot = "";
    fillFormOptions();
    saveState();
    renderAll();
    if (document.body.classList.contains("public-mode")) {
      renderClientBooking();
    } else {
      setView("agenda");
    }
  });

  document.getElementById("print-report").addEventListener("click", () => {
    setView("reportes");
    window.print();
  });

  document.querySelectorAll("[data-report-period]").forEach((button) => {
    button.addEventListener("click", () => {
      reportPeriod = button.dataset.reportPeriod || "month";
      renderReports();
    });
  });

  document.getElementById("save-settings").addEventListener("click", () => {
    const form = document.getElementById("settings-form");
    const formData = new FormData(form);

    state.business.name = formData.get("businessName").trim() || "Centro Demo";
    state.business.slug =
      formData
        .get("slug")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-|-$/g, "") || "centro-demo";
    state.business.city = formData.get("city").trim() || "Madrid";
    state.business.phone = formData.get("businessPhone").trim() || "+34 600 000 000";
    state.business.type = formData.get("businessType") || "Fisioterapia y bienestar";
    state.business.minNotice = Number(formData.get("minNotice"));
    state.business.autoConfirm = formData.has("autoConfirm");
    state.business.allowClientCancel = formData.has("allowClientCancel");
    state.business.confirmTemplate = formData.get("confirmTemplate");
    state.business.cancelTemplate = formData.get("cancelTemplate");
    businessHours.start = formData.get("start");
    businessHours.end = formData.get("end");
    businessHours.step = Number(formData.get("step"));

    saveState();
    renderAll();
    alert("Setup guardado en esta demo.");
  });

  document.getElementById("export-clients").addEventListener("click", exportClientsExcel);
  document.getElementById("export-appointments").addEventListener("click", exportAppointmentsExcel);
  document.getElementById("export-backup").addEventListener("click", exportBackupJson);
}

function renderAll() {
  normalizeMissingDays();
  renderStats();
  syncServiceProfessionals();
  syncClientsFromAppointments();
  renderAgenda();
  renderOpenings();
  renderBlocks();
  renderClients();
  renderServices();
  renderTeam();
  renderClientBooking();
  renderMessagePreview();
  renderReports();
  renderBusinessIdentity();
  renderSettings();
  renderDateControls();
  renderWeekProfessionalOptions();
  renderWeek();
}

async function initializeApp() {
  fillFormOptions();
  bindEvents();
  renderAll();

  if (shouldOpenClientView) {
    enterApp("direct-client");
    return;
  }

  if (authProvider.mode === "supabase-ready") {
    try {
      const session = await authProvider.getSession();
      if (session?.business) {
        await handleBusinessSession(session);
      }
    } catch {
      // La demo local debe seguir disponible aunque Supabase no tenga sesion activa.
    }
  }
}

initializeApp();
