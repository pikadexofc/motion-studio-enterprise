#!/usr/bin/env python3
"""
Agentic Memory System Builder
Extracts and structures agentic memory banks for:
1. Shining Technologies (Mother Hub)
2. 01 UNN Movers and Logistics
3. 02 Shining Services
4. 03 Darwin Tree Removal NT
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

MEMORIES = {
    "unn": {
        "company": "01 UNN Movers and Logistics",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "01 UNN Movers and Logistics" / "00 Agentic Memory",
        "preferences": """# 01_USER_PREFERENCES — UNN MOVERS & LOGISTICS

## Core Creative Preferences (Likes)
- **Visual Aesthetic:** High-end, premium commercial visuals with generous negative space.
- **Storytelling:** Bento-grid layouts, realistic human scenes showing careful handling of cargo.
- **Brand Continuity:** Exact truck livery and UNN logo continuity across all scenes.
- **Brand Colors:** UNN Orange (`#FF7200`), Interstate Navy (`#0F2557`), Charcoal Dark (`#1C2529`).
- **Typography:** Montserrat (700 Bold / 800 ExtraBold).
- **Deliverable Formats:** Clean editable HTML presentations, A4 print-ready PDFs, separate 9:16 video reels.

## Creative Constraints & Negative Library (Dislikes)
- **Branding:** No wrong/distorted logo, no logo on every ordinary box, no invented vehicle signage.
- **People:** No duplicated faces, no identical workers across unrelated scenes.
- **Vehicles:** No CGI-looking trucks, no American long-nose cabs (Australian cab-over/pantech trucks only).
- **Copy:** No fake 5-star claims without attribution, no exaggerated transit times.

## Hard Failure Conditions (HF01–HF11)
- `HF01`: Wrong or distorted UNN logo.
- `HF02`: Wrong truck identity/livery when reference is locked.
- `HF03`: Invented phone, address, email, or legal data.
- `HF04`: Fabricated testimonials, reviews, or fake certifications.
- `HF05`: Incorrect geographic coverage or service claim.
- `HF06`: Modifying locked copy or headline text.
- `HF07`: Altering locked page or slide composition.
- `HF08`: Contradicting official uniform workwear branding.
- `HF09`: Over-branding plain packing boxes after explicit correction.
- `HF10`: Violating delivery dimensions or aspect ratios (1080x1920 for reels, 1920x1080 for slides).
- `HF11`: Physically impossible vehicle geometry or broken anatomy.
""",
        "identity": """# 02_BRAND_IDENTITY_AND_VOICE — UNN MOVERS & LOGISTICS

## Color Authority
- **UNN Orange (Working Accent):** `#FF7200`
- **Interstate Navy (Primary Base):** `#0F2557`
- **Charcoal Dark (Working Dark):** `#1C2529`
- **Route Verified Green (Status):** `#10B981`
- **Clean Ground White:** `#FFFFFF`

## Typography Law
- **Display & Headings:** Montserrat (Bold 700 / ExtraBold 800)
- **Body & Subtitles:** Inter / Open Sans (Regular 400 / Medium 500)
- **Numbers & Metrics:** Manrope / Oswald (Tabular figures)

## Tone of Voice
- **Practical, Confident, Reassuring, Australian English.**
- Focus on service + outcome + proof: *Careful handling, punctual interstate transit, transparent pricing.*
""",
        "facts": """# 03_GROUND_TRUTH_FACTS — UNN MOVERS & LOGISTICS

## Canonical Facts
- **Primary Operating Base:** Sydney / Parramatta, NSW.
- **Service Scope:** Australia-wide interstate freight & residential/commercial removals.
- **Verified Capabilities:** Modern pantech fleet, heavy cargo strapping, hydraulic tail-lifts, GPS telematics.
- **Key Routes:** Sydney ↔ Melbourne, Sydney ↔ Brisbane, East Coast corridors.

## Anti-Hallucination Policy
- Never invent local branch addresses, depot locations, or warehouse claims unless explicitly verified.
- Phone and email must use official verified channels or remain placeholder tokens during staging.
""",
        "updates": """# 04_PROJECT_UPDATES_AND_SPRINTS — UNN MOVERS & LOGISTICS

## Current State (September 2026)
- **Sprint Goal:** Consolidate brand kit, company profile vector releases, and approved Darwin location reels.
- **Completed:**
  - Standardized into flat 5-folder structure (`Brand Kit`, `Company Profile`, `Reels`, `Statics`, `Web Assets`).
  - Ingested governing `AGENTIC_MASTER_SYSTEM_v1.0.0.md`.
  - Harmonized brand boards with UNN Orange `#FF7200`.
  - Routed approved September reels (`unn darwin location reel 1 & 2`, `unn review reel`).
""",
        "deliverables": """# 05_DELIVERABLES_REGISTRY — UNN MOVERS & LOGISTICS

## Master Assets Catalog
- **Company Profile:** Vector iterations v27–v342 in `02 Company Profile/vector_profiles/`.
- **Approved Video Reels:**
  - `03 Reels/september_approved/unn darwin location reel 1 .mp4`
  - `03 Reels/september_approved/unn darwin location reel 2 .mp4`
  - `03 Reels/september_approved/unn review reel.mp4`
- **Slide Graphics:** `04 Statics/slide_assets/` (Slide 01 cover, Slide 05 interstate, Slide 11 3D network).
- **Web Package:** `05 Web Assets/web_deploy/` (Vercel deployment site).
- **Brand Identity Assets:**
  - `01 Brand Kit/brand_identity_board.png` (1920x1080)
  - `01 Brand Kit/logos/logo.png`
  - `01 Brand Kit/cta_buttons/` & `01 Brand Kit/premium_icons/`
"""
    },
    "shining_services": {
        "company": "02 Shining Services",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "02 Shining Services" / "00 Agentic Memory",
        "preferences": """# 01_USER_PREFERENCES — SHINING SERVICES

## Core Creative Preferences (Likes)
- **Emotional Result First:** Show the feeling of a clean home—relief, freshness, calm, and renewed space—before showing the machine.
- **Believable Realism:** Candid smartphone realism in contemporary Australian homes (Brisbane / Melbourne).
- **Workwear:** Dark forest-green service uniforms with clean posture and correct tools.
- **Layouts:** Minimal typography, generous negative space, maximum ~3–4 meaningful visual elements before copy.
- **Iconography:** Modern polished 3D app-style squircle icons.

## Creative Constraints & Negative Library (Dislikes)
- **No Collages:** Deliver separate individual files instead of multi-photo contact sheets.
- **No CGI / Over-Polished "AI Ads":** Avoid plastic skin smoothing, fake lens flares, or impossible HDR.
- **No Fabricated Dirt:** Never generate fake dramatic stains or fake before/after results.
- **No Hyper-Corporate Blue Gradients:** Stick to natural greens, warm neutrals, and crisp white.
""",
        "identity": """# 02_BRAND_IDENTITY_AND_VOICE — SHINING SERVICES

## Color System
- **Fresh Aquamarine (Primary Hygiene):** `#0D9488`
- **Crisp Cyan (Pure Water):** `#06B6D4`
- **Dark Forest / Service Green:** `#086028`
- **Pristine Mint:** `#F0FDF4`
- **Clean Contrast White:** `#FFFFFF`

## Typography
- **Display Headings:** Plus Jakarta Sans / Poppins (700 Bold)
- **Body & Paragraphs:** Inter (400 Regular / 500 Medium)
- **Eyebrow & Labels:** Manrope (Uppercase SemiBold 600)

## Messaging Formula
- Eyebrow (service name) → Emotional Headline → One Support Sentence → Compact CTA → Quiet Contact.
""",
        "facts": """# 03_GROUND_TRUTH_FACTS — SHINING SERVICES

## Operating Bases & Coverage
- **Markets:** Brisbane & Melbourne metropolitan regions.
- **Core Services:** End of lease bond cleaning, carpet steam extraction, upholstery sanitization, tile/grout pressure cleaning.
- **Guarantees:** 100% Bond Back Guarantee on approved exit cleans.

## Anti-Hallucination Policy
- Never invent pricing packages or unverified star ratings without source confirmation.
- Location-specific phone numbers must be verified before publishing.
""",
        "updates": """# 04_PROJECT_UPDATES_AND_SPRINTS — SHINING SERVICES

## Current State (September 2026)
- **Sprint Goal:** Unify web graphic assets, organize static social posts, and catalog before/after proof sets.
- **Completed:**
  - Flat 5-folder layout populated.
  - Ingested `AGENTIC_MASTER_SYSTEM_v1.0.0.md`.
  - Cataloged 996 web assets in `05 Web Assets/asset_catalog.json`.
  - Generated transparent PNG logos, CTA buttons, and 3D squircle icons.
""",
        "deliverables": """# 05_DELIVERABLES_REGISTRY — SHINING SERVICES

## Master Assets Catalog
- **Approved Reels:**
  - `03 Reels/september_approved/shining carpet reel 1.mp4`
  - `03 Reels/september_approved/shining carpet reel 2.mp4`
- **Social Statics:** `04 Statics/` (Upholstery cleaning, mattress sanitization, tile cleaning posts).
- **Web Media Library:** `05 Web Assets/WEB/` (Hero photography, before/after bathroom & oven sets).
- **Brand Identity Assets:**
  - `01 Brand Kit/brand_identity_board.png`
  - `01 Brand Kit/logos/logo.png`
  - `01 Brand Kit/cta_buttons/` & `01 Brand Kit/premium_icons/`
"""
    },
    "darwin_tree": {
        "company": "03 Darwin Tree Removal",
        "target_dir": BASE_DIR / "Shining Technologies" / "04 Companies" / "03 Darwin Tree Removal" / "00 Agentic Memory",
        "preferences": """# 01_USER_PREFERENCES — DARWIN TREE REMOVAL NT

## Core Creative Preferences (Likes)
- **Authentic Northern Territory Aesthetic:** Real tropical vegetation, red dirt/terracotta soil, intense Darwin wet/dry season light.
- **Professional Equipment Fidelity:** Exact arboricultural machinery—commercial woodchippers, Vermeer/Bandit stump grinders, knuckle booms/EWPs.
- **Worker Safety:** High-vis terracotta/orange shirts, helmets with face shields, chainsaw chaps, heavy leather gloves.
- **Tone:** Decisive, emergency-ready, calm authority, tough Australian craftsmanship.

## Creative Constraints & Negative Library (Dislikes)
- **No Generic Tree Loppers:** Avoid casual workers in t-shirts without safety PPE.
- **No Disaster-Theatre Visuals:** No apocalyptic exaggerated storm damage or fake CGI lightning.
- **No Tool Mutations:** Chainsaws, chipper chutes, and crane booms must obey mechanical physics.
- **No Altered Logos:** Never substitute generic tree vectors for the approved brand identity.
""",
        "identity": """# 02_BRAND_IDENTITY_AND_VOICE — DARWIN TREE REMOVAL NT

## Color System
- **Forest Timber (Primary Canopy):** `#122820`
- **Terracotta Earth (Primary Accent):** `#D96F2A`
- **Hazard Flare (Warning / Hi-Vis):** `#F0924E`
- **Eucalyptus Dark:** `#1C3D2E`
- **Parchment Cream (Natural Canvas):** `#F6F1E7`

## Typography
- **Display Headings:** Poppins / Montserrat (800 ExtraBold)
- **Body & Copy:** Inter (400 Regular / 500 Medium)

## Voice Law
- Direct, active, certified: *"24/7 Cyclone Preparation • Dangerous Tree Clearing • Fully Insured Arborists."*
""",
        "facts": """# 03_GROUND_TRUTH_FACTS — DARWIN TREE REMOVAL NT

## Territory Scope & Operations
- **Region:** Darwin, Palmerston & rural Northern Territory (Top End).
- **Specializations:** Cyclone season hazard mitigation, dangerous tree felling, emergency storm response, powerline clearance.
- **Equipment Fleet:** Commercial woodchippers, heavy stump grinders, cherry pickers (EWP), tipper trucks.
""",
        "updates": """# 04_PROJECT_UPDATES_AND_SPRINTS — DARWIN TREE REMOVAL NT

## Current State (September 2026)
- **Sprint Goal:** Finalize 9-static service campaign, integrate Kling AI video generation pipeline, and establish brand kit.
- **Completed:**
  - Ingested `AGENTIC_MASTER_SYSTEM_v1.0.0.md`.
  - Cataloged video generation prompt dossiers in `02 Company Profile/`.
  - Routed approved September reels (`darwin tree removal reel 1`, `2`, `3`).
""",
        "deliverables": """# 05_DELIVERABLES_REGISTRY — DARWIN TREE REMOVAL NT

## Master Assets Catalog
- **Approved Reels:**
  - `03 Reels/september_approved/darwin tree removal reel 1.mp4`
  - `03 Reels/september_approved/darwin tree removal 2 (1).mp4`
  - `03 Reels/september_approved/darwin tree removal 3.mp4`
- **Kling AI Video Engine:** `03 Reels/` (`automate_kling_web.js`, `kling_api_client.py`, `render_ending_card.js`).
- **Web & Banner Assets:** `05 Web Assets/hero_banners/`.
- **Brand Identity Assets:**
  - `01 Brand Kit/brand_identity_board.png`
  - `01 Brand Kit/cta_buttons/` & `01 Brand Kit/premium_icons/`
"""
    },
    "shining_tech": {
        "company": "Shining Technologies",
        "target_dir": BASE_DIR / "Shining Technologies" / "00 Agentic Memory",
        "preferences": """# 01_USER_PREFERENCES — SHINING TECHNOLOGIES (MOTHER COMPANY)

## Role & Mission
- **Holding Umbrella Entity:** Manages digital expansion, software development, creative media production, and AI systems across all operating subsidiaries.
- **Aesthetic:** Clean, dark-mode minimalist, cyber-indigo accents, razor-sharp typography.
- **Execution Standards:** Zero data loss, flat accessible folder structures, automated asset synchronization.
""",
        "identity": """# 02_BRAND_IDENTITY_AND_VOICE — SHINING TECHNOLOGIES

## Color System
- **Obsidian Core:** `#0B0F19`
- **Midnight Slate:** `#1E293B`
- **Cyber Indigo:** `#6366F1`
- **Emerald Pulse:** `#10B981`
- **Platinum White:** `#F8FAFC`

## Typography
- **Display:** Space Grotesk / Syne (700 Bold)
- **Body & Code:** Inter & JetBrains Mono
""",
        "facts": """# 03_GROUND_TRUTH_FACTS — SHINING TECHNOLOGIES

## Holding Portfolio
1. **UNN Movers and Logistics** (Interstate Logistics & Removals — Sydney base)
2. **Shining Services** (Residential & Commercial Cleaning — Brisbane/Melbourne)
3. **Darwin Tree Removal NT** (Arboriculture & Emergency Services — Darwin NT)

## Proprietary Products
- **WebP Extension (`copy-image-as-webp`):** Internal browser extension product with 4 versioned release packages.
""",
        "updates": """# 04_PROJECT_UPDATES_AND_SPRINTS — SHINING TECHNOLOGIES

## Current State (September 2026)
- Reorganized entire 5,903-file repository into a unified holding company hierarchy.
- Established flat 5-folder creative designer standard across all subsidiaries.
- Ingested 3 Mother Agentic Master System operating documents.
- Generated 4K/2K Brand Identity Boards, transparent PNG logos, glossy CTA buttons, and 3D app icons.
""",
        "deliverables": """# 05_DELIVERABLES_REGISTRY — SHINING TECHNOLOGIES

## Master Assets Catalog
- **Holding Registry:** `02 Company Profile & Decks/HOLDING_MASTER_REGISTRY.md`
- **Agency Proposals:** `02 Company Profile & Decks/Metanoia_Rays_Shining_Technologies_FINAL_Standalone_Proposal.html`
- **Internal Product:** `03 Internal Products/copy-image-as-webp/`
- **Automation Suite:** `tools/` (`designer_sync.py`, `generate_brand_boards.py`, `build_designer_asset_pack.py`).
"""
    }
}

def main():
    print("=== Shining Technologies: Generating Agentic Memory System ===")

    for key, data in MEMORIES.items():
        out_dir = data["target_dir"]
        out_dir.mkdir(parents=True, exist_ok=True)
        print(f"\n🧠 Building memory bank for: {data['company']}")

        files = [
            ("01_user_preferences.md", data["preferences"]),
            ("02_brand_identity_and_voice.md", data["identity"]),
            ("03_ground_truth_facts.md", data["facts"]),
            ("04_project_updates_and_sprints.md", data["updates"]),
            ("05_deliverables_registry.md", data["deliverables"])
        ]

        for fname, content in files:
            fpath = out_dir / fname
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content.strip() + "\n")
            print(f"  ✅ Saved -> {fname}")

    print("\nALL AGENTIC MEMORY BANKS BUILT AND INDEXED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
