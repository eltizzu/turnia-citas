# Plan produccion MVP

Este documento baja Turnia desde demo local a una primera version vendible con clientes reales. La prioridad no es hacer una plataforma gigante: es tener login real, datos reales, link publico por negocio y reservas sin pisarse.

## Decision recomendada

Para la primera produccion conviene ir con:

- Frontend: mantener la app actual y migrarla de a poco.
- Hosting: Netlify o Vercel para publicar rapido y tener previews.
- Backend y base de datos: Supabase con Postgres, Auth y Row Level Security.
- WhatsApp: mantener envio semiautomatico por link `wa.me` al principio.
- Pagos: fuera del MVP tecnico; cobrar setup y mensualidad manual al inicio.

Motivo: Supabase permite tener autenticacion, base de datos, reglas de seguridad y API sin construir un backend completo desde cero. Eso nos deja enfocarnos en reservas, disponibilidad y experiencia para el negocio.

## Que debe tener la primera version vendible

### 1. Negocios reales

Cada negocio debe tener su propio espacio:

- nombre comercial
- slug publico, por ejemplo `turnia.app/r/barberia-norte`
- ciudad
- telefono
- horarios generales
- reglas de reserva
- plantillas de mensajes

La app nunca debe mezclar informacion entre negocios.

### 2. Login real

El acceso actual de demo debe convertirse en:

- email y contrasena o magic link
- sesion persistente
- cerrar sesion
- recuperacion de acceso
- roles basicos

Roles iniciales:

- Dueno/admin: configura negocio, equipo, servicios, reportes y agenda.
- Personal: ve agenda y gestiona citas propias o del local, segun permisos.

Para el primer piloto podemos empezar solo con admin.

### 3. Link publico de cliente

Cada negocio necesita una pagina publica de reserva:

- elegir servicio
- elegir profesional o "cualquiera"
- elegir fecha
- ver horarios disponibles reales
- completar nombre, telefono y nota
- crear reserva pendiente o confirmada segun configuracion

La disponibilidad se debe validar en servidor antes de guardar la cita. Aunque el navegador muestre un horario libre, el backend debe volver a chequearlo para evitar reservas simultaneas.

### 4. Datos persistentes

Dejar `localStorage` solo como demo/fallback. Produccion debe guardar en base de datos:

- negocios
- usuarios
- profesionales
- servicios
- relacion profesional-servicio
- clientes
- citas
- bloqueos
- plantillas
- configuracion

### 5. Seguridad minima

Antes de vender con datos reales:

- HTTPS obligatorio
- contrasenas gestionadas por proveedor de auth
- reglas por `business_id`
- ningun secreto en el navegador
- backups de base de datos
- validacion del lado servidor para crear/reprogramar citas
- logs basicos de errores
- textos legales revisados

### 6. Reportes utiles

La demo ya tiene reportes. En produccion deben salir desde base real:

- turnos del mes
- ingresos estimados
- servicios mas pedidos
- rendimiento por profesional
- canceladas/no asistio
- clientes recurrentes
- exportacion CSV

PDF puede seguir con imprimir/guardar como PDF en MVP.

## Fases de trabajo

### Fase 0 - Demo presentable

Estado: casi completa.

Falta revisar:

- mobile real
- textos finales
- datos de ejemplo mas neutros
- flujo de reserva extremo: sin horarios, profesional ocupado, servicio invisible online

### Fase 1 - Preparar base tecnica

Objetivo: que el proyecto deje de ser solo archivos sueltos.

Tareas:

- inicializar repositorio Git
- separar la logica de datos de la logica visual
- separar reglas de agenda en `agendaRules.js`
- preparar adaptador de datos en `dataAdapter.js`
- crear capa `dataProvider`
- separar proveedores de persistencia en `dataProviders.js`
- mantener `localStorageProvider` para demo
- preparar `supabaseProvider` vacio o mockeado
- documentar variables de entorno
- preparar `supabase/schema.sql` con tablas y RLS inicial

Resultado esperado: la app sigue funcionando igual, pero el dia de conectar Supabase no hay que reescribir todo.

### Fase 2 - Base de datos y login

Objetivo: negocio real puede entrar y ver sus datos.

Tareas:

- crear proyecto Supabase
- crear tablas iniciales
- activar RLS
- cargar datos demo como seed
- implementar login real
- asociar usuario a negocio
- reemplazar lectura/escritura de negocio, servicios, profesionales y clientes

Resultado esperado: un negocio real entra con su email y no ve datos de otros.

### Fase 3 - Citas reales

Objetivo: agenda sincronizada.

Tareas:

- guardar citas en base de datos
- guardar bloqueos en base de datos
- calcular disponibilidad usando datos del negocio
- validar disponibilidad en servidor antes de insertar
- reprogramar sin pisar horarios
- confirmar/cancelar/finalizar con persistencia real

Resultado esperado: dos dispositivos ven la misma agenda y no pueden reservar el mismo horario.

### Fase 4 - Link publico real

Objetivo: clientes reservan desde un link compartible.

Tareas:

- ruta publica por slug
- lectura publica limitada de servicios/profesionales/horarios
- creacion publica de solicitud de cita
- pantalla de confirmacion para cliente
- mensajes de WhatsApp preparados

Resultado esperado: el negocio pone su link en Instagram o web y recibe citas.

### Fase 5 - Piloto pago

Objetivo: venderlo a 1-3 negocios reales con setup manual.

Tareas:

- crear checklist de alta real
- configurar negocio desde admin o base
- importar servicios y profesionales
- revisar textos legales
- acordar soporte por WhatsApp/email
- medir problemas durante 2-4 semanas

Resultado esperado: aprender con clientes reales antes de construir cosas caras.

## Orden recomendado desde hoy

1. Separar la app en capas: UI, reglas de agenda y datos.
2. Crear modelo de datos final.
3. Preparar Supabase.
4. Migrar login y configuracion.
5. Migrar servicios, equipo y clientes.
6. Migrar citas y bloqueos.
7. Publicar primer entorno privado.
8. Hacer piloto con un negocio.

## Decisiones para despues

- Cobro online dentro de la reserva.
- WhatsApp Business API automatica.
- Recordatorios automaticos.
- Multi-sucursal.
- Marketplace o descubrimiento de negocios.
- App movil nativa.
- Integracion con Google Calendar.
- Cupones, bonos o membresias.

## Riesgos principales

- Reservas simultaneas: se resuelve con validacion del lado servidor.
- Datos cruzados entre negocios: se resuelve con `business_id` y RLS.
- Negocios no tecnicos: se resuelve con setup asistido y configuracion simple.
- WhatsApp automatico: puede volverse costoso/complejo; MVP semiautomatico.
- Legal/RGPD: revisar plantillas con profesional antes de vender en serio.

## Referencias tecnicas

- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Vercel deployments: https://vercel.com/docs/deployments/deployment-methods
- Netlify deploys: https://docs.netlify.com/deploy/deploy-overview/
