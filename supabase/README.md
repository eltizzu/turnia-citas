# Supabase para Turnia

Esta carpeta prepara el salto a produccion.

## Archivos

- `schema.sql`: tablas, indices, triggers y reglas RLS iniciales.
- `seed-demo.sql`: datos iniciales para probar un negocio real con un usuario admin.
- `smoke-test.sql`: prueba rapida para validar link publico, horarios y rechazo de reservas superpuestas.

## Como se usaria

1. Crear un proyecto en Supabase.
2. Abrir SQL Editor.
3. Ejecutar `schema.sql` en un entorno de prueba.
4. Crear un usuario desde Supabase Auth.
5. Crear un negocio en `businesses`.
6. Crear una relacion en `business_users` entre ese usuario y el negocio.
7. Cargar servicios, profesionales y plantillas.
8. Probar que el usuario solo ve su negocio.
9. Probar que una cita no puede pisar otra cita ni un bloqueo.

Para acelerar la primera prueba, usar `seed-demo.sql` despues de reemplazar `REEMPLAZAR_AUTH_USER_ID` por el id real del usuario creado en Auth.

Despues de cargar el seed, ejecutar `smoke-test.sql`. Corre dentro de una transaccion con `ROLLBACK`, asi que valida sin dejar reservas de prueba guardadas.

## Proteccion de agenda

`schema.sql` ya incluye una primera proteccion de servidor para evitar turnos superpuestos:

- las citas `pending` y `confirmed` no pueden solaparse para el mismo negocio, profesional y dia;
- los bloqueos no pueden solaparse entre si;
- una cita no puede entrar sobre un bloqueo;
- un bloqueo no puede entrar sobre una cita activa;
- se usa un bloqueo transaccional por negocio/profesional/dia para reducir carreras cuando dos reservas llegan casi al mismo tiempo.

Esto es distinto a la validacion visual de la demo: aca la base de datos rechaza el conflicto aunque el frontend se equivoque.

## Importante

El link publico de reserva no deberia leer tablas completas ni insertar citas directo desde el navegador. Lo correcto es crear funciones del servidor que:

1. devuelvan solo los datos publicos necesarios del negocio;
2. calculen horarios disponibles;
3. reciban slug, servicio, profesional, fecha, hora y datos del cliente;
4. validen que el negocio/servicio/profesional existen;
5. verifiquen que el horario sigue libre;
6. creen o actualicen cliente;
7. creen la cita.

Ya existen RPCs publicas de lectura limitada para devolver negocio, servicios, profesionales y horarios disponibles sin exponer tablas completas. Tambien existe una primera RPC `create_public_appointment(...)` para crear reservas desde el link publico con validacion del servidor.

## RPCs publicas previstas

Estas funciones estan pensadas para el futuro frontend real del link cliente:

### `get_public_booking_page(slug)`

Devuelve solo datos publicos:

- nombre, slug, ciudad, zona horaria y tipo de negocio;
- horario general, anticipacion minima y si auto-confirma;
- servicios activos y visibles online;
- profesionales activos que pueden hacer cada servicio.

No devuelve clientes, citas, notas internas, usuarios ni reportes.

### `get_public_available_slots(slug, service_id, date, professional_id)`

Devuelve horarios disponibles para un servicio y fecha. Si `professional_id` viene vacio, agrupa profesionales disponibles por horario.

Tiene en cuenta:

- duracion del servicio;
- horario general del negocio;
- horario laboral del profesional;
- anticipacion minima;
- citas `pending` y `confirmed`;
- bloqueos de agenda.

### `create_public_appointment(...)`

Crea la cita desde el link publico, vuelve a validar todo en servidor y rechaza el horario si ya fue ocupado.
