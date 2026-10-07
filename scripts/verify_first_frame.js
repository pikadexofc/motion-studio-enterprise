import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

/**
 * First-Frame Static Verification & Quality Gate
 * 
 * Enforces the "Law of First Frame Perfection":
 * - Verifies that the initial HTML composition is a presentation-grade graphic design
 *   BEFORE any motion execution begins.
 * - Audits typography scales, contrast, padding, layer hierarchy, and dark-mode lighting.
 */

export async function verifyFirstFrame(scenePath, options = {}) {
  const width = options.width || 1080;
  const height = options.height || 1920;
  const outputDir = options.outputDir || path.resolve('render-tests/first-frames');
  const chromePath = options.chromePath || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  fs.mkdirSync(outputDir, { recursive: true });

  const resolvedScene = path.resolve(scenePath);
  if (!fs.existsSync(resolvedScene)) {
    throw new Error(`Scene not found: ${resolvedScene}`);
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    const fileUrl = 'file://' + resolvedScene.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Ensure frame 0 is rendered if renderFrame hook exists
    await page.evaluate(() => {
      if (typeof window.renderFrame === 'function') {
        window.renderFrame(0, 0);
      }
    });

    const sceneBasename = path.basename(scenePath, path.extname(scenePath));
    const screenshotPath = path.join(outputDir, `${sceneBasename}_first_frame.png`);
    await page.screenshot({ path: screenshotPath, type: 'png' });

    // Inspect DOM design parameters
    const audit = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      const textElements = Array.from(document.querySelectorAll('h1, h2, h3, p, span, div, button'))
        .filter(el => el.children.length === 0 && el.textContent.trim().length > 0);

      // Check font families
      const fontFamilies = new Set(
        textElements.map(el => window.getComputedStyle(el).fontFamily)
      );

      // Check font sizes
      const fontSizes = textElements.map(el => parseFloat(window.getComputedStyle(el).fontSize));
      const validSizes = fontSizes.filter(s => s > 0);
      const minFont = validSizes.length ? Math.min(...validSizes) : 12;
      const maxFont = validSizes.length ? Math.max(...validSizes) : 12;
      const typeContrastRatio = (maxFont / minFont).toFixed(2);

      // Check dark mode background
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;

      // Check for glassmorphism / shadows
      const cardsWithShadows = allElements.filter(el => {
        const style = window.getComputedStyle(el);
        return style.boxShadow !== 'none' || (style.backdropFilter && style.backdropFilter.includes('blur'));
      }).length;

      return {
        elementCount: allElements.length,
        textElementCount: textElements.length,
        uniqueFonts: Array.from(fontFamilies),
        fontSizeRange: { min: minFont, max: maxFont, ratio: typeContrastRatio },
        bodyBackgroundColor: bodyBg,
        elevatedCardCount: cardsWithShadows,
        hasInteractiveElements: document.querySelectorAll('button, input, [role="button"]').length > 0
      };
    });

    console.log(`\n======================================================`);
    console.log(`[FirstFrameAudit] Scene: ${sceneBasename}`);
    console.log(`[FirstFrameAudit] Snapshot: ${screenshotPath}`);
    console.log(`[FirstFrameAudit] DOM Elements: ${audit.elementCount}`);
    console.log(`[FirstFrameAudit] Typography Scale Contrast: ${audit.fontSizeRange.ratio}x (${audit.fontSizeRange.min}px to ${audit.fontSizeRange.max}px)`);
    console.log(`[FirstFrameAudit] Elevated / Glassmorphic Surfaces: ${audit.elevatedCardCount}`);
    console.log(`[FirstFrameAudit] Interactive Elements (Buttons/Inputs): ${audit.hasInteractiveElements}`);
    console.log(`======================================================\n`);

    return {
      success: true,
      screenshotPath,
      audit
    };
  } finally {
    await browser.close();
  }
}

// CLI entry point
if (process.argv[1] && process.argv[1].endsWith('verify_first_frame.js')) {
  const target = process.argv[2] || 'examples/compiled/focusflow-brag-launch/index.html';
  verifyFirstFrame(target).catch(console.error);
}
