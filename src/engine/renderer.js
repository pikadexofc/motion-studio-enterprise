import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Deterministic Motion Renderer.
 * Coordinates Headless Chrome virtual time capture and pipes frames into FFmpeg.
 */
export class MotionRenderer {
  constructor(options = {}) {
    this.width = options.width || 1920;
    this.height = options.height || 1080;
    this.fps = options.fps || 60;
    this.duration = options.duration || 3.0;
    this.chromePath = options.chromePath || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  }

  /**
   * Render a scene file to an MP4 video with milestone snapshots.
   */
  async render(sceneFilePath, outputMp4Path, options = {}) {
    const fps = options.fps || this.fps;
    const duration = options.duration || this.duration;
    const width = options.width || this.width;
    const height = options.height || this.height;
    const snapshotsDir = options.snapshotsDir || path.join(path.dirname(outputMp4Path), 'snapshots');

    const totalFrames = Math.round(duration * fps);
    const absScenePath = path.resolve(sceneFilePath);
    const fileUrl = `file:///${absScenePath.replace(/\\/g, '/')}`;

    if (!fs.existsSync(absScenePath)) {
      throw new Error(`Scene file does not exist: ${absScenePath}`);
    }

    // Ensure output directories exist
    fs.mkdirSync(path.dirname(path.resolve(outputMp4Path)), { recursive: true });
    if (snapshotsDir) {
      fs.mkdirSync(path.resolve(snapshotsDir), { recursive: true });
    }

    console.log(`[MotionRenderer] Launching Headless Chrome...`);
    const browser = await puppeteer.launch({
      executablePath: this.chromePath,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--enable-webgl',
        '--use-gl=angle',
        '--allow-file-access-from-files',
        `--window-size=${width},${height}`,
        '--hide-scrollbars'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    // Forward console messages from page
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`[Browser Page Error]`, msg.text());
      }
    });

    console.log(`[MotionRenderer] Loading scene: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'load' });

    // Wait for fonts to be ready
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
    });

    // Verify window.renderFrame is available
    const hasRenderHook = await page.evaluate(() => typeof window.renderFrame === 'function');
    if (!hasRenderHook) {
      await browser.close();
      throw new Error(`Scene does not implement mandatory window.renderFrame(time, frame) hook!`);
    }

    // Prime frame 0
    await page.evaluate(() => window.renderFrame(0, 0));

    console.log(`[MotionRenderer] Initializing FFmpeg encoding pipeline...`);
    const ffmpegArgs = [
      '-y',
      '-f', 'image2pipe',
      '-vcodec', 'png',
      '-r', String(fps),
      '-i', '-',
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-preset', 'medium',
      '-crf', '18',
      '-movflags', '+faststart',
      path.resolve(outputMp4Path)
    ];

    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, {
      stdio: ['pipe', 'inherit', 'inherit']
    });

    const snapshotFrames = new Set([
      0,
      Math.round(totalFrames * 0.05),
      Math.round(totalFrames * 0.20),
      Math.round(totalFrames * 0.50),
      Math.round(totalFrames * 0.80),
      totalFrames - 1
    ]);

    const capturedSnapshots = [];
    const startTime = Date.now();

    console.log(`[MotionRenderer] Rendering ${totalFrames} frames at ${fps} fps (${duration}s)...`);

    for (let frame = 0; frame < totalFrames; frame++) {
      const time = frame / fps;

      // Deterministically step virtual time
      await page.evaluate((t, f) => window.renderFrame(t, f), time, frame);

      // Capture frame buffer
      const buffer = await page.screenshot({
        type: 'png',
        omitBackground: false,
        clip: { x: 0, y: 0, width, height }
      });

      // Stream directly to FFmpeg stdin
      const canWrite = ffmpegProcess.stdin.write(buffer);
      if (!canWrite) {
        await new Promise(resolve => ffmpegProcess.stdin.once('drain', resolve));
      }

      // Save milestone snapshots for visual QA
      if (snapshotFrames.has(frame) && snapshotsDir) {
        const snapshotName = `${path.basename(outputMp4Path, '.mp4')}_frame_${String(frame).padStart(4, '0')}_${time.toFixed(2)}s.png`;
        const snapshotPath = path.join(snapshotsDir, snapshotName);
        fs.writeFileSync(snapshotPath, buffer);
        capturedSnapshots.push({ frame, time, path: snapshotPath });
      }

      if (frame > 0 && (frame % 30 === 0 || frame === totalFrames - 1)) {
        const pct = Math.round(((frame + 1) / totalFrames) * 100);
        process.stdout.write(`\r[MotionRenderer] Progress: ${frame + 1}/${totalFrames} frames (${pct}%)`);
      }
    }
    console.log('\n[MotionRenderer] Finalizing video stream...');

    ffmpegProcess.stdin.end();

    await new Promise((resolve, reject) => {
      ffmpegProcess.on('close', code => {
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg exited with code ${code}`));
      });
      ffmpegProcess.on('error', reject);
    });

    await browser.close();

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    const stats = fs.statSync(outputMp4Path);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`[MotionRenderer] Render complete in ${elapsed}s -> ${outputMp4Path} (${sizeMb} MB)`);

    return {
      outputMp4Path,
      sizeBytes: stats.size,
      sizeMb,
      elapsedSeconds: Number(elapsed),
      totalFrames,
      fps,
      duration,
      snapshots: capturedSnapshots
    };
  }
}
