---
name: describe-to-image-project
description: HTML to PNG image converter with style matching from references
metadata:
  type: project
---

Project: Describe to Image

Purpose: Convert text descriptions and image references into styled HTML that renders as PNG images.

Stack: Node.js + Express + Puppeteer (headless Chromium for rendering)

Key Endpoints:
- GET /home - List available templates
- GET /api/templates - JSON template list
- GET /api/template/:name - Get template content
- POST /preview - Preview HTML
- POST /convert - Convert HTML to PNG (returns image blob)

Templates Location: ./templates/

Built-in Templates:
- social-card.html (gradient, modern)
- quote-card.html (elegant typography)
- product-card.html (minimal product showcase)

Core Capability:
- User describes design or shows reference image
- Claude generates HTML in matching style
- User previews live at http://localhost:3000
- Downloads as PNG via Download button

Main Command: /describe-image
- Accepts text descriptions
- Analyzes image references for style
- Generates HTML templates on-demand
