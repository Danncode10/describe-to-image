# Describe to Image

Convert descriptions and style references into beautiful PNG images automatically. Describe what you want, get HTML rendered live, and download as PNG.

## Features

[CORE]
- Live HTML preview in real-time
- Convert HTML to PNG images
- Template library with pre-built designs
- Simple web interface

[POWERED BY]
- Image reference analysis (describe a style, I match it)
- Text description to HTML conversion
- Puppeteer rendering engine
- One-click PNG download

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

### 3. Open Web Interface
Visit: http://localhost:3000

## Commands

### /describe-image

Generate images from descriptions or style references.

Usage:
```
/describe-image Create a modern gradient card with white text and rounded corners

/describe-image Make something in the style of [image], but with this text: ...

/describe-image Show me a social media card like Instagram Stories design
```

I will:
1. Analyze your description or image reference
2. Generate matching HTML
3. Display in the preview
4. Ready to download as PNG

Examples:
- "Create a quote card in minimalist black and white"
- "Make a product card like Apple's design aesthetic"
- "Generate a social post style card with gradient background"

## How to Use the Web Interface

1. **Load Templates** - Click any template button on the left to load pre-built designs
2. **Edit HTML** - Modify code in the editor
3. **Preview** - Click "Preview" to see live rendering
4. **Download** - Click "Download PNG" to save the image

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

## Workflow: From Reference to Image

### Option 1: Describe What You Want
```
User: "Create a card with blue gradient, white text, modern feel"
Claude: Generates HTML matching description
Result: Preview in web UI, download as PNG
```

### Option 2: Show a Reference Style
```
User: "See this image [reference], make something similar"
Claude: Analyzes image style (colors, layout, typography)
Claude: Generates HTML in that style
Result: Styled image ready to customize
```

### Option 3: Combine Both
```
User: "Style like [image], but with this content..."
Claude: Merges reference style with your content
Result: Customized styled image
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

## Design Tips

- Be specific with color names or hex codes
- Mention typography preferences (serif, sans-serif, modern, elegant)
- Specify layout (centered, grid, side-by-side)
- Reference real designs from brands you like
- For best results, include target dimensions

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
