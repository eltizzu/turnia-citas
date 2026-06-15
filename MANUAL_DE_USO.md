# Manual De Uso

Estado: documento vivo. Actualizar cuando cambie una pantalla, accion, estado o flujo.

Ultima actualizacion: 16 de junio de 2026.

Este manual esta escrito en lenguaje simple. La idea es que lo pueda entender una persona que no sabe de tecnologia.

## Que Es Turnia

Turnia es una app para negocios que trabajan con turnos.

Sirve para:

- ordenar la agenda;
- crear y confirmar citas;
- ver clientes;
- cargar servicios;
- cargar profesionales;
- compartir un link para que el cliente reserve;
- ver metricas simples del negocio.

La version actual sirve para demo, prueba privada y piloto controlado. Todavia no se debe usar con datos sensibles sin revisar bien la configuracion real.

## Quienes Usan La App

### Negocio

Es la persona que maneja el panel.

Puede:

- ver citas;
- crear citas manuales;
- confirmar, cancelar o reprogramar;
- ver clientes;
- cargar servicios;
- cargar profesionales;
- bloquear horarios;
- revisar metricas;
- exportar datos;
- configurar el link del negocio.

### Cliente

Es la persona que entra al link publico para reservar.

Puede:

- elegir servicio;
- elegir profesional o cualquiera disponible;
- elegir fecha;
- elegir horario;
- cargar nombre, telefono y nota;
- enviar la reserva.

## Inicio

Al abrir la demo aparecen dos caminos principales:

- `Entrar como negocio`: abre el panel del negocio.
- `Ver link del cliente`: muestra como reserva una persona desde afuera.

Datos de prueba:

- email: `demo@turnia.app`;
- contrasena: `turnia-demo`.

Primer recorrido recomendado:

1. Entrar como negocio.
2. Mirar la agenda.
3. Confirmar una cita pendiente.
4. Abrir la vista del cliente.
5. Crear una reserva ficticia.
6. Volver al panel y ver si aparece en agenda.

## Agenda

La Agenda muestra las citas del dia.

Sirve para:

- revisar que turnos hay hoy;
- confirmar citas pendientes;
- cancelar citas;
- reprogramar;
- marcar una cita como finalizada;
- marcar que un cliente no asistio;
- ver huecos libres;
- bloquear horarios.

Estados de una cita:

- `Pendiente`: falta confirmarla.
- `Confirmada`: la cita esta aceptada.
- `Finalizada`: el servicio ya se hizo.
- `Cancelada`: la cita no se hara.
- `No asistio`: el cliente no fue.

Crear una cita manual:

1. Ir a `Agenda`.
2. Pulsar `Nueva cita`.
3. Cargar nombre del cliente.
4. Cargar telefono.
5. Elegir servicio.
6. Elegir profesional.
7. Elegir fecha y hora.
8. Agregar nota si hace falta.
9. Guardar.

Turnia revisa si el horario esta libre antes de guardar.

Confirmar una cita:

1. Buscar una cita pendiente.
2. Pulsar `Confirmar`.
3. La cita pasa a confirmada.
4. Turnia prepara un mensaje de WhatsApp.
5. El negocio puede enviar ese mensaje al cliente.

Cancelar una cita:

1. Buscar la cita.
2. Pulsar `Cancelar`.
3. Turnia cambia el estado.
4. Se prepara un mensaje para avisar al cliente.

Reprogramar una cita:

1. Pulsar `Reprogramar`.
2. Elegir nueva fecha.
3. Elegir profesional.
4. Elegir horario disponible.
5. Guardar.

## Bloqueos

Un bloqueo sirve para que no entren reservas en un horario.

Ejemplos:

- almuerzo;
- descanso;
- ausencia;
- reunion;
- tarea interna.

Crear un bloqueo:

1. Ir a `Agenda`.
2. Pulsar `Bloquear horario`.
3. Elegir fecha.
4. Elegir profesional.
5. Indicar inicio y fin.
6. Escribir motivo.
7. Guardar.

El cliente no vera ese horario como disponible.

## Semana

La vista `Semana` muestra varios dias juntos.

Sirve para:

- ver si la semana esta cargada;
- revisar un profesional puntual;
- detectar dias tranquilos;
- detectar huecos.

Uso:

1. Ir a `Semana`.
2. Elegir profesional.
3. Revisar citas y bloqueos por dia.

## Clientes

La seccion `Clientes` muestra la base de clientes del negocio.

Sirve para ver:

- nombre;
- telefono;
- email;
- primer contacto;
- total de citas;
- historial;
- ingresos estimados;
- notas;
- acceso a WhatsApp.

Importante: los clientes se arman solos desde las citas. Si entra una reserva nueva, Turnia agrega ese cliente a la lista.

Buscar un cliente:

1. Ir a `Clientes`.
2. Escribir nombre, telefono o email en el buscador.
3. Tocar la ficha del cliente.

Ver historial:

1. Seleccionar un cliente.
2. Mirar primer contacto, total de citas e ingresos estimados.
3. Bajar a `Historial`.
4. Revisar fecha, hora, servicio, profesional, estado, precio y nota.

Crear cliente manual:

1. Ir a `Clientes`.
2. Pulsar `Nuevo cliente`.
3. Cargar nombre.
4. Cargar telefono.
5. Cargar email si se tiene.
6. Agregar una nota.
7. Guardar.

## Servicios

Los servicios son lo que el negocio ofrece.

Ejemplos:

- corte;
- color;
- manicura;
- masaje;
- fisioterapia;
- consulta.

Cada servicio tiene:

- nombre;
- categoria;
- duracion;
- precio;
- profesionales que lo hacen;
- si aparece o no en el link del cliente.

Por que es importante: Turnia usa la duracion del servicio para saber si un horario alcanza.

Crear servicio:

1. Ir a `Servicios`.
2. Pulsar `Nuevo servicio`.
3. Escribir nombre.
4. Elegir categoria.
5. Indicar duracion.
6. Indicar precio.
7. Elegir profesionales.
8. Marcar si aparece online.
9. Guardar.

Ejemplo:

- Servicio: Color + corte.
- Duracion: 90 minutos.
- Profesional: Mara.

Turnia solo mostrara horarios donde Mara tenga 90 minutos libres.

## Equipo

La seccion `Equipo` muestra las personas que trabajan en el negocio.

Cada profesional tiene:

- nombre;
- especialidad;
- horario de inicio;
- horario de fin;
- servicios que puede hacer.

Crear profesional:

1. Ir a `Equipo`.
2. Pulsar `Nuevo profesional`.
3. Escribir nombre.
4. Escribir especialidad.
5. Indicar horario de trabajo.
6. Elegir servicios que puede hacer.
7. Guardar.

Ejemplo:

- Profesional: Noe.
- Horario: 10:00 a 19:00.
- Servicios: Semipermanente y barba.

Turnia solo ofrecera turnos con Noe dentro de ese horario y para esos servicios.

## Link Del Cliente

El `Link cliente` es la pantalla que ve una persona que quiere reservar.

El negocio puede poner ese link en:

- Instagram;
- WhatsApp;
- Google;
- una web;
- una bio.

En la demo se puede abrir desde:

- `Ver link del cliente`;
- `Vista cliente`;
- `Link cliente`.

Flujo de reserva:

1. El cliente entra al link.
2. Elige servicio.
3. Elige profesional o cualquiera disponible.
4. Elige fecha.
5. Turnia muestra horarios libres.
6. El cliente elige horario.
7. Carga nombre, telefono y nota.
8. Envia la reserva.

Si el negocio confirma manualmente, la reserva entra como `Pendiente`.

Si el negocio usa confirmacion automatica, la reserva entra como `Confirmada`.

El link no es igual para todos los negocios. Cada negocio tiene su propio slug.

Ejemplos:

- `turnia.app/barberia-norte`;
- `turnia.app/clinica-movimiento`;
- `turnia.app/estudio-unas`.

## Reportes / Metricas

La seccion `Reportes` ayuda a entender como viene el negocio.

Sirve para ver:

- citas del periodo;
- ingresos estimados;
- ticket medio;
- citas pendientes, confirmadas, finalizadas y canceladas;
- servicios mas pedidos;
- hora con mas demanda;
- dia con mas demanda;
- movimiento por profesional.

Filtros:

- `Esta semana`;
- `Este mes`;
- `Ultimos 3 meses`.

Graficos:

- citas por estado;
- demanda por hora.

Como usarlo:

1. Ir a `Reportes`.
2. Elegir periodo.
3. Mirar las tarjetas de resumen.
4. Revisar los graficos.
5. Leer la lectura rapida.
6. Usar `Guardar PDF` si se quiere guardar una copia.

Importante: los ingresos son estimados. No reemplazan facturacion ni contabilidad.

Cotiza queda como modulo futuro. Todavia no muestra metricas porque falta definir la base real de presupuestos.

## Configuracion / Ajustes

En la app aparece como `Ajustes`.

Sirve para cambiar:

- nombre del negocio;
- tipo de negocio;
- link publico;
- ciudad;
- telefono;
- horario general;
- intervalo entre turnos;
- anticipacion minima;
- confirmacion automatica;
- mensajes de WhatsApp.

Tambien permite descargar:

- clientes Excel;
- citas Excel;
- backup JSON.

El Excel sirve para leer datos en una planilla.

El backup JSON sirve como copia tecnica de la demo.

## Restaurar Demo

`Restaurar demo` borra los cambios guardados en el navegador y vuelve a los datos iniciales.

Usarlo antes de una presentacion o cuando se quiera empezar de cero.

Tambien se puede abrir la demo con:

```txt
?reset-demo=1
```

## Que No Hacer Todavia

En esta etapa conviene evitar:

- cargar datos sensibles reales sin revisar seguridad;
- usar la demo como sistema definitivo;
- prometer funciones que todavia son futuras;
- tomar los ingresos estimados como contabilidad real.

Turnia ya esta preparada para avanzar a piloto, pero antes de uso real hay que revisar hosting, Supabase, backups, seguridad y legales.
