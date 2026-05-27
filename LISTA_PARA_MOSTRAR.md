# Lista Para Mostrar Turnia

Estado: documento vivo. Usar antes de mostrar la demo a un negocio.

## Veredicto

Turnia v0 esta lista para mostrar como demo funcional en prueba privada y validacion de producto.

No es produccion real todavia. Falta conectar Supabase, login real activo, datos en nube, dominio propio, backups y revision legal/fiscal profesional.

La interfaz ya incluye avisos de demo para aclarar que los datos son ficticios y se guardan solo en el navegador.

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
3. Pedirle a la persona que lea la Agenda sin explicar demasiado.
4. Confirmar una cita pendiente y revisar el WhatsApp preparado.
5. Crear una cita manual.
6. Abrir la vista cliente.
7. Reservar desde la vista cliente con datos ficticios.
8. Volver al panel y ver la reserva pendiente.
9. Revisar Clientes, Servicios y Equipo.
10. Mostrar Reportes solo como valor aproximado.
11. Mostrar exportaciones si la persona pregunta por datos.
12. Hacer las preguntas de `GUIA_PRUEBA_PRIVADA.md`.

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
- [ ] Usar `GUIA_PRUEBA_PRIVADA.md` para anotar observaciones.

## Frase honesta para presentar

> Esta es una demo funcional para validar si Turnia se entiende y si resolveria un problema real. Los datos son ficticios; la version para uso real va con login, base de datos en la nube, dominio, backups y revision legal antes de trabajar con clientes reales.

## No prometer todavia

- WhatsApp automatico completo.
- Pagos online.
- App movil nativa.
- Marketplace.
- Cumplimiento legal definitivo sin revision.
- Integraciones externas listas.

## Siguiente paso despues de mostrar

Si la persona entiende la demo y ve valor:

1. Registrar feedback.
2. Ajustar textos o pantallas confusas.
3. Repetir con otra persona de confianza.
4. Decidir si vale preparar piloto controlado.
5. Recien ahi avanzar con Supabase/login/datos reales.
