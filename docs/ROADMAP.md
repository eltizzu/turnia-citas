# Roadmap de Turnia

**Única fuente de verdad sobre qué falta y en qué orden.** Si otro documento dice algo distinto, gana este.

El estado real consolidado está en [`ESTADO_ACTUAL.md`](ESTADO_ACTUAL.md). El contexto técnico (dónde vive, cómo se publica, trampas conocidas) está en [`../CLAUDE.md`](../CLAUDE.md).

Última revisión: 6 de noviembre de 2026. Evidencia: 65 pruebas existentes y 4 pruebas de identidad correctas; sin consulta a servicios externos.

---

## Resumen en una línea

Turnia está publicada, la demo funciona y el link público de reservas guarda de verdad.
**Falta que el panel del negocio sepa guardar.** Hasta entonces no se le puede entregar a nadie.

| Cosa | Estado |
|---|---|
| Web publicada | ✅ `turnia-citas.vercel.app` |
| Demo pública para prospectos | ✅ Arreglada y verificada 18/07/2026 |
| Base de datos (tablas, permisos, anti-choque) | ✅ Desplegada y probada |
| Link público de reservas | ✅ Guarda de verdad |
| Panel del negocio: leer | ✅ |
| **Panel del negocio: guardar** | ❌ **Bloqueante** |
| Login real verificado en producción | ⚠️ Sin verificar |
| Dominio propio | ❌ |
| Legal revisado | ❌ |
| Clientes reales | ❌ Ninguno |

---

## Orden de prioridad

Lo de arriba se hace antes que lo de abajo. Cada etapa tiene punto de freno: se revisa y se aprueba antes de seguir.

### ✅ 0. Base de cambios segura — preparación local

- [x] Documentar que `schema.sql` no demuestra el estado de producción.
- [x] Separar lineas base de instalaciones nuevas y migraciones incrementales.
- [x] Agregar barrera local que rechaza el project ref conocido de producción.
- [x] Agregar pruebas de seguridad de entorno, migraciones y contratos del esquema.
- [x] Documentar qué se verifica localmente y qué requiere Supabase de desarrollo.
- [ ] Crear Supabase de desarrollo — autorizado, pero no consta como creado ni verificado.
- [ ] Comparar el esquema realmente desplegado — fuera de alcance y sin autorización.

No existe todavía ningún archivo SQL de migración y no se aplicó ni marcó ninguna
migración. Detalle en `tecnico/ESTRATEGIA_MIGRACIONES.md`.

### 🔴 1. Que el panel guarde (bloqueante)

**Sin esto no hay producto vendible.** El panel lee de la base pero no escribe: todo lo que hace el negocio se pierde al recargar, sin dar error. Detalle técnico en `CLAUDE.md`.

Se hace por partes, no de una:

- [x] **1a. Separar vidriera de app real** — hecho 18/07/2026 (commits `85c40cd`, `9983211`, `+ /reservar`)
- [ ] **1b. Citas** — aceptar, rechazar (`rejected` distinto de `cancelled`), crear, finalizar, marcar no-asistió y reprogramar; UUID, eventos atómicos y reversión visual ante errores
- [ ] **1c. Clientes** — alta, edición, notas
- [ ] **1d. Servicios y equipo** — alta, edición, baja
- [ ] **1e. Bloqueos de agenda**
- [ ] **1f. Configuración del negocio** — horarios, reglas, plantillas de mensaje

Empezar por citas: es el 80% del valor.

El esquema local contiene RLS por pertenencia, pero la separación administrador/personal y el estado remoto deben verificarse en desarrollo. No se debe afirmar que los permisos están “correctos” solo por inspección estática.

### 🟠 2. Verificación honesta

No se declara "listo" sin esto:

- [ ] Crear una cita en `/panel`, recargar y confirmar que sigue ahí
- [ ] Dos dispositivos ven la misma agenda
- [ ] Dos reservas al mismo horario no se pisan
- [ ] Recorrido completo en móvil
- [ ] Descargas de Excel/JSON funcionan de verdad
- [ ] **Gráficos de Reportes** — estaban en blanco en producción (captura de Marcos, 18/07). El 21/07 se dejaron de pedir a CDN ajenos y ahora se sirven desde el propio sitio, lo que probablemente lo arregla. **Falta que Marcos lo confirme** abriendo `/demo` → Reportes en su navegador. Si siguen en blanco, ahora aparece un aviso rojo abajo en vez de fallar en silencio
- [ ] Probar el link `/reservar` contra la base real desde un navegador de verdad *(el navegador integrado no puede hacer llamadas a servidores externos)*

### ✅ 2.5. Librerías servidas desde el propio sitio — HECHO 21/07/2026

Chart.js, el SDK de Supabase y Sentry se bajaban de CDN ajenos en cada visita. Si
alguno fallaba, la funcionalidad desaparecía **sin dar error**. Ahora viven en
`vendor/`, la CSP es `script-src 'self'`, el service worker los cachea, y si algo
esencial no carga aparece un aviso en pantalla.

Verificado: 0 scripts externos en la página publicada, 2/2 gráficos dibujados en
local, y escondiendo Chart.js a propósito aparece el aviso y la app sigue andando.

Pendiente relacionado: las tipografías todavía se piden a Google Fonts.

### 🟡 3. Presentable para vender

- [ ] Comprar y conectar dominio propio
- [ ] Arreglar los datos de demo (dice "Fisioterapia y bienestar" pero ofrece "Barba + perfilado" y "Color + corte")
- [ ] Verificar el login real en producción
- [ ] Revisar textos de venta finales
- [ ] Activar backups de la base de datos

### 🟢 4. Legal, antes del primer cliente pago

- [ ] Términos y condiciones revisados por profesional
- [ ] Política de privacidad
- [ ] Contrato de encargado de tratamiento (Turnia maneja datos de los clientes de sus clientes)
- [ ] Revisar con profesional la retención operativa y de comunicaciones propuesta para 12 meses
- [ ] Definir titular legal y facturación

Material de partida en `legal/`.

### ✅ Identidad — aprobada e integrada localmente

- [x] Reconstruir el candidato “A — Encuentro”, corregir el encuentro central y preparar comparación técnica.
- [x] Obtener aprobación visual definitiva — 6/11/2026.
- [x] Integrar el logo en acceso, panel, reserva pública, landing, navegación, móvil, favicon, manifest y manual.
- [ ] Publicar la identidad — requiere autorización explícita; no realizado.

Los recursos maestros viven en `../identity/turnia-encuentro/assets/`. Los recursos anteriores están respaldados en `../assets/legacy/identity-before-encuentro-2026-11-05/`.

### ⚪ 5. Primer piloto

- [ ] Conseguir 1 negocio dispuesto a probar
- [ ] Alta asistida siguiendo `operacion/CHECKLIST_SETUP_CLIENTE.md`
- [ ] Acordar canal de soporte
- [ ] 2-4 semanas de uso real, registrando problemas

---

## Limpieza

- [x] `app/config.js` — borrado 21/07/2026
- [x] `public-demo-2026-05-21/` y `turnia-demo-publica-2026-05-21.zip` — borrados 21/07/2026. Eran una copia congelada de mayo, ya divergida, **con la demo rota adentro**. Tres guías de `operacion/` mandaban a publicarlos a mano; se corrigieron
- [ ] `netlify.toml` — resto sin usar, el hosting es Vercel

---

## Etapas cerradas

**Etapa 0 — Ordenar la casa** (18/07/2026, commit `7c1b397`)
~40 documentos sueltos movidos a `docs/` por categoría, roadmap único creado, README actualizado, test desactualizado de `authProvider` arreglado. 45/45 tests.

**Etapa 1a — Separar vidriera de app real** (18/07/2026, commits `85c40cd`, `9983211`)
La demo publicada estaba rota: un prospecto que entraba desde `impulsdigital.es` y probaba el login recibía *"Supabase todavia no esta conectado"*. Causa: condición invertida en `demo.html` que solo forzaba modo ficticio cuando la config **no** era supabase — y en producción sí lo es.

Ahora el modo se decide por la dirección (`/demo` vs `/panel`, ver `CLAUDE.md`). `dev-server.mjs` replica los rewrites de `vercel.json`. Verificado en producción: entrada directa, confirmar una cita y sobrevivir a la recarga.

---

## Fuera de alcance por ahora

Ideas buenas que no se tocan hasta tener un piloto funcionando: recordatorios automáticos, WhatsApp Business API, lista de espera, pagos y señas, multi-sede, bot de reservas, integración con Google Calendar.

Backlog completo por versiones en [`producto/BACKLOG_VERSIONES.md`](producto/BACKLOG_VERSIONES.md).

### Bandeja unificada de mensajes (idea de Marcos, 21/07/2026 — a evaluar con un cliente real)

Que el dueño vea y responda desde Turnia los mensajes de WhatsApp, Instagram y Facebook de su negocio, todo en un solo lugar.

**Por qué no ahora:** es casi un producto aparte, no una función (existen empresas que viven solo de esto: Callbell, B2Chat, Chatwoot). Las conversaciones son de Meta, y Meta pone tres muros reales:

1. **Aprobación de Meta.** Leer los DMs de Instagram/Facebook de alguien exige que Meta **revise y apruebe la app** en un proceso formal (política de privacidad, videos de uso, verificación de negocio). Tarda semanas y **pueden rechazarla**.
2. **WhatsApp con trampa.** No sirve el WhatsApp del celular: hace falta la API de WhatsApp Business con un **número dedicado solo a eso**, y al conectarlo **ese número deja de funcionar en la app normal**. Para muchos negocios chicos ya es un "no".
3. **Onboarding por cliente.** Cada negocio tendría que conectar (OAuth) sus propias cuentas de las tres redes, con verificaciones. Obstáculo real para un dueño no técnico.

Además, guardar conversaciones de terceros = más datos personales bajo RGPD.

**Puente barato (si algún cliente lo pide):** una pantalla que junte los **contactos** de todos los clientes con su botón de WhatsApp (`wa.me`) para escribir con un clic. No lee conversaciones, pero da el 80% del valor sin permiso de Meta ni número dedicado. Turnia ya arma esos links.

**Decisión:** validar demanda con el primer negocio real antes de construir nada. No adivinar hoy.

---

## Dónde está cada cosa

| Carpeta | Qué hay |
|---|---|
| `producto/` | Idea, modelo de reservas, multi-nicho, backlog por versiones |
| `comercial/` | Análisis de mercado, dossier, propuesta, guion de presentación |
| `tecnico/` | Modelo de datos, plan de producción, guías de Supabase, variables de entorno |
| `legal/` | Checklist legal, plantillas, resumen fiscal, contenidos legales de la web |
| `operacion/` | Manual de uso, checklist de alta de cliente, guía de prueba privada |
| `historico/` | Etapas ya cerradas. **Información desactualizada; no usar como referencia de estado.** |
