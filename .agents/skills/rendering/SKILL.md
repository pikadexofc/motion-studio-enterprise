---
name: rendering
description: Headless browser automation, Chrome DevTools Protocol virtual time capture, memory optimization, and frame streaming.
---

# Deterministic Rendering Engine

## Activation
Activate when orchestrating headless Chrome, capturing screenshot buffers, managing CDP virtual time, or troubleshooting rendering bottlenecks.

## Chrome Launch Flags
```javascript
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
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
    '--window-size=1920,1080'
  ]
});
```

## Frame Capture Loop
```javascript
for (let frame = 0; frame < totalFrames; frame++) {
  const time = frame / fps;
  await page.evaluate((t, f) => window.renderFrame(t, f), time, frame);
  const buffer = await page.screenshot({ type: 'png', omitBackground: false });
  ffmpegProcess.stdin.write(buffer);
}
```
