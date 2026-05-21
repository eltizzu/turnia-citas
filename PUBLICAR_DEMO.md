# Publicar Demo Publica

Estado: documento vivo. Actualizar si cambia el hosting o el flujo de publicacion.

## Objetivo

Subir Turnia como demo publica controlada para que otras personas puedan probarla sin cuentas reales.

## Opcion recomendada

Publicar como sitio estatico en Netlify usando la carpeta publica preparada:

`public-demo-2026-05-21`

No hace falta backend para esta demo.

## Archivos preparados

- `netlify.toml`: configuracion basica para Netlify.
- `vercel.json`: configuracion basica para Vercel.
- `DEMO_PUBLICA.md`: alcance y aviso de uso.
- `public-demo-2026-05-21`: paquete limpio listo para subir sin documentos internos, tests ni archivos de base de datos.
- `turnia-demo-publica-2026-05-21.zip`: el mismo paquete comprimido.

## Antes de publicar

- [ ] Abrir `/?reset-demo=1`.
- [ ] Revisar pantalla inicial.
- [ ] Revisar aviso de demo.
- [ ] Entrar como negocio.
- [ ] Probar link cliente.
- [ ] Descargar Excel clientes/citas.
- [ ] Revisar mobile.

## Netlify

Pasos:

1. Crear cuenta en Netlify.
2. Ir a Sites.
3. Elegir Add new site.
4. Elegir Deploy manually.
5. Arrastrar la carpeta `public-demo-2026-05-21` o subir `turnia-demo-publica-2026-05-21.zip`.
6. Publicar.
7. Abrir la URL publicada con `/?reset-demo=1` para iniciar la demo limpia.

## Vercel

Pasos:

1. Crear cuenta en Vercel.
2. Crear nuevo proyecto.
3. Importar repositorio.
4. Framework: Other.
5. Build command: dejar vacio.
6. Output directory: `.`
7. Publicar.

Para Vercel, si se usa el repositorio completo, conviene revisar que no se publiquen documentos internos. Para subir hoy rapido, Netlify con la carpeta `public-demo-2026-05-21` es mas directo.

## Texto para compartir la demo

> Te comparto una demo funcional de Turnia, una agenda online para negocios que trabajan por turnos. Es para probar el flujo y dar feedback. Los datos quedan solo en tu navegador, no cargues informacion real.

## Despues de recibir feedback

Anotar:

- negocio/persona que probo;
- que entendio rapido;
- que le confundio;
- que funcion pidio;
- si pagaria por setup/mensualidad;
- si quiere piloto real.
