/**
 * 3D Motion Component: ProductCard
 * Floating 3D extruded glassmorphic slate / product device plane.
 */
export const ProductCard = {
  id: 'ProductCard',
  version: '1.0.0',
  category: 'product',
  dimension: '3d',
  runtime: 'webgl-three',
  description: 'Floating 3D extruded card / device mockup slate with bevels and specular edge highlights.',
  complexity: { geometryVertices: 48, materials: 2, drawCalls: 2 },
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    width: 3.4,
    height: 2.1,
    depth: 0.08,
    color: 0x111827,
    borderColor: 0x38bdf8,
    roughness: 0.25,
    metalness: 0.6,
    initialTiltY: -0.3,
    floatSpeed: 1.2
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  buildThree(THREE, scene, camera, renderer, componentId, timing, params, motion, tokens, prng) {
    const p = { ...this.defaults, ...params };
    const group = new THREE.Group();
    group.name = componentId;

    // Extruded card body
    const cardGeo = new THREE.BoxGeometry(p.width, p.height, p.depth);
    const cardMat = new THREE.MeshStandardMaterial({
      color: p.color,
      roughness: p.roughness,
      metalness: p.metalness
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    group.add(cardMesh);

    // Border line accents
    const edgesGeo = new THREE.EdgesGeometry(cardGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: p.borderColor, linewidth: 2 });
    const edgesLine = new THREE.LineSegments(edgesGeo, edgesMat);
    group.add(edgesLine);

    group.position.y = 0.5;
    group.rotation.y = p.initialTiltY;
    scene.add(group);

    return {
      update(t, frameIndex) {
        group.position.y = 0.5 + Math.sin(t * p.floatSpeed) * 0.1;
        group.rotation.y = p.initialTiltY + Math.sin(t * 0.6) * 0.15;
        group.rotation.x = Math.cos(t * 0.5) * 0.05;
      }
    };
  }
};
