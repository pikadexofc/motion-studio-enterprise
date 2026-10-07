import fs from 'fs';
import { PNG } from 'pngjs';

/**
 * Visual Quality Assurance (VQA) Inspector — Phase 2 Enhanced
 * Combines Objective Metrics (luminance, variance, color diversity, safe area, discontinuities)
 * with Structured Creative Observations for agent review.
 */
export class VisualInspector {
  static parsePng(buffer) {
    return PNG.sync.read(buffer);
  }

  /**
   * Analyze a single PNG frame buffer for objective quality metrics.
   */
  static analyzeFrame(pngBuffer, frameName = 'frame', options = {}) {
    const png = pngBuffer.data ? pngBuffer : (typeof pngBuffer === 'string' ? PNG.sync.read(fs.readFileSync(pngBuffer)) : this.parsePng(pngBuffer));
    const { width, height, data } = png;

    const safeMarginX = Math.round(width * 0.05);
    const safeMarginY = Math.round(height * 0.05);

    let sumLuminance = 0;
    let sumLuminanceSq = 0;
    const colorMap = new Set();

    // Quadrant luminance accumulators
    const midX = width / 2;
    const midY = height / 2;
    const quadSum = [0, 0, 0, 0]; // TL, TR, BL, BR
    const quadCount = [0, 0, 0, 0];

    // Safe area violations
    let borderLuminanceExcess = 0;

    const step = 4;
    let sampledCount = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        sumLuminance += lum;
        sumLuminanceSq += lum * lum;

        // Quantized color clustering
        const quantized = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
        colorMap.add(quantized);
        sampledCount++;

        // Quadrant tracking
        const qIdx = (y < midY ? 0 : 2) + (x < midX ? 0 : 1);
        quadSum[qIdx] += lum;
        quadCount[qIdx]++;

        // Outer margin safe area check
        if (x < safeMarginX || x > width - safeMarginX || y < safeMarginY || y > height - safeMarginY) {
          if (lum > 180) { // bright content close to edge
            borderLuminanceExcess++;
          }
        }
      }
    }

    const meanLuminance = sumLuminance / sampledCount;
    const variance = (sumLuminanceSq / sampledCount) - (meanLuminance * meanLuminance);
    const stdDev = Math.sqrt(Math.max(0, variance));
    const colorDiversity = colorMap.size;

    const quadrantLuminance = quadSum.map((sum, idx) => Number((sum / quadCount[idx]).toFixed(2)));

    const flags = [];

    // 1. Blank frame detection
    if (stdDev < 3.0) {
      if (meanLuminance < 10) flags.push('BLANK_BLACK_FRAME');
      else if (meanLuminance > 245) flags.push('BLANK_WHITE_FRAME');
      else flags.push('SOLID_FLAT_COLOR_FRAME');
    }

    // 2. Monochrome flat screen
    if (colorDiversity <= 1 && stdDev < 1.0) {
      flags.push('FLAT_MONOCHROME_FRAME');
    }

    // 3. Extreme luminance spikes (blowout)
    if (meanLuminance > 230) {
      flags.push('OVEREXPOSED_BLOWOUT');
    }

    // 4. Safe area violation warning
    const safeAreaViolation = borderLuminanceExcess > (sampledCount * 0.08);
    if (safeAreaViolation) {
      flags.push('SAFE_AREA_OVERFLOW_WARNING');
    }

    const passed = flags.filter(f => !f.endsWith('_WARNING')).length === 0;

    return {
      frame: frameName,
      dimensions: { width, height },
      passed,
      meanLuminance: Number(meanLuminance.toFixed(2)),
      stdDev: Number(stdDev.toFixed(2)),
      colorDiversity,
      quadrantLuminance,
      safeAreaViolation,
      flags
    };
  }

  /**
   * Analyze sequential frames to compute temporal motion density and detect flicker/discontinuities.
   */
  static analyzeSequenceDiscontinuity(frameBuffers) {
    if (!frameBuffers || frameBuffers.length < 2) return [];

    const transitions = [];

    for (let i = 0; i < frameBuffers.length - 1; i++) {
      const imgA = frameBuffers[i].data ? frameBuffers[i] : (typeof frameBuffers[i] === 'string' ? PNG.sync.read(fs.readFileSync(frameBuffers[i])) : this.parsePng(frameBuffers[i]));
      const imgB = frameBuffers[i + 1].data ? frameBuffers[i + 1] : (typeof frameBuffers[i + 1] === 'string' ? PNG.sync.read(fs.readFileSync(frameBuffers[i + 1])) : this.parsePng(frameBuffers[i + 1]));

      if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
        continue; // Skip comparing frames from different canvas aspect ratios
      }

      let diffSum = 0;
      let diffPixels = 0;
      const step = 4;
      let sampled = 0;

      for (let j = 0; j < imgA.data.length; j += 4 * step) {
        const lumA = 0.2126 * imgA.data[j] + 0.7152 * imgA.data[j + 1] + 0.0722 * imgA.data[j + 2];
        const lumB = 0.2126 * imgB.data[j] + 0.7152 * imgB.data[j + 1] + 0.0722 * imgB.data[j + 2];
        const delta = Math.abs(lumA - lumB);
        diffSum += delta;
        if (delta > 20) diffPixels++;
        sampled++;
      }

      const meanDelta = Number((diffSum / sampled).toFixed(2));
      const motionDensityPct = Number(((diffPixels / sampled) * 100).toFixed(1));

      const isDiscontinuity = meanDelta > 85; // extreme abrupt flicker
      transitions.push({
        step: `${i} -> ${i + 1}`,
        meanDelta,
        motionDensityPct,
        isDiscontinuity
      });
    }

    return transitions;
  }

  /**
   * Synthesize structured creative observations for agent review.
   */
  static evaluateCreativeObservations(frameReports, motionPlan = null) {
    const observations = [];

    const avgLuminance = frameReports.reduce((acc, r) => acc + r.meanLuminance, 0) / frameReports.length;
    if (avgLuminance < 12) {
      observations.push({ category: 'lighting', observation: 'Overall composition is deeply dark; ensure typography has sufficient specular highlights.' });
    } else if (avgLuminance > 120) {
      observations.push({ category: 'lighting', observation: 'High overall brightness; verify dark-mode contrast standard.' });
    }

    const hasQuadrantImbalance = frameReports.some(r => {
      const q = r.quadrantLuminance;
      const maxQ = Math.max(...q);
      const minQ = Math.min(...q);
      return maxQ > minQ * 6 && minQ < 2;
    });

    if (hasQuadrantImbalance) {
      observations.push({ category: 'staging', observation: 'Notable spatial imbalance across quadrants; focal elements strongly clustered on one side.' });
    }

    return observations;
  }

  /**
   * Analyze an entire directory of snapshot PNGs.
   */
  static analyzeDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Directory not found: ${dirPath}`);
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.png')).sort();
    const frameReports = [];
    const decodedFrames = [];

    for (const file of files) {
      const filePath = `${dirPath}/${file}`;
      const png = PNG.sync.read(fs.readFileSync(filePath));
      const report = this.analyzeFrame(png, file);
      frameReports.push(report);
      decodedFrames.push({ file, png });
    }

    // Group by scene prefix to compute scene-accurate sequence transitions
    const sceneGroups = {};
    for (const item of decodedFrames) {
      const match = item.file.match(/^(.*)_frame_/);
      const sceneKey = match ? match[1] : 'default';
      if (!sceneGroups[sceneKey]) sceneGroups[sceneKey] = [];
      sceneGroups[sceneKey].push(item.png);
    }

    const sequenceTransitions = [];
    for (const [sceneKey, pngList] of Object.entries(sceneGroups)) {
      const transitions = this.analyzeSequenceDiscontinuity(pngList);
      for (const t of transitions) {
        sequenceTransitions.push({
          scene: sceneKey,
          ...t
        });
      }
    }

    const creativeObservations = this.evaluateCreativeObservations(frameReports);

    const allPassed = frameReports.every(r => r.passed) && sequenceTransitions.every(t => !t.isDiscontinuity);

    return {
      totalFrames: frameReports.length,
      allPassed,
      frames: frameReports,
      sequenceTransitions,
      creativeObservations
    };
  }
}
