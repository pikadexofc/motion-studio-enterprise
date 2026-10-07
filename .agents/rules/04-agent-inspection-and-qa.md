# Rule 04: Visual Inspection & Quality Assurance Standards

**Scope**: Render validation, automated QA, snapshot verification, and completion criteria.

## 1. No Blind Assumptions
- Never report a video render as "complete" or "successful" merely because FFmpeg exited with code 0.
- Every render must produce snapshot frames at regular intervals (minimum 5 checkpoints: 0%, 25%, 50%, 75%, 100%).

## 2. Automated Frame QA Checklist
The automated inspector must verify:
1. **Non-Blank Content**: Frame mean luminance and standard deviation must exceed threshold ($\sigma > 5.0$) to avoid all-black or all-white blank renders.
2. **Dimension Integrity**: Output dimensions must exactly match target specifications (e.g., 1920x1080).
3. **No Visual Clipping**: Key visual elements (text, buttons, logos) must not extend outside viewport bounds.
4. **Contrast Verification**: Contrast between foreground text and underlying surfaces must meet WCAG standards.

## 3. Human & Agent Review Criteria
Before completing a task, inspect the snapshot artifacts and answer:
- Is the typographic hierarchy instantly readable in under 2 seconds?
- Does the 3D camera trajectory feel natural and physically grounded?
- Is there any visible pixelation, jagged edge, or shader artifact?
- Does the composition match the creative brief's intended tone?
