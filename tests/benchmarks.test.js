import fs from 'fs';
import path from 'path';
import { SceneCompiler } from '../src/compiler/compiler.js';

async function runBenchmarkTests() {
  console.log('=== Motion Studio Canonical Benchmark Compilation Suite ===');

  const compiler = new SceneCompiler();
  const benchmarksDir = path.resolve('examples/benchmarks');
  const benchmarkFiles = fs.readdirSync(benchmarksDir).filter(f => f.endsWith('.json')).sort();

  console.log(`Found ${benchmarkFiles.length} canonical benchmark manifests:\n`);

  for (const file of benchmarkFiles) {
    const manifestPath = path.join(benchmarksDir, file);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const outputDir = path.resolve(`examples/compiled/${manifest.id}`);

    const result = compiler.compile(manifest, outputDir);
    console.log(`✓ Compiled: [${manifest.id}]`);
    console.log(`    Title:      ${manifest.meta?.title}`);
    console.log(`    Canvas:     ${result.width}x${result.height} @ ${result.fps}fps (${result.duration}s)`);
    console.log(`    Components: ${result.componentCount}`);
    console.log(`    Output:     ${result.htmlPath}`);
  }

  console.log('\n=== All 7 Canonical Benchmark Compositions Compiled Successfully! ===\n');
}

runBenchmarkTests().catch(err => {
  console.error('[FATAL] Benchmark compilation failed:', err);
  process.exit(1);
});
