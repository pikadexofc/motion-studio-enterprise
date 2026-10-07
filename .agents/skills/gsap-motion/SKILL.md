---
name: gsap-motion
description: Paused deterministic GSAP timeline authoring, 2D kinetic typography, SVG path animation, and seek integration.
---

# GSAP Deterministic Motion

## Activation
Activate when scripting 2D animations, kinetic typography, DOM card transitions, SVG path morphs, or coordinate transforms using GSAP.

## Golden Rules
1. **Always Paused**: Always construct timelines with `{ paused: true }`:
   ```javascript
   const tl = gsap.timeline({ paused: true });
   ```
2. **Deterministic Seek**: Expose the timeline to the virtual seek interface:
   ```javascript
   window.renderFrame = (time) => {
     tl.seek(time, false); // suppressEvents: false ensures triggers execute
     return true;
   };
   ```
3. **Hardware Acceleration**: Animate `x`, `y`, `scale`, `rotation`, `opacity`. Avoid animating layout properties like `top`, `left`, `width`, `height` which cause browser layout reflows during frame capture.
4. **Transform Origin**: Explicitly declare `transformOrigin: "center center"` or specific pivot points to prevent unexpected jumps.

## Example: Kinetic Typography Entrance
```javascript
tl.from(".word", {
  y: 40,
  opacity: 0,
  rotateX: -30,
  stagger: 0.06,
  duration: 0.8,
  ease: "power3.out"
}, 0.2);
```

## Validation
Verify in headless capture that characters do not jitter, blur inappropriately, or clip across bounds during staggered reveals.
