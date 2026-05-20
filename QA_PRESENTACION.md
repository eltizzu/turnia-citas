# QA Para Presentar Turnia

## Objetivo

Este checklist sirve para probar la demo antes de mostrarsela a un negocio.

## Flujo 1: Entrada

- Abrir `http://127.0.0.1:5280`.
- Ver pantalla inicial de Turnia.
- Entrar como negocio.
- Volver al inicio.
- Entrar como cliente.
- Volver al panel.

## Flujo 2: Agenda

- Cambiar fecha en agenda.
- Filtrar por profesional.
- Crear una cita manual.
- Confirmar una cita pendiente.
- Abrir WhatsApp preparado.
- Marcar una cita como finalizada.
- Marcar una cita como no asistio.
- Reprogramar una cita.

## Flujo 3: Link Cliente

- Entrar a Vista cliente.
- Elegir fecha.
- Elegir servicio.
- Elegir profesional o cualquiera disponible.
- Seleccionar horario.
- Completar nombre y telefono.
- Reservar.
- Confirmar que aparece en agenda como pendiente o confirmada segun configuracion.

## Flujo 4: Servicios Y Equipo

- Crear servicio.
- Editar precio o duracion.
- Crear profesional.
- Editar horario o servicios del profesional.
- Ver que el link cliente recalcula disponibilidad.

## Flujo 5: Clientes

- Crear cliente.
- Editar cliente desde la ficha.
- Revisar historial.
- Abrir WhatsApp desde ficha.

## Flujo 6: Bloqueos

- Crear bloqueo para un profesional.
- Confirmar que aparece en agenda.
- Confirmar que ese horario no aparece en link cliente.
- Eliminar bloqueo.

## Flujo 7: Reportes Y Datos

- Abrir Reportes.
- Guardar PDF desde navegador.
- Exportar clientes CSV.
- Exportar citas CSV.
- Exportar backup JSON.
- Recargar pagina y confirmar que los datos siguen.
- Restaurar demo.

## Respuestas Para Presentacion

### Login

El login actual es simulado. En produccion cada negocio tendra su cuenta y sus datos separados.

### Link Publico

La vista cliente representa el link publico que el negocio pondria en Instagram, WhatsApp, Google Business o su web.

### WhatsApp

La demo prepara el mensaje y abre WhatsApp. El envio automatico queda para una fase posterior con WhatsApp Business Platform.

### Datos

La demo guarda en el navegador. En produccion se usara backend, base de datos, usuarios y permisos.

### Legal

Hay plantillas base, pero antes de vender en produccion deben revisarse con profesional legal o gestoria.
