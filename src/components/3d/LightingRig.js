/**
 * 3D Motion Component: LightingRig
 * Studio multi-point lighting hierarchy (Key, Fill, Rim, Ambient) with orbital motion.
 */
export const LightingRig = {
  id: 'LightingRig',
  version: '1.0.0',
  category: 'lighting',
  dimension: '3d',
  runtime: 'webgl-three',
  description: 'Multi-point studio lighting setup providing directional key, cyan fill, and indigo rim separation.',
  complexity: { lightsCount: 4, shadowsEnabled: false },
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    ambientColor: 0x0a101d,
    ambientIntensity: 2.0,
    keyColor: 0xffffff,
    keyIntensity: 4.0,
    fillColor: 0x06b6d4,
    fillIntensity: 5.0,
    rimColor: 0x6366f1,
    rimIntensity: 7.0,
    orbitLights: true
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  buildThree(THREE, scene, camera, renderer, componentId, timing, params, motion, tokens, prng) {
    const p = { ...this.defaults, ...params };

    const ambientLight = new THREE.AmbientLight(p.ambientColor, p.ambientIntensity);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(p.keyColor, p.keyIntensity);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(p.fillColor, p.fillIntensity, 25);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(p.rimColor, p.rimIntensity, 25);
    rimLight.position.set(3, -2, -4);
    scene.add(rimLight);

    return {
      update(t, frameIndex) {
        if (p.orbitLights) {
          fillLight.position.x = Math.sin(t * 0.8) * 6;
          fillLight.position.z = Math.cos(t * 0.8) * 6;
        }
      }
    };
  }
};
