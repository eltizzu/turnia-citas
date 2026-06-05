# Checklist Final Del Producto

Estado: documento vivo. Actualizar antes de cada presentacion, piloto o entrega.

## Estado general

- [x] Nombre Turnia visible.
- [x] Logo inicial creado.
- [x] Favicon inicial creado.
- [x] Acciones de cita separadas para evitar tarjetas apretadas.
- [x] Aviso de demo publica agregado.
- [x] Ya no aparece BrasaFlow.
- [x] Demo con datos coherentes.
- [x] Demo ampliada con datos ficticios mas realistas.
- [x] Explicaciones breves agregadas por seccion.
- [x] Posicionamiento ampliado a negocios de servicios por turno.
- [x] Demo renombrada a `Centro Demo` para no limitar Turnia a salones.
- [x] Ajustes incluye ejemplo de tipo de negocio y link propio por negocio.
- [x] Vista negocio funcional.
- [x] Vista cliente funcional.
- [x] Reglas de disponibilidad separadas.
- [x] Pruebas automaticas principales.
- [x] QA tecnico de cierre ejecutado.
- [x] Revisar logo en mobile y navegador real.
- [ ] QA manual final completo antes de presentar.
- [ ] Pulido visual final mobile con ojo humano.
- [ ] Textos finales revisados.
- [x] Guia de prueba privada creada.
- [x] Fases de producto real documentadas.

## Pantalla de inicio

- [x] Explica que es Turnia.
- [x] Permite entrar como negocio.
- [x] Permite ver link cliente.
- [x] Incluye boton Google demo.
- [x] Maneja usuario sin negocio asignado.
- [ ] Revisar copy final para venta.
- [x] Pantalla inicial enfocada en prueba privada y no en uso real.

## Panel negocio

- [x] Agenda diaria.
- [x] Vista semanal.
- [x] Clientes.
- [x] Servicios.
- [x] Equipo.
- [x] Reportes.
- [x] Link cliente.
- [x] Configuracion.
- [ ] Revisar que todas las acciones tengan feedback claro.
- [ ] Revisar que no haya textos demasiado tecnicos.
- [x] Secciones principales explican que se hace y que conviene probar.
- [x] Login, agenda y panel probados en navegador.

## Agenda

- [x] Crear cita.
- [x] Confirmar cita.
- [x] Cancelar cita.
- [x] Reprogramar.
- [x] Finalizar.
- [x] Marcar no asistio.
- [x] Filtrar por profesional.
- [x] Cambiar fecha.
- [x] Bloquear horario.
- [x] Evitar turnos superpuestos.
- [ ] Probar flujo completo en mobile.
- [x] Crear cita manual probado.
- [x] Confirmar cita probado.
- [x] Reprogramar cita probado.
- [x] Bloqueo de horario probado.

## Link cliente

- [x] Elegir servicio.
- [x] Elegir profesional o cualquiera.
- [x] Elegir fecha.
- [x] Ver horarios disponibles.
- [x] Cargar datos.
- [x] Crear reserva.
- [x] Sincronizar con agenda demo.
- [ ] Revisar mensaje final despues de reservar.
- [ ] Preparar version real por slug.
- [x] Reserva desde link cliente probada.
- [x] Sincronizacion con agenda probada.

## Servicios

- [x] Crear.
- [x] Editar.
- [x] Eliminar con proteccion.
- [x] Definir duracion.
- [x] Definir precio.
- [x] Asignar profesionales.
- [x] Ocultar del link publico.

## Equipo

- [x] Crear profesional.
- [x] Editar profesional.
- [x] Eliminar con proteccion.
- [x] Definir horarios.
- [x] Asignar servicios.

## Clientes

- [x] Crear cliente.
- [x] Editar cliente.
- [x] Ver historial.
- [x] Ver notas.
- [x] Abrir WhatsApp.
- [x] Evitar eliminar cliente con historial.

## Reportes y exportacion

- [x] Ver metricas basicas.
- [x] Ingresos estimados.
- [x] Ticket medio.
- [x] Servicios destacados.
- [x] Ingresos por profesional.
- [x] Exportar clientes Excel.
- [x] Exportar citas Excel.
- [x] Exportar backup JSON.
- [x] Guardar PDF desde navegador.
- [ ] Revisar formato PDF final.
- [x] Botones de exportacion Excel/JSON probados sin errores.
- [x] Exportacion de clientes/citas cambiada a Excel real `.xlsx`.
- [ ] Confirmar descarga real Excel/JSON en navegador del usuario antes de presentar.

## Mobile

- [x] Navegacion inferior.
- [x] Layout responsive base.
- [x] Acciones moviles simplificadas para reducir ruido.
- [x] Boton `Inicio` oculto en la barra superior mobile.
- [x] Acciones secundarias de citas ocultas en mobile.
- [x] Acciones rapidas ocultas en mobile.
- [x] Manifest PWA basico agregado.
- [x] Metadatos mobile agregados.
- [ ] QA visual en ancho movil.
- [ ] Revisar botones largos.
- [ ] Revisar modales en pantalla chica.
- [ ] Revisar tablas/listas en reportes.
- [x] Login, panel y modal de cita probados en 390 x 844.

## Produccion tecnica

- [x] Plan produccion MVP.
- [x] Modelo de datos.
- [x] Supabase schema inicial.
- [x] Seed demo.
- [x] Auth provider preparado.
- [x] Supabase client preparado.
- [x] Data providers preparados.
- [x] Provider Supabase aclarado como preview, no persistencia real.
- [x] Renderizados principales escapados para evitar HTML inyectado desde datos editables.
- [x] Listener de fecha corregido para no duplicarse al cambiar de pantalla.
- [x] Restricciones SQL iniciales para evitar citas y bloqueos superpuestos.
- [x] RPCs publicas de lectura limitada para negocio, servicios, profesionales y horarios.
- [x] RPC inicial `create_public_appointment(...)` para reserva publica validada en servidor.
- [x] Capa frontend `publicBookingApi.js` preparada para consumir RPCs del link publico.
- [x] Capa frontend `supabaseDataApi.js` preparada para cargar panel de gestion desde Supabase.
- [x] `config.js` corregido para exponer `window.TURNIA_CONFIG`.
- [x] Vista cliente preparada para pedir horarios y crear reservas por RPC cuando Supabase esta activo.
- [x] Smoke test SQL preparado para validar schema, seed, link publico y conflicto de horario.
- [x] Handoff Supabase preparado para guiar la creacion del proyecto real.
- [x] Crear proyecto Supabase real.
- [x] Ejecutar schema.
- [x] Ejecutar seed demo.
- [x] Ejecutar smoke test en Supabase.
- [ ] Configurar Auth.
- [ ] Activar Google.
- [ ] Conectar datos reales.
- [ ] Publicar staging.
- [ ] Dominio y HTTPS.
- [ ] Backups.

## Legal y fiscal

- [x] Checklist legal inicial.
- [x] Plantillas iniciales.
- [x] Resumen legal/fiscal inicial.
- [x] Documento web legal.
- [ ] Revision profesional antes de vender.
- [ ] Definir titular legal/marca principal.
- [ ] Definir facturacion real.
- [ ] Definir contrato de encargado.

## Antes de mostrar a un negocio

- [x] Restaurar demo.
- [x] Probar login.
- [x] Crear una cita manual.
- [x] Reservar desde vista cliente.
- [x] Confirmar reserva.
- [x] Reprogramar reserva.
- [x] Bloquear horario.
- [ ] Confirmar descarga real de exportaciones.
- [x] Mostrar reportes.
- [x] Tener discurso comercial preparado.
- [x] Aclarar que es demo/piloto, no produccion final.
- [x] Manual de uso actualizado con servicios, profesionales y vista cliente.
- [x] Dossier comercial adjuntable creado.
- [x] Documento de demo publica creado.
- [x] Configuracion estatica para Netlify/Vercel agregada.
- [x] Paquete publico `public-demo-2026-05-21` creado para subir sin documentos internos.
- [ ] Publicar demo en Netlify.
- [ ] Probar URL publicada con `/?reset-demo=1`.
- [ ] Hacer prueba privada con 1 persona de confianza.
- [ ] Registrar feedback en `GUIA_PRUEBA_PRIVADA.md` o documento de resultados.
