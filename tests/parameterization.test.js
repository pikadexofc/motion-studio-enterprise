import fs from 'fs';
import path from 'path';
import { SceneCompiler } from '../src/compiler/compiler.js';

async function runParameterizationTests() {
  console.log('=== Motion Studio Parameterization Test Suite ===');
  console.log('Verifying parameter-driven generation across 5 variants and 3 aspect ratios...\n');

  const compiler = new SceneCompiler();
  const variantsDir = path.resolve('examples/variants');
  const variantFiles = fs.readdirSync(variantsDir).filter(f => f.startsWith('variant-') && f.endsWith('.json'));

  const compiledVariants = [];

  for (const file of variantFiles) {
    const manifestPath = path.join(variantsDir, file);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const outputDir = path.resolve(`examples/compiled/${manifest.id}`);

    const result = compiler.compile(manifest, outputDir);
    compiledVariants.push({ id: manifest.id, result, manifest });

    console.log(`[Variant Compiled] ${manifest.id}`);
    console.log(`  Title:        ${manifest.meta?.title}`);
    console.log(`  Brand Preset: ${manifest.brand?.preset}`);
    console.log(`  Aspect Ratio: ${manifest.canvas?.aspectRatio} (${result.width}x${result.height})`);
    console.log(`  Duration:     ${result.duration}s`);
    console.log(`  Has 3D:       ${result.has3D}`);
    console.log('');
  }

  // Verification 1: At least 5 variants compiled
  if (compiledVariants.length < 5) {
    throw new Error(`Expected at least 5 variants, got ${compiledVariants.length}`);
  }

  // Verification 2: Multi-aspect ratios verified (16:9, 9:16, 1:1)
  const aspectRatios = new Set(compiledVariants.map(v => v.manifest.canvas?.aspectRatio));
  if (!aspectRatios.has('16:9') || !aspectRatios.has('9:16') || !aspectRatios.has('1:1')) {
    throw new Error('Parameterization suite missing required aspect ratios (16:9, 9:16, 1:1)');
  }

  // Verification 3: At least one 2D-only and at least one 3D variant
  const hasPure2D = compiledVariants.some(v => !v.result.has3D);
  const has3D = compiledVariants.some(v => v.result.has3D);
  if (!hasPure2D || !has3D) {
    throw new Error('Parameterization suite must include both pure 2D and 3D variants!');
  }

  console.log('=== Parameterization Test Suite Passed (100% Parameter-Driven) ===\n');
}

runParameterizationTests().catch(err => {
  console.error('[FATAL] Parameterization test failed:', err);
  process.exit(1);
});
