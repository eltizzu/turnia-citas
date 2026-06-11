# Manual De Uso

Estado: documento vivo. Actualizar cuando cambie una pantalla, accion, estado, perfil o flujo.

Ultima actualizacion: 27 de mayo de 2026.

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

- email de negocio: `demo@turnia.app`;
- contrasena: `turnia-demo`.

La pantalla inicial aclara que es una demo de prueba privada. La persona puede recorrer la app sin cargar datos reales.

Primer paso recomendado:

1. Entrar como negocio.
2. Revisar agenda.
3. Confirmar una cita pendiente.
4. Abrir la vista cliente.
5. Crear una reserva ficticia.

## Agenda

La agenda muestra citas y bloqueos del dia seleccionado.

La seccion explica que sirve para revisar el dia, confirmar pendientes y encontrar huecos libres.

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

La seccion esta pensada para detectar si un profesional tiene dias cargados, huecos o bloqueos.

Uso:

1. Entrar a `Semana`.
2. Elegir profesional.
3. Revisar citas y bloqueos por dia.

## Clientes

La seccion Clientes permite ver:

- nombre;
- telefono;
- email;
- fecha de primer contacto;
- notas;
- total de citas;
- historial completo;
- ingresos estimados;
- contacto por WhatsApp.

Los clientes se arman automaticamente desde las citas existentes. Si entra una reserva o se crea una cita manual con un cliente nuevo, Turnia lo agrega a la base de clientes.

En la demo hay clientes ficticios cargados para no empezar desde cero.

Buscar cliente:

1. Ir a `Clientes`.
2. Escribir nombre, telefono o email en el buscador.
3. Turnia filtra la lista al momento.
4. Tocar una ficha para ver el detalle.

Ver historial:

1. Entrar a `Clientes`.
2. Seleccionar un cliente.
3. Revisar primer contacto, total de citas, ingresos estimados y email.
4. Bajar a `Historial`.
5. Ver cada cita con fecha, hora, servicio, profesional, estado, importe y nota.

Crear cliente:

1. Ir a Clientes.
2. Pulsar `Nuevo cliente`.
3. Cargar nombre.
4. Cargar telefono.
5. Cargar email si se tiene.
6. Agregar nota.
7. Guardar.

Editar cliente:

1. Seleccionar cliente.
2. Editar desde su ficha.
3. Guardar.

## Reportes / Metricas

La seccion Reportes funciona como un dashboard simple para entender como viene el negocio.

Sirve para ver:

- cuantas citas hubo en el periodo;
- ingresos estimados;
- ticket medio;
- citas pendientes, confirmadas, finalizadas y canceladas;
- servicio mas reservado;
- hora y dia con mas demanda;
- movimiento por profesional.

Filtros disponibles:

- `Esta semana`: muestra solo las citas de la semana seleccionada.
- `Este mes`: muestra las citas del mes de la fecha seleccionada.
- `Ultimos 3 meses`: muestra una mirada mas amplia para detectar tendencias.

Graficos:

- `Citas por estado`: ayuda a ver si hay muchas pendientes o canceladas.
- `Demanda por hora`: ayuda a detectar horarios fuertes.

Como usarlo:

1. Ir a `Reportes`.
2. Elegir el periodo que se quiere revisar.
3. Mirar primero las tarjetas de resumen.
4. Revisar los graficos.
5. Leer la lectura rapida.
6. Si hace falta, pulsar `Guardar PDF` para guardar una copia desde el navegador.

Importante: los ingresos son estimados y se calculan con citas confirmadas o finalizadas. No reemplazan contabilidad ni facturacion.

Cotiza aparece como modulo futuro. Todavia no muestra metricas porque falta definir la base de presupuestos.

## Servicios

Cada servicio tiene:

- nombre;
- categoria;
- duracion;
- precio;
- profesionales que lo realizan;
- visibilidad online.

Los servicios son la base del sistema. Turnia usa la duracion del servicio para calcular si un horario entra completo en la agenda.

La seccion explica que el primer paso es revisar si los servicios tienen duracion, precio y profesionales asignados.

### Que significa cada campo

- `Nombre`: como vera el negocio o el cliente el servicio. Ejemplo: Corte express, Color + corte, Semipermanente.
- `Categoria`: ayuda a ordenar. Ejemplo: Peluqueria, Barberia, Unas, Estetica, Salud, Bienestar o Consultoria.
- `Duracion`: cuantos minutos ocupa el turno. Es clave para evitar superposiciones.
- `Precio`: importe estimado del servicio. Se usa en reportes e ingresos estimados.
- `Profesionales`: personas del equipo que pueden realizar ese servicio.
- `Visible online`: define si el servicio aparece o no en el link publico del cliente.

### Orden recomendado para cargar servicios

1. Cargar primero los servicios principales del negocio.
2. Usar nombres simples y entendibles.
3. Definir duraciones realistas, no solo aproximadas.
4. Cargar precios base.
5. Revisar si cada servicio debe aparecer online.
6. Luego ajustar profesionales que pueden realizarlo.

Crear servicio:

1. Ir a Servicios.
2. Pulsar `Nuevo servicio`.
3. Escribir nombre.
4. Escribir categoria.
5. Indicar duracion.
6. Indicar precio.
7. Elegir profesionales que pueden realizarlo.
8. Marcar o desmarcar si aparece online.
9. Guardar.

Editar servicio:

1. Ir a Servicios.
2. Buscar el servicio.
3. Pulsar `Editar`.
4. Cambiar nombre, categoria, duracion, precio, profesionales o visibilidad online.
5. Guardar.

Eliminar servicio:

1. Ir a Servicios.
2. Buscar el servicio.
3. Pulsar `Eliminar`.

Importante: en la demo no se permite eliminar un servicio si ya tiene citas asociadas. Esto evita romper historiales.

Si `visible online` esta desactivado, el cliente no lo ve en el link publico.

Ejemplo practico:

- Servicio: Color + corte.
- Duracion: 90 minutos.
- Precio: 58.
- Profesional: Mara.
- Visible online: si.

Resultado: el cliente podra reservar Color + corte solo en horarios donde Mara tenga 90 minutos libres.

## Equipo

Cada profesional tiene:

- nombre;
- especialidad;
- hora de inicio;
- hora de fin;
- servicios asignados.

Turnia usa estos datos para calcular disponibilidad.

La seccion explica que el primer paso es revisar horario de trabajo y servicios asignados.

### Que significa cada campo

- `Nombre`: nombre visible del profesional.
- `Especialidad`: rol o descripcion. Ejemplo: Colorista, Manicura, Barberia.
- `Inicio`: hora desde la que puede recibir turnos.
- `Fin`: hora hasta la que puede recibir turnos.
- `Servicios que puede realizar`: servicios asociados a esa persona.

### Orden recomendado para cargar profesionales

1. Cargar nombre y especialidad.
2. Definir horario real de trabajo.
3. Asignar solo los servicios que esa persona puede realizar.
4. Revisar la vista cliente para confirmar que aparecen horarios coherentes.

Crear profesional:

1. Ir a Equipo.
2. Pulsar `Nuevo profesional`.
3. Escribir nombre.
4. Escribir especialidad.
5. Indicar hora de inicio.
6. Indicar hora de fin.
7. Seleccionar servicios que puede realizar.
8. Guardar.

Editar profesional:

1. Ir a Equipo.
2. Buscar el profesional.
3. Pulsar `Editar`.
4. Cambiar nombre, especialidad, horario o servicios.
5. Guardar.

Eliminar profesional:

1. Ir a Equipo.
2. Buscar el profesional.
3. Pulsar `Eliminar`.

Importante: en la demo no se permite eliminar un profesional si tiene citas asociadas.

Ejemplo practico:

- Profesional: Noe.
- Especialidad: Manicura y barberia.
- Horario: 10:00 a 19:00.
- Servicios: Semipermanente, Barba + perfilado.

Resultado: el link cliente solo ofrecera esos servicios con Noe dentro de su horario libre.

## Relacion Entre Servicios Y Equipo

Turnia calcula disponibilidad combinando:

- horario general del negocio;
- horario del profesional;
- duracion del servicio;
- citas existentes;
- bloqueos;
- servicios que cada profesional puede hacer.

Ejemplo:

Si un servicio dura 90 minutos y el profesional termina a las 18:00, Turnia no deberia ofrecer un turno a las 17:00 si el servicio no entra completo.

Si un profesional no realiza un servicio, no aparece como opcion para ese servicio.

## Link Cliente

El Link Cliente es la vista publica que un negocio podria poner en Instagram, Google, WhatsApp o su web.

En la demo aparece como `Vista cliente` o `Link cliente`. Sirve para probar si una persona podria reservar sin escribir por WhatsApp.

En la demo se abre desde:

- pantalla inicial: `Ver link del cliente`;
- panel negocio: `Vista cliente`;
- menu lateral: `Link cliente`.

Para abrir directamente la vista del cliente en la demo, se puede usar:

```txt
demo.html?reserva=1
```

Ese modo no muestra la pantalla de login ni el panel del negocio.

En produccion, el equivalente seria el link propio del negocio:

```txt
turnia.app/{slug-del-negocio}
```

### Que ve el cliente

El cliente ve:

- nombre del negocio;
- link publico;
- fecha;
- servicio;
- profesional;
- horarios disponibles;
- formulario con nombre, telefono y nota.

### Flujo de reserva

1. Cliente entra al link.
2. Elige servicio.
3. Elige profesional o cualquiera.
4. Elige fecha.
5. Turnia muestra horarios libres.
6. Cliente selecciona horario.
7. Carga nombre, telefono y nota.
8. Envia reserva.

### Profesional: cualquiera disponible

Si el cliente elige `Cualquiera disponible`, Turnia busca cualquier profesional que pueda hacer ese servicio y tenga horario libre.

Ejemplo:

- Servicio: Semipermanente.
- Profesional: Cualquiera disponible.
- Turnia muestra horarios donde haya al menos una persona capaz de hacer ese servicio.

### Profesional especifico

Si el cliente elige un profesional concreto, Turnia solo muestra horarios libres de esa persona.

Ejemplo:

- Servicio: Color + corte.
- Profesional: Mara.
- Turnia muestra solo horarios libres de Mara donde entren 90 minutos.

### Horarios disponibles

Solo aparecen horarios que cumplen estas condiciones:

- el servicio entra completo;
- el profesional trabaja en ese horario;
- no hay otra cita pendiente o confirmada;
- no hay bloqueo;
- el profesional puede realizar ese servicio.

### Datos del cliente

El cliente debe cargar:

- nombre;
- telefono;
- nota opcional.

La nota sirve para preferencias simples, por ejemplo horario, color, largo de corte o comentario general.

Segun configuracion:

- puede entrar como pendiente;
- puede entrar como confirmada automaticamente.

### Que pasa despues de reservar

En la demo, la reserva queda sincronizada con la agenda del negocio.

Si la configuracion esta en confirmacion manual, entra como `Pendiente`.

Si la configuracion tiene auto-confirmacion, entra como `Confirmada`.

El negocio puede confirmar, cancelar o reprogramar desde su panel.

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

En etapa demo, los reportes sirven para mostrar valor aproximado. No deben tomarse como contabilidad real.

## Configuracion

Permite cambiar:

- nombre del negocio;
- tipo de negocio o nicho de ejemplo;
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

En la interfaz aparece como `Ajustes`. Para la prueba privada no hace falta tocar todo: alcanza con entender que el negocio puede adaptar horarios, link y mensajes.

El link del cliente no es unico para todos. Sale del slug configurado en cada negocio.

Ejemplo:

- una fisioterapia podria usar `turnia.app/clinica-movimiento`;
- una barberia podria usar `turnia.app/barberia-norte`;
- una profesora podria usar `turnia.app/clases-laura`.

Si ese negocio pone un boton en su web, el boton apunta a su propio link de Turnia.

Ejemplo de boton en una web de fisioterapia:

```txt
Reservar sesion -> turnia.app/clinica-movimiento
```

## Restaurar demo

El boton `Restaurar demo` borra cambios guardados en el navegador y vuelve a los datos iniciales.

Usarlo solo cuando se quiera limpiar la demo.

Tambien se puede abrir la URL con `?reset-demo=1` para limpiar la demo antes de una presentacion.
