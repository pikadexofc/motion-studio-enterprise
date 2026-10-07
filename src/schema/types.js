/**
 * Motion Studio — Motion Scene Schema (MSS-v1)
 * Generic, declarative intermediate representation for programmatic motion graphics.
 */

export const SCHEMA_VERSION = '1.0.0';

/**
 * Formal JSON Schema definition for validation
 */
export const MOTION_SCENE_JSON_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'MotionSceneManifest',
  type: 'object',
  required: ['id', 'version', 'canvas', 'components'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    meta: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        author: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } }
      }
    },
    canvas: {
      type: 'object',
      required: ['duration'],
      properties: {
        width: { type: 'integer', default: 1920 },
        height: { type: 'integer', default: 1080 },
        fps: { type: 'integer', default: 60 },
        duration: { type: 'number', minimum: 0.1 },
        aspectRatio: { type: 'string', enum: ['16:9', '9:16', '1:1', '4:5'], default: '16:9' }
      }
    },
    brand: {
      type: 'object',
      properties: {
        preset: { type: 'string' },
        tokens: { type: 'object' },
        logo: { type: 'string' }
      }
    },
    assets: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        required: ['src'],
        properties: {
          src: { type: 'string' },
          type: { type: 'string', enum: ['image', 'video', 'font', 'audio', 'svg'] }
        }
      }
    },
    timeline: {
      type: 'object',
      properties: {
        scenes: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'start', 'duration'],
            properties: {
              id: { type: 'string' },
              start: { type: 'number' },
              duration: { type: 'number' },
              transition: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['fade', 'slide-left', 'slide-up', 'zoom', 'none'] },
                  duration: { type: 'number' }
                }
              }
            }
          }
        }
      }
    },
    layers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type'],
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['2d-dom', '3d-webgl', 'background', 'overlay'] },
          zIndex: { type: 'integer' }
        }
      }
    },
    components: {
      type: 'array',
      items: {
        type: 'object',
        required: ['type', 'id', 'timing'],
        properties: {
          type: { type: 'string' },
          id: { type: 'string' },
          layer: { type: 'string', default: '2d-dom' },
          timing: {
            type: 'object',
            required: ['start', 'duration'],
            properties: {
              start: { type: 'number', minimum: 0 },
              duration: { type: 'number', minimum: 0.05 }
            }
          },
          parameters: { type: 'object' },
          motion: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              direction: { type: 'string' },
              intensity: { type: 'string', enum: ['restrained', 'normal', 'energetic'], default: 'normal' },
              ease: { type: 'string' }
            }
          },
          assets: { type: 'object' },
          metadata: { type: 'object' }
        }
      }
    },
    quality: {
      type: 'object',
      properties: {
        minLuminance: { type: 'number' },
        minVariance: { type: 'number' },
        safeAreaMarginPct: { type: 'number', default: 5 }
      }
    }
  }
};
