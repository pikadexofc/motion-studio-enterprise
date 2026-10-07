import fs from 'fs';
import path from 'path';
import { AutonomousMotionOrchestrator } from '../src/agents/Orchestrator.js';

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    brand: 'examples/brands/apexcloud-ai.json',
    output: 'examples/compiled/apexcloud-ai-launch',
    threshold: 95.0,
    maxIterations: 5
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--brand' && args[i + 1]) options.brand = args[++i];
    else if (args[i] === '--output' && args[i + 1]) options.output = args[++i];
    else if (args[i] === '--threshold' && args[i + 1]) options.threshold = parseFloat(args[++i]);
    else if (args[i] === '--max-iterations' && args[i + 1]) options.maxIterations = parseInt(args[++i], 10);
  }

  return options;
}

async function main() {
  const options = parseArgs();
  const brandPath = path.resolve(options.brand);

  if (!fs.existsSync(brandPath)) {
    console.error(`❌ Error: Brand intake file not found: ${brandPath}`);
    process.exit(1);
  }

  const brandData = JSON.parse(fs.readFileSync(brandPath, 'utf8'));

  const orchestrator = new AutonomousMotionOrchestrator({
    threshold: options.threshold,
    maxIterations: options.maxIterations
  });

  const result = await orchestrator.runProductionLoop(brandData, options.output);

  console.log('\n======================================================');
  console.log('📊 MULTI-AGENT WORKFLOW FINAL SCORECARD');
  console.log('======================================================');
  console.log(`Company:       ${brandData.company?.name}`);
  console.log(`Status:        ${result.success ? '✅ APPROVED FOR PRODUCTION' : '❌ REJECTED'}`);
  console.log(`Final Quality: ${result.finalScore}% (Target: ${options.threshold}%)`);
  console.log(`Iterations:    ${result.iterationsCompleted} cycles`);
  console.log('------------------------------------------------------');
  console.log('Sprint Progression:');
  for (const s of result.runHistory) {
    const icon = s.passed ? '✅' : '🔄';
    console.log(`  ${icon} Sprint ${s.iteration}: ${s.score}% (${s.deficienciesCount} defects flagged)`);
  }
  console.log('======================================================');

  if (result.savedPath) {
    console.log(`\n🎉 Final HTML composition deployed to:\n   ${result.savedPath}`);
  }

  if (!result.success) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal workflow error:', err);
  process.exit(1);
});
