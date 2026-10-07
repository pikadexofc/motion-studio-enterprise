import { VisualInspector } from '../src/engine/inspector.js';
import { PNG } from 'pngjs';

async function testVisualQA() {
  console.log('=== Motion Studio Visual QA Engine Test ===');

  // 1. Synthetic Blank Black Frame (must fail)
  const blankPng = new PNG({ width: 200, height: 200 });
  for (let i = 0; i < blankPng.data.length; i += 4) {
    blankPng.data[i] = 0;     // R
    blankPng.data[i + 1] = 0; // G
    blankPng.data[i + 2] = 0; // B
    blankPng.data[i + 3] = 255; // A
  }
  const blankBuf = PNG.sync.write(blankPng);
  const blankAnalysis = VisualInspector.analyzeFrame(blankBuf, 'test_blank.png');

  console.log('[Test] Blank Frame Analysis Result:', blankAnalysis);
  if (blankAnalysis.passed || !blankAnalysis.flags.includes('BLANK_BLACK_FRAME')) {
    throw new Error('Visual Inspector failed to detect blank black frame defect!');
  }
  console.log('[Test PASSED] Blank frame defect correctly identified and flagged.');

  // 2. Synthetic High-Contrast Structured Frame (must pass)
  const validPng = new PNG({ width: 200, height: 200 });
  for (let y = 0; y < 200; y++) {
    for (let x = 0; x < 200; x++) {
      const idx = (y * 200 + x) * 4;
      const isStripe = (x + y) % 20 < 10;
      validPng.data[idx] = isStripe ? 240 : 15;
      validPng.data[idx + 1] = isStripe ? 180 : 30;
      validPng.data[idx + 2] = isStripe ? 60 : 70;
      validPng.data[idx + 3] = 255;
    }
  }
  const validBuf = PNG.sync.write(validPng);
  const validAnalysis = VisualInspector.analyzeFrame(validBuf, 'test_valid.png');

  console.log('[Test] Structured Frame Analysis Result:', validAnalysis);
  if (!validAnalysis.passed) {
    throw new Error('Visual Inspector falsely rejected structured valid frame!');
  }
  console.log('[Test PASSED] Valid structured frame correctly passed inspection.');
}

testVisualQA().catch(err => {
  console.error('[FATAL] Visual QA test failed:', err);
  process.exit(1);
});
