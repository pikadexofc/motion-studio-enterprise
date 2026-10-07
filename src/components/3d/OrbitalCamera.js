/**
 * 3D Motion Component: OrbitalCamera
 * Parametric cinematic camera trajectory with target tracking.
 */
export const OrbitalCamera = {
  id: 'OrbitalCamera',
  version: '1.0.0',
  category: 'camera',
  dimension: '3d',
  runtime: 'webgl-three',
  description: 'Cinematic camera rig with parametric path trajectory, lookAt tracking, and drift curves.',
  complexity: { drawCalls: 0, memory: 'none' },
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    orbitSpeed: 0.35,
    orbitRadiusX: 4.2,
    orbitRadiusY: 0.6,
    initialZ: 5.4,
    zAdvanceSpeed: 0.25,
    targetY: 0.3,
    fov: 45
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  buildThree(THREE, scene, camera, renderer, componentId, timing, params, motion, tokens, prng) {
    const p = { ...this.defaults, ...params };

    camera.fov = p.fov;
    camera.updateProjectionMatrix();

    return {
      update(t, frameIndex) {
        camera.position.x = Math.sin(t * p.orbitSpeed) * p.orbitRadiusX;
        camera.position.y = 1.0 + Math.cos(t * (p.orbitSpeed * 0.75)) * p.orbitRadiusY;
        camera.position.z = p.initialZ - t * p.zAdvanceSpeed;
        camera.lookAt(0, p.targetY, 0);
      }
    };
  }
};
