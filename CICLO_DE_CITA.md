# Ciclo De Una Cita En Turnia

## Estados

### Pendiente

La cita fue creada manualmente o desde el link publico, pero el negocio todavia debe revisarla.

Acciones:

- Confirmar.
- Cancelar.

### Confirmada

La cita esta aceptada y bloquea el horario.

Acciones:

- Abrir WhatsApp con mensaje de confirmacion.
- Finalizar.
- Marcar como no asistio.
- Reprogramar.

### Finalizada

El cliente asistio y el servicio se realizo.

Impacto:

- Cuenta como ingreso estimado.
- Aparece en historial del cliente.
- Ayuda a calcular reportes.

### No Asistio

El cliente no fue a la cita.

Impacto:

- Debe aparecer en historial.
- Debe contarse en reportes.
- Mas adelante puede servir para alertar clientes con muchas faltas.

### Cancelada

La cita fue cancelada por el negocio o cliente.

Impacto:

- Libera el horario.
- No cuenta como ingreso.
- Queda en historial para referencia.

## Flujo Recomendado Para MVP

1. Cliente reserva desde link publico.
2. Cita entra como pendiente.
3. Negocio confirma.
4. Turnia prepara WhatsApp.
5. Cliente asiste.
6. Negocio marca finalizada.

Si no asiste, se marca como no asistio para que el reporte y el historial lo reflejen.

## Reprogramacion

La reprogramacion permite mover una cita a otro horario disponible.

Reglas:

- Se calcula disponibilidad segun servicio, duracion y profesional.
- Se calcula por fecha y horario.
- La cita actual se ignora durante el calculo para no bloquearse a si misma.
- El nuevo horario vuelve a quedar como pendiente.
- Turnia prepara un WhatsApp avisando el cambio al cliente.
