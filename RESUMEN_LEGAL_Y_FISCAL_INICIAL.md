# Resumen Legal Y Fiscal Inicial

Estado: documento vivo. Actualizar cuando cambie el modelo de negocio, el pais objetivo, la forma de cobro, los datos tratados o las integraciones.

Aviso: esto no reemplaza asesoramiento legal/fiscal profesional. Sirve para ordenar decisiones iniciales.

## Contexto

Turnia seria un software de agenda y reservas para negocios. El negocio carga datos de sus clientes, servicios, profesionales y citas. Turnia presta la herramienta tecnica.

## Papel frente a los datos

### Cliente de Turnia: responsable del tratamiento

El salon/barberia/centro decide:

- que datos pide al cliente final;
- para que los usa;
- cuanto tiempo los conserva;
- como responde solicitudes de sus clientes.

Por eso, en principio, el negocio seria el responsable del tratamiento respecto de sus propios clientes.

### Turnia: encargado del tratamiento

Turnia trata datos por cuenta del negocio:

- guarda citas;
- guarda clientes;
- permite exportar;
- permite gestionar mensajes;
- aloja o procesa informacion.

Por eso, Turnia probablemente actua como encargado del tratamiento para los datos de clientes finales.

### Usuario final

Es la persona que reserva una cita. Sus datos pueden incluir:

- nombre;
- telefono;
- nota;
- servicio reservado;
- profesional;
- fecha y hora.

Conviene evitar datos sensibles al principio. Por ejemplo, no pedir informacion medica salvo que sea estrictamente necesario y legalmente revisado.

## Obligaciones basicas

### Para el negocio cliente

- Informar al cliente final sobre el uso de sus datos.
- Tener una base legal para gestionar reservas.
- No pedir mas datos de los necesarios.
- Atender derechos de acceso, rectificacion, supresion, etc.
- Definir conservacion de datos.
- Asegurar que Turnia ofrece garantias suficientes.

### Para Turnia

- Tener politica de privacidad propia.
- Tener terminos del servicio.
- Firmar contrato de encargado con negocios.
- Proteger accesos y datos.
- Separar datos por negocio.
- No usar datos de clientes finales para fines propios sin base legal.
- Tener subencargados identificados si se usan servicios externos.
- Tener medidas tecnicas: HTTPS, control de acceso, backups, logs.

## Fiscal inicial

Si se cobra por Turnia, habra que definir:

- quien factura;
- pais de actividad;
- alta fiscal/autonomo/empresa segun corresponda;
- IVA aplicable;
- numeracion de facturas;
- conservacion de facturas;
- forma de cobro;
- condiciones de cancelacion.

En Espana, la Agencia Tributaria indica que empresarios y profesionales deben expedir factura por entregas de bienes y prestaciones de servicios en su actividad, y conservar copia cuando corresponda.

## Que conviene evitar al principio

- Cobrar comisiones sobre reservas sin tener bien definido el modelo.
- Procesar pagos de clientes finales dentro de Turnia.
- Pedir datos sensibles.
- Automatizar WhatsApp con datos personales sin revisar condiciones.
- Prometer cumplimiento legal completo sin revision profesional.
- Mezclar datos de varios negocios.
- Dar acceso a empleados sin roles claros.
- Usar claves privadas en frontend.

## Checklist legal inicial

- [ ] Definir titular legal de Turnia.
- [ ] Definir si se opera como autonomo, sociedad u otra figura.
- [ ] Definir pais/mercado inicial.
- [ ] Politica de privacidad de Turnia.
- [ ] Terminos del servicio.
- [ ] Contrato de encargado del tratamiento.
- [ ] Politica de cookies si la web usa cookies no tecnicas o analitica.
- [ ] Aviso legal o datos identificativos segun corresponda.
- [ ] Texto informativo en formulario de reserva.
- [ ] Lista de subencargados: hosting, base de datos, email, WhatsApp/API, analitica.
- [ ] Medidas tecnicas documentadas.
- [ ] Proceso de baja/exportacion.
- [ ] Proceso ante incidencia de seguridad.
- [ ] Facturacion y contabilidad definidas.

## Documentos necesarios

Para vender seriamente:

- Politica de privacidad.
- Terminos y condiciones.
- Contrato de encargado del tratamiento.
- Aviso legal.
- Politica de cookies, si aplica.
- Acuerdo comercial/propuesta de servicio.
- Factura o sistema de facturacion.
- Documento de medidas de seguridad basicas.

## Referencias oficiales

- AEPD: responsable y encargado del tratamiento: https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/8-responsable-y-encargado-del-tratamiento/FAQ-0251-como-se-si-soy-responsable-o-encargado
- AEPD: obligaciones como responsable: https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento
- EDPB: responsable y encargado: https://www.edpb.europa.eu/sme-data-protection-guide/faq-frequently-asked-questions/answer/who-data-controller-and-who-data_es
- Agencia Tributaria: obligacion de facturar: https://sede.agenciatributaria.gob.es/Sede/iva/facturacion-registro/facturacion-iva/obligacion-facturar.html
