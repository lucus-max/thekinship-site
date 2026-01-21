# THE KINSHIP AI | Project Intelligence

## 1. Project Context
- **Identity:** Luke Todd's freelance portfolio - 25 years of VFX mastery + Generative AI expertise
- **Aesthetic:** "Cinematic Tech." Minimalist, noir-modernist (Pure blacks, high-contrast typography, grain textures)
- **Live Site:** https://www.thekinship.ai

## 2. Technical Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS with custom cinema theme
- **Motion:** Framer Motion
- **Deployment:** Vercel (auto-deploys from GitHub)
- **Video Hosting:** Cloudflare R2 CDN
- **Typography:** PT Serif Caption (Google Fonts)

## 3. Deployment Architecture

### GitHub Repository
- **Repo:** https://github.com/lucus-max/thekinship-site
- **Branch:** main
- **Auto-deploy:** Push to main triggers Vercel deployment

### Vercel
- **Project:** thekinship-site
- **Domain:** www.thekinship.ai, thekinship.ai
- **Auto-deploys** on every push to main

### Cloudflare R2 (Video CDN)
- **Bucket URL:** https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/
- **Videos stored in root folder** (not /video/ subfolder)
- **Format:** MP4 (H.264 + AAC) for web compatibility
- **CORS:** Enabled for all origins

## 4. File Structure
```
thekinship-site/
├── app/
│   ├── globals.css       # Global styles, custom cursor, grain texture, mobile cursor override
│   ├── layout.tsx        # Root layout with fonts, viewport meta
│   └── page.tsx          # Main page assembling all sections
├── components/
│   ├── Navigation.tsx    # Header nav - desktop links + mobile hamburger menu
│   ├── Hero.tsx          # Landing - floatingman bg, logo, CTAs
│   ├── Showcase.tsx      # Video portfolio - tight grid + cursor-following info
│   ├── Services.tsx      # "What I Do" - 3 cards + tool logos
│   ├── About.tsx         # Philosophy - 3 value cards
│   ├── Contact.tsx       # "Let's Create" CTA
│   ├── Footer.tsx        # Site footer
│   └── ui/
│       ├── ParallaxOverlay.tsx  # 3D constellation sphere (Canvas)
│       ├── CustomCursor.tsx     # Custom cursor (desktop only)
│       └── SmoothScroll.tsx     # Lenis smooth scrolling
├── lib/
│   └── motion.ts         # Framer Motion variants
├── public/
│   ├── logos/            # Software logos (ComfyUI, Weavy, Nuke, DaVinci)
│   ├── media/            # Thumbnails, images
│   └── video/            # Local video copies (not deployed)
├── elements/             # Source assets (not deployed)
├── tailwind.config.ts    # Custom colors
└── next.config.js        # Next.js config (remotePatterns for images)
```

## 5. How to Update the Site

### Code Changes
1. Make edits to files in this project
2. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Vercel auto-deploys within 1-2 minutes

### Adding/Updating Videos
1. Convert to MP4 (H.264 + AAC):
   ```bash
   ffmpeg -i input.mov -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k -movflags +faststart output.mp4
   ```
2. Upload to Cloudflare R2 bucket (root folder)
3. Update `components/Showcase.tsx` with new video entry:
   ```typescript
   {
     title: 'VIDEO TITLE',
     subtitle: 'Role/Credits',
     description: 'Production Company',
     category: 'Brand Work',
     image: '/media/thumbnail.jpg',
     video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/filename.mp4',
   }
   ```
4. Create thumbnail (extract frame from video):
   ```bash
   ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 -q:v 2 thumbnail.jpg
   ```
5. Add thumbnail to `public/media/`
6. Commit and push

### Updating Thumbnails
1. Replace images in `public/media/` with new files (same filenames)
2. Commit and push:
   ```bash
   git add public/media/
   git commit -m "Update thumbnails"
   git push
   ```

## 6. Key Components

### Navigation.tsx
- Fixed header with glassmorphism on scroll
- **Desktop:** Horizontal links (Work, Services, About, Contact)
- **Mobile:** Hamburger menu with full-screen overlay
  - "View The Work" prominently featured in gold
  - Animated open/close with body scroll lock

### Showcase.tsx
- **Heading:** "FEATURED WORK"
- **Layout:** Tight grid with zero gaps
  - Desktop: 4 columns
  - Tablet: 3 columns
  - Mobile: 2 columns
- **Hover animation:** Tiles scale up 15% with Framer Motion (0.7s ease-out), z-index boost
- **Desktop interaction:** Cursor-following semi-transparent info box with title, subtitle, description
- **Mobile:** Title overlays bottom of each thumbnail
- **Video modal:** Custom player with mute/unmute, progress bar, fullscreen
- **Performance:** Preloads video on hover
- **"MORE TO COME":** Final grid slot with centered gold text placeholder

### ParallaxOverlay.tsx
- 3D constellation sphere rendered on Canvas
- **Desktop:** 300 stars, mouse-reactive rotation
- **Mobile:** 150 stars (performance), touch-reactive rotation
- Edge vignette effect (stronger opacity at screen edges)
- Gold color (#D4AF37) matching site branding
- z-index: 0 (behind content)

### Services.tsx (What I Do)
1. **Creative Direction** - Concept, Story, Brand, Execution
2. **Generative AI** - Image Generation, Image to Video, Reference to Video, Upscaling
3. **Finishing** - Edit, VFX, Grading, Finishing

### About.tsx (Philosophy)
- Ideas First
- Ethical AI
- Partnership, Not Transactions

## 7. Mobile Experience

### Viewport & Scaling
- Proper viewport meta tag in layout.tsx
- `initialScale: 1`, `maximumScale: 5`, `userScalable: true`

### Navigation
- Hamburger menu (3 animated lines → X)
- Full-screen overlay with centered links
- Body scroll locked when menu open

### Constellation Overlay
- Reduced to 150 stars for performance
- Touch event support (touchstart, touchmove)
- Responds to finger movement like mouse on desktop

### Cursor
- Custom constellation cursor on desktop only
- Default system cursor on touch devices
- Media query: `@media (hover: none) and (pointer: coarse)`

### Showcase Grid
- Responsive columns (2 → 3 → 4)
- Title visible on thumbnail (no cursor tooltip on mobile)

## 8. Design Tokens

### Colors (tailwind.config.ts)
- `cinema-black`: #000000
- `cinema-gold`: #D4AF37
- `cinema-silver`: #C0C0C0
- `cinema-card`: #0A0A0A
- `cinema-charcoal`: #1A1A1A

### Typography
- Headers: uppercase, tracking-wide, font-bold
- Body: text-cinema-silver/80, leading-relaxed

### Custom Cursor
- Constellation-style SVG cursor with nodes and connecting lines
- Defined in `app/globals.css`
- Disabled on touch devices

## 9. Current Videos (19 total)

| Title | File |
|-------|------|
| VFX Showreel | Showreel_2025_Exported.mp4 |
| AI Launch Film | ai-film.mp4 |
| Nissan Campaign | nissan.mp4 |
| Volvo ES90 | volvo-es90.mp4 |
| Nissan The Drop | nissan-the-drop.mp4 |
| Deliveroo Ultimate Gift | deliveroo-ultimate-gift.mp4 |
| Legoland Mythica | legoland-mythica.mp4 |
| EE Gamer | ee-gamer.mp4 |
| Stormzy Toxic Trait | stormzy-toxic-trait.mp4 |
| Lego Titan | lego-titan.mp4 |
| Sky F1 Titles | sky-f1-2023.mp4 |
| Google Pixel | google-pixel.mp4 |
| Lions Series Titles | lions-series-2021.mp4 |
| Seat Idents | seat-idents.mp4 |
| Three Phones Are Good | three-phones-are-good.mp4 |
| Cadburys Fingers | cadburys-fingers.mp4 |
| Nike KDI | nike-kdi.mp4 |
| VW GTE | vw-gte.mp4 |
| Three Make It Right | three-make-it-right.mp4 |

## 10. Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Deploy (just push to main)
git add . && git commit -m "message" && git push

# Convert video to web-friendly MP4
ffmpeg -i input.mov -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k -movflags +faststart output.mp4

# Extract thumbnail from video
ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 -q:v 2 thumbnail.jpg
```

## 11. Troubleshooting

### Videos not loading
- Check CORS is enabled on R2 bucket
- Verify filename matches exactly (case-sensitive)
- Check video URL in browser directly

### No audio on videos
- Browser autoplay policy blocks audio - user sees "Click to unmute"
- Ensure video has AAC audio (not PCM)

### Deployment not updating
- Check Vercel dashboard for build errors
- Force redeploy: `git commit --allow-empty -m "Redeploy" && git push`

### Mobile issues
- Check viewport meta in layout.tsx
- Verify touch events in ParallaxOverlay.tsx
- Test hamburger menu on real device
