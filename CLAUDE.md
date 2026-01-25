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
│   ├── Hero.tsx          # Landing - parallax layers, logo, CTAs
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
- **Logo:** "THE KINSHIP" - text-lg/text-xl (30% smaller than v1.6), vertically centered
- **Desktop:** Horizontal links (Services, Work, About, Contact button)
- **Mobile:** Hamburger menu with compact dropdown (not full-screen)
  - Animates from top-right corner
  - 70% opacity black background with backdrop blur
  - Same links as desktop in same order

### Hero.tsx
- **Parallax layers:** Background (floatingman_bg.png) and foreground (floatingman_fg_v2.png)
- **Loading gate:** Both images must load before hero fades in (prevents partial load flash)
- **Desktop:** Mouse parallax (bg ±15px inverted, fg ±30px) + scroll parallax
- **Mobile:** Scroll parallax only (mouse parallax disabled)
- **Gradients:** Top fade (black→transparent) and bottom fade (transparent→black)
- **Logo Wireframe (desktop):**
  - Angular lines trace letter shapes with dots at vertices
  - Reveals on cursor hover with 350px radius, smooth falloff
  - Outer points connect to nearest constellation stars
  - Connections animate in sync with constellation rotation
  - Scaled 1.2x horizontally, offset 75px right

### Showcase.tsx
- **Heading:** "WORK"
- **Layout:** Tight grid with zero gaps
  - First 3 videos: 3 columns (featured row)
  - Remaining: 4 columns desktop, 3 tablet, 2 mobile
- **3D Tilt Effect (desktop):** Entire grid subtly tilts toward mouse position (±2.75° Y, ±1.75° X)
- **Desktop hover animation (distance-based):**
  - Default (cursor off grid): All tiles at 80% brightness
  - Smooth "circle" effect around cursor with 300px radius
  - Brightness: 80% base + up to 20% boost based on proximity
  - Z-movement: 55px (featured) / 78px (others) max, scales with proximity
  - Gold border opacity follows same falloff curve
  - Uses brightness filter (not opacity) for cleaner visual
- **Desktop interaction:** Cursor-following semi-transparent info box with title, subtitle, description
- **Mobile scroll animation:**
  - Sweet zone (25-50% from viewport top): 100% opacity + 20px z-lift
  - Above/below sweet zone: Graduates to 50% opacity + 0 z at screen edges
  - Tiles rise and brighten as they scroll into sweet zone
- **Mobile:** Title overlays bottom of each thumbnail
- **Video modal:** Custom player with mute/unmute, progress bar, fullscreen
  - Cross-browser compatible: uses `canplay` event (not `canplaythrough`) for Firefox support
  - Handles autoplay blocks gracefully with play button overlay
  - Separate states for load errors vs autoplay policy blocks
  - Error state with retry button

### ParallaxOverlay.tsx
- 3D constellation sphere rendered on Canvas
- **Desktop:** 300 stars, mouse-reactive rotation, 80% base opacity (20% reduction from v1.6)
- **Mobile:** 150 stars, touch-reactive rotation, 50% smaller dots, 48% opacity
- Edge vignette effect (stronger opacity at screen edges)
- Gold color (#D4AF37) matching site branding
- z-index: 1 (above background, below content)
- **Exports `constellationStars`:** Shared array of projected star positions for wireframe connections

### Services.tsx (What I Do)
1. **Creative Direction** - "For post houses, agencies or brands." - Concept, Story, Brand, Execution
2. **Generative AI** - "Local and secure, or tailored to your existing workflows." - Image Generation, Image to Video, Reference to Video, Upscaling
3. **Finishing** - "An end to end wheelhouse, with compositing at its heart." - Edit, VFX, Grading, Finishing
- **Layout:** Left-aligned headings, subtitles, and bullet points
- **Headings:** Reduced size (text-xl lg:text-2xl) to fit on single line

### About.tsx (Philosophy)
- Ideas First
- Ethical AI
- Partnership, Not Transactions
- **Mobile:** Center-justified text and headings

### Contact.tsx
- "Let's Create" heading with email CTA
- Mailto link opens in separate window (target="_blank")
- Email: info@thekinship.ai

## 7. Mobile Experience

### Viewport & Scaling
- Proper viewport meta tag in layout.tsx
- `initialScale: 1`, `maximumScale: 5`, `userScalable: true`

### Navigation
- Hamburger menu (3 animated lines → X)
- Compact dropdown from top-right (not full-screen)
- 70% opacity background, backdrop blur
- Same links as desktop: Services, Work, About, Contact

### Constellation Overlay
- Reduced to 150 stars for performance
- 50% smaller dots, 40% less opacity than desktop
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
| Sky F1 Titles | sky-f1-2023.mp4 |
| Seat Idents | seat-idents.mp4 |
| Three Phones Are Good | three-phones-are-good.mp4 |
| Stormzy Toxic Trait | stormzy-toxic-trait.mp4 |
| Lego Titan | lego-titan.mp4 |
| Deliveroo Ultimate Gift | deliveroo-ultimate-gift.mp4 |
| Google Pixel | google-pixel.mp4 |
| Lions Series Titles | lions-series-2021.mp4 |
| Legoland Mythica | legoland-mythica.mp4 |
| EE Gamer | ee-gamer.mp4 |
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
- Check video URL in browser directly with curl: `curl -I "https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/filename.mp4"`
- 404 = file missing from R2, needs upload

### No audio on videos
- Browser autoplay policy blocks audio - user sees "Click to unmute"
- Ensure video has AAC audio (not PCM)

### Autoplay blocked (play button shows)
- Normal browser behavior - user clicks play button to start
- Firefox is stricter than Chrome/Safari about autoplay
- Video modal handles this with `needsInteraction` state

### Deployment not updating
- Check Vercel dashboard for build errors
- Force redeploy: `git commit --allow-empty -m "Redeploy" && git push`

### Mobile issues
- Check viewport meta in layout.tsx
- Verify touch events in ParallaxOverlay.tsx
- Test hamburger menu on real device

## 12. Version History

| Version | Description |
|---------|-------------|
| v1.1 | Base site with all 19 videos, constellation overlay, mobile support |
| v1.2 | 3D grid tilt, hover pop-forward effect, compact mobile nav dropdown, mobile constellation refinements |
| v1.3 | Hero parallax layers, video reordering, grid tilt inversion, mailto opens in new window |
| v1.4 | Adjacent-only hover dimming (with diagonals), gold border on hovered tiles, Safari video fixes, Hero foreground sizing |
| v1.5 | About section copy updates |
| v1.6 | Firefox video fix - use `canplay` event, play button overlay for autoplay blocks, uploaded missing R2 videos |
| v1.7 | Logo wireframe constellation - cursor-reveal wireframe traces logo letters, connects to animated constellation stars. Navigation title 30% smaller. Services center-justified on desktop with bookend bullets. Reduced section gaps. Video grid: distance-based brightness/z falloff (smooth circle effect), 30% increased z-movement, gold border follows animation. Constellation opacity reduced 20%. |
| v1.8 | Services redesign - replaced long descriptions with short subtitles, left-aligned all content (headings, subtitles, bullets), reduced heading size for single-line titles. About section copy trimmed. |
