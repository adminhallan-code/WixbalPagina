const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use(compression());

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

app.get('/health', (req, res) => res.json({ ok: true }));

// Cualquier otra ruta devuelve la portada.
app.use((req, res) => {
  res.status(200).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Wixbal escuchando en http://localhost:${PORT}`);
});
