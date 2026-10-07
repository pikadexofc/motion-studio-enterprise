/**
 * Deterministic Pseudo-Random Number Generator (Mulberry32).
 * Guarantees bitwise-identical sequence across all environments given the same seed.
 */
export function createPRNG(seed = 1337) {
  let s = Math.floor(Math.abs(seed)) || 1337;

  function next() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function range(min, max) {
    return min + next() * (max - min);
  }

  function choice(arr) {
    if (!arr || arr.length === 0) return null;
    const idx = Math.floor(next() * arr.length);
    return arr[idx];
  }

  return { next, range, choice };
}
