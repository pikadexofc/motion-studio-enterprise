import { MotionRenderer } from '../src/engine/renderer.js';
import { VisualInspector } from '../src/engine/inspector.js';

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    scene: 'examples/2d-brand-launch/index.html',
    output: 'render-tests/output.mp4',
    fps: 60,
    duration: 3.0,
    width: 1920,
    height: 1080
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--scene' && args[i + 1]) options.scene = args[++i];
    else if (args[i] === '--output' && args[i + 1]) options.output = args[++i];
    else if (args[i] === '--fps' && args[i + 1]) options.fps = parseInt(args[++i], 10);
    else if (args[i] === '--duration' && args[i + 1]) options.duration = parseFloat(args[++i]);
    else if (args[i] === '--width' && args[i + 1]) options.width = parseInt(args[++i], 10);
    else if (args[i] === '--height' && args[i + 1]) options.height = parseInt(args[++i], 10);
  }

  return options;
}

async function main() {
  const options = parseArgs();
  console.log('--- Motion Studio Renderer CLI ---');
  console.log(`Scene:    ${options.scene}`);
  console.log(`Output:   ${options.output}`);
  console.log(`Format:   ${options.width}x${options.height} @ ${options.fps}fps (${options.duration}s)`);

  const renderer = new MotionRenderer({
    width: options.width,
    height: options.height,
    fps: options.fps,
    duration: options.duration
  });

  const result = await renderer.render(options.scene, options.output, {
    fps: options.fps,
    duration: options.duration
  });

  console.log('\n--- Automated Visual QA Verification ---');
  for (const snap of result.snapshots) {
    const analysis = VisualInspector.analyzeFrame(snap.path, snap.path);
    const statusText = analysis.passed ? 'PASS' : 'FAIL';
    console.log(`[VQA] ${analysis.frame}: ${statusText} (Luminance: ${analysis.meanLuminance}, StdDev: ${analysis.stdDev}, Colors: ${analysis.colorDiversity})`);
    if (!analysis.passed) {
      console.warn(`      Flags: ${analysis.flags.join(', ')}`);
    }
  }

  console.log('Done!');
}

main().catch(err => {
  console.error('Fatal render error:', err);
  process.exit(1);
});
