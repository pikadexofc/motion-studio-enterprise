/**
 * Reel Component: ReelCargoProtection
 * Beat 3 (09-17s): Interior truck view: wall-to-wall quilted blanket wraps, zero shifting cargo.
 * Voiceover: "At UNN Movers, every single item is blanket-wrapped, wall-locked, and strapped
 * with industrial tensioners. Live GPS tracking from Sydney to Melbourne with zero damage guaranteed."
 */
export const ReelCargoProtection = {
  id: 'ReelCargoProtection',
  version: '1.0.0',
  category: 'reel-cargo',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Interior truck engineering view with quilted blanket wraps, E-track wall-locks, and live stability telematics.',
  complexity: { domNodes: 'high', memory: 'moderate' },

  defaults: {
    interiorImage: './assets/unn/loading_furniture.png',
    eyebrow: 'TRANSIT RIGOR & CARGO TELEMETRICS',
    headline: 'ENGINEERED ZERO-DAMAGE PROTECTION'
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };

    return `
      <div id="${componentId}" class="reel-cargo-protection">
        <!-- Background Interior Truck Photographic View -->
        <div class="cargo-bg-wrapper">
          <img class="cargo-photo" src="${p.interiorImage}" alt="UNN Interior Cargo Protection" />
          <div class="cargo-overlay-vignette"></div>
          
          <!-- Industrial E-Track Wall Rails (SVG overlay) -->
          <div class="etrack-rail-left"></div>
          <div class="etrack-rail-right"></div>
        </div>

        <!-- Upper Header HUD -->
        <div class="cargo-header-hud">
          <div class="hud-tag">
            <span class="hud-blink-dot"></span>
            <span>${p.eyebrow}</span>
          </div>
          <h2 class="cargo-title">${p.headline}</h2>
        </div>

        <!-- Interactive Protection Feature Cards -->
        <div class="protection-cards-container">
          <!-- Card 1: Blanket Wraps -->
          <div class="protection-card card-blanket" id="${componentId}-card1">
            <div class="card-icon-wrap">
              <span class="card-icon">🛡️</span>
            </div>
            <div class="card-text-wrap">
              <div class="card-headline">100% BLANKET-WRAPPED</div>
              <div class="card-sub">Double-stitched commercial moving quilts protect all furniture surfaces.</div>
            </div>
            <div class="card-status-badge status-active">VERIFIED</div>
          </div>

          <!-- Card 2: Wall-Locked E-Track -->
          <div class="protection-card card-locked" id="${componentId}-card2">
            <div class="card-icon-wrap">
              <span class="card-icon">⚓</span>
            </div>
            <div class="card-text-wrap">
              <div class="card-headline">WALL-LOCKED E-TRACK RAILS</div>
              <div class="card-sub">Heavy-gauge chassis mounting locks cargo directly to truck frame.</div>
            </div>
            <div class="card-status-badge status-active">SECURED</div>
          </div>

          <!-- Card 3: Industrial Tensioners -->
          <div class="protection-card card-tensioners" id="${componentId}-card3">
            <div class="card-icon-wrap">
              <span class="card-icon">⚡</span>
            </div>
            <div class="card-text-wrap">
              <div class="card-headline">5,000 KG RATCHET TENSIONERS</div>
              <div class="card-sub">Commercial polyester webbing eliminates cargo shift on Hume Hwy.</div>
            </div>
            <div class="card-status-badge status-active">TIGHTENED</div>
          </div>
        </div>

        <!-- Telemetry Data Sensors HUD -->
        <div class="telemetry-readout-strip">
          <div class="telemetry-item">
            <div class="telemetry-val" id="${componentId}-vib">0.02 <span class="sub-unit">G</span></div>
            <div class="telemetry-lbl">VIBRATION INDEX</div>
          </div>
          <div class="telemetry-divider"></div>
          <div class="telemetry-item">
            <div class="telemetry-val" id="${componentId}-shift">0.00 <span class="sub-unit">MM</span></div>
            <div class="telemetry-lbl">CARGO SHIFT</div>
          </div>
          <div class="telemetry-divider"></div>
          <div class="telemetry-item">
            <div class="telemetry-val green-val">100%</div>
            <div class="telemetry-lbl">STABILITY STATUS</div>
          </div>
        </div>

        <!-- Zero Damage Guaranteed Seal -->
        <div class="zero-damage-seal" id="${componentId}-seal">
          <div class="seal-inner">
            <div class="seal-icon">🏆</div>
            <div class="seal-text-group">
              <span class="seal-title">ZERO DAMAGE GUARANTEED</span>
              <span class="seal-sub">FULL COMPREHENSIVE TRANSIT COVERAGE</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCSS(componentId, params, tokens) {
    return `
      #${componentId} {
        position: absolute;
        inset: 0;
        width: 1080px;
        height: 1920px;
        overflow: hidden;
        z-index: 20;
        background: #070f1e;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 80px 50px 70px 50px;
        opacity: 0;
        pointer-events: none;
      }

      #${componentId} .cargo-bg-wrapper {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 1;
      }

      #${componentId} .cargo-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.04);
        filter: brightness(0.7) contrast(1.15);
      }

      #${componentId} .cargo-overlay-vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 50%, rgba(7, 15, 30, 0.4) 0%, rgba(7, 15, 30, 0.95) 100%);
      }

      #${componentId} .etrack-rail-left {
        position: absolute;
        left: 30px;
        top: 0;
        bottom: 0;
        width: 24px;
        background-image: repeating-linear-gradient(180deg, #64748b 0px, #64748b 20px, #0f172a 20px, #0f172a 40px);
        box-shadow: 0 0 20px rgba(0,0,0,0.8);
        opacity: 0.7;
      }

      #${componentId} .etrack-rail-right {
        position: absolute;
        right: 30px;
        top: 0;
        bottom: 0;
        width: 24px;
        background-image: repeating-linear-gradient(180deg, #64748b 0px, #64748b 20px, #0f172a 20px, #0f172a 40px);
        box-shadow: 0 0 20px rgba(0,0,0,0.8);
        opacity: 0.7;
      }

      /* HEADER HUD */
      #${componentId} .cargo-header-hud {
        position: relative;
        z-index: 10;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #${componentId} .hud-tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(14, 42, 71, 0.9);
        border: 1px solid #FF7200;
        padding: 6px 18px;
        border-radius: 999px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.18em;
        color: #ffffff;
        margin-bottom: 14px;
      }

      #${componentId} .hud-blink-dot {
        width: 8px;
        height: 8px;
        background: #FF7200;
        border-radius: 50%;
        box-shadow: 0 0 10px #FF7200;
      }

      #${componentId} .cargo-title {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 44px;
        font-weight: 900;
        color: #ffffff;
        line-height: 1.2;
        letter-spacing: -0.01em;
        text-shadow: 0 10px 25px rgba(0,0,0,0.9);
        max-width: 900px;
      }

      /* PROTECTION CARDS */
      #${componentId} .protection-cards-container {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 22px;
        width: 100%;
        margin: 20px 0;
      }

      #${componentId} .protection-card {
        display: flex;
        align-items: center;
        background: rgba(14, 42, 71, 0.92);
        border: 1.5px solid rgba(255, 114, 0, 0.35);
        border-radius: 20px;
        padding: 24px 28px;
        gap: 20px;
        backdrop-filter: blur(18px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        transition: border-color 0.3s ease;
      }

      #${componentId} .card-icon-wrap {
        width: 64px;
        height: 64px;
        border-radius: 14px;
        background: rgba(255, 114, 0, 0.15);
        border: 1px solid rgba(255, 114, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        flex-shrink: 0;
      }

      #${componentId} .card-text-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      #${componentId} .card-headline {
        font-family: 'Montserrat', sans-serif;
        font-size: 22px;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 0.02em;
      }

      #${componentId} .card-sub {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 15px;
        font-weight: 500;
        color: #cbd5e1;
        line-height: 1.35;
      }

      #${componentId} .card-status-badge {
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 0.12em;
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid #10b981;
        color: #10b981;
      }

      /* TELEMETRY READOUT STRIP */
      #${componentId} .telemetry-readout-strip {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: rgba(7, 15, 30, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        padding: 18px 24px;
        backdrop-filter: blur(14px);
      }

      #${componentId} .telemetry-item {
        text-align: center;
      }

      #${componentId} .telemetry-val {
        font-family: 'Montserrat', sans-serif;
        font-size: 32px;
        font-weight: 900;
        color: #ffffff;
      }

      #${componentId} .sub-unit {
        font-size: 16px;
        color: #FF7200;
      }

      #${componentId} .green-val {
        color: #10b981;
      }

      #${componentId} .telemetry-lbl {
        font-size: 11px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 0.14em;
        margin-top: 4px;
      }

      #${componentId} .telemetry-divider {
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.15);
      }

      /* ZERO DAMAGE SEAL */
      #${componentId} .zero-damage-seal {
        position: relative;
        z-index: 10;
        background: linear-gradient(135deg, #FF7200 0%, #b84a00 100%);
        border-radius: 20px;
        padding: 20px 28px;
        box-shadow: 0 15px 40px rgba(255, 114, 0, 0.5);
        border: 2px solid #FFA04D;
      }

      #${componentId} .seal-inner {
        display: flex;
        align-items: center;
        gap: 18px;
      }

      #${componentId} .seal-icon {
        font-size: 40px;
      }

      #${componentId} .seal-text-group {
        display: flex;
        flex-direction: column;
      }

      #${componentId} .seal-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 24px;
        font-weight: 950;
        color: #ffffff;
        letter-spacing: 0.04em;
      }

      #${componentId} .seal-sub {
        font-size: 13px;
        font-weight: 800;
        color: #070f1e;
        letter-spacing: 0.14em;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const start = timing.start;
    const dur = timing.duration;
    const root = `#${componentId}`;

    // Initial States
    gsap.set(root, { opacity: 0, visibility: 'hidden' });
    gsap.set(`${root} .cargo-photo`, { scale: 1.04 });
    gsap.set(`${root} .cargo-header-hud`, { y: -30, opacity: 0 });
    gsap.set(`${root} .protection-card`, { x: -60, opacity: 0 });
    gsap.set(`${root} .telemetry-readout-strip`, { y: 30, opacity: 0 });
    gsap.set(`${root} .zero-damage-seal`, { scale: 0.85, opacity: 0 });

    // Timeline visibility control
    tl.set(root, { visibility: 'visible' }, start);

    // Entrance (Deterministic fromTo)
    tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', immediateRender: false }, start);

    // Camera Pan / Drift
    tl.fromTo(`${root} .cargo-photo`,
      { scale: 1.04 },
      { scale: 1.12, duration: dur, ease: 'none', immediateRender: false },
      start
    );

    // Header HUD Reveal
    tl.fromTo(`${root} .cargo-header-hud`,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', immediateRender: false },
      start + 0.2
    );

    // Card 1: Blanket Wraps ("every single item is blanket-wrapped...")
    tl.fromTo(`${root}-card1`,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', immediateRender: false },
      start + 0.6
    );

    // Card 2: Wall-Locked ("wall-locked...")
    tl.fromTo(`${root}-card2`,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', immediateRender: false },
      start + 2.0
    );

    // Card 3: Tensioners ("and strapped with industrial tensioners...")
    tl.fromTo(`${root}-card3`,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', immediateRender: false },
      start + 3.4
    );

    // Telemetry Readout Strip
    tl.fromTo(`${root} .telemetry-readout-strip`,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', immediateRender: false },
      start + 4.6
    );

    // Zero Damage Seal Slam ("zero damage guaranteed...")
    tl.fromTo(`${root}-seal`,
      { scale: 0.85, opacity: 0 },
      { scale: 1.0, opacity: 1, duration: 0.5, ease: 'back.out(2.0)', immediateRender: false },
      start + 6.0
    );

    // Exit Transition
    tl.to(root, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    }, start + dur - 0.4);
    tl.set(root, { visibility: 'hidden' }, start + dur);
  }
};
