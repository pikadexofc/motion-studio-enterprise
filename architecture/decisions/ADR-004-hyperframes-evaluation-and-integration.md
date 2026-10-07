# ADR-004: HyperFrames Empirical Evaluation & Architectural Integration Strategy

## Status
Accepted (Phase 2 Baseline)

## Context
In Phase 1, Motion Studio built a lightweight, zero-dependency laboratory renderer using `puppeteer-core` connected directly to the host's existing Chrome binary and streaming frame screenshots into an FFmpeg stdin pipe. In Phase 2, we conducted empirical tests on the official HyperFrames framework (`hyperframes v0.8.40`) to determine how responsibilities should be partitioned between Motion Studio and HyperFrames.

## Empirical Comparison Matrix

| Evaluation Dimension | HyperFrames CLI (`v0.8.40`) | Motion Studio Native Renderer (`v0.1.0`) |
| :--- | :--- | :--- |
| **Capture Architecture** | `drawElementImage` API (GPU DOM paint records) | `Page.captureScreenshot` (CDP viewport capture) |
| **Render Performance** | **19.3s** for 300 frames @ 30fps ($\sim 15.5\text{ fps}$ throughput) | **32.0s** for 180 frames @ 60fps ($\sim 5.6\text{ fps}$ throughput) |
| **Asset Inlining & Fonts** | Auto-inlines Google Fonts and CDN scripts | Requires local offline bundled assets |
| **Windows OS Portability** | Required downloading internal Chromium due to `--version` timeout on Windows CLI | Directly runs host Chrome (`152.0.7977.83`) without extra downloads |
| **3D WebGL Synchronization** | Designed primarily for DOM/GSAP; WebGL requires custom hooks | Synchronous dual-hook `window.renderFrame(t, f)` for Three.js + GSAP |
| **Composition Contract** | Declarative custom attributes (`data-start`, `data-duration`, `data-track-index`, `window.__timelines`) | Global synchronous frame hook (`window.renderFrame(t, f)`) |
| **Tooling & Linter** | Rich suite: `hyperframes lint`, `check`, `inspect`, `doctor`, `snapshot` | Focused test runners (`tests/determinism.test.js`, `tests/visual-qa.test.js`) |
| **Agent Authorability** | Standard HTML/CSS with custom attributes | Declarative JSON manifests compiled to HTML |

## Decision
1. **Motion Studio Owns the Semantic Layer**:
   - Creative intent, creative planning, design tokens, brand configurations, intermediate scene graph schema, component contracts, parameter generation, asset references, and quality policies remain 100% owned and defined by Motion Studio.
2. **Dual-Compatible Composition Output**:
   - The Motion Studio Scene Graph Compiler (`src/compiler/compiler.js`) generates HTML compositions that satisfy **both** execution paradigms:
     - HyperFrames custom attributes: `data-composition-id`, `data-start`, `data-duration`, `data-track-index`, and `window.__timelines['main']`.
     - Universal deterministic seek hook: `window.renderFrame(timeInSeconds, frameIndex)` coordinating GSAP timelines and Three.js render calls.
3. **Execution Routing**:
   - For fast DOM/GSAP renders and CI linting, HyperFrames CLI (`hyperframes render`, `hyperframes lint`) can be invoked directly.
   - For tightly synchronized 3D WebGL scenes and offline regression test suites, Motion Studio's native renderer (`scripts/render.js`) is retained as the authoritative zero-dependency laboratory backend.

## Consequences
### Positive
- Zero framework lock-in: scenes can be rendered by HyperFrames or by native headless Chrome.
- Combines the 3x capture speed of HyperFrames `drawElementImage` with the robust WebGL synchronization of Motion Studio.
- Complete separation of creative semantics from low-level execution details.

### Negative / Tradeoffs
- Compositions must emit both attribute sets and dual seek hooks.
- Requires maintaining two execution paths in documentation.
