---
name: shader-motion
description: Authoring GLSL fragment and vertex shaders driven by deterministic virtual time uniforms.
---

# Shader Motion

## Activation
Activate when authoring custom GLSL fragment/vertex shaders for backgrounds, procedural gradients, liquid distortion, or holographic surfaces.

## Key Uniforms Standard
```glsl
uniform float u_time;        // Virtual time in seconds
uniform vec2 u_resolution;   // Viewport dimensions (e.g. 1920.0, 1080.0)
uniform vec3 u_color_a;      // Primary brand color
uniform vec3 u_color_b;      // Accent brand color
```

## Best Practices
- Never use uninitialized uniforms.
- Pre-compile shaders during initialization before beginning frame capture.
- Standardize UV coordinates: `vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;` for aspect-ratio-corrected procedural patterns.
