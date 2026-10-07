/**
 * Motion Validation Agent — The 95% Quality Gatekeeper.
 * Evaluates generated motion scene manifests, compiled compositions, and rendered frames
 * against rigorous, professional SaaS motion design standards.
 * 
 * Enforces the strict rule:
 * Must achieve >= 95.0% score before final delivery.
 * Otherwise, outputs a structured Deficiency Matrix for the Revision Agent.
 */

export class MotionValidationAgent {
  constructor(options = {}) {
    this.name = 'MotionValidationAgent';
    this.passingThreshold = options.threshold || 95.0; // Strictly 95%
  }

  /**
   * Evaluate a scene manifest and its compiled DOM representation.
   * @param {Object} manifest - The Motion Scene Manifest
   * @param {string} [htmlContent] - The compiled HTML composition content
   * @returns {Object} Evaluation report with score, breakdown, and deficiency matrix
   */
  evaluate(manifest, htmlContent = '') {
    const deficiencies = [];
    const scores = {};

    // -------------------------------------------------------------
    // PILLAR 1: Spatial Staging & Double-Bezel Hierarchy (15%)
    // -------------------------------------------------------------
    let p1Score = 100;
    const hasDoubleBezel = JSON.stringify(manifest).includes('double-bezel');
    if (!hasDoubleBezel) {
      p1Score -= 40;
      deficiencies.push({
        pillar: 'Spatial Staging',
        code: 'MISSING_DOUBLE_BEZEL',
        severity: 'HIGH',
        message: 'Cards are rendered without double-bezel (Doppelrand) nested architecture.',
        remedy: 'Wrap primary cards in an outer translucent chassis with concentric inner core.'
      });
    }

    if (manifest.canvas.width === 1080 && manifest.canvas.height === 1920) {
      // 9:16 vertical safe area check
      const scenes = manifest.scenes || [];
      const hasSafeY = scenes.every(s => 
        (s.tracks || []).every(t => {
          const y = t.parameters?.position?.y;
          if (typeof y === 'string' && y.endsWith('%')) {
            const val = parseFloat(y);
            return val >= 10 && val <= 85;
          }
          return true;
        })
      );
      if (!hasSafeY) {
        p1Score -= 20;
        deficiencies.push({
          pillar: 'Spatial Staging',
          code: 'SAFE_AREA_VIOLATION',
          severity: 'MEDIUM',
          message: 'Components positioned outside 9:16 mobile safe vertical zone (10% - 85%).',
          remedy: 'Constrain vertical anchors within y: 15% to 80%.'
        });
      }
    }
    scores.spatialStaging = Math.max(0, p1Score);

    // -------------------------------------------------------------
    // PILLAR 2: Kinematics & Easing Smoothness (15%)
    // -------------------------------------------------------------
    let p2Score = 100;
    const manifestStr = JSON.stringify(manifest);

    // Check for banned linear or crude easing
    if (manifestStr.includes('"linear"') || manifestStr.includes('"none"') || manifestStr.includes('"power1')) {
      p2Score -= 50;
      deficiencies.push({
        pillar: 'Kinematics',
        code: 'BANNED_CRUDE_EASING',
        severity: 'CRITICAL',
        message: 'Crude or linear easing detected. Professional SaaS motion requires high-order curves.',
        remedy: 'Replace all transitions with cubic-bezier(0.16, 1, 0.3, 1) or calibrated spring physics.'
      });
    }

    const hasCubicBezier = manifestStr.includes('cubic-bezier') || (manifest.tokens?.physics?.defaultEase || '').includes('cubic-bezier');
    if (!hasCubicBezier) {
      p2Score -= 30;
      deficiencies.push({
        pillar: 'Kinematics',
        code: 'MISSING_HIGH_ORDER_EASING',
        severity: 'HIGH',
        message: 'No high-order cubic-bezier easing detected in manifest tokens.',
        remedy: 'Inject defaultEase: "cubic-bezier(0.16, 1, 0.3, 1)" into physics tokens.'
      });
    }
    scores.kinematics = Math.max(0, p2Score);

    // -------------------------------------------------------------
    // PILLAR 3: Chromatic Atmosphere & Dark-Mode Mesh (15%)
    // -------------------------------------------------------------
    let p3Score = 100;
    const backgroundType = manifest.tokens?.atmosphere?.backgroundType;
    if (backgroundType !== 'chromatic-mesh' && !manifestStr.includes('radial-gradient')) {
      p3Score -= 40;
      deficiencies.push({
        pillar: 'Chromatic Atmosphere',
        code: 'FLAT_BACKGROUND_DETECTED',
        severity: 'HIGH',
        message: 'Background lacks chromatic radial gradient mesh. Flat backgrounds look amateur.',
        remedy: 'Enable backgroundType: "chromatic-mesh" with dual-point radial orbs.'
      });
    }

    const hasFilmGrain = manifest.tokens?.atmosphere?.filmGrain === true;
    if (!hasFilmGrain) {
      p3Score -= 20;
      deficiencies.push({
        pillar: 'Chromatic Atmosphere',
        code: 'MISSING_FILM_GRAIN',
        severity: 'MEDIUM',
        message: 'Film grain anti-banding overlay is disabled.',
        remedy: 'Enable atmosphere.filmGrain: true to prevent 8-bit banding.'
      });
    }
    scores.chromaticAtmosphere = Math.max(0, p3Score);

    // -------------------------------------------------------------
    // PILLAR 4: Typographic Motion Hierarchy (15%)
    // -------------------------------------------------------------
    let p4Score = 100;
    const scenes = manifest.scenes || [];
    let hasStaggeredText = false;
    let hasTabularNums = false;

    for (const sc of scenes) {
      for (const tr of sc.tracks || []) {
        if (tr.componentId === 'TextReveal') {
          if (tr.parameters?.staggerMs && tr.parameters.staggerMs >= 20) {
            hasStaggeredText = true;
          }
          if (tr.parameters?.tracking && tr.parameters.tracking.startsWith('-')) {
            // Tight tracking bonus
          } else {
            p4Score -= 10;
          }
        }
        if (tr.parameters?.metricValue || tr.componentId === 'MetricCounter') {
          hasTabularNums = true;
        }
      }
    }

    if (!hasStaggeredText) {
      p4Score -= 30;
      deficiencies.push({
        pillar: 'Typography',
        code: 'UNSTAGGERED_TYPOGRAPHY',
        severity: 'HIGH',
        message: 'Text reveals lack word/character stagger deltas.',
        remedy: 'Set staggerMs: 40 on all primary headline reveals.'
      });
    }
    scores.typography = Math.max(0, p4Score);

    // -------------------------------------------------------------
    // PILLAR 5: Iconography & Asset High-DPI Fidelity (10%)
    // -------------------------------------------------------------
    let p5Score = 100;
    // Strict ban on unicode emojis in manifest and htmlContent
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    if (emojiRegex.test(manifestStr) || (htmlContent && emojiRegex.test(htmlContent))) {
      p5Score -= 60;
      deficiencies.push({
        pillar: 'Iconography',
        code: 'BANNED_EMOJI_DETECTED',
        severity: 'CRITICAL',
        message: 'Amateur unicode emojis detected in scene copy or components.',
        remedy: 'Replace all emojis with inline Lucide / SVG vector line glyphs (stroke-width: 1.5).'
      });
    }
    scores.iconography = Math.max(0, p5Score);

    // -------------------------------------------------------------
    // PILLAR 6: High-Tech SaaS Motifs (10%)
    // -------------------------------------------------------------
    let p6Score = 100;
    const hasIsometricTilt = manifestStr.includes('isometricTilt') || manifestStr.includes('rotateX');
    const hasLaserGlowOrBadge = manifestStr.includes('pill-laser-glow') || manifestStr.includes('BrandBadge');

    if (!hasIsometricTilt) {
      p6Score -= 25;
      deficiencies.push({
        pillar: 'SaaS Motifs',
        code: 'MISSING_2_5D_PERSPECTIVE',
        severity: 'MEDIUM',
        message: 'Product UI cards rendered purely flat without 2.5D perspective tilt.',
        remedy: 'Apply isometricTilt: { rx: 12, ry: -8, rz: 2 } to core product cards.'
      });
    }
    if (!hasLaserGlowOrBadge) {
      p6Score -= 20;
      deficiencies.push({
        pillar: 'SaaS Motifs',
        code: 'MISSING_TECH_BADGE',
        severity: 'MEDIUM',
        message: 'Hook scene lacks a laser glow eyebrow badge.',
        remedy: 'Inject BrandBadge with variant "pill-laser-glow".'
      });
    }
    scores.saasMotifs = Math.max(0, p6Score);

    // -------------------------------------------------------------
    // PILLAR 7: Frame Determinism & Virtual Time Stepping (10%)
    // -------------------------------------------------------------
    let p7Score = 100;
    if (htmlContent && !htmlContent.includes('window.renderFrame')) {
      p7Score -= 50;
      deficiencies.push({
        pillar: 'Determinism',
        code: 'MISSING_RENDER_FRAME_HOOK',
        severity: 'CRITICAL',
        message: 'Compiled scene does not implement window.renderFrame(time, frame).',
        remedy: 'Ensure compiler emits universal seek hook.'
      });
    }
    scores.determinism = Math.max(0, p7Score);

    // -------------------------------------------------------------
    // PILLAR 8: Brand Identity & Ground Truth Lockdown (10%)
    // -------------------------------------------------------------
    let p8Score = 100;
    if (!manifest.groundTruth?.website || !manifest.groundTruth.website.includes('.')) {
      p8Score -= 40;
      deficiencies.push({
        pillar: 'Brand Ground Truth',
        code: 'INVALID_GROUND_TRUTH_URL',
        severity: 'HIGH',
        message: 'Missing or invalid verified company website.',
        remedy: 'Set valid groundTruth.website in manifest.'
      });
    }
    scores.brandIdentity = Math.max(0, p8Score);

    // -------------------------------------------------------------
    // WEIGHTED AGGREGATE CALCULATION
    // -------------------------------------------------------------
    const aggregateScore = Number((
      scores.spatialStaging * 0.15 +
      scores.kinematics * 0.15 +
      scores.chromaticAtmosphere * 0.15 +
      scores.typography * 0.15 +
      scores.iconography * 0.10 +
      scores.saasMotifs * 0.10 +
      scores.determinism * 0.10 +
      scores.brandIdentity * 0.10
    ).toFixed(2));

    const passed = aggregateScore >= this.passingThreshold;

    return {
      passed,
      threshold: this.passingThreshold,
      aggregateScore,
      scores,
      deficiencies,
      summary: passed 
        ? `[VALIDATION APPROVED] Score ${aggregateScore}% meets professional SaaS standard (>= ${this.passingThreshold}%).`
        : `[VALIDATION REJECTED] Score ${aggregateScore}% fails professional standard (requires >= ${this.passingThreshold}%). ${deficiencies.length} deficiencies identified.`
    };
  }
}
