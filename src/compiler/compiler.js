import fs from 'fs';
import path from 'path';
import { SceneValidator } from '../schema/validator.js';
import { resolveTokens } from '../tokens/index.js';
import { globalComponentRegistry } from '../components/registry.js';
import { createPRNG } from '../engine/prng.js';

/**
 * Motion Studio — Scene Graph Compiler
 * Compiles a declarative Motion Scene manifest into an executable, dual-compatible composition.
 */
export class SceneCompiler {
  constructor(options = {}) {
    this.registry = options.registry || globalComponentRegistry;
  }

  static compile(manifest, outputDir, options = {}) {
    const compiler = new SceneCompiler(options);
    return compiler.compile(manifest, outputDir, options);
  }

  static save(compiledResult, outputDir) {
    fs.mkdirSync(outputDir, { recursive: true });
    const htmlPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(htmlPath, compiledResult.fullHtml || compiledResult.html);
    return htmlPath;
  }

  /**
   * Compile a declarative manifest object into an HTML string and write to disk.
   */
  compile(manifest, outputDir, options = {}) {
    // 0. Normalize scenes to components if needed
    if (!manifest.components && manifest.scenes) {
      manifest.components = [];
      for (const sc of manifest.scenes) {
        for (const tr of sc.tracks || []) {
          manifest.components.push({
            id: tr.id,
            type: tr.componentId,
            timing: { start: sc.start, duration: sc.duration },
            layer: tr.layer || { zIndex: 1 },
            parameters: tr.parameters || {},
            tokens: tr.tokens || {}
          });
        }
      }
    }

    // 1. Schema Validation
    const valResult = SceneValidator.validate(manifest, this.registry);
    if (!valResult.valid) {
      throw new Error(`Scene manifest validation failed:\n${valResult.errors.join('\n')}`);
    }

    // 2. Token Resolution
    const tokens = resolveTokens(manifest.brand || {}, manifest.tokens || {});

    // 3. Canvas Dimensions & Aspect Ratio Calculation
    let width = manifest.canvas?.width || 1920;
    let height = manifest.canvas?.height || 1080;
    const aspectRatio = manifest.canvas?.aspectRatio || '16:9';

    if (!manifest.canvas?.width || !manifest.canvas?.height) {
      if (aspectRatio === '9:16') {
        width = 1080;
        height = 1920;
      } else if (aspectRatio === '1:1') {
        width = 1080;
        height = 1080;
      } else if (aspectRatio === '4:5') {
        width = 1080;
        height = 1350;
      }
    }

    const duration = manifest.canvas?.duration || 3.0;
    const fps = manifest.canvas?.fps || 60;
    const sceneSeed = manifest.meta?.seed || 1337;
    const prng = createPRNG(sceneSeed);

    // 4. Partition Components by Runtime
    const domComponents = [];
    const threeComponents = [];

    for (const compManifest of manifest.components) {
      const def = this.registry.get(compManifest.type);
      if (!def) {
        throw new Error(`Unknown component type: "${compManifest.type}"`);
      }
      if (def.runtime === 'webgl-three') {
        threeComponents.push({ def, manifest: compManifest });
      } else {
        domComponents.push({ def, manifest: compManifest });
      }
    }

    // 5. Generate 2D DOM Markup and CSS
    const domMarkup = [];
    const cssBlocks = [];

    domComponents.forEach(({ def, manifest: c }, idx) => {
      const p = { ...def.defaults, ...(c.parameters || {}) };
      const compTokens = resolveTokens(tokens, {}, c.tokens || {});
      const html = def.renderDOM(c.id, p, compTokens);
      const css = def.renderCSS(c.id, p, compTokens);

      const trackIndex = c.layer?.zIndex !== undefined ? c.layer.zIndex : idx + 1;
      const start = c.timing.start;
      const compDur = c.timing.duration;
      const isAbsoluteTrack = typeof c.layer === 'object' && c.layer.zIndex !== undefined;

      domMarkup.push(`
        <!-- Component Track ${trackIndex}: ${def.id} (${c.id}) -->
        <div class="hf-track" data-track-index="${trackIndex}" data-start="${start}" data-duration="${compDur}" style="${isAbsoluteTrack ? `position: absolute; inset: 0; width: 100%; height: 100%; z-index: ${trackIndex}; pointer-events: none;` : ''}">
          ${html}
        </div>
      `);
      cssBlocks.push(css);
    });

    // 6. Generate 3D WebGL Canvas & Three.js Builders
    const targetDir = outputDir ? path.resolve(outputDir) : process.cwd();
    const relToRoot = path.relative(targetDir, process.cwd()).replace(/\\/g, '/') || '.';
    const has3D = threeComponents.length > 0;
    let threeScriptCode = '';

    if (has3D) {
      const threeBuilders = threeComponents.map(({ def, manifest: c }) => {
        const p = JSON.stringify({ ...def.defaults, ...(c.parameters || {}) });
        const motion = JSON.stringify(c.motion || {});
        return `
          // 3D Component: ${def.id} (${c.id})
          (function() {
            const comp = globalComponentRegistry.get('${def.id}');
            if (comp && comp.buildThree) {
              const hook = comp.buildThree(THREE, scene, camera, renderer, '${c.id}', ${JSON.stringify(c.timing)}, ${p}, ${motion}, tokens, prng);
              if (hook && hook.update) updateHooks.push(hook.update);
            }
          })();
        `;
      }).join('\n');

      threeScriptCode = `
        import * as THREE from '${relToRoot}/node_modules/three/build/three.module.js';
        import { globalComponentRegistry } from '${relToRoot}/src/components/registry.js';
        import { createPRNG } from '${relToRoot}/src/engine/prng.js';

        const canvasContainer = document.getElementById('canvas-3d-container');
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(${tokens.colors.background.replace('#', '0x')}, 0.08);

        const camera = new THREE.PerspectiveCamera(${tokens.camera.fov}, ${width} / ${height}, ${tokens.camera.near}, ${tokens.camera.far});
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(${width}, ${height});
        renderer.setPixelRatio(1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        canvasContainer.appendChild(renderer.domElement);

        const prng = createPRNG(${sceneSeed});
        const updateHooks = [];
        const tokens = ${JSON.stringify(tokens)};

        ${threeBuilders}

        window.__threeRender = function(time, frameIndex) {
          for (let i = 0; i < updateHooks.length; i++) {
            updateHooks[i](time, frameIndex);
          }
          renderer.render(scene, camera);
        };
      `;
    }

    // 7. Generate GSAP Timeline Code for 2D Components
    const gsapInstructions = domComponents.map(({ def, manifest: c }) => {
      const p = JSON.stringify({ ...def.defaults, ...(c.parameters || {}) });
      const timing = JSON.stringify(c.timing);
      const motion = JSON.stringify(c.motion || {});
      return `
        (function() {
          const comp = globalComponentRegistry.get('${def.id}');
          if (comp && comp.buildGSAP) {
            comp.buildGSAP(tl, '${c.id}', ${timing}, ${p}, ${motion}, tokens);
          }
        })();
      `;
    }).join('\n');

    // 8. Assemble Complete Dual-Compatible HTML Document
    const hasAbsoluteTracks = domComponents.some(({ manifest: c }) => typeof c.layer === 'object' && c.layer.zIndex !== undefined);

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${manifest.meta?.title || manifest.id}</title>
  <meta name="viewport" content="width=${width}, height=${height}">
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
  <!-- GSAP Core -->
  <script src="${relToRoot}/node_modules/gsap/dist/gsap.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, html {
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      background: ${tokens.colors.background};
      font-family: ${tokens.typography.fontBody};
      color: ${tokens.colors.textPrimary};
      -webkit-font-smoothing: antialiased;
    }

    .composition-root {
      position: relative;
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .ambient-glow-layer {
      position: absolute;
      width: ${Math.round(width * 0.7)}px;
      height: ${Math.round(width * 0.7)}px;
      border-radius: 50%;
      background: radial-gradient(circle, ${tokens.colors.primary}44 0%, ${tokens.colors.accent}22 45%, transparent 70%);
      filter: blur(80px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;
    }

    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 80px 80px;
      z-index: 2;
    }

    #canvas-3d-container {
      position: absolute;
      inset: 0;
      width: ${width}px;
      height: ${height}px;
      z-index: 5;
      pointer-events: none;
    }

    .hf-track {
      position: relative;
      width: 100%;
    }

    ${cssBlocks.join('\n')}
  </style>
</head>
<body>
  <div 
    id="root" 
    class="composition-root"
    data-composition-id="${manifest.id}"
    data-start="0"
    data-duration="${duration}"
    data-width="${width}"
    data-height="${height}"
  >
    <div class="ambient-glow-layer" id="ambientGlow"></div>
    <div class="grid-overlay"></div>
    ${has3D ? '<div id="canvas-3d-container"></div>' : ''}

    <div class="content-wrapper" style="${hasAbsoluteTracks ? 'position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;' : 'position: relative; z-index: 15; width: 100%; display: flex; flex-direction: column; align-items: center; padding: 40px;'}">
      ${domMarkup.join('\n')}
    </div>
  </div>

  ${has3D ? `<script type="module">${threeScriptCode}</script>` : ''}

  <script type="module">
    import { globalComponentRegistry } from '${relToRoot}/src/components/registry.js';

    const tokens = ${JSON.stringify(tokens)};
    const tl = gsap.timeline({ paused: true });

    // Ambient background entrance
    tl.fromTo('#ambientGlow', 
      { scale: 0.9, opacity: 0.5 },
      { scale: 1.25, opacity: 0.85, duration: ${duration * 0.9}, ease: 'sine.out' },
      0.0
    );

    // Injected component GSAP builders
    ${gsapInstructions}

    // HyperFrames and Universal Seek Hooks
    window.__timelines = window.__timelines || {};
    window.__timelines['main'] = tl;
    window.__timelines['${manifest.id}'] = tl;

    window.renderFrame = function(timeInSeconds, frameIndex) {
      tl.seek(timeInSeconds, false);
      if (window.__threeRender) {
        window.__threeRender(timeInSeconds, frameIndex);
      }
      return true;
    };

    // Auto-preview loop in standard browser window
    if (!window.navigator.userAgent.includes('HeadlessChrome') && !window.navigator.webdriver) {
      let startTime = null;
      function previewLoop(now) {
        if (!startTime) startTime = now;
        const elapsed = ((now - startTime) / 1000) % ${duration};
        window.renderFrame(elapsed, Math.round(elapsed * ${fps}));
        requestAnimationFrame(previewLoop);
      }
      requestAnimationFrame(previewLoop);
    }
  </script>
</body>
</html>`;

    // 9. Write outputs to disk
    if (outputDir) {
      fs.mkdirSync(outputDir, { recursive: true });
      const htmlPath = path.join(outputDir, 'index.html');
      fs.writeFileSync(htmlPath, fullHtml);

      const manifestPath = path.join(outputDir, 'manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

      return {
        outputDir,
        htmlPath,
        manifestPath,
        fullHtml,
        html: fullHtml,
        width,
        height,
        duration,
        fps,
        componentCount: manifest.components.length,
        has3D
      };
    }

    return { fullHtml, html: fullHtml, width, height, duration, fps };
  }
}
