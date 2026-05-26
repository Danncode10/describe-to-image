# Describe to Image — Claude Instructions

## Project Purpose

Convert text descriptions and image references into styled HTML rendered as PNG images.
Backend: Node.js + Express + Puppeteer on localhost:3000

---

## Critical Rules for HTML Generation

ALWAYS follow these when generating HTML for this project:

1. Set explicit pixel dimensions on body: `width: 1200px; height: 800px` (or similar fixed size)
2. Use inline styles or `<style>` blocks only — no external CSS imports
3. Embed fonts via Google Fonts `<link>` tag if needed (Puppeteer can load external resources)
4. No JavaScript in template HTML — it renders via headless Chromium, keep it static
5. Test visual output: preview at http://localhost:3000 before finalizing

---

## Commands Available

| Command           | Purpose                                              |
|-------------------|------------------------------------------------------|
| /describe-image   | Generate HTML from text description or image style   |
| /analyze-style    | Extract design style from a reference image          |
| /add-template     | Create and save a new named template                 |
| /list-templates   | Show all templates currently in ./templates/         |
| /export-png       | Convert a specific template to PNG via the server    |
| /design-audit     | Run web design quality check on generated HTML       |

---

## When User Provides an Image Reference

Use Claude's vision capability to analyze the image:
1. Extract dominant colors (list hex codes)
2. Identify layout structure (centered, grid, asymmetric, etc.)
3. Note typography style (serif, sans-serif, bold, light)
4. Identify spacing density (minimal, balanced, dense)
5. Note background treatment (solid, gradient, texture pattern)
6. Reconstruct in HTML matching the extracted style

---

## File Structure

```
describe-to-image/
├── server.js             # Express + Puppeteer backend
├── public/
│   ├── index.html        # Web UI
│   └── script.js         # Frontend logic
├── templates/            # HTML files — each becomes a template card in UI
│   ├── social-card.html
│   ├── quote-card.html
│   └── product-card.html
├── describe.md           # Description examples and guide
└── .claude/
    ├── CLAUDE.md         # This file
    ├── settings.json     # Hooks and permissions
    └── commands/         # Slash command definitions
```

---

## Server Endpoints

- GET  /home              — List available template files
- GET  /api/templates     — JSON array of templates
- GET  /api/template/:name — Get template HTML content
- POST /preview           — Render preview (text/html body)
- POST /convert           — Convert HTML → PNG (returns image/png blob)

---

## Skills Installed

Run these install commands from project root when first setting up:

```bash
# Web design quality guidelines (Vercel official)
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code

# Webapp testing via Playwright (live browser testing)
npx skills add vercel-labs/agent-skills --skill webapp-testing --agent claude-code

# HTML generation assistant
npx skills add alirezarezvani/claude-skills --skill html-anything --agent claude-code

# Skill creator (build new custom skills)
npx skills add anthropics/skills --skill skill-creator --agent claude-code
```

---

## Design Tokens (Use These as Defaults)

When no specific design is requested, default to:

- Primary: #667eea → #764ba2 (purple gradient)
- Text: #1a1a1a on light, #ffffff on dark
- Border radius: 12px cards, 8px buttons
- Padding: 40px cards, 16px buttons
- Font: 'Segoe UI' or Inter via Google Fonts
- Shadow: `0 10px 40px rgba(0,0,0,0.15)`
- Width: 1200px, Height: 800px (PNG canvas)

---

## Output Format

When generating HTML, always:
1. Output the complete HTML block first
2. Briefly state the design decisions made (colors, layout, font)
3. Remind user: preview at http://localhost:3000 then click "Download PNG"
