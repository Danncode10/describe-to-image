# Describe to Image - Project Instructions

This project converts HTML descriptions and image references into beautiful PNG images.

## Project Overview

Backend: Node.js + Express + Puppeteer
Frontend: HTML + JavaScript
Purpose: Convert descriptions/designs to PNG images with style matching from references

## Key Commands

Use `/describe-image` to create images from:
1. Text descriptions
2. Image references (provide image URL or path)
3. Design inspiration (show me a style, I'll match it)

## Workflow

1. Provide a description or image reference
2. Claude analyzes the style/requirements
3. Generates HTML template matching the reference style
4. Render as PNG via `/convert` endpoint

## Important Files

- server.js - Express backend with Puppeteer conversion
- public/index.html - Web interface
- public/script.js - Frontend logic
- templates/ - HTML template collection
- describe.md - Design description guide

## Development

Server runs on localhost:3000
Templates folder: ./templates/
Preview before download in the web UI

## Key Features Enabled

- Image analysis from references
- HTML generation from descriptions
- Live preview system
- PNG export with Puppeteer
- Template library management
