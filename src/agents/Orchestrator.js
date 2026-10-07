import { BrandIngestionAgent } from './BrandIngestionAgent.js';
import { MotionValidationAgent } from './MotionValidationAgent.js';
import { MotionRevisionAgent } from './MotionRevisionAgent.js';
import { SceneCompiler } from '../compiler/compiler.js';

/**
 * Autonomous Multi-Agent Motion Studio Orchestrator.
 * Coordinates Brand Ingestion -> Validation -> Revision Loop until 95% threshold is surpassed.
 */
export class AutonomousMotionOrchestrator {
  constructor(options = {}) {
    this.maxIterations = options.maxIterations || 5;
    this.threshold = options.threshold || 95.0; // Strictly 95%
    this.ingestionAgent = new BrandIngestionAgent(options);
    this.validationAgent = new MotionValidationAgent({ threshold: this.threshold });
    this.revisionAgent = new MotionRevisionAgent(options);
  }

  /**
   * Run the complete autonomous production loop.
   * @param {Object} brandIntakeData - Standard company brand questionnaire / payload
   * @param {string} [outputDir] - Destination folder for compiled output
   * @returns {Promise<Object>} Execution result with history, scores, and final manifest
   */
  async runProductionLoop(brandIntakeData, outputDir = null) {
    console.log(`\n======================================================`);
    console.log(`🚀 AUTONOMOUS SAAS MOTION ORCHESTRATOR INITIALIZED`);
    console.log(`   Client / Company: ${brandIntakeData.company?.name || 'Unknown'}`);
    console.log(`   Quality Target:   ${this.threshold}% (Professional Designer Standard)`);
    console.log(`======================================================`);

    const runHistory = [];

    // Step 1: Initial Ingestion & Manifest Generation
    console.log(`\n[Stage 1] Ingesting company branding and guidelines...`);
    let currentManifest = this.ingestionAgent.process(brandIntakeData);
    let iteration = 0;
    let isApproved = false;
    let latestReport = null;

    while (iteration < this.maxIterations && !isApproved) {
      iteration++;
      console.log(`\n------------------------------------------------------`);
      console.log(`🔄 EXECUTION SPRINT ${iteration} / ${this.maxIterations}`);
      console.log(`------------------------------------------------------`);

      // Step 2: Compile Scene Graph
      console.log(`[Compiler] Assembling semantic scene graph...`);
      const compiled = SceneCompiler.compile(currentManifest, outputDir);
      const htmlContent = compiled.html;

      // Step 3: Motion Validation Agent Audit (The 95% Gatekeeper)
      console.log(`[Validator] Auditing against 8 professional motion design pillars...`);
      latestReport = this.validationAgent.evaluate(currentManifest, htmlContent);

      console.log(`[Validator] Sprint ${iteration} Score: ${latestReport.aggregateScore}% (Threshold: ${this.threshold}%)`);
      console.log(`            Spatial: ${latestReport.scores.spatialStaging}% | Kinematics: ${latestReport.scores.kinematics}% | Atmosphere: ${latestReport.scores.chromaticAtmosphere}% | Type: ${latestReport.scores.typography}%`);
      console.log(`            Icons:   ${latestReport.scores.iconography}% | Motifs:     ${latestReport.scores.saasMotifs}% | Determinism: ${latestReport.scores.determinism}% | Brand: ${latestReport.scores.brandIdentity}%`);

      runHistory.push({
        iteration,
        score: latestReport.aggregateScore,
        passed: latestReport.passed,
        scores: latestReport.scores,
        deficienciesCount: latestReport.deficiencies.length,
        deficiencies: latestReport.deficiencies
      });

      if (latestReport.passed) {
        console.log(`\n🏆 [PRODUCTION APPROVED] Milestone surpassed with ${latestReport.aggregateScore}%!`);
        isApproved = true;
        break;
      }

      console.warn(`⚠️ [REVISION REQUIRED] Score ${latestReport.aggregateScore}% < ${this.threshold}%. Routing to MotionRevisionAgent...`);
      for (const d of latestReport.deficiencies) {
        console.log(`   - [${d.severity}] ${d.pillar}: ${d.message}`);
      }

      // Step 4: Motion Revision Agent Surgical Enhancement
      const revisionResult = this.revisionAgent.revise(currentManifest, latestReport.deficiencies);
      currentManifest = revisionResult.manifest;

      console.log(`[RevisionAgent] Successfully resolved ${revisionResult.appliedFixes.length} structural defects.`);
    }

    if (!isApproved) {
      console.error(`\n❌ [ORCHESTRATOR HALT] Failed to reach ${this.threshold}% quality standard after ${this.maxIterations} iterations.`);
    }

    // Final compilation of the approved asset
    const finalCompiled = SceneCompiler.compile(currentManifest, outputDir);

    let savedPath = null;
    if (outputDir) {
      savedPath = SceneCompiler.save(finalCompiled, outputDir);
      console.log(`\n💾 Approved production saved to: ${savedPath}`);
    }

    return {
      success: isApproved,
      finalScore: latestReport.aggregateScore,
      iterationsCompleted: iteration,
      runHistory,
      finalManifest: currentManifest,
      finalCompiledHtml: finalCompiled.html,
      savedPath
    };
  }
}
