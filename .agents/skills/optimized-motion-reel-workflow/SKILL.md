---
name: optimized-motion-reel-workflow
description: End-to-end production workflow for premium SaaS motion reels. Enforces First-Frame Static HTML perfection, Pinterest/Dribbble visual research, restrained purposeful animation, ElevenLabs voiceover integration, and frame-accurate sound design.
---

# Optimized Motion Reel Production Workflow

## Operational Philosophy
A SaaS motion reel is not a slideshow, nor is it raw visual noise. High-end motion design—as practiced by Apple, Linear, Raycast, Stripe, Cron, and Framer—relies on **restraint, tactile physics, living software in action, and acoustic synchronization**.

This protocol defines the end-to-end production pipeline spanning 5 core disciplines:
1. **Creative Director**: Narrative arc, emotional velocity, reference curation, and pacing.
2. **Frontend Visual Designer**: First-frame static HTML perfection, typography scale, depth, and glassmorphism.
3. **Senior Motion Designer**: Restrained physics, cubic-bezier curves, cursor choreography, and kinetic typography.
4. **Sound Designer**: ElevenLabs voiceover synthesis, 120-128 BPM soundtrack selection, and micro-timed SFX.
5. **AI Production Director**: Multi-axis QA verification, 95% threshold gatekeeping, and automated rendering.

---

## The 6-Stage Production Pipeline

```mermaid
flowchart TD
    A["Stage 1: Context & Visual Inspiration Research<br>(Pinterest, Dribbble Bento, Linear References)"] --> B["Stage 2: First-Frame Static HTML Mandate<br>(Presentation-Ready Composition at t=0s)"]
    B --> C["Stage 3: Research & Ideation Refinement<br>(Verify First-Frame Metric Audit)"]
    C --> D["Stage 4: Restrained & Intentional Motion<br>(Animate the Existing Composition)"]
    D --> E["Stage 5: ElevenLabs Voiceover & SFX Audio<br>(Frame-Accurate SFX + Music Ducking)"]
    E --> F["Stage 6: Multi-Axis QA & Delivery<br>(95% Quality Threshold Verification)"]
```

---

## Stage 1: Context & Visual Inspiration Research
Before writing any code or composition:
1. **Deconstruct the Product**:
   - Extract the core user promise (e.g. FocusFlow: "Eliminate cloud friction and distraction").
   - Identify the single hero action (e.g. typing a task, clicking start, completing an item).
   - Identify the payoff metric (e.g. +150 XP, zero cloud latency, instantaneous save).
2. **Visual Inspiration Mining**:
   - **Pinterest & Dribbble Bento Grids**: Asymmetrical tile balance, 2x2 hero card with 1x1 accessory badges, unified corner radii (16px–24px), 1px gradient borders (`rgba(255,255,255,0.12)`).
   - **Dark Mode Elevation Palette**:
     - Void Background: `#05070B` or `#090D16`
     - Card Surface: `#0E131F` with `backdrop-filter: blur(20px)`
     - Accent Energy: High-voltage orange (`#FF6B00`), Emerald (`#10B981`), or Electric Blue (`#3B82F6`)
   - **Typography Foundations**:
     - Display: Inter Tight, Space Grotesk, Plus Jakarta Sans (tracking -0.03em, line-height 1.05)
     - Data/Mono: JetBrains Mono, Fira Code (all caps, letter-spacing 0.08em)
     - Hierarchy Contrast: Minimum 5x scale between micro-labels (10px–12px) and hero headlines (64px–80px).

---

## Stage 2: First-Frame Static HTML Composition Mandate
> **THE LAW OF FIRST FRAME PERFECTION**:
> Never author animation on an empty canvas. Every scene MUST exist first as a complete, static, presentation-grade HTML graphic design at `t = 0.0s`. If you screenshot frame 0 and place it in a design portfolio, it must look finished and award-worthy.

### Execution Standards for Frame 0:
1. **Canvas Specifications**:
   - Resolution: 1080×1920 (9:16 vertical reels) or 1920×1080 (16:9 widescreen).
   - Viewport scaling: Locked at 1.0 device scale factor with zero responsive squishing.
2. **Layering & Depth Stack**:
   - *Layer 0 (Background)*: Radial glow gradient centered behind focal elements (`radial-gradient(circle at 50% 40%, rgba(255,107,0,0.15) 0%, transparent 70%)`).
   - *Layer 1 (Subtle Grid/Gridlines)*: Utilitarian dot grid or millimeter crosshairs at 5% opacity.
   - *Layer 2 (Environment/Context)*: App window chrome, traffic light dots, status bar.
   - *Layer 3 (Hero Product Surface)*: 2.5D perspective tilt (`perspective: 1400px; transform: rotateX(8deg) rotateY(-4deg)`), deep contact drop shadow (`box-shadow: 0 40px 80px -15px rgba(0,0,0,0.7)`).
   - *Layer 4 (Interactive Cursor & Badges)*: SVG pointer, floating toasts, XP pills.
3. **Automated Audit**:
   - Run `node scripts/verify_first_frame.js <scene.html>` to verify font contrast, glassmorphic card count, and surface elevation before proceeding to animation.

---

## Stage 3: Research & Ideation Refinement
Before moving to motion, compare the captured static frame against references:
- **Second-Read Details**: Are there micro-details that reward close inspection? (e.g., keyboard shortcuts `⌘K`, latency badges `< 1ms`, live status dots `● LOCAL CACHE ACTIVE`).
- **Contrast & Legibility**: Does the eye immediately snap to the hero focal point within 200ms?
- **Restraint Check**: Eliminate unnecessary cards or badges that do not serve the story.

---

## Stage 4: Restrained & Intentional Motion Choreography
> **THE LAW OF IN-PLACE ANIMATION**:
> Animate the existing composition. Never dismantle or swap out the DOM elements that made frame 0 beautiful.

### Motion Design Rules:
1. **Cubic-Bezier Acceleration**:
   - Discard linear and generic ease-in-out curves.
   - Standard Entry: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy acceleration, soft settling).
   - Micro-Haptics: `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight elastic overshoot for buttons and badges).
2. **Cursor Choreography**:
   - Realistic deceleration: Mouse moves faster over distance and glides to a stop at the target button.
   - Physical click feedback: Button dips `transform: scale(0.95)`, cursor scales `scale(0.88)` for 120ms, radial haptic ripple emits from click origin.
3. **Kinetic Typography**:
   - Staggered line/word reveals wrapped in `overflow: hidden`.
   - Never fade text from 0% opacity alone; slide from `translateY(110%)` to `0%` with crisp easing.
4. **Camera & Parallax**:
   - Gentle continuous Z-axis push-in (`scale: 1.0` to `1.04` over 3.0s) to keep visual energy alive without causing motion sickness.

---

## Stage 5: ElevenLabs Voiceover & Master Audio Engineering
Audio is 50% of the perceived production value. Silent or poorly mixed video feels amateur regardless of animation quality.

### 1. ElevenLabs Voiceover Pipeline:
- Script authoring: Punchy, active voice. 15–20 words per 5 seconds maximum.
- Voice selection:
  - `LIAM` (`TX3LPaxmHKxFdv7VOQHJ`): High-energy, crisp SaaS product launches.
  - `BRIAN` (`nPczCjzI2devNBz1zWvd`): Authoritative, deep cinematic enterprise trailers.
  - `EMILY` (`LcfcDJNUP1GQjkzn1xUU`): Modern, articulate product walkthroughs.
- Script synthesis via `scripts/generate_voiceover.js`.

### 2. Sound Design & SFX Cue Synchronization:
- Background music: 120–128 BPM electronic or lo-fi groove.
- Ducking envelope: Attenuate background music volume by -6dB during voiceover playback.
- SFX Cue Sheet (`SoundDesigner`):
  - Every UI click must trigger a crisp interface tick (`click_002.ogg`).
  - Every destructive purge must trigger a resonant glass/metal impact (`impactGlass_medium_000.ogg`).
  - Every keystroke burst must trigger mechanical switch clacks (`keypress-001.wav`).
  - Every task completion must trigger a haptic snap (`switch_001.ogg`) + harmonic chime (`drop_001.ogg`).
  - Compile master audio with `scripts/sound_designer.js`.

---

## Stage 6: Multi-Axis Visual & Audio QA Gate
Before delivering any video, the production pipeline enforces a strict 95% quality verification:

| Checkpoint | Requirement | Pass Condition |
| :--- | :--- | :--- |
| **First Frame Quality** | Presentation-ready HTML layout | Passed `verify_first_frame.js` with typography ratio ≥ 4.0x |
| **Living Software** | Zero static slides | Product shown in active use with cursor and real state change |
| **Animation Smoothness** | 30 FPS / 60 FPS deterministic capture | Zero frame stutter or dropped ticks |
| **Audio Sync** | Visual action to SFX delta | SFX cue aligned within ±33ms (1 frame) of visual trigger |
| **Audio Mix** | Loudness and clarity | Music ducked beneath voiceover; zero clipping or distortion |
| **Visual QA** | Color variance & luminance | All milestone frames pass `VisualInspector` (no black frames) |

---

## Tooling Reference

```bash
# 1. Audit static first-frame composition
node scripts/verify_first_frame.js <scene.html>

# 2. Synthesize ElevenLabs voiceover
node -e "import('./scripts/generate_voiceover.js').then(m => m.generateVoiceover({ text: '...', outputPath: 'assets/vo.mp3' }))"

# 3. Compile master sound design (music + SFX + VO)
node -e "import('./scripts/sound_designer.js').then(m => new m.SoundDesigner().buildMasterTrack(cueSheet, 'assets/master.wav'))"

# 4. Render deterministic video
node scripts/render.js --scene <scene.html> --output render-tests/video.mp4 --fps 30 --duration 10.0 --width 1080 --height 1920

# 5. Mux audio and video
ffmpeg -y -i render-tests/video.mp4 -i assets/master.wav -c:v copy -c:a aac -b:a 192k -shortest final-reel.mp4
```
