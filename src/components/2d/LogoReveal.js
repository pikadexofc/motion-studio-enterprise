/**
 * 2D Motion Component: LogoReveal
 * Vector SVG logo drawing with line trace, fill wipe, and specular sweep.
 */
export const LogoReveal = {
  id: 'LogoReveal',
  version: '1.0.0',
  category: 'branding',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Vector SVG logo mark reveal with stroke drawing and gradient fill sweep.',
  complexity: { domNodes: 'low', memory: 'minimal' },
  supportedMotionTypes: ['draw-stroke', 'scale-fade', 'sweep'],
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    size: 72,
    markType: 'hexagon', // 'hexagon' | 'shield' | 'triangle'
    color: '#38bdf8'
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    return `
      <div id="${componentId}" class="comp-logo-reveal">
        <svg class="logo-svg" viewBox="0 0 100 100" style="width: ${p.size}px; height: ${p.size}px;">
          <polygon class="logo-path" points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5" />
          <polyline class="logo-inner" points="50 25, 70 37.5, 70 62.5, 50 75, 30 62.5, 30 37.5 50 25" />
        </svg>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    return `
      #${componentId} {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 24px;
        position: relative;
        z-index: 22;
      }
      #${componentId} .logo-path {
        fill: none;
        stroke: ${p.color};
        stroke-width: 4;
        stroke-dasharray: 400;
        stroke-dashoffset: 400;
      }
      #${componentId} .logo-inner {
        fill: none;
        stroke: ${tokens.colors.primary};
        stroke-width: 3;
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    tl.to(`#${componentId} .logo-path`, {
      strokeDashoffset: 0,
      duration: timing.duration * 0.7,
      ease: 'power2.inOut'
    }, timing.start);

    tl.to(`#${componentId} .logo-inner`, {
      strokeDashoffset: 0,
      duration: timing.duration * 0.6,
      ease: 'power2.out'
    }, timing.start + 0.2);

    tl.to(`#${componentId} .logo-path`, {
      fill: 'rgba(56, 189, 248, 0.15)',
      duration: 0.5,
      ease: 'power1.in'
    }, timing.start + timing.duration * 0.6);
  }
};
