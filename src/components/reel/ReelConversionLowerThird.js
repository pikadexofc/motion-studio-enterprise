/**
 * Reel Component: ReelConversionLowerThird
 * Beat 4 (18-25s): Ending & Verified Conversion.
 * Truck rolls to Melbourne curb, family smiling, lower-third pops:
 * "Sydney Main: 1300 556 778 • www.unnmovers.com.au"
 * Voiceover: "Book your Spring interstate move today. Call 1300 556 778."
 * Hashtags: #SydneyRemovalists #MelbourneMovers #InterstateMovingAustralia #UNNMovers #MovingHacks
 */
export const ReelConversionLowerThird = {
  id: 'ReelConversionLowerThird',
  version: '1.0.0',
  category: 'reel-conversion',
  dimension: '2d',
  runtime: 'dom-gsap',
  description: 'Verified conversion lower-third with ground truth contact data, official UNN branding, and Spring CTA.',
  complexity: { domNodes: 'high', memory: 'moderate' },

  defaults: {
    arrivalImage: './assets/unn/truck_arrival.jpg',
    logoImage: './assets/unn/logo.png',
    phone: '1300 556 778',
    website: 'www.unnmovers.com.au',
    campaign: 'BOOK YOUR SPRING INTERSTATE MOVE TODAY',
    tagline: 'SYDNEY ↔ MELBOURNE ZERO DAMAGE SPECIALISTS',
    hashtags: ['#SydneyRemovalists', '#MelbourneMovers', '#InterstateMovingAustralia', '#UNNMovers', '#MovingHacks']
  },

  validateParameters(params) {
    return { valid: true, errors: [] };
  },

  renderDOM(componentId, params, tokens) {
    const p = { ...this.defaults, ...params };
    const hashHtml = p.hashtags.map(h => `<span class="hashtag-item">${h}</span>`).join(' • ');

    return `
      <div id="${componentId}" class="reel-conversion-ending">
        <!-- Background: Melbourne Arrival Scene -->
        <div class="arrival-bg-container">
          <img class="arrival-photo" src="${p.arrivalImage}" alt="UNN Truck Melbourne Arrival" />
          <div class="arrival-gradient-overlay"></div>
          
          <!-- Top Arrival Telemetry Flag -->
          <div class="arrival-status-flag">
            <span class="flag-dot"></span>
            <span>MELBOURNE VIC • DELIVERED ON SCHEDULE</span>
          </div>
        </div>

        <!-- Upper Callout: Spring Campaign -->
        <div class="campaign-banner-pill">
          <span class="banner-icon">🌸</span>
          <span class="banner-text">${p.campaign}</span>
        </div>

        <!-- Master Lower-Third Pop Card -->
        <div class="master-lower-third-card" id="${componentId}-card">
          <!-- Logo & Brand Row -->
          <div class="brand-header-row">
            <img class="unn-official-logo" src="${p.logoImage}" alt="UNN Movers & Logistics Official Logo" />
            <div class="brand-descriptor-pill">
              <span class="pill-dot"></span>
              <span>INTERSTATE LOGISTICS</span>
            </div>
          </div>

          <!-- Main Phone CTA (Ground Truth Verified) -->
          <div class="phone-cta-container">
            <div class="phone-label-strip">
              <span>SYDNEY MAIN BOOKINGS</span>
              <span class="label-badge">FREE FIXED QUOTE</span>
            </div>
            <div class="phone-number-display">
              <span class="phone-icon-box">📞</span>
              <span class="phone-digits">${p.phone}</span>
            </div>
          </div>

          <!-- Website & Assurance Row -->
          <div class="digital-contact-row">
            <div class="website-pill">
              <span class="globe-icon">🌐</span>
              <span class="website-url">${p.website}</span>
            </div>
            <div class="license-badge">
              <span>AUSTRALIA WIDE</span>
            </div>
          </div>

          <!-- Reassurance Proof Points -->
          <div class="proof-points-strip">
            <div class="proof-item">
              <span class="check">✓</span> Zero Damage Guarantee
            </div>
            <div class="proof-item">
              <span class="check">✓</span> Wall-Locked Cargo
            </div>
            <div class="proof-item">
              <span class="check">✓</span> Live GPS Telematics
            </div>
          </div>

          <!-- Official Social Hashtags Ticker Bar -->
          <div class="hashtags-ticker-bar">
            <div class="hashtags-content">
              ${hashHtml}
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
        align-items: center;
        padding-bottom: 60px;
        opacity: 0;
        pointer-events: none;
      }

      #${componentId} .arrival-bg-container {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 1;
      }

      #${componentId} .arrival-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.05);
      }

      #${componentId} .arrival-gradient-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(0deg, rgba(7, 15, 30, 0.98) 0%, rgba(7, 15, 30, 0.6) 45%, rgba(7, 15, 30, 0.2) 100%);
      }

      #${componentId} .arrival-status-flag {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(14, 42, 71, 0.9);
        border: 1px solid #10b981;
        padding: 8px 24px;
        border-radius: 999px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        font-weight: 800;
        color: #10b981;
        letter-spacing: 0.16em;
        backdrop-filter: blur(12px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.6);
      }

      #${componentId} .flag-dot {
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 10px #10b981;
      }

      /* CAMPAIGN BANNER PILL */
      #${componentId} .campaign-banner-pill {
        position: relative;
        z-index: 10;
        margin-top: 150px;
        background: linear-gradient(90deg, #FF7200 0%, #FF8A1E 100%);
        padding: 14px 36px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 30px rgba(255, 114, 0, 0.6);
        border: 2px solid #ffffff;
      }

      #${componentId} .banner-icon {
        font-size: 20px;
      }

      #${componentId} .banner-text {
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 0.08em;
        color: #ffffff;
        text-transform: uppercase;
      }

      /* MASTER LOWER THIRD CARD */
      #${componentId} .master-lower-third-card {
        position: relative;
        z-index: 15;
        width: 960px;
        background: rgba(14, 42, 71, 0.95);
        border: 2px solid rgba(255, 114, 0, 0.5);
        border-radius: 28px;
        padding: 36px 40px;
        backdrop-filter: blur(24px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      #${componentId} .brand-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        padding-bottom: 16px;
      }

      #${componentId} .unn-official-logo {
        height: 62px;
        object-fit: contain;
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
      }

      #${componentId} .brand-descriptor-pill {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.18em;
        color: #FF7200;
        background: rgba(255, 114, 0, 0.12);
        padding: 6px 14px;
        border-radius: 999px;
        border: 1px solid rgba(255, 114, 0, 0.4);
      }

      #${componentId} .pill-dot {
        width: 6px;
        height: 6px;
        background: #FF7200;
        border-radius: 50%;
      }

      /* PHONE CTA */
      #${componentId} .phone-cta-container {
        background: #FF7200;
        border: 2px solid #FFA04D;
        border-radius: 20px;
        padding: 20px 28px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 12px 35px rgba(255, 114, 0, 0.45);
      }

      #${componentId} .phone-label-strip {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        font-weight: 900;
        color: #0E2A47;
        letter-spacing: 0.15em;
      }

      #${componentId} .label-badge {
        background: #0E2A47;
        color: #ffffff;
        padding: 3px 10px;
        border-radius: 6px;
        font-weight: 900;
      }

      #${componentId} .phone-number-display {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      #${componentId} .phone-icon-box {
        width: 54px;
        height: 54px;
        background: #0E2A47;
        color: #ffffff;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      #${componentId} .phone-digits {
        font-family: 'Montserrat', sans-serif;
        font-size: 54px;
        font-weight: 950;
        color: #0E2A47;
        letter-spacing: 0.04em;
        line-height: 1;
      }

      /* DIGITAL CONTACT ROW */
      #${componentId} .digital-contact-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #${componentId} .website-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 10px 20px;
        border-radius: 12px;
      }

      #${componentId} .globe-icon {
        font-size: 18px;
      }

      #${componentId} .website-url {
        font-family: 'Montserrat', sans-serif;
        font-size: 19px;
        font-weight: 800;
        color: #e2e8f0;
        letter-spacing: 0.05em;
      }

      #${componentId} .license-badge {
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.12em;
        color: #94a3b8;
      }

      /* PROOF POINTS STRIP */
      #${componentId} .proof-points-strip {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 14px;
        font-size: 13px;
        font-weight: 700;
        color: #cbd5e1;
      }

      #${componentId} .proof-item .check {
        color: #10b981;
        font-weight: 900;
        margin-right: 4px;
      }

      /* HASHTAGS TICKER */
      #${componentId} .hashtags-ticker-bar {
        background: rgba(7, 15, 30, 0.9);
        border-radius: 10px;
        padding: 10px 16px;
        font-size: 12px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 0.06em;
        text-align: center;
      }

      #${componentId} .hashtag-item {
        color: #FFA04D;
      }
    `;
  },

  buildGSAP(tl, componentId, timing, params, motion, tokens) {
    const start = timing.start;
    const dur = timing.duration;
    const root = `#${componentId}`;

    // Initial States
    gsap.set(root, { opacity: 0, visibility: 'hidden' });
    gsap.set(`${root} .arrival-photo`, { scale: 1.05 });
    gsap.set(`${root} .campaign-banner-pill`, { y: -40, opacity: 0 });
    gsap.set(`${root}-card`, { y: 120, opacity: 0 });
    gsap.set(`${root} .arrival-status-flag`, { scale: 0.8, opacity: 0 });

    // Timeline visibility control
    tl.set(root, { visibility: 'visible' }, start);

    // Entrance (Deterministic fromTo)
    tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', immediateRender: false }, start);

    // Arrival Status Flag
    tl.fromTo(`${root} .arrival-status-flag`,
      { scale: 0.8, opacity: 0 },
      { scale: 1.0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)', immediateRender: false },
      start + 0.2
    );

    // Camera Gentle Deceleration
    tl.fromTo(`${root} .arrival-photo`,
      { scale: 1.05 },
      { scale: 1.12, duration: dur, ease: 'none', immediateRender: false },
      start
    );

    // Campaign Banner Slide Down
    tl.fromTo(`${root} .campaign-banner-pill`,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', immediateRender: false },
      start + 0.4
    );

    // Master Lower-Third Pop
    tl.fromTo(`${root}-card`,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.3)', immediateRender: false },
      start + 0.7
    );

    // Phone CTA Pulse Effect (Deterministic keyframes)
    tl.fromTo(`${root} .phone-cta-container`,
      { boxShadow: '0 0 25px rgba(255, 114, 0, 0.25)' },
      {
        keyframes: [
          { boxShadow: '0 0 50px rgba(255, 114, 0, 0.7)', duration: 0.35, ease: 'sine.out' },
          { boxShadow: '0 0 25px rgba(255, 114, 0, 0.25)', duration: 0.35, ease: 'sine.in' },
          { boxShadow: '0 0 50px rgba(255, 114, 0, 0.7)', duration: 0.35, ease: 'sine.out' },
          { boxShadow: '0 0 25px rgba(255, 114, 0, 0.25)', duration: 0.35, ease: 'sine.in' }
        ],
        immediateRender: false
      },
      start + 1.5
    );
  }
};
