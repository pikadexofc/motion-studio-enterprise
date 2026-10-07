/**
 * Reel Component: ReelHookStrap
 * Beat 1 (00-02s Hook): Rapid POV push-in to locked heavy ratchet strap snapping shut
 * over a timber dining table: "Think interstate moves mean broken furniture? Watch this."
 */
export const ReelHookStrap = {
  id: 'ReelHookStrap',
  version: '1.0.0',
  category: 'reel-hook',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'High-impact hook with rapid POV push-in, industrial orange ratchet tensioner, and kinetic typography.',
  complexity: { domNodes: 'moderate', memory: 'low' },

  defaults: {
    strapColor: '#FF7200',
    timberWoodColor: '#3d2314',
    headline: 'THINK INTERSTATE MOVES MEAN BROKEN FURNITURE?',
    hookPunch: 'WATCH THIS.',
    eyebrow: 'INTERSTATE RELOCATION STANDARDS'
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const words = p.headline.split(' ');
    const wordsHtml = words.map((w, i) => `<span class="hook-word">${w}</span>`).join(' ');

    return `
      <div id="${componentId}" class="reel-hook-strap">
        <div class="hook-camera-container">
          <div class="hook-shake-container">
            <!-- Timber Table Surface & Cargo Blanket Background -->
            <div class="timber-surface">
              <svg class="quilted-blanket-fold" viewBox="0 0 1080 1056" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="${componentId}-blanketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1c2638" />
                    <stop offset="100%" stop-color="#0d1522" />
                  </linearGradient>
                </defs>
                <polygon points="0,84 1080,0 1080,1056 0,1056" fill="url(#${componentId}-blanketGrad)" />
                <line x1="0" y1="84" x2="1080" y2="0" stroke="#FF7200" stroke-width="6" />
              </svg>
              <div class="timber-grain"></div>
              <div class="strap-shadow"></div>
            </div>

            <!-- Industrial Tension Ratchet Strap (UNN High-Vis Orange) -->
            <div class="ratchet-strap-assembly">
              <div class="strap-webbing strap-webbing-left">
                <div class="strap-stitch-pattern"></div>
                <div class="strap-label">UNN CARGO SECURE • 5,000 KG RATED</div>
              </div>
              
              <div class="ratchet-mechanism">
                <div class="ratchet-frame">
                  <div class="ratchet-gear"></div>
                  <div class="ratchet-handle">
                    <div class="ratchet-grip"></div>
                  </div>
                  <div class="ratchet-lock-indicator">
                    <div class="lock-dot"></div>
                    <span>LOCKED</span>
                  </div>
                </div>
              </div>

              <div class="strap-webbing strap-webbing-right">
                <div class="strap-stitch-pattern"></div>
                <div class="strap-label">HEAVY INDUSTRIAL TENSIONER</div>
              </div>
            </div>

            <!-- Tension shockwave line -->
            <div class="tension-shockwave"></div>

            <!-- Foreground Kinetic Typography Overlay -->
            <div class="hook-overlay-content">
              <div class="hook-eyebrow-pill">
                <span class="pulse-dot"></span>
                <span class="eyebrow-text">${p.eyebrow}</span>
              </div>

              <h1 class="hook-headline">
                ${wordsHtml}
              </h1>

              <div class="hook-punchline-container">
                <span class="hook-punchline">${p.hookPunch}</span>
              </div>
            </div>

            <!-- Cinematic vignette & speed streaks -->
            <div class="hook-vignette"></div>
            <div class="speed-streaks"></div>
          </div>
        </div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    return `
      #${componentId} {
        position: absolute;
        inset: 0;
        width: 1080px;
        height: 1920px;
        overflow: hidden;
        z-index: 20;
        pointer-events: none;
      }

      #${componentId} .hook-camera-container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform-origin: center center;
      }

      #${componentId} .hook-shake-container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      #${componentId} .timber-surface {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 55%, #4a2818 0%, #2b1509 60%, #150904 100%);
        overflow: hidden;
      }

      #${componentId} .timber-grain {
        position: absolute;
        inset: 0;
        opacity: 0.18;
        background: linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 25%, rgba(255,180,100,0.1) 50%, transparent 75%, rgba(0,0,0,0.4) 100%);
      }

      #${componentId} .quilted-blanket-fold {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 55%;
        pointer-events: none;
      }

      #${componentId} .ratchet-strap-assembly {
        position: absolute;
        top: 52%;
        width: 120%;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-12deg);
        z-index: 5;
      }

      #${componentId} .strap-webbing {
        flex: 1;
        height: 72px;
        background: linear-gradient(180deg, #ff8c2b 0%, #FF7200 40%, #d65500 100%);
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        border-top: 2px solid rgba(255,255,255,0.4);
        border-bottom: 2px solid rgba(0,0,0,0.5);
      }

      #${componentId} .strap-stitch-pattern {
        position: absolute;
        inset: 0;
        border-top: 2px dashed rgba(0, 0, 0, 0.25);
        border-bottom: 2px dashed rgba(0, 0, 0, 0.25);
        margin: 6px 0;
      }

      #${componentId} .strap-label {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        font-weight: 800;
        color: rgba(0, 0, 0, 0.65);
        letter-spacing: 0.25em;
        white-space: nowrap;
        padding: 0 40px;
        text-transform: uppercase;
      }

      #${componentId} .ratchet-mechanism {
        width: 190px;
        height: 130px;
        background: linear-gradient(135deg, #e2e8f0 0%, #64748b 45%, #334155 100%);
        border-radius: 12px;
        position: relative;
        box-shadow: inset 0 3px 6px rgba(255,255,255,0.6), 0 15px 35px rgba(0,0,0,0.7);
        border: 2px solid #94a3b8;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }

      #${componentId} .ratchet-handle {
        width: 140px;
        height: 32px;
        background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        border-radius: 8px;
        border: 2px solid #cbd5e1;
        position: absolute;
        top: 20px;
        transform-origin: 20px center;
        transform: rotate(35deg);
      }

      #${componentId} .ratchet-lock-indicator {
        position: absolute;
        bottom: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.15em;
        color: #10b981;
        background: rgba(0, 0, 0, 0.7);
        padding: 3px 10px;
        border-radius: 999px;
      }

      #${componentId} .lock-dot {
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 10px #10b981;
      }

      #${componentId} .tension-shockwave {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        border: 4px solid #FF7200;
        opacity: 0;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -200px;
        pointer-events: none;
        box-shadow: 0 0 25px rgba(255, 114, 0, 0.8);
      }

      #${componentId} .hook-overlay-content {
        position: absolute;
        top: 14%;
        width: 100%;
        padding: 0 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        z-index: 15;
      }

      #${componentId} .hook-eyebrow-pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(14, 42, 71, 0.96);
        border: 1.5px solid #FF7200;
        border-radius: 999px;
        padding: 8px 24px;
        margin-bottom: 30px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
      }

      #${componentId} .pulse-dot {
        width: 10px;
        height: 10px;
        background: #FF7200;
        border-radius: 50%;
        box-shadow: 0 0 12px #FF7200;
      }

      #${componentId} .eyebrow-text {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.2em;
        color: #ffffff;
      }

      #${componentId} .hook-headline {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 58px;
        font-weight: 900;
        line-height: 1.15;
        letter-spacing: -0.02em;
        color: #ffffff;
        text-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
        margin-bottom: 30px;
        max-width: 960px;
      }

      #${componentId} .hook-word {
        display: inline-block;
        margin: 0 6px;
      }

      #${componentId} .hook-punchline-container {
        margin-top: 10px;
      }

      #${componentId} .hook-punchline {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 78px;
        font-weight: 950;
        color: #FF7200;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        background: linear-gradient(180deg, #FFA04D 0%, #FF7200 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 15px 35px rgba(255, 114, 0, 0.6));
      }

      #${componentId} .hook-vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%);
        pointer-events: none;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const start = timing.start;
    const dur = timing.duration;
    const root = `#${componentId}`;

    // 1. Initial State
    gsap.set(root, { opacity: 1, visibility: 'visible' });
    gsap.set(`${root} .hook-camera-container`, { scale: 1.0 });
    gsap.set(`${root} .hook-shake-container`, { y: 0 });
    gsap.set(`${root} .ratchet-handle`, { rotation: 35 });
    gsap.set(`${root} .hook-word`, { opacity: 0, y: 35, rotateX: -30 });
    gsap.set(`${root} .hook-eyebrow-pill`, { opacity: 0, y: -20, scale: 0.9 });
    gsap.set(`${root} .hook-punchline`, { opacity: 0, scale: 2.2, y: 40 });
    gsap.set(`${root} .tension-shockwave`, { opacity: 0, scale: 0.1 });

    // Timeline visibility control
    tl.set(root, { opacity: 1, visibility: 'visible' }, start);

    // 2. Camera Rapid Push-in (0.0s - 2.8s) via explicit fromTo
    tl.fromTo(`${root} .hook-camera-container`, 
      { scale: 1.0 },
      { scale: 1.15, duration: dur, ease: 'power2.out' },
      start
    );

    // 3. Eyebrow Pill Reveal
    tl.fromTo(`${root} .hook-eyebrow-pill`,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1.0, duration: 0.4, ease: 'back.out(1.5)', immediateRender: false },
      start + 0.1
    );

    // 4. Headline Word Stagger
    tl.fromTo(`${root} .hook-word`,
      { opacity: 0, y: 35, rotateX: -30 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', immediateRender: false },
      start + 0.2
    );

    // 5. Ratchet Snap Shut (Lockdown Impact at t = 0.8s)
    tl.fromTo(`${root} .ratchet-handle`,
      { rotation: 35 },
      { rotation: 0, duration: 0.15, ease: 'power4.in', immediateRender: false },
      start + 0.75
    );

    // Tension Snap & Shockwave
    tl.fromTo(`${root} .tension-shockwave`, 
      { opacity: 0.9, scale: 0.2, transformOrigin: 'center center' },
      { opacity: 0, scale: 2.5, duration: 0.5, ease: 'power2.out', transformOrigin: 'center center', immediateRender: false },
      start + 0.85
    );

    // Deterministic Camera Shake on Snap (isolated on hook-shake-container)
    tl.fromTo(`${root} .hook-shake-container`,
      { y: 0 },
      {
        keyframes: [
          { y: -10, duration: 0.04, ease: 'sine.out' },
          { y: 8, duration: 0.04, ease: 'sine.inOut' },
          { y: -5, duration: 0.04, ease: 'sine.inOut' },
          { y: 0, duration: 0.04, ease: 'sine.in' }
        ],
        immediateRender: false
      },
      start + 0.85
    );

    // 6. Punchline "WATCH THIS." Slam
    tl.fromTo(`${root} .hook-punchline`,
      { opacity: 0, scale: 2.2, y: 40 },
      { opacity: 1, scale: 1.0, y: 0, duration: 0.4, ease: 'back.out(2.2)', immediateRender: false },
      start + 1.1
    );

    // 7. Beat Exit Transition (Fade out toward end of beat)
    tl.to(root, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, start + dur - 0.35);
    tl.set(root, { visibility: 'hidden' }, start + dur);
  }
};
