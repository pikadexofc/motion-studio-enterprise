---
name: hyperframes-composition
description: Structuring declarative HTML video compositions using HyperFrames data attributes, track management, and deterministic timeline tags.
---

# HyperFrames Composition Architecture

## Activation
Activate when authoring HTML-based video compositions compatible with the HyperFrames standard or using HTML elements as declarative timeline tracks.

## Core Data Contract
HyperFrames uses HTML custom attributes to describe timeline tracks and temporal visibility:
- `data-start`: Entry point of the layer or clip on the timeline in seconds (e.g. `data-start="0.5"`).
- `data-duration`: Duration the element remains active on the timeline in seconds (e.g. `data-duration="3.0"`).
- `data-track-index`: Visual stacking and track index preventing spatial collisions.

## Composition Layout Pattern
```html
<div id="stage" class="stage-viewport">
  <!-- Track 0: Background Canvas / WebGL -->
  <div class="track" data-track-index="0" data-start="0" data-duration="5.0">
    <canvas id="webgl-canvas"></canvas>
  </div>
  
  <!-- Track 1: Kinetic Typography -->
  <div class="track" data-track-index="1" data-start="0.2" data-duration="3.5">
    <h1 class="headline">Hyper-Speed Video Engine</h1>
  </div>
  
  <!-- Track 2: CTA Overlay -->
  <div class="track" data-track-index="2" data-start="2.8" data-duration="2.2">
    <div class="badge">Get Started</div>
  </div>
</div>
```

## Failure Modes
- Forgetting `data-duration`, causing elements to vanish prematurely or linger unexpectedly.
- Overlapping tracks with non-transparent backgrounds concealing underlying 3D scenes.
