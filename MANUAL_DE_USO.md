# Manual De Uso

Estado: documento vivo. Actualizar cuando cambie una pantalla, accion, estado, perfil o flujo.

Este manual esta pensado para personas no tecnicas.

## Perfiles

### Negocio/admin

Puede:

- ver agenda;
- crear citas;
- confirmar o cancelar reservas;
- reprogramar;
- finalizar citas;
- marcar no asistencia;
- crear servicios;
- editar servicios;
- crear profesionales;
- editar profesionales;
- crear clientes;
- revisar historial;
- bloquear horarios;
- ver reportes;
- exportar datos;
- configurar negocio y link publico.

### Cliente final

Puede:

- entrar al link publico;
- elegir servicio;
- elegir profesional o cualquiera;
- elegir fecha;
- elegir horario disponible;
- cargar nombre, telefono y nota;
- enviar reserva.

### Usuario sin negocio asignado

Caso preparado para produccion:

- la persona inicia sesion;
- Turnia detecta que no pertenece a ningun negocio;
- se muestra un aviso;
- no puede entrar al panel hasta que se le asigne un negocio.

## Pantalla de inicio

Acciones:

- `Entrar como negocio`: abre el panel del negocio.
- `Entrar con Google`: en demo simula login; en produccion usara Google.
- `Ver link del cliente`: muestra la experiencia publica de reserva.

En demo:

- email de negocio: `salon@demo.com`;
- contrasena: `turnia-demo`.

## Agenda

La agenda muestra citas y bloqueos del dia seleccionado.

Controles:

- selector de fecha;
- filtro por profesional;
- boton `Nueva cita`;
- boton `Bloquear horario`;
- acciones por cita.

Estados de cita:

- `Pendiente`: reserva recibida o cargada sin confirmar.
- `Confirmada`: el negocio confirmo la cita.
- `Finalizada`: el servicio ya se realizo.
- `Cancelada`: la cita no se hara.
- `No asistio`: el cliente no fue.

Acciones comunes:

### Crear cita manual

1. Entrar al panel del negocio.
2. Pulsar `Nueva cita`.
3. Cargar cliente.
4. Cargar telefono.
5. Elegir servicio.
6. Elegir profesional.
7. Elegir fecha y hora.
8. Agregar nota si hace falta.
9. Guardar.

Turnia valida si el horario esta libre.

### Confirmar cita

1. Buscar una cita pendiente.
2. Pulsar `Confirmar`.
3. Turnia cambia el estado a confirmada.
4. Turnia prepara el mensaje de WhatsApp.
5. El negocio puede enviar el mensaje al cliente.

### Cancelar cita

1. Buscar la cita.
2. Pulsar `Cancelar`.
3. Turnia cambia el estado.
4. Se prepara mensaje para avisar al cliente.

### Reprogramar cita

1. Pulsar `Reprogramar`.
2. Elegir nueva fecha.
3. Elegir profesional.
4. Elegir horario disponible.
5. Agregar nota si hace falta.
6. Guardar.

Turnia evita elegir horarios ocupados o bloqueados.

### Finalizar cita

1. Buscar una cita confirmada.
2. Pulsar `Finalizar`.
3. La cita queda cerrada.

### Marcar no asistencia

1. Buscar una cita confirmada.
2. Pulsar `No asistio`.
3. El historial del cliente queda marcado.

## Bloqueos

Sirven para impedir reservas en un horario.

Ejemplos:

- comida;
- descanso;
- ausencia;
- tarea interna;
- profesional no disponible.

Crear bloqueo:

1. Ir a Agenda.
2. Pulsar `Bloquear horario`.
3. Elegir fecha.
4. Elegir profesional.
5. Indicar inicio y fin.
6. Escribir motivo.
7. Guardar.

El link cliente no mostrara ese horario como disponible.

## Vista semanal

Sirve para revisar la semana completa.

Uso:

1. Entrar a `Semana`.
2. Elegir profesional.
3. Revisar citas y bloqueos por dia.

## Clientes

La seccion Clientes permite ver:

- nombre;
- telefono;
- notas;
- cantidad de citas;
- historial;
- ingresos estimados;
- contacto por WhatsApp.

Crear cliente:

1. Ir a Clientes.
2. Pulsar `Nuevo cliente`.
3. Cargar nombre.
4. Cargar telefono.
5. Agregar nota.
6. Guardar.

Editar cliente:

1. Seleccionar cliente.
2. Editar desde su ficha.
3. Guardar.

## Servicios

Cada servicio tiene:

- nombre;
- categoria;
- duracion;
- precio;
- profesionales que lo realizan;
- visibilidad online.

Crear servicio:

1. Ir a Servicios.
2. Pulsar `Nuevo servicio`.
3. Cargar datos.
4. Elegir profesionales.
5. Decidir si aparece online.
6. Guardar.

Si `visible online` esta desactivado, el cliente no lo ve en el link publico.

## Equipo

Cada profesional tiene:

- nombre;
- especialidad;
- hora de inicio;
- hora de fin;
- servicios asignados.

Turnia usa estos datos para calcular disponibilidad.

## Link Cliente

Flujo de reserva:

1. Cliente entra al link.
2. Elige servicio.
3. Elige profesional o cualquiera.
4. Elige fecha.
5. Turnia muestra horarios libres.
6. Cliente selecciona horario.
7. Carga nombre, telefono y nota.
8. Envia reserva.

Segun configuracion:

- puede entrar como pendiente;
- puede entrar como confirmada automaticamente.

## Reportes

Permiten revisar:

- cantidad de turnos;
- ingresos estimados;
- ticket medio;
- pendientes;
- finalizadas;
- no asistio;
- canceladas;
- servicios destacados;
- ingresos por profesional.

Boton importante:

- `Guardar PDF`: usa la funcion imprimir/guardar como PDF del navegador.

## Configuracion

Permite cambiar:

- nombre del negocio;
- slug del link;
- ciudad;
- telefono;
- horario general;
- intervalo de reservas;
- anticipacion minima;
- auto-confirmacion;
- plantillas de WhatsApp.

Tambien permite exportar:

- clientes Excel;
- citas Excel;
- backup JSON.

Los archivos Excel se abren como planilla clara para el negocio. El backup JSON es tecnico y sirve para guardar todos los datos de la demo, no para leerlo como Excel.

## Restaurar demo

El boton `Restaurar demo` borra cambios guardados en el navegador y vuelve a los datos iniciales.

Usarlo solo cuando se quiera limpiar la demo.

Tambien se puede abrir la URL con `?reset-demo=1` para limpiar la demo antes de una presentacion.
