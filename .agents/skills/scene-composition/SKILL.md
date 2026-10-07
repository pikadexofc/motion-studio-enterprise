---
name: scene-composition
description: Spatial composition, layer stacking, aspect ratio adaptation, depth coordinates, and coordinate conversion between 2D and 3D.
---

# Scene Composition

## Activation
Activate when combining 2D DOM/SVG layers and 3D WebGL canvases in a single viewport, handling multi-aspect ratios (16:9, 9:16, 1:1), or stacking layers.

## Layer Stacking Architecture
```
[Z-Index 30]: UI & Typography Overlay (DOM / GSAP)
[Z-Index 20]: Vector Accents & Badges (SVG)
[Z-Index 10]: Spatial 3D Hero Scene (Three.js WebGL with transparent clearColor)
[Z-Index 00]: Atmospheric Background (CSS Gradients / WebGL Canvas / Shaders)
```

## Responsive Aspect Ratio Rules
- **16:9 Landscape (1920x1080)**: Horizontal layout; headline on left, 3D hero on right, or central hero with top/bottom copy.
- **9:16 Portrait (1080x1920)**: Vertical layout; upper third for hook headline, middle third for 3D hero showcase, lower third for CTA.
- **1:1 Square (1080x1080)**: Concentric focal staging; central hero with balanced framing.
