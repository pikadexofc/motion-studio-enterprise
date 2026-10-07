import puppeteer from 'puppeteer-core';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testSceneDeterminism(sceneRelPath, width = 1920, height = 1080) {
  console.log(`\n[Test] Testing determinism for: ${sceneRelPath} (${width}x${height})`);
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
      if (msg.type() === 'error') console.error(`[Page Error (${sceneRelPath})]:`, msg.text());
    });
    page.on('pageerror', err => console.error(`[Page Exception (${sceneRelPath})]:`, err.message));
    await page.setViewport({ width, height });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.evaluate(async () => {
      if (document.fonts) await document.fonts.ready;
    });

    // 1. Seek to t = 1.5s -> Capture Shot 1
    const testTime = 1.5;
    await page.evaluate((t) => window.renderFrame(t, 90), testTime);
    const buf1 = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });

    // 2. Disrupt state: seek to t = 2.8s
    await page.evaluate((t) => window.renderFrame(t, 168), 2.8);

    // 3. Seek back to t = 1.5s -> Capture Shot 2
    await page.evaluate((t) => window.renderFrame(t, 90), testTime);
    const buf2 = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });

    // 4. Pixelmatch diff
    const img1 = PNG.sync.read(buf1);
    const img2 = PNG.sync.read(buf2);
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.05 });

    console.log(`[Test Result] Mismatched pixels: ${numDiffPixels} / ${width * height}`);

    if (numDiffPixels > 0) {
      throw new Error(`Determinism test failed: ${numDiffPixels} mismatched pixels between seek cycles!`);
    }

    console.log(`[Test PASSED] 100% Deterministic (Zero Pixel Drift) for ${sceneRelPath}`);
    return true;
  } finally {
    await browser.close();
  }
}

async function runAll() {
  console.log('=== Motion Studio Determinism Test Suite ===');
  await testSceneDeterminism('examples/2d-brand-launch/index.html');
  await testSceneDeterminism('examples/3d-procedural-stage/index.html');
  await testSceneDeterminism('examples/compiled/bm-01-premium-saas-launch/index.html');
  await testSceneDeterminism('examples/compiled/bm-07-vertical-social-ad/index.html', 1080, 1920);
  console.log('\n=== All Determinism Tests Passed Successfully! ===');
}

runAll().catch(err => {
  console.error('[FATAL] Determinism test suite failed:', err);
  process.exit(1);
});
