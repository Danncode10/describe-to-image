---
description: Convert a specific template or current HTML to PNG via the server endpoint
---

Export a template or inline HTML as a PNG image using the /convert endpoint.

## Steps

1. Determine what to export:
   - If user names a template: read `./templates/<name>.html`
   - If user pastes HTML: use that directly

2. Check the server is running:
   ```bash
   curl -s http://localhost:3000/home > /dev/null && echo "Server running" || echo "Server not running — start with: npm start"
   ```

3. Send the HTML to the convert endpoint:
   ```bash
   curl -s -X POST http://localhost:3000/convert \
     -H "Content-Type: text/html" \
     --data-binary @./templates/<name>.html \
     --output ./exports/<name>-$(date +%Y%m%d-%H%M%S).png
   ```

4. Create the exports folder if it doesn't exist:
   ```bash
   mkdir -p ./exports
   ```

5. Confirm the export:
   - File path where PNG was saved
   - File size
   - Remind user: open in Finder or drag into design tools

---

## Notes

- PNG dimensions match the body size set in the HTML (default 1200x800)
- For higher resolution, edit the HTML body to 2400x1600 before exporting
- Exported files are saved to `./exports/` (gitignored)
