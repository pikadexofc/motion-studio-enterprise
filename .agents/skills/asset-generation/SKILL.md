---
name: asset-generation
description: Programmatic vector synthesis, SVG badge creation, procedural textures, gradient ramps, and typography bundling.
---

# Asset Generation

## Activation
Activate when generating procedural vector graphics, brand badges, geometric meshes, or custom SVG assets required by scenes.

## Guidelines
1. **Procedural SVGs**: Generate inline SVG markup with clean vector paths, explicit viewBox coordinates, and CSS styling classes.
2. **Procedural Textures**: Generate deterministic noise textures (Perlin/cellular) via HTML5 Canvas and upload as Three.js `CanvasTexture`.
3. **No External Network Dependencies**: All fonts and textures required during rendering must be bundled locally in `assets/` to ensure 100% offline determinism.
