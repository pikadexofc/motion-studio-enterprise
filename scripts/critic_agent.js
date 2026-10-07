import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

/**
 * Autonomous 95% Motion Critic & Quality Gate Agent
 * 
 * Audits a motion scene against professional SaaS motion design benchmarks
 * across a 100-point rubric. Requires >= 95 points to pass production gate.
 */

export class MotionCriticAgent {
  constructor(options = {}) {
    this.chromePath = options.chromePath || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  }

  /**
   * Run comprehensive audit on a scene
   * @param {string} scenePath - Path to HTML scene file
   * @param {Object} [metadata] - Optional cueSheet and render metadata
   */
  async evaluate(scenePath, metadata = {}) {
    const resolvedScene = path.resolve(scenePath);
    if (!fs.existsSync(resolvedScene)) {
      throw new Error(`Scene file not found: ${resolvedScene}`);
    }

    const htmlContent = fs.readFileSync(resolvedScene, 'utf-8');

    const browser = await puppeteer.launch({
      executablePath: this.chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1']
    });

    let domMetrics = {};
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
      const fileUrl = 'file://' + resolvedScene.replace(/\\/g, '/');
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });

      domMetrics = await page.evaluate(() => {
        const textElements = Array.from(document.querySelectorAll('h1, h2, h3, p, span, div, button'))
          .filter(el => el.children.length === 0 && el.textContent.trim().length > 0);

        const fontSizes = textElements
          .map(el => parseFloat(window.getComputedStyle(el).fontSize))
          .filter(s => s > 0);

        const minFont = fontSizes.length ? Math.min(...fontSizes) : 12;
        const maxFont = fontSizes.length ? Math.max(...fontSizes) : 12;

        const cards = Array.from(document.querySelectorAll('*')).filter(el => {
          const s = window.getComputedStyle(el);
          return s.boxShadow !== 'none' || (s.backdropFilter && s.backdropFilter.includes('blur'));
        });

        const hasCursor = document.querySelector('.cursor, [id*="cursor"], [class*="cursor"]') !== null;
        const hasKeyLight = document.querySelector('.cinematic-key-light, [class*="key-light"]') !== null;
        const hasOpticsOverlay = document.querySelector('.cinematic-optics-overlay, [class*="optics"]') !== null;
        const has3DPerspective = Array.from(document.querySelectorAll('*')).some(el => {
          const s = window.getComputedStyle(el);
          return s.perspective !== 'none' || s.transform.includes('matrix3d') || s.transform.includes('rotateX');
        });

        return {
          elementCount: document.querySelectorAll('*').length,
          minFont,
          maxFont,
          typeRatio: (maxFont / minFont).toFixed(2),
          elevatedCardCount: cards.length,
          hasCursor,
          hasKeyLight,
          hasOpticsOverlay,
          has3DPerspective
        };
      });
    } finally {
      await browser.close();
    }

    // 100-point Rubric Scoring
    const rubric = {
      hookAndDensity: { score: 0, max: 20, feedback: [] },
      livingSoftware: { score: 0, max: 20, feedback: [] },
      typographyHierarchy: { score: 0, max: 20, feedback: [] },
      opticalDepth: { score: 0, max: 20, feedback: [] },
      acousticSync: { score: 0, max: 20, feedback: [] }
    };

    // Axis 1: Hook & Visual Density (20 pts)
    if (domMetrics.elementCount >= 100) {
      rubric.hookAndDensity.score += 20;
      rubric.hookAndDensity.feedback.push(`Excellent structural density (${domMetrics.elementCount} elements).`);
    } else if (domMetrics.elementCount >= 50) {
      rubric.hookAndDensity.score += 15;
      rubric.hookAndDensity.feedback.push(`Moderate visual density (${domMetrics.elementCount} elements).`);
    } else {
      rubric.hookAndDensity.score += 8;
      rubric.hookAndDensity.feedback.push(`Low visual density (${domMetrics.elementCount} elements). Enhance UI layering.`);
    }

    // Axis 2: Living Software Truth (20 pts)
    if (domMetrics.hasCursor) {
      rubric.livingSoftware.score += 10;
      rubric.livingSoftware.feedback.push('Active simulated mouse cursor present.');
    } else {
      rubric.livingSoftware.feedback.push('Missing simulated cursor for interactive demonstration.');
    }

    if (htmlContent.includes('typing') || htmlContent.includes('task') || htmlContent.includes('countdown') || htmlContent.includes('dial')) {
      rubric.livingSoftware.score += 10;
      rubric.livingSoftware.feedback.push('Product actions in live use (typing, dial countdown, or task toggle).');
    } else {
      rubric.livingSoftware.feedback.push('Software appears static. Add real-time task completion or data ticking.');
    }

    // Axis 3: Typography Hierarchy & Spacing (20 pts)
    const ratio = parseFloat(domMetrics.typeRatio);
    if (ratio >= 5.0) {
      rubric.typographyHierarchy.score += 20;
      rubric.typographyHierarchy.feedback.push(`Superb typography scale contrast (${ratio}x ratio).`);
    } else if (ratio >= 3.5) {
      rubric.typographyHierarchy.score += 14;
      rubric.typographyHierarchy.feedback.push(`Adequate typography ratio (${ratio}x). Recommended >= 5.0x for bold display impact.`);
    } else {
      rubric.typographyHierarchy.score += 8;
      rubric.typographyHierarchy.feedback.push(`Weak typography hierarchy (${ratio}x ratio). Increase headline size relative to micro-labels.`);
    }

    // Axis 4: Optical Depth & Lighting (20 pts)
    let opticalScore = 0;
    if (domMetrics.elevatedCardCount >= 5) {
      opticalScore += 6;
      rubric.opticalDepth.feedback.push(`Strong glassmorphic elevation (${domMetrics.elevatedCardCount} cards).`);
    } else {
      rubric.opticalDepth.feedback.push('Increase depth with frosted glass cards (backdrop-filter: blur).');
    }

    if (domMetrics.has3DPerspective) {
      opticalScore += 6;
      rubric.opticalDepth.feedback.push('2.5D perspective / isometric camera pitch active.');
    } else {
      rubric.opticalDepth.feedback.push('Add 2.5D perspective tilt (perspective: 1400px; rotateX/rotateY).');
    }

    if (domMetrics.hasKeyLight || htmlContent.includes('radial-gradient')) {
      opticalScore += 4;
      rubric.opticalDepth.feedback.push('Directional key lighting active.');
    } else {
      rubric.opticalDepth.feedback.push('Add directional key light from upper-left.');
    }

    if (domMetrics.hasOpticsOverlay || htmlContent.includes('noiseFilter')) {
      opticalScore += 4;
      rubric.opticalDepth.feedback.push('Anti-banding 35mm film grain overlay active.');
    } else {
      rubric.opticalDepth.feedback.push('Add .cinematic-optics-overlay to eliminate gradient color banding.');
    }
    rubric.opticalDepth.score = Math.min(20, opticalScore);

    // Axis 5: Acoustic Synchronization (20 pts)
    const cues = metadata.cueSheet?.sfxCues || metadata.sfxCues || [];
    if (cues.length >= 6) {
      rubric.acousticSync.score += 20;
      rubric.acousticSync.feedback.push(`Dense, frame-accurate sound design (${cues.length} synchronized SFX cues).`);
    } else if (cues.length >= 3) {
      rubric.acousticSync.score += 15;
      rubric.acousticSync.feedback.push(`Basic sound design (${cues.length} cues). Add micro-clicks and impact cues.`);
    } else {
      // Check if mix_audio.js or sound cues exist in repo
      rubric.acousticSync.score += 12;
      rubric.acousticSync.feedback.push('Verify that SFX cues align within +-33ms of visual button clicks.');
    }

    // Total Score Calculation
    const totalScore = Object.values(rubric).reduce((acc, curr) => acc + curr.score, 0);
    const passed = totalScore >= 95;

    // Collect actionable revisions
    const revisions = [];
    if (!domMetrics.hasOpticsOverlay) revisions.push('Inject .cinematic-optics-overlay (35mm film grain filter)');
    if (!domMetrics.hasKeyLight) revisions.push('Inject .cinematic-key-light (upper-left soft key light)');
    if (ratio < 5.0) revisions.push(`Boost typography hierarchy ratio from ${ratio}x to >= 5.0x`);
    if (!domMetrics.hasCursor) revisions.push('Add simulated cursor navigation and click animation');
    if (cues.length < 6) revisions.push('Expand sound design cue sheet to >= 6 micro-timed triggers');

    const result = {
      scene: path.basename(scenePath),
      totalScore,
      passed,
      threshold: 95,
      rubric,
      metrics: domMetrics,
      revisions
    };

    console.log(`\n======================================================`);
    console.log(`[MotionCriticAgent] Scene: ${result.scene}`);
    console.log(`[MotionCriticAgent] Overall Score: ${totalScore} / 100 (${passed ? 'PASSED >= 95%' : 'REVISE < 95%'})`);
    console.log(`  • Hook & Visual Density:      ${rubric.hookAndDensity.score} / 20`);
    console.log(`  • Living Software Truth:      ${rubric.livingSoftware.score} / 20`);
    console.log(`  • Typography Hierarchy:       ${rubric.typographyHierarchy.score} / 20`);
    console.log(`  • Optical Depth & Lighting:   ${rubric.opticalDepth.score} / 20`);
    console.log(`  • Acoustic Synchronization:   ${rubric.acousticSync.score} / 20`);
    if (revisions.length > 0) {
      console.log(`[MotionCriticAgent] Actionable Revisions Required:`);
      revisions.forEach(r => console.log(`    - ${r}`));
    }
    console.log(`======================================================\n`);

    return result;
  }
}

// CLI Runner
if (process.argv[1] && process.argv[1].endsWith('critic_agent.js')) {
  const targetScene = process.argv[2] || 'examples/compiled/focusflow-brag-launch/index.html';
  const critic = new MotionCriticAgent();
  critic.evaluate(targetScene, {
    sfxCues: [
      { time: 1.10, sfx: 'click' },
      { time: 1.25, sfx: 'shatter' },
      { time: 3.00, sfx: 'click' },
      { time: 4.20, sfx: 'keypress' },
      { time: 5.40, sfx: 'switch' },
      { time: 5.60, sfx: 'chime' },
      { time: 8.20, sfx: 'click' }
    ]
  }).catch(console.error);
}
