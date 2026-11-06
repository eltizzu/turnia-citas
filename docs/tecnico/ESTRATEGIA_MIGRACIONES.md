# Estrategia de migraciones de Turnia

Estado: política local aprobada para preparar la Etapa 0. No se ha conectado ni
modificado ningún servicio externo.

## Tres fuentes que no deben confundirse

1. `supabase/schema.sql` es el esquema conocido por el repositorio.
2. Una línea base futura será el punto de partida de una base nueva y vacía.
3. El esquema desplegado solo puede conocerse inspeccionando el entorno concreto
   con autorización.

El repositorio no asume que esos tres estados coincidan.

## Instalación nueva

Cuando exista un entorno de desarrollo autorizado, se revisará y congelará una
línea base en `supabase/baselines/`. Se aplicará únicamente a una base vacía y se
validará con seed ficticio, smoke tests, RLS y pruebas de concurrencia.

## Base existente

Una base existente requiere este proceso separado:

1. Obtener un volcado de esquema sin datos y sin secretos.
2. Normalizarlo y compararlo con el esquema del repositorio.
3. Clasificar diferencias: equivalentes, solo remotas, solo locales,
   incompatibles o destructivas.
4. Preparar una reconciliación específica.
5. Ensayarla primero sobre desarrollo o una copia autorizada.
6. Presentar diff, resultado y recuperación antes de solicitar aplicación.

Nunca se usa una migración global como mecanismo para descubrir el estado de una
base. Tampoco se marca una línea base como aplicada sin demostrar equivalencia.

## Convenciones

- Archivos incrementales: `YYYYMMDDHHMMSS_descripcion.sql`.
- Orden cronológico único.
- Sin claves, teléfonos, nombres ni datos reales.
- RLS y grants se revisan como parte del mismo cambio de tabla o RPC.
- Las funciones `security definer` fijan `search_path` y exponen la mínima
  información necesaria.
- Las RPC públicas incluyen `revoke` y `grant execute` explícitos.
- Un cambio destructivo requiere autorización específica, copia recuperable y
  procedimiento probado de restauración.
- Las operaciones compuestas escriben datos y auditoría en una transacción.

## Entornos y barreras

Antes de cualquier comando futuro de base se ejecutará
`scripts/check-db-target.mjs`. El control exige `TURNIA_ENV=development|test`, un
project ref explícito, rechaza el ref conocido de producción y no acepta una
clave service role en el entorno de operación.

El script solo valida. No conecta, migra ni ejecuta SQL.

## Revisión de producción

Leer el esquema, enlazar herramientas, ejecutar SQL, reparar el historial de
migraciones o desplegar cambios son acciones externas distintas. Cada una
requiere autorización explícita. La aprobación de una no implica las demás.
