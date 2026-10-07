/**
 * 2D Motion Component: BrandBadge
 * High-tech pill badge with SVG icon, laser glow, and spring entrance.
 */
export const BrandBadge = {
  id: 'BrandBadge',
  version: '1.1.0',
  category: 'branding',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Pill badge featuring an icon and text mark with glassmorphism and laser glow.',
  complexity: { domNodes: 'low', memory: 'minimal' },
  supportedMotionTypes: ['pop', 'scale-bounce', 'slide-down'],
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    label: 'Brand Label',
    text: 'Brand Label',
    iconSvg: null,
    variant: 'pill-laser-glow',
    accentColor: '#FF5A00'
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const labelText = p.label || p.text || 'Brand Label';
    const primaryColor = tokens?.colors?.primary || p.accentColor || '#FF5A00';

    const defaultSvg = `
      <svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="${primaryColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    `;

    const iconHtml = p.iconSvg || defaultSvg;

    return `
      <div id="${componentId}" class="comp-brand-badge">
        <div class="badge-inner">
          <div class="badge-icon-box">
            ${iconHtml}
          </div>
          <span class="badge-label">${labelText}</span>
        </div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    const primary = tokens?.colors?.primary || params?.accentColor || '#FF5A00';
    const posX = params?.position?.x || '50%';
    const posY = params?.position?.y || '38%';
    return `
      #${componentId} {
        position: absolute;
        left: ${posX};
        top: ${posY};
        transform: translate(-50%, -50%);
        z-index: 25;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        opacity: 0;
      }
      #${componentId} .badge-inner {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 8px 24px 8px 12px;
        border-radius: 999px;
        background: rgba(15, 15, 20, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 20px ${primary}33;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }
      #${componentId} .badge-icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: ${primary}22;
        border: 1px solid ${primary}66;
      }
      #${componentId} .badge-icon-svg {
        width: 16px;
        height: 16px;
      }
      #${componentId} .badge-label {
        font-family: ${tokens?.typography?.fontHeading || 'Space Grotesk, sans-serif'};
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #ffffff;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const start = timing.start || 0;
    const dur = timing.duration || 1.0;

    tl.fromTo(`#${componentId}`, 
      { y: -30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', immediateRender: false },
      start
    );

    if (start + dur < (tokens?.duration || 10)) {
      tl.to(`#${componentId}`, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      }, start + dur - 0.4);
    }
  }
};
