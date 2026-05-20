# Modelo de datos produccion

Este modelo define las tablas necesarias para que Turnia funcione con negocios reales, login y reservas sincronizadas.

## Principio clave

Casi todas las tablas deben tener `business_id`. Eso permite que cada negocio vea solo sus datos y que la app pueda crecer a muchos clientes sin mezclar agendas, clientes o reportes.

## Tablas principales

### businesses

Representa cada negocio que usa Turnia.

- `id`
- `name`
- `slug`
- `city`
- `phone`
- `timezone`
- `settings`
- `created_at`
- `updated_at`

Notas:

- `slug` debe ser unico.
- `settings` puede guardar auto-confirmacion, intervalo de turnos, anticipacion minima y textos de marca.

### business_users

Relaciona usuarios autenticados con negocios.

- `id`
- `business_id`
- `auth_user_id`
- `name`
- `email`
- `role`
- `active`
- `created_at`

Roles iniciales:

- `admin`
- `staff`

Para MVP podemos usar solo `admin`, pero la tabla ya queda preparada.

### professionals

Profesionales/equipo del negocio.

- `id`
- `business_id`
- `name`
- `role`
- `work_start`
- `work_end`
- `active`
- `created_at`
- `updated_at`

### services

Servicios que el negocio ofrece.

- `id`
- `business_id`
- `name`
- `category`
- `duration_minutes`
- `price_cents`
- `online`
- `active`
- `created_at`
- `updated_at`

Notas:

- Guardar precio en centavos evita errores de decimales.
- `online = false` permite servicios internos no reservables desde el link publico.

### professional_services

Relacion muchos-a-muchos entre profesionales y servicios.

- `professional_id`
- `service_id`
- `business_id`

La combinacion `professional_id + service_id` debe ser unica.

### clients

Clientes del negocio.

- `id`
- `business_id`
- `name`
- `phone`
- `email`
- `note`
- `created_at`
- `updated_at`

En MVP el telefono puede ser obligatorio y email opcional.

### appointments

Citas/reservas.

- `id`
- `business_id`
- `client_id`
- `professional_id`
- `service_id`
- `date`
- `start_time`
- `end_time`
- `duration_minutes`
- `price_cents`
- `status`
- `source`
- `client_note`
- `internal_note`
- `created_at`
- `updated_at`

Estados:

- `pending`
- `confirmed`
- `completed`
- `cancelled`
- `no_show`

Fuentes:

- `business`
- `public_link`
- `import`

Regla importante: antes de crear o reprogramar una cita, el servidor debe verificar que no se superpone con otra cita activa ni con un bloqueo.

### blocks

Bloqueos de agenda: descanso, ausencia, comida, vacaciones cortas, tareas internas.

- `id`
- `business_id`
- `professional_id`
- `date`
- `start_time`
- `end_time`
- `reason`
- `created_at`

Mas adelante se puede permitir bloqueo de todo el negocio con `professional_id = null`.

### message_templates

Plantillas para mensajes de WhatsApp.

- `id`
- `business_id`
- `type`
- `body`
- `created_at`
- `updated_at`

Tipos iniciales:

- `confirmation`
- `cancellation`
- `reminder`
- `reschedule`

### appointment_events

Historial/auditoria de cambios en citas.

- `id`
- `business_id`
- `appointment_id`
- `actor_user_id`
- `event_type`
- `payload`
- `created_at`

No hace falta mostrarlo al usuario al principio, pero sirve para saber quien confirmo, cancelo o reprogramo.

## Reglas de seguridad

### Panel negocio

Un usuario autenticado puede leer y modificar datos solo si pertenece al mismo `business_id`.

Ejemplo conceptual:

```sql
exists (
  select 1
  from business_users
  where business_users.business_id = appointments.business_id
  and business_users.auth_user_id = auth.uid()
  and business_users.active = true
)
```

### Link publico

Permitido publicamente:

- leer negocio por `slug`
- leer servicios activos y online
- leer profesionales activos necesarios para disponibilidad
- consultar horarios disponibles
- crear solicitud de cita

No permitido publicamente:

- ver clientes
- ver telefonos de otros clientes
- ver ingresos/reportes
- ver notas internas
- editar citas existentes

## Disponibilidad

La disponibilidad debe considerar:

- fecha elegida
- horario del negocio
- horario del profesional
- duracion del servicio
- intervalo de agenda
- anticipacion minima
- citas activas
- bloqueos
- si el profesional realiza ese servicio

Una cita bloquea horario si su estado es:

- `pending`
- `confirmed`

No bloquea si esta:

- `cancelled`
- `no_show`

`completed` queda en el pasado y no deberia afectar nuevas reservas futuras.

## Migracion desde la demo

Plan:

1. Exportar backup JSON desde Configuracion.
2. Crear negocio en base de datos.
3. Insertar servicios.
4. Insertar profesionales.
5. Crear relaciones profesional-servicio.
6. Insertar clientes.
7. Insertar citas.
8. Insertar bloqueos.
9. Revisar reportes.

## Primeras consultas necesarias

- Agenda del dia: citas y bloqueos por negocio, fecha y profesional opcional.
- Vista semanal: citas y bloqueos entre lunes y sabado.
- Link publico: negocio por `slug`, servicios online y profesionales activos.
- Crear cita publica: validar cliente, buscar/crear cliente, verificar disponibilidad y crear cita.

## Dejar fuera del MVP

- pagos online
- cupones
- sucursales
- impuestos/facturacion completa
- turnos recurrentes
- paquetes o membresias
- permisos granulares por accion
