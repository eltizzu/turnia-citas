# Fases Para Pasar De Demo A Producto Real

Estado: documento vivo. Mantener separado de ideas futuras y de tareas tecnicas prematuras.

## Principio de decision

Primero validar valor. Despues profesionalizar tecnologia.

Turnia no deberia invertir fuerte en infraestructura, automatizaciones, pagos o legal completo hasta comprobar que una persona real entiende la app, ve utilidad y quiere probarla.

## Fase 1 - Demo clara

Objetivo: que la app se entienda y se pueda probar con datos ficticios.

Incluye:

- navegacion simple;
- explicacion breve en cada seccion;
- datos ficticios realistas;
- formularios faciles;
- botones claros;
- guia de prueba;
- preguntas de feedback;
- avisos para no cargar datos reales;
- revision mobile;
- exportaciones entendibles.

Estado actual:

- demo funcional;
- vista negocio y vista cliente;
- datos ficticios ampliados;
- explicaciones agregadas por seccion;
- guia de prueba privada creada;
- pendiente: prueba humana real y ajuste posterior.

No incluye:

- usuarios reales;
- base de datos real;
- backups de servidor;
- WhatsApp automatico;
- pagos;
- operacion con clientes reales.

## Fase 2 - Prueba privada

Objetivo: probar con 1 a 3 personas reales de confianza.

Incluye:

- pasarles la demo;
- observar si entienden sin explicacion;
- recoger feedback;
- detectar funciones que sobran;
- detectar funciones que faltan;
- ajustar textos, flujos y pantallas;
- revisar mobile con uso real.

Criterio para avanzar:

- la persona entiende la propuesta;
- puede completar una reserva ficticia;
- entiende la vista negocio;
- identifica al menos un problema real que Turnia le resolveria;
- muestra interes en probar una version mas cercana a su negocio.

## Fase 3 - Piloto controlado

Objetivo: que alguien use Turnia de forma mas constante, todavia con limites.

Incluye:

- login real basico;
- guardado estable de datos;
- hosting estable;
- roles iniciales;
- datos reales muy controlados;
- backups simples;
- registro basico de errores;
- soporte manual;
- configuracion asistida del negocio.

No conviene automatizar demasiado todavia. El aprendizaje del piloto vale mas que construir funciones grandes.

## Fase 4 - Base seria de producto

Objetivo: preparar la app para uso real.

Incluye:

- autenticacion segura;
- recuperacion de contrasena;
- base de datos real;
- permisos por rol;
- validaciones en servidor;
- backups automaticos;
- logs;
- seguridad;
- privacidad;
- terminos legales;
- panel de administracion;
- gestion de negocios/clientes;
- dominio;
- despliegue estable;
- mantenimiento.

Criterio para avanzar:

- al menos un piloto muestra uso real o intencion clara de pago;
- las necesidades principales estan validadas;
- ya se sabe que flujos no sobran.

## Fase 5 - Producto comercial

Objetivo: vender Turnia como solucion real.

Incluye:

- onboarding claro;
- planes/precios;
- soporte;
- documentacion;
- metricas de uso;
- sistema de actualizaciones;
- control de errores;
- legal completo;
- proteccion de datos;
- infraestructura preparada para varios negocios;
- mejoras basadas en clientes.

## Que evitar ahora

- Crear automatizaciones caras antes de validar.
- Montar pagos antes de saber si alguien pagaria.
- Construir multi-sede antes de tener un negocio usando la agenda.
- Optimizar infraestructura antes de tener feedback.
- Agregar secciones que nadie pidio.
- Convertir Turnia en un sistema gigante de gestion.

## Decision actual

Turnia debe quedarse en modo demo clara + prueba privada hasta reunir feedback real.

El siguiente paso correcto es mostrarla a una persona de confianza, registrar lo que entiende y ajustar la demo antes de pasar a piloto.
