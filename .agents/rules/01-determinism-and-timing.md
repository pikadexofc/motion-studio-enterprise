# Rule 01: Determinism & Virtual Time Invariants

**Scope**: All animation scripts, composition templates, render engines, and scene generators.

## 1. Absolute Ban on Wall-Clock Timers
Never use wall-clock timing mechanisms in renderable compositions.
- **BANNED**: `Date.now()`, `performance.now()`, `new Date()`.
- **BANNED**: `requestAnimationFrame(loop)` without an external virtual time driver.
- **BANNED**: `setTimeout()`, `setInterval()` for timing animation states.
- **BANNED**: CSS transitions or animations running on `animation-duration` without explicit step control or paused scrubbing.

## 2. The Universal Seek Contract
Every visual composition must implement:
```javascript
window.renderFrame = function(timeInSeconds, frameIndex) {
  // Synchronously position all elements for timeInSeconds
  // Force WebGL rendering pass
  // Return boolean true when frame buffer is complete
  return true;
};
```
When `renderFrame(t, frameIndex)` is called:
1. GSAP timelines must execute `.seek(t, false)`.
2. Three.js scenes must update cameras, meshes, and uniforms based on $t$, and invoke `renderer.render(scene, camera)`.
3. Canvas contexts must clear and redraw synchronously.

## 3. Seeded Pseudo-Randomness Only
- **BANNED**: Unseeded `Math.random()`.
- **MANDATORY**: Use the deterministic PRNG engine (`Mulberry32`) with an explicit scene seed:
```javascript
import { createPRNG } from './engine/prng.js';
const prng = createPRNG(sceneConfig.seed || 1337);
const randomVal = prng.next(); // [0, 1)
```

## 4. Asset Preloading Verification
Before seeking to $t=0$, the scene must resolve:
1. `document.fonts.ready`
2. All `<img>`, `<video>`, and SVG assets
3. All WebGL textures and shader compilations
