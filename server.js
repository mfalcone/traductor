import express from 'express';
import { pipeline } from '@xenova/transformers';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let translator = null;
let modelReady = false;
let modelError = null;

async function loadModel() {
  try {
    console.log('⏳ Cargando modelo de traducción (primera vez puede tardar)...');
    translator = await pipeline('translation', 'Xenova/opus-mt-es-en', {
      cache_dir: './models',
    });
    modelReady = true;
    console.log('✅ Modelo listo.');
  } catch (err) {
    modelError = err.message;
    console.error('❌ Error cargando modelo:', err.message);
  }
}

loadModel();

app.get('/status', (_req, res) => {
  res.json({ ready: modelReady, error: modelError });
});

app.post('/translate', async (req, res) => {
  if (!modelReady) {
    return res.status(503).json({ error: 'El modelo aún está cargando, esperá un momento.' });
  }
  const { text } = req.body;
  if (!text || !text.trim()) return res.json({ translation: '' });

  try {
    const result = await translator(text.trim(), { max_length: 512 });
    res.json({ translation: result[0].translation_text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
});
