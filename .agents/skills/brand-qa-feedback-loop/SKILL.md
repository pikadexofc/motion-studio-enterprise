---
name: brand-qa-feedback-loop
description: Multi-stage automated QA verification gate for Shining Technologies brands (UNN Movers, Darwin Tree Removal), enforcing canonical fleet assets, brand palette dominance, ground truth data, and hard failure conditions (HF01-HF11).
---

# Brand QA Feedback Loop System

## Overview
The **Brand QA Feedback Loop System** is an automated quality assurance engine that prevents hallucinations, brand mismatches, generic AI imagery, incorrect contact information, and non-compliant social media aspect ratios. It enforces strict compliance with the **Mother Agentic Master System (v1.0.0)** across all subsidiaries.

## When to Activate
Activate this skill whenever:
- Generating or reviewing any ad static, poster, banner, or social media graphic.
- Designing or editing video reel frames, b-roll footage, or motion storyboards.
- Reviewing third-party or generated images featuring company fleet vehicles, uniforms, or branding.
- Exporting any asset for production or client sign-off.

### Mandatory Generative Prompt Rules
When generating *any* image, you MUST append these exact tags to guarantee fidelity:
`"Photorealistic, cinematic lighting, volumetric sunshine, global illumination, ray-traced reflections, hyper-detailed, 8k resolution, glowing ambient occlusion, physical materials."`
Never rely on default flat rendering.

---

## The 5 Verification Gates

### Gate 1: Canonical Asset & Fleet Binding (HF01, HF02)
- **UNN Movers & Logistics**:
  - Mandatory binding to `LOCKED_CANONICAL_UNN_TRUCK.jpg` (Hino 300 Series, cab-over, Australian plate `W8B 25`, UNN Orange `#FF7200`).
  - **HARD FAILURE (HF02)**: Reject any generic white truck, American long-nose cab, CGI render, or missing side livery (`DRIVER & TRUCK HIRE FROM $30`, `1300 556 778`).
- **Darwin Tree Removal NT**:
  - Bound to `darwin_tree_removal_logo.png`, authentic arboriculture equipment (woodchippers, Vermeer stump grinders, chainsaw rigging). No generic forestry clipart.

### Gate 2: Dimensions & Social Media Aspect Ratios (HF10)
All assets must strictly conform to target delivery dimensions:
- **Vertical Story / Reel / Ad**: `9:16` (1080×1920 or 768×1376)
- **Feed Static / Carousel**: `1:1` (1080×1080) or `4:5` (1080×1350)
- **Brand Board / Deck / Slide**: `16:9` (1920×1080)

### Gate 3: Authentic Brand Color Dominance (HF01)
Vectorized RGB / HSV histogram analysis verifies that brand colors meet minimum physical pixel presence ($\ge 2.0\%$):
- **UNN Movers**: Primary `#FF7200` (UNN Electric Orange), Navy `#0F2557`, Charcoal `#1C2529`.
- **Darwin Tree Removal**: Forest Green `#122820`, Terracotta `#D96F2A`, Parchment `#F6F1E7`.

### Gate 4: Ground Truth Data & Anti-Hallucination Copy (HF03, HF05)
Verify all contact numbers, addresses, and geographic territories against registered ground truth:
- **UNN Sydney (Interstate)**: `1300 556 778` | `bookings@unnmovers.com.au`
- **UNN Darwin**: `1300 130 144`
- **Darwin Tree Removal**: `0487 565 033` | `5 Radford Ct, Coconut Grove NT 0810`
- **HARD FAILURE (HF03)**: Any hallucinated 1-800 number, generic US state reference, or fictional email triggers immediate rejection.

### Gate 5: Hard Failure Conditions Audit (HF01–HF11)
- `HF01`: Wrong or distorted brand logo.
- `HF02`: Wrong truck identity/livery when reference is locked.
- `HF03`: Invented phone, address, email, or legal data.
- `HF04`: Fabricated testimonials or unverified certifications.
- `HF05`: Incorrect geographic coverage or service claim.
- `HF06`: Modifying locked headline copy or approved value proposition.
- `HF07`: Altering locked compositional layout structure.
- `HF08`: Contradicting official high-vis or uniform branding.
- `HF09`: Over-branding plain packing boxes.
- `HF10`: Violating delivery dimensions or aspect ratio.
- `HF11`: Physically impossible vehicle geometry or broken anatomy.

---

## Execution Protocol

### Step 1: Run Automated Verification
Execute the automated gate script against the target file:
```bash
python tools/qa_feedback_loop.py "<path-to-image>"
```
Or audit all assets across subsidiaries:
```bash
python tools/qa_feedback_loop.py --all
```

### Step 2: Inspect Generated `_qa_report.json`
Every verified image generates an adjacent JSON report:
```json
{
  "target_image": "creative_01.jpg",
  "company": "UNN",
  "status": "PASS",
  "hard_failures_detected": [],
  "gates": {
    "gate_1_canonical_asset": { "status": "PASS" },
    "gate_2_dimensions": { "status": "PASS" },
    "gate_3_brand_color": { "status": "PASS" },
    "gate_4_ground_truth": { "status": "PASS" }
  }
}
```

### Step 3: Enforcement Action
- If `status == PASS`: Asset is cleared for release and logged in `05_deliverables_registry.md`.
- If `status == FAIL`: Asset is quarantined with a `.rejected` flag, and regeneration is triggered with locked canonical references.
