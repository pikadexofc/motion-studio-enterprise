---
name: visual-quality-assurance
description: Automated snapshot frame inspection, blank frame detection, contrast validation, visual clipping checks, and perceptual quality scoring.
---

# Visual Quality Assurance (VQA)

## Activation
Activate after every render or snapshot generation to inspect visual fidelity, detect defects, and ensure standards before declaring completion.

## Automated Inspection Metrics
1. **Mean Luminance & Variance**:
   $$\mu = \frac{1}{N}\sum_{i=1}^N L_i, \quad \sigma = \sqrt{\frac{1}{N}\sum_{i=1}^N (L_i - \mu)^2}$$
   - If $\sigma < 3.0$: Flagged as **BLANK_FRAME_ERROR** (solid black, white, or unrendered canvas).
2. **Color Diversity**: Measure count of distinct RGB clusters. Low diversity ($< 16$ colors in complex scenes) indicates missing assets or unrendered shaders.
3. **Bounding Box Clipping**: Elements must maintain a minimum 40px safe buffer from viewport perimeter unless designated full-bleed backgrounds.
4. **Contrast Ratio**: Text luminosity vs background luminosity must satisfy WCAG AA ($\ge 3:1$ for headers).

## Diagnostic Report Format
```json
{
  "frame": "01s.png",
  "status": "PASS",
  "luminanceMean": 24.3,
  "luminanceStdDev": 18.7,
  "colorDiversity": 1240,
  "flags": []
}
```
