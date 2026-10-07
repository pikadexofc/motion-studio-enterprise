/**
 * 2D Motion Component: ShapeReveal
 * Geometric framing accents, lines, and technical HUD brackets.
 */
export const ShapeReveal = {
  id: 'ShapeReveal',
  version: '1.0.0',
  category: 'accent',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Geometric framing accents, vector lines, and technical HUD brackets.',
  complexity: { domNodes: 'low', memory: 'minimal' },
  supportedMotionTypes: ['draw', 'scale-fade', 'wipe'],
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    pattern: 'corner-brackets', // 'corner-brackets' | 'horizontal-lines' | 'circular-grid'
    color: '#06b6d4'
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    return `
      <div id="${componentId}" class="comp-shape-reveal">
        <div class="bracket top-left"></div>
        <div class="bracket top-right"></div>
        <div class="bracket bottom-left"></div>
        <div class="bracket bottom-right"></div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    return `
      #${componentId} {
        position: absolute;
        inset: 40px;
        pointer-events: none;
        z-index: 10;
      }
      #${componentId} .bracket {
        position: absolute;
        width: 32px;
        height: 32px;
        border-color: ${p.color};
        border-style: solid;
        border-width: 0;
        opacity: 0.6;
      }
      #${componentId} .top-left { top: 0; left: 0; border-top-width: 2px; border-left-width: 2px; }
      #${componentId} .top-right { top: 0; right: 0; border-top-width: 2px; border-right-width: 2px; }
      #${componentId} .bottom-left { bottom: 0; left: 0; border-bottom-width: 2px; border-left-width: 2px; }
      #${componentId} .bottom-right { bottom: 0; right: 0; border-bottom-width: 2px; border-right-width: 2px; }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    tl.from(`#${componentId} .bracket`, {
      scale: 0.4,
      opacity: 0,
      stagger: 0.05,
      duration: timing.duration || 0.8,
      ease: 'power2.out'
    }, timing.start);
  }
};
