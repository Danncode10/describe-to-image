const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const templatesDir = path.join(__dirname, 'templates');
const generatedDir = path.join(__dirname, 'generated');

[templatesDir, generatedDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Home — list all folders (templates + generated)
app.get('/home', (req, res) => {
  const read = (dir, folder) =>
    (fs.readdirSync(dir).filter(f => f.endsWith('.html'))).map(f => ({
      name: f.replace('.html', ''),
      file: f,
      folder,
      path: `/${folder}/${f}`
    }));

  res.json({
    templates: read(templatesDir, 'templates'),
    generated: read(generatedDir, 'generated')
  });
});

// Serve raw HTML files from templates/ and generated/
app.get('/templates/:name', (req, res) => serveHtml(templatesDir, req, res));
app.get('/generated/:name', (req, res) => serveHtml(generatedDir, req, res));

function serveHtml(dir, req, res) {
  const filePath = path.join(dir, req.params.name);
  if (!filePath.startsWith(dir)) return res.status(400).send('Invalid path');
  if (!fs.existsSync(filePath)) return res.status(404).send('Not found');
  res.setHeader('Content-Type', 'text/html');
  res.send(fs.readFileSync(filePath, 'utf-8'));
}

// Save generated HTML
app.post('/save', express.json(), (req, res) => {
  const { name, html } = req.body;
  if (!name || !html) return res.status(400).json({ error: 'name and html required' });

  const safeName = name.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
  const filePath = path.join(generatedDir, `${safeName}.html`);

  fs.writeFileSync(filePath, html, 'utf-8');
  res.json({ saved: `generated/${safeName}.html` });
});

// Convert HTML to PNG
app.post('/convert', express.text({ type: 'text/html', limit: '10mb' }), async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.setContent(req.body, { waitUntil: 'networkidle0' });
    const png = await page.screenshot({ type: 'png', fullPage: true });
    await browser.close();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="image.png"');
    res.send(Buffer.from(png));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Convert a saved file by path to PNG
app.get('/convert/:folder/:name', async (req, res) => {
  const dir = req.params.folder === 'generated' ? generatedDir : templatesDir;
  const filePath = path.join(dir, req.params.name);
  if (!filePath.startsWith(dir) || !fs.existsSync(filePath))
    return res.status(404).json({ error: 'File not found' });

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`http://localhost:${PORT}/${req.params.folder}/${req.params.name}`, { waitUntil: 'networkidle0' });
    const png = await page.screenshot({ type: 'png', fullPage: true });
    await browser.close();

    const pngName = req.params.name.replace('.html', '.png');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="${pngName}"`);
    res.send(Buffer.from(png));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
