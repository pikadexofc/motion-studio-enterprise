/**
 * Reel Component: ReelGpsTransit
 * Beat 2 (03-08s): Split screen GPS route map Sydney to Melbourne on Hume Highway
 * + UNN pantech truck driving at sunrise.
 * Voiceover: "Moving interstate from Sydney to Melbourne? Most movers just toss boxes in and hope for the best."
 */
export const ReelGpsTransit = {
  id: 'ReelGpsTransit',
  version: '1.0.0',
  category: 'reel-transit',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Split screen GPS telematics route map (Sydney ↔ Melbourne, 878 km) and sunrise highway truck transit.',
  complexity: { domNodes: 'moderate', memory: 'low' },

  defaults: {
    origin: 'SYDNEY NSW',
    destination: 'MELBOURNE VIC',
    distanceKm: 878,
    highwayName: 'HUME HIGHWAY • M31',
    truckImage: './assets/unn/truck_highway.jpg',
    contrastText: 'Most movers toss boxes in & hope for the best.'
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };

    return `
      <div id="${componentId}" class="reel-gps-transit">
        <!-- TOP HALF: GPS Telematics Navigation Map -->
        <div class="gps-top-panel">
          <div class="gps-map-grid"></div>
          
          <!-- Header Telematics HUD -->
          <div class="gps-hud-bar">
            <div class="hud-pill live-pill">
              <span class="live-dot"></span>
              <span>LIVE GPS TELEMATICS</span>
            </div>
            <div class="hud-pill route-pill">
              <span>${p.highwayName}</span>
            </div>
          </div>

          <!-- SVG Route Vector -->
          <svg class="gps-route-svg" viewBox="0 0 960 700" preserveAspectRatio="none">
            <!-- Background Road Matrix -->
            <path class="road-backdrop" d="M 720 80 Q 560 220 500 360 T 260 620" />
            <!-- Animated Electric Orange Route Trace -->
            <path class="road-active-trace" id="${componentId}-route" d="M 720 80 Q 560 220 500 360 T 260 620" />
          </svg>

          <!-- Origin Pin: Sydney -->
          <div class="map-pin pin-sydney">
            <div class="pin-ring"></div>
            <div class="pin-dot"></div>
            <div class="pin-card">
              <span class="pin-title">ORIGIN</span>
              <span class="pin-city">${p.origin}</span>
            </div>
          </div>

          <!-- Midpoint: Albury Hume Corridor -->
          <div class="map-pin pin-waypoint">
            <div class="waypoint-dot"></div>
            <span class="waypoint-label">ALBURY CORRIDOR</span>
          </div>

          <!-- Destination Pin: Melbourne -->
          <div class="map-pin pin-melbourne">
            <div class="pin-ring pin-ring-dest"></div>
            <div class="pin-dot pin-dot-dest"></div>
            <div class="pin-card pin-card-dest">
              <span class="pin-title">DESTINATION</span>
              <span class="pin-city">${p.destination}</span>
            </div>
          </div>

          <!-- Dynamic Distance Display -->
          <div class="distance-metric-badge">
            <div class="metric-number"><span id="${componentId}-counter">${p.distanceKm}</span> <span class="unit">KM</span></div>
            <div class="metric-label">INTERSTATE HIGHWAY CORRIDOR</div>
          </div>
        </div>

        <!-- SPLIT DIVIDER BAR -->
        <div class="split-divider">
          <div class="divider-line"></div>
          <div class="divider-badge">
            <span class="badge-icon">🚚</span>
            <span>UNN EXPRESS INTERSTATE FLEET</span>
          </div>
          <div class="divider-line"></div>
        </div>

        <!-- BOTTOM HALF: Sunrise Highway Truck Footage -->
        <div class="truck-bottom-panel">
          <div class="truck-photo-container">
            <img class="truck-photo" src="${p.truckImage}" alt="UNN Truck Highway Sunrise" />
            <div class="sunrise-flare"></div>
            <div class="photo-overlay-gradient"></div>
          </div>

          <!-- Voiceover Context Callout Card -->
          <div class="transit-caption-card">
            <div class="warning-tag">
              <span class="warning-icon">⚠️</span>
              <span>INDUSTRY PROBLEM</span>
            </div>
            <div class="caption-quote">
              "${p.contrastText}"
            </div>
            <div class="unn-solution-pill">
              <span class="check-icon">✓</span>
              <span>UNN STANDARD: ZERO-DAMAGE ENGINEERED TRANSIT</span>
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
        opacity: 0;
        pointer-events: none;
      }

      /* TOP PANEL: GPS MAP (52% Height) */
      #${componentId} .gps-top-panel {
        position: relative;
        width: 100%;
        height: 52%;
        background: radial-gradient(circle at 65% 30%, #0d1e38 0%, #060c17 100%);
        overflow: hidden;
        border-bottom: 2px solid rgba(255, 114, 0, 0.4);
      }

      #${componentId} .gps-map-grid {
        position: absolute;
        inset: 0;
        background-size: 60px 60px;
        background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      }

      #${componentId} .gps-hud-bar {
        position: absolute;
        top: 40px;
        left: 40px;
        right: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
      }

      #${componentId} .hud-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 18px;
        border-radius: 999px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.12em;
        backdrop-filter: blur(12px);
      }

      #${componentId} .live-pill {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid #10b981;
        color: #10b981;
      }

      #${componentId} .live-dot {
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 10px #10b981;
      }

      #${componentId} .route-pill {
        background: rgba(14, 42, 71, 0.85);
        border: 1px solid rgba(255, 114, 0, 0.5);
        color: #ffffff;
      }

      #${componentId} .gps-route-svg {
        position: absolute;
        top: 100px;
        left: 60px;
        width: 960px;
        height: 700px;
        z-index: 5;
      }

      #${componentId} .road-backdrop {
        fill: none;
        stroke: rgba(255, 255, 255, 0.12);
        stroke-width: 14;
        stroke-linecap: round;
      }

      #${componentId} .road-active-trace {
        fill: none;
        stroke: #FF7200;
        stroke-width: 12;
        stroke-linecap: round;
        filter: drop-shadow(0 0 16px rgba(255, 114, 0, 0.8));
        stroke-dasharray: 1200;
        stroke-dashoffset: 1200;
      }

      #${componentId} .map-pin {
        position: absolute;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      #${componentId} .pin-sydney {
        top: 155px;
        right: 170px;
      }

      #${componentId} .pin-melbourne {
        bottom: 120px;
        left: 170px;
      }

      #${componentId} .pin-ring {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 3px solid #FF7200;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(255, 114, 0, 0.6);
      }

      #${componentId} .pin-ring-dest {
        border-color: #10b981;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
      }

      #${componentId} .pin-dot {
        width: 12px;
        height: 12px;
        background: #FF7200;
        border-radius: 50%;
      }

      #${componentId} .pin-dot-dest {
        background: #10b981;
      }

      #${componentId} .pin-card {
        background: rgba(14, 42, 71, 0.9);
        border: 1px solid rgba(255, 114, 0, 0.4);
        padding: 6px 14px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
      }

      #${componentId} .pin-card-dest {
        border-color: rgba(16, 185, 129, 0.5);
      }

      #${componentId} .pin-title {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.15em;
        color: #94a3b8;
      }

      #${componentId} .pin-city {
        font-size: 16px;
        font-weight: 900;
        color: #ffffff;
      }

      #${componentId} .pin-waypoint {
        top: 48%;
        left: 48%;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(0,0,0,0.6);
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.15);
      }

      #${componentId} .waypoint-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fbbf24;
      }

      #${componentId} .waypoint-label {
        font-size: 11px;
        font-weight: 800;
        color: #e2e8f0;
        letter-spacing: 0.1em;
      }

      #${componentId} .distance-metric-badge {
        position: absolute;
        bottom: 30px;
        right: 40px;
        background: rgba(14, 42, 71, 0.95);
        border: 2px solid #FF7200;
        border-radius: 16px;
        padding: 12px 24px;
        text-align: right;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        z-index: 10;
      }

      #${componentId} .metric-number {
        font-family: 'Montserrat', sans-serif;
        font-size: 42px;
        font-weight: 900;
        color: #ffffff;
        line-height: 1;
      }

      #${componentId} .metric-number .unit {
        font-size: 22px;
        color: #FF7200;
      }

      #${componentId} .metric-label {
        font-size: 11px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 0.15em;
        margin-top: 4px;
      }

      /* SPLIT DIVIDER */
      #${componentId} .split-divider {
        width: 100%;
        height: 48px;
        background: #FF7200;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 15;
        box-shadow: 0 0 30px rgba(255, 114, 0, 0.7);
      }

      #${componentId} .divider-line {
        flex: 1;
        height: 2px;
        background: rgba(0, 0, 0, 0.3);
      }

      #${componentId} .divider-badge {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 900;
        letter-spacing: 0.2em;
        color: #000000;
      }

      /* BOTTOM PANEL: TRUCK FOOTAGE (48% Height) */
      #${componentId} .truck-bottom-panel {
        position: relative;
        width: 100%;
        height: 48%;
        overflow: hidden;
      }

      #${componentId} .truck-photo-container {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }

      #${componentId} .truck-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.05);
      }

      #${componentId} .sunrise-flare {
        position: absolute;
        top: -100px;
        right: -100px;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 170, 50, 0.45) 0%, transparent 70%);
        mix-blend-mode: screen;
        pointer-events: none;
      }

      #${componentId} .photo-overlay-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(0deg, rgba(7, 15, 30, 0.95) 0%, rgba(7, 15, 30, 0.3) 50%, transparent 100%);
      }

      #${componentId} .transit-caption-card {
        position: absolute;
        bottom: 50px;
        left: 40px;
        right: 40px;
        background: rgba(14, 42, 71, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 18px;
        padding: 24px 28px;
        backdrop-filter: blur(16px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      }

      #${componentId} .warning-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 800;
        color: #ef4444;
        background: rgba(239, 68, 68, 0.15);
        padding: 4px 10px;
        border-radius: 999px;
        margin-bottom: 12px;
        letter-spacing: 0.1em;
      }

      #${componentId} .caption-quote {
        font-family: 'Montserrat', sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: #e2e8f0;
        line-height: 1.3;
        margin-bottom: 14px;
      }

      #${componentId} .unn-solution-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 800;
        color: #FF7200;
        letter-spacing: 0.1em;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const start = timing.start;
    const dur = timing.duration;
    const root = `#${componentId}`;
    const p = { ...this.defaults, ...params };

    // Initial States
    gsap.set(root, { opacity: 0, visibility: 'hidden' });
    gsap.set(`${root} .truck-photo`, { scale: 1.05 });
    gsap.set(`${root} .map-pin`, { scale: 0, opacity: 0 });
    gsap.set(`${root} .transit-caption-card`, { y: 40, opacity: 0 });

    // Timeline visibility control
    tl.set(root, { visibility: 'visible' }, start);

    // Entrance (Deterministic fromTo)
    tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', immediateRender: false }, start);

    // Pin 1: Sydney Pop
    tl.fromTo(`${root} .pin-sydney`,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.8)', immediateRender: false },
      start + 0.2
    );

    // Route Draw Animation (Sydney to Melbourne)
    tl.fromTo(`${root} .road-active-trace`,
      { strokeDashoffset: 1200 },
      { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', immediateRender: false },
      start + 0.4
    );

    // Distance Metric Badge Reveal
    tl.fromTo(`${root} .distance-metric-badge`,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', immediateRender: false },
      start + 0.6
    );

    // Waypoint Pop
    tl.fromTo(`${root} .pin-waypoint`,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)', immediateRender: false },
      start + 1.4
    );

    // Pin 2: Melbourne Pop
    tl.fromTo(`${root} .pin-melbourne`,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.8)', immediateRender: false },
      start + 2.3
    );

    // Truck Cinematic Push-in
    tl.fromTo(`${root} .truck-photo`,
      { scale: 1.05 },
      { scale: 1.15, duration: dur, ease: 'none', immediateRender: false },
      start
    );

    // Caption Card Reveal
    tl.fromTo(`${root} .transit-caption-card`,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', immediateRender: false },
      start + 1.0
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
