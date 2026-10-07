#!/usr/bin/env python3
"""
Brand Kit Extractor for Shining Technologies & Subsidiaries.
Generates brand_tokens.json, brand_summary.md, and copies logos into 01 Brand Kit.
"""

import os
import json
import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

BRAND_PROFILES = {
    "unn": {
        "company_name": "UNN Movers and Logistics",
        "folder": BASE_DIR / "Shining Technologies" / "04 Companies" / "01 UNN Movers and Logistics" / "01 Brand Kit",
        "assets_source": BASE_DIR / "Shining Technologies" / "04 Companies" / "01 UNN Movers and Logistics" / "05 Web Assets",
        "tokens": {
            "brand_name": "UNN Movers and Logistics",
            "industry": "Interstate Removals & Freight Logistics (Australia)",
            "colors": {
                "primary": "#1E3A8A",       # Deep Interstate Navy
                "secondary": "#F59E0B",     # Amber Hazard / Hi-Vis Gold
                "neutral_dark": "#111827",  # Charcoal Asphalt
                "neutral_light": "#F9FAFB", # Clean Off-White
                "accent": "#10B981"         # Green Route Verified
            },
            "typography": {
                "headings": "Poppins / Montserrat (Bold 700)",
                "body": "Inter / Open Sans (Regular 400)",
                "numbers_display": "Manrope / Oswald"
            },
            "logo_files": ["logo.8848c4f83c63.webp"],
            "tagline": "Reliable Interstate Moving Across Australia",
            "key_services": [
                "Interstate Highway Removals",
                "Commercial & Office Moving",
                "Vehicle Transport",
                "Heavy Cargo Strapping & Telematics"
            ]
        }
    },
    "shining_services": {
        "company_name": "Shining Services",
        "folder": BASE_DIR / "Shining Technologies" / "04 Companies" / "02 Shining Services" / "01 Brand Kit",
        "assets_source": BASE_DIR / "Shining Technologies" / "04 Companies" / "02 Shining Services" / "05 Web Assets" / "WEB",
        "tokens": {
            "brand_name": "Shining Services",
            "industry": "Residential & Commercial Cleaning (Brisbane & Melbourne)",
            "colors": {
                "primary": "#0D9488",       # Fresh Aquamarine / Teal
                "secondary": "#0284C7",     # Crisp Clean Blue
                "neutral_dark": "#1F2937",  # Slate Ink
                "neutral_light": "#F0FDF4", # Pristine Mint / White
                "accent": "#FBBF24"         # Sparkle Gold
            },
            "typography": {
                "headings": "Plus Jakarta Sans / Poppins (Bold 700)",
                "body": "Inter (Regular 400)",
                "meta_labels": "Manrope (SemiBold 600)"
            },
            "logo_files": ["logo-nav.webp"],
            "tagline": "Trusted House & Commercial Cleaners in Brisbane and Melbourne",
            "key_services": [
                "End of Lease / Bond Cleaning",
                "Deep Carpet Steam Cleaning",
                "Upholstery & Mattress Sanitization",
                "Tile & Grout Pressure Cleaning",
                "Oven & Kitchen Deep Degreasing"
            ]
        }
    },
    "darwin": {
        "company_name": "Darwin Tree Removal",
        "folder": BASE_DIR / "Shining Technologies" / "04 Companies" / "03 Darwin Tree Removal" / "01 Brand Kit",
        "assets_source": BASE_DIR / "Shining Technologies" / "04 Companies" / "03 Darwin Tree Removal" / "05 Web Assets" / "hero_banners",
        "tokens": {
            "brand_name": "Darwin Tree Removal NT",
            "industry": "Arboriculture & Tree Management Services (Northern Territory)",
            "colors": {
                "primary": "#122820",       # Forest Green Timber
                "secondary": "#D96F2A",     # Terracotta / Amber Safety Gear
                "accent": "#F0924E",        # Amber Light Glow
                "neutral_light": "#F6F1E7", # Parchment Lawn Cream
                "neutral_dark": "#1C3D2E"   # Deep Canopy Green
            },
            "typography": {
                "headings": "Poppins (Bold 700 / SemiBold 600)",
                "body": "Inter (Regular 400 / Medium 500)",
                "captions": "Inter (600 Condensed)"
            },
            "logo_files": [],
            "tagline": "Expert Tree Removal, Lopping & Emergency Clearing in Darwin NT",
            "key_services": [
                "Dangerous Tree Lopping & Felling",
                "Cyclone Season Hazard Preparation",
                "Stump Grinding & Root Extraction",
                "Mulching & Green Waste Disposal"
            ]
        }
    },
    "shining_technologies": {
        "company_name": "Shining Technologies",
        "folder": BASE_DIR / "Shining Technologies" / "01 Brand Kit",
        "assets_source": BASE_DIR / "Shining Technologies" / "02 Company Profile & Decks",
        "tokens": {
            "brand_name": "Shining Technologies",
            "industry": "Mother Company & AI Creative Agency (Software, Growth, Video & Web)",
            "colors": {
                "primary": "#0F172A",       # Midnight Slate
                "secondary": "#6366F1",     # Cyber Indigo
                "accent": "#10B981",        # Emerald Growth
                "neutral_dark": "#020617",  # Deep Obsidian
                "neutral_light": "#F8FAFC"  # High-Contrast Pure White
            },
            "typography": {
                "headings": "Space Grotesk / Syne / Poppins",
                "body": "Inter / JetBrains Mono (Technical)",
                "code": "JetBrains Mono"
            },
            "logo_files": [],
            "tagline": "Leading AI, Software, Creative Design & Business Expansion Systems",
            "key_services": [
                "Creative Direction & Design Asset Production",
                "AI Video Automation & Motion Ad Engineering",
                "Custom Full-Stack Web Development",
                "Multi-Brand Holding Growth Management"
            ]
        }
    }
}

def generate_markdown_summary(profile_key: str, data: dict) -> str:
    tokens = data["tokens"]
    colors_table = "\n".join([f"| **{k.replace('_', ' ').title()}** | `{v}` | <span style='display:inline-block;width:24px;height:12px;background-color:{v};border-radius:2px;'></span> |" for k, v in tokens["colors"].items()])
    services_list = "\n".join([f"- {s}" for s in tokens["key_services"]])
    
    return f"""# Brand Kit Summary: {tokens['brand_name']}

**Industry / Domain:** {tokens['industry']}  
**Core Slogan / Tagline:** *\"{tokens['tagline']}\"*

---

## 🎨 Official Color Palette
| Token | Hex Code | Swatch |
|---|---|---|
{colors_table}

---

## ✍️ Typography Guide
- **Headings & Display:** {tokens['typography'].get('headings', 'N/A')}
- **Body & Paragraphs:** {tokens['typography'].get('body', 'N/A')}
- **Special / Numbers:** {tokens['typography'].get('numbers_display', tokens['typography'].get('captions', 'Inter'))}

---

## 🚀 Key Brand Services (for Ad Copy & Video Reels)
{services_list}

---
*Generated automatically by Shining Technologies Creative Workspace Engine.*
"""

def sync_brand(profile_key: str):
    data = BRAND_PROFILES[profile_key]
    out_dir = data["folder"]
    out_dir.mkdir(parents=True, exist_ok=True)
    
    # 1. Write brand_tokens.json
    tokens_file = out_dir / "brand_tokens.json"
    with open(tokens_file, "w", encoding="utf-8") as f:
        json.dump(data["tokens"], f, indent=2)
    print(f"[{profile_key}] Saved brand tokens -> {tokens_file.name}")
    
    # 2. Write brand_summary.md
    summary_file = out_dir / "brand_summary.md"
    summary_md = generate_markdown_summary(profile_key, data)
    with open(summary_file, "w", encoding="utf-8") as f:
        f.write(summary_md)
    print(f"[{profile_key}] Saved brand summary -> {summary_file.name}")
    
    # 3. Copy/normalize logo files if available
    logos_dir = out_dir / "logos"
    logos_dir.mkdir(exist_ok=True)
    source_dir = data.get("assets_source")
    if source_dir and source_dir.exists():
        for logo_name in data["tokens"].get("logo_files", []):
            src_file = source_dir / logo_name
            if src_file.exists():
                dst_file = logos_dir / logo_name
                shutil.copy2(src_file, dst_file)
                print(f"[{profile_key}] Copied logo {logo_name} -> logos/")

def main():
    print("=== Shining Technologies: Automated Brand Kit Sync ===")
    for key in BRAND_PROFILES:
        sync_brand(key)
    print("All brand kits successfully synced and ready for design use!")

if __name__ == "__main__":
    main()
