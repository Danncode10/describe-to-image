---
description: Generate HTML from a text description or image reference, ready to preview and export as PNG
---

Generate a styled HTML template based on the user's description or image reference.

## Input Types Supported

### 1. Text Description
User says: "Create a [style] card with [content] and [design preferences]"

Steps:
1. Parse the description for: content, colors, typography, layout, mood
2. Generate complete self-contained HTML (no external CSS files)
3. Set body width/height explicitly for PNG export
4. Output the full HTML block
5. State design decisions made (colors, fonts, spacing)
6. Remind user to preview at http://localhost:3000

### 2. Image Reference
User provides an image path or URL alongside their request.

Steps:
1. Analyze the image using vision:
   - Extract dominant color palette (list hex values)
   - Identify layout structure (centered, grid, side-by-side, full-bleed)
   - Note typography weight and style (bold headline, light body, serif vs sans)
   - Assess spacing and density (airy/minimal vs compact/dense)
   - Note any distinctive visual elements (borders, shadows, shapes, icons)
2. Reconstruct the aesthetic in HTML matching those extracted styles
3. Adapt the user's content into that visual style
4. Output the full HTML

### 3. Combined (Reference + Custom Content)
User provides image + specific content to place in that style.

Steps:
1. Analyze reference image style (as above)
2. Use extracted style as the visual framework
3. Place user's specific content into that framework
4. Output the styled HTML

---

## HTML Output Requirements

Every generated HTML must:
- Be fully self-contained (single file, no external CSS)
- Have explicit body dimensions: `width: 1200px; height: 800px` (adjustable)
- Use display:flex or grid for layout centering
- Embed any needed font via Google Fonts link tag
- Be visually polished — use shadows, gradients, or typography hierarchy

---

## After Generating HTML

Always end with:
1. Copy the HTML into the editor at http://localhost:3000
2. Click "Preview" to see the live render
3. Adjust if needed
4. Click "Download PNG" to export

---

## Common Styles Reference

Invoke by name if user mentions:

- "Instagram Stories" → 9:16 portrait, bold full-bleed gradient, centered sans-serif headline
- "Apple minimal" → White background, SF Pro-style font, lots of negative space, single focused element
- "Spotify" → Dark (#191414) background, green (#1DB954) accent, bold white headline
- "LinkedIn" → Professional blue (#0077B5), clean sans-serif, corporate white card
- "Twitter/X" → Dark mode (#15202B), white text, rounded card shape
- "Notion" → Off-white (#FFFEF9), serif heading, clean editorial layout
- "Canva" → Colorful, template-y, bright palette, multiple text layers
- "Awwwards" → Bold experimental typography, asymmetric layout, high contrast
