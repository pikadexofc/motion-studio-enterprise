#!/usr/bin/env python3
"""
Designer Asset Pack Generator
Creates:
1. Transparent PNG Logos (Full Logo, App Icon Mark, Dark/Light variants)
2. Transparent PNG Call-To-Action (CTA) Buttons (Phone, Website, Quote)
3. Premium 3D-styled Squircle App Icons (512x512 PNG with transparency)
4. Social Reel Lower-Third Contact Strips & Trust Badges
"""

import os
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = Path(__file__).resolve().parent.parent

FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REGULAR = "C:/Windows/Fonts/segoeui.ttf"
FONT_MONO = "C:/Windows/Fonts/consola.ttf"

BRAND_CONFIGS = [
    {
        "key": "unn_movers",
        "name": "UNN Movers and Logistics",
        "short_name": "UNN MOVERS",
        "phone": "1300 000 UNN",
        "phone_display": "1300 556 778",
        "website": "www.unnmovers.com.au",
        "cta_text": "BOOK INTERSTATE MOVE",
        "quote_text": "GET INSTANT QUOTE",
        "trust_badge": "100% INSURED & STRAPPED",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "01 UNN Movers and Logistics",
        "primary": (255, 114, 0, 255),    # Hazard Amber
        "secondary": (28, 37, 41, 255),   # Interstate Navy
        "accent": (37, 99, 235, 255),      # Route Blue
        "text_on_primary": (28, 37, 41, 255),
        "text_on_secondary": (255, 255, 255, 255),
        "existing_logo": BASE_DIR / "Shining Technologies" / "04 Companies" / "01 UNN Movers and Logistics" / "01 Brand Kit" / "logos" / "logo.webp"
    },
    {
        "key": "shining_services",
        "name": "Shining Services",
        "short_name": "SHINING SERVICES",
        "phone": "1300 744 646",
        "phone_display": "1300 SHINING",
        "website": "www.shiningservices.com.au",
        "cta_text": "BOOK CLEANING ONLINE",
        "quote_text": "INSTANT BOND QUOTE",
        "trust_badge": "100% BOND BACK GUARANTEE",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "02 Shining Services",
        "primary": (13, 148, 136, 255),   # Aquamarine
        "secondary": (15, 46, 43, 255),   # Deep Marine
        "accent": (6, 182, 212, 255),     # Cyan
        "text_on_primary": (255, 255, 255, 255),
        "text_on_secondary": (240, 253, 244, 255),
        "existing_logo": BASE_DIR / "Shining Technologies" / "04 Companies" / "02 Shining Services" / "01 Brand Kit" / "logos" / "logo-nav.webp"
    },
    {
        "key": "darwin_tree",
        "name": "Darwin Tree Removal NT",
        "short_name": "DARWIN TREE REMOVAL",
        "phone": "0487 565 033",
        "phone_display": "0487 565 033",
        "website": "darwintreeremovalnt.com.au",
        "cta_text": "24/7 EMERGENCY DISPATCH",
        "quote_text": "GET FREE TREE QUOTE",
        "trust_badge": "CYCLONE SEASON PREPARATION",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "03 Darwin Tree Removal",
        "primary": (217, 111, 42, 255),   # Terracotta Earth
        "secondary": (18, 40, 32, 255),   # Forest Timber
        "accent": (240, 146, 78, 255),    # Amber Warning
        "text_on_primary": (255, 255, 255, 255),
        "text_on_secondary": (246, 241, 231, 255),
        "existing_logo": None
    },
    {
        "key": "shining_technologies",
        "name": "Shining Technologies",
        "short_name": "SHINING TECH",
        "phone": "+61 400 000 000",
        "phone_display": "+61 400 000 000",
        "website": "shiningtechnologies.com",
        "cta_text": "START DIGITAL EXPANSION",
        "quote_text": "SCHEDULE STRATEGY CALL",
        "trust_badge": "AI & CREATIVE ENGINEERING",
        "target_dir": BASE_DIR / "Shining Technologies",
        "primary": (99, 102, 241, 255),   # Cyber Indigo
        "secondary": (15, 23, 42, 255),   # Midnight Slate
        "accent": (16, 185, 129, 255),    # Emerald Pulse
        "text_on_primary": (255, 255, 255, 255),
        "text_on_secondary": (248, 250, 252, 255),
        "existing_logo": None
    }
]

def load_font(font_path, size):
    try:
        return ImageFont.truetype(font_path, size)
    except Exception:
        return ImageFont.load_default()

def draw_gradient_rounded_rect(draw, bbox, radius, color1, color2):
    # Simple top-down subtle gradient
    x0, y0, x1, y1 = bbox
    w = x1 - x0
    h = y1 - y0
    for y in range(h):
        factor = y / max(h - 1, 1)
        r = int(color1[0] * (1 - factor) + color2[0] * factor)
        g = int(color1[1] * (1 - factor) + color2[1] * factor)
        b = int(color1[2] * (1 - factor) + color2[2] * factor)
        a = int(color1[3] * (1 - factor) + color2[3] * factor) if len(color1) > 3 else 255
        # draw horizontal scanline inside bounds
        # For rounded corners we do a mask approach or simple inset
        pass

def create_cta_button(text, subtext, bg_color, text_color, icon_glyph="→", width=640, height=130):
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Shadow layer
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([10, 15, width - 10, height - 5], radius=24, fill=(0, 0, 0, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    img.paste(shadow, (0, 0), shadow)

    # Button Base
    draw.rounded_rectangle([8, 8, width - 8, height - 12], radius=22, fill=bg_color, outline=(255, 255, 255, 70), width=2)

    # Subtle glossy top highlight
    highlight = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(highlight)
    h_draw.rounded_rectangle([10, 10, width - 10, (height // 2) - 4], radius=20, fill=(255, 255, 255, 40))
    img.paste(highlight, (0, 0), highlight)

    # Text & Glyph
    f_main = load_font(FONT_BOLD, 26)
    f_sub = load_font(FONT_REGULAR, 15)
    f_icon = load_font(FONT_BOLD, 28)

    # Icon Pill Left
    icon_box_w = 64
    icon_box_h = 64
    icon_x = 24
    icon_y = (height - 12 - icon_box_h) // 2 + 4
    draw.rounded_rectangle([icon_x, icon_y, icon_x + icon_box_w, icon_y + icon_box_h], radius=16, fill=(255, 255, 255, 50))
    draw.text((icon_x + 20, icon_y + 14), icon_glyph, font=f_icon, fill=text_color)

    # Text Block
    text_x = icon_x + icon_box_w + 20
    draw.text((text_x, icon_y + 8), text, font=f_main, fill=text_color)
    draw.text((text_x, icon_y + 40), subtext, font=f_sub, fill=(text_color[0], text_color[1], text_color[2], 210))

    return img

def create_premium_app_icon(glyph_type, brand_cfg, size=512):
    """Generates an iOS/macOS styled squircle premium 3D icon."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 32
    r = 110  # Squircle radius

    # Deep Drop Shadow
    shadow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([margin, margin + 20, size - margin, size - margin + 20], radius=r, fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    img.paste(shadow, (0, 0), shadow)

    # Base Background Gradient
    base_col = brand_cfg["secondary"]
    accent_col = brand_cfg["primary"]

    # Draw rounded rect base
    draw.rounded_rectangle([margin, margin, size - margin, size - margin], radius=r, fill=base_col, outline=(255, 255, 255, 60), width=4)

    # Inner Glow / Bevel
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.rounded_rectangle([margin + 12, margin + 12, size - margin - 12, (size // 2)], radius=r - 10, fill=(255, 255, 255, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(8))
    img.paste(glow, (0, 0), glow)

    # Draw Glyph in Center
    f_glyph = load_font(FONT_BOLD, 140)
    f_badge = load_font(FONT_BOLD, 26)

    glyphs = {
        "phone": "📞",
        "globe": "🌐",
        "location": "📍",
        "shield": "🛡️",
        "star": "⭐",
        "truck": "🚚",
        "sparkle": "✨",
        "tree": "🌲",
        "rocket": "⚡"
    }

    glyph_char = glyphs.get(glyph_type, "★")

    # Center circle for glyph
    cx, cy = size // 2, size // 2 - 15
    circ_r = 120
    draw.ellipse([cx - circ_r, cy - circ_r, cx + circ_r, cy + circ_r], fill=(accent_col[0], accent_col[1], accent_col[2], 220), outline=(255, 255, 255, 120), width=4)
    
    # Draw text icon
    draw.text((cx - 65, cy - 85), glyph_char, font=f_glyph, fill=(255, 255, 255, 255))

    # Bottom brand label on icon
    label = brand_cfg["short_name"]
    draw.text((size // 2 - (len(label) * 8), size - margin - 55), label, font=f_badge, fill=(255, 255, 255, 220))

    return img

def create_lower_third_overlay(brand_cfg, width=1080, height=220):
    """Reel / Video 9:16 ending lower-third contact overlay."""
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad_x = 40
    pad_y = 20

    # Background Pill
    bg = brand_cfg["secondary"]
    draw.rounded_rectangle([pad_x, pad_y, width - pad_x, height - pad_y], radius=28, fill=(bg[0], bg[1], bg[2], 240), outline=(brand_cfg["primary"][0], brand_cfg["primary"][1], brand_cfg["primary"][2], 180), width=3)

    # Accent Stripe Left
    draw.rounded_rectangle([pad_x + 8, pad_y + 8, pad_x + 22, height - pad_y - 8], radius=6, fill=brand_cfg["primary"])

    f_title = load_font(FONT_BOLD, 26)
    f_detail = load_font(FONT_BOLD, 22)
    f_badge = load_font(FONT_BOLD, 14)

    # Company & Badge
    content_x = pad_x + 40
    draw.text((content_x, pad_y + 24), brand_cfg["name"].upper(), font=f_title, fill=(255, 255, 255, 255))
    
    # Trust Pill
    badge_x = width - pad_x - 300
    draw.rounded_rectangle([badge_x, pad_y + 20, width - pad_x - 24, pad_y + 54], radius=17, fill=brand_cfg["primary"])
    draw.text((badge_x + 16, pad_y + 28), brand_cfg["trust_badge"], font=f_badge, fill=brand_cfg["text_on_primary"])

    # Divider
    draw.line([(content_x, pad_y + 75), (width - pad_x - 24, pad_y + 75)], fill=(255, 255, 255, 40), width=1)

    # Contact Info Columns
    draw.text((content_x, pad_y + 95), f"📞  {brand_cfg['phone_display']}", font=f_detail, fill=(255, 255, 255, 255))
    draw.text((content_x + 360, pad_y + 95), f"🌐  {brand_cfg['website']}", font=f_detail, fill=(brand_cfg["primary"][0], brand_cfg["primary"][1], brand_cfg["primary"][2], 255))

    return img

def create_brand_logo_mark(brand_cfg, size=512):
    """Generates a clean vector-styled brand logo mark."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 40
    r = 90
    draw.rounded_rectangle([margin, margin, size - margin, size - margin], radius=r, fill=brand_cfg["secondary"], outline=brand_cfg["primary"], width=6)

    # Core Monogram or Symbol
    f_logo = load_font(FONT_BOLD, 160)
    initials = "".join([w[0] for w in brand_cfg["short_name"].split()[:2]])
    
    # Centered Initials
    draw.text((size // 2 - 110, size // 2 - 120), initials, font=f_logo, fill=brand_cfg["primary"])

    f_sub = load_font(FONT_BOLD, 22)
    name = brand_cfg["short_name"]
    draw.text((size // 2 - (len(name) * 7), size - margin - 60), name, font=f_sub, fill=(255, 255, 255, 240))

    return img

def main():
    print("=== Shining Technologies: Building Designer Asset Pack ===")

    for b in BRAND_CONFIGS:
        # Directories
        brand_kit_dir = b["target_dir"] / "01 Brand Kit"
        logos_dir = brand_kit_dir / "logos"
        cta_dir = brand_kit_dir / "cta_buttons"
        icons_dir = brand_kit_dir / "premium_icons"
        overlays_dir = brand_kit_dir / "video_overlays"

        for d in [logos_dir, cta_dir, icons_dir, overlays_dir]:
            d.mkdir(parents=True, exist_ok=True)

        print(f"\n🎨 Generating assets for: {b['name']}")

        # 1. Logos
        # If WebP exists, convert to PNG
        if b.get("existing_logo") and b["existing_logo"].exists():
            try:
                webp_im = Image.open(b["existing_logo"]).convert("RGBA")
                png_path = logos_dir / "logo.png"
                webp_im.save(png_path, "PNG")
                print(f"  ✅ Converted logo.webp -> {png_path.name}")
            except Exception as e:
                print(f"  ⚠️ Error converting webp logo: {e}")

        # Generate Brand Mark Logo
        mark_img = create_brand_logo_mark(b, size=512)
        mark_path = logos_dir / "brand_logo_mark.png"
        mark_img.save(mark_path, "PNG")
        print(f"  ✅ Generated Brand Mark -> {mark_path.name}")

        # 2. CTA Buttons
        # Button A: Phone Call
        btn_phone = create_cta_button(
            text=f"Call Now: {b['phone_display']}",
            subtext="Available 24/7 • Fast Friendly Dispatch",
            bg_color=b["primary"],
            text_color=b["text_on_primary"],
            icon_glyph="📞"
        )
        btn_phone.save(cta_dir / "cta_button_phone.png", "PNG")

        # Button B: Website / Booking
        btn_web = create_cta_button(
            text=b["cta_text"],
            subtext=b["website"],
            bg_color=b["secondary"],
            text_color=b["text_on_secondary"],
            icon_glyph="🌐"
        )
        btn_web.save(cta_dir / "cta_button_website.png", "PNG")

        # Button C: Instant Quote Pill
        btn_quote = create_cta_button(
            text=b["quote_text"],
            subtext="Fast 60-Second Online Estimate",
            bg_color=b["accent"],
            text_color=(255, 255, 255, 255),
            icon_glyph="⚡"
        )
        btn_quote.save(cta_dir / "cta_button_quote.png", "PNG")
        print(f"  ✅ Generated 3 CTA Buttons -> cta_buttons/")

        # 3. Premium 3D-styled Squircle App Icons (512x512)
        icon_types = ["phone", "globe", "location", "shield", "star"]
        for it in icon_types:
            icon_img = create_premium_app_icon(it, b, size=512)
            icon_img.save(icons_dir / f"app_icon_{it}_3d.png", "PNG")
        print(f"  ✅ Generated 5 Premium 3D App Icons (512x512) -> premium_icons/")

        # 4. Reel Lower-Third Contact Strip (1080x220 transparent PNG)
        lt_img = create_lower_third_overlay(b, width=1080, height=220)
        lt_img.save(overlays_dir / "reel_contact_lower_third_1080p.png", "PNG")
        print(f"  ✅ Generated Reel Contact Overlay (1080p) -> video_overlays/")

    print("\nALL DESIGNER ASSET PACKS CREATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
