# Variables de entorno y configuracion

Este archivo lista lo que Turnia va a necesitar cuando dejemos de correr solo la demo local.

## Frontend

Variables publicas que puede usar el navegador:

- `TURNIA_SUPABASE_URL`
- `TURNIA_SUPABASE_ANON_KEY`
- `TURNIA_APP_ENV`
- `TURNIA_DATA_MODE`
- `TURNIA_SENTRY_DSN`
- `TURNIA_RELEASE`

Notas:

- La anon key de Supabase puede estar en frontend, pero solo si RLS esta bien configurado.
- Nunca poner service role key en el navegador.
- `TURNIA_APP_ENV` puede ser `local`, `staging` o `production`.
- En hosting, `scripts/write-config.mjs` genera `config.js` desde variables de entorno.
- `TURNIA_SENTRY_DSN` puede quedar vacio en local. En staging/produccion activa monitoreo de errores frontend.
- `supabaseClient.js` solo crea cliente si `dataMode` es `supabase`, hay URL/key y el SDK oficial esta cargado.

## Servidor / funciones

Variables privadas para Edge Functions o backend:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `WHATSAPP_TOKEN` cuando haya WhatsApp Business API
- `WHATSAPP_PHONE_NUMBER_ID` cuando haya WhatsApp Business API

Notas:

- `SUPABASE_SERVICE_ROLE_KEY` solo debe existir en servidor.
- Para MVP, WhatsApp puede seguir como enlace semiautomatico y no necesita token.

## Entornos recomendados

### Local

Para seguir desarrollando la demo y probar cambios visuales.

### Staging

Una copia privada para probar con datos falsos o un negocio amigo.

### Produccion

Solo para clientes reales.

## Checklist antes de activar produccion

- Supabase con RLS activo.
- Usuario admin creado.
- Negocio creado.
- Usuario asociado a negocio en `business_users`.
- Servicios y profesionales cargados.
- Link publico probado.
- Reserva simultanea probada.
- Exportacion probada.
- Textos legales revisados.
- Backups activos.
- Dominio y HTTPS activos.
- Sentry configurado para capturar errores frontend.
- `config.js` generado por entorno, sin claves reales guardadas en repo.
