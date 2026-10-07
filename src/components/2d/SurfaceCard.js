/**
 * 2D Motion Component: SurfaceCard
 * High-Tech Glassmorphic UI Card supporting:
 * 1. Doppelrand Double-Bezel nested hardware chassis
 * 2. 2.5D Isometric product mockups with countdown telematics & haptic telemetry
 * 3. Conversion Outro CTA with nested button-in-button architecture
 */
export const SurfaceCard = {
  id: 'SurfaceCard',
  version: '2.0.0',
  category: 'layout',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'High-end double-bezel glassmorphic card for interactive SaaS product previews and CTAs.',
  complexity: { domNodes: 'medium', memory: 'minimal' },
  supportedMotionTypes: ['isometric-tilt', 'slide-up', 'fade', 'scale'],
  supportedStyles: ['minimal', 'modern-saas', 'ethereal-glass', 'precision-steel'],

  defaults: {
    architecture: 'double-bezel',
    title: 'Product Core',
    headline: 'High-Performance Personal Productivity Engine',
    statusText: 'DEEP WORK • 25 MIN',
    metricValue: '100% LOCAL STORAGE',
    companyName: 'FocusFlow',
    ctaText: 'Experience Pure Flow. Open App',
    website: 'focusflow-app-chi.vercel.app',
    badge: 'MIT OPEN SOURCE',
    width: '920px',
    isometricTilt: { rx: 10, ry: -6, rz: 1 }
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const primary = tokens?.colors?.primary || '#FF5A00';
    const accent = tokens?.colors?.accent || '#8B5CF6';

    if (p.architecture === 'double-bezel-cta') {
      return `
        <div id="${componentId}" class="comp-surface-card cta-variant">
          <div class="double-bezel-outer">
            <div class="double-bezel-inner cta-layout">
              <!-- Top Branding Header -->
              <div class="cta-brand-header">
                <div class="cta-logo-row">
                  <div class="cta-logo-orb">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span class="cta-brand-name">${p.companyName}</span>
                </div>
                <div class="cta-tech-pill">
                  <span class="pill-glow-dot"></span>
                  <span>${p.badge}</span>
                </div>
              </div>

              <!-- Main Value Prop Headline -->
              <div class="cta-body-section">
                <h2 class="cta-headline">${p.ctaText}</h2>
                <p class="cta-subheading">High-performance personal productivity engine with zero cloud leakage, native haptic feedback, and local-first architecture.</p>
              </div>

              <!-- Primary Action Button with Nested Arrow Island -->
              <div class="cta-action-container">
                <div class="cta-master-button">
                  <span class="button-label">LAUNCH WEB APP</span>
                  <div class="button-nested-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Ground Truth Verification Row -->
              <div class="cta-ground-truth-strip">
                <div class="ground-truth-item">
                  <span class="gt-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </span>
                  <span class="gt-url">${p.website}</span>
                </div>
                <div class="ground-truth-item">
                  <span class="gt-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <span>100% LOCAL DATA</span>
                </div>
                <div class="ground-truth-item">
                  <span class="gt-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </span>
                  <span>CAPACITOR 8 HAPTICS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Default: 2.5D Product UI Mockup (Time-Burn Engine & Telemetry)
    return `
      <div id="${componentId}" class="comp-surface-card product-variant">
        <div class="double-bezel-outer">
          <div class="double-bezel-inner product-layout">
            <!-- Simulated Native Titlebar -->
            <div class="product-window-header">
              <div class="window-controls">
                <span class="win-dot dot-red"></span>
                <span class="win-dot dot-yellow"></span>
                <span class="win-dot dot-green"></span>
              </div>
              <div class="session-active-pill">
                <span class="pulse-indicator"></span>
                <span>${p.statusText}</span>
              </div>
              <div class="window-profile-badge">
                <span>LOCAL-FIRST</span>
              </div>
            </div>

            <!-- Central Time-Burn Countdown Display -->
            <div class="product-timer-showcase">
              <div class="timer-dial-container">
                <svg class="timer-dial-svg" viewBox="0 0 240 240">
                  <circle class="dial-bg" cx="120" cy="120" r="100"></circle>
                  <circle class="dial-progress" cx="120" cy="120" r="100"></circle>
                </svg>
                <div class="timer-readout-center">
                  <span class="timer-numbers">25:00</span>
                  <span class="timer-sublabel">FOCUS STREAK</span>
                </div>
              </div>

              <div class="product-meta-stack">
                <div class="meta-tag-row">
                  <div class="meta-pill primary-pill">
                    <span class="pill-dot"></span>
                    <span>SESSION ACTIVE</span>
                  </div>
                  <div class="meta-pill privacy-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>${p.metricValue}</span>
                  </div>
                </div>
                <h3 class="product-card-title">${p.title}</h3>
                <p class="product-card-subtitle">${p.headline}</p>
              </div>
            </div>

            <!-- Telematics Sensor HUD -->
            <div class="product-telemetry-hud">
              <div class="hud-item">
                <span class="hud-label">HAPTIC FREQ</span>
                <span class="hud-value">48 Hz PULSE</span>
              </div>
              <div class="hud-item">
                <span class="hud-label">BATTERY SCHEDULE</span>
                <span class="hud-value">OPTIMIZED 60 FPS</span>
              </div>
              <div class="hud-item highlight">
                <span class="hud-label">CLOUD LEAKAGE</span>
                <span class="hud-value">0.00% (LOCAL ONLY)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    const primary = tokens?.colors?.primary || '#FF5A00';
    const accent = tokens?.colors?.accent || '#8B5CF6';

    return `
      #${componentId} {
        position: absolute;
        left: ${params?.position?.x || '50%'};
        top: ${params?.position?.y || '50%'};
        transform: translate(-50%, -50%);
        z-index: 20;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1200px;
        opacity: 0;
      }

      #${componentId} .double-bezel-outer {
        position: relative;
        width: 920px;
        padding: 12px;
        border-radius: 36px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.85), 0 0 40px ${primary}22;
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
      }

      #${componentId} .double-bezel-inner {
        position: relative;
        border-radius: 26px;
        background: #090B10;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
        padding: 36px 40px;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      /* TITLEBAR */
      #${componentId} .product-window-header,
      #${componentId} .cta-brand-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 20px;
      }

      #${componentId} .window-controls {
        display: flex;
        gap: 8px;
      }

      #${componentId} .win-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      #${componentId} .dot-red { background: #EF4444; }
      #${componentId} .dot-yellow { background: #F59E0B; }
      #${componentId} .dot-green { background: #10B981; }

      #${componentId} .session-active-pill,
      #${componentId} .cta-tech-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 90, 0, 0.12);
        border: 1px solid ${primary}55;
        padding: 6px 18px;
        border-radius: 999px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.12em;
        color: ${primary};
      }

      #${componentId} .pulse-indicator,
      #${componentId} .pill-glow-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${primary};
        box-shadow: 0 0 10px ${primary};
      }

      #${componentId} .window-profile-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #94A3B8;
        letter-spacing: 0.15em;
      }

      /* TIMER SHOWCASE */
      #${componentId} .product-timer-showcase {
        display: flex;
        align-items: center;
        gap: 40px;
      }

      #${componentId} .timer-dial-container {
        position: relative;
        width: 220px;
        height: 220px;
        flex-shrink: 0;
      }

      #${componentId} .timer-dial-svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }

      #${componentId} .dial-bg {
        fill: none;
        stroke: rgba(255, 255, 255, 0.08);
        stroke-width: 14;
      }

      #${componentId} .dial-progress {
        fill: none;
        stroke: ${primary};
        stroke-width: 14;
        stroke-linecap: round;
        stroke-dasharray: 628;
        stroke-dashoffset: 140;
        filter: drop-shadow(0 0 8px ${primary}88);
      }

      #${componentId} .timer-readout-center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      #${componentId} .timer-numbers {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 52px;
        font-weight: 900;
        color: #ffffff;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        letter-spacing: -0.02em;
      }

      #${componentId} .timer-sublabel {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #94A3B8;
        letter-spacing: 0.18em;
        margin-top: 6px;
      }

      #${componentId} .product-meta-stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      #${componentId} .meta-tag-row {
        display: flex;
        gap: 12px;
      }

      #${componentId} .meta-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 5px 14px;
        border-radius: 999px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      #${componentId} .meta-pill.primary-pill {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #FFFFFF;
      }

      #${componentId} .meta-pill.privacy-pill {
        background: rgba(16, 185, 129, 0.12);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #10B981;
      }

      #${componentId} .meta-pill .pill-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #10B981;
      }

      #${componentId} .product-card-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 38px;
        font-weight: 800;
        color: #FFFFFF;
        letter-spacing: -0.02em;
        line-height: 1.15;
      }

      #${componentId} .product-card-subtitle {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #94A3B8;
        line-height: 1.45;
      }

      /* TELEMETRY HUD */
      #${componentId} .product-telemetry-hud {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        padding: 16px 20px;
      }

      #${componentId} .hud-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      #${componentId} .hud-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 10px;
        font-weight: 700;
        color: #64748B;
        letter-spacing: 0.14em;
      }

      #${componentId} .hud-value {
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        font-weight: 800;
        color: #E2E8F0;
        font-variant-numeric: tabular-nums;
      }

      #${componentId} .hud-item.highlight .hud-value {
        color: #10B981;
      }

      /* CTA VARIANT STYLES */
      #${componentId} .cta-logo-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      #${componentId} .cta-logo-orb {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background: linear-gradient(135deg, ${primary} 0%, ${accent} 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px ${primary}88;
      }

      #${componentId} .orb-icon {
        font-size: 24px;
      }

      #${componentId} .cta-brand-name {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 34px;
        font-weight: 900;
        letter-spacing: -0.03em;
        color: #FFFFFF;
      }

      #${componentId} .cta-body-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      #${componentId} .cta-headline {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 44px;
        font-weight: 900;
        line-height: 1.15;
        color: #FFFFFF;
        letter-spacing: -0.03em;
      }

      #${componentId} .cta-subheading {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #94A3B8;
        line-height: 1.5;
      }

      #${componentId} .cta-action-container {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }

      #${componentId} .cta-master-button {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        background: linear-gradient(135deg, ${primary} 0%, #E04D00 100%);
        padding: 12px 14px 12px 32px;
        border-radius: 999px;
        box-shadow: 0 15px 35px rgba(255, 90, 0, 0.45);
        border: 2px solid rgba(255, 255, 255, 0.4);
      }

      #${componentId} .button-label {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 20px;
        font-weight: 900;
        letter-spacing: 0.1em;
        color: #FFFFFF;
      }

      #${componentId} .button-nested-arrow {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      #${componentId} .cta-ground-truth-strip {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 14px 20px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        color: #94A3B8;
        letter-spacing: 0.08em;
      }

      #${componentId} .ground-truth-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      #${componentId} .gt-url {
        color: #FFFFFF;
        font-weight: 800;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const start = timing.start || 0;
    const dur = timing.duration || 1.0;
    const p = { ...this.defaults, ...params };
    const rx = p.isometricTilt?.rx || 0;
    const ry = p.isometricTilt?.ry || 0;

    // Entrance with 2.5D perspective tilt and cubic-bezier
    tl.fromTo(`#${componentId}`, 
      { 
        y: 80, 
        opacity: 0, 
        rotateX: rx + 8, 
        rotateY: ry - 6,
        scale: 0.90 
      },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: rx, 
        rotateY: ry, 
        scale: 1, 
        duration: 1.0, 
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)', 
        immediateRender: false 
      },
      start
    );

    // Subtle drift during active window
    tl.to(`#${componentId}`, {
      rotateX: rx - 2,
      rotateY: ry + 2,
      duration: dur * 0.7,
      ease: 'sine.inOut'
    }, start + 1.0);

    // Dial progress animation for product variant
    tl.fromTo(`#${componentId} .dial-progress`,
      { strokeDashoffset: 550 },
      { strokeDashoffset: 140, duration: dur, ease: 'linear' },
      start
    );

    // Dynamic CTA button glow on arrival
    tl.fromTo(`#${componentId} .cta-master-button`,
      { scale: 0.96, boxShadow: '0 10px 25px rgba(255, 90, 0, 0.35)' },
      { scale: 1.03, boxShadow: '0 20px 50px rgba(255, 90, 0, 0.7)', repeat: 1, yoyo: true, duration: 1.1, ease: 'power1.inOut' },
      start + 0.7
    );

    // Clean exit transition
    if (start + dur < (tokens?.duration || 10)) {
      tl.to(`#${componentId}`, {
        opacity: 0,
        y: -50,
        scale: 0.94,
        duration: 0.5,
        ease: 'power2.in'
      }, start + dur - 0.5);
    }
  }
};
