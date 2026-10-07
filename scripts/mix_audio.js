import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * FocusFlow Master Audio Mixer (Brag Engine Specification)
 * Blends background music from ende.app with precisely timed Kenney SFX cues.
 */
export async function mixAudio(outputPath, duration = 10.0) {
  const assetsDir = path.resolve('.agents/skills/brag/assets');
  const musicPath = path.join(assetsDir, 'music/happy-beats-business-moves-vol-1-by-ende-dot-app.mp3');
  const sfxClick = path.join(assetsDir, 'sfx/interface/click_002.ogg');
  const sfxShatter = path.join(assetsDir, 'sfx/impact/impactGlass_medium_000.ogg');
  const sfxSwitch = path.join(assetsDir, 'sfx/interface/switch_001.ogg');
  const sfxDrop = path.join(assetsDir, 'sfx/interface/drop_001.ogg');
  const sfxKey = path.join(assetsDir, 'sfx/keyboard/keypress-001.wav');
  const sfxImpact = path.join(assetsDir, 'sfx/impact/impactSoft_medium_000.ogg');

  fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });

  // Inputs list:
  // 0: music
  // 1: click (purge)
  // 2: shatter
  // 3: click (timer)
  // 4: key1
  // 5: key2
  // 6: key3
  // 7: switch (task complete)
  // 8: drop (xp reward)
  // 9: click (launch)
  // 10: impact (outro)

  const args = [
    '-y',
    '-ss', '0.0', '-t', String(duration), '-i', musicPath,
    '-i', sfxClick,
    '-i', sfxShatter,
    '-i', sfxClick,
    '-i', sfxKey,
    '-i', sfxKey,
    '-i', sfxKey,
    '-i', sfxSwitch,
    '-i', sfxDrop,
    '-i', sfxClick,
    '-i', sfxImpact,
    '-filter_complex',
    `[0:a]volume=0.38,afade=t=in:st=0:d=0.3,afade=t=out:st=${(duration - 0.7).toFixed(1)}:d=0.7[bg];
     [1:a]adelay=1100|1100,volume=0.75[sfx1];
     [2:a]adelay=1250|1250,volume=0.65[sfx2];
     [3:a]adelay=3000|3000,volume=0.85[sfx3];
     [4:a]adelay=4200|4200,volume=0.55[sfx4];
     [5:a]adelay=4400|4400,volume=0.55[sfx5];
     [6:a]adelay=4600|4600,volume=0.55[sfx6];
     [7:a]adelay=5400|5400,volume=0.85[sfx7];
     [8:a]adelay=5600|5600,volume=0.75[sfx8];
     [9:a]adelay=8200|8200,volume=0.90[sfx9];
     [10:a]adelay=8350|8350,volume=0.70[sfx10];
     [bg][sfx1][sfx2][sfx3][sfx4][sfx5][sfx6][sfx7][sfx8][sfx9][sfx10]amix=inputs=11:duration=first:dropout_transition=0.5[aout]`,
    '-map', '[aout]',
    '-ac', '2',
    '-ar', '48000',
    path.resolve(outputPath)
  ];

  console.log(`[AudioMixer] Generating master audio track: ${outputPath}...`);
  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, { stdio: ['ignore', 'inherit', 'inherit'] });
    proc.on('close', code => {
      if (code === 0) {
        console.log(`[AudioMixer] Successfully generated audio mix: ${outputPath}`);
        resolve(outputPath);
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
    proc.on('error', reject);
  });
}

if (process.argv[1]?.includes('mix_audio.js')) {
  mixAudio('render-tests/focusflow-audio-master.wav', 10.0)
    .catch(err => console.error(err));
}
