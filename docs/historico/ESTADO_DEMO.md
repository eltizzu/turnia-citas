# Estado De Demo De Turnia

## Lista Para Mostrar

La demo ya permite presentar el concepto completo:

- Entrada inicial con login simulado.
- Modo negocio.
- Modo cliente desde link publico.
- Agenda del dia.
- Vista semanal basica.
- Nueva cita manual.
- Reserva desde vista cliente.
- Confirmacion/cancelacion con WhatsApp preparado.
- Clientes con ficha, notas e historial.
- Edicion de clientes desde ficha.
- Servicios editables.
- Profesionales editables.
- Edicion de servicios y profesionales existentes.
- Eliminacion segura de servicios, profesionales, clientes y bloqueos.
- Bloqueos de agenda.
- Configuracion del negocio.
- Reportes y guardado como PDF desde el navegador.
- Persistencia local en el navegador.
- Restaurar demo.

## Aclaraciones Para Presentar

Esto todavia no es produccion. Es una demo funcional para validar producto, experiencia y venta.

Partes simuladas:

- Login.
- Separacion real de negocios.
- Base de datos.
- Link publico real.
- Envio automatico de WhatsApp.
- Fechas reales por dia/semana.
- Usuarios y permisos.

## Fragilidades Conocidas

- Todo corre en frontend y `localStorage`.
- No hay backend ni autenticacion real.
- Las citas y bloqueos ya usan fecha real en formato `YYYY-MM-DD`.
- Todavia no hay navegacion avanzada de calendario mensual.
- No hay edicion/borrado completo de servicios, profesionales o clientes.
- La edicion de clientes actualiza citas asociadas si cambia nombre o telefono.
- La eliminacion esta limitada: no borra servicios/profesionales/clientes con citas asociadas.
- No hay reprogramacion guiada todavia.
- No hay export CSV/JSON todavia.
- No hay control multi-negocio real.

## Siguiente Ronda Recomendada

Para reforzar la demo:

1. Reprogramar cita.
2. Marcar finalizada/no asistio.
3. Exportar clientes y citas en CSV.
4. Vista semanal.
5. Separar ruta real de panel y link publico cuando haya backend.
