import puppeteer from 'puppeteer-core';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function findElement() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--window-size=1080,1920', '--hide-scrollbars']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });
  const fileUrl = 'file:///' + path.resolve('examples/compiled/reel-01-sydney-melbourne/index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.renderFrame === 'function');

  // Shot 1
  await page.evaluate(() => window.renderFrame(1.2, 72));
  const b1 = await page.screenshot({ type: 'png' });

  // Disrupt
  await page.evaluate(() => window.renderFrame(24.5, 1470));

  // Shot 2
  await page.evaluate(() => window.renderFrame(1.2, 72));
  const b2 = await page.screenshot({ type: 'png' });

  const img1 = PNG.sync.read(b1);
  const img2 = PNG.sync.read(b2);
  const diff = new PNG({ width: 1080, height: 1920 });
  pixelmatch(img1.data, img2.data, diff.data, 1080, 1920, { threshold: 0.05 });

  const diffPoints = [];
  for (let y = 0; y < 1920; y++) {
    for (let x = 0; x < 1080; x++) {
      const idx = (y * 1080 + x) * 4;
      if (diff.data[idx] === 255 && diff.data[idx+1] === 0 && diff.data[idx+2] === 0) {
        diffPoints.push({
          x, y,
          c1: [img1.data[idx], img1.data[idx+1], img1.data[idx+2]],
          c2: [img2.data[idx], img2.data[idx+1], img2.data[idx+2]]
        });
        if (diffPoints.length >= 10) break;
      }
    }
    if (diffPoints.length >= 10) break;
  }

  console.log('Sample diff points:', diffPoints);

  const elInfo = await page.evaluate((pts) => {
    return pts.map(p => {
      const el = document.elementFromPoint(p.x, p.y);
      return {
        x: p.x,
        y: p.y,
        tag: el ? el.tagName : null,
        id: el ? el.id : null,
        className: el ? el.className : null
      };
    });
  }, diffPoints);

  console.log('Elements at diff points:', elInfo);
  await browser.close();
}

findElement().catch(console.error);
