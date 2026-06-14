# Assets manifest — drop your real files here

The site runs end-to-end with elegant placeholders. Replace them by adding the
files below; nothing else needs to change except swapping the placeholder media
component for `next/image` / `<video>` (noted inline in the code).

```
/public/assets/
  me/
    portrait.jpg            # your photo — square-ish, ~1200×1200. Rendered duotone, clean on hover.
                            #   used by: src/components/sections/About.tsx (MediaPlaceholder)
  projects/
    trustly/                # mobile app → phone frame
      poster.jpg            #   first frame / still (~1080×2280)
      demo.mp4 + demo.webm  #   short, muted, low-bitrate loop (autoplay in view)
      shot-1.png … shot-n   #   screenshots
    billai/                 # web app → browser frame (live: billai-omega.vercel.app)
      poster.jpg            #   ~1600×1000
      demo.mp4 + demo.webm
      shot-1.png …
    lexai/                  # web → browser frame (live: lexai-rho.vercel.app)
    voiceserve/             # web → browser frame (live: pet-pooja-kappa.vercel.app)
    hireai/                 # web → browser frame
    blockestate/            # web → browser frame
  og/
    (auto-generated)        # OG image is generated at /opengraph-image; favicon at /icon.svg.
                            # Drop a custom og.png (1200×630) here only if you want to override.
```

## Optimization checklist (do on import)
- Images: export AVIF/WebP, correct dimensions, no upscaling. Use `next/image` with `sizes`.
- Video: ship **both** `demo.mp4` (H.264) and `demo.webm` (VP9/AV1). Keep loops short
  (~6–12s), low bitrate for the in-view autoplay version, and always provide `poster.jpg`.
  Full-quality only inside the lightbox.
- Everything below the fold lazy-loads. Avoid layout shift — set width/height.

## Where each asset is consumed
- Portrait → `src/components/sections/About.tsx`
- Project media (frame + lightbox) → `src/components/sections/ProjectCase.tsx` (`MediaPlaceholder`)
- Device frames (phone/browser chrome) → `src/components/ui/DeviceFrame.tsx`
