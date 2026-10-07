/**
 * 2D Motion Component: BrandBadge
 * Pill container with SVG icon, animated border, and elastic entrance.
 */
export const BrandBadge = {
  id: 'BrandBadge',
  version: '1.0.0',
  category: 'branding',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Pill badge featuring an icon and text mark with glassmorphism and subtle spring motion.',
  complexity: { domNodes: 'low', memory: 'minimal' },
  supportedMotionTypes: ['pop', 'scale-bounce', 'slide-down'],
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    text: 'Brand Label',
    icon: 'diamond', // 'diamond' | 'bolt' | 'cube' | 'star'
    accentColor: '#38bdf8'
  },

  validateParameters(params) {
    const errors = [];
    if (params.text !== undefined && typeof params.text !== 'string') {
      errors.push('Parameter "text" must be a string');
    }
    return { valid: errors.length === 0, errors };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const iconSvg = `
      <svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="${p.accentColor}" stroke-width="2.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    `;

    return `
      <div id="${componentId}" class="comp-brand-badge">
        <div class="badge-inner">
          ${iconSvg}
          <span class="badge-label">${p.text}</span>
        </div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    return `
      #${componentId} {
        display: flex;
        justify-content: center;
        margin-bottom: 24px;
        position: relative;
        z-index: 20;
      }
      #${componentId} .badge-inner {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 20px;
        border-radius: ${tokens.surfaces.radiusFull};
        background: ${tokens.surfaces.glassBg};
        border: ${tokens.surfaces.glassBorder};
        backdrop-filter: blur(${tokens.surfaces.glassBlur});
      }
      #${componentId} .badge-icon-svg {
        width: 22px;
        height: 22px;
      }
      #${componentId} .badge-label {
        font-family: ${tokens.typography.fontDisplay};
        font-size: ${tokens.typography.sizeCaption};
        font-weight: ${tokens.typography.weightHeadline};
        letter-spacing: ${tokens.typography.letterSpacingCaption};
        text-transform: uppercase;
        color: ${tokens.colors.highlight};
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    tl.from(`#${componentId}`, {
      scale: 0.75,
      y: -25,
      opacity: 0,
      duration: timing.duration || 0.8,
      ease: motion?.ease || 'back.out(1.5)'
    }, timing.start);
  }
};
