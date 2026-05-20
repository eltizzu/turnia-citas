# Exportacion De Datos En Turnia

## Objetivo

Turnia debe transmitir confianza: el negocio tiene que sentir que sus datos son suyos y puede llevarselos si lo necesita.

## Exportaciones De La Demo

La demo incluye:

- Clientes Excel.
- Citas Excel.
- Backup JSON completo.

Las exportaciones de clientes y citas se generan como archivos `.xlsx` reales, con columnas anchas, encabezados claros y formato basico para que el negocio pueda abrirlos directamente en Excel.

## Clientes Excel

Incluye:

- Nombre.
- Telefono.
- Nota.
- Cantidad de citas.
- Ingresos estimados.

## Citas Excel

Incluye:

- Cliente.
- Telefono.
- Servicio.
- Profesional.
- Hora.
- Duracion.
- Precio.
- Estado.
- Nota.

## Backup JSON

Incluye el estado completo de la demo:

- Configuracion del negocio.
- Horarios.
- Clientes.
- Citas.
- Servicios.
- Profesionales.
- Bloqueos.
- Plantillas.

El backup JSON no esta pensado para leerse en Excel. Es un archivo tecnico para conservar o migrar datos completos.

## Futuro

Cuando haya backend real, la exportacion deberia permitir:

- Exportar por rango de fechas.
- Exportar clientes.
- Exportar citas.
- Exportar reportes.
- Importar backup o migrar de otro sistema.
