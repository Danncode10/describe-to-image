const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Create templates directory if it doesn't exist
const templatesDir = path.join(__dirname, 'templates');
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

// Home route - list available HTML files
app.get('/home', (req, res) => {
  fs.readdir(templatesDir, (err, files) => {
    const htmlFiles = (files || []).filter(f => f.endsWith('.html'));
    res.json({
      message: 'Available HTML templates',
      templates: htmlFiles,
      count: htmlFiles.length
    });
  });
});

// Render HTML and return preview
app.post('/preview', express.text({ type: 'text/html' }), (req, res) => {
  res.json({
    preview: req.body,
    message: 'Preview ready for conversion'
  });
});

// Convert HTML to PNG and download
app.post('/convert', express.text({ type: 'text/html' }), async (req, res) => {
  try {
    const htmlContent = req.body;

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for better quality
    await page.setViewport({ width: 1200, height: 800 });

    // Load the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PNG
    const png = await page.screenshot({ type: 'png', fullPage: true });

    await browser.close();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="image.png"');
    res.send(png);

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert HTML to PNG', details: error.message });
  }
});

// List available templates endpoint
app.get('/api/templates', (req, res) => {
  fs.readdir(templatesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read templates' });
    }
    const templates = (files || [])
      .filter(f => f.endsWith('.html'))
      .map(f => ({
        name: f,
        path: `/templates/${f}`
      }));
    res.json(templates);
  });
});

// Get template content
app.get('/api/template/:name', (req, res) => {
  const templatePath = path.join(templatesDir, req.params.name);

  // Security check: prevent directory traversal
  if (!templatePath.startsWith(templatesDir)) {
    return res.status(400).json({ error: 'Invalid template name' });
  }

  fs.readFile(templatePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json({ content: data, name: req.params.name });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/home`);
  console.log('Templates directory:', templatesDir);
});
