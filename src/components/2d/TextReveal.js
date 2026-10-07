/**
 * 2D Motion Component: TextReveal
 * Staggered word/character kinetic reveals with perspective masking.
 */
export const TextReveal = {
  id: 'TextReveal',
  version: '1.0.0',
  category: 'typography',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Staggered kinetic typography reveal with perspective masking and typographic tokens.',
  complexity: { domNodes: 'low', memory: 'minimal' },
  supportedMotionTypes: ['reveal', 'fade', 'slide-up', 'perspective-flip'],
  supportedStyles: ['minimal', 'modern-saas', 'cyber-neon', 'warm-creative'],

  defaults: {
    text: 'Headline Text',
    variant: 'hero', // 'hero' | 'headline' | 'title' | 'body'
    gradient: true,
    splitBy: 'words', // 'words' | 'chars' | 'lines'
    align: 'center',
    maxWidth: '1200px',
    stagger: 0.08,
    ease: 'power4.out',
    depthAngle: -35
  },

  validateParameters(params) {
    const errors = [];
    if (params.text !== undefined && typeof params.text !== 'string') {
      errors.push('Parameter "text" must be a string');
    }
    if (params.stagger !== undefined && (typeof params.stagger !== 'number' || params.stagger < 0)) {
      errors.push('Parameter "stagger" must be a non-negative number');
    }
    return { valid: errors.length === 0, errors };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const words = p.text.trim().split(/\s+/);
    
    const wordsHtml = words.map((word, i) => {
      const gradClass = p.gradient && (i >= words.length - 2) ? ' gradient-accent' : '';
      return `<span class="word-mask"><span class="word-el${gradClass}">${word}</span></span>`;
    }).join(' ');

    return `
      <div id="${componentId}" class="comp-text-reveal ${p.variant}">
        <h1 class="text-content" style="text-align: ${p.align}; max-width: ${p.maxWidth};">
          ${wordsHtml}
        </h1>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const fontSize = p.variant === 'hero' ? tokens.typography.sizeHero :
                     p.variant === 'headline' ? tokens.typography.sizeHeadline :
                     p.variant === 'title' ? tokens.typography.sizeTitle : tokens.typography.sizeBody;
    const fontWeight = p.variant === 'hero' ? tokens.typography.weightHero :
                       p.variant === 'headline' ? tokens.typography.weightHeadline : tokens.typography.weightTitle;

    return `
      #${componentId} {
        position: relative;
        z-index: 15;
        width: 100%;
        display: flex;
        justify-content: ${p.align === 'left' ? 'flex-start' : p.align === 'right' ? 'flex-end' : 'center'};
        font-family: ${tokens.typography.fontDisplay};
        color: ${tokens.colors.textPrimary};
      }
      #${componentId} .text-content {
        font-size: ${fontSize};
        font-weight: ${fontWeight};
        line-height: 1.1;
        letter-spacing: ${tokens.typography.letterSpacingHero};
      }
      #${componentId} .word-mask {
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
        margin: 0 6px;
      }
      #${componentId} .word-el {
        display: inline-block;
        transform-origin: bottom left;
      }
      #${componentId} .gradient-accent {
        background: linear-gradient(135deg, #ffffff 30%, ${tokens.colors.highlight} 75%, ${tokens.colors.primary} 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const p = { ...this.defaults, ...params };
    const ease = motion?.ease || p.ease || tokens.motion.easeDecel;
    const stagger = motion?.stagger !== undefined ? motion.stagger : p.stagger;
    const duration = timing.duration || tokens.motion.durationMedium;

    tl.from(`#${componentId} .word-el`, {
      y: 90,
      opacity: 0,
      rotateX: p.depthAngle,
      stagger: stagger,
      duration: duration,
      ease: ease
    }, timing.start);
  }
};
