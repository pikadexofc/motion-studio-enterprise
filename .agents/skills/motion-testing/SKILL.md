---
name: motion-testing
description: Test harnesses for frame determinism, pixel diffing with pixelmatch, render regression tests, and media format validation.
---

# Motion Testing & Regression

## Activation
Activate when writing or running automated tests in `tests/` verifying determinism, duration, fps, and frame accuracy.

## Standard Test Suite
1. **Determinism Test**:
   - Render frame $F$ twice independently.
   - Run `pixelmatch(bufA, bufB, diffBuf)`.
   - Assert `diffPixels === 0`.
2. **Container & Codec Test**:
   - Run `ffprobe` on rendered MP4.
   - Assert `codec_name === 'h264'`.
   - Assert `width === 1920 && height === 1080`.
   - Assert `Math.abs(actualDuration - targetDuration) < 0.1`.
3. **Asset Completeness**:
   - Capture `console.error` and `pageerror` events during headless load; fail if 404 or font fallback detected.
