# Librerías de terceros servidas desde el propio sitio

Estos archivos **no se editan a mano**. Son copias tal cual de librerías públicas.

## Por qué están acá y no se piden a un CDN

Antes se bajaban de `cdn.jsdelivr.net` y `browser.sentry-cdn.com` en cada visita.
Si cualquiera de esos fallaba —red del cliente, extensión del navegador, proxy de
empresa, caída del CDN— la funcionalidad **desaparecía sin dar ningún error**:
`renderChart()` simplemente no dibuja si `window.Chart` no existe, y sin el SDK de
Supabase la app real no se conecta a nada.

Servirlos desde el propio sitio elimina esa dependencia, hace que la app instalable
(PWA) funcione sin terceros, y permite que la política de seguridad (CSP) sea más
estricta: `script-src 'self'`, sin dominios externos.

## Qué hay

| Archivo | Qué es | Versión |
|---|---|---|
| `chart.umd.min.js` | Chart.js — gráficos de Reportes | 4.4.7 |
| `supabase.js` | SDK de Supabase — base de datos y login | 2.58.0 |
| `sentry.min.js` | Sentry — monitoreo de errores | 8.55.0 |

## Cómo actualizarlos

```bash
curl -o vendor/chart.umd.min.js https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js
curl -o vendor/supabase.js      https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.58.0/dist/umd/supabase.js
curl -o vendor/sentry.min.js    https://browser.sentry-cdn.com/8.55.0/bundle.min.js
```

Cambiar el número de versión en la URL **y en esta tabla**. Después de actualizar:

1. Abrir `/demo` y confirmar que los gráficos de Reportes se dibujan
2. Abrir `/panel` y confirmar que el login conecta
3. Subir el número de `CACHE_NAME` en `sw.js`, si no los navegadores siguen
   sirviendo la versión vieja desde la caché

## Pendiente

Las tipografías todavía se piden a `fonts.googleapis.com`, así que cada visitante
le manda su IP a Google. Se puede auto-alojar igual que estas librerías.
