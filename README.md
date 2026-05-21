# Turnia

Turnia es una app de agenda y citas para negocios que trabajan por turnos: peluquerias, barberias, centros de estetica, unas, masajes y servicios similares.

La idea no es crear otro panel frio ni un software enorme de gestion. Turnia debe sentirse como una agenda moderna, clara y muy comoda desde el movil.

La marca inicial usa el logo en `assets/logo-turnia.svg`, una copia rapida en `logo-turnia.svg` y favicon en `assets/favicon.svg`.

## Promesa

Ayudar a salones y profesionales a organizar su agenda, confirmar citas y reducir huecos perdidos sin depender todo el dia de WhatsApp, llamadas o una libreta.

## Enfoque inicial

- Agenda diaria y semanal
- Citas rapidas
- Vista negocio para gestionar la agenda interna
- Vista cliente como link publico de reserva
- Profesionales
- Servicios con duracion y precio
- Carga manual de servicios y profesionales desde la app
- Clientes con telefono y notas
- Ficha de cliente con historial y WhatsApp
- Estados de cita
- Disponibilidad sincronizada para evitar turnos superpuestos
- Bloqueos de horarios para descansos, comidas o ausencias
- Confirmaciones y recordatorios como siguiente capa
- Cero comisiones sobre clientes o reservas

## Diferencial buscado

Turnia compite por simpleza, cercania y velocidad:

- Movil primero de verdad
- Sin marketplace obligatorio
- Sin comisiones por cliente nuevo
- WhatsApp como canal natural
- Onboarding simple para negocios no tecnicos
- Precio facil de entender
- Setup inicial casi personalizado para los primeros clientes

## Estado actual

Esta carpeta contiene una primera demo en HTML, CSS y JavaScript. El objetivo inmediato es convertirla en una app visual funcional antes de construir backend.

La demo guarda datos en el navegador con `localStorage`: citas, clientes, servicios, profesionales, bloqueos y configuracion. El boton "Restaurar demo" borra esos datos locales y vuelve al estado inicial.

Para limpiar la demo antes de una presentacion tambien se puede abrir `http://127.0.0.1:5280/?reset-demo=1`.

La logica de disponibilidad vive en `agendaRules.js`: horarios, choques entre citas, bloqueos y calculo de huecos disponibles. Esto queda separado para poder reutilizar esas reglas cuando conectemos base de datos y backend.

El puente entre la demo y el modelo de produccion vive en `dataAdapter.js`. Convierte servicios, profesionales, clientes, citas, bloqueos y plantillas al formato pensado para Supabase.

La puerta de persistencia vive en `dataProviders.js`. Hoy usa guardado local, pero ya deja armado el punto donde se conectara Supabase.

La puerta de login vive en `authProvider.js`. Hoy simula email/Google en modo demo y deja preparado el lugar donde luego se conectara Supabase Auth.

`supabaseClient.js` centraliza la deteccion de configuracion y la creacion del cliente Supabase cuando exista SDK, URL y anon key.

Las reglas de agenda tienen pruebas en `tests/agendaRules.test.mjs`. Se ejecutan con:

```bash
node --test tests/agendaRules.test.mjs tests/dataAdapter.test.mjs tests/dataProviders.test.mjs tests/authProvider.test.mjs tests/supabaseClient.test.mjs
```

Ver tambien `ESTADO_DEMO.md` para saber que partes estan listas para mostrar y que partes siguen simuladas.

La demo tambien permite exportar clientes, citas y backup completo desde Configuracion.

## Camino a produccion

El proximo bloque de trabajo es pasar de demo local a MVP vendible sin perder simpleza. Para eso quedan documentados:

- `PLAN_PRODUCCION_MVP.md`: fases para login real, base de datos, link publico y piloto.
- `MODELO_DATOS_PRODUCCION.md`: tablas, relaciones y reglas de seguridad recomendadas.
- `ENV_PRODUCCION.md`: variables y checklist de configuracion por entorno.
- `CIERRE_ETAPA_MVP.md`: estado actual, verificacion y siguiente hito real.
- `RESULTADO_QA_FINAL.md`: resultado de QA funcional/mobile de cierre.
- `GUIA_CREAR_SUPABASE.md`: pasos para crear Supabase, activar Auth/Google y cargar demo.
- `PRESENTACION_TURNIA.md`: guion para mostrar la demo a un negocio.
- `LISTA_PARA_MOSTRAR.md`: checklist breve para abrir, recorrer y presentar Turnia.
- `DEMO_PUBLICA.md`: alcance, avisos y pasos para publicar una demo controlada.
- `PUBLICAR_DEMO.md`: pasos para subir la demo a Netlify o Vercel.
- `VERSION_MOVIL.md`: enfoque mobile/PWA, instalacion y limites actuales.

## Documentos vivos

Estos documentos deben actualizarse con cada avance importante:

- `DOCUMENTOS_VIVOS.md`: regla de mantenimiento documental.
- `DOCUMENTO_COMERCIAL.md`: venta, posicionamiento, modulos y valor.
- `DOSSIER_COMERCIAL_TURNIA.md`: version comercial limpia para adjuntar o compartir.
- `MANUAL_DE_USO.md`: uso por perfil y pasos de cada accion.
- `CHECKLIST_FINAL_PRODUCTO.md`: control antes de mostrar o vender.
- `RESUMEN_LEGAL_Y_FISCAL_INICIAL.md`: marco legal/fiscal inicial.
- `WEB_LEGAL_CONTENIDOS.md`: contenidos legales minimos de la web.
- `ECOSISTEMA_IDEAS_FUTURAS.md`: alcance actual, futuras mejoras y productos hermanos.

Decision inicial recomendada: Supabase para Auth/Postgres/RLS y Netlify o Vercel para publicar el frontend.

Tambien se agrego `supabase/schema.sql` como primer esquema tecnico para la base de datos real.
