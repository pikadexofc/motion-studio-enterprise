# Rule 02: Motion Design Discipline & Visual Quality Standards

**Scope**: Creative planning, animation authoring, kinetic typography, and 3D camera staging.

## 1. Intentional Motion Only
Every movement must communicate meaning, guide eye gaze, or clarify spatial relationships.
- **BANNED**: Meaningless drifting particles without purpose.
- **BANNED**: Gratuitous 3D rotations that disorient the viewer.
- **BANNED**: Chaotic simultaneous movement (all elements animating at once).
- **MANDATORY**: Clear motion hierarchy. Determine the **Lead Actor** (headline, hero product) and **Supporting Actors** (subtitles, accent badges, stage lights). Supporting actors must never upstage the lead actor.

## 2. Easing & Kinematics Standards
Linear motion looks mechanical and lifeless. Always use natural physical easing:
- **Entrances**: Deceleration curves (`power3.out`, `expo.out`, `cubic-bezier(0.16, 1, 0.3, 1)`). Elements arrive fast with physical braking.
- **Exits**: Acceleration curves (`power3.in`, `expo.in`). Elements pick up speed as they leave frame.
- **Transitions / Camera Shifts**: Smooth acceleration-deceleration curves (`power2.inOut`, `sine.inOut`).
- **Overshoot / Elasticity**: Subtle overshoot (`back.out(1.2)`) is allowed only for playful or energetic accents; never for serious enterprise SaaS headlines.

## 3. Typographic Stability & Staggering
- Never allow text characters to wrap or jump lines during animation.
- Use fixed-width containers or calculate bounds before animating.
- Apply staggered reveals with controlled intervals ($0.03\text{s} - 0.08\text{s}$ per word or line) rather than monolithic fade-ins.

## 4. Visual Restraint
A simple animation executed with perfect timing and spatial harmony is infinitely superior to a cluttered, technically complex animation with poor composition.
- Limit palette to 3–4 cohesive tones.
- Maintain safe margins (at least 5% from viewport edges).
- Maintain WCAG AA contrast standards ($\ge 4.5:1$ for body copy, $\ge 3:1$ for large headlines).
