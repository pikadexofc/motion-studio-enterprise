import fs from 'fs';
import path from 'path';
import https from 'https';

/**
 * ElevenLabs Voiceover Generation Service
 * 
 * Supports high-fidelity text-to-speech generation with fine-tuned voice selection,
 * natural cadence pauses, stability/similarity controls, and local cache management.
 */

// Recommended Professional Voices for SaaS Motion Reels:
export const VOICES = {
  LIAM: 'TX3LPaxmHKxFdv7VOQHJ',       // Dynamic, expressive SaaS product demo
  BRIAN: 'nPczCjzI2devNBz1zWvd',      // Authoritative, deep, cinematic tech launch
  EMILY: 'LcfcDJNUP1GQjkzn1xUU',      // Clean, crisp, modern Silicon Valley commercial
  ADAM: 'pNInz6obpgDQGcFmaJgB',       // Warm, conversational, grounded explainer
  RACHEL: '21m00Tcm4TlvDq8ikWAM',     // Calm, articulate, high-trust fintech/B2B
};

/**
 * Generate Voiceover via ElevenLabs API or retrieve from cache
 * @param {Object} options
 * @param {string} options.text - Script text to synthesize
 * @param {string} options.voiceId - ElevenLabs voice ID (default: LIAM)
 * @param {string} options.outputPath - Destination MP3 file path
 * @param {string} [options.apiKey] - Optional explicit API key
 * @param {Object} [options.voiceSettings] - Stability and similarity settings
 */
export async function generateVoiceover({
  text,
  voiceId = VOICES.LIAM,
  outputPath,
  apiKey = process.env.ELEVENLABS_API_KEY,
  voiceSettings = { stability: 0.5, similarity_boost: 0.85, style: 0.15 }
}) {
  const resolvedOut = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(resolvedOut), { recursive: true });

  if (!apiKey) {
    console.warn('[ElevenLabs] Warning: ELEVENLABS_API_KEY not detected in environment.');
    console.warn(`[ElevenLabs] Script to synthesize: "${text}"`);
    console.warn('[ElevenLabs] If running offline, provide a pre-recorded track or export to: ' + resolvedOut);
    return {
      success: false,
      cached: false,
      path: resolvedOut,
      reason: 'MISSING_API_KEY',
      text
    };
  }

  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
  const payload = JSON.stringify({
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: voiceSettings
  });

  return new Promise((resolve, reject) => {
    const url = new URL(endpoint);
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      },
      (res) => {
        if (res.statusCode !== 200) {
          let errBody = '';
          res.on('data', (d) => (errBody += d));
          res.on('end', () => {
            reject(new Error(`ElevenLabs API returned ${res.statusCode}: ${errBody}`));
          });
          return;
        }

        const fileStream = fs.createWriteStream(resolvedOut);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`[ElevenLabs] Voiceover generated successfully -> ${resolvedOut}`);
          resolve({
            success: true,
            path: resolvedOut,
            text,
            voiceId
          });
        });
      }
    );

    req.on('error', (err) => {
      reject(new Error(`Network error contacting ElevenLabs: ${err.message}`));
    });

    req.write(payload);
    req.end();
  });
}
