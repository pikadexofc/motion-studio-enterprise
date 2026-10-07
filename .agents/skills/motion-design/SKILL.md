---
name: motion-design
description: Fundamental principles of professional motion design including timing, spacing, easing, rhythm, anticipation, and visual hierarchy.
---

# Motion Design Principles

## Activation
Activate this skill whenever designing motion trajectories, selecting easing functions, orchestrating scene pacing, or reviewing visual hierarchy.

## Core Rules
1. **Purposeful Movement**: Every motion must answer: *What is moving? Why is it moving? Where should the viewer look?*
2. **Hierarchy & Staging**: Only one primary element (Lead Actor) commands focal attention at a given time. Secondary elements animate with reduced amplitude and staggered delay.
3. **Physical Easing**:
   - Entrances: Strong deceleration (`power3.out`, `expo.out`) — fast arrival, smooth stop.
   - Exits: Strong acceleration (`power3.in`, `expo.in`) — deliberate start, rapid departure.
   - Positional changes: Symmetrical or asymmetrical smooth curves (`power2.inOut`).
4. **Temporal Stagger**: Offset related items by 40ms–100ms. Uniform simultaneous movement appears rigid and amateurish.

## Failure Modes
- *Jitter / Visual Noise*: Too many elements moving simultaneously. Fix: Lock down secondary elements until the hero element completes its entrance.
- *Linear Mechanical Feel*: Using linear easing (`none`). Fix: Apply high-order polynomial or cubic-bezier curves.
- *Visual Clichés*: Gratuitous floating neon particles or spinning badges without brand context. Fix: Remove non-essential decorative elements.

## Validation
- In keyframe snapshots at $t=25\%$ and $t=50\%$, verify eye gaze converges immediately on the primary value proposition or hero product.
