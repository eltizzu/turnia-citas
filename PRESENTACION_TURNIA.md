# Presentacion Turnia

Estado: documento vivo. Usar como guion para mostrar la demo a un negocio.

## Frase de apertura

Turnia es una agenda online simple para negocios que trabajan por turnos. Permite gestionar citas, servicios, profesionales y clientes desde un panel, y dar a los clientes un link para reservar sin depender todo el dia de WhatsApp.

## Aclaracion honesta

Esta version es una demo funcional para validar el producto con primeros negocios. Todavia no es produccion real con datos en la nube. El siguiente paso tecnico es conectarla a Supabase, login real, hosting y dominio.

## Problema

Muchos salones gestionan turnos con WhatsApp, llamadas o libreta.

Eso genera:

- idas y vueltas para encontrar horario;
- turnos pisados;
- poca claridad sobre disponibilidad;
- clientes sin historial;
- dificil seguimiento de ingresos;
- mucho trabajo manual.

## Solucion

Turnia ordena la agenda y permite que el cliente reserve desde un link.

El negocio mantiene control:

- puede confirmar o cancelar;
- puede reprogramar;
- puede bloquear horarios;
- puede ver reportes;
- puede exportar datos;
- puede seguir usando WhatsApp como canal natural.

## Recorrido de demo

### 1. Pantalla inicial

Mostrar:

- logo;
- propuesta simple;
- entrada negocio;
- boton Google preparado;
- acceso a link cliente.

Decir:

> La idea es que el negocio pueda entrar facil y que el cliente tenga una experiencia separada, como un link en Instagram o en la web.

### 2. Panel negocio

Mostrar:

- agenda diaria;
- citas del dia;
- huecos recomendados;
- bloqueos;
- mensaje WhatsApp.

Decir:

> Aca el negocio ve el dia, confirma pendientes y sabe que horarios estan ocupados o bloqueados.

### 3. Crear cita manual

Mostrar:

- boton Nueva cita;
- cliente;
- servicio;
- profesional;
- fecha/hora;
- estado.

Decir:

> Si alguien escribe por WhatsApp o llama, el negocio puede cargar la cita manualmente.

### 4. Link cliente

Mostrar:

- vista cliente;
- servicio;
- profesional o cualquiera;
- horarios disponibles;
- datos del cliente.

Decir:

> Este es el link que podria ir en Instagram. Solo muestra horarios realmente disponibles.

### 5. Reserva sincronizada

Hacer una reserva desde cliente y volver al panel.

Decir:

> La reserva entra en la agenda del negocio como pendiente o confirmada, segun configuracion.

### 6. Confirmar y WhatsApp

Mostrar:

- boton Confirmar;
- mensaje preparado.

Decir:

> Por ahora no automatizamos WhatsApp completo. Turnia prepara el mensaje y el negocio lo envia. Es suficiente para MVP y evita complejidad/costos iniciales.

### 7. Reprogramar

Mostrar:

- modal reprogramar;
- horarios disponibles;
- mensaje al cliente.

Decir:

> Si cambia el horario, Turnia vuelve a validar disponibilidad.

### 8. Bloquear horario

Mostrar:

- bloqueo por profesional;
- motivo;
- agenda actualizada.

Decir:

> Los bloqueos evitan que el link cliente ofrezca horarios donde el profesional no esta disponible.

### 9. Clientes

Mostrar:

- ficha;
- historial;
- notas;
- WhatsApp.

Decir:

> Turnia tambien funciona como una ficha simple del cliente.

### 10. Reportes y exportacion

Mostrar:

- turnos;
- ingresos estimados;
- ticket medio;
- servicios destacados;
- exportar Excel/JSON.

Decir:

> No reemplaza una contabilidad completa, pero da una lectura rapida del mes y permite exportar informacion.

## Objeciones y respuestas

### "Ya uso WhatsApp"

Respuesta:

> Perfecto. Turnia no reemplaza WhatsApp al principio, lo ordena. El cliente puede reservar desde un link y el negocio sigue enviando mensajes por WhatsApp.

### "No quiero marketplace"

Respuesta:

> Turnia no necesita marketplace. El negocio mantiene su marca y comparte su propio link.

### "Me da miedo que se pisen turnos"

Respuesta:

> La disponibilidad considera servicio, duracion, profesional, citas existentes y bloqueos.

### "No soy tecnico"

Respuesta:

> La idea del piloto es setup asistido: cargamos servicios, profesionales y reglas iniciales.

### "Y los datos?"

Respuesta:

> En produccion cada negocio tendra su propio acceso y sus datos separados. La demo actual guarda localmente; la version real va con base de datos, login y reglas de seguridad.

## Precio piloto sugerido

Propuesta a validar:

- setup inicial: 49 a 149 EUR;
- mensualidad: 19 a 49 EUR;
- sin comision por reserva.

Adaptar segun cantidad de profesionales y nivel de setup.

## Cierre recomendado

> Lo que buscamos ahora es validar si esto realmente te ahorra tiempo y te ordena la agenda. Para los primeros clientes, la idea es configurar Turnia casi a medida y ajustar con feedback real.

## Checklist antes de presentar

- [ ] Abrir `http://127.0.0.1:5280/?reset-demo=1`.
- [ ] Entrar como negocio.
- [ ] Ver agenda.
- [ ] Crear cita.
- [ ] Ir a vista cliente.
- [ ] Reservar turno.
- [ ] Confirmar desde negocio.
- [ ] Mostrar WhatsApp.
- [ ] Mostrar clientes.
- [ ] Mostrar reportes.
- [ ] Mostrar configuracion/exportacion.
- [ ] Aclarar que es demo funcional, no produccion final.
