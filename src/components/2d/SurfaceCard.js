/**
 * 2D Motion Component: SurfaceCard
 * Glassmorphic container card for feature callouts, UI mockups, and layouts.
 */
export const SurfaceCard = {
  id: 'SurfaceCard',
  version: '1.0.0',
  category: 'layout',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Glassmorphic card surface with depth border and smooth spatial entrance.',
  complexity: { domNodes: 'low', memory: 'minimal' },
  supportedMotionTypes: ['slide-up', 'fade', 'scale'],
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    title: 'Feature Header',
    description: 'Supporting technical description or metric details.',
    width: '420px',
    height: 'auto',
    align: 'left'
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    return `
      <div id="${componentId}" class="comp-surface-card">
        <div class="surface-card-body" style="width: ${p.width}; text-align: ${p.align};">
          <div class="card-accent-bar"></div>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.description}</p>
        </div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    return `
      #${componentId} {
        position: relative;
        z-index: 18;
      }
      #${componentId} .surface-card-body {
        padding: 28px 32px;
        background: ${tokens.surfaces.glassBg};
        border: ${tokens.surfaces.glassBorder};
        border-radius: ${tokens.surfaces.radiusLg};
        backdrop-filter: blur(${tokens.surfaces.glassBlur});
        box-shadow: ${tokens.surfaces.shadowElevated};
      }
      #${componentId} .card-accent-bar {
        width: 40px;
        height: 3px;
        background: ${tokens.colors.highlight};
        border-radius: 2px;
        margin-bottom: 16px;
      }
      #${componentId} .card-title {
        font-family: ${tokens.typography.fontDisplay};
        font-size: ${tokens.typography.sizeTitle};
        font-weight: ${tokens.typography.weightHeadline};
        color: ${tokens.colors.textPrimary};
        margin-bottom: 8px;
      }
      #${componentId} .card-desc {
        font-family: ${tokens.typography.fontBody};
        font-size: ${tokens.typography.sizeBody};
        color: ${tokens.colors.textSecondary};
        line-height: 1.4;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    tl.from(`#${componentId}`, {
      y: 45,
      opacity: 0,
      duration: timing.duration || 0.9,
      ease: motion?.ease || 'power3.out'
    }, timing.start);
  }
};
