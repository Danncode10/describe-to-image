---
description: Analyze a reference image and extract its full design style as a reusable spec
---

Deeply analyze the provided image and extract a full design specification that can be used to replicate the style.

## Analysis Output Format

Produce a structured design spec with these sections:

### Color Palette
- Background: #hex (describe: solid / gradient / texture)
- Primary text: #hex
- Secondary text: #hex
- Accent / highlight: #hex
- Border or divider: #hex (if present)
- Shadow: rgba values (if present)

### Typography
- Headline: font name, weight, size estimate, letter spacing (tight/normal/wide)
- Body: font name, weight, size estimate, line height
- Accent text: (labels, tags, captions) — describe style
- Google Fonts equivalent: suggest closest match

### Layout
- Overall structure: (centered single card / two-column / full-bleed / asymmetric)
- Alignment: (left / center / right)
- Spacing density: (minimal/airy / balanced / dense/compact)
- Notable grid or flex patterns

### Visual Elements
- Border radius: (none / subtle / rounded / pill)
- Shadows: (none / soft / hard / layered)
- Borders: (none / thin / thick / accent-side only)
- Icons or illustrations: (none / line icons / filled icons / illustration style)
- Image treatment: (none / circular / rounded / full-bleed / thumbnail)

### Mood & Style Keywords
3-5 adjectives: (e.g. "minimal, editorial, elegant" or "bold, vibrant, playful")

### Recreate Prompt
End with a one-line prompt that would recreate this style:
"Create a [mood] card with [background], [headline style], [layout], [key elements]"

---

## After Analysis

Ask the user:
1. What content to place in this style?
2. Any elements to adjust or remove?

Then use /describe-image to generate HTML matching the extracted spec.
