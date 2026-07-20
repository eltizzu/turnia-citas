# Contexto de Turnia

Este archivo es la memoria del proyecto. **Vive en el repo, no en la memoria de una IA.**
Si algo cambia (deploy, credenciales, decisiones), se actualiza acá.

El plan de trabajo priorizado está en [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## Qué es Turnia

App de agenda y reservas de citas para negocios que trabajan por turno: peluquerías,
barberías, uñas, fisioterapia, estética, bienestar, consultorías.
Enfoque multi-nicho a propósito, sin comisiones por cliente ni marketplace obligatorio.

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

## Estado real (18 de julio de 2026)

- ✅ Web publicada y funcionando
- ✅ Supabase real con tablas, permisos por negocio (RLS), reglas anti-solapamiento y RPCs públicas
- ✅ **Link público de reservas funciona de verdad** — el cliente reserva y queda guardado
- ✅ Demo pública arreglada y verificada en producción
- ❌ **El panel del negocio no guarda** — ver bloqueante abajo
- ❌ Sin dominio propio
- ❌ Legal sin revisión profesional
- ❌ **Ningún negocio real usando la app** (confirmado por Marcos)

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
- **`app/config.js`** es una copia vieja del config, en modo demo, que no usa nadie.
  Si algún día la app se sirviera bajo `/app/`, se cargaría y forzaría modo demo en
  la app real sin ningún error visible. Candidato a borrar.
- **`public-demo-2026-05-21/` y `turnia-demo-publica-2026-05-21.zip`** son una copia
  congelada de mayo. Ya divergieron del código actual y **no tienen los arreglos de
  julio** — incluida la demo rota. Si se le manda ese zip a un prospecto, recibe la
  versión con el bug. Candidatos a borrar.
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
