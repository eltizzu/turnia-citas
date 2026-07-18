# Turnia

Turnia es una app de agenda y citas para negocios y profesionales que trabajan con reservas por horario: barberias, peluquerias, unas, fisioterapia, masajes, estetica, bienestar, consultorias y servicios similares.

La idea no es crear otro panel frio ni un software enorme de gestion. Turnia debe sentirse como una agenda moderna, clara y muy comoda desde el movil.

La marca inicial usa el logo en `assets/logo-turnia.svg`, una copia rapida en `logo-turnia.svg` y favicon en `assets/favicon.svg`.

## Promesa

Ayudar a negocios de servicios a organizar su agenda, confirmar citas y reducir huecos perdidos sin depender todo el dia de WhatsApp, llamadas o una libreta.

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

> 📍 **El estado real y qué falta esta en [`ROADMAP.md`](ROADMAP.md).** Ese es el unico documento de referencia. Lo que hay en `docs/historico/` describe etapas ya cerradas y puede estar desactualizado.

Resumen a 18 de julio de 2026:

- La app **esta publicada** en `https://turnia-citas.vercel.app` (Vercel) y conectada a un Supabase real.
- El **link publico de reservas funciona de verdad**: el cliente reserva y la cita se guarda en la base.
- El **panel del negocio lee** datos reales de la base, pero **todavia no escribe**: cualquier cambio que haga el negocio se pierde al recargar. Este es el bloqueante principal y esta detallado en `ROADMAP.md`.
- No hay ningun negocio real usando la app.

En modo demo local (`dataMode: "demo"`), la app guarda en el navegador con `localStorage`: citas, clientes, servicios, profesionales, bloqueos y configuracion. El boton "Restaurar demo" borra esos datos locales y vuelve al estado inicial.

Para limpiar la demo antes de una presentacion tambien se puede abrir `http://127.0.0.1:5280/?reset-demo=1`.

La logica de disponibilidad vive en `agendaRules.js`: horarios, choques entre citas, bloqueos y calculo de huecos disponibles. Esto queda separado para poder reutilizar esas reglas cuando conectemos base de datos y backend.

El puente entre la demo y el modelo de produccion vive en `dataAdapter.js`. Convierte servicios, profesionales, clientes, citas, bloqueos y plantillas al formato pensado para Supabase.

La puerta de persistencia vive en `dataProviders.js`. Hoy usa guardado local. Si se configura Supabase, el provider queda en modo `supabase-preview`: puede preparar el payload de produccion, pero **no escribe nada en la base**. ⚠️ Esto es el bloqueante #1 del roadmap: la web publicada corre en modo `supabase`, asi que los cambios del panel no se guardan en ningun lado.

La puerta de login vive en `authProvider.js`. Hoy simula email/Google en modo demo y deja preparado el lugar donde luego se conectara Supabase Auth.

`supabaseClient.js` centraliza la deteccion de configuracion y la creacion del cliente Supabase cuando exista SDK, URL y anon key. Esto no reemplaza la fase de conectar tablas, permisos, lectura/escritura y validaciones del backend.

`publicBookingApi.js` concentra las llamadas RPC del link publico real: ficha publica del negocio, horarios disponibles y creacion de reserva. La demo visual todavia usa datos locales, pero esta capa deja preparado el cableado para Supabase.

`supabaseDataApi.js` carga los datos reales del panel de gestion cuando hay una sesion Supabase asociada a un negocio: negocio, horarios, servicios, profesionales, clientes, citas, bloqueos y plantillas.

Las reglas de agenda tienen pruebas en `tests/agendaRules.test.mjs`. Se ejecutan con:

```bash
node --test tests/*.test.mjs
```

Ver tambien `docs/historico/ESTADO_DEMO.md` para saber que partes estan listas para mostrar y que partes siguen simuladas.

La demo tambien permite exportar clientes, citas y backup completo desde Configuracion.

## Camino a produccion

El proximo bloque de trabajo es pasar de demo local a MVP vendible sin perder simpleza. Para eso quedan documentados:

- `docs/tecnico/PLAN_PRODUCCION_MVP.md`: fases para login real, base de datos, link publico y piloto.
- `docs/tecnico/MODELO_DATOS_PRODUCCION.md`: tablas, relaciones y reglas de seguridad recomendadas.
- `docs/tecnico/ENV_PRODUCCION.md`: variables y checklist de configuracion por entorno.
- `docs/historico/CIERRE_ETAPA_MVP.md`: estado actual, verificacion y siguiente hito real.
- `docs/historico/RESULTADO_QA_FINAL.md`: resultado de QA funcional/mobile de cierre.
- `docs/tecnico/GUIA_CREAR_SUPABASE.md`: pasos para crear Supabase, activar Auth/Google y cargar demo.
- `docs/comercial/PRESENTACION_TURNIA.md`: guion para mostrar la demo a un negocio.
- `docs/operacion/LISTA_PARA_MOSTRAR.md`: checklist breve para abrir, recorrer y presentar Turnia.
- `docs/operacion/DEMO_PUBLICA.md`: alcance, avisos y pasos para publicar una demo controlada.
- `docs/operacion/PUBLICAR_DEMO.md`: pasos para subir la demo a Netlify o Vercel.
- `docs/producto/VERSION_MOVIL.md`: enfoque mobile/PWA, instalacion y limites actuales.
- `docs/operacion/GUIA_PRUEBA_PRIVADA.md`: recorrido para probar Turnia con una persona de confianza y registrar feedback.
- `docs/producto/FASES_PRODUCTO_REAL.md`: separacion entre demo clara, prueba privada, piloto controlado, base seria y producto comercial.
- `docs/producto/ENFOQUE_MULTI_NICHO.md`: decision de producto para adaptar Turnia a distintos rubros sin perder foco.

## Documentos vivos

Estos documentos deben actualizarse con cada avance importante:

- `docs/historico/DOCUMENTOS_VIVOS.md`: regla de mantenimiento documental.
- `docs/comercial/DOCUMENTO_COMERCIAL.md`: venta, posicionamiento, modulos y valor.
- `docs/comercial/DOSSIER_COMERCIAL_TURNIA.md`: version comercial limpia para adjuntar o compartir.
- `docs/operacion/MANUAL_DE_USO.md`: uso por perfil y pasos de cada accion.
- `docs/historico/CHECKLIST_FINAL_PRODUCTO.md`: control antes de mostrar o vender.
- `docs/legal/RESUMEN_LEGAL_Y_FISCAL_INICIAL.md`: marco legal/fiscal inicial.
- `docs/legal/WEB_LEGAL_CONTENIDOS.md`: contenidos legales minimos de la web.
- `docs/producto/ECOSISTEMA_IDEAS_FUTURAS.md`: alcance actual, futuras mejoras y productos hermanos.
- `docs/operacion/GUIA_PRUEBA_PRIVADA.md`: prueba controlada, preguntas y observaciones.
- `docs/producto/FASES_PRODUCTO_REAL.md`: fases para no adelantar infraestructura antes de validar valor.
- `docs/producto/ENFOQUE_MULTI_NICHO.md`: nichos compatibles, lenguaje base y reglas de adaptacion.

Stack confirmado: Supabase para Auth/Postgres/RLS y **Vercel** para publicar el frontend. El archivo `netlify.toml` quedo de una evaluacion inicial y no se usa.

Tambien se agrego `supabase/schema.sql` como primer esquema tecnico para la base de datos real.
