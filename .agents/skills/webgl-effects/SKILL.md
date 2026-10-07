---
name: webgl-effects
description: Post-processing pipelines, bloom, depth of field, chromatic aberration, and seeded particle fields in WebGL.
---

# WebGL Effects & Post-Processing

## Activation
Activate when adding cinematic post-processing passes, camera lens effects, glow, depth of field, or particle fields.

## Core Directives
1. **Performance & Determinism**: Every effect pass must update its uniforms strictly via virtual time `u_time`.
2. **Seeded Particles**: Particle distributions must be initialized using seeded PRNG (Mulberry32). Positions and velocities must be computed deterministically so seeking to any frame yields exact particle positions.
3. **Subtle Cinematic Polish**:
   - Chromatic Aberration: Very subtle offset (0.001–0.002 max) on high-contrast edges.
   - Bloom / Glow: High threshold (0.7–0.85) to prevent blowing out typography or logos.
   - Film Grain: Seeded noise texture to eliminate 8-bit banding on dark gradients.
