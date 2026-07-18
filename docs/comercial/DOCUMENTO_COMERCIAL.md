# Documento Comercial

Estado: documento vivo. Actualizar cuando cambie el posicionamiento, el precio, los modulos, el publico objetivo o la forma de presentar Turnia.

Nota: para enviar o subir como adjunto comercial, usar `DOSSIER_COMERCIAL_TURNIA.md`. Este documento queda como base viva interna de posicionamiento y decisiones comerciales.

## Que es Turnia

Turnia es una app de agenda y reservas para negocios y profesionales que trabajan con citas por horario: barberias, peluquerias, unas, estetica, fisioterapia, masajes, bienestar, consultorias y servicios similares.

El objetivo es que el negocio pueda organizar su agenda diaria, gestionar clientes y permitir que las personas reserven desde un link publico sin depender todo el dia de WhatsApp, llamadas o una libreta.

Estado actual: demo realista para prueba privada. El foco comercial ahora no es prometer producto terminado, sino validar que la propuesta se entiende y que el flujo resuelve un dolor real.

La identidad visual inicial usa un simbolo de agenda con una T integrada y un check de confirmacion. El archivo principal esta en `assets/logo-turnia.svg` y hay una copia visible en la carpeta raiz como `logo-turnia.svg`. Busca transmitir orden, turnos y reserva confirmada sin sentirse corporativo frio.

## Problema que resuelve

Muchos negocios pequenos siguen gestionando turnos de forma manual:

- mensajes dispersos por WhatsApp;
- horarios pisados;
- clientes que preguntan disponibilidad varias veces;
- poca claridad sobre ingresos del mes;
- dificultad para ver huecos libres;
- falta de historial del cliente;
- poca estructura para confirmar, cancelar o reprogramar.

Turnia ordena ese flujo sin convertirlo en un sistema pesado.

## Para quien sirve

Cliente ideal inicial:

- negocios pequenos o medianos que trabajan con reservas;
- profesionales independientes;
- negocios con 1 a 8 profesionales;
- servicios con duracion y precio definidos;
- clientes que ya llegan por Instagram, WhatsApp o recomendacion;
- negocios que quieren agenda online pero no marketplace.

Sectores iniciales:

- peluqueria;
- barberia;
- unas;
- estetica;
- pestanas/cejas;
- masajes;
- fisioterapia;
- bienestar/wellness;
- nutricion, coaching o asesorias por cita.

## Modulos actuales

### Panel del negocio

- agenda diaria;
- vista semanal;
- nueva cita manual;
- confirmacion, cancelacion, finalizacion y no asistencia;
- reprogramacion;
- bloqueos por profesional;
- filtros por profesional;
- mensaje de WhatsApp preparado.

### Link del cliente

- seleccion de servicio;
- seleccion de profesional o cualquiera;
- fecha;
- horarios disponibles;
- datos del cliente;
- reserva pendiente o confirmada segun configuracion.

### Servicios

- nombre;
- categoria;
- duracion;
- precio;
- profesionales que lo realizan;
- visibilidad online.

### Equipo

- profesionales;
- especialidad;
- horario de trabajo;
- servicios asignados.

### Clientes

- ficha del cliente;
- telefono;
- email;
- primer contacto;
- notas;
- historial completo de citas;
- buscador por nombre, telefono o email;
- total de citas;
- ingresos estimados por cliente;
- WhatsApp.

### Reportes

- dashboard de metricas por periodo;
- filtro de esta semana, este mes y ultimos 3 meses;
- total de citas del periodo;
- ingresos estimados;
- ticket medio;
- citas por estado;
- hora y dia con mas demanda;
- servicios destacados;
- ingresos por profesional;
- graficos simples para lectura rapida;
- guardar como PDF desde el navegador.

Nota de alcance: las metricas de Cotiza quedan como modulo futuro hasta definir una tabla real de presupuestos. No se muestran numeros inventados.

### Configuracion

- datos del negocio;
- tipo de negocio o nicho;
- slug/link publico;
- horarios;
- intervalo de turnos;
- anticipacion minima;
- auto-confirmacion;
- plantillas de WhatsApp;
- exportacion Excel/JSON.

## Valor que aporta

Para el negocio:

- menos tiempo contestando disponibilidad;
- menos riesgo de turnos superpuestos;
- agenda mas clara;
- clientes ordenados;
- reportes basicos para entender ingresos;
- link de reserva para Instagram/web;
- WhatsApp sigue siendo parte natural del flujo.

Para el cliente final:

- puede reservar sin esperar respuesta;
- ve horarios reales;
- elige servicio y profesional;
- recibe una experiencia simple y clara.

## Diferencial

Turnia no busca competir como marketplace masivo. La diferenciacion inicial es:

- agenda simple y movil primero;
- sin comisiones por reserva;
- sin marketplace obligatorio;
- setup asistido para primeros clientes;
- WhatsApp integrado al flujo, sin forzar automatizaciones caras al principio;
- pensado para negocios no tecnicos;
- version casi personalizada para los primeros pilotos.

## Como presentarlo a un cliente

Mensaje corto:

> Turnia te da una agenda online simple para que tus clientes reserven desde un link y vos puedas gestionar turnos, servicios, profesionales y clientes desde un panel claro.

Presentacion recomendada:

1. Mostrar el problema: agenda por WhatsApp, idas y vueltas, turnos pisados.
2. Mostrar el panel del negocio.
3. Crear una cita manual.
4. Mostrar el link del cliente.
5. Hacer una reserva desde la vista cliente.
6. Confirmar la cita desde el negocio.
7. Mostrar WhatsApp preparado.
8. Mostrar reportes/exportacion.
9. Explicar setup inicial: cargamos servicios, equipo y reglas del negocio.

Ver tambien `PRESENTACION_TURNIA.md` para un guion completo de demo.

Ver tambien `ENFOQUE_MULTI_NICHO.md` para la decision de producto adaptable por rubro.

## Precio inicial posible

Para pilotos:

- setup inicial pago: carga de servicios, profesionales, horarios y link;
- mensualidad simple;
- sin comisiones por reserva.

Ejemplo a validar:

- Setup: 49-149 EUR segun complejidad.
- Mensualidad: 19-49 EUR segun cantidad de profesionales.

No fijar esto como definitivo hasta hablar con negocios reales.

## Estado actual

Turnia esta en demo presentable local. Ya tiene base tecnica para avanzar a produccion:

- reglas de agenda separadas;
- pruebas automaticas;
- adaptador a modelo de produccion;
- esquema Supabase;
- login preparado para email/Google;
- seed demo;
- documentos legales/comerciales iniciales.

No es produccion real todavia: falta Supabase activo, login real conectado, datos persistentes remotos, dominio, hosting y revision legal/fiscal.
