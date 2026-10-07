import { BrandIntakeSchema } from '../schema/BrandIntakeSchema.js';

/**
 * Standard inline SVG vector glyph library (replacing amateur emojis).
 */
export const VECTOR_GLYPHS = {
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  zap: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  globe: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  activity: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  sparkles: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
  cpu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`
};

/**
 * Brand Ingestion Agent.
 * Translates natural company branding, guidelines, and assets into an immutable,
 * high-tech Motion Scene Manifest adhering strictly to professional SaaS visual laws.
 */
export class BrandIngestionAgent {
  constructor(options = {}) {
    this.name = 'BrandIngestionAgent';
    this.options = options;
  }

  /**
   * Process brand intake payload and generate a structured Motion Scene Manifest.
   */
  process(intakeData) {
    const validation = BrandIntakeSchema.validate(intakeData);
    if (!validation.valid) {
      throw new Error(`[BrandIngestionAgent] Invalid Brand Intake Payload:\n - ${validation.errors.join('\n - ')}`);
    }

    const { company, format, narrative, palette, typography, groundTruth, assets = {} } = intakeData;

    // 1. Infer Sector Archetype
    const sectorLower = (company.sector || '').toLowerCase();
    let archetype = 'Ethereal_Glass';
    if (sectorLower.includes('fintech') || sectorLower.includes('finance') || sectorLower.includes('enterprise')) {
      archetype = 'Precision_Steel';
    } else if (sectorLower.includes('creative') || sectorLower.includes('logistics') || sectorLower.includes('marketing')) {
      archetype = 'Modern_Warm';
    }

    console.log(`[BrandIngestionAgent] Ingested "${company.name}" (${company.sector}) -> Visual Archetype: ${archetype}`);

    // 2. Synthesize Design Tokens
    const designTokens = {
      colors: {
        primary: palette.primary,
        secondary: palette.secondary || '#0A0E17',
        background: palette.secondary || '#050508',
        accent: palette.accent || palette.primary,
        highlight: palette.primary,
        surface: palette.surface || 'rgba(15, 23, 42, 0.85)',
        surfaceBorder: palette.surfaceBorder || 'rgba(255, 255, 255, 0.12)',
        textPrimary: palette.textPrimary || '#FFFFFF',
        textSecondary: palette.textSecondary || '#94A3B8'
      },
      palette: {
        primary: palette.primary,
        secondary: palette.secondary || '#0A0E17',
        accent: palette.accent || palette.primary,
        surface: palette.surface || 'rgba(15, 23, 42, 0.85)',
        surfaceBorder: palette.surfaceBorder || 'rgba(255, 255, 255, 0.12)',
        textPrimary: palette.textPrimary || '#FFFFFF',
        textSecondary: palette.textSecondary || '#94A3B8'
      },
      typography: {
        fontDisplay: typography.headlineFont ? `'${typography.headlineFont}', sans-serif` : 'Plus Jakarta Sans',
        fontBody: typography.bodyFont ? `'${typography.bodyFont}', sans-serif` : 'Inter',
        fontMono: typography.monoFont ? `'${typography.monoFont}', monospace` : 'JetBrains Mono',
        headline: typography.headlineFont || 'Plus Jakarta Sans',
        body: typography.bodyFont || 'Inter',
        mono: typography.monoFont || 'JetBrains Mono'
      },
      physics: {
        defaultEase: 'cubic-bezier(0.16, 1, 0.3, 1)',
        springDamping: 0.75,
        springStiffness: 180
      },
      atmosphere: {
        backgroundType: 'chromatic-mesh',
        filmGrain: true,
        noiseOpacity: 0.035
      }
    };

    // 3. Assemble Declarative Scene Manifest
    const duration = format.duration || 20.0;
    const width = format.width || 1080;
    const height = format.height || 1920;
    const fps = format.fps || 60;

    const manifest = {
      $schema: 'https://motion-studio.internal/schemas/motion-scene.v1.json',
      id: `${company.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-saas-motion`,
      title: `${company.name} — High-Tech SaaS Product Launch`,
      version: '1.0.0',
      canvas: {
        width,
        height,
        fps,
        duration,
        aspectRatio: format.aspectRatio || (width === 1080 && height === 1920 ? '9:16' : '16:9'),
        backgroundColor: designTokens.palette.secondary
      },
      archetype,
      tokens: designTokens,
      company: {
        name: company.name,
        sector: company.sector,
        tagline: company.tagline || ''
      },
      groundTruth: {
        website: groundTruth.website,
        phone: groundTruth.phone || '',
        badge: groundTruth.badge || 'VERIFIED ENTERPRISE',
        proofMetric: groundTruth.proofMetric || '99.99% RELIABILITY'
      },
      narrative: {
        hook: narrative.hook,
        problem: narrative.problem || '',
        solution: narrative.solution || '',
        cta: narrative.cta
      },
      assets: {
        logo: assets.logo || null,
        uiMockup: assets.uiMockup || null,
        glyphs: VECTOR_GLYPHS
      },
      // Timeline Beats
      scenes: [
        {
          id: 'scene-01-hook',
          name: 'The Problem & Hook',
          start: 0.0,
          duration: Math.min(5.0, duration * 0.25),
          tracks: [
            {
              id: 'track-hook-badge',
              componentId: 'BrandBadge',
              layer: { zIndex: 10 },
              parameters: {
                label: (company.tagline || 'INNOVATION').toUpperCase(),
                variant: 'pill-laser-glow',
                iconSvg: VECTOR_GLYPHS.zap,
                position: { x: '50%', y: '40%' }
              }
            },
            {
              id: 'track-hook-text',
              componentId: 'TextReveal',
              layer: { zIndex: 12 },
              parameters: {
                headline: narrative.hook,
                font: designTokens.typography.headline,
                size: width === 1080 ? 64 : 80,
                weight: 900,
                color: '#FFFFFF',
                tracking: '-0.03em',
                staggerMs: 40,
                easing: designTokens.physics.defaultEase,
                position: { x: '50%', y: '52%' }
              }
            }
          ]
        },
        {
          id: 'scene-02-solution-demo',
          name: 'Interactive Solution & 2.5D Product UI',
          start: Math.min(5.0, duration * 0.25),
          duration: Math.min(8.0, duration * 0.40),
          tracks: [
            {
              id: 'track-solution-card',
              componentId: 'SurfaceCard',
              layer: { zIndex: 15 },
              parameters: {
                architecture: 'double-bezel',
                title: `${company.name} AI Core Engine`,
                statusText: 'ACTIVE STREAM',
                statusIcon: VECTOR_GLYPHS.activity,
                headline: narrative.solution || 'Sub-millisecond processing at cloud scale',
                metricValue: groundTruth.proofMetric,
                position: { x: '50%', y: '50%' },
                isometricTilt: { rx: 12, ry: -8, rz: 2 }
              }
            }
          ]
        },
        {
          id: 'scene-03-conversion-outro',
          name: 'Arrival & Ground Truth Conversion CTA',
          start: duration - Math.min(7.0, duration * 0.35),
          duration: Math.min(7.0, duration * 0.35),
          tracks: [
            {
              id: 'track-conversion-outro',
              componentId: 'SurfaceCard',
              layer: { zIndex: 20 },
              parameters: {
                architecture: 'double-bezel-cta',
                companyName: company.name,
                ctaText: narrative.cta,
                website: groundTruth.website,
                phone: groundTruth.phone,
                badge: groundTruth.badge,
                primaryColor: designTokens.palette.primary,
                position: { x: '50%', y: '50%' }
              }
            }
          ]
        }
      ]
    };

    return manifest;
  }
}
