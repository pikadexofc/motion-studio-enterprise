---
name: threejs-motion
description: Procedural 3D scene construction, deterministic update loops, lighting hierarchies, glassmorphism, and camera animation in Three.js.
---

# Three.js Deterministic 3D Motion

## Activation
Activate when creating 3D product stages, floating glass cards, procedural geometric structures, spatial lighting, and camera paths.

## Principles of Deterministic 3D
1. **No RAF Loop in Production**: Disable `requestAnimationFrame`. Instead, provide an `updateScene(t)` method invoked on each frame capture.
2. **Deterministic Camera Paths**: Calculate camera position and lookAt as mathematical functions of time $t$ or interpolate via smooth bezier curves.
3. **Lighting Hierarchy**:
   - **Key Light**: High intensity, cast soft directional shadow.
   - **Fill Light**: Low intensity, complementary color, softens deep shadows.
   - **Rim / Edge Light**: Placed behind objects to separate dark geometry from dark backgrounds.
4. **Physical Materials**: Use `MeshPhysicalMaterial` with controlled `roughness` (0.1–0.3), `metalness` (0.1–0.5), `transmission` (0.8–0.95 for glass), and `ior` (1.4–1.5).

## Synchronous Render Interface
```javascript
export function setup3DStage(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1920 / 1080, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(1920, 1080);
  renderer.setPixelRatio(1);

  return {
    render(t) {
      // Procedural animations driven strictly by t
      cube.rotation.y = t * 0.4;
      camera.position.x = Math.sin(t * 0.2) * 1.5;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
  };
}
```

## Validation
Verify WebGL context initializes without warnings, shaders compile without error, and frame render completes synchronously.
