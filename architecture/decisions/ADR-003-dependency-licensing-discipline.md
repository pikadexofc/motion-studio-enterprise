# ADR-003: Dependency Licensing Discipline & Commercial SaaS Compliance

## Status
Accepted (Phase 1 Baseline)

## Context
Building a commercial SaaS platform requires strict vigilance regarding software licenses. Incorporating copyleft licenses (e.g., GPL-3.0, AGPL-3.0) into core production code can legally compromise proprietary SaaS intellectual property. Furthermore, libraries with restrictive commercial terms (e.g., non-commercial or per-user redistribution fees) must be carefully audited and isolated behind clean interfaces.

## Decision
1. **Permissive Licenses Preferred**: Primary dependencies must carry permissive open-source licenses:
   - `hyperframes`: Apache-2.0 (Cleared for SaaS composition and rendering)
   - `three`: MIT (Cleared for WebGL 3D rendering)
   - `puppeteer-core`: Apache-2.0 (Cleared for browser automation)
   - `pixelmatch` / `pngjs`: MIT (Cleared for automated visual QA)
2. **GSAP Isolation & Abstraction**: GSAP core is licensed under the GreenSock Standard 'No Charge' license. For internal server-side rendering and local agent execution, this license is valid. To eliminate long-term commercial risk for third-party white-label redistribution, all 2D motion calls must go through a clean adapter (`MotionTimeline`) so that permissive open-source runtimes (Web Animations API, Anime.js MIT, or Motion One MIT) can be swapped in without modifying scene manifests.
3. **FFmpeg Process Boundary**: FFmpeg is invoked strictly as an external command-line executable via standard pipes (`stdin`/`stdout`), maintaining a process isolation boundary.
4. **Exact Version Pinning**: All dependencies in `package.json` must be pinned to exact semantic versions (no `^`, `~`, or `*`).

## Consequences
### Positive
- Zero risk of viral copyleft license contamination.
- Full commercial SaaS audit readiness.
- Future-proof modularity for 2D animation engines.

### Negative / Tradeoffs
- Requires maintaining an abstraction layer around animation libraries.
- Requires explicit verification of transitive dependency licenses during upgrades.
