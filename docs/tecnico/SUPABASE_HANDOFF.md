# Handoff Supabase - Turnia

Estado: documento para guiar la creacion del proyecto Supabase real y pasarle contexto a otra IA.

## En que quedo Turnia

Turnia hoy es una demo funcional local para validar el producto antes de usarlo con clientes reales.

La app ya tiene:

- panel de negocio con agenda, clientes, servicios, profesionales, bloqueos, reportes, configuracion y exportaciones;
- vista cliente desde link publico;
- modo directo de reserva con `demo.html?reserva=1`;
- datos ficticios realistas para varios nichos;
- enfoque multi-nicho: peluqueria, barberia, unas, fisioterapia, bienestar y otros negocios con turnos;
- exportacion de datos;
- logo e identidad visual calida;
- documentacion viva comercial, manual, checklist, legal, web legal y ecosistema;
- demo publica ya desplegada en Vercel, en la direccion `/demo`.

La demo todavia guarda datos en el navegador con `localStorage`. Sirve para probar y mostrar, pero no para operar con datos reales de clientes.

## Preparado para produccion

Ya existe una base tecnica inicial para pasar a Supabase:

- `supabase/schema.sql`: tablas, indices, RLS, triggers, restricciones anti-solapamiento y RPCs.
- `supabase/seed-demo.sql`: datos demo para un negocio real.
- `supabase/smoke-test.sql`: prueba rapida para validar Supabase despues de ejecutar schema y seed.
- `supabaseClient.js`: crea cliente Supabase si hay URL, anon key y SDK.
- `publicBookingApi.js`: capa frontend para consumir RPCs del link publico.
- `dataProviders.js`: modo `supabase-preview`, preparado pero todavia sin persistencia real completa.
- `authProvider.js`: login demo y proveedor Supabase preparado.

## Funciones RPC ya previstas

El schema incluye:

- `get_public_booking_page(slug)`: devuelve negocio, servicios online y profesionales activos.
- `get_public_available_slots(slug, service_id, date, professional_id)`: devuelve horarios disponibles sin exponer agenda completa.
- `create_public_appointment(...)`: crea una reserva publica validada en servidor.

Tambien incluye restricciones para evitar que dos citas activas se pisen y para impedir citas sobre bloqueos.

## Que falta hacer en Supabase

1. Crear proyecto Supabase.
2. Ejecutar `supabase/schema.sql`.
3. Crear usuario admin en Authentication.
4. Copiar el UUID del usuario.
5. Ejecutar `supabase/seed-demo.sql` reemplazando `REEMPLAZAR_AUTH_USER_ID`.
6. Ejecutar `supabase/smoke-test.sql`.
7. Guardar Project URL y anon/publishable key.
8. Volver a Turnia para conectar frontend real.

## Prompt para otra IA

```txt
Estoy trabajando en una app llamada Turnia.

Turnia es una app de agenda y reservas para negocios con turnos: peluquerias, barberias, unas, fisioterapia, estetica, bienestar, consultorias y servicios similares.

La app ya existe como demo local. Ahora quiero crear el backend real en Supabase para empezar el camino a produccion.

Necesito que me guies paso a paso dentro del panel de Supabase.

Contexto tecnico:

En mi carpeta Turnia tengo estos archivos:

- supabase/schema.sql
- supabase/seed-demo.sql
- supabase/smoke-test.sql
- GUIA_CREAR_SUPABASE.md
- SUPABASE_HANDOFF.md

El schema ya esta preparado para:

- negocios
- usuarios por negocio
- profesionales
- servicios
- relacion profesional-servicio
- clientes
- citas
- bloqueos
- plantillas de mensajes
- eventos de citas
- RLS basico
- restricciones para evitar turnos superpuestos
- RPCs publicas limitadas para el link cliente

Las RPCs principales son:

- get_public_booking_page(slug)
- get_public_available_slots(slug, service_id, date, professional_id)
- create_public_appointment(...)

Quiero que me guies para hacer esto:

1. Crear un proyecto Supabase
- Nombre sugerido: turnia
- Region cercana a Espana/Europa
- Guardar la contrasena de base de datos en un lugar seguro

2. Conseguir datos del proyecto
Necesito encontrar:
- Project URL
- anon key / publishable key

Importante:
- No debo compartir la service role key
- No debo poner claves secretas en frontend

3. Ejecutar schema
En Supabase > SQL Editor tengo que copiar y ejecutar todo el contenido de:

supabase/schema.sql

Necesito que me ayudes a revisar si salta algun error.

4. Crear usuario admin
En Supabase Authentication necesito crear un usuario admin.

Email sugerido:
demo@turnia.app

Despues necesito copiar el ID UUID de ese usuario.

5. Ejecutar seed demo
En:

supabase/seed-demo.sql

tengo que reemplazar:

REEMPLAZAR_AUTH_USER_ID

por el UUID real del usuario admin creado.

Despues ejecuto ese SQL en Supabase SQL Editor.

6. Ejecutar prueba rapida
Despues de schema y seed, tengo que ejecutar:

supabase/smoke-test.sql

Debe validar:
- que get_public_booking_page('centro-demo') devuelve datos publicos del negocio;
- que get_public_available_slots(...) devuelve horarios disponibles;
- que create_public_appointment(...) puede crear una reserva;
- que una segunda reserva en el mismo horario se rechaza como slot_not_available.

El smoke test usa ROLLBACK, asi que no deberia dejar reservas falsas guardadas.

7. Confirmar resultado
Necesito confirmar:
- schema.sql corrio sin errores;
- seed-demo.sql corrio sin errores;
- smoke-test.sql salio OK;
- RLS esta activo;
- no expuse la service role key.

Al final necesito guardar para volver a Turnia:
- Project URL;
- anon/publishable key;
- UUID del usuario admin;
- resultado del smoke-test.sql.
```

## Datos que no se deben compartir

No compartir:

- service role key;
- contrasena de base de datos;
- claves OAuth secretas;
- datos reales de clientes.

Si se comparte algo con otra IA, que sea solo:

- Project URL;
- anon/publishable key;
- UUID del usuario admin de prueba;
- errores visibles del SQL si aparecen.

