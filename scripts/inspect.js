import { VisualInspector } from '../src/engine/inspector.js';

function parseArgs() {
  const args = process.argv.slice(2);
  let snapshotsDir = 'render-tests/snapshots';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--snapshots' && args[i + 1]) {
      snapshotsDir = args[++i];
    }
  }
  return { snapshotsDir };
}

async function main() {
  const { snapshotsDir } = parseArgs();
  console.log(`--- Motion Studio Visual Inspector ---`);
  console.log(`Analyzing snapshots in: ${snapshotsDir}\n`);

  const report = VisualInspector.analyzeDirectory(snapshotsDir);

  console.log(`Total Frames Inspected: ${report.totalFrames}`);
  console.log(`Overall Quality Status: ${report.allPassed ? 'ALL PASSED (100%)' : 'DEFECTS DETECTED'}\n`);

  for (const frame of report.frames) {
    console.log(`[Frame ${frame.frame}]`);
    console.log(`  Dimensions:       ${frame.dimensions.width}x${frame.dimensions.height}`);
    console.log(`  Mean Luminance:   ${frame.meanLuminance}`);
    console.log(`  Std Dev:          ${frame.stdDev}`);
    console.log(`  Color Diversity:  ${frame.colorDiversity}`);
    console.log(`  Status:           ${frame.passed ? 'PASS' : 'FAIL'}`);
    if (frame.flags.length > 0) {
      console.log(`  Flags:            ${frame.flags.join(', ')}`);
    }
    console.log('');
  }

  if (report.sequenceTransitions && report.sequenceTransitions.length > 0) {
    console.log('--- Temporal Continuity & Motion Density ---');
    for (const trans of report.sequenceTransitions) {
      console.log(`  Transition ${trans.step}: Mean Delta=${trans.meanDelta}, Motion Density=${trans.motionDensityPct}%, Discontinuity=${trans.isDiscontinuity}`);
    }
    console.log('');
  }

  if (report.creativeObservations && report.creativeObservations.length > 0) {
    console.log('--- Creative Observations & Staging Analysis ---');
    for (const obs of report.creativeObservations) {
      console.log(`  [${obs.category.toUpperCase()}] ${obs.observation}`);
    }
    console.log('');
  }

  if (!report.allPassed) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Inspector error:', err);
  process.exit(1);
});
