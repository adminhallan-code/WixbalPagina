const path = require('path');
const crypto = require('crypto');
const express = require('express');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

/* ==========================================================================
   Modo mantenimiento
   El público ve public/mantenimiento.html; quien tenga la clave ve el sitio.

   - MAINTENANCE=off  lo desactiva (cualquier otro valor, o sin definir, = on).
   - MAINTENANCE_KEY  la clave de acceso. Si no se define, se genera una al
     arrancar y se imprime en el log del servidor — pero cambia en cada
     reinicio, así que conviene fijarla en las variables de entorno.

   Para entrar:  /preview?key=LA_CLAVE     (deja una cookie de 30 días)
   Para salir:   /preview/salir
   ========================================================================== */

const MAINTENANCE = String(process.env.MAINTENANCE || 'on').toLowerCase() !== 'off';
const COOKIE = 'wixbal_preview';

const KEY = process.env.MAINTENANCE_KEY || crypto.randomBytes(12).toString('hex');
const KEY_FROM_ENV = Boolean(process.env.MAINTENANCE_KEY);

// El valor que se guarda en la cookie no es la clave, sino su hash.
const TOKEN = crypto.createHash('sha256').update(KEY).digest('hex');

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  const parts = header.split(';');
  for (const part of parts) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return null;
}

function hasAccess(req) {
  const cookie = readCookie(req, COOKIE);
  return Boolean(cookie) && safeEqual(cookie, TOKEN);
}

app.disable('x-powered-by');
app.use(compression());

// Entrar y salir del modo vista previa.
app.get('/preview', (req, res) => {
  if (!req.query.key || !safeEqual(req.query.key, KEY)) {
    res.status(403).type('text/plain; charset=utf-8').send('Clave incorrecta.');
    return;
  }
  res.cookie(COOKIE, TOKEN, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
  res.redirect('/');
});

app.get('/preview/salir', (req, res) => {
  res.clearCookie(COOKIE);
  res.type('text/plain; charset=utf-8').send('Listo, vuelves a ver el modo mantenimiento.');
});

app.get('/health', (req, res) => res.json({ ok: true, maintenance: MAINTENANCE }));

// La compuerta: va antes de los estáticos.
app.use((req, res, next) => {
  if (!MAINTENANCE || hasAccess(req)) return next();

  // El logo tiene que pasar para que la propia página de mantenimiento se vea.
  if (req.path === '/assets/wixbal.png') return next();

  res.status(503);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Retry-After', '3600');
  res.sendFile(path.join(PUBLIC_DIR, 'mantenimiento.html'));
});

app.use(
  express.static(PUBLIC_DIR, {
    extensions: ['html'],
    setHeaders(res, filePath) {
      if (/\.(png|jpe?g|webp|svg|woff2?)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        // HTML/CSS/JS: se revalidan con ETag para que un despliegue se vea al instante.
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

// Cualquier otra ruta devuelve la portada.
app.use((req, res) => {
  res.status(200).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Wixbal escuchando en http://localhost:${PORT}`);
  if (MAINTENANCE) {
    console.log('Modo mantenimiento: ACTIVO');
    console.log(`  Entrar:  /preview?key=${KEY}`);
    console.log('  Salir:   /preview/salir');
    if (!KEY_FROM_ENV) {
      console.log('  Aviso: clave generada al azar, cambia en cada reinicio.');
      console.log('         Fija MAINTENANCE_KEY en las variables de entorno.');
    }
  } else {
    console.log('Modo mantenimiento: desactivado (MAINTENANCE=off)');
  }
});
