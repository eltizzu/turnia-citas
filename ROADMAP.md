# Roadmap de Turnia

**Única fuente de verdad sobre qué falta.** Si otro documento dice algo distinto, gana este.

Última revisión: 18 de julio de 2026.

---

## Dónde estamos parados hoy

Turnia **está publicada y conectada a una base de datos real**, pero todavía **no se puede vender**, por un motivo concreto que se explica abajo.

| Cosa | Estado real |
|---|---|
| Web publicada | ✅ `https://turnia-citas.vercel.app` (Vercel) |
| Base de datos real (Supabase) | ✅ Creada, con tablas, permisos y reglas anti-choque |
| Link público de reservas | ✅ **Funciona de verdad**: el cliente reserva y queda guardado |
| Panel del negocio: **leer** | ✅ Carga los datos reales al iniciar sesión |
| Panel del negocio: **guardar** | ❌ **NO GUARDA NADA** — ver bloqueante |
| Login real | ⚠️ Preparado, sin verificar en la web publicada |
| Dominio propio | ❌ No hay |
| Legal revisado | ❌ Solo plantillas sin revisión profesional |
| Clientes reales usando la app | ❌ Ninguno (confirmado por Marcos, 18/07/2026) |

### Aclaraciones importantes

- **El hosting real es Vercel.** El archivo `netlify.toml` es un resto viejo, no se usa.
- **`demo.turnia.app` no existe.** Varios documentos viejos lo mencionan; ese dominio nunca se compró y no resuelve.
- El proyecto Supabase real es `zahossmailzxwpmtfksc`.
- La marca comercial en la landing es **Impuls Digital** (`hola@impulsdigital.es`), con planes Solo / Equipo / Salón.

---

## 🔴 Bloqueante #1: el panel no guarda

**Qué pasa:** el negocio entra, ve su agenda correcta cargada desde el servidor. Confirma una cita, crea un cliente, cancela un turno. Refresca la página y **todo eso desapareció**.

**Por qué:** el frontend tiene la parte de *leer* de la base de datos, pero la parte de *escribir* nunca se construyó. La pieza de guardado (`dataProviders.js`, modo supabase) es un placeholder que recibe los datos y no hace nada con ellos. No existe ni una sola instrucción de guardado hacia la base en toda la app.

**Por qué es lo más grave:** no es que falle visiblemente. Es que *parece que funciona*. Un negocio trabajaría un día entero encima y perdería todo.

**Excepción:** las reservas que hace el cliente final desde el link público **sí se guardan bien**, porque van por una función del servidor que está bien hecha.

**Hasta que esto no esté resuelto y verificado, Turnia no se le puede entregar a nadie.**

---

## Plan por etapas

Cada etapa tiene un punto de freno: se revisa y se aprueba antes de seguir.

### Etapa 0 — Ordenar la casa ✅ HECHO (18/07/2026)

- [x] Mover ~40 documentos sueltos a `docs/` por categoría
- [x] Crear este roadmap único
- [x] Arreglar el test desactualizado
- [x] Actualizar el README para que describa el estado real

### Etapa 1 — Separar demo de app real, y que el panel guarde

**1a. Separar la vidriera de la app real ✅ HECHO (18/07/2026)**

La demo publicada estaba rota: un prospecto que entraba desde `impulsdigital.es` y probaba el login recibía *"Supabase todavia no esta conectado"* y no podía pasar. La causa era una condición invertida en `demo.html`.

Ahora el modo se decide **por la dirección**, no por `config.js`:

| Dirección | Qué es | Datos | Login |
|---|---|---|---|
| `/demo` | Vidriera pública (lo que linkea Impuls) | Ficticios, en el navegador de cada visitante | No, entra directo a la agenda |
| `/panel` | App real de clientes | Base de datos real | Sí, obligatorio |

Decidirlo por ruta es lo que permite que el panel guarde de verdad sin que un prospecto curioso escriba en la base real.

**Falta que el panel guarde** (`/panel`), por partes:

- [ ] **1b. Citas** — crear, confirmar, cancelar, finalizar, marcar no-asistió, reprogramar
- [ ] **1c. Clientes** — alta, edición, notas
- [ ] **1d. Servicios y equipo** — alta, edición, baja
- [ ] **1e. Bloqueos de agenda**
- [ ] **1f. Configuración del negocio** — horarios, reglas, plantillas de mensaje

Nota técnica: los permisos por negocio (RLS) ya están puestos y correctos en la base. La app tiene permiso de escribir; simplemente nunca lo hace.

### Etapa 2 — Verificación honesta

- [ ] Entrar a la web publicada, crear una cita, refrescar y confirmar que sigue ahí
- [ ] Probar desde dos dispositivos que ven la misma agenda
- [ ] Probar que dos reservas al mismo horario no se pisan
- [ ] Probar el recorrido completo en móvil
- [ ] Confirmar que las descargas de Excel/JSON funcionan de verdad

Sin esto, no se declara "listo".

### Etapa 3 — Presentable para vender

- [ ] Comprar y conectar dominio propio
- [ ] Arreglar los datos de demo (hoy el negocio dice ser "Fisioterapia y bienestar" pero ofrece "Barba + perfilado" y "Color + corte")
- [ ] Verificar el login real en la web publicada (email y/o Google)
- [ ] Revisar los textos de venta finales
- [ ] Activar backups de la base de datos

### Etapa 4 — Legal antes del primer cliente pago

- [ ] Términos y condiciones revisados por profesional
- [ ] Política de privacidad
- [ ] Contrato de encargado de tratamiento (obligatorio: Turnia maneja datos de los clientes de sus clientes)
- [ ] ⚠️ Atención especial: en el nicho de fisioterapia se guardan **notas que pueden ser datos de salud**, categoría especial bajo RGPD. Consultar esto explícitamente.
- [ ] Definir titular legal y facturación

Material de partida en `docs/legal/`.

### Etapa 5 — Primer piloto

- [ ] Conseguir 1 negocio dispuesto a probar
- [ ] Alta asistida siguiendo `docs/operacion/CHECKLIST_SETUP_CLIENTE.md`
- [ ] Acordar canal de soporte
- [ ] 2-4 semanas de uso real y registro de problemas

---

## Fuera de alcance por ahora

Ideas buenas, pero que no se tocan hasta tener un piloto funcionando: recordatorios automáticos, WhatsApp Business API, lista de espera, pagos y señas, multi-sede, bot de reservas, integraciones con Google Calendar.

El backlog completo por versiones está en `docs/producto/BACKLOG_VERSIONES.md`.

---

## Dónde está cada cosa

| Carpeta | Qué hay |
|---|---|
| `docs/producto/` | Idea, modelo de reservas, enfoque multi-nicho, backlog por versiones |
| `docs/comercial/` | Análisis de mercado, dossier, propuesta, guion de presentación |
| `docs/tecnico/` | Modelo de datos, plan de producción, guías de Supabase, variables de entorno |
| `docs/legal/` | Checklist legal, plantillas, resumen fiscal, contenidos legales de la web |
| `docs/operacion/` | Manual de uso, checklist de alta de cliente, guía de prueba privada |
| `docs/historico/` | Documentos de etapas ya cerradas. **Contienen información desactualizada; no usar como referencia de estado.** |
