---
name: timeline-engineering
description: Frame-accurate virtual time coordination, delta calculations, multi-runtime synchronization, and seek mechanics.
---

# Timeline Engineering

## Activation
Activate when constructing the virtual time harness, coordinating animations across DOM, SVG, and WebGL, or implementing deterministic frame seeks.

## Principles of Virtual Time
1. **Clock Ownership**: The engine owns the clock. Never allow libraries to manage their own tick loops.
2. **Absolute Time vs Delta**: Prefer absolute time $t$ (seconds) over accumulated delta time $dt$. Accumulated floating-point deltas drift over thousands of frames; absolute time functions $f(t)$ are strictly deterministic.
3. **Synchronous Resolution**: When `seek(t)` is invoked:
   - GSAP timeline advances synchronously to `t`.
   - Three.js computes object transforms at `t` and triggers `renderer.render()`.
   - Shaders receive `u_time = t`.
   - Promise or flag returns only when all draw commands have completed.

## Implementation Pattern
```javascript
export class VirtualTimeline {
  constructor() {
    this.receivers = [];
  }
  register(receiver) {
    this.receivers.push(receiver);
  }
  seek(t, frameIndex) {
    for (const r of this.receivers) {
      r.seek(t, frameIndex);
    }
  }
}
```

## Validation
Seeking backward and forward between random timestamps (e.g. $t=2.5 \rightarrow t=0.5 \rightarrow t=2.5$) must produce identical visual states.
