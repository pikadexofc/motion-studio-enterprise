---
name: kinetic-typography
description: Advanced kinetic typography, word/character splitting, staggered reveals, kerning stability, and responsive viewport sizing.
---

# Kinetic Typography

## Activation
Activate when rendering headlines, value propositions, feature callouts, or subtitle animation tracks.

## Engineering Rules
1. **DOM Structure**: Wrap words and characters in `span` containers with `display: inline-block; overflow: hidden;` for crisp slide-and-reveal masking.
2. **Font Preloading**: Always await `document.fonts.ready` before reading bounding boxes or initiating animations. Unloaded fonts cause layout flash (FOUT) and clipping.
3. **Motion Grammar**:
   - High-energy hooks: Fast vertical slide with subtle 3D rotation (`rotateX(-25deg)`).
   - Minimalist enterprise: Clean fade + subtle upward drift ($y: 20\text{px} \rightarrow 0\text{px}$).
   - Emphasized key terms: Accent color highlight or background pill expansion.

## Example Split Pattern
```javascript
export function splitTextIntoWords(element) {
  const words = element.textContent.trim().split(/\s+/);
  element.innerHTML = words.map(w => 
    `<span class="word-mask"><span class="word">${w}</span></span>`
  ).join(' ');
}
```
