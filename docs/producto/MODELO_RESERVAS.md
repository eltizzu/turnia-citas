# Modelo De Reservas De Turnia

Turnia debe funcionar con dos vistas conectadas a la misma agenda.

## Vista Negocio

Es la parte interna del salon.

El negocio puede:

- Cargar turnos manuales recibidos por WhatsApp, llamada o Instagram.
- Ver agenda diaria y semanal.
- Crear, editar, cancelar y reprogramar citas.
- Cargar clientes.
- Configurar servicios.
- Configurar profesionales.
- Bloquear horarios.
- Confirmar reservas pendientes.

## Vista Cliente

Es el link publico que el negocio puede poner en Instagram, WhatsApp Business, Google Business o su web.

Ejemplo:

`turnia.app/salon-demo`

El cliente puede:

- Ver servicios disponibles.
- Ver duracion y precio.
- Elegir profesional o cualquier profesional disponible.
- Ver horarios libres reales.
- Cargar nombre, telefono y nota.
- Solicitar o confirmar una cita.

## Sincronizacion

La agenda del negocio es la fuente principal.

La vista cliente no debe mostrar horarios ocupados por:

- Citas confirmadas.
- Citas pendientes, si bloquean el hueco.
- Bloqueos manuales.
- Descansos.
- Ausencias.
- Horarios fuera de atencion.

Antes de guardar una reserva, Turnia debe comprobar otra vez que el horario sigue libre.

## Regla Base Del MVP

Cliente reserva desde el link publico -> la cita entra como pendiente -> el hueco queda bloqueado -> el negocio confirma.

## Datos Necesarios

### Servicios

- Nombre
- Categoria
- Duracion
- Precio
- Profesionales que pueden hacerlo
- Reservable online

### Profesionales

- Nombre
- Especialidad
- Horario de trabajo
- Servicios que puede hacer
- Citas asignadas
- Bloqueos o ausencias

### Citas

- Cliente
- Telefono
- Servicio
- Profesional
- Dia
- Hora
- Duracion
- Precio
- Estado
- Nota

## Setup Inicial

Para los primeros clientes, Turnia puede entregarse casi personalizado:

- Nombre del negocio
- Horarios
- Profesionales
- Servicios
- Duraciones
- Precios
- Reglas de reserva
- Enlace publico listo
- Texto para pegar en Instagram o WhatsApp
