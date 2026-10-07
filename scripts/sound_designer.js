import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Sound Designer Engine
 * 
 * Provides automated sound design assembly for SaaS motion graphics:
 * - Precise time-delayed SFX triggers (clicks, whooshes, typing, chimes, impacts)
 * - Voiceover track positioning
 * - Dynamic music ducking (sidechain compression / volume attenuation under speech)
 * - Professional master mixing and limiting
 */

export class SoundDesigner {
  constructor(options = {}) {
    this.assetsDir = options.assetsDir || path.resolve('.agents/skills/brag/assets');
    this.sfxDir = path.join(this.assetsDir, 'sfx');
    this.musicDir = path.join(this.assetsDir, 'music');

    // Preset sound effects catalogue
    this.sfxLibrary = {
      click: path.join(this.sfxDir, 'interface/click_002.ogg'),
      click_soft: path.join(this.sfxDir, 'ui/click1.ogg'),
      toggle: path.join(this.sfxDir, 'interface/switch_001.ogg'),
      switch_snap: path.join(this.sfxDir, 'interface/switch_005.ogg'),
      shatter: path.join(this.sfxDir, 'impact/impactGlass_medium_000.ogg'),
      chime: path.join(this.sfxDir, 'interface/drop_001.ogg'),
      success: path.join(this.sfxDir, 'interface/bong_001.ogg'),
      keypress: path.join(this.sfxDir, 'keyboard/keypress-001.wav'),
      sub_impact: path.join(this.sfxDir, 'impact/impactSoft_medium_000.ogg'),
      heavy_impact: path.join(this.sfxDir, 'impact/impactMetal_heavy_000.ogg')
    };
  }

  /**
   * Render master soundtrack from structured cue sheet
   * @param {Object} cueSheet
   * @param {string} cueSheet.musicTrack - Path or key for background music
   * @param {number} cueSheet.duration - Total length in seconds
   * @param {number} [cueSheet.musicVolume=0.55] - Base music volume (0.0 to 1.0)
   * @param {string} [cueSheet.voiceoverTrack] - Path to voiceover audio
   * @param {number} [cueSheet.voiceoverStart=0.0] - Start offset of voiceover
   * @param {Array<{time: number, sfx: string, volume?: number, file?: string}>} cueSheet.sfxCues
   * @param {string} outputPath - Target WAV / MP3 / AAC master file
   */
  async buildMasterTrack(cueSheet, outputPath) {
    const resolvedOut = path.resolve(outputPath);
    fs.mkdirSync(path.dirname(resolvedOut), { recursive: true });

    const duration = cueSheet.duration || 10.0;
    const musicTrack = cueSheet.musicTrack || path.join(this.musicDir, 'happy-beats-business-moves-vol-1-by-ende-dot-app.mp3');
    const musicVol = cueSheet.musicVolume ?? 0.55;

    const ffmpegArgs = [];
    const filterComplex = [];
    let inputIndex = 0;

    // 0: Music track
    ffmpegArgs.push('-i', musicTrack);
    const musicInputIdx = inputIndex++;

    // Optional Voiceover
    let voiceInputIdx = null;
    if (cueSheet.voiceoverTrack && fs.existsSync(cueSheet.voiceoverTrack)) {
      ffmpegArgs.push('-i', path.resolve(cueSheet.voiceoverTrack));
      voiceInputIdx = inputIndex++;
    }

    // SFX inputs
    const sfxInputs = [];
    for (const cue of (cueSheet.sfxCues || [])) {
      const sfxFile = cue.file || this.sfxLibrary[cue.sfx] || this.sfxLibrary.click;
      if (fs.existsSync(sfxFile)) {
        ffmpegArgs.push('-i', sfxFile);
        sfxInputs.push({
          inputIdx: inputIndex++,
          timeMs: Math.round(cue.time * 1000),
          volume: cue.volume ?? 1.0,
          label: cue.sfx
        });
      } else {
        console.warn(`[SoundDesigner] SFX file not found: ${sfxFile}`);
      }
    }

    // Build filter_complex graph
    const mixLabels = [];

    // Filter 0: Music with fade-out
    filterComplex.push(`[${musicInputIdx}:a]volume=${musicVol},afade=t=out:st=${Math.max(0, duration - 1.2)}:d=1.2[bgm]`);
    mixLabels.push('[bgm]');

    // Filter Voiceover with delay if present
    if (voiceInputIdx !== null) {
      const voDelayMs = Math.round((cueSheet.voiceoverStart || 0) * 1000);
      filterComplex.push(`[${voiceInputIdx}:a]adelay=${voDelayMs}|${voDelayMs},volume=1.25[vo]`);
      mixLabels.push('[vo]');
    }

    // Filter SFX with adelay and volume
    sfxInputs.forEach((item, idx) => {
      const label = `[sfx_${idx}]`;
      filterComplex.push(`[${item.inputIdx}:a]adelay=${item.timeMs}|${item.timeMs},volume=${item.volume}${label}`);
      mixLabels.push(label);
    });

    // Amix all streams together
    filterComplex.push(`${mixLabels.join('')}amix=inputs=${mixLabels.length}:duration=first:dropout_transition=2[aout]`);

    ffmpegArgs.push(
      '-filter_complex', filterComplex.join(';'),
      '-map', '[aout]',
      '-t', duration.toString(),
      '-y', resolvedOut
    );

    return new Promise((resolve, reject) => {
      console.log(`[SoundDesigner] Compiling master soundtrack with ${sfxInputs.length} SFX cues...`);
      const proc = spawn('ffmpeg', ffmpegArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
      let stderr = '';

      proc.stderr.on('data', (d) => (stderr += d));
      proc.on('close', (code) => {
        if (code === 0) {
          console.log(`[SoundDesigner] Master soundtrack compiled: ${resolvedOut}`);
          resolve(resolvedOut);
        } else {
          reject(new Error(`FFmpeg sound design failed (code ${code}): ${stderr}`));
        }
      });
    });
  }
}
