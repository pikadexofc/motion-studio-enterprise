#!/usr/bin/env python3
"""
Brand Identity Board Generator (HTML & High-Res PNG)
Builds interactive HTML sheets and renders pixel-perfect 1920x1080 PNG brand boards for:
1. Shining Technologies (Mother Company)
2. UNN Movers and Logistics
3. Shining Services
4. Darwin Tree Removal
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = Path(__file__).resolve().parent.parent

# System Fonts
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REGULAR = "C:/Windows/Fonts/segoeui.ttf"
FONT_SEMI = "C:/Windows/Fonts/segoeuisl.ttf" if os.path.exists("C:/Windows/Fonts/segoeuisl.ttf") else FONT_REGULAR
FONT_MONO = "C:/Windows/Fonts/consola.ttf"

BRANDS = [
    {
        "key": "shining_technologies",
        "name": "SHINING TECHNOLOGIES",
        "subtitle": "MOTHER COMPANY & CREATIVE SYSTEMS",
        "badge": "HOLDING & AGENCY HUB",
        "target_dir": BASE_DIR / "Shining Technologies" / "01 Brand Kit",
        "bg_color": "#0B0F19",
        "card_bg": "#131C2E",
        "border_color": "#1E293B",
        "text_primary": "#F8FAFC",
        "text_secondary": "#94A3B8",
        "primary_color": "#6366F1",
        "accent_color": "#10B981",
        "tagline": "Leading AI, Software, Creative Media & Business Expansion Systems",
        "colors": [
            {"name": "Obsidian Void", "hex": "#0B0F19", "role": "Main Background"},
            {"name": "Midnight Slate", "hex": "#1E293B", "role": "Card Surface"},
            {"name": "Cyber Indigo", "hex": "#6366F1", "role": "Primary Brand"},
            {"name": "Emerald Pulse", "hex": "#10B981", "role": "Growth Accent"},
            {"name": "Electric Violet", "hex": "#8B5CF6", "role": "Secondary Accent"},
            {"name": "Platinum White", "hex": "#F8FAFC", "role": "Display Text"}
        ],
        "fonts": {
            "display": "Space Grotesk / Syne (700 Bold)",
            "body": "Inter (400 Regular / 500 Medium)",
            "code": "JetBrains Mono / Consolas"
        },
        "stats": [
            ("PORTFOLIO", "3 Australian Brands"),
            ("SERVICES", "AI Video • Web • Growth"),
            ("STATUS", "System Operational")
        ]
    },
    {
        "key": "unn_movers",
        "name": "UNN MOVERS & LOGISTICS",
        "subtitle": "AUSTRALIA-WIDE FREIGHT & REMOVALS",
        "badge": "INTERSTATE LOGISTICS",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "01 UNN Movers and Logistics" / "01 Brand Kit",
        "bg_color": "#141C20",
        "card_bg": "#1C2529",
        "border_color": "#2D3A40",
        "text_primary": "#FFFFFF",
        "text_secondary": "#93C5FD",
        "primary_color": "#FF7200",
        "accent_color": "#2563EB",
        "tagline": "Reliable Interstate Moving, Commercial Freight & GPS Route Tracking",
        "colors": [
            {"name": "Interstate Navy", "hex": "#0F2557", "role": "Primary Base"},
            {"name": "Hazard Amber", "hex": "#FF7200", "role": "Safety Accent"},
            {"name": "Pacific Blue", "hex": "#2563EB", "role": "Fleet Secondary"},
            {"name": "Route Verified", "hex": "#10B981", "role": "On-Time Status"},
            {"name": "Asphalt Dark", "hex": "#1E293B", "role": "Heavy Chassis"},
            {"name": "Ground White", "hex": "#FFFFFF", "role": "Clean Contrast"}
        ],
        "fonts": {
            "display": "Montserrat / Poppins (800 ExtraBold)",
            "body": "Inter (400 Regular / 500 Medium)",
            "code": "Manrope (Numbers / Pricing)"
        },
        "stats": [
            ("COVERAGE", "All Australian States"),
            ("SAFETY", "100% Insured & Strapped"),
            ("DISPATCH", "24/7 Route Telematics")
        ]
    },
    {
        "key": "shining_services",
        "name": "SHINING SERVICES",
        "subtitle": "RESIDENTIAL & COMMERCIAL CLEANING",
        "badge": "BRISBANE & MELBOURNE",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "02 Shining Services" / "01 Brand Kit",
        "bg_color": "#032825",
        "card_bg": "#083D38",
        "border_color": "#0F5C55",
        "text_primary": "#F0FDF4",
        "text_secondary": "#5EEAD4",
        "primary_color": "#0D9488",
        "accent_color": "#06B6D4",
        "tagline": "Spotless Homes, Sparkling Offices & 100% Bond Back Guarantee",
        "colors": [
            {"name": "Fresh Aquamarine", "hex": "#0D9488", "role": "Primary Hygiene"},
            {"name": "Crisp Cyan", "hex": "#06B6D4", "role": "Pure Water"},
            {"name": "Sparkle Gold", "hex": "#FF7200", "role": "5-Star Rating"},
            {"name": "Deep Ocean Slate", "hex": "#0F2E2B", "role": "Card Base"},
            {"name": "Pristine Mint", "hex": "#F0FDF4", "role": "Light Canvas"},
            {"name": "Sterile White", "hex": "#FFFFFF", "role": "High Contrast"}
        ],
        "fonts": {
            "display": "Plus Jakarta Sans / Poppins (700 Bold)",
            "body": "Inter (400 Regular / 500 Medium)",
            "code": "Manrope (Labels & Pricing)"
        },
        "stats": [
            ("LOCATIONS", "Brisbane & Melbourne"),
            ("GUARANTEE", "100% Bond Back Passed"),
            ("SPECIALTY", "Carpet Steam & Tile Grout")
        ]
    },
    {
        "key": "darwin_tree",
        "name": "DARWIN TREE REMOVAL NT",
        "subtitle": "EMERGENCY ARBORICULTURE & CLEARING",
        "badge": "NORTHERN TERRITORY",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "03 Darwin Tree Removal" / "01 Brand Kit",
        "bg_color": "#0D1A14",
        "card_bg": "#162B21",
        "border_color": "#234435",
        "text_primary": "#F6F1E7",
        "text_secondary": "#A7F3D0",
        "primary_color": "#D96F2A",
        "accent_color": "#F0924E",
        "tagline": "Certified Arborists, Cyclone Storm Clearing & 24/7 Dangerous Tree Removal",
        "colors": [
            {"name": "Forest Timber", "hex": "#122820", "role": "Deep Canopy"},
            {"name": "Terracotta Earth", "hex": "#D96F2A", "role": "Primary Accent"},
            {"name": "Hazard Flare", "hex": "#F0924E", "role": "Warning High-Vis"},
            {"name": "Eucalyptus Dark", "hex": "#1C3D2E", "role": "Surface Base"},
            {"name": "Parchment Cream", "hex": "#F6F1E7", "role": "Natural Canvas"},
            {"name": "High-Vis White", "hex": "#FFFFFF", "role": "Clean Legibility"}
        ],
        "fonts": {
            "display": "Poppins / Montserrat (800 ExtraBold)",
            "body": "Inter (400 Regular / 500 Medium)",
            "code": "Inter (600 SemiBold)"
        },
        "stats": [
            ("REGION", "Darwin & Top End NT"),
            ("RESPONSE", "24/7 Cyclone Emergency"),
            ("EQUIPMENT", "Heavy Crane & Stump Grinder")
        ]
    }
]

def render_html_board(b):
    swatches = "".join([f"""
      <div class="swatch-card">
        <div class="swatch-block" style="background-color: {c['hex']};"></div>
        <div class="swatch-info">
          <div class="swatch-name">{c['name']}</div>
          <div class="swatch-hex">{c['hex']}</div>
          <div class="swatch-role">{c['role']}</div>
        </div>
      </div>
    """ for c in b["colors"]])

    stats_html = "".join([f"""
      <div class="stat-pill">
        <span class="stat-label">{s[0]}</span>
        <span class="stat-value">{s[1]}</span>
      </div>
    """ for s in b["stats"]])

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{b['name']} — Brand Identity Board</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@700;800&family=Plus+Jakarta+Sans:wght@700;800&family=Poppins:wght@600;700;800&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    background: {b['bg_color']};
    color: {b['text_primary']};
    font-family: 'Inter', sans-serif;
    padding: 40px;
    min-height: 100vh;
  }}
  .board {{
    max-width: 1400px;
    margin: 0 auto;
    background: {b['card_bg']};
    border: 1px solid {b['border_color']};
    border-radius: 24px;
    padding: 50px;
    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
  }}
  .badge {{
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: {b['primary_color']};
    color: #fff;
    margin-bottom: 12px;
  }}
  h1 {{
    font-size: 44px;
    font-weight: 850;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }}
  .subtitle {{
    font-size: 14px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: {b['text_secondary']};
    font-weight: 600;
  }}
  .tagline {{
    font-size: 16px;
    color: {b['text_secondary']};
    margin-top: 8px;
    font-style: italic;
  }}
  .header-wrap {{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid {b['border_color']};
    padding-bottom: 35px;
    margin-bottom: 35px;
    flex-wrap: wrap;
    gap: 20px;
  }}
  .stats-row {{
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }}
  .stat-pill {{
    background: rgba(0,0,0,0.25);
    border: 1px solid {b['border_color']};
    border-radius: 12px;
    padding: 12px 18px;
  }}
  .stat-label {{
    display: block;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: {b['text_secondary']};
    font-weight: 700;
  }}
  .stat-value {{
    display: block;
    font-size: 14px;
    font-weight: 700;
    margin-top: 4px;
  }}
  .section-title {{
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 800;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .swatch-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }}
  .swatch-card {{
    background: rgba(0,0,0,0.2);
    border: 1px solid {b['border_color']};
    border-radius: 14px;
    padding: 14px;
  }}
  .swatch-block {{
    width: 100%;
    height: 80px;
    border-radius: 8px;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }}
  .swatch-name {{
    font-size: 13px;
    font-weight: 700;
  }}
  .swatch-hex {{
    font-size: 13px;
    font-family: 'JetBrains Mono', monospace;
    color: {b['primary_color']};
    margin: 3px 0;
    font-weight: 700;
  }}
  .swatch-role {{
    font-size: 11px;
    color: {b['text_secondary']};
  }}
  .lower-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }}
  .info-box {{
    background: rgba(0,0,0,0.2);
    border: 1px solid {b['border_color']};
    border-radius: 16px;
    padding: 24px;
  }}
  .font-row {{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }}
  .font-row:last-child {{ border: none; }}
  .btn-primary {{
    background: {b['primary_color']};
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
  }}
  .btn-outline {{
    background: transparent;
    color: {b['text_primary']};
    border: 1px solid {b['border_color']};
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }}
</style>
</head>
<body>
  <div class="board">
    <div class="header-wrap">
      <div>
        <div class="badge">{b['badge']}</div>
        <div class="subtitle">{b['subtitle']}</div>
        <h1>{b['name']}</h1>
        <div class="tagline">"{b['tagline']}"</div>
      </div>
      <div class="stats-row">
        {stats_html}
      </div>
    </div>

    <div class="section-title">
      <span>Official Color Palette</span>
      <span style="font-size: 12px; color: {b['text_secondary']}; font-weight: 500;">Eyedropper Ready</span>
    </div>
    <div class="swatch-grid">
      {swatches}
    </div>

    <div class="lower-grid">
      <div class="info-box">
        <div class="section-title">Typography System</div>
        <div class="font-row">
          <span style="font-size: 18px; font-weight: 800;">Display Headings</span>
          <span style="color: {b['text_secondary']}; font-size: 12px;">{b['fonts']['display']}</span>
        </div>
        <div class="font-row">
          <span style="font-size: 15px; font-weight: 500;">Body & UI Text</span>
          <span style="color: {b['text_secondary']}; font-size: 12px;">{b['fonts']['body']}</span>
        </div>
        <div class="font-row">
          <span style="font-size: 14px; font-family: monospace;">Numbers & Pricing</span>
          <span style="color: {b['text_secondary']}; font-size: 12px;">{b['fonts']['code']}</span>
        </div>
      </div>

      <div class="info-box" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="section-title">Design Tokens & UI Controls</div>
          <div style="display: flex; gap: 12px; align-items: center; margin-top: 14px;">
            <button class="btn-primary">Primary Action</button>
            <button class="btn-outline">Secondary Option</button>
            <span style="background: rgba(16,185,129,0.2); color: #10B981; border: 1px solid rgba(16,185,129,0.4); padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 700;">ACTIVE</span>
          </div>
        </div>
        <div style="font-size: 11px; color: {b['text_secondary']}; margin-top: 20px;">
          Border Radius: 10px / 16px • 8pt Layout Grid System • Shining Technologies Creative Engine
        </div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return html

def render_png_board(b):
    w, h = 1920, 1080
    img = Image.new("RGB", (w, h), b["bg_color"])
    draw = ImageDraw.Draw(img)

    # Fonts
    try:
        f_title = ImageFont.truetype(FONT_BOLD, 46)
        f_subtitle = ImageFont.truetype(FONT_BOLD, 15)
        f_tagline = ImageFont.truetype(FONT_REGULAR, 18)
        f_badge = ImageFont.truetype(FONT_BOLD, 12)
        f_sec_title = ImageFont.truetype(FONT_BOLD, 20)
        f_sec_meta = ImageFont.truetype(FONT_REGULAR, 14)
        f_swatch_name = ImageFont.truetype(FONT_BOLD, 16)
        f_swatch_hex = ImageFont.truetype(FONT_MONO, 15)
        f_swatch_role = ImageFont.truetype(FONT_REGULAR, 13)
        f_stat_label = ImageFont.truetype(FONT_BOLD, 12)
        f_stat_val = ImageFont.truetype(FONT_BOLD, 16)
        f_ui_btn = ImageFont.truetype(FONT_BOLD, 15)
        f_meta_small = ImageFont.truetype(FONT_REGULAR, 13)
    except Exception as e:
        f_title = ImageFont.load_default()
        f_subtitle = f_title
        f_tagline = f_title
        f_badge = f_title
        f_sec_title = f_title
        f_sec_meta = f_title
        f_swatch_name = f_title
        f_swatch_hex = f_title
        f_swatch_role = f_title
        f_stat_label = f_title
        f_stat_val = f_title
        f_ui_btn = f_title
        f_meta_small = f_title

    # Main Card Container
    m = 60
    draw.rounded_rectangle([m, m, w - m, h - m], radius=24, fill=b["card_bg"], outline=b["border_color"], width=2)

    # Inner Margins
    im_x = m + 50
    im_y = m + 50

    # Header: Badge
    badge_text = f"  {b['badge']}  "
    badge_w = len(badge_text) * 9
    draw.rounded_rectangle([im_x, im_y, im_x + badge_w, im_y + 26], radius=13, fill=b["primary_color"])
    draw.text((im_x + 10, im_y + 5), b['badge'], font=f_badge, fill="#FFFFFF")

    # Header: Subtitle & Title
    draw.text((im_x, im_y + 36), b["subtitle"], font=f_subtitle, fill=b["text_secondary"])
    draw.text((im_x, im_y + 60), b["name"], font=f_title, fill=b["text_primary"])
    draw.text((im_x, im_y + 122), f"\"{b['tagline']}\"", font=f_tagline, fill=b["text_secondary"])

    # Header: Stats (Right side)
    stat_start_x = w - m - 520
    stat_y = im_y + 20
    for idx, stat in enumerate(b["stats"]):
        sx = stat_start_x + (idx * 165)
        draw.rounded_rectangle([sx, stat_y, sx + 155, stat_y + 75], radius=12, fill="#080D18", outline=b["border_color"], width=1)
        draw.text((sx + 14, stat_y + 12), stat[0], font=f_stat_label, fill=b["text_secondary"])
        draw.text((sx + 14, stat_y + 38), stat[1], font=f_stat_val, fill=b["text_primary"])

    # Divider 1
    div1_y = im_y + 180
    draw.line([(im_x, div1_y), (w - im_x, div1_y)], fill=b["border_color"], width=1)

    # Section 1: Color Palette
    sec1_y = div1_y + 25
    draw.text((im_x, sec1_y), "OFFICIAL MASTER COLOR PALETTE", font=f_sec_title, fill=b["text_primary"])
    draw.text((w - im_x - 220, sec1_y + 4), "Eyedropper Ready • Hex Verified", font=f_sec_meta, fill=b["text_secondary"])

    # 6 Color Swatches
    swatch_y = sec1_y + 45
    swatch_w = (w - (2 * im_x) - (5 * 20)) // 6
    swatch_h = 240

    for i, c in enumerate(b["colors"]):
        sx = im_x + (i * (swatch_w + 20))
        draw.rounded_rectangle([sx, swatch_y, sx + swatch_w, swatch_y + swatch_h], radius=16, fill="#080D18", outline=b["border_color"], width=1)
        
        # Color Box
        pad = 14
        draw.rounded_rectangle([sx + pad, swatch_y + pad, sx + swatch_w - pad, swatch_y + pad + 110], radius=10, fill=c["hex"], outline="#FFFFFF33", width=1)
        
        # Swatch Info
        info_y = swatch_y + pad + 122
        draw.text((sx + pad, info_y), c["name"], font=f_swatch_name, fill=b["text_primary"])
        draw.text((sx + pad, info_y + 26), c["hex"], font=f_swatch_hex, fill=b["primary_color"])
        draw.text((sx + pad, info_y + 52), c["role"], font=f_swatch_role, fill=b["text_secondary"])

    # Divider 2
    div2_y = swatch_y + swatch_h + 35
    draw.line([(im_x, div2_y), (w - im_x, div2_y)], fill=b["border_color"], width=1)

    # Lower Grid (Typography & UI Design Tokens)
    lower_y = div2_y + 25
    col_w = (w - (2 * im_x) - 24) // 2
    col_h = 230

    # Left Box: Typography
    box1_x = im_x
    draw.rounded_rectangle([box1_x, lower_y, box1_x + col_w, lower_y + col_h], radius=16, fill="#080D18", outline=b["border_color"], width=1)
    draw.text((box1_x + 24, lower_y + 20), "TYPOGRAPHY HIERARCHY", font=f_sec_title, fill=b["text_primary"])

    draw.text((box1_x + 24, lower_y + 65), "Heading Display Aa 700", font=f_sec_title, fill=b["text_primary"])
    draw.text((box1_x + col_w - 280, lower_y + 70), b["fonts"]["display"], font=f_sec_meta, fill=b["text_secondary"])

    draw.text((box1_x + 24, lower_y + 115), "Paragraph & Body Text Specimen", font=f_tagline, fill=b["text_secondary"])
    draw.text((box1_x + col_w - 280, lower_y + 118), b["fonts"]["body"], font=f_sec_meta, fill=b["text_secondary"])

    draw.text((box1_x + 24, lower_y + 165), "$ 1,450.00 • 24/7 TRACKING • ACTIVE", font=f_swatch_hex, fill=b["primary_color"])
    draw.text((box1_x + col_w - 280, lower_y + 168), b["fonts"]["code"], font=f_sec_meta, fill=b["text_secondary"])

    # Right Box: UI Design Tokens & Buttons
    box2_x = im_x + col_w + 24
    draw.rounded_rectangle([box2_x, lower_y, box2_x + col_w, lower_y + col_h], radius=16, fill="#080D18", outline=b["border_color"], width=1)
    draw.text((box2_x + 24, lower_y + 20), "DESIGN TOKENS & UI CONTROLS", font=f_sec_title, fill=b["text_primary"])

    # Primary Button
    btn1_x = box2_x + 24
    btn1_y = lower_y + 65
    draw.rounded_rectangle([btn1_x, btn1_y, btn1_x + 190, btn1_y + 50], radius=10, fill=b["primary_color"])
    draw.text((btn1_x + 28, btn1_y + 15), "PRIMARY ACTION", font=f_ui_btn, fill="#FFFFFF")

    # Secondary Outline Button
    btn2_x = btn1_x + 210
    draw.rounded_rectangle([btn2_x, btn1_y, btn2_x + 190, btn1_y + 50], radius=10, fill=None, outline=b["border_color"], width=2)
    draw.text((btn2_x + 30, btn1_y + 15), "SECONDARY", font=f_ui_btn, fill=b["text_primary"])

    # Live Badge
    badge2_x = btn2_x + 210
    draw.rounded_rectangle([badge2_x, btn1_y + 8, badge2_x + 130, btn1_y + 42], radius=17, fill="#10B98122", outline="#10B981", width=1)
    draw.text((badge2_x + 18, btn1_y + 16), "★ VERIFIED", font=f_badge, fill="#10B981")

    # Bottom Token Info
    info_tokens = "Border Radius: 10px / 16px • 8pt Grid Architecture • Shining Technologies Creative Suite"
    draw.text((box2_x + 24, lower_y + 180), info_tokens, font=f_meta_small, fill=b["text_secondary"])

    return img

def main():
    print("=== Generating High-Fidelity Brand Identity Boards ===")
    for b in BRANDS:
        out_dir = b["target_dir"]
        out_dir.mkdir(parents=True, exist_ok=True)

        # 1. HTML Board
        html_path = out_dir / "brand_identity_board.html"
        html_content = render_html_board(b)
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"[{b['key']}] Saved HTML board -> {html_path.name}")

        # 2. Retina PNG Board
        png_path = out_dir / "brand_identity_board.png"
        img = render_png_board(b)
        img.save(png_path, "PNG", quality=95)
        print(f"[{b['key']}] Rendered 1920x1080 PNG board -> {png_path.name} ({round(os.path.getsize(png_path) / 1024, 1)} KB)")

    print("\nALL 4 BRAND IDENTITY BOARDS & HIGH-RES PNGS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
