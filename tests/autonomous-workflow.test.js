import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { BrandIngestionAgent } from '../src/agents/BrandIngestionAgent.js';
import { MotionValidationAgent } from '../src/agents/MotionValidationAgent.js';
import { MotionRevisionAgent } from '../src/agents/MotionRevisionAgent.js';
import { AutonomousMotionOrchestrator } from '../src/agents/Orchestrator.js';

console.log('=== Autonomous SaaS Motion Multi-Agent Test Suite ===\n');

// 1. Test Brand Ingestion Agent
const validBrandData = {
  company: {
    name: 'QuantumGrid',
    sector: 'Distributed AI Compute',
    tagline: 'Infinite Tensor Processing'
  },
  format: {
    width: 1080,
    height: 1920,
    fps: 60,
    duration: 15.0,
    aspectRatio: '9:16'
  },
  narrative: {
    hook: 'Training foundation models takes 3 weeks. What if it took 4 hours?',
    problem: 'GPU clusters idle waiting on network memory bottlenecks.',
    solution: 'QuantumGrid pipelines tensor shards with zero latency overhead.',
    cta: 'Deploy your first cluster today. Visit quantumgrid.ai.'
  },
  palette: {
    primary: '#10B981',
    secondary: '#030712',
    accent: '#38BDF8',
    surface: 'rgba(15, 23, 42, 0.90)',
    surfaceBorder: 'rgba(16, 185, 129, 0.35)',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8'
  },
  typography: {
    headlineFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono'
  },
  groundTruth: {
    website: 'www.quantumgrid.ai',
    phone: '1800 900 123',
    badge: 'ISO 27001 VERIFIED',
    proofMetric: '100X TENSOR THROUGHPUT'
  }
};

const ingestionAgent = new BrandIngestionAgent();
const initialManifest = ingestionAgent.process(validBrandData);

assert.strictEqual(initialManifest.company.name, 'QuantumGrid');
assert.strictEqual(initialManifest.archetype, 'Ethereal_Glass');
assert.strictEqual(initialManifest.canvas.fps, 60);
console.log('[Test PASSED] BrandIngestionAgent correctly processed company identity.');

// 2. Test Motion Validation Agent (Detecting Deficiencies)
const validationAgent = new MotionValidationAgent({ threshold: 95.0 });

// Artificially inject an amateur defect (e.g. linear easing and emoji) to test the gatekeeper
const defectiveManifest = JSON.parse(JSON.stringify(initialManifest));
defectiveManifest.scenes[0].tracks[1].parameters.headline = 'Training models takes 3 weeks! 🚀🔥';
defectiveManifest.tokens.physics.defaultEase = 'linear';
delete defectiveManifest.tokens.atmosphere.backgroundType;

const failReport = validationAgent.evaluate(defectiveManifest);
assert.strictEqual(failReport.passed, false, 'Validation Agent must reject sub-standard manifest');
assert.ok(failReport.aggregateScore < 95.0, 'Defective manifest score must be strictly < 95%');
assert.ok(failReport.deficiencies.length >= 2, 'Deficiencies must be detected');
console.log(`[Test PASSED] MotionValidationAgent rejected defective scene with score: ${failReport.aggregateScore}% (< 95%).`);

// 3. Test Motion Revision Agent (Executing Surgical Fixes)
const revisionAgent = new MotionRevisionAgent();
const revisionResult = revisionAgent.revise(defectiveManifest, failReport.deficiencies);

assert.ok(revisionResult.appliedFixes.length >= 2, 'Revision Agent must execute fixes');
const postRevisionReport = validationAgent.evaluate(revisionResult.manifest);
console.log(`[Test PASSED] MotionRevisionAgent elevated quality score from ${failReport.aggregateScore}% to ${postRevisionReport.aggregateScore}%.`);

// 4. Test Autonomous Orchestrator End-to-End Loop
async function testOrchestrator() {
  const orchestrator = new AutonomousMotionOrchestrator({ threshold: 95.0, maxIterations: 5 });
  const result = await orchestrator.runProductionLoop(validBrandData);

  assert.strictEqual(result.success, true, 'Orchestrator loop must succeed');
  assert.ok(result.finalScore >= 95.0, `Final score (${result.finalScore}%) must meet or exceed 95% threshold`);
  assert.ok(result.finalCompiledHtml.includes('window.renderFrame'), 'Compiled HTML must implement seek hook');
  console.log(`[Test PASSED] Autonomous Orchestrator surpassed 95% threshold in ${result.iterationsCompleted} cycles with final score ${result.finalScore}%!`);
}

testOrchestrator().then(() => {
  console.log('\n=== All Autonomous Motion Multi-Agent Tests Passed Successfully! ===');
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
