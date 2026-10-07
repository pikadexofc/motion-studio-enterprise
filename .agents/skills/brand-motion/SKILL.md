---
name: brand-motion
description: Brand design systems, design tokens, logo reveals, color harmonies, and motion brand guidelines.
---

# Brand Motion Engineering

## Activation
Activate when parameterizing brand assets, logos, color palettes, and motion guidelines.

## Token Invariants
Brand systems must be declared through structured tokens:
```json
{
  "brand": {
    "name": "Acme Cloud",
    "palette": {
      "bg": "#0a0c12",
      "primary": "#4f46e5",
      "accent": "#06b6d4",
      "text": "#f8fafc",
      "muted": "#94a3b8"
    },
    "pacing": "crisp-energetic", // crisp-energetic | elegant-luxury | authoritative-corporate
    "logo": {
      "path": "assets/brand/logo.svg",
      "aspectRatio": "3:1"
    }
  }
}
```

## Logo Reveal Grammar
- **Geometric / Tech Brands**: Line drawing (`strokeDashoffset`), followed by solid fill wipe and subtle specular highlight sweep.
- **Consumer / Playful Brands**: Elastic scale overshoot (`scale: 0 -> 1.08 -> 1.0`) with color pill expansion.
- **Enterprise SaaS**: Clean alpha cross-fade paired with subtle lateral spatial translation ($x: -20\text{px} \rightarrow 0$).
