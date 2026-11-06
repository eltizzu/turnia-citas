# Etapa 0 — Base de cambios segura

## Alcance

Esta etapa añade documentación, controles locales y contratos comprobables. No
cambia el producto, el dashboard, `app.js`, `schema.sql` ni servicios externos.

## Línea base local

- Rama observada: `main`.
- Node observado al iniciar: `v24.14.1`.
- Pruebas iniciales: 53 correctas, 0 fallidas.
- Supabase CLI: no disponible en el entorno local.
- Docker: no disponible en el entorno local.
- Hay cambios previos del usuario en `supabaseDataApi.js` y
  `tests/supabaseDataApi.test.mjs`; están protegidos y no forman parte de esta
  etapa.

## Contratos confirmados en el repositorio

- Las citas usan UUID en PostgreSQL y pertenecen a un negocio.
- `appointment_events` existe como base de auditoría.
- Existen RLS, restricciones anti-solapamiento y bloqueo transaccional de agenda.
- Las RPC públicas limitadas revocan permisos generales y conceden ejecución
  explícita.

Estas son propiedades del código local, no una confirmación del entorno
desplegado.

## Riesgo de roles pendiente

La pertenencia al negocio no concede permisos administrativos. Sin embargo, las
políticas actuales solo comprueban pertenencia y no distinguen `admin` de
`staff`. Corregirlo queda pendiente de una migración probada en Supabase de
desarrollo durante la siguiente etapa. No se modifica `schema.sql` en Etapa 0.

El modelo aprobado es:

- Administrador: configuración, horarios, servicios, precios, profesionales,
  exportación y reglas.
- Personal: citas y tareas que le correspondan según permisos.

## Identidad de citas pendiente

La tabla y el mapper ya contienen UUID, pero la interfaz actual construye una
identidad compuesta con fecha, hora, teléfono y servicio. La primera entrega de
escritura deberá usar siempre el UUID. Esta corrección no se ejecuta en Etapa 0
porque `app.js` está fuera de alcance.

## Verificación local posible

- Suite JavaScript y contratos estáticos.
- Convenciones de migraciones.
- SQL destructivo evidente.
- `search_path`, revocaciones y grants de RPC públicas.
- Ausencia de credenciales versionadas.
- Rechazo de un destino de producción conocido.
- Preservación por hash y diff de archivos protegidos.

## Verificación que necesita desarrollo

- Aplicar una línea base a PostgreSQL real.
- RLS con administradores, personal, dos negocios y anónimo.
- JWT y `auth.uid()`.
- Ejecución real de RPC.
- Concurrencia, restricciones y rollback.
- Migraciones desde cero y desde una versión anterior.
- Comportamiento del SDK y Realtime.

Ninguna de esas comprobaciones se sustituye con búsquedas de texto.

## Matriz futura de integración

El arnés de integración usará exclusivamente datos ficticios y cubrirá:

| Actor | Lectura propia | Gestión de citas | Administración | Acceso cruzado |
|---|---:|---:|---:|---:|
| Admin negocio A | Sí | Sí | Sí | No |
| Personal negocio A | Según permisos | Según asignación | No | No |
| Admin negocio B | Sí | Sí | Sí | No |
| Anónimo | Solo RPC pública limitada | No directa | No | No |

Las pruebas remotas se omitirán mientras no exista configuración explícita de
desarrollo. Nunca deben usar producción como alternativa automática.

## Autorizaciones futuras

Requieren una aprobación nueva: crear o conectar Supabase, instalar herramientas,
obtener un esquema remoto, ejecutar SQL, crear usuarios, añadir credenciales,
aplicar o reparar migraciones, publicar, hacer push o hacer commit.
