/**
 * 3D Motion Component: ProceduralArtifact
 * Complex multi-layer 3D geometric artifact with physical glass and metallic shaders.
 */
export const ProceduralArtifact = {
  id: 'ProceduralArtifact',
  version: '1.0.0',
  category: 'hero-object',
  dimension: '3d',
  runtime: 'webgl-three',
  description: 'Multi-layer geometric artifact featuring refractive glass shell, metallic core, and orbital rings.',
  complexity: { geometryVertices: 480, materials: 3, drawCalls: 4 },
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    outerShape: 'icosahedron', // 'icosahedron' | 'octahedron' | 'dodecahedron'
    outerRadius: 1.4,
    innerRadius: 0.7,
    roughness: 0.1,
    transmission: 0.9,
    ior: 1.45,
    glassColor: 0x60a5fa,
    coreColor: 0x38bdf8,
    ring1Color: 0x818cf8,
    ring2Color: 0x22d3ee,
    floatSpeed: 1.5,
    floatAmp: 0.15,
    rotationSpeedX: 0.45,
    rotationSpeedY: 0.6
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  buildThree(THREE, scene, camera, renderer, componentId, timing, params, motion, tokens, prng) {
    const p = { ...this.defaults, ...params };
    const group = new THREE.Group();
    group.name = componentId;

    // 1. Outer Glass Shell
    let outerGeo;
    if (p.outerShape === 'octahedron') outerGeo = new THREE.OctahedronGeometry(p.outerRadius, 0);
    else if (p.outerShape === 'dodecahedron') outerGeo = new THREE.DodecahedronGeometry(p.outerRadius, 0);
    else outerGeo = new THREE.IcosahedronGeometry(p.outerRadius, 0);

    const outerMat = new THREE.MeshPhysicalMaterial({
      color: p.glassColor,
      roughness: p.roughness,
      metalness: 0.1,
      transmission: p.transmission,
      ior: p.ior,
      reflectivity: 0.9,
      transparent: true,
      opacity: 0.85
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // 2. Inner Metallic Core
    const innerGeo = new THREE.OctahedronGeometry(p.innerRadius, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: p.coreColor,
      roughness: 0.15,
      metalness: 0.9,
      emissive: p.coreColor,
      emissiveIntensity: 0.35
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Orbital Rings
    const orbitRingGeo1 = new THREE.TorusGeometry(p.outerRadius * 1.5, 0.025, 16, 80);
    const orbitRingMat1 = new THREE.MeshStandardMaterial({ color: p.ring1Color, roughness: 0.3, metalness: 0.8 });
    const ring1 = new THREE.Mesh(orbitRingGeo1, orbitRingMat1);
    group.add(ring1);

    const orbitRingGeo2 = new THREE.TorusGeometry(p.outerRadius * 1.8, 0.02, 16, 80);
    const orbitRingMat2 = new THREE.MeshStandardMaterial({ color: p.ring2Color, roughness: 0.3, metalness: 0.8 });
    const ring2 = new THREE.Mesh(orbitRingGeo2, orbitRingMat2);
    group.add(ring2);

    scene.add(group);

    return {
      update(t, frameIndex) {
        // Floating hover
        group.position.y = 0.4 + Math.sin(t * p.floatSpeed) * p.floatAmp;

        // Counter rotations
        outerMesh.rotation.x = t * p.rotationSpeedX;
        outerMesh.rotation.y = t * p.rotationSpeedY;
        innerMesh.rotation.x = -t * (p.rotationSpeedX * 1.2);
        innerMesh.rotation.y = -t * (p.rotationSpeedY * 0.9);

        ring1.rotation.x = t * 0.8;
        ring1.rotation.y = t * 0.5;
        ring2.rotation.x = -t * 0.6;
        ring2.rotation.z = t * 0.4;
      }
    };
  }
};
