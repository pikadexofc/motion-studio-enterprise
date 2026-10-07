import puppeteer from 'puppeteer-core';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testReelDeterminism(sceneRelPath, width = 1080, height = 1920) {
  console.log(`\n[Test] Testing seek determinism for Reel: ${sceneRelPath} (${width}x${height})`);
  const absPath = path.resolve(sceneRelPath);
  const fileUrl = `file:///${absPath.replace(/\\/g, '/')}`;

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--enable-webgl',
      '--use-gl=angle',
      '--allow-file-access-from-files',
      `--window-size=${width},${height}`,
      '--hide-scrollbars'
    ]
  });

  try {
    const page = await browser.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') console.error(`[Page Error]:`, msg.text());
    });
    page.on('pageerror', err => console.error(`[Page Exception]:`, err.message));
    await page.setViewport({ width, height });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.evaluate(async () => {
      if (document.fonts) await document.fonts.ready;
    });
    await page.waitForFunction(() => typeof window.renderFrame === 'function');

    // Test seek across all 4 narrative beats:
    // Beat 1: t = 1.2s, Beat 2: t = 5.0s, Beat 3: t = 12.0s, Beat 4: t = 20.0s
    const testPoints = [1.2, 5.0, 12.0, 20.0];

    for (const testTime of testPoints) {
      const frameIdx = Math.round(testTime * 60);
      console.log(`  [Seek Cycle] Testing timestamp t = ${testTime}s (frame ${frameIdx})...`);

      // 1. Initial Seek
      await page.evaluate((t, f) => window.renderFrame(t, f), testTime, frameIdx);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
      const buf1 = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });

      // 2. Disrupt timeline state by jumping ahead
      await page.evaluate((t, f) => window.renderFrame(t, f), 24.5, 1470);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

      // 3. Return to exact test timestamp
      await page.evaluate((t, f) => window.renderFrame(t, f), testTime, frameIdx);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
      const buf2 = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });

      // 4. Pixel diff
      const img1 = PNG.sync.read(buf1);
      const img2 = PNG.sync.read(buf2);
      const diff = new PNG({ width, height });
      const numDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.05 });

      console.log(`    -> Pixel Drift: ${numDiff} / ${width * height} pixels`);
      if (numDiff > 0) {
        let minX = width, maxX = 0, minY = height, maxY = 0;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            if (diff.data[idx] === 255 && diff.data[idx+1] === 0 && diff.data[idx+2] === 0) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        console.log(`    [Diff Box] X=[${minX}, ${maxX}], Y=[${minY}, ${maxY}]`);
        fs.writeFileSync('render-tests/shot1.png', buf1);
        fs.writeFileSync('render-tests/shot2.png', buf2);
        fs.writeFileSync('render-tests/diff.png', PNG.sync.write(diff));
        console.log(`    [Saved Debug Images] render-tests/shot1.png, shot2.png, diff.png`);
        throw new Error(`Determinism failure at t = ${testTime}s: ${numDiff} pixels drifted!`);
      }
    }

    console.log(`\n[Test PASSED] 100% Deterministic (Zero Pixel Drift across all beats) for ${sceneRelPath}`);
    return true;
  } finally {
    await browser.close();
  }
}

testReelDeterminism('examples/compiled/reel-01-sydney-melbourne/index.html', 1080, 1920)
  .then(() => {
    console.log('=== Reel Determinism Test Suite Completed Successfully! ===');
  })
  .catch(err => {
    console.error('[FATAL] Reel determinism failed:', err);
    process.exit(1);
  });
