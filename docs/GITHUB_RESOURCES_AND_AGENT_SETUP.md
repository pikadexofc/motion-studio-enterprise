# Autonomous SaaS Motion Graphics Agent: GitHub Resources & Installation Guide

This document contains the complete software engineering manifest, open-source GitHub repository index, dependency installation instructions, and universal brand onboarding schema required for an autonomous AI agent to produce elite SaaS motion graphics for any company.

---

## 1. Curated GitHub Repository & Open-Source Tooling Catalog

An autonomous motion graphics agent requires specialized open-source tools across animation, 3D graphics, vector manipulation, video encoding, and computer vision validation.

### A. Core Animation, Kinematics & Motion Engines
| Tool / Repository | Official GitHub Link | Purpose & Architectural Fit |
| :--- | :--- | :--- |
| **GSAP (GreenSock)** | [greensock/GSAP](https://github.com/greensock/GSAP) | Production standard for deterministic timeline control, SVG path animation, staggered reveals, and high-order cubic-bezier interpolation. |
| **Motion One / Framer Motion Core** | [motiondivision/motion](https://github.com/motiondivision/motion) | Lightweight WAAPI-accelerated animation engine with calibrated spring physics (`stiffness`, `damping`, `mass`). |
| **Lottie Web** | [airbnb/lottie-web](https://github.com/airbnb/lottie-web) | Frame-accurate vector animation playback from Bodymovin / After Effects exports. |
| **Simplex Noise** | [jwagner/simplex-noise.js](https://github.com/jwagner/simplex-noise.js) | Seeded, deterministic procedural noise for organic gradient mesh oscillations and particle motion. |

### B. 3D Graphics, WebGL & Shader Pipelines
| Tool / Repository | Official GitHub Link | Purpose & Architectural Fit |
| :--- | :--- | :--- |
| **Three.js** | [mrdoob/three.js](https://github.com/mrdoob/three.js) | Complete WebGL runtime for 3D isometric product stages, procedural glass materials, orbital cameras, and studio lighting rigs. |
| **Canvas Confetti** | [catdad/canvas-confetti](https://github.com/catdad/canvas-confetti) | High-performance Canvas particle physics for celebration bursts and milestone reveals. |
| **Three-Custom-Shader-Material** | [FarazzShaikh/THREE-CustomShaderMaterial](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial) | Extends standard Three.js materials with custom GLSL vertex and fragment noise shaders. |

### C. Headless Video Composition & Frame Capture
| Tool / Repository | Official GitHub Link | Purpose & Architectural Fit |
| :--- | :--- | :--- |
| **Remotion** | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | Programmatic React-based video composition framework with native frame stepping. |
| **HyperFrames** | [hyperframes/hyperframes](https://github.com/hyperframes/hyperframes) | Multi-runtime declarative HTML/WebGL video composition and deterministic virtual-time rendering engine. |
| **Puppeteer Core** | [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) | Direct Chrome DevTools Protocol automation for deterministic virtual-time stepping and uncompressed buffer screenshotting. |
| **FFmpeg** | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) | Industrial video transcoding pipe (image2pipe to H.264 / AVC, YUV420p, variable bitrates, audio muxing). |

### D. Vector Iconography, Typography & Visual Assets
| Tool / Repository | Official GitHub Link | Purpose & Architectural Fit |
| :--- | :--- | :--- |
| **Lucide Icons** | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) | Modern, clean vector line icons with customizable stroke weights (1.25px–1.5px), replacing amateur emojis. |
| **Phosphor Icons** | [phosphor-icons/core](https://github.com/phosphor-icons/core) | Precision geometric icons with thin, light, and duotone weights. |
| **Fontsource** | [fontsource/fontsource](https://github.com/fontsource/fontsource) | Self-hosted, deterministic Open Source Google fonts (Inter, Plus Jakarta Sans, Montserrat, JetBrains Mono, Syne). |

### E. Computer Vision, Pixel Diffing & Automated Validation
| Tool / Repository | Official GitHub Link | Purpose & Architectural Fit |
| :--- | :--- | :--- |
| **Pixelmatch** | [mapbox/pixelmatch](https://github.com/mapbox/pixelmatch) | Ultra-fast pixel-level difference comparison engine for frame determinism and seek validation. |
| **Pillow (PIL Fork)** | [python-pillow/Pillow](https://github.com/python-pillow/Pillow) | Python imaging library for luminance calculation, quadrant analysis, and brand color palette dominance verification. |
| **Sharp** | [lovell/sharp](https://github.com/lovell/sharp) | High-speed Node.js image processing library for frame resizing, convolution matrix filtering, and perceptual hashing. |

---

## 2. Complete Environment Installation & Setup Commands

To equip an autonomous AI agent with the required toolchain on any clean machine (Windows, Linux, or macOS), execute the following commands:

### Step 1: Clone or Initialize Workspace
```bash
git clone <your-repo-url> motion-studio
cd motion-studio
```

### Step 2: Install Node.js Dependencies (v20+ or v24+)
```bash
# Core animation, rendering, and validation dependencies
pnpm install gsap three puppeteer-core lucide canvas-confetti simplex-noise pixelmatch pngjs sharp
```

Or using standard `npm`:
```bash
npm install gsap three puppeteer-core lucide canvas-confetti simplex-noise pixelmatch pngjs sharp --save-exact
```

### Step 3: Install Python Dependencies (Python 3.10+)
```bash
pip install pillow numpy opencv-python-headless
```

### Step 4: Verify System Tooling (Chrome & FFmpeg)
The agent must verify that Google Chrome and FFmpeg are present in the system path or known paths:
```bash
# Check FFmpeg
ffmpeg -version

# Check Google Chrome (Windows)
"C:\Program Files\Google\Chrome\Application\chrome.exe" --version

# Check Google Chrome (Linux / macOS)
google-chrome --version || chromium --version
```

---

## 3. Universal Company Brand Onboarding Specification

Any AI agent interacting with a client or brand must execute this standardized intake questionnaire to extract the essential design tokens, assets, and messaging before generating any scene manifests.

### The Brand Intake Questionnaire
1. **Company Name & Sector**: (e.g., "ApexCloud — Enterprise AI Observability Platform")
2. **Brand Positioning & USP**: (e.g., "Real-time AI telemetry with zero overhead and sub-millisecond anomaly detection")
3. **Target Video Format & Aspect Ratio**:
   - `16:9 Widescreen` (1920×1080) — Product Launch, Landing Page Hero, YouTube
   - `9:16 Vertical Portrait` (1080×1920) — TikTok, Instagram Reels, YouTube Shorts
   - `1:1 Square` (1080×1080) — LinkedIn, X (Twitter) Feed Ads
4. **Primary Brand Palette**:
   - Primary Accent: Hex color (e.g., `#6366F1`)
   - Secondary / Background Tint: Hex color (e.g., `#0F172A`)
   - Contrast Light: Hex color (e.g., `#38BDF8` or `#10B981`)
5. **Brand Typography**:
   - Headline Font: (e.g., `Plus Jakarta Sans`, `Montserrat`, `Syne`)
   - Body & Micro-Copy: (e.g., `Inter`, `Geist`)
   - Telemetry & Data Font: (e.g., `JetBrains Mono`)
6. **Key Ground Truth Contacts / Proof Points**:
   - Website URL, phone number, compliance certification (SOC2, ISO27001), customer rating (4.9/5).
7. **Asset Links / Files**:
   - Vector Logo (SVG preferred, or transparent high-res PNG).
   - Product UI screenshots or vector wireframes.

---

## 4. Standardized JSON Brand Intake Contract (`BrandIntake.json`)

The agent serializes the client's answers into a strict, validated schema:

```json
{
  "$schema": "https://motion-studio.internal/schemas/brand-intake.v1.json",
  "company": {
    "name": "ApexCloud",
    "sector": "B2B SaaS / Developer Tools",
    "tagline": "Autonomous Infrastructure Intelligence"
  },
  "format": {
    "aspectRatio": "9:16",
    "width": 1080,
    "height": 1920,
    "fps": 60,
    "duration": 20.0
  },
  "narrative": {
    "hook": "Your cloud bill jumped $40k overnight. Do you know why?",
    "problem": "Legacy monitoring alerts 30 minutes after the crash.",
    "solution": "ApexCloud AI isolates memory leaks and API latency in 12ms flat.",
    "cta": "Start your free 14-day enterprise trial. Visit apexcloud.io."
  },
  "palette": {
    "primary": "#6366F1",
    "secondary": "#0A0E17",
    "accent": "#06B6D4",
    "surface": "rgba(15, 23, 42, 0.90)",
    "surfaceBorder": "rgba(99, 102, 241, 0.40)",
    "textPrimary": "#FFFFFF",
    "textSecondary": "#94A3B8"
  },
  "typography": {
    "headlineFont": "Plus Jakarta Sans",
    "bodyFont": "Inter",
    "monoFont": "JetBrains Mono"
  },
  "groundTruth": {
    "website": "www.apexcloud.io",
    "phone": "1800 273 925",
    "badge": "SOC2 TYPE II CERTIFIED",
    "proofMetric": "99.999% SLA UPTIME"
  },
  "assets": {
    "logo": "assets/brands/apexcloud/logo.svg",
    "uiMockup": "assets/brands/apexcloud/dashboard_mockup.png"
  }
}
```

---

## 5. Automated Harvesting of Open-Source Inspiration & Assets

An autonomous agent can programmatically discover and pull open-source components, SVG badges, and visual inspiration using headless tools or API lookups:
1. **GitHub Code Search**:
   - Query for Tailwind / GSAP components: `path:components "cubic-bezier" "backdrop-blur" "bento"`.
   - Query for Three.js shaders: `filename:*.glsl "simplex" OR "perlin" OR "fbm"`.
2. **Lucide & Radix SVG Retrieval**:
   - Extract raw SVGs directly from `@lucide/lab` or Lucide's public CDN:
     `https://unpkg.com/lucide-static@latest/icons/<icon-name>.svg`
3. **Google Fonts Self-Hosting**:
   - Download font WOFF2 files directly via Fontsource to ensure local deterministic rendering without external network latency during headless renders.
