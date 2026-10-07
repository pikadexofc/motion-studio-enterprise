const fs = require('fs');
const path = require('path');

// Reference Darwin's node_modules where puppeteer is installed
const darwinNodeModules = path.join(__dirname, '..', 'Shining Technologies', '04 Companies', '03 Darwin Tree Removal', '03 Reels', 'node_modules');
const puppeteer = require(path.join(darwinNodeModules, 'puppeteer'));

const BASE_DIR = path.join(__dirname, '..');

const BRANDS = [
  {
    key: 'shining_tech',
    name: 'SHINING TECHNOLOGIES',
    subtitle: 'MOTHER COMPANY & CREATIVE SYSTEMS',
    targetDir: path.join(BASE_DIR, 'Shining Technologies', '01 Brand Kit'),
    bgGradient: 'linear-gradient(135deg, #0B0F19 0%, #111827 50%, #030712 100%)',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    colors: [
      { name: 'Obsidian Void', hex: '#0B0F19', role: 'Main Background' },
      { name: 'Midnight Slate', hex: '#1E293B', role: 'Card / Surface' },
      { name: 'Cyber Indigo', hex: '#6366F1', role: 'Primary Brand' },
      { name: 'Emerald Pulse', hex: '#10B981', role: 'Growth Accent' },
      { name: 'Electric Violet', hex: '#8B5CF6', role: 'Secondary Accent' },
      { name: 'Platinum Ice', hex: '#F8FAFC', role: 'Display White' }
    ],
    fonts: {
      display: 'Space Grotesk, sans-serif',
      body: 'Inter, sans-serif',
      code: 'JetBrains Mono, monospace'
    },
    tagline: 'Leading AI, Software, Creative Media & Business Expansion',
    stats: [
      { label: 'Subsidiaries', value: '3 Australian Brands' },
      { label: 'Capabilities', value: 'AI Video • Web • Growth' },
      { label: 'Headquarters', value: 'Central Holding Hub' }
    ],
    components: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <button style="background:#6366F1;color:#fff;border:none;padding:12px 24px;border-radius:10px;font-weight:700;font-size:14px;box-shadow:0 0 20px rgba(99,102,241,0.4);">Launch Pipeline</button>
        <button style="background:transparent;color:#F8FAFC;border:1px solid rgba(255,255,255,0.2);padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;">Documentation</button>
        <span style="background:rgba(16,185,129,0.15);color:#10B981;border:1px solid rgba(16,185,129,0.3);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;">SYSTEM OPERATIONAL</span>
      </div>
    `
  },
  {
    key: 'unn_movers',
    name: 'UNN MOVERS AND LOGISTICS',
    subtitle: 'AUSTRALIA-WIDE FREIGHT & REMOVALS',
    targetDir: path.join(BASE_DIR, 'Shining Technologies', '04 Companies', '01 UNN Movers and Logistics', '01 Brand Kit'),
    bgGradient: 'linear-gradient(135deg, #091938 0%, #0F2557 50%, #061026 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
    colors: [
      { name: 'Interstate Navy', hex: '#0F2557', role: 'Primary Base' },
      { name: 'Hazard Amber', hex: '#F59E0B', role: 'Safety Accent' },
      { name: 'Pacific Blue', hex: '#2563EB', role: 'Fleet Secondary' },
      { name: 'Route Verified', hex: '#10B981', role: 'On-Time Status' },
      { name: 'Asphalt Dark', hex: '#1E293B', role: 'Heavy Chassis' },
      { name: 'Ground White', hex: '#FFFFFF', role: 'Clean Contrast' }
    ],
    fonts: {
      display: 'Montserrat, Poppins, sans-serif',
      body: 'Inter, sans-serif',
      code: 'Manrope, sans-serif'
    },
    tagline: 'Reliable Interstate Removals & Heavy Freight Across Australia',
    stats: [
      { label: 'Coverage', value: 'All Australian States' },
      { label: 'Fleet Safety', value: '100% Strapped & Insured' },
      { label: 'Tracking', value: '24/7 GPS Telematics' }
    ],
    components: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <button style="background:#F59E0B;color:#0F2557;border:none;padding:12px 24px;border-radius:10px;font-weight:800;font-size:14px;box-shadow:0 4px 15px rgba(245,158,11,0.35);">BOOK INTERSTATE MOVE</button>
        <button style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.25);padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;">Instant Quote</button>
        <span style="background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid rgba(245,158,11,0.4);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:800;">AU-WIDE TRANSIT</span>
      </div>
    `
  },
  {
    key: 'shining_services',
    name: 'SHINING SERVICES',
    subtitle: 'RESIDENTIAL & COMMERCIAL CLEANING (BRISBANE & MELBOURNE)',
    targetDir: path.join(BASE_DIR, 'Shining Technologies', '04 Companies', '02 Shining Services', '01 Brand Kit'),
    bgGradient: 'linear-gradient(135deg, #042F2C 0%, #0F4541 50%, #021B19 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(20, 184, 166, 0.3)',
    textPrimary: '#F0FDF4',
    textSecondary: '#99F6E4',
    colors: [
      { name: 'Fresh Aquamarine', hex: '#0D9488', role: 'Primary Hygiene' },
      { name: 'Crisp Cyan', hex: '#06B6D4', role: 'Pure Water' },
      { name: 'Sparkle Gold', hex: '#F59E0B', role: '5-Star Quality' },
      { name: 'Deep Slate Sea', hex: '#0F2E2B', role: 'Card Base' },
      { name: 'Pristine Mint', hex: '#F0FDF4', role: 'Light Surface' },
      { name: 'Sterile White', hex: '#FFFFFF', role: 'Clean Sheet' }
    ],
    fonts: {
      display: 'Plus Jakarta Sans, Poppins, sans-serif',
      body: 'Inter, sans-serif',
      code: 'Manrope, sans-serif'
    },
    tagline: 'Spotless Homes, Trusted Offices & 100% Bond Back Cleaners',
    stats: [
      { label: 'Locations', value: 'Brisbane & Melbourne' },
      { label: 'Guarantee', value: '100% Bond Back Passed' },
      { label: 'Specialty', value: 'Steam Carpet & Tile Grout' }
    ],
    components: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <button style="background:#0D9488;color:#FFFFFF;border:none;padding:12px 24px;border-radius:10px;font-weight:700;font-size:14px;box-shadow:0 4px 18px rgba(13,148,136,0.4);">Book Cleaning Now</button>
        <button style="background:rgba(255,255,255,0.06);color:#F0FDF4;border:1px solid rgba(20,184,166,0.3);padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;">View Pricing</button>
        <span style="background:rgba(20,184,166,0.18);color:#2DD4BF;border:1px solid rgba(20,184,166,0.4);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;">★ 100% BOND BACK</span>
      </div>
    `
  },
  {
    key: 'darwin_tree',
    name: 'DARWIN TREE REMOVAL NT',
    subtitle: 'EMERGENCY ARBORICULTURE & LAND CLEARING',
    targetDir: path.join(BASE_DIR, 'Shining Technologies', '04 Companies', '03 Darwin Tree Removal', '01 Brand Kit'),
    bgGradient: 'linear-gradient(135deg, #0D1C16 0%, #152A22 50%, #060D0A 100%)',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(217, 111, 42, 0.3)',
    textPrimary: '#F6F1E7',
    textSecondary: '#D1D5DB',
    colors: [
      { name: 'Forest Timber', hex: '#122820', role: 'Deep Canopy' },
      { name: 'Terracotta Earth', hex: '#D96F2A', role: 'Primary Accent' },
      { name: 'Hazard Flare', hex: '#F0924E', role: 'Emergency Warning' },
      { name: 'Eucalyptus Dark', hex: '#1C3D2E', role: 'Surface Base' },
      { name: 'Parchment Cream', hex: '#F6F1E7', role: 'Natural Canvas' },
      { name: 'High-Vis White', hex: '#FFFFFF', role: 'Sharp Contrast' }
    ],
    fonts: {
      display: 'Poppins, sans-serif',
      body: 'Inter, sans-serif',
      code: 'Inter, sans-serif'
    },
    tagline: 'Certified Arborists, Storm Preparation & 24/7 Dangerous Tree Removal',
    stats: [
      { label: 'Region', value: 'Darwin & Northern Territory' },
      { label: 'Readiness', value: '24/7 Cyclone Emergency' },
      { label: 'Machinery', value: 'Heavy Crane & Stump Grinder' }
    ],
    components: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <button style="background:#D96F2A;color:#FFFFFF;border:none;padding:12px 24px;border-radius:10px;font-weight:800;font-size:14px;box-shadow:0 4px 18px rgba(217,111,42,0.4);">24/7 EMERGENCY CALL</button>
        <button style="background:rgba(255,255,255,0.06);color:#F6F1E7;border:1px solid rgba(217,111,42,0.35);padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;">Request Quote</button>
        <span style="background:rgba(217,111,42,0.18);color:#F0924E;border:1px solid rgba(217,111,42,0.4);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:800;">CYCLONE READY</span>
      </div>
    `
  }
];

function buildHTML(b) {
  const swatchesHtml = b.colors.map(c => `
    <div style="flex:1;min-width:140px;background:${b.cardBg};border:1px solid ${b.borderColor};border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;">
      <div style="width:100%;height:68px;border-radius:8px;background:${c.hex};box-shadow:0 4px 12px rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.15);"></div>
      <div>
        <div style="font-size:13px;font-weight:700;color:${b.textPrimary};letter-spacing:-0.01em;">${c.name}</div>
        <div style="font-size:12px;font-family:monospace;font-weight:600;color:${c.hex};margin-top:2px;">${c.hex}</div>
        <div style="font-size:11px;color:${b.textSecondary};margin-top:2px;">${c.role}</div>
      </div>
    </div>
  `).join('');

  const statsHtml = b.stats.map(s => `
    <div style="background:${b.cardBg};border:1px solid ${b.borderColor};border-radius:12px;padding:14px 18px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:${b.textSecondary};font-weight:600;">${s.label}</div>
      <div style="font-size:15px;font-weight:750;color:${b.textPrimary};margin-top:4px;">${s.value}</div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${b.name} — Brand Identity Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@700;800&family=Plus+Jakarta+Sans:wght@700;800&family=Poppins:wght@600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    background: ${b.bgGradient};
    font-family: 'Inter', sans-serif;
    color: ${b.textPrimary};
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
</head>
<body>

  <!-- TOP HEADER -->
  <header style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid ${b.borderColor};padding-bottom:30px;">
    <div>
      <div style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:${b.textSecondary};font-weight:700;margin-bottom:6px;">${b.subtitle}</div>
      <h1 style="font-size:44px;font-weight:850;letter-spacing:-0.03em;font-family:${b.fonts.display};">${b.name}</h1>
      <p style="font-size:16px;color:${b.textSecondary};margin-top:6px;max-width:800px;">"${b.tagline}"</p>
    </div>
    <div style="display:flex;gap:14px;">
      ${statsHtml}
    </div>
  </header>

  <!-- MIDDLE SECTION: COLOR PALETTE -->
  <section>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2 style="font-size:18px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">Official Master Color Palette</h2>
      <span style="font-size:12px;color:${b.textSecondary};font-weight:600;">Eyedropper Ready • Hex Verified</span>
    </div>
    <div style="display:flex;gap:16px;">
      ${swatchesHtml}
    </div>
  </section>

  <!-- BOTTOM SECTION: TYPOGRAPHY & UI SYSTEM -->
  <footer style="display:grid;grid-template-columns:1fr 1fr;gap:24px;border-top:1px solid ${b.borderColor};padding-top:30px;">
    
    <!-- TYPOGRAPHY SPECIMEN -->
    <div style="background:${b.cardBg};border:1px solid ${b.borderColor};border-radius:16px;padding:24px;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${b.textSecondary};font-weight:700;margin-bottom:14px;">Typography Hierarchy</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <span style="font-size:24px;font-weight:800;font-family:${b.fonts.display};">Heading Display Aa</span>
          <span style="font-size:12px;font-family:monospace;color:${b.textSecondary};">${b.fonts.display}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <span style="font-size:16px;font-weight:500;font-family:${b.fonts.body};">Paragraph & UI Body Text Quick Brown Fox</span>
          <span style="font-size:12px;font-family:monospace;color:${b.textSecondary};">${b.fonts.body}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <span style="font-size:14px;font-family:${b.fonts.code};font-weight:600;">$ 1,450.00 • 24/7 TELEMATICS • 100% BOND</span>
          <span style="font-size:12px;font-family:monospace;color:${b.textSecondary};">${b.fonts.code}</span>
        </div>
      </div>
    </div>

    <!-- UI TOKENS & COMPONENTS -->
    <div style="background:${b.cardBg};border:1px solid ${b.borderColor};border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;">
      <div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${b.textSecondary};font-weight:700;margin-bottom:14px;">Interactive Design Tokens & Buttons</div>
        ${b.components}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:${b.textSecondary};">
        <span>Border Radius: <b>10px / 16px</b></span>
        <span>Grid Base: <b>8pt System</b></span>
        <span>Shining Technologies Creative Standard</span>
      </div>
    </div>

  </footer>

</body>
</html>`;
}

async function renderAll() {
  console.log("=== Launching Puppeteer to Render 4K/2K Brand Identity Boards ===");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const b of BRANDS) {
    if (!fs.existsSync(b.targetDir)) {
      fs.mkdirSync(b.targetDir, { recursive: true });
    }

    const htmlContent = buildHTML(b);
    const htmlPath = path.join(b.targetDir, 'brand_identity_board.html');
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log(`[${b.key}] Generated HTML -> ${htmlPath}`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pngPath = path.join(b.targetDir, 'brand_identity_board.png');
    await page.screenshot({ path: pngPath, type: 'png' });
    console.log(`[${b.key}] Rendered Retina PNG -> ${pngPath}`);
    await page.close();
  }

  await browser.close();
  console.log("\nALL BRAND IDENTITY BOARDS & PNGS RENDERED SUCCESSFULLY!");
}

renderAll().catch(err => {
  console.error("Error rendering brand boards:", err);
  process.exit(1);
});
