---
name: motion-planning
description: Translates creative briefs into structured scene graphs, beats, and declarative animation timelines before code generation.
---

# Motion Planning

## Activation
Activate when receiving a user brief, product description, or script to formulate the motion plan before writing any code.

## The Planning Sequence
```
Brief Analysis -> Message Hierarchy -> Storyboard Beats -> Timing Allocation -> Layer Specification
```

1. **Brief Deconstruction**: Extract 3 core elements:
   - Primary statement (Headline)
   - Supporting evidence (Product card, metric, 3D artifact)
   - Resolution / Call-to-action (Brand mark, URL, button)
2. **Timing Budgeting**:
   - Total standard spot: 3.0s to 5.0s for social/micro-ads; 10s–15s for explainers.
   - Beat 1 (Hook / Entrance): 0.0s – 1.2s
   - Beat 2 (Hero Product / Message): 1.0s – 3.2s
   - Beat 3 (Resolution / CTA): 2.8s – 5.0s
3. **Layer Attribution**: Assign each element to its optimal runtime:
   - Kinetic text & UI badges -> 2D DOM / GSAP
   - Hero hardware / geometric stage -> 3D Three.js
   - Noise / visual filters -> Canvas / Shader

## Example Plan Structure
```json
{
  "totalDuration": 4.0,
  "beats": [
    { "id": "hook", "start": 0.0, "duration": 1.2, "focus": "headline" },
    { "id": "showcase", "start": 1.0, "duration": 2.2, "focus": "3d-product" },
    { "id": "cta", "start": 2.8, "duration": 1.2, "focus": "logo-and-badge" }
  ]
}
```

## Validation
Ensure cumulative beat durations fit within specified canvas bounds and total clip duration.
