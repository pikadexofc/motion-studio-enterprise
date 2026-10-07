# Motion Studio Enterprise 🎬

> **Autonomous AI-Driven SaaS Motion Graphics Production Engine**  
> Converts natural language company briefs into agency-tier, 100% deterministic, high-tech motion graphics with an autonomous **95% Professional Quality Gatekeeper Loop**.

---

## Architecture & Specialized Agent Fleet

Motion Studio decouples creative planning, design systems, visual runtimes, and automated quality assurance into independent, autonomous agents:

```mermaid
flowchart TD
    A["Raw Company Brief & Guidelines<br/>(Logo, Hex Colors, Copy, USP)"] --> B["Agent 1: BrandIngestionAgent"]
    B --> C["Generate Structured Motion Scene Manifest<br/>(2.5D Stage, Easing, Tokens, HUDs)"]
    C --> D["Scene Graph Compiler<br/>(GSAP / Three.js / SVG / WebGL)"]
    D --> E["Headless Capture & Frame Extraction<br/>(Milestone Keyframes @ 60 FPS)"]
    E --> F["Agent 2: MotionValidationAgent<br/>(The 95% Quality Gatekeeper)"]
    
    F -->|Quality Score < 95%| G["Generate Actionable Deficiency Matrix<br/>(Defects, Contrast, Timing, Easing)"]
    G --> H["Agent 3: MotionRevisionAgent<br/>(Surgical Parameter & Layout Patching)"]
    H --> D
    
    F -->|Quality Score >= 95%| I["Production Sign-Off & MP4 Master Render<br/>(H.264 / 1080x1920 or 1920x1080 / 60 FPS)"]
    I --> J["Deliverable Package & Deployment"]
```

### 1. `BrandIngestionAgent` (Understanding & Processing)
- Ingests company brand assets (vector logos, primary/secondary palettes, typography scales, USP copy, proof points).
- Infers industry visual archetypes (`Ethereal_Glass` for AI/DevTools, `Precision_Steel` for FinTech/Enterprise, `Modern_Warm` for Consumer/Logistics).
- Replaces amateur emojis with crisp, high-DPI inline vector SVG line glyphs.
- Synthesizes design tokens and outputs an immutable `MotionSceneManifest`.

### 2. `MotionValidationAgent` (The 95% Quality Gatekeeper)
- Audits output against **8 professional SaaS motion design pillars**:
  1. **Spatial Staging & Double-Bezel Hierarchy** (15%): Doppelrand nested hardware frames, concentric corner radii.
  2. **Kinematics & Easing Smoothness** (15%): High-order `cubic-bezier(0.16, 1, 0.3, 1)` or calibrated spring physics. Zero linear easing.
  3. **Chromatic Atmosphere & Dark-Mode Mesh** (15%): Multi-point radial gradient meshes over OLED black, 8-bit film grain anti-banding.
  4. **Typographic Hierarchy & Stagger Mechanics** (15%): Masked split-text reveals, negative tracking contraction, monospace tabular numbers.
  5. **Iconography & Asset High-DPI Fidelity** (10%): Strict ban on unicode emojis; high-DPI vector glyphs only.
  6. **High-Tech SaaS Motifs** (10%): 2.5D perspective tilt, telemetry HUD pills, laser border traces.
  7. **Frame Determinism & Virtual Time Stepping** (10%): 100% zero-pixel-drift under forward and backward seek cycles.
  8. **Brand Identity & Ground-Truth Lockdown** (10%): Verified contact records, authentic primary color dominance.
- **The 95% Hard Gate**: If the aggregate score is below $95.0\%$, the composition is rejected and routed to the Revision Agent with a structured **Deficiency Matrix**.

### 3. `MotionRevisionAgent` (Iterative Enhancements)
- Programmatically consumes the Deficiency Matrix.
- Executes surgical patches on easing curves, spatial coordinates, gradient meshes, SVG glyphs, and typography timing.
- Loops back to the Validation Agent until the $\ge 95\%$ benchmark is surpassed.

---

## Documentation & Design Bibles

- 📖 **[SaaS Motion Design Bible & Fault Analysis](docs/SAAS_MOTION_DESIGN_ANALYSIS.md)**: Deep dive into the 12 Immutable Laws of high-end SaaS motion graphics, mathematical easing curves, and fault post-mortems.
- 🛠️ **[GitHub Resources & AI Agent Setup Guide](docs/GITHUB_RESOURCES_AND_AGENT_SETUP.md)**: Open-source repository catalog, installation scripts, and universal brand onboarding schema.
- 📐 **[System Architecture](architecture/SYSTEM_ARCHITECTURE.md)**: Capability-based multi-runtime composition engine.

---

## Quick Start & CLI Usage

### 1. Install Dependencies
```bash
pnpm install
# Or: npm install
```

### 2. Run the Autonomous Multi-Agent Production Loop
To run the autonomous workflow on any company brand intake file:
```bash
node tools/autonomous_workflow.js --brand examples/brands/apexcloud-ai.json --output examples/compiled/apexcloud-ai-launch --threshold 95.0
```

### 3. Run the Comprehensive Test Suite
```bash
# Runs all 7 test suites: determinism, render pipeline, visual QA, reels, reel determinism, multi-agent workflow, and production pipeline
npm test

# Run the dedicated motion production pipeline tests
npm run test:pipeline
```

### 4. Interactive Live Preview Studio (Zero-Render Scrubber)
```bash
# Launches the local 60 FPS player with timeline scrubber, audio sync, and speed controls
npm run preview
# Open http://localhost:3333 in your browser
```

### 5. High-Speed Parallel Video Rendering
```bash
# Renders 300 frames concurrently across multi-core Chrome workers (~75s turnaround)
npm run render:parallel
```

### 6. Autonomous 95% Quality Critic Agent
```bash
# Audits scene against 100-point rubric (density, living UI truth, typography, optical depth, SFX sync)
npm run critic
```

### 7. Export to OpenCut Multi-Track Video Editor
```bash
# Exports project to OpenCut-compatible JSON (main video, overlays, multi-track audio)
npm run export:opencut
```

---

## Production Pipeline Tools & Capabilities

| Script / Tool | Command | Description |
| :--- | :--- | :--- |
| **`scripts/render_parallel.js`** | `npm run render:parallel` | Multi-core parallel chunk renderer delivering 5x speedup over sequential capture. |
| **`scripts/preview_studio.js`** | `npm run preview` | Instant 60 FPS player with sub-frame scrubbing, frame stepping (`[` and `]`), and Web Audio sync. |
| **`scripts/critic_agent.js`** | `npm run critic` | Autonomous 95% motion critic evaluating hook density, living UI truth, optics, and SFX timing. |
| **`scripts/export_opencut.js`** | `npm run export:opencut` | Interoperability exporter for [OpenCut](https://github.com/opencut-app/opencut) NLE project timelines. |
| **`scripts/verify_first_frame.js`** | `node scripts/verify_first_frame.js` | Enforces the "Law of First Frame Perfection" (presentation-grade static layout at $t=0.0\text{s}$). |
| **`scripts/generate_voiceover.js`** | `node scripts/generate_voiceover.js` | ElevenLabs text-to-speech integration with curated voice personas (Liam, Brian, Emily). |
| **`scripts/sound_designer.js`** | `node scripts/sound_designer.js` | Master audio mixer compiling micro-timed SFX cues and ducked background music via FFmpeg. |
| **`scripts/image_asset_manager.js`** | `node scripts/image_asset_manager.js` | Dual-Tier AI image generation pipeline (Native + Browser Gemini/ChatGPT) with Master 4K Cinematic Vibe Prompt. |

---

## Directory Layout

```
motion-studio/
├── docs/
│   ├── SAAS_MOTION_DESIGN_ANALYSIS.md   # SaaS Motion Design Bible & Fault Analysis
│   └── GITHUB_RESOURCES_AND_AGENT_SETUP.md # Open-source repo catalog & agent guide
├── src/
│   ├── agents/
│   │   ├── BrandIngestionAgent.js        # Brand onboarding & token synthesizer
│   │   ├── MotionValidationAgent.js      # 95% Quality Gatekeeper
│   │   ├── MotionRevisionAgent.js        # Surgical defect resolver
│   │   └── Orchestrator.js               # Autonomous loop controller
│   ├── schema/
│   │   ├── BrandIntakeSchema.js          # Brand questionnaire schema validator
│   │   └── validator.js                  # Scene manifest validator
│   ├── compiler/
│   │   └── compiler.js                   # Dual-target scene graph compiler
│   └── engine/
│       ├── renderer.js                   # Headless Chrome + FFmpeg pipe
│       └── inspector.js                  # Computer vision snapshot inspector
├── scripts/
│   ├── render_parallel.js                # High-speed multi-worker parallel renderer
│   ├── preview_studio.js                 # Live 60fps web player with scrubber & audio
│   ├── critic_agent.js                   # 95% Quality Critic Agent
│   ├── export_opencut.js                 # OpenCut multi-track project exporter
│   ├── verify_first_frame.js             # First-frame static HTML quality gate
│   ├── generate_voiceover.js             # ElevenLabs voiceover generation service
│   ├── sound_designer.js                 # SFX cue sheet compiler & audio mixer
│   └── image_asset_manager.js            # Dual-tier image generator & vibe prompt templates
├── examples/
│   ├── compiled/
│   │   └── focusflow-brag-launch/        # Living software launch video (FocusFlow)
│   └── brands/
│       └── apexcloud-ai.json             # Example high-tech SaaS company intake
└── tests/
    ├── motion-production-pipeline.test.js# Full pipeline integration tests
    ├── autonomous-workflow.test.js       # Multi-agent loop & 95% gate unit tests
    └── determinism.test.js               # Frame determinism verification
```
