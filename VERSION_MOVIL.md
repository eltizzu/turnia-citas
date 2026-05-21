# Version Movil De Turnia

Estado: documento vivo. Actualizar cuando cambie la experiencia mobile, PWA o app nativa.

## Decision actual

La version movil recomendada para esta etapa es una web app responsive e instalable.

Eso significa:

- se abre desde el navegador del celular;
- se adapta a pantallas chicas;
- tiene navegacion inferior;
- puede guardarse en la pantalla de inicio;
- no requiere App Store ni Play Store;
- es mas rapida de probar con primeros negocios.

## Que ya tiene

- Layout responsive.
- Navegacion inferior en mobile.
- Panel negocio usable desde celular.
- Vista cliente mobile.
- Modales adaptados a una columna.
- Logo y favicon.
- `manifest.webmanifest` para modo instalable.
- Metadatos mobile en `index.html`.
- Service worker basico para experiencia instalable.

## Como probar en celular

Cuando la demo este publicada:

1. Abrir la URL desde el celular.
2. Probar pantalla inicial.
3. Entrar como negocio.
4. Revisar agenda.
5. Crear una cita.
6. Ir a vista cliente.
7. Reservar un turno.
8. Volver al panel.
9. Revisar reportes/configuracion.

## Como instalar en pantalla de inicio

### Android / Chrome

1. Abrir la URL.
2. Tocar menu del navegador.
3. Elegir `Agregar a pantalla principal` o `Instalar app`.
4. Abrir Turnia desde el icono.

### iPhone / Safari

1. Abrir la URL.
2. Tocar compartir.
3. Elegir `Agregar a pantalla de inicio`.
4. Abrir Turnia desde el icono.

## Que no es todavia

No es una app nativa.

Todavia no tiene:

- publicacion en App Store;
- publicacion en Play Store;
- notificaciones push reales;
- almacenamiento offline avanzado;
- acceso nativo a contactos/calendario;
- login real conectado a produccion.

## Cuando convendria app nativa

Mas adelante podria tener sentido si:

- muchos negocios la usan a diario;
- necesitan notificaciones push;
- se requiere experiencia offline;
- hay pagos integrados;
- se quiere presencia en stores;
- el uso mobile supera claramente al desktop.

## Recomendacion

Para primeros usuarios, mantener Turnia como web app mobile/PWA.

Primero validar:

- si el negocio puede gestionar agenda desde celular;
- si el cliente entiende el link publico;
- si el setup inicial alcanza;
- si pagarian por usarlo.

Despues decidir si vale la pena invertir en app nativa.
