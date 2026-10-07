import fs from 'fs';
import path from 'path';

/**
 * OpenCut Project Interoperability Adapter
 * 
 * Bridges Motion Studio Enterprise with OpenCut (https://github.com/opencut-app/opencut).
 * Exports Motion Studio scene reels, voiceovers, and SFX cue sheets into OpenCut's
 * portable multi-track project schema (SceneTracks: main video, overlays, multi-track audio).
 */

export class OpenCutExporter {
  /**
   * Export a Motion Studio reel manifest to OpenCut Project JSON
   * @param {Object} reel
   * @param {string} reel.title - Project title
   * @param {number} reel.width - Canvas width (e.g. 1080)
   * @param {number} reel.height - Canvas height (e.g. 1920)
   * @param {number} reel.fps - Frame rate (e.g. 30)
   * @param {number} reel.duration - Total duration in seconds
   * @param {Array<Object>} [reel.videoClips] - Array of video segments
   * @param {Object} [reel.voiceover] - Voiceover track details
   * @param {Object} [reel.music] - Background music details
   * @param {Array<Object>} [reel.sfxCues] - Array of micro-timed SFX cues
   * @param {string} outputPath - Output JSON filepath
   */
  static exportProject(reel, outputPath) {
    const resolvedOut = path.resolve(outputPath);
    fs.mkdirSync(path.dirname(resolvedOut), { recursive: true });

    const durationMs = Math.round((reel.duration || 10.0) * 1000);

    // Build OpenCut SceneTracks
    const openCutProject = {
      version: '1.0.0',
      generator: 'Motion Studio Enterprise x OpenCut Bridge',
      createdAt: new Date().toISOString(),
      metadata: {
        title: reel.title || 'Motion Studio Reel',
        aspectRatio: `${reel.width || 1080}:${reel.height || 1920}`,
        resolution: {
          width: reel.width || 1080,
          height: reel.height || 1920
        },
        fps: reel.fps || 30,
        durationMs: durationMs
      },
      tracks: {
        // Main video sequence track
        main: {
          id: 'track-video-main',
          name: 'Primary Video Track',
          type: 'video',
          clips: (reel.videoClips || [
            {
              id: 'clip-scene-01',
              name: reel.title || 'Scene Render',
              source: reel.videoSource || 'render-tests/focusflow-brag-promo.mp4',
              startMs: 0,
              endMs: durationMs,
              trimStartMs: 0,
              trimEndMs: durationMs,
              volume: 1.0
            }
          ])
        },
        // Visual overlays (B-roll, stickers, captions, brand badges)
        overlays: (reel.overlays || []).map((ov, idx) => ({
          id: `track-overlay-${idx + 1}`,
          type: 'overlay',
          clips: [ov]
        })),
        // Multi-track audio (voiceover, ducked BGM, micro SFX)
        audio: [
          // Audio Track 1: Voiceover
          {
            id: 'track-audio-voiceover',
            name: 'ElevenLabs Voiceover',
            type: 'audio',
            volume: 1.25,
            clips: reel.voiceover ? [
              {
                id: 'clip-vo-01',
                name: 'Narration Track',
                source: reel.voiceover.path,
                startMs: Math.round((reel.voiceover.start || 0) * 1000),
                endMs: durationMs,
                volume: 1.25
              }
            ] : []
          },
          // Audio Track 2: Background Music with Ducking
          {
            id: 'track-audio-music',
            name: 'Background Music (Ducked)',
            type: 'audio',
            volume: reel.music?.volume || 0.50,
            clips: [
              {
                id: 'clip-bgm-01',
                name: reel.music?.name || 'Launch Soundtrack',
                source: reel.music?.path || '.agents/skills/brag/assets/music/ende.app.mp3',
                startMs: 0,
                endMs: durationMs,
                fadeInMs: 400,
                fadeOutMs: 1200,
                volume: reel.music?.volume || 0.50
              }
            ]
          },
          // Audio Track 3: Sound Effects (SFX Cues)
          {
            id: 'track-audio-sfx',
            name: 'Tactile UI SFX Cues',
            type: 'audio',
            volume: 1.0,
            clips: (reel.sfxCues || []).map((cue, idx) => ({
              id: `clip-sfx-${idx + 1}`,
              name: cue.sfx,
              source: cue.file || cue.sfx,
              startMs: Math.round(cue.time * 1000),
              endMs: Math.round(cue.time * 1000) + 600,
              volume: cue.volume || 1.0
            }))
          }
        ]
      }
    };

    fs.writeFileSync(resolvedOut, JSON.stringify(openCutProject, null, 2), 'utf-8');
    console.log(`[OpenCutExporter] Exported OpenCut project JSON -> ${resolvedOut}`);
    return openCutProject;
  }
}

// CLI Demo Runner
if (process.argv[1] && process.argv[1].endsWith('export_opencut.js')) {
  OpenCutExporter.exportProject({
    title: 'FocusFlow 10s SaaS Launch Reel',
    width: 1080,
    height: 1920,
    fps: 30,
    duration: 10.0,
    videoSource: 'render-tests/focusflow-brag-promo.mp4',
    music: {
      name: 'happy-beats-business-moves',
      path: '.agents/skills/brag/assets/music/happy-beats-business-moves-vol-1-by-ende-dot-app.mp3',
      volume: 0.50
    },
    sfxCues: [
      { time: 1.10, sfx: 'click_002.ogg', volume: 1.0 },
      { time: 1.25, sfx: 'impactGlass_medium_000.ogg', volume: 0.9 },
      { time: 3.00, sfx: 'click_002.ogg', volume: 0.8 },
      { time: 4.20, sfx: 'keypress-001.wav', volume: 0.6 },
      { time: 5.40, sfx: 'switch_001.ogg', volume: 0.9 },
      { time: 5.60, sfx: 'drop_001.ogg', volume: 1.0 },
      { time: 8.20, sfx: 'click_002.ogg', volume: 1.0 }
    ]
  }, 'render-tests/focusflow-opencut-project.json');
}
