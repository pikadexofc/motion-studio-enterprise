/**
 * 3D Motion Component: GlassSurface
 * Floating refractive glass pane / physical boundary plane.
 */
export const GlassSurface = {
  id: 'GlassSurface',
  version: '1.0.0',
  category: 'surfaces',
  dimension: '3d',
  runtime: 'webgl-three',
  description: 'Physical glass pane with transmission, roughness, and subtle refraction highlights.',
  complexity: { geometryVertices: 4, materials: 1, drawCalls: 1 },
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    width: 6.0,
    height: 3.5,
    yPosition: -0.2,
    rotationX: -Math.PI / 3,
    color: 0xffffff,
    roughness: 0.12,
    transmission: 0.88,
    ior: 1.45,
    opacity: 0.8
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  buildThree(THREE, scene, camera, renderer, componentId, timing, params, motion, tokens, prng) {
    const p = { ...this.defaults, ...params };

    const planeGeo = new THREE.PlaneGeometry(p.width, p.height);
    const planeMat = new THREE.MeshPhysicalMaterial({
      color: p.color,
      roughness: p.roughness,
      metalness: 0.1,
      transmission: p.transmission,
      ior: p.ior,
      transparent: true,
      opacity: p.opacity
    });

    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.name = componentId;
    mesh.position.y = p.yPosition;
    mesh.rotation.x = p.rotationX;
    scene.add(mesh);

    return {
      update(t, frameIndex) {
        mesh.rotation.z = Math.sin(t * 0.5) * 0.05;
      }
    };
  }
};
