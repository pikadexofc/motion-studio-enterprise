import { MotionRenderer } from '../src/engine/renderer.js';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function testPipeline() {
  console.log('=== Motion Studio End-to-End Render Pipeline Test ===');
  const testOutput = 'render-tests/test-pipeline-render.mp4';
  const renderer = new MotionRenderer({ width: 1920, height: 1080, fps: 30, duration: 1.0 });

  const result = await renderer.render('examples/2d-brand-launch/index.html', testOutput, {
    fps: 30,
    duration: 1.0
  });

  if (!fs.existsSync(testOutput)) {
    throw new Error(`Output MP4 does not exist: ${testOutput}`);
  }

  const stats = fs.statSync(testOutput);
  console.log(`[Test] Output file created successfully: ${testOutput} (${(stats.size / 1024).toFixed(1)} KB)`);

  if (stats.size < 50000) {
    throw new Error(`Output file too small (${stats.size} bytes), possible encoding failure.`);
  }

  // Validate via ffprobe
  console.log(`[Test] Validating media stream via ffprobe...`);
  const ffprobeCmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,codec_name,pix_fmt -of json "${path.resolve(testOutput)}"`;
  const probeOutput = execSync(ffprobeCmd).toString();
  const probeJson = JSON.parse(probeOutput);
  const stream = probeJson.streams[0];

  console.log(`[Test] FFprobe Stream Metadata:`, stream);

  if (stream.codec_name !== 'h264') {
    throw new Error(`Unexpected video codec: ${stream.codec_name}, expected h264`);
  }
  if (stream.width !== 1920 || stream.height !== 1080) {
    throw new Error(`Unexpected video resolution: ${stream.width}x${stream.height}, expected 1920x1080`);
  }
  if (stream.pix_fmt !== 'yuv420p') {
    throw new Error(`Unexpected pixel format: ${stream.pix_fmt}, expected yuv420p`);
  }

  console.log('[Test PASSED] Render pipeline & FFmpeg encoding verified 100% compliant!');
}

testPipeline().catch(err => {
  console.error('[FATAL] Pipeline test failed:', err);
  process.exit(1);
});
