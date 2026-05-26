---
description: Create a new named HTML template and save it to the templates/ folder
---

Generate a new reusable HTML template and save it to `./templates/<name>.html`.

## Steps

1. Ask for (or infer from context):
   - Template name (kebab-case, e.g. `promo-banner`, `event-card`, `announcement`)
   - Design style or reference
   - Content placeholders to include

2. Generate complete self-contained HTML following project rules:
   - Explicit body dimensions (default 1200x800)
   - No external CSS files
   - Use placeholder text that makes the template purpose clear
   - Add a CSS comment at the top: `/* Template: <name> | Purpose: <brief> */`

3. Save the file to `./templates/<name>.html`

4. Confirm: "Template saved as templates/<name>.html — it will appear in the web UI automatically."

---

## Naming Convention

Good names: `event-invite`, `sale-banner`, `team-intro`, `launch-announcement`, `feature-highlight`
Avoid: generic names like `card1`, `template-new`, `test`

---

## After Saving

The template is immediately available at:
- Web UI: http://localhost:3000 (reload to see it in the list)
- API: GET /api/template/<name>.html
