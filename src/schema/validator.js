import fs from 'fs';
import path from 'path';

/**
 * Motion Studio — Scene Schema & Manifest Validator
 */
export class SceneValidator {
  /**
   * Validate a scene manifest object.
   * @param {Object} manifest - The scene manifest to validate
   * @param {Object} registry - Optional ComponentRegistry instance to validate component contracts
   * @param {string} basePath - Base path for resolving local asset files
   */
  static validate(manifest, registry = null, basePath = process.cwd()) {
    const errors = [];
    const warnings = [];

    // 1. Root structure validation
    if (!manifest || typeof manifest !== 'object') {
      return { valid: false, errors: ['Manifest must be a non-null object'], warnings: [] };
    }

    if (!manifest.id || typeof manifest.id !== 'string') {
      errors.push('Missing or invalid required field: "id" (must be string)');
    }

    if (!manifest.version || typeof manifest.version !== 'string') {
      errors.push('Missing or invalid required field: "version" (must be string)');
    }

    if (!manifest.canvas || typeof manifest.canvas !== 'object') {
      errors.push('Missing required section: "canvas"');
    } else {
      const { duration, fps, width, height } = manifest.canvas;
      if (typeof duration !== 'number' || duration <= 0) {
        errors.push('Canvas "duration" must be a positive number');
      }
      if (fps !== undefined && (typeof fps !== 'number' || fps <= 0)) {
        errors.push('Canvas "fps" must be a positive number');
      }
      if (width !== undefined && (typeof width !== 'number' || width <= 0)) {
        errors.push('Canvas "width" must be a positive number');
      }
      if (height !== undefined && (typeof height !== 'number' || height <= 0)) {
        errors.push('Canvas "height" must be a positive number');
      }
    }

    if (!Array.isArray(manifest.components)) {
      errors.push('Missing or invalid required array: "components"');
      return { valid: errors.length === 0, errors, warnings };
    }

    const canvasDuration = manifest.canvas?.duration || Infinity;

    // 2. Component structure & timing validation
    const componentIds = new Set();

    manifest.components.forEach((comp, idx) => {
      const compLabel = comp.id ? `Component "${comp.id}"` : `Component at index ${idx}`;

      if (!comp.type || typeof comp.type !== 'string') {
        errors.push(`${compLabel} is missing required field "type"`);
      }

      if (!comp.id || typeof comp.id !== 'string') {
        errors.push(`Component at index ${idx} is missing required unique field "id"`);
      } else {
        if (componentIds.has(comp.id)) {
          errors.push(`Duplicate component id "${comp.id}" detected`);
        }
        componentIds.add(comp.id);
      }

      if (!comp.timing || typeof comp.timing !== 'object') {
        errors.push(`${compLabel} is missing required "timing" object`);
      } else {
        const { start, duration } = comp.timing;
        if (typeof start !== 'number' || start < 0) {
          errors.push(`${compLabel} timing.start must be a non-negative number`);
        }
        if (typeof duration !== 'number' || duration <= 0) {
          errors.push(`${compLabel} timing.duration must be a positive number`);
        }
        if (typeof start === 'number' && typeof duration === 'number') {
          if (start + duration > canvasDuration + 0.05) {
            warnings.push(
              `${compLabel} timing (${start + duration}s) exceeds canvas duration (${canvasDuration}s)`
            );
          }
        }
      }

      // 3. Registry validation (if registry provided)
      if (registry && comp.type) {
        const definition = registry.get(comp.type);
        if (!definition) {
          errors.push(`${compLabel} specifies unknown component type "${comp.type}"`);
        } else {
          // Validate against component's parameter schema
          if (typeof definition.validateParameters === 'function') {
            const paramResult = definition.validateParameters(comp.parameters || {});
            if (!paramResult.valid) {
              paramResult.errors.forEach(e => errors.push(`${compLabel} parameter error: ${e}`));
            }
          }
        }
      }
    });

    // 4. Asset references validation
    if (manifest.assets && typeof manifest.assets === 'object') {
      for (const [key, asset] of Object.entries(manifest.assets)) {
        if (!asset) continue;
        const src = typeof asset === 'string' ? asset : asset.src;
        if (!src) continue;
        if (
          typeof src === 'string' &&
          !src.startsWith('http') &&
          !src.startsWith('data:')
        ) {
          const resolvedPath = path.resolve(basePath, src);
          if (!fs.existsSync(resolvedPath)) {
            warnings.push(`Local asset "${key}" not found on disk: ${resolvedPath}`);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}
