# Guia para crear Supabase y activar login

Esta guia es para pasar Turnia de demo local a una primera base real.

Estado actual: en esta maquina no esta instalada la CLI de Supabase, asi que el primer alta conviene hacerla desde el panel web de Supabase y el SQL Editor.

## 1. Crear proyecto

1. Entrar en https://supabase.com.
2. Crear cuenta o iniciar sesion.
3. Crear un proyecto nuevo.
4. Nombre sugerido: `turnia`.
5. Region: elegir la mas cercana a los clientes iniciales.
6. Guardar la contrasena de base de datos en un lugar seguro.

## 2. Conseguir URL y clave publica

En Supabase:

1. Abrir el proyecto.
2. Ir a `Project Settings`.
3. Entrar en `API Keys` o `Connect`.
4. Copiar:
   - Project URL.
   - Publishable key o anon key.

La publishable/anon key puede ir en frontend si RLS esta bien configurado. La secret/service role key no va nunca en navegador ni en archivos publicos.

## 3. Crear tablas

1. Ir a `SQL Editor`.
2. Abrir [supabase/schema.sql](supabase/schema.sql).
3. Copiar el contenido.
4. Ejecutarlo en Supabase.
5. Revisar que no haya errores.

Ese archivo crea tablas, indices, triggers, RLS inicial, proteccion anti turnos superpuestos y RPCs publicas limitadas para el link cliente.

## 4. Crear usuario admin

Para la primera prueba:

1. Ir a `Authentication`.
2. Crear un usuario con email.
3. Confirmarlo si Supabase lo requiere.

Despues se puede activar Google.

## 5. Crear negocio demo

Cuando exista el usuario admin:

1. Copiar el `id` del usuario en Supabase Auth.
2. Abrir [supabase/seed-demo.sql](supabase/seed-demo.sql).
3. Reemplazar `REEMPLAZAR_AUTH_USER_ID` por ese `id`.
4. Ejecutar el SQL.

Esto crea:

- negocio demo
- relacion usuario-negocio
- profesionales
- servicios
- relacion profesional-servicio
- clientes
- citas
- bloqueos
- plantillas

## 6. Ejecutar prueba rapida

Despues de `schema.sql` y `seed-demo.sql`:

1. Abrir [supabase/smoke-test.sql](supabase/smoke-test.sql).
2. Copiarlo en SQL Editor.
3. Ejecutarlo.
4. Confirmar que:
   - `get_public_booking_page('centro-demo')` devuelve negocio, servicios y profesionales.
   - `get_public_available_slots(...)` devuelve horarios.
   - la segunda reserva en el mismo horario se rechaza con aviso `slot_not_available`.

El archivo usa `ROLLBACK`, asi que no deberia dejar datos de prueba guardados.

## 7. Conectar frontend en modo preview

Para probar configuracion sin secretos:

1. Copiar `turnia.config.example.js` como `turnia.config.local.js`.
2. Cambiar:
   - `dataMode: "supabase"`
   - `supabaseUrl`
   - `supabaseAnonKey`
3. No subir `turnia.config.local.js` si tiene datos reales.
4. Cargar el SDK oficial de Supabase antes de `supabaseClient.js` cuando conectemos el frontend real.

Importante: hoy `dataProviders.js` sigue en modo `supabase-preview`; prepara payloads pero todavia no reemplaza toda la lectura/escritura local por consultas reales.

La capa para el link publico real ya vive en `publicBookingApi.js`:

- `getBookingPage(slug)` llama `get_public_booking_page`.
- `getAvailableSlots(...)` llama `get_public_available_slots`.
- `createAppointment(...)` llama `create_public_appointment`.

## 8. Activar Google Login

Supabase permite login con Google usando OAuth.

Resumen:

1. Crear o abrir proyecto en Google Cloud.
2. Configurar pantalla de consentimiento OAuth.
3. Crear credenciales OAuth Client.
4. En Supabase, ir a `Authentication > Providers`.
5. Activar Google.
6. Pegar Client ID y Client Secret.
7. Configurar redirect URLs.

Documentacion oficial:

- https://supabase.com/docs/guides/auth/social-login/auth-google

## 9. Como funciona en Turnia

Cuando un usuario entra con Google:

1. Supabase identifica el usuario.
2. Turnia mira `business_users`.
3. Si ese usuario esta asociado a un negocio, entra al panel.
4. Si no esta asociado, ve una pantalla de "sin negocio asignado".

Esto permite:

- dueno con rol `admin`
- empleados con rol `staff`
- varios usuarios para el mismo negocio
- impedir que un usuario vea datos de otro negocio

## 10. Seguridad basica

Antes de usar con clientes reales:

- RLS activo.
- No exponer secret/service role key.
- Probar que usuario A no ve datos de usuario B.
- Probar reservas simultaneas.
- Probar `smoke-test.sql`.
- Activar HTTPS.
- Revisar textos legales.

Documentacion oficial:

- API keys: https://supabase.com/docs/guides/getting-started/api-keys
- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
