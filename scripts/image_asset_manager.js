import fs from 'fs';
import path from 'path';

/**
 * Image Asset Manager & Dual-Tier AI Generation Pipeline
 * 
 * Supports:
 * - Tier 1: Direct Agent Tool Generation (`generate_image`)
 * - Tier 2: Autonomous Browser-Driven Generation (Gemini / ChatGPT) via DevTools/Puppeteer
 * - Asset preflight, resolution normalization, and automated scene asset directory management
 */

export class ImageAssetManager {
  constructor(options = {}) {
    this.assetsDir = options.assetsDir || path.resolve('assets/images');
    fs.mkdirSync(this.assetsDir, { recursive: true });
  }

  /**
   * Resolve or register an image asset for a motion scene
   * @param {string} filename - Target asset filename (e.g. 'hero-device-mockup.png')
   * @param {string} [scenePath] - Optional specific scene directory
   * @returns {string} Absolute path to the resolved image asset
   */
  getAssetPath(filename, scenePath) {
    if (scenePath) {
      const sceneDir = path.dirname(path.resolve(scenePath));
      const localAsset = path.join(sceneDir, 'assets', filename);
      if (fs.existsSync(localAsset)) return localAsset;
    }

    return path.join(this.assetsDir, filename);
  }

  /**
   * Preflight verification for an image asset
   * @param {string} imagePath - Path to the image file
   */
  verifyAsset(imagePath) {
    const resolved = path.resolve(imagePath);
    if (!fs.existsSync(resolved)) {
      return { exists: false, error: `File not found: ${resolved}` };
    }

    const stats = fs.statSync(resolved);
    const ext = path.extname(resolved).toLowerCase();
    const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

    return {
      exists: true,
      path: resolved,
      sizeBytes: stats.size,
      sizeKb: (stats.size / 1024).toFixed(1),
      extension: ext,
      isValidFormat: validExtensions.includes(ext)
    };
  }

  /**
   * Standardized SaaS Motion Prompt Templates for AI Image Generation
   * Formats prompts optimized for Gemini / ChatGPT / DALL-E / Imagen 3
   */
  static getPromptTemplate(type, options = {}) {
    const brandName = options.brandName || 'SaaS Product';
    const accentColor = options.accentColor || 'electric orange #FF6B00';

    switch (type) {
      case 'dark_bento_stage':
        return `Cinematic 3D render of a minimalist dark-mode technological hardware stage, obsidian glass pedestals with subtle edge-lit glow in ${accentColor}, floating clean geometric glass cards, declassified technical blueprint lines at 5% opacity, soft atmospheric volumetric lighting, photorealistic octane render, 8k resolution, aspect ratio 16:9, clean composition, zero text artifacts.`;

      case 'floating_glass_icon':
        return `Isometric floating 3D glass icon of ${options.subject || 'a blazing lightning bolt'}, frosted glassmorphism with internal refraction, subtle radiant core glowing in ${accentColor}, pristine metallic chrome border bevels, isolated on completely black transparent background, modern Apple and Linear aesthetic, hyper-detailed raytracing, aspect ratio 1:1.`;

      case 'device_frame_mockup':
        return `Floating angled modern borderless OLED tablet displaying a clean dark-mode developer analytics dashboard for ${brandName}, ultra-thin matte titanium frame, deep rich blacks, vivid orange and emerald telemetry charts, subtle ambient reflection on the screen surface, photorealistic studio lighting on pitch dark backdrop, aspect ratio 9:16.`;

      case 'abstract_mesh_background':
        return `Dark abstract digital mesh wallpaper, deep cosmic obsidian #05070B background with soft flowing radial gradients in ${accentColor} and deep indigo, subtle micro-grain film texture, smooth anti-aliased organic curves, expansive negative space for typography overlay, 8k wallpaper, aspect ratio 9:16.`;

      case 'cinematic_photorealistic_enhancer':
        return `Enhance the provided image into an emotionally powerful, cinematic, ultra-realistic 4K photograph while preserving the existing design, layout, composition, subject placement, and intent exactly.

Inject extraordinary positive emotion, warmth, human connection, and cinematic intensity. Make the image feel like an unforgettable frame from a high-end film, with breathtaking composition, dynamic perspective, layered depth, rich texture, authentic imperfections, and refined cinematic colour grading.

Keep the primary subject crystal-clear and tack-sharp. NO motion blur, softness, ghosting, or focus loss on the primary subject. Subtle motion blur is allowed only on appropriate background or secondary moving elements.

Introduce subtle real-world photographic imperfections: slight handheld character, natural micro-movement, realistic texture variation, gentle optical falloff, subtle photographic grain, believable environmental imperfections, and candid visual energy. Keep everything restrained and physically plausible.

Use subtle sunlight, restrained bloom, shallow foreground/background depth blur, directional key light from the upper left, and slightly deeper shadows on the opposite side for dimensional cinematic contrast.

${options.isHuman !== false ? 'Naturally warm skin tones. Enhance eye sharpness, iris detail, catchlights, micro-contrast, pores, beard detail, and skin texture while preserving authentic anatomy.\n' : ''}Preserve every important visual detail exactly. Do not redesign, reposition, simplify, restructure, or add unnecessary elements. EDIT ONLY.

Upscale and refine the final result to true 4K Ultra HD while preserving natural photographic detail.

Final result: emotionally extraordinary, lively, cinematic, candid, physically believable, professionally photographed, and unmistakably real rather than AI-perfect.`;

      case 'cinematic_ui_hardware_enhancer':
        return `Enhance the provided UI/hardware product frame into a cinematic, ultra-realistic 4K commercial photograph while preserving the exact layout, interface text, buttons, and design hierarchy.

Transform into a tangible physical device in a high-end architectural space: matte titanium chamfered bezels, pristine anti-reflective OLED glass with micro-refractions, directional soft key light from upper-left casting dimensional ambient occlusion shadows to the bottom-right.

Tack-sharp interface clarity with zero blur on typography and icons. Subtle shallow depth-of-field blur on background surroundings. Introduce subtle photographic film grain (35mm aesthetic) to eliminate banding. EDIT ONLY, preserve exact UI structure.`;

      default:
        return options.customPrompt || `High-end SaaS motion graphic asset for ${brandName}, clean dark mode aesthetic, modern 3D glassmorphic styling, cinematic lighting.`;
    }
  }

  /**
   * Generates production-ready CSS for applying cinematic optical realism
   * directly to HTML-based motion scenes (subtle film grain, upper-left key light, anti-banding)
   */
  static getCinematicOpticsCSS() {
    return `
/* --- Cinematic Optics Layer (Anti-AI Plasticity) --- */
.cinematic-optics-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.cinematic-key-light {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 70%;
  height: 70%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
  filter: blur(40px);
}
`;
  }

  /**
   * Instructions for autonomous browser generation when using Gemini or ChatGPT
   */
  static getBrowserGenerationRunbook(platform = 'gemini') {
    if (platform === 'gemini') {
      return {
        platform: 'Google Gemini',
        url: 'https://gemini.google.com/app',
        steps: [
          '1. Use Chrome DevTools to navigate to https://gemini.google.com/app',
          '2. Locate the prompt input textarea using query selector: textarea[aria-label*="prompt"] or div[contenteditable="true"]',
          '3. Type the art-directed image generation prompt (e.g. "Generate an image: ...")',
          '4. Press Enter or click the Submit button',
          '5. Wait for image rendering to complete (watch for img tags with blob: or generated content)',
          '6. Extract the generated image URL or screenshot the image element directly into the workspace assets folder.'
        ]
      };
    } else {
      return {
        platform: 'ChatGPT',
        url: 'https://chatgpt.com',
        steps: [
          '1. Use Chrome DevTools to navigate to https://chatgpt.com',
          '2. Locate the prompt textarea (#prompt-textarea)',
          '3. Type image generation instructions for DALL-E',
          '4. Wait for the image generation response',
          '5. Download or extract the high-resolution image to assets/images/.'
        ]
      };
    }
  }
}
