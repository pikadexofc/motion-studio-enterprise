import { SceneValidator } from '../src/schema/validator.js';
import { globalComponentRegistry } from '../src/components/registry.js';

async function runSchemaTests() {
  console.log('=== Motion Studio Schema & Validator Tests ===');

  // Test 1: Valid minimal manifest
  const validManifest = {
    id: 'valid-test',
    version: '1.0.0',
    canvas: { width: 1920, height: 1080, fps: 60, duration: 3.0 },
    components: [
      {
        type: 'TextReveal',
        id: 'headline-1',
        timing: { start: 0.2, duration: 1.0 },
        parameters: { text: 'Hello World' }
      }
    ]
  };

  const res1 = SceneValidator.validate(validManifest, globalComponentRegistry);
  console.log('[Test 1: Valid Manifest]', res1.valid ? 'PASS' : 'FAIL');
  if (!res1.valid) throw new Error(`Valid manifest failed: ${res1.errors.join(', ')}`);

  // Test 2: Missing required canvas.duration
  const badManifest1 = {
    id: 'bad-test-1',
    version: '1.0.0',
    canvas: { width: 1920, height: 1080 },
    components: []
  };
  const res2 = SceneValidator.validate(badManifest1, globalComponentRegistry);
  console.log('[Test 2: Missing Duration Detected]', !res2.valid ? 'PASS' : 'FAIL');
  if (res2.valid) throw new Error('Validator failed to catch missing canvas.duration!');

  // Test 3: Duplicate Component IDs
  const badManifest2 = {
    id: 'bad-test-2',
    version: '1.0.0',
    canvas: { duration: 3.0 },
    components: [
      { type: 'BrandBadge', id: 'badge-1', timing: { start: 0, duration: 1 } },
      { type: 'BrandBadge', id: 'badge-1', timing: { start: 1, duration: 1 } }
    ]
  };
  const res3 = SceneValidator.validate(badManifest2, globalComponentRegistry);
  console.log('[Test 3: Duplicate ID Detected]', !res3.valid ? 'PASS' : 'FAIL');
  if (res3.valid || !res3.errors.some(e => e.includes('Duplicate component id'))) {
    throw new Error('Validator failed to catch duplicate component ID!');
  }

  // Test 4: Unknown Component Type
  const badManifest3 = {
    id: 'bad-test-3',
    version: '1.0.0',
    canvas: { duration: 3.0 },
    components: [
      { type: 'NonExistentComponent', id: 'comp-x', timing: { start: 0, duration: 1 } }
    ]
  };
  const res4 = SceneValidator.validate(badManifest3, globalComponentRegistry);
  console.log('[Test 4: Unknown Component Detected]', !res4.valid ? 'PASS' : 'FAIL');
  if (res4.valid || !res4.errors.some(e => e.includes('unknown component type'))) {
    throw new Error('Validator failed to catch unknown component type!');
  }

  // Test 5: Invalid Component Parameter Type
  const badManifest4 = {
    id: 'bad-test-4',
    version: '1.0.0',
    canvas: { duration: 3.0 },
    components: [
      { type: 'TextReveal', id: 'text-comp', timing: { start: 0, duration: 1 }, parameters: { text: 12345 } }
    ]
  };
  const res5 = SceneValidator.validate(badManifest4, globalComponentRegistry);
  console.log('[Test 5: Bad Parameter Type Detected]', !res5.valid ? 'PASS' : 'FAIL');
  if (res5.valid || !res5.errors.some(e => e.includes('must be a string'))) {
    throw new Error('Validator failed to catch bad parameter type!');
  }

  console.log('=== All Schema & Validator Tests Passed! ===\n');
}

runSchemaTests().catch(err => {
  console.error('[FATAL] Schema validation test failed:', err);
  process.exit(1);
});
