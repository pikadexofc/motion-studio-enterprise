/**
 * Motion Studio — Design Token System
 * Hierarchical token definitions: Global Presets -> Brand -> Scene -> Component Overrides
 */

export const DEFAULT_TOKENS = {
  colors: {
    background: '#07090e',
    surface: 'rgba(255, 255, 255, 0.04)',
    surfaceBorder: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    primary: '#4f46e5',
    accent: '#06b6d4',
    highlight: '#38bdf8',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  },
  typography: {
    fontDisplay: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontBody: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    sizeHero: '76px',
    sizeHeadline: '56px',
    sizeTitle: '36px',
    sizeBody: '20px',
    sizeCaption: '14px',
    weightHero: '800',
    weightHeadline: '700',
    weightTitle: '600',
    weightBody: '400',
    weightCaption: '500',
    letterSpacingHero: '-0.03em',
    letterSpacingHeadline: '-0.02em',
    letterSpacingTitle: '-0.01em',
    letterSpacingCaption: '0.12em'
  },
  surfaces: {
    glassBlur: '16px',
    glassBg: 'rgba(255, 255, 255, 0.03)',
    glassBorder: '1px solid rgba(255, 255, 255, 0.12)',
    radiusSm: '8px',
    radiusMd: '16px',
    radiusLg: '24px',
    radiusFull: '9999px',
    shadowElevated: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
    glowCyan: '0 0 30px rgba(6, 182, 212, 0.3)',
    glowIndigo: '0 0 40px rgba(79, 70, 229, 0.35)'
  },
  motion: {
    durationMicro: 0.25,
    durationShort: 0.5,
    durationMedium: 0.8,
    durationLong: 1.2,
    durationCinematic: 2.0,
    easeDecel: 'power3.out',
    easeAccel: 'power3.in',
    easeSmooth: 'power2.inOut',
    easeDramatic: 'expo.out',
    easeSnappy: 'back.out(1.4)',
    staggerFast: 0.04,
    staggerMedium: 0.08,
    staggerRelaxed: 0.12
  },
  lighting: {
    ambientColor: '#0a101d',
    ambientIntensity: 2.0,
    keyColor: '#ffffff',
    keyIntensity: 4.0,
    fillColor: '#06b6d4',
    fillIntensity: 5.0,
    rimColor: '#6366f1',
    rimIntensity: 7.0
  },
  camera: {
    fov: 45,
    near: 0.1,
    far: 100,
    defaultStyle: 'cinematic-orbit' // cinematic-orbit | subtle-drift | dramatic-advance | static-framing
  }
};

/**
 * Pre-configured Brand Themes
 */
export const BRAND_PRESETS = {
  'modern-saas': {
    colors: {
      background: '#07090e',
      primary: '#4f46e5',
      accent: '#06b6d4',
      highlight: '#38bdf8',
      textPrimary: '#f8fafc'
    },
    lighting: {
      fillColor: '#06b6d4',
      rimColor: '#6366f1'
    }
  },
  'cyber-neon': {
    colors: {
      background: '#050508',
      primary: '#ec4899',
      accent: '#00f0ff',
      highlight: '#f43f5e',
      textPrimary: '#ffffff'
    },
    lighting: {
      fillColor: '#00f0ff',
      rimColor: '#ec4899'
    }
  },
  'minimal-mono': {
    colors: {
      background: '#09090b',
      primary: '#ffffff',
      accent: '#a1a1aa',
      highlight: '#e4e4e7',
      textPrimary: '#f4f4f5'
    },
    lighting: {
      ambientIntensity: 2.5,
      keyIntensity: 5.0,
      fillColor: '#a1a1aa',
      rimColor: '#ffffff'
    }
  },
  'warm-creative': {
    colors: {
      background: '#0f0c08',
      primary: '#f59e0b',
      accent: '#ea580c',
      highlight: '#fbbf24',
      textPrimary: '#fffbeb'
    },
    lighting: {
      fillColor: '#f59e0b',
      rimColor: '#ea580c'
    }
  },
  'unn-movers': {
    colors: {
      background: '#070f1e',
      primary: '#FF7200',
      secondary: '#0E2A47',
      accent: '#FF8A1E',
      highlight: '#FFFFFF',
      surface: 'rgba(14, 42, 71, 0.88)',
      surfaceBorder: 'rgba(255, 114, 0, 0.35)',
      textPrimary: '#FFFFFF',
      textSecondary: '#E2E8F0',
      textMuted: '#94A3B8'
    },
    lighting: {
      ambientColor: '#070f1e',
      fillColor: '#FF7200',
      rimColor: '#1E3A8A'
    }
  }
};

/**
 * Deep merge utility for hierarchical token resolution
 */
export function resolveTokens(brandConfig = {}, sceneOverrides = {}, componentOverrides = {}) {
  const base = JSON.parse(JSON.stringify(DEFAULT_TOKENS));
  
  // 1. Merge Brand Preset if specified
  let brandTokens = {};
  if (brandConfig.preset && BRAND_PRESETS[brandConfig.preset]) {
    brandTokens = JSON.parse(JSON.stringify(BRAND_PRESETS[brandConfig.preset]));
  }
  
  // 2. Merge explicit brand configuration
  const customBrand = brandConfig.tokens || brandConfig;
  deepMerge(base, brandTokens);
  deepMerge(base, customBrand);
  
  // 3. Merge Scene-level overrides
  deepMerge(base, sceneOverrides);
  
  // 4. Merge Component-level overrides
  deepMerge(base, componentOverrides);
  
  return base;
}

function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
  return target;
}
