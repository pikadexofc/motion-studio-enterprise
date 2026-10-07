/**
 * 2D Motion Component: MetricCounter
 * Interpolating metric counter / KPI odometer card.
 */
export const MetricCounter = {
  id: 'MetricCounter',
  version: '1.0.0',
  category: 'data-viz',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Interpolating KPI counter card with prefix, suffix, and animated odometer value.',
  complexity: { domNodes: 'low', memory: 'minimal' },
  supportedMotionTypes: ['pop', 'slide-up', 'counter-count'],
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon'],

  defaults: {
    startValue: 0,
    targetValue: 100,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: 'Accuracy Rate',
    minWidth: '220px'
  },

  validateParameters(params) {
    const errors = [];
    if (params.targetValue !== undefined && typeof params.targetValue !== 'number') {
      errors.push('Parameter "targetValue" must be a number');
    }
    return { valid: errors.length === 0, errors };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const initialText = `${p.prefix}${p.startValue.toFixed(p.decimals)}${p.suffix}`;

    return `
      <div id="${componentId}" class="comp-metric-counter">
        <div class="metric-card-inner">
          <div class="metric-num" data-target="${p.targetValue}">${initialText}</div>
          <div class="metric-label">${p.label}</div>
        </div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    return `
      #${componentId} {
        position: relative;
        z-index: 20;
      }
      #${componentId} .metric-card-inner {
        min-width: ${p.minWidth};
        padding: 18px 32px;
        background: ${tokens.surfaces.glassBg};
        border: ${tokens.surfaces.glassBorder};
        border-radius: ${tokens.surfaces.radiusMd};
        backdrop-filter: blur(${tokens.surfaces.glassBlur});
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #${componentId} .metric-num {
        font-family: ${tokens.typography.fontDisplay};
        font-size: 34px;
        font-weight: 700;
        color: ${tokens.colors.textPrimary};
        margin-bottom: 4px;
      }
      #${componentId} .metric-label {
        font-family: ${tokens.typography.fontBody};
        font-size: ${tokens.typography.sizeCaption};
        color: ${tokens.colors.textMuted};
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-weight: 600;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const p = { ...this.defaults, ...params };
    const counterObj = { val: p.startValue };

    // Entrance pop
    tl.from(`#${componentId}`, {
      y: 35,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.out'
    }, timing.start);

    // Synchronous interpolation of numerical text
    tl.to(counterObj, {
      val: p.targetValue,
      duration: timing.duration,
      ease: 'power2.out',
      onUpdate: () => {
        const el = document.querySelector(`#${componentId} .metric-num`);
        if (el) {
          el.textContent = `${p.prefix}${counterObj.val.toFixed(p.decimals)}${p.suffix}`;
        }
      }
    }, timing.start);
  }
};
