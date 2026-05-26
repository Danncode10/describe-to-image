# Describe to Image

Convert HTML descriptions into beautiful PNG images automatically. Write HTML, see preview instantly, and download as PNG.

## Features

✅ **Live Preview** - See your HTML rendered in real-time  
✅ **HTML to PNG** - Convert any HTML to downloadable PNG images  
✅ **Template Library** - Pre-built templates for common designs  
✅ **Easy to Use** - Simple web interface, no learning curve  
✅ **Customizable** - Create any HTML design you want  

## Quick Start

### 1. Install Dependencies
```bash
cd describe-to-image
npm install
```

### 2. Start the Server
```bash
npm start
```

The app will be available at `http://localhost:3000`

### 3. Navigate to Home
Open your browser and go to:
```
http://localhost:3000/home
```

Or visit the main interface:
```
http://localhost:3000
```

## How to Use

1. **Browse Templates**: Load any pre-built template from the left panel
2. **Edit HTML**: Modify the HTML code in the editor
3. **Preview**: Click "Preview" to see your design
4. **Download**: Click "Download PNG" to save the image

## Project Structure

```
describe-to-image/
├── public/
│   ├── index.html      # Main web interface
│   └── script.js       # Client-side JavaScript
├── templates/          # HTML template files
│   ├── social-card.html
│   ├── quote-card.html
│   └── product-card.html
├── server.js           # Express server
├── package.json        # Dependencies
├── describe.md         # Description & examples
└── README.md           # This file
```

## Creating New Templates

Add new HTML files to the `templates/` folder. They will appear automatically in the templates list.

Example structure:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 1200px;
      height: 800px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* Your styles */
  </style>
</head>
<body>
  <!-- Your HTML -->
</body>
</html>
```

**Important**: Set explicit `width` and `height` on the body for consistent PNG export.

## API Endpoints

- `GET /home` - List available templates
- `GET /api/templates` - Get all templates as JSON
- `GET /api/template/:name` - Get specific template content
- `POST /preview` - Preview HTML (returns HTML)
- `POST /convert` - Convert HTML to PNG (returns image)

## Requirements

- Node.js 14+
- npm or yarn
- Puppeteer (installed automatically via npm)

## Troubleshooting

**Port 3000 already in use?**
Edit `server.js` and change `const PORT = 3000;` to a different port.

**Puppeteer errors?**
Try reinstalling: `npm install --force puppeteer`

**No templates showing?**
Make sure you have HTML files in the `templates/` folder.

## Tips & Tricks

- Use explicit pixel dimensions for consistent results
- Test your HTML locally before converting to PNG
- Larger designs (1200x800+) produce higher quality PNGs
- The conversion uses headless Chromium for accurate rendering

## License

Free to use and modify!
