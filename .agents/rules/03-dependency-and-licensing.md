# Rule 03: Dependency & Licensing Standards

**Scope**: Package management, library adoption, external scripts, and code reuse.

## 1. Commercial SaaS Clearance
Before adding any package or code:
- Verify its license allows commercial, proprietary, closed-source SaaS execution.
- Acceptable: `MIT`, `Apache-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `ISC`.
- Unacceptable without explicit waiver: `GPL-2.0`, `GPL-3.0`, `AGPL-3.0`, `CC-BY-NC`, `Server Side Public License (SSPL)`.
- Document all dependency additions in `architecture/decisions/` ADRs.

## 2. Pinned Versions Mandatory
- Never use `latest`, `*`, `^`, or `~` in `package.json`.
- Always specify the exact semantic version (e.g., `"three": "0.186.0"`).
- Lockfiles (`pnpm-lock.yaml`) must be checked in and verified.

## 3. Minimal Runtime Footprint
- Never add a dependency for a task that can be solved with $\le 50$ lines of clean, native TypeScript/JavaScript (e.g., simple vector math, easing functions, PRNG).
- Prefer native browser Web APIs and standard standards over specialized npm wrappers.
