import fs from 'fs';
import path from 'path';
import { SceneValidator } from '../src/schema/validator.js';
import { SceneCompiler } from '../src/compiler/compiler.js';
import { globalComponentRegistry } from '../src/components/registry.js';

async function runReelTests() {
  console.log('=== Motion Studio Reel Compilation Suite ===\n');

  const manifestPath = path.resolve('examples/reels/reel-01-sydney-melbourne/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  console.log(`[Validating Manifest] ${manifest.id}`);
  const validation = SceneValidator.validate(manifest, globalComponentRegistry);
  if (!validation.valid) {
    console.error('Validation Errors:', validation.errors);
    throw new Error('Manifest validation failed');
  }
  console.log('✓ Manifest is 100% valid against schema\n');

  const compiler = new SceneCompiler(globalComponentRegistry);
  const outDir = path.resolve('examples/compiled/reel-01-sydney-melbourne');
  
  console.log(`[Compiling Scene] ${manifest.id} -> ${outDir}`);
  const result = compiler.compile(manifest, outDir);

  // Copy public assets folder into output dir for local relative path safety
  const assetsSrc = path.resolve('public/assets');
  const assetsDest = path.join(outDir, 'assets');
  if (fs.existsSync(assetsSrc)) {
    fs.cpSync(assetsSrc, assetsDest, { recursive: true });
  }

  console.log(`✓ Compiled Successfully!`);
  console.log(`  Title:      ${manifest.meta.title}`);
  console.log(`  Dimensions: ${result.width}x${result.height} (9:16 Vertical)`);
  console.log(`  Duration:   ${result.duration}s @ ${result.fps}fps`);
  console.log(`  Components: ${result.componentCount}`);
  console.log(`  Output:     ${result.htmlPath}\n`);

  console.log('=== Reel Compilation Suite Passed! ===');
}

runReelTests().catch(err => {
  console.error('[FATAL] Reel test failed:', err);
  process.exit(1);
});
