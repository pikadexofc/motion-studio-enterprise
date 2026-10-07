---
name: media-pipeline
description: Video encoding pipelines, FFmpeg parameter optimization, color matrices (yuv420p), bitrates, container formats, and audio muxing.
---

# Media Pipeline Engineering

## Activation
Activate when configuring FFmpeg video encoding, streaming frame buffers, optimizing MP4 compression, or handling color profile normalization.

## Standard High-Fidelity Encoding Flags
```bash
ffmpeg -y \
  -f image2pipe \
  -vcodec png \
  -r 60 \
  -i - \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -preset medium \
  -crf 18 \
  -movflags +faststart \
  output.mp4
```

## Critical Parameters Explained
- `-pix_fmt yuv420p`: Mandatory for broad browser, QuickTime, iOS, and Android playback. RGB videos fail to render in standard HTML5 video players.
- `-movflags +faststart`: Moves metadata atom (moov) to beginning of file for instant web streaming.
- `-crf 18`: Constant Rate Factor providing visually lossless master quality.
- `-r 60`: Explicit input frame rate matching virtual capture step $\Delta t = 1/60$.
