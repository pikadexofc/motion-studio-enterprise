/**
 * 3D Motion Component: PodiumStage
 * Cylindrical reflective podium stage with glowing accent ring.
 */
export const PodiumStage = {
  id: 'PodiumStage',
  version: '1.0.0',
  category: 'stage',
  dimension: '3d',
  runtime: 'webgl-three',
  description: 'Reflective circular podium stage with glowing perimeter accent ring.',
  complexity: { geometryVertices: 256, materials: 2, drawCalls: 2 },
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    radiusTop: 3.5,
    radiusBottom: 3.8,
    height: 0.3,
    yPosition: -1.2,
    stageColor: 0x0c0f17,
    ringColor: 0x38bdf8,
    roughness: 0.2,
    metalness: 0.8
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  buildThree(THREE, scene, camera, renderer, componentId, timing, params, motion, tokens, prng) {
    const p = { ...this.defaults, ...params };

    const group = new THREE.Group();
    group.name = componentId;

    // Cylinder stage mesh
    const stageGeo = new THREE.CylinderGeometry(p.radiusTop, p.radiusBottom, p.height, 64);
    const stageMat = new THREE.MeshStandardMaterial({
      color: p.stageColor,
      roughness: p.roughness,
      metalness: p.metalness
    });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = p.yPosition;
    group.add(stageMesh);

    // Glowing accent ring
    const ringGeo = new THREE.TorusGeometry(p.radiusTop + 0.1, 0.035, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: p.ringColor });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = p.yPosition + p.height / 2;
    group.add(ringMesh);

    scene.add(group);

    return {
      update(t, frameIndex) {
        // Stage stays physically grounded; ring pulses subtley
        ringMat.opacity = 0.8 + Math.sin(t * 2) * 0.2;
      }
    };
  }
};
