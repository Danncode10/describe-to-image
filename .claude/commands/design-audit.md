---
description: Audit the generated HTML for design quality — accessibility, visual hierarchy, and export readiness
---

Review the provided HTML against design quality standards before exporting as PNG.

## Audit Checklist

### Accessibility
- [ ] Color contrast ratio: text vs background (minimum 4.5:1 for normal text)
- [ ] Font size: headline >= 24px, body >= 14px
- [ ] No color as the sole means of conveying information

### Visual Hierarchy
- [ ] Clear primary focal point (headline, hero, or key visual)
- [ ] Logical reading order (Z or F pattern)
- [ ] Adequate whitespace between sections
- [ ] No more than 3 font sizes used
- [ ] No more than 2-3 colors in the palette

### Typography
- [ ] Fonts are loading (Google Fonts link present if custom font used)
- [ ] Line height: body text 1.4-1.7, headlines 1.0-1.3
- [ ] No orphaned words or awkward line breaks

### Export Readiness
- [ ] Body has explicit pixel width and height (required for Puppeteer PNG)
- [ ] No horizontal overflow (content fits within stated dimensions)
- [ ] No external CSS file imports (must be self-contained)
- [ ] Background covers full canvas (no white edges)

### Design Polish
- [ ] Consistent border-radius style throughout
- [ ] Shadow depth is appropriate (not too heavy for the design)
- [ ] Gradient directions are consistent (all top-left to bottom-right, etc.)
- [ ] Elements are aligned on a clear grid

---

## Output Format

Report findings as:
- PASS / WARN / FAIL for each item
- Fix any FAIL items automatically
- List WARN items for user decision

End with: "Audit complete — X issues found, Y fixed. Ready to export."
