# Publicar Turnia

Estado: documento vivo. Actualizar si cambia el hosting o el flujo de publicacion.

> Reescrito el 21/07/2026. La version anterior mandaba a subir a mano una carpeta
> `public-demo-2026-05-21` a Netlify. Esa carpeta se borro: era una copia congelada
> de mayo, ya divergida del codigo real y **con la demo rota adentro**. Hoy no hay
> subida manual.

## Como se publica hoy

**Se publica solo.** Vercel esta conectado al repositorio de GitHub
(`eltizzu/turnia-citas`): todo lo que llega a la rama `main` queda publicado en vivo
en unos segundos.

```bash
git push origin main
```

⚠️ **Eso es todo, y por eso hay que tener cuidado.** No hay paso intermedio ni
previsualizacion, e `impulsdigital.es` linkea directo a la app publicada: un push
cambia lo que ve cualquier persona que entre.

**Regla acordada con Marcos: no se hace push sin su permiso explicito.** Primero se
prueba en local, se le muestra, y recien despues se sube.

## Las tres direcciones

| Direccion | Para quien | Datos |
|---|---|---|
| `/demo` | Prospectos que curiosean | Ficticios, en su navegador |
| `/panel` | El negocio, gestionando | Base de datos real |
| `/reservar` | El cliente final del negocio | Base de datos real |

La que se comparte para mostrar el producto es **`/demo`**.

## Probar antes de subir

```bash
node dev-server.mjs        # http://127.0.0.1:5180
node --test tests/*.test.mjs
```

`dev-server.mjs` replica las reglas y cabeceras de `vercel.json`, asi que lo que se
ve en local es lo que va a pasar publicado.

- [ ] `/demo` entra directo a la agenda, sin login
- [ ] Aparece el aviso de "Modo demo"
- [ ] Confirmar una cita, recargar, y que el cambio siga ahi
- [ ] Reportes muestra los dos graficos
- [ ] Descargar Excel de clientes/citas
- [ ] Revisar en pantalla de movil
- [ ] `/panel` pide login
- [ ] Todos los tests pasan

## Despues de subir

- [ ] Abrir la direccion publica y repetir el recorrido de `/demo`
- [ ] Confirmar que las tres direcciones responden

## Texto para compartir la demo

> Te comparto una demo funcional de Turnia, una agenda online para negocios que
> trabajan por turnos. Es para probar el flujo y dar feedback. Los datos quedan solo
> en tu navegador, no cargues informacion real.

## Despues de recibir feedback

Anotar:

- negocio/persona que probo;
- que entendio rapido;
- que le confundio;
- que funcion pidio;
- si pagaria por setup/mensualidad;
- si quiere piloto real.

## Notas

- `netlify.toml` quedo de una evaluacion inicial y **no se usa**.
- Las librerias (Chart.js, SDK de Supabase, Sentry) se sirven desde `vendor/`, no
  desde CDN ajenos. Ver `vendor/README.md`.
