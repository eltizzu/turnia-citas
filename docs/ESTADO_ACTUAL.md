# Estado actual de Turnia

**Fecha de corte:** 6 de noviembre de 2026  
**Estado documental:** fuente canónica del estado real del producto y del negocio.  
**Evidencia de esta revisión:** repositorio local, documentación vigente y ejecución local de `node --test tests/*.test.mjs` (69 correctas, 0 fallidas: 65 existentes y 4 de identidad). No se consultó producción ni ningún servicio externo durante esta actualización.

Este documento responde **qué existe hoy**. El orden futuro del trabajo vive en [`ROADMAP.md`](ROADMAP.md), y el contexto técnico/operativo vive en [`../CLAUDE.md`](../CLAUDE.md). Los documentos de `docs/historico/` no son fuentes vigentes.

## 1. Problema que resuelve

Turnia busca ordenar la gestión de citas de pequeños negocios de servicios que hoy coordinan disponibilidad, confirmaciones y cambios entre WhatsApp, llamadas, Instagram y agendas manuales. Centraliza la agenda y ofrece un enlace de reserva sin imponer un marketplace ni cobrar comisiones por reserva.

## 2. Público inicial

El primer piloto aprobado se limita a **peluquerías, barberías y negocios de belleza**. Quedan fuera del piloto fisioterapia, salud y notas sanitarias. El usuario comprador inicial es una dueña o administradora de un negocio pequeño, normalmente con uno a ocho profesionales.

Roles aprobados:

- Administrador/dueña: configuración, horarios, servicios, precios, profesionales, exportación y reglas.
- Personal: solo citas y tareas permitidas. Pertenecer a un negocio no concede administración automáticamente.

## 3. Etapa actual

| Etapa | Estado real |
|---|---|
| Concepto | Validado técnicamente como propuesta construida; no validado comercialmente con usuarios reales. |
| Demo | Sí. Existe una demo pública con datos ficticios y persistencia local. |
| Prueba privada | No hay evidencia de una prueba estructurada completada con un negocio real. |
| Piloto | No iniciado. |
| Producto comercial | No. No debe venderse ni entregarse para operación real todavía. |

## 4. Funciones realmente implementadas

- Demo navegable con agenda diaria y semanal, clientes, servicios, equipo, bloqueos, reportes, configuración y exportaciones.
- Reglas locales de disponibilidad, duración, citas solapadas y bloqueos.
- Estados visibles de cita y acciones de demo: crear, confirmar, cancelar, finalizar, no-asistencia y reprogramar.
- Preparación de mensajes y apertura de WhatsApp; Turnia no puede comprobar que el mensaje se envió.
- Rutas diferenciadas: `/demo`, `/panel` y `/reservar`.
- Lectura del panel desde Supabase cuando existe sesión y negocio asociado.
- RPC públicas en el esquema y frontend para consultar la página de reserva, obtener disponibilidad y crear una reserva.
- Controles locales para migraciones y rechazo del project ref conocido de producción.

## 5. Funciones que solo funcionan localmente o en demo

- En `/demo`, las altas y cambios de citas, clientes, servicios, profesionales, bloqueos y configuración se guardan en `localStorage` del navegador.
- Login de demo y datos ficticios.
- Acciones del panel que parecen guardar pero no tienen todavía persistencia completa en Supabase.
- Reportes y exportaciones se alimentan del estado disponible en el frontend; no constituyen contabilidad ni facturación.

## 6. Funciones conectadas a servicios reales

Según la última verificación documentada, no repetida en esta revisión:

- El frontend está publicado en Vercel.
- Producción tiene un proyecto Supabase separado con tablas, RLS y RPC.
- `/reservar` consulta datos y crea reservas reales mediante RPC.
- `/panel` puede leer datos reales de Supabase.

No se verificó hoy el login real de producción, el estado de los gráficos publicados ni el flujo remoto completo desde un navegador externo.

## 7. Persistencia utilizada

- Demo: `localStorage`, aislado por navegador.
- Reserva pública publicada: PostgreSQL de Supabase mediante RPC, según la última evidencia disponible.
- Panel publicado: lectura desde Supabase; las escrituras generales siguen incompletas.
- Archivos y decisiones técnicas: repositorio Git local/GitHub. Un push a `main` publica automáticamente en Vercel.

## 8. Partes simuladas o incompletas

- Login y usuarios de la demo.
- Negocio, profesionales, clientes y actividad de la demo.
- Envío de WhatsApp: solo se prepara o abre; no se envía ni se confirma automáticamente.
- Persistencia de las acciones del panel: salvo las integraciones explícitas, los cambios pueden perderse al recargar.
- Confirmación automática, enlace privado de seguimiento, propuestas con caducidad, cancelación del cliente y tiempo real todavía son diseño aprobado, no funciones terminadas.

## 9. Publicación

- URL documentada: `https://turnia-citas.vercel.app`.
- Rutas documentadas: `/demo`, `/panel` y `/reservar`.
- Última verificación de la demo en producción registrada: 18 de julio de 2026.
- Última modificación documentada de librerías publicadas: 21 de julio de 2026.
- No existe dominio propio confirmado. `demo.turnia.app` no existe y no debe utilizarse.

## 10. Usuarios, clientes e ingresos reales

- Negocios reales usando Turnia: ninguno confirmado.
- Pilotos activos: ninguno confirmado.
- Clientes pagos: ninguno confirmado.
- Ingresos reales de Turnia: ninguno confirmado.
- La base de producción y la publicación técnica no demuestran adopción comercial.

## 11. Último resultado de pruebas

El 6 de noviembre de 2026 se ejecutó localmente:

```bash
node --test tests/*.test.mjs
```

Resultado: **69 pruebas correctas, 0 fallidas, 0 omitidas**: las 65 pruebas existentes y 4 comprobaciones nuevas de identidad.

Estas pruebas cubren lógica JavaScript y contratos estáticos del esquema/configuración. No prueban RLS con JWT reales, concurrencia PostgreSQL, rollback remoto, servicios desplegados, experiencia móvil real ni uso por negocios reales.

## 12. Limitaciones y bloqueantes

- El panel no persiste todavía todas sus acciones en Supabase.
- Las políticas documentadas del esquema comprueban pertenencia, pero la separación efectiva entre administrador y personal requiere migración y prueba real.
- No hay un Supabase de desarrollo documentado como creado y verificado. Su creación fue autorizada, pero no consta como completada.
- `schema.sql` no demuestra el estado real de producción.
- No hay pruebas PostgreSQL/RLS reales con dos negocios y roles.
- Login real de producción sin verificación reciente.
- Legal, privacidad, encargado del tratamiento, retención de 12 meses y textos comerciales requieren revisión profesional antes de comercializar.
- Las fuentes de Google todavía pueden transferir la IP del visitante a un tercero.
- No hay dominio propio, backups verificados ni proceso de soporte de piloto.

## 13. Próxima etapa aprobada

La siguiente etapa funcional es **Etapa 1b: escrituras reales y seguras de citas en el panel**, empezando por:

- aceptar, rechazar, finalizar y marcar no-asistencia;
- crear y reprogramar citas internas;
- usar UUID reales;
- registrar eventos atómicos;
- revertir visualmente y mostrar mensajes comprensibles ante errores.

Antes de tocar producción debe existir un entorno Supabase de desarrollo aislado y pruebas reales de RLS, restricciones, concurrencia y rollback. La creación del entorno fue autorizada, pero cualquier coste, plan, tarjeta, pausa o eliminación requiere intervención explícita.

## 14. Estado de la identidad

- Logo anterior: retirado de las rutas activas y respaldado en `assets/legacy/identity-before-encuentro-2026-11-05/`.
- Identidad aprobada: **“Turnia — A Encuentro”**.
- Integración: completada localmente el 6 de noviembre de 2026 en acceso, panel, reserva pública, landing, navegación, móvil, manual, favicon y manifest.
- Publicación: no realizada.

La geometría aprobada mantiene el hueco central transparente, los colores `#11605F`, `#F28865` y `#2D4049`, y los seis contornos originales de “Turnia”. La versión para fondos oscuros incorpora la pieza clara detrás del hueco.

## 15. Afirmaciones comerciales seguras

- “Turnia es una agenda y sistema de reservas en desarrollo para peluquerías, barberías y belleza.”
- “Existe una demo pública con datos ficticios.”
- “El enlace público implementado puede consultar disponibilidad y registrar reservas en la base conectada.”
- “El panel ya puede leer datos reales, pero sus escrituras todavía están en desarrollo.”
- “Turnia prepara y abre mensajes de WhatsApp para que la dueña los revise y envíe.”
- “No hay comisiones por reserva previstas para el primer modelo.”
- “El primer piloto será controlado y con confirmación manual.”

## 16. Afirmaciones que no deben hacerse todavía

- “Turnia está listo para operar un negocio real” o “es un producto comercial terminado”.
- “El panel guarda todos los cambios” o “sincroniza todo entre dispositivos”.
- “WhatsApp se envía automáticamente”, “el mensaje fue enviado” o “hay recordatorios automáticos”.
- “Está validado por peluquerías/clientes reales”.
- “Cumple completamente RGPD” o “la seguridad está certificada”.
- “Los roles administrador/personal están verificados en producción”.
- “No puede haber reservas simultáneas” como garantía del producto desplegado sin la prueba remota correspondiente.
- “La nueva identidad está publicada”, hasta que exista una publicación autorizada y verificada.
- “Hay dominio propio, backups verificados, ingresos o clientes reales”.

## Regla permanente de mantenimiento

Al cerrar una etapa que cambie funciones, persistencia, publicación, identidad, validación o estado comercial se deben actualizar, en la misma entrega:

1. este documento, con fecha y evidencia;
2. `docs/ROADMAP.md`;
3. `CLAUDE.md` si cambia contexto técnico u operativo;
4. el manual o material comercial afectado.

No se convierte un plan en una función implementada y no se llama “validación” a una suite técnica sin usuarios reales.
