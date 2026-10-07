/**
 * Motion Studio — Component Registry & Capability Catalog
 * Authoritative catalogue of reusable 2D and 3D motion primitives.
 */

import { TextReveal } from './2d/TextReveal.js';
import { BrandBadge } from './2d/BrandBadge.js';
import { MetricCounter } from './2d/MetricCounter.js';
import { SurfaceCard } from './2d/SurfaceCard.js';
import { LogoReveal } from './2d/LogoReveal.js';
import { ShapeReveal } from './2d/ShapeReveal.js';

import { PodiumStage } from './3d/PodiumStage.js';
import { ProceduralArtifact } from './3d/ProceduralArtifact.js';
import { LightingRig } from './3d/LightingRig.js';
import { OrbitalCamera } from './3d/OrbitalCamera.js';
import { ParticleField } from './3d/ParticleField.js';
import { GlassSurface } from './3d/GlassSurface.js';
import { ProductCard } from './3d/ProductCard.js';

import { ReelHookStrap } from './reel/ReelHookStrap.js';
import { ReelGpsTransit } from './reel/ReelGpsTransit.js';
import { ReelCargoProtection } from './reel/ReelCargoProtection.js';
import { ReelConversionLowerThird } from './reel/ReelConversionLowerThird.js';

export class ComponentRegistry {
  constructor() {
    this.components = new Map();
  }

  /**
   * Register a component definition.
   */
  register(component) {
    if (!component || !component.id) {
      throw new Error('Cannot register component without a valid "id"');
    }
    this.components.set(component.id, component);
    return this;
  }

  /**
   * Retrieve a component definition by ID.
   */
  get(id) {
    return this.components.get(id) || null;
  }

  /**
   * Check if a component is registered.
   */
  has(id) {
    return this.components.has(id);
  }

  /**
   * List all registered components.
   */
  list() {
    return Array.from(this.components.values());
  }

  /**
   * Query components by capability criteria for agent selection.
   * @param {Object} query - { category, dimension, style, intensity, runtime }
   */
  findComponents(query = {}) {
    return this.list().filter(comp => {
      if (query.category && comp.category !== query.category) return false;
      if (query.dimension && comp.dimension !== query.dimension) return false;
      if (query.runtime && comp.runtime !== query.runtime) return false;
      if (query.style && comp.supportedStyles && !comp.supportedStyles.includes(query.style)) return false;
      if (query.motionType && comp.supportedMotionTypes && !comp.supportedMotionTypes.includes(query.motionType)) return false;
      return true;
    });
  }

  /**
   * Print machine-readable catalogue summary.
   */
  getCatalogSummary() {
    return this.list().map(comp => ({
      id: comp.id,
      version: comp.version,
      category: comp.category,
      dimension: comp.dimension,
      runtime: comp.runtime,
      description: comp.description,
      complexity: comp.complexity || {}
    }));
  }
}

// Global registry singleton with all 13 core primitives pre-registered
export const globalComponentRegistry = new ComponentRegistry();

globalComponentRegistry
  .register(TextReveal)
  .register(BrandBadge)
  .register(MetricCounter)
  .register(SurfaceCard)
  .register(LogoReveal)
  .register(ShapeReveal)
  .register(PodiumStage)
  .register(ProceduralArtifact)
  .register(LightingRig)
  .register(OrbitalCamera)
  .register(ParticleField)
  .register(GlassSurface)
  .register(ProductCard)
  .register(ReelHookStrap)
  .register(ReelGpsTransit)
  .register(ReelCargoProtection)
  .register(ReelConversionLowerThird);
