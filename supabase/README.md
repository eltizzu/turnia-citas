# Supabase para Turnia

Esta carpeta prepara el salto a produccion.

## Archivos

- `schema.sql`: tablas, indices, triggers y reglas RLS iniciales.
- `seed-demo.sql`: datos iniciales para probar un negocio real con un usuario admin.

## Como se usaria

1. Crear un proyecto en Supabase.
2. Abrir SQL Editor.
3. Ejecutar `schema.sql` en un entorno de prueba.
4. Crear un usuario desde Supabase Auth.
5. Crear un negocio en `businesses`.
6. Crear una relacion en `business_users` entre ese usuario y el negocio.
7. Cargar servicios, profesionales y plantillas.
8. Probar que el usuario solo ve su negocio.

Para acelerar la primera prueba, usar `seed-demo.sql` despues de reemplazar `REEMPLAZAR_AUTH_USER_ID` por el id real del usuario creado en Auth.

## Importante

El link publico de reserva no deberia leer tablas completas ni insertar citas directo desde el navegador en la primera version real. Lo correcto es crear funciones del servidor que:

1. devuelvan solo los datos publicos necesarios del negocio;
2. calculen horarios disponibles;
3. reciban slug, servicio, profesional, fecha, hora y datos del cliente;
4. validen que el negocio/servicio/profesional existen;
5. verifiquen que el horario sigue libre;
6. creen o actualicen cliente;
7. creen la cita.

Eso evita turnos superpuestos cuando dos clientes reservan casi al mismo tiempo.
