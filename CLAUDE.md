# Contexto de Turnia

Este archivo es la memoria del proyecto. **Vive en el repo, no en la memoria de una IA.**
Si algo cambia (deploy, credenciales, decisiones), se actualiza acá.

El estado real consolidado está en [`docs/ESTADO_ACTUAL.md`](docs/ESTADO_ACTUAL.md).
El plan de trabajo priorizado está en [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Al terminar algo relevante, actualizar las fuentes canónicas

1. **`docs/ESTADO_ACTUAL.md`** — qué existe realmente, fecha y evidencia.
2. **`docs/ROADMAP.md`** — qué se cerró y qué queda, en orden.
3. **Este archivo** — si cambió el contexto técnico (rutas, entornos, trampas).
4. **Manual o material comercial afectado** — sin presentar planes como funciones.

Las memorias externas pueden resumir esta información, pero no reemplazan las
fuentes versionadas del repositorio.

---

## Qué es Turnia

App de agenda y reservas de citas. El primer piloto aprobado se limita a peluquerías,
barberías y belleza. Fisioterapia, salud y notas sanitarias quedan fuera de esta etapa.
La arquitectura puede evolucionar a otros nichos, pero no deben presentarse como
verticales actuales.

Es la segunda app de Marcos, después de StockFlow.

**Tecnología:** HTML, CSS y JavaScript puro (sin framework ni build), Supabase como
base de datos y login, PWA. Servidor de desarrollo propio en `dev-server.mjs`.

---

## Dónde vive y cómo se publica

| Qué | Dónde |
|---|---|
| Carpeta local | `C:\Users\titus\Desktop\Turnia - Citas` |
| Repositorio | GitHub `eltizzu/turnia-citas`, rama `main` |
| Hosting | **Vercel** → `https://turnia-citas.vercel.app` |
| Base de datos | Supabase, project ref `zahossmailzxwpmtfksc` |
| Marca comercial | Impuls Digital — `hola@impulsdigital.es` |
| Planes | Solo / Equipo / Salón |

### ⚠️ Regla de deploy

**Vercel publica automáticamente todo lo que llegue a `main`, e `impulsdigital.es`
linkea directo a `turnia-citas.vercel.app`.**

Es decir: **hacer push = cambiar la web en vivo**, sin paso intermedio.

**Regla acordada con Marcos: nunca hacer push sin su permiso explícito.**
Se trabaja en local, se verifica, se le muestra, y recién ahí se sube.

### Correr en local

```bash
node dev-server.mjs      # http://127.0.0.1:5180
node --test tests/*.test.mjs
```

`dev-server.mjs` replica los rewrites de `vercel.json`, así que probar en local
refleja lo que va a pasar publicado.

---

## Las dos direcciones (importante)

Desde el 18/07/2026 el modo **se decide por la dirección**, no por `config.js`:

| Dirección | Para quién | Datos | Login |
|---|---|---|---|
| `/demo` | Prospectos que curiosean (lo que linkea Impuls) | Ficticios, en el navegador de cada visitante | No, entra directo a la agenda |
| `/panel` | El negocio, gestionando su agenda | Base de datos real | Sí, obligatorio |
| `/reservar` | **El cliente final del negocio** | Base de datos real | No |

**Por qué importa:** es lo que permite que el panel guarde de verdad sin que un
prospecto curioso escriba en la base real. No volver a atar el modo a `config.js`.

`/reservar` es el link que el negocio comparte con sus clientes. Lo genera
`getBusinessLink()` en `app.js`, que usa `location.origin` en vez de un dominio
fijo — así sigue andando el día que haya dominio propio, sin tocar código.

⚠️ **Al agregar una ruta nueva hay que tocar tres lugares**: la lista
`RUTAS_REALES` en `demo.html`, los `rewrites` de `vercel.json` y los de
`dev-server.mjs`. Si falta alguno, la ruta da 404 o corre en el modo equivocado.

---

## Estado real

La fuente canónica y fechada es `docs/ESTADO_ACTUAL.md`. Este resumen conserva
el contexto técnico principal.

- ✅ Identidad “Turnia — A Encuentro” aprobada e integrada localmente el 6/11/2026.
- ⚠️ La identidad nueva todavía no fue publicada.

- ✅ Web publicada y funcionando
- ✅ Supabase real documentado con tablas, RLS, reglas anti-solapamiento y RPCs públicas; su estado no fue reinspeccionado en esta revisión
- ✅ **Link público de reservas funciona de verdad** — el cliente reserva y queda guardado
- ✅ Demo pública arreglada y verificada en producción
- ❌ **El panel del negocio no guarda** — ver bloqueante abajo
- ❌ Sin dominio propio
- ❌ Legal sin revisión profesional
- ❌ **Ningún negocio real usando la app** (confirmado por Marcos)

### Etapa 0 local — base de cambios segura (4 de noviembre de 2026)

- Se agregaron controles locales y documentacion para introducir migraciones sin
  asumir que `supabase/schema.sql` coincide con lo desplegado.
- `supabase/migrations/` y `supabase/baselines/` existen, pero no contienen SQL:
  todavia no se creo, aplico ni marco ninguna migracion.
- `scripts/check-db-target.mjs` rechaza entornos distintos de desarrollo/test, el
  project ref conocido de produccion y el uso de service role en este flujo.
- No se conecto Supabase ni se creo un entorno externo durante la Etapa 0 local.
  La creación del entorno de desarrollo fue autorizada después, pero no consta
  como completada; RLS, RPC y concurrencia siguen sin prueba remota documentada.
- Estrategia: `docs/tecnico/ESTRATEGIA_MIGRACIONES.md`.
- Alcance y matriz de verificacion: `docs/tecnico/ETAPA_0_BASE_SEGURA.md`.
- Los cambios locales previos en `supabaseDataApi.js` y su prueba se preservaron;
  no forman parte de la Etapa 0.

### 🔴 Bloqueante crítico: el panel no escribe

El panel **lee** de Supabase (`supabaseDataApi.js`, solo `loadBusinessState`) pero
**no escribe nada**. En `dataProviders.js`, el modo supabase tiene un `save()` que
guarda el resultado en una variable global y lo descarta. **Cero `.insert` /
`.update` / `.delete` en todo el frontend.**

Consecuencia: en `/panel`, todo lo que haga el negocio (confirmar, cancelar, crear
cita, alta de cliente) se pierde al recargar. No falla visiblemente — *parece* que
funciona, que es lo peor.

Las reservas del link público **sí** se guardan: van por la RPC
`create_public_appointment`, que está bien hecha.

Resolverlo es la Etapa 1b en adelante del roadmap.

---

## Trampas conocidas

- **`demo.turnia.app` no existe.** Varios documentos viejos lo mencionan; ese dominio
  nunca se compró y no resuelve. La dirección real es `turnia-citas.vercel.app`.
- **`netlify.toml` no se usa.** Es resto de una evaluación inicial. El hosting es Vercel.
- **Las librerías se sirven desde `vendor/`, no desde CDN ajenos.** Ver
  `vendor/README.md` para actualizarlas. Al hacerlo hay que subir el `CACHE_NAME`
  de `sw.js`, si no los navegadores siguen usando la versión vieja.
- **Las tipografías todavía se piden a Google Fonts**, así que cada visitante le
  manda su IP. Se puede auto-alojar igual que las librerías.
- **`cleanUrls` en Vercel** elimina el `.html` de las direcciones. Los rewrites tienen
  que apuntar a `/demo`, no a `/demo.html`, o dan 404.
- **`docs/historico/`** contiene documentos de etapas cerradas con información
  desactualizada. No usarlos como referencia de estado.
- **La demo tiene datos incoherentes**: el negocio dice ser "Fisioterapia y bienestar"
  pero ofrece "Barba + perfilado" y "Color + corte".

---

## Cómo le gusta trabajar a Marcos

Marcos **no es programador**. Cinco reglas, en orden de importancia:

1. **Explicar en simple.** Qué va a ver y qué va a hacer, no jerga técnica.
2. **Diseñar antes de construir.** Nada grande sin diseñarlo con él y pedir aprobación.
3. **Ir por etapas con puntos de freno**, para controlar tiempo y gasto.
4. **Verificar de verdad antes de decir que está listo.** Probarlo, no suponerlo.
5. **Mantener un roadmap único priorizado** y guardar lo importante — acá, en el repo.
