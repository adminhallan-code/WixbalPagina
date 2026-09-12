# Wixbal — Página web

Sitio de **Wixbal**, la asociación de agencias de viaje por Guatemala que reúne a
Balam Expeditions, Wolfs Travel Agency e Ixkanul Tours.

Servidor **Node.js + Express** que sirve la portada estática. Pensado para
desplegarse en **Hostinger** (aplicación Node.js).

---

## Estructura

```
server.js              Servidor Express (compresión, caché, fallback a index.html)
package.json           Dependencias y script de arranque
public/
  index.html           Portada completa
  css/styles.css       Diseño (lienzo de 1440 px, valores exactos del diseño original)
  css/responsive.css   Adaptación a tablet y móvil
  js/app.js            Anillo giratorio, carrusel, modal, rotación de agencias, hotelería
  assets/              Logos (Wixbal, Balam, Wolfs, Ixkanul)
```

## Desarrollo local

```bash
npm install
npm start
```

Abre <http://localhost:3000>. El puerto se puede cambiar con `PORT=4000 npm start`.

---

## Cómo se comporta el diseño

El diseño original está hecho sobre un lienzo fijo de **1440 px**. Para que se vea
idéntico sin deformarse:

- **≥ 1100 px** — el lienzo se escala con `zoom` a `min(1.25, ancho / 1440)`, igual
  que el diseño original. En pantallas grandes se limita a 1.25× y queda centrado.
- **< 1100 px** — se desactiva el escalado y el contenido se reordena en columna
  (`public/css/responsive.css`), conservando colores, tipografías y componentes:
  menú hamburguesa, héroe en vertical, tarjetas deslizables, listas apiladas.

### Hotelería: la excepción

Todas las secciones se componen contra el lienzo de 1440 px **menos Hotelería**,
que se compone contra la forma real de la pantalla y ocupa exactamente una.

El motivo: en monitores anchos el lienzo se amplía a 1.25×, así que esa sección
llegaba a medir ~1800 px de alto. Se veía un titular enorme, dos hospedajes y la
foto cortada. Escalar el bloque no servía — el diseño es casi cuadrado y la
pantalla apaisada —, así que se recompone.

El truco está al final de `styles.css`:

```css
.hotels {
  zoom: calc(1 / var(--zoom, 1));   /* anula el zoom del lienzo */
  height: 100vh;
}
```

Con el zoom invertido, la sección sigue ocupando la misma caja que las demás
(el ancho se queda en `auto`), pero por dentro **1 px = 1 px real**, así que las
medidas en `px` y `vh` valen lo que dicen. A partir de ahí todo va con `clamp()`
contra `vh`: titular, filas, chips y botón crecen con la pantalla.

La foto lleva `min-height: 0` para estirarse a toda su columna y verse siempre
completa, que era la queja principal.

| Pantalla | Titular | Fila | Foto | Alto |
|---|---|---|---|---|
| 1366×700 | 59 px | 75 px | 451×486 | 1 pantalla |
| 1440×800 | 67 px | 83 px | 476×561 | 1 pantalla |
| 1830×880 | 74 px | 91 px | 577×597 | 1 pantalla |
| 2560×1300 | 104 px | 118 px | 596×954 | 1 pantalla |

En móvil no aplica nada: la sección recupera su altura natural.

### Interacciones

| Elemento | Comportamiento |
|---|---|
| Anillo del héroe | SVG generado en JS (260 marcas + 20 glifos), gira en 120 s |
| Carrusel de servicios | Arrastre con el ratón, flechas, scroll-snap |
| Tarjeta de servicio | Abre el modal con los datos del servicio (Esc o clic fuera para cerrar) |
| Sección «Acerca» | Rota entre las tres agencias cada 7 s; se puede fijar una al hacer clic |
| Hotelería | El panel de foto cambia al pasar el ratón (o tocar) sobre cada fila |
| Formulario de cotización | Abre el cliente de correo hacia `hola@wixbal.gt` |

---

## Fotografías

El diseño original no traía fotos: traía **marcadores de posición** con la
descripción de cada imagen. Aquí se reproducen con la clase `.slot`, que muestra
esa descripción sobre un fondo con textura.

Para poner una foto real, sustituye el `div` por una imagen:

```html
<!-- antes -->
<div class="slot" data-slot="Guía frente a un templo"></div>

<!-- después -->
<img class="slot-img" src="/assets/fotos/guia-templo.jpg" alt="Guía frente a un templo">
```

y añade una vez en `public/css/styles.css`:

```css
.slot-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
```

Las fotos que faltan son:

| Dónde | Descripción |
|---|---|
| Héroe (círculo) | Templo IV, Tikal |
| Servicio I | Guía frente a un templo |
| Servicio II | Cocina en una casa de Atitlán |
| Servicio III | Mapa y cuaderno de viaje |
| Servicio IV | Camioneta en carretera de montaña |
| Acerca (fondo) | Una por agencia — ver `agencies[].photo` en `public/js/app.js` |
| Hotelería | Una por hospedaje — ver `hotels[].photo` en `public/js/app.js` |

---

## Despliegue en Hostinger

En **hPanel → Sitio web → Node.js**:

1. **Repositorio**: `https://github.com/adminhallan-code/WixbalPagina.git`, rama `main`.
2. **Versión de Node**: 18 o superior.
3. **Archivo de inicio**: `server.js`
4. **Comando de instalación**: `npm install`
5. **Comando de arranque**: `npm start`

El servidor toma el puerto de `process.env.PORT`, que es lo que Hostinger asigna,
así que no hay que configurar nada más. Tras cada `git push`, vuelve a desplegar
desde hPanel (o activa el despliegue automático).

Comprobación rápida de que la app está viva: `GET /health` devuelve `{"ok":true}`.
