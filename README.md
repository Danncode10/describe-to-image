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

## Skills Installed

Already installed in `.claude/skills/`. Run `npx skills list` to verify.

| Skill | Source | What it does |
|---|---|---|
| `web-design-guidelines` | vercel-labs/agent-skills | Audits HTML against 100+ accessibility, UX, and performance rules |
| `webapp-testing` | anthropics/skills | Live browser testing via Playwright — tests localhost:3000 |
| `html-anything` | clockless-org/html-anything | HTML generation assistant for cards, pages, and layouts |
| `skill-creator` | anthropics/skills | Build new custom skills from inside this project |
| `senior-frontend` | alirezarezvani/claude-skills | Senior-level frontend code quality and patterns |
| `ui-design-system` | alirezarezvani/claude-skills | Design system thinking — spacing, tokens, consistency |
| `landing-page-generator` | alirezarezvani/claude-skills | Generate landing-style layouts from prompts |
| `full-page-screenshot` | alirezarezvani/claude-skills | Full-page screenshot workflows (complements Puppeteer export) |

To reinstall from scratch:

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code
npx skills add anthropics/skills --skill webapp-testing --skill skill-creator --agent claude-code
npx skills add clockless-org/html-anything --skill html-anything --agent claude-code
npx skills add alirezarezvani/claude-skills --skill senior-frontend --skill ui-design-system --skill landing-page-generator --skill full-page-screenshot --agent claude-code
```

Verify:
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
    ├── commands/
    │   ├── describe-image.md   # /describe-image
    │   ├── analyze-style.md    # /analyze-style
    │   ├── add-template.md     # /add-template
    │   ├── list-templates.md   # /list-templates
    │   ├── export-png.md       # /export-png
    │   └── design-audit.md     # /design-audit
    └── skills/
        ├── web-design-guidelines/
        ├── webapp-testing/
        ├── html-anything/
        ├── skill-creator/
        ├── senior-frontend/
        ├── ui-design-system/
        ├── landing-page-generator/
        └── full-page-screenshot/
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
