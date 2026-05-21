# Demo Publica De Turnia

Estado: documento vivo. Actualizar cuando cambie la forma de publicar, probar o compartir Turnia.

## Objetivo

La demo publica sirve para que personas externas puedan probar Turnia sin crear cuenta real y sin cargar datos reales.

Es una herramienta para mostrar el concepto, recibir feedback y validar interes antes de montar produccion con base de datos en la nube.

## Que permite probar

- Entrar como negocio demo.
- Ver agenda diaria.
- Crear citas.
- Confirmar, cancelar, finalizar y marcar no asistencia.
- Reprogramar citas.
- Bloquear horarios.
- Cargar servicios.
- Cargar profesionales.
- Ver clientes.
- Probar el link cliente.
- Crear una reserva desde la vista cliente.
- Ver reportes.
- Exportar clientes/citas en Excel.
- Descargar backup JSON tecnico.
- Probar una version instalable basica en moviles compatibles.

## Que NO es

La demo publica no es produccion.

No tiene todavia:

- cuentas reales por negocio;
- datos guardados en la nube;
- separacion real multi-negocio;
- dominio final;
- backups de servidor;
- revision legal/fiscal final;
- WhatsApp automatico real;
- pagos online.

## Aviso para usuarios de la demo

Mensaje recomendado:

> Esta es una demo funcional de Turnia. Los datos se guardan solo en este navegador y pueden borrarse al restaurar la demo. No cargues informacion real de clientes.

## Como abrir la demo limpia

Usar:

```txt
/?reset-demo=1
```

Ejemplo local:

```txt
http://127.0.0.1:5280/?reset-demo=1
```

Cuando este publicada, seria algo como:

```txt
https://demo.turnia.app/?reset-demo=1
```

## Recomendacion para publicar

Publicar primero como demo controlada en:

- Netlify;
- Vercel;
- GitHub Pages.

Requisitos:

- que sea estatica;
- que cargue rapido;
- que tenga HTTPS;
- que muestre aviso de demo;
- que no se indexe como producto final;
- que no prometa produccion real;
- que permita restaurar datos.
- que se suba desde la carpeta publica `public-demo-2026-05-21` para no exponer documentos internos.

## Texto corto para compartir

> Estoy armando Turnia, una agenda online simple para negocios que trabajan por turnos. Esta demo permite probar el panel del negocio y el link de reserva del cliente. Es una version de validacion: los datos quedan solo en tu navegador.

## Feedback que conviene pedir

Preguntar a quien la pruebe:

1. Se entiende para que sirve?
2. Usarias un link asi con tus clientes?
3. Que parte te ahorraria mas tiempo?
4. Que te faltaria para usarlo en tu negocio?
5. Pagarias setup + mensualidad si estuviera configurado para vos?
6. Que pantalla te resulto confusa?

## Siguiente paso despues de la demo publica

Si hay interes real:

1. Crear Supabase.
2. Conectar login real.
3. Guardar datos por negocio.
4. Crear link publico real por slug.
5. Validar disponibilidad desde servidor.
6. Publicar piloto privado.
7. Configurar primer cliente real.
