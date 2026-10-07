import fs from 'fs';
import path from 'path';
import { SceneCompiler } from '../src/compiler/compiler.js';

async function runCompilerTests() {
  console.log('=== Motion Studio Scene Graph Compiler Tests ===');

  const compiler = new SceneCompiler();
  const testManifestPath = path.resolve('examples/benchmarks/01-premium-saas-launch.json');
  const manifest = JSON.parse(fs.readFileSync(testManifestPath, 'utf8'));

  const outputDir = path.resolve('examples/compiled/test-compiler-output');
  const result = compiler.compile(manifest, outputDir);

  console.log('[Test: Compiler Execution]', result.htmlPath ? 'PASS' : 'FAIL');

  if (!fs.existsSync(result.htmlPath)) {
    throw new Error(`Compiler failed to create index.html at ${result.htmlPath}`);
  }

  const htmlContent = fs.readFileSync(result.htmlPath, 'utf8');

  // Verify HyperFrames compatibility markers
  if (!htmlContent.includes('data-composition-id="bm-01-premium-saas-launch"')) {
    throw new Error('Compiled HTML missing HyperFrames data-composition-id attribute!');
  }
  if (!htmlContent.includes('data-track-index=')) {
    throw new Error('Compiled HTML missing HyperFrames data-track-index attribute!');
  }
  if (!htmlContent.includes('window.__timelines')) {
    throw new Error('Compiled HTML missing window.__timelines registration!');
  }

  // Verify Universal Seek Hook
  if (!htmlContent.includes('window.renderFrame = function(timeInSeconds, frameIndex)')) {
    throw new Error('Compiled HTML missing universal window.renderFrame hook!');
  }

  // Verify 3D WebGL initialization
  if (!htmlContent.includes('THREE.WebGLRenderer') || !htmlContent.includes('window.__threeRender')) {
    throw new Error('Compiled HTML missing Three.js renderer initialization!');
  }

  console.log('[Test: Output Specifications]');
  console.log(`  Dimensions:  ${result.width}x${result.height}`);
  console.log(`  Duration:    ${result.duration}s @ ${result.fps}fps`);
  console.log(`  Components:  ${result.componentCount}`);
  console.log(`  3D Enabled:  ${result.has3D}`);

  console.log('=== All Scene Graph Compiler Tests Passed! ===\n');
}

runCompilerTests().catch(err => {
  console.error('[FATAL] Compiler test failed:', err);
  process.exit(1);
});
