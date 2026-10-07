/**
 * Virtual Timeline & Multi-Runtime Orchestrator.
 * Manages deterministic frame seeking across DOM, GSAP, Canvas, and Three.js.
 */
export class VirtualTimeline {
  constructor(options = {}) {
    this.duration = options.duration || 3.0;
    this.fps = options.fps || 60;
    this.receivers = [];
    this.currentTime = 0;
    this.currentFrame = 0;

    // Attach to global window if available
    if (typeof window !== 'undefined') {
      window.__motionTimeline = this;
      window.renderFrame = (timeInSeconds, frameIndex) => {
        return this.seek(timeInSeconds, frameIndex);
      };
    }
  }

  /**
   * Register an animation runtime receiver.
   * Receiver must implement seek(time, frameIndex).
   */
  register(receiver) {
    if (typeof receiver === 'function') {
      this.receivers.push({ seek: receiver });
    } else if (receiver && typeof receiver.seek === 'function') {
      this.receivers.push(receiver);
    }
    return this;
  }

  /**
   * Synchronously advance all runtimes to the exact virtual timestamp.
   */
  seek(timeInSeconds, frameIndex = null) {
    this.currentTime = Math.max(0, Math.min(this.duration, timeInSeconds));
    this.currentFrame = frameIndex !== null ? frameIndex : Math.round(this.currentTime * this.fps);

    for (let i = 0; i < this.receivers.length; i++) {
      try {
        this.receivers[i].seek(this.currentTime, this.currentFrame);
      } catch (err) {
        console.error(`[VirtualTimeline] Error in receiver ${i} at t=${this.currentTime}:`, err);
      }
    }
    return true;
  }
}
