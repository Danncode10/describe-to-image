---
description: List all available HTML templates in the templates/ folder with a brief description of each
---

Read the `./templates/` directory and list all available HTML templates.

## Steps

1. List all `.html` files in `./templates/`
2. For each file, read the first 30 lines to extract:
   - The CSS comment at the top (if present): `/* Template: ... | Purpose: ... */`
   - The `<title>` tag content
   - A brief visual description based on the body/card structure
3. Output a clean table:

```
AVAILABLE TEMPLATES
-------------------
[1] social-card.html     — Gradient card with centered headline and tagline
[2] quote-card.html      — Elegant quote with left gold border and author
[3] product-card.html    — Minimal product showcase with image, price, CTA
```

4. End with:
   - Total count
   - Reminder: "Load any template at http://localhost:3000"
   - Suggest: "Use /describe-image or /add-template to create more"
