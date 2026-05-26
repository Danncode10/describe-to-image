# Describe to Image

Convert text descriptions and image references into styled PNG images.
Claude generates the HTML, Puppeteer renders it, you download the PNG.

---

## Quick Start

```bash
npm install
npm start
# Open http://localhost:3000
```

---

## Claude Commands

All commands are used inside Claude Code. Open this project in Claude Code, then invoke any command below.

### /describe-image

Main command. Generate an image from a description or reference.

```
/describe-image Create a dark social card with neon green accent and bold headline

/describe-image [show image] Make something in this style with text: "Launch Day"

/describe-image Style like Spotify dark mode, with quote: "Design is not decoration"
```

Claude will:
1. Analyze your description or reference image
2. Generate complete self-contained HTML
3. Give you the code to paste into the editor
4. You preview and download at http://localhost:3000

---

### /analyze-style

Show Claude any image and get a full design spec extracted from it.

```
/analyze-style [attach image]
```

Output: color palette, typography, layout structure, mood keywords, and a recreate prompt.
Use the result to then run `/describe-image` with the extracted style.

---

### /add-template

Create a new reusable template and save it to `templates/`.

```
/add-template Create a birthday announcement card template

/add-template Add a dark minimalist event invite template named event-dark
```

Saved templates appear automatically in the web UI template list.

---

### /list-templates

See all available templates with a brief description.

```
/list-templates
```

---

### /export-png

Export a template directly to a PNG file via the server, without touching the UI.

```
/export-png social-card.html

/export-png [paste HTML here]
```

PNG saved to `./exports/` folder.

---

### /design-audit

Before exporting, run a quality check on the generated HTML.

```
/design-audit [paste HTML]
```

Checks: contrast ratio, font sizes, visual hierarchy, export readiness (explicit body dimensions, self-contained CSS).

---

## Web Interface (http://localhost:3000)

The UI lets you:
- Load any template from the left panel
- Edit raw HTML in the code editor
- Preview the rendered result live
- Click "Download PNG" to export

Home route (`/home`) returns a JSON list of all templates in `./templates/`.

---

## Image Reference Workflow

1. Collect a reference image (screenshot, URL, or local file)
2. Run `/analyze-style [image]` — Claude extracts the full design spec
3. Run `/describe-image` with your content + the extracted style
4. Preview at http://localhost:3000, download as PNG

---

## Skills Setup (First Time)

Run these once from the project root to install recommended skills:

```bash
# Web design quality guidelines (Vercel official)
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code

# Live browser testing via Playwright
npx skills add vercel-labs/agent-skills --skill webapp-testing --agent claude-code

# HTML generation helper
npx skills add alirezarezvani/claude-skills --skill html-anything --agent claude-code

# Build custom skills
npx skills add anthropics/skills --skill skill-creator --agent claude-code
```

After installing, verify with:
```bash
npx skills list
```

---

## Project Structure

```
describe-to-image/
├── server.js             # Express + Puppeteer backend
├── package.json
├── public/
│   ├── index.html        # Web UI
│   └── script.js         # Frontend logic
├── templates/            # HTML templates (auto-listed in UI)
│   ├── social-card.html
│   ├── quote-card.html
│   └── product-card.html
├── exports/              # PNG exports (gitignored)
├── describe.md           # Design description examples
└── .claude/
    ├── CLAUDE.md         # Project instructions for Claude
    ├── settings.json     # Hooks and permissions
    └── commands/
        ├── describe-image.md   # /describe-image
        ├── analyze-style.md    # /analyze-style
        ├── add-template.md     # /add-template
        ├── list-templates.md   # /list-templates
        ├── export-png.md       # /export-png
        └── design-audit.md     # /design-audit
```

---

## API Endpoints

| Method | Endpoint              | Description                            |
|--------|-----------------------|----------------------------------------|
| GET    | /home                 | List available templates               |
| GET    | /api/templates        | JSON array of template filenames       |
| GET    | /api/template/:name   | Get raw HTML content of a template     |
| POST   | /preview              | Render HTML preview (text/html body)   |
| POST   | /convert              | Convert HTML to PNG (returns blob)     |

---

## Design Defaults

When no style is specified, Claude uses:

| Token         | Value                               |
|---------------|-------------------------------------|
| Canvas        | 1200 x 800 px                       |
| Primary color | #667eea to #764ba2 (gradient)       |
| Text dark     | #1a1a1a                             |
| Text light    | #ffffff                             |
| Border radius | 12px (cards), 8px (buttons)         |
| Font          | Segoe UI or Inter via Google Fonts  |
| Shadow        | 0 10px 40px rgba(0,0,0,0.15)        |

---

## Style References

Tell Claude the style and it will match it:

| Say this                 | Gets you                                            |
|--------------------------|-----------------------------------------------------|
| "Instagram Stories"      | 9:16, bold gradient, centered headline              |
| "Apple minimal"          | White bg, lots of space, single focused element     |
| "Spotify dark"           | #191414 bg, #1DB954 green accent, bold white text   |
| "LinkedIn card"          | #0077B5 blue, clean sans-serif, professional feel   |
| "Notion editorial"       | Off-white, serif heading, clean content layout      |
| "Awwwards bold"          | Experimental typography, asymmetric, high contrast  |

---

## Requirements

- Node.js 14+
- npm
- Puppeteer (auto-installed via npm)
- Internet connection (for Google Fonts in templates)

---

## Tips

- Always preview before downloading — what looks right in code may shift in render
- Use explicit hex codes when you need a specific color
- Set body to 2400x1600 for 2x retina-quality PNGs
- Keep templates/ organized with descriptive filenames
- Run `/design-audit` before sharing any exported image
