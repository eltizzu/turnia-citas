# Enfoque Multi Nicho De Turnia

Estado: documento vivo. Actualizar cuando se valide o descarte un nicho nuevo.

## Decision de producto

Turnia no debe quedar limitada a peluquerias, barberias o salones de belleza.

Turnia debe posicionarse como una agenda online adaptable para negocios y profesionales que trabajan con reservas por horario.

La base del producto es la misma:

- servicios;
- duracion;
- precio;
- profesional o recurso asignado;
- disponibilidad;
- reserva desde link;
- agenda interna;
- clientes;
- confirmacion;
- reportes simples.

Lo que cambia por nicho es el lenguaje, los ejemplos, los servicios cargados, las reglas y algunos campos secundarios.

## Nichos compatibles

### Belleza y cuidado personal

- peluquerias;
- barberias;
- unas;
- estetica;
- pestanas y cejas;
- depilacion;
- masajes.

### Salud y bienestar no hospitalario

- fisioterapia;
- osteopatia;
- kinesiologia;
- nutricion;
- psicologia;
- coaching;
- terapias alternativas;
- centros wellness.

### Servicios profesionales por cita

- asesores;
- consultores;
- clases particulares;
- estudios pequenos;
- profesionales independientes.

### Mascotas y otros servicios locales

- peluqueria canina;
- veterinaria basica con cita;
- adiestramiento;
- talleres con reserva;
- servicios tecnicos con franjas horarias.

## Que debe ser configurable

Para adaptarse a cada nicho, Turnia debe permitir configurar:

- nombre del negocio;
- tipo de negocio o categoria;
- slug/link propio del negocio;
- nombre de los servicios;
- duracion;
- precio;
- profesional, especialista o recurso;
- horarios;
- anticipacion minima;
- confirmacion manual o automatica;
- texto del link cliente;
- plantillas de WhatsApp;
- campos visibles en la reserva.

## Lenguaje base recomendado

Usar palabras amplias:

- `negocio`;
- `centro`;
- `profesional`;
- `servicio`;
- `reserva`;
- `cita`;
- `turno`;
- `cliente`;
- `agenda`;
- `link de reserva`.

Evitar que el producto base dependa de palabras como:

- salon;
- peluqueria;
- paciente, salvo en vertical salud;
- tratamiento, salvo en vertical salud/belleza;
- mesa, sala o cancha, salvo si se valida ese nicho.

## Regla para la demo actual

La demo puede mostrar un `Centro Demo` con servicios variados para comunicar adaptabilidad.

No debe intentar ser perfecta para todos los nichos al mismo tiempo. Su objetivo es demostrar que Turnia puede configurarse segun el tipo de negocio.

## Verticales iniciales recomendados

Para validar sin dispersarse demasiado:

1. Belleza/cuidado personal: peluqueria, barberia, unas, estetica.
2. Bienestar/salud simple: fisioterapia, masajes, nutricion.
3. Profesionales independientes con agenda: clases, asesorias, consultorias.

No conviene abrir todos los nichos comerciales a la vez. Conviene validar 1 o 2 verticales cercanas y reutilizar la misma base.

## Riesgos de hacerlo demasiado amplio

- Mensaje comercial poco claro.
- Demo que parece generica y no enamora a nadie.
- Campos que no encajan en algunos rubros.
- Soporte mas dificil.
- Necesidad de configuraciones demasiado distintas.

## Como evitarlo

Mantener un producto base amplio, pero vender con ejemplos concretos por nicho.

Ejemplo:

- Para una barberia: Turnia organiza cortes, barba, profesionales y reservas desde Instagram.
- Para fisioterapia: Turnia organiza sesiones, profesionales, disponibilidad y reservas desde un link.
- Para unas: Turnia organiza servicios, duraciones, precios, agenda y recordatorios por WhatsApp.

## Decision actual

Turnia pasa a posicionarse como agenda adaptable para negocios de servicios con turnos.

Belleza sigue siendo un nicho inicial fuerte, pero no el limite del producto.

## Link por negocio

Cada negocio debe tener su propio link publico.

Turnia no usa un unico link igual para todos. El link sale de la configuracion del negocio:

```txt
turnia.app/{slug-del-negocio}
```

Ejemplos:

- `turnia.app/clinica-movimiento`
- `turnia.app/barberia-norte`
- `turnia.app/unas-lucia`
- `turnia.app/clases-laura`

Si un centro de fisioterapia pone un boton en su web, ese boton apunta a su link propio de Turnia. Turnia sabe que es fisioterapia porque ese negocio tiene configurado su tipo de negocio, servicios, profesionales y textos.

En la demo estatica, el modo equivalente para abrir directamente la reserva es:

```txt
demo.html?reserva=1
```

Esto evita mostrar la pantalla interna de demo/login cuando el objetivo es simular el boton publico de una web externa.
