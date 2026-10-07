---
name: audio-motion
description: Beat detection, audio-reactive motion parameters, frequency analysis, and sound synchronization with visual keyframes.
---

# Audio-Reactive Motion

## Activation
Activate when synchronizing motion graphics to sound effects, musical beats, voiceovers, or acoustic transients.

## Core Rules
1. **Pre-Computed Audio Features**: Never perform live real-time Web Audio FFT analysis during deterministic rendering. Instead, pre-compute audio feature curves (beat timestamps, spectral flux, RMS energy) offline into a JSON envelope.
2. **Transient Alignment**: Anticipation precedes the beat by 60ms–100ms; peak impact coincides exactly with the transient ($t_{\text{beat}}$); recovery / settle follows the beat.
3. **Audio Structure**:
```json
{
  "beats": [0.45, 0.90, 1.35, 1.80, 2.25],
  "energyCurve": [0.1, 0.2, 0.85, 0.3, 0.92]
}
```
