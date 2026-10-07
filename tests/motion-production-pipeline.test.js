import assert from 'assert';
import path from 'path';
import fs from 'fs';
import { verifyFirstFrame } from '../scripts/verify_first_frame.js';
import { MotionCriticAgent } from '../scripts/critic_agent.js';
import { OpenCutExporter } from '../scripts/export_opencut.js';
import { ImageAssetManager } from '../scripts/image_asset_manager.js';
import { SoundDesigner } from '../scripts/sound_designer.js';

console.log('=== Motion Production Pipeline Verification Suite ===\n');

async function runTests() {
  const scenePath = 'examples/compiled/focusflow-brag-launch/index.html';

  // Test 1: First Frame Static Verification
  console.log('[Test 1] Running First-Frame Static Composition Audit...');
  const firstFrameResult = await verifyFirstFrame(scenePath);
  assert.strictEqual(firstFrameResult.success, true, 'First frame audit must succeed');
  assert.ok(fs.existsSync(firstFrameResult.screenshotPath), 'First frame screenshot must exist on disk');
  assert.ok(firstFrameResult.audit.elementCount > 50, 'Scene must have high DOM element density');
  assert.ok(parseFloat(firstFrameResult.audit.fontSizeRange.ratio) >= 4.0, 'Typography scale contrast must be >= 4.0x');
  console.log('✓ [Test 1 PASSED] First-Frame static composition passed with high density and typography contrast.\n');

  // Test 2: Autonomous 95% Critic Agent
  console.log('[Test 2] Running Autonomous 95% Motion Critic Audit...');
  const critic = new MotionCriticAgent();
  const criticResult = await critic.evaluate(scenePath, {
    sfxCues: [
      { time: 1.10, sfx: 'click' },
      { time: 1.25, sfx: 'shatter' },
      { time: 3.00, sfx: 'click' },
      { time: 4.20, sfx: 'keypress' },
      { time: 5.40, sfx: 'switch' },
      { time: 5.60, sfx: 'chime' },
      { time: 8.20, sfx: 'click' }
    ]
  });
  assert.ok(criticResult.totalScore >= 95, `Critic score must be >= 95%, received ${criticResult.totalScore}%`);
  assert.strictEqual(criticResult.passed, true, 'Critic status must be PASSED');
  console.log(`✓ [Test 2 PASSED] Motion Critic passed with ${criticResult.totalScore}% (>= 95% threshold).\n`);

  // Test 3: OpenCut Project Exporter
  console.log('[Test 3] Running OpenCut Interoperability Exporter...');
  const testOutJson = path.resolve('render-tests/test-opencut-export.json');
  const project = OpenCutExporter.exportProject({
    title: 'FocusFlow Verification Test',
    width: 1080,
    height: 1920,
    fps: 30,
    duration: 10.0,
    videoSource: 'render-tests/focusflow-brag-promo.mp4',
    sfxCues: [{ time: 1.0, sfx: 'click.ogg' }]
  }, testOutJson);
  assert.ok(fs.existsSync(testOutJson), 'OpenCut project JSON must exist');
  assert.strictEqual(project.metadata.title, 'FocusFlow Verification Test');
  assert.strictEqual(project.tracks.main.type, 'video');
  assert.ok(project.tracks.audio.length >= 3, 'Must contain multi-track audio tracks');
  console.log('✓ [Test 3 PASSED] OpenCut project schema exported and validated.\n');

  // Test 4: Image Asset Manager & Prompt Templates
  console.log('[Test 4] Testing Image Asset Manager & Vibe Prompts...');
  const imgMgr = new ImageAssetManager();
  const cinematicPrompt = ImageAssetManager.getPromptTemplate('cinematic_photorealistic_enhancer');
  assert.ok(cinematicPrompt.includes('4K photograph'), 'Cinematic prompt must contain 4K photograph keyword');
  assert.ok(cinematicPrompt.includes('EDIT ONLY'), 'Prompt must enforce strict preservation constraint');
  const opticsCSS = ImageAssetManager.getCinematicOpticsCSS();
  assert.ok(opticsCSS.includes('cinematic-optics-overlay'), 'Optics CSS must include anti-banding grain overlay');
  console.log('✓ [Test 4 PASSED] Image asset manager templates & optical CSS verified.\n');

  // Test 5: Sound Designer Library Verification
  console.log('[Test 5] Verifying Sound Designer Assets...');
  const soundDesigner = new SoundDesigner();
  assert.ok(fs.existsSync(soundDesigner.sfxLibrary.click), 'Click SFX file must exist');
  assert.ok(fs.existsSync(soundDesigner.sfxLibrary.shatter), 'Shatter SFX file must exist');
  console.log('✓ [Test 5 PASSED] Sound designer asset library verified.\n');

  console.log('=== ALL PRODUCTION PIPELINE VERIFICATION TESTS PASSED (100%) ===\n');
}

runTests().catch(err => {
  console.error('Test failure:', err);
  process.exit(1);
});
