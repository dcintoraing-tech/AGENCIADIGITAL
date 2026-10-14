# ARQO — De la idea a la obra

Sitio completo de una agencia digital ficticia, creada desde cero para portafolio:
marca, contenido, diseño y código. No es una plantilla ni una landing: son once
rutas con casos de estudio, un tablero de datos manipulable, un cotizador y un
formulario con validación de ida y vuelta.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

Requiere Node 18.18 o superior.

---

## La agencia

**ARQO** es un estudio de ingeniería de producto digital con catorce personas entre
Guadalajara y Madrid. No vende "páginas web": vende la conversión de operaciones
complejas en productos simples.

- **Eslogan:** De la idea a la obra.
- **Concepto:** *Un arco no se sostiene por su forma. Se sostiene por cómo reparte
  el peso.* Los sistemas que construye ARQO funcionan igual: cada pieza carga lo
  que le toca y el conjunto aguanta cuando el negocio crece.
- **Titular del sitio:** Construimos lo que tu negocio todavía no tiene.

El contenido es ficticio pero verosímil: seis casos de estudio con problema,
solución, proceso, resultado y cifras; seis testimonios atribuidos; seis
artículos; métricas de estudio. Ningún texto de relleno.

---

## Identidad

### Isotipo

Un arco de medio punto apoyado en su línea de cota. Arquitectónico, sin cerebros,
circuitos ni degradados. El trazo mide 7 unidades sobre un lienzo de 40, elegido
para igualar el astil de Archivo 700: la marca y el logotipo tienen el mismo color
tipográfico cuando van juntos.

En el lockup la cota del arco se prolonga como línea base del logotipo, y la cola
de la Q la cruza. Marca y texto se apoyan en una sola horizontal.

Archivos en `public/brand/`, generados desde las curvas reales de la tipografía:

| Archivo | Uso |
| --- | --- |
| `arqo-isotipo.svg` | Isotipo en `currentColor` |
| `arqo-isotipo-para-fondo-oscuro.svg` · `-claro.svg` | Versiones de color fijo |
| `arqo-logotipo.svg` | Logotipo suelto, con la cola de la Q en caja |
| `arqo-lockup.svg` | Lockup con cota |
| `arqo-lockup-sin-cota.svg` | Lockup para barras estrechas |
| `arqo-lockup-fondo-oscuro.svg` · `-claro.svg` | Con fondo y margen, para presentaciones |
| `arqo-redes-1200x630.png` | Tarjeta para redes sociales |

El favicon (`src/app/icon.svg`) y el icono de aplicación (`src/app/apple-icon.png`)
usan el mismo isotipo. Es legible a 16 px.

En producto, el lockup se compone en React (`src/components/ui/Logo.tsx`): el arco
va en SVG y el texto en Archivo real, de modo que hereda color y tamaño del entorno.

### Color

Dos temas diseñados por separado. El claro es papel cálido, no un negativo del
oscuro, y el acento se ajusta en cada uno para mantener contraste AA.

| Token | Oscuro | Claro |
| --- | --- | --- |
| `bg` | `#0A0A0B` | `#F1EEE8` |
| `surface` | `#111113` | `#E8E4DB` |
| `line` | `#28282D` | `#D5CFC3` |
| `ink` | `#F2EFEA` | `#131211` |
| `muted` | `#95928C` | `#646059` |
| `faint` | `#7E7B76` | `#706C64` |
| `accent` | `#E64E2E` | `#C3371C` |

El vermellón es el único color del sistema y se reserva para cifras, acentos y
estados. Todo lo demás es tinta sobre fondo.

### Tipografía

- **Archivo** — estructura y titulares, con *tracking* negativo.
- **JetBrains Mono** — etiquetas, numeración de secciones y datos.
- **Instrument Serif** *(cursiva)* — un único acento editorial, en el titular del
  encabezado y en las citas.

La escala es fluida (`clamp`). El titular del encabezado se mide con unidades de
contenedor (`cqw`) contra su propia columna, así que nunca invade la franja de
fotografía por mucho que cambie el ancho de la ventana.

---

## Estructura

```
src/
  app/                 Rutas (App Router)
    api/contacto/      Recepción de briefs
    proyectos/[slug]/  Casos de estudio
    ideas/[slug]/      Artículos
  components/
    layout/            Navegación, pie, cursor, scroll suave, temas, apertura
    sections/          Bloques de página reutilizables entre rutas
    dashboard/         Gráficas SVG propias, tablero demo y maquetas de interfaz
    ui/                Primitivas: botón, logo, revelados, contador, magnético
  content/             Todo el contenido tipado, separado de la presentación
  lib/                 Curvas de movimiento y utilidades
```

Las secciones se comparten entre rutas: `Proceso` aparece en la portada y en
`/proceso`, `Tecnologia` en la portada y en `/nosotros`, `Tableros` en la portada y
en `/servicios`. El contenido vive en `src/content/` y la presentación no lo toca.

### Gráficas

Las gráficas (`src/components/dashboard/charts.tsx`) están dibujadas a mano en SVG
—área con curva de Catmull-Rom, barras, anillo, embudo y mapa esquemático— sin
librería. El control del trazo y del color importaba más que la comodidad, y
mantiene el paquete ligero. Las series son fijas y deterministas: nada de valores
aleatorios en render.

---

## Movimiento

Smooth scroll con Lenis, revelados al entrar en pantalla, *parallax* por capas,
contadores, cursor propio, transición de página con telón y cambio de tema con
revelado circular (View Transitions, con alternativa en CSS).

Dos reglas que condicionan el código:

1. **El árbol renderizado nunca depende de la preferencia de movimiento.** Lo que
   cambia es la duración. Ramificar la estructura con ese valor rompe la
   hidratación, porque el servidor y el cliente no coinciden.
2. **Con movimiento reducido, los bloques saltan a su estado final.** El servidor
   ya escribió `opacity: 0` en el HTML; sin ese salto el contenido quedaría
   invisible para siempre. Ver `useMovimientoReducido` en `src/lib/`.

---

## Accesibilidad

- Enlace para saltar al contenido, estructura de encabezados y HTML semántico.
- Foco visible con el color de acento en ambos temas.
- Texto tenue a 4.5:1 como mínimo sobre su fondo, en los dos temas.
- Los controles del tablero, del cotizador y del formulario son botones reales con
  `aria-pressed`; los errores se asocian con `aria-describedby`.
- La cinta de capacidades duplica su contenido para encadenar el bucle; la copia va
  con `aria-hidden`.
- `prefers-reduced-motion` desactiva animación, cursor propio y scroll suave.

---

## Integraciones previstas

El sitio funciona sin ninguna variable de entorno. `.env.example` deja preparados
los puntos de enganche:

- `ARQO_LEADS_WEBHOOK_URL` — `src/app/api/contacto/route.ts` reenvía ahí cada brief
  validado. Es el punto de entrada a un CRM, a Supabase o a una función propia.
- `NEXT_PUBLIC_SUPABASE_*` — persistencia de leads y contenido editable.
- `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` — resumen automático de briefs.
- `NEXT_PUBLIC_ANALYTICS_ID` — analítica.

---

## Nota

Proyecto ficticio con fines de portafolio. ARQO no existe; los clientes, cifras,
testimonios y casos son inventados. Las fotografías provienen de Unsplash y se
cargan por URL remota (`next/image`), elegidas una a una por dirección de arte.
