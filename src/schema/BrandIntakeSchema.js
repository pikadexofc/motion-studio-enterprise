/**
 * Brand Intake Schema & Validator.
 * Enforces strict typing and completeness on company branding data.
 */

export const BrandIntakeSchema = {
  validate(data) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      return { valid: false, errors: ['Brand intake payload must be a non-empty object'] };
    }

    // Company metadata
    if (!data.company || !data.company.name) {
      errors.push('company.name is required');
    }

    // Target format
    if (!data.format) {
      errors.push('format is required');
    } else {
      if (!data.format.width || data.format.width < 320) errors.push('format.width must be >= 320');
      if (!data.format.height || data.format.height < 320) errors.push('format.height must be >= 320');
      if (!data.format.fps || data.format.fps < 24) errors.push('format.fps must be >= 24');
      if (!data.format.duration || data.format.duration < 1.0) errors.push('format.duration must be >= 1.0s');
    }

    // Palette
    if (!data.palette) {
      errors.push('palette is required');
    } else {
      if (!data.palette.primary || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(data.palette.primary)) {
        errors.push('palette.primary must be a valid hex color');
      }
      if (!data.palette.secondary) {
        errors.push('palette.secondary is required');
      }
    }

    // Typography
    if (!data.typography) {
      errors.push('typography is required');
    } else {
      if (!data.typography.headlineFont) errors.push('typography.headlineFont is required');
      if (!data.typography.bodyFont) errors.push('typography.bodyFont is required');
    }

    // Narrative Copy
    if (!data.narrative) {
      errors.push('narrative is required');
    } else {
      if (!data.narrative.hook) errors.push('narrative.hook is required');
      if (!data.narrative.cta) errors.push('narrative.cta is required');
    }

    // Ground Truth
    if (!data.groundTruth) {
      errors.push('groundTruth is required');
    } else {
      if (!data.groundTruth.website) errors.push('groundTruth.website is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
};
