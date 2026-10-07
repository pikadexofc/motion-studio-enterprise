# ADR-002: Multi-Runtime Motion Architecture

## Status
Accepted (Phase 1 Baseline)

## Context
A major architectural trap in video synthesis systems is attempting to force every visual element through a single renderer (e.g., rendering text and 2D UI inside a 3D WebGL canvas, or attempting to render complex 3D depth geometry using pure SVG/CSS transforms).

Text rendering in WebGL requires signed distance fields (SDF), complex font texture atlases, and kerning engines, yet still falls short of native browser subpixel font rendering and flexbox/grid layout engines. Conversely, rendering complex spatial lighting, glass refraction, and 3D camera projections using DOM/CSS is fragile, lacks true depth sorting, and cannot support procedural shaders.

## Decision
Adopt a **multi-runtime architecture** where layers are partitioned according to their natural technical strength:
1. **DOM / CSS / SVG (Orchestrated by GSAP)**: Reserved for typography, kinetic text reveals, UI cards, vector logos, badges, and flat graphic accents.
2. **Three.js / WebGL**: Reserved for spatial 3D scenes, depth geometry, lighting stages, glassmorphism, camera animation, and particle systems.
3. **Canvas 2D / Shaders**: Reserved for procedural noise patterns, mathematical line plots, and post-processing visual filters.
4. **Unified Virtual Time Dispatcher**: The scene runner maintains a single clock that dispatches virtual time $t$ to all active runtimes concurrently in the same viewport.

## Consequences
### Positive
- Crisp, pixel-perfect typographic fidelity with complete CSS layout control.
- Photorealistic 3D lighting, materials, and depth geometry without compromising text crispness.
- Clear separation of concerns between graphic design and 3D technical staging.

### Negative / Tradeoffs
- Requires synchronization logic between DOM overlay layers and Three.js canvas layers.
- Compositing requires careful management of transparency, z-indexes, and canvas background clearing.
