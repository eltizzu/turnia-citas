# Lista Para Mostrar Turnia

Estado: documento vivo. Usar antes de mostrar la demo a un negocio.

## Veredicto

Turnia v0 esta lista para mostrar como demo funcional y validacion de producto.

No es produccion real todavia. Falta conectar Supabase, login real activo, datos en nube, dominio propio, backups y revision legal/fiscal profesional.

La interfaz ya incluye avisos de demo publica para aclarar que los datos se guardan solo en el navegador.

Para compartir online, usar la carpeta limpia `public-demo-2026-05-21` o el archivo `turnia-demo-publica-2026-05-21.zip`.

## Como abrir limpio

Antes de mostrar, abrir:

```txt
http://127.0.0.1:5280/?reset-demo=1
```

Eso limpia datos locales de pruebas y deja la demo en estado inicial.

Cuando este publicada, abrir la URL final agregando:

```txt
/?reset-demo=1
```

## Recorrido recomendado

1. Pantalla inicial y logo.
2. Entrar como negocio.
3. Mostrar agenda del dia.
4. Crear una cita manual.
5. Mostrar link cliente.
6. Reservar desde la vista cliente.
7. Volver al panel y ver la reserva pendiente.
8. Confirmar cita y mostrar WhatsApp preparado.
9. Reprogramar cita.
10. Bloquear horario.
11. Mostrar clientes.
12. Mostrar reportes.
13. Mostrar exportaciones.
14. Explicar siguiente paso: produccion con Supabase.

## Exportaciones

Para mostrar:

- `Clientes Excel`: descarga `turnia-clientes.xlsx`.
- `Citas Excel`: descarga `turnia-citas.xlsx`.
- `Backup JSON`: respaldo tecnico completo.

Los Excel estan pensados para que el cliente los abra y entienda. El JSON no es para leer como planilla.

## Pendientes pequenos antes de una reunion

- [ ] Probar en tu maquina que `Clientes Excel` abre bien.
- [ ] Probar en tu maquina que `Citas Excel` abre bien.
- [ ] Probar que `Backup JSON` descarga.
- [ ] Mirada visual rapida en mobile si vas a mostrar desde celular.
- [ ] Subir `public-demo-2026-05-21` a Netlify.
- [ ] Alternativa: subir `turnia-demo-publica-2026-05-21.zip`.
- [ ] Probar la URL publicada con `/?reset-demo=1`.
- [ ] Decidir si vas a mencionar precio piloto o solo validar interes.
- [ ] Si se comparte online, incluir el texto de `DEMO_PUBLICA.md` o una aclaracion similar.

## Frase honesta para presentar

> Esta es una demo funcional para validar Turnia con primeros negocios. Ya se puede ver el flujo completo, pero la version de produccion va con login real, base de datos en la nube, dominio y revision legal antes de trabajar con datos reales.

## No prometer todavia

- WhatsApp automatico completo.
- Pagos online.
- App movil nativa.
- Marketplace.
- Cumplimiento legal definitivo sin revision.
- Integraciones externas listas.

## Siguiente paso despues de mostrar

Si el negocio se interesa:

1. Pedir sus servicios reales.
2. Pedir profesionales y horarios.
3. Cargar una version demo personalizada.
4. Validar si pagaria setup + mensualidad.
5. Pasar a produccion piloto con Supabase.
