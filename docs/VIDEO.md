# Video Encoding & Scroll-Scrubbing Guide

CRUNCHÉ uses two scroll-scrubbed cinematic videos:
1. **Hero video:** `reference/hero-raw.mp4` → `public/videos/hero.mp4` & `public/videos/hero-mobile.mp4`
2. **Showcase video:** `reference/section-raw.mp4` → `public/videos/section.mp4` & `public/videos/section-mobile.mp4`

## Source Requirements
- Resolution: **1920×1080 (1080p)** — never 720p.
- Duration: ~6–8 seconds, clean framing with no baked-in text.

## Why 100% Intra-Frame (All-I) Encoding?
Standard H.264 uses P and B frames that depend on neighbouring frames, causing stutter when scrubbing backward. We encode with `-g 1 -keyint_min 1 -sc_threshold 0 -bf 0` and `-x264-params keyint=1:min-keyint=1:scenecut=0` so **every frame is a keyframe (`I`)**, making forward and backward `video.currentTime` scrubbing instant.

## Budgets
- **Desktop (`1600px` wide):** `≤ 12 MB` (`-crf 26`)
- **Mobile (`1080px` wide, `< 768px`):** `≤ 5 MB` (`-crf 28`)
- If a file exceeds its budget, raise `-crf` slightly (e.g. `27` or `29`) and never remove the all-intra keyframe flags.

## Running the Encoders
```bash
bash scripts/encode-hero.sh reference/hero-raw.mp4
bash scripts/encode-section.sh reference/section-raw.mp4
```

Each script:
1. Verifies the raw input is `1920x1080`.
2. Encodes desktop and mobile `.mp4` files with `+faststart` and no audio (`-an`).
3. Extracts first-frame (`*-poster.jpg`) and last-frame (`*-poster-end.jpg`) posters into `public/images/`.
4. Verifies via `ffprobe` that **zero P or B frames** exist (only `I` frames) and enforces the byte-size budgets.
