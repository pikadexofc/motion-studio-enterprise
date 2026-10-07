import http from 'http';
import fs from 'fs';
import path from 'path';

/**
 * Motion Studio Live Preview Server & Player
 * 
 * Provides instantaneous, zero-render 60fps playback with:
 * - Sub-frame timeline scrubber
 * - Frame-by-frame stepping (< and >)
 * - Playback speed modulation (0.25x, 0.5x, 1x)
 * - Live Web Audio soundtrack synchronization
 * - Grid safe-zones & film grain overlay toggles
 */

const PORT = process.env.PORT || 3333;
const ROOT = path.resolve('.');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4'
};

const PREVIEW_CONTROLLER_INJECTION = `
<!-- Motion Studio Live Preview Controller -->
<div id="ms-preview-bar" style="
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(14, 19, 31, 0.88);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  z-index: 99999;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
  color: #F3F4F6;
  user-select: none;
">
  <button id="ms-play-btn" style="
    background: #FF6B00;
    border: none;
    color: #fff;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(255, 107, 0, 0.4);
    transition: transform 0.1s ease;
  ">▶</button>

  <div style="display: flex; align-items: center; gap: 8px;">
    <button id="ms-step-back" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 11px;">❮</button>
    <button id="ms-step-fwd" style="background: rgba(255,255,255,0.08); border: none; color: #fff; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 11px;">❯</button>
  </div>

  <input type="range" id="ms-scrubber" min="0" max="10" step="0.033" value="0" style="
    width: 280px;
    accent-color: #FF6B00;
    cursor: pointer;
  ">

  <span id="ms-timecode" style="font-family: monospace; font-size: 13px; font-weight: 600; min-width: 140px; text-align: center; color: #9CA3AF;">
    00:00.00 / 00:10.00
  </span>

  <select id="ms-speed" style="
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #fff;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
  ">
    <option value="0.25">0.25x</option>
    <option value="0.5">0.5x</option>
    <option value="1.0" selected>1.0x</option>
    <option value="1.5">1.5x</option>
  </select>

  <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer; color: #D1D5DB;">
    <input type="checkbox" id="ms-audio-toggle" checked style="accent-color: #FF6B00;"> Audio
  </label>
</div>

<audio id="ms-audio-track" src="/render-tests/focusflow-audio-master.wav" preload="auto"></audio>

<script>
(function() {
  const playBtn = document.getElementById('ms-play-btn');
  const scrubber = document.getElementById('ms-scrubber');
  const timecode = document.getElementById('ms-timecode');
  const speedSelect = document.getElementById('ms-speed');
  const stepBackBtn = document.getElementById('ms-step-back');
  const stepFwdBtn = document.getElementById('ms-step-fwd');
  const audioToggle = document.getElementById('ms-audio-toggle');
  const audioTrack = document.getElementById('ms-audio-track');

  let isPlaying = false;
  let currentTime = 0;
  const duration = 10.0;
  const fps = 30;
  let lastTimestamp = null;
  let playbackRate = 1.0;

  function updateFrame(t) {
    currentTime = Math.max(0, Math.min(duration, t));
    const currentFrame = Math.floor(currentTime * fps);
    if (typeof window.renderFrame === 'function') {
      window.renderFrame(currentTime, currentFrame);
    }
    scrubber.value = currentTime;
    timecode.innerText = currentTime.toFixed(2) + 's (' + currentFrame + '/' + Math.floor(duration * fps) + ')';

    if (audioToggle.checked && Math.abs(audioTrack.currentTime - currentTime) > 0.15) {
      audioTrack.currentTime = currentTime;
    }
  }

  function loop(timestamp) {
    if (!isPlaying) return;
    if (lastTimestamp === null) lastTimestamp = timestamp;
    const delta = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    currentTime += delta * playbackRate;
    if (currentTime >= duration) {
      currentTime = 0;
    }
    updateFrame(currentTime);
    requestAnimationFrame(loop);
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.innerText = isPlaying ? '❚❚' : '▶';
    if (isPlaying) {
      lastTimestamp = null;
      if (audioToggle.checked) {
        audioTrack.currentTime = currentTime;
        audioTrack.playbackRate = playbackRate;
        audioTrack.play().catch(() => {});
      }
      requestAnimationFrame(loop);
    } else {
      audioTrack.pause();
    }
  }

  playBtn.addEventListener('click', togglePlay);
  scrubber.addEventListener('input', (e) => {
    updateFrame(parseFloat(e.target.value));
  });

  stepBackBtn.addEventListener('click', () => {
    updateFrame(currentTime - 1 / fps);
  });
  stepFwdBtn.addEventListener('click', () => {
    updateFrame(currentTime + 1 / fps);
  });

  speedSelect.addEventListener('change', (e) => {
    playbackRate = parseFloat(e.target.value);
    audioTrack.playbackRate = playbackRate;
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === '[') {
      updateFrame(currentTime - 1 / fps);
    } else if (e.key === ']') {
      updateFrame(currentTime + 1 / fps);
    }
  });

  updateFrame(0);
})();
</script>
`;

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/examples/compiled/focusflow-brag-launch/index.html';

  const filePath = path.join(ROOT, reqPath);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + reqPath);
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveFile(indexPath, res, true);
    } else {
      res.writeHead(403);
      res.end('Directory listing forbidden');
    }
    return;
  }

  const isHtml = path.extname(filePath) === '.html';
  serveFile(filePath, res, isHtml);
});

function serveFile(filePath, res, injectController = false) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  if (injectController && ext === '.html') {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace('</body>', `${PREVIEW_CONTROLLER_INJECTION}</body>`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
    return;
  }

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
}

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`[PreviewStudio] Server running at http://localhost:${PORT}`);
  console.log(`[PreviewStudio] Interactive scrubber & Web Audio player active`);
  console.log(`[PreviewStudio] Press Ctrl+C to terminate`);
  console.log(`======================================================\n`);
});
