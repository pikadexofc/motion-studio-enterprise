/**
 * 3D Motion Component: ParticleField
 * Deterministic seeded particle cloud with mathematical orbital drift.
 */
export const ParticleField = {
  id: 'ParticleField',
  version: '1.0.0',
  category: 'effects',
  dimension: '3d',
  runtime: 'webgl-three',
  description: 'Deterministic particle cloud driven by seeded PRNG with zero temporal drift.',
  complexity: { particleCount: 200, drawCalls: 1 },
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    count: 180,
    size: 0.055,
    color: 0x7dd3fc,
    radiusMin: 1.8,
    radiusMax: 5.5,
    heightSpread: 3.5,
    driftSpeed: 0.15,
    seed: 4289
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  buildThree(THREE, scene, camera, renderer, componentId, timing, params, motion, tokens, prng) {
    const p = { ...this.defaults, ...params };
    const count = p.count;

    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const baseRadii = new Float32Array(count);
    const baseAngles = new Float32Array(count);
    const baseHeights = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      baseRadii[i] = p.radiusMin + prng.next() * (p.radiusMax - p.radiusMin);
      baseAngles[i] = prng.next() * Math.PI * 2;
      baseHeights[i] = -1.0 + prng.next() * p.heightSpread;

      positions[i * 3] = Math.cos(baseAngles[i]) * baseRadii[i];
      positions[i * 3 + 1] = baseHeights[i];
      positions[i * 3 + 2] = Math.sin(baseAngles[i]) * baseRadii[i];
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: p.color,
      size: p.size,
      transparent: true,
      opacity: 0.75
    });

    const pointsMesh = new THREE.Points(particleGeo, particleMat);
    pointsMesh.name = componentId;
    scene.add(pointsMesh);

    return {
      update(t, frameIndex) {
        const posAttr = particleGeo.attributes.position;
        for (let i = 0; i < count; i++) {
          const angle = baseAngles[i] + t * (p.driftSpeed + (i % 5) * 0.02);
          const r = baseRadii[i];
          const h = baseHeights[i] + Math.sin(t * 1.2 + i) * 0.2;
          posAttr.setXYZ(i, Math.cos(angle) * r, h, Math.sin(angle) * r);
        }
        posAttr.needsUpdate = true;
      }
    };
  }
};
