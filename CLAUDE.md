# THE KINSHIP AI | Project Intelligence

## 1. Project Context
- **Identity:** Luke Todd's freelance portfolio - 25 years of VFX mastery + Generative AI expertise
- **Aesthetic:** "Cinematic Tech." Minimalist, noir-modernist (Pure blacks, high-contrast typography, grain textures)
- **Live Site:** https://www.thekinship.ai

## 2. Technical Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
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
│   ├── globals.css       # Global styles, custom cursor, grain texture
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Main page assembling all sections
├── components/
│   ├── Hero.tsx          # Landing - floatingman bg, logo, CTAs
│   ├── Showcase.tsx      # Video portfolio (19 projects) + modal player
│   ├── Services.tsx      # "What I Do" - 3 cards + tool logos
│   ├── About.tsx         # Philosophy - 3 value cards + stats
│   ├── Contact.tsx       # "Let's Create" CTA
│   ├── Footer.tsx        # Site footer
│   └── ui/
│       └── ParallaxOverlay.tsx  # 3D constellation sphere (Canvas)
├── lib/
│   └── motion.ts         # Framer Motion variants
├── public/
│   ├── logos/            # Software logos (ComfyUI, Weavy, Nuke, DaVinci)
│   ├── media/            # Thumbnails, images
│   └── video/            # Local video copies (not deployed)
├── elements/             # Source assets (not deployed)
└── tailwind.config.ts    # Custom colors
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

## 6. Key Components

### Showcase.tsx
- 19 video projects with custom modal player
- Videos load from Cloudflare R2
- Hover preloads videos for faster playback
- "Click to unmute" overlay for autoplay restrictions
- Loading spinner while buffering

### ParallaxOverlay.tsx
- 3D constellation sphere (300 stars)
- Canvas-based rendering for performance
- Mouse-reactive rotation
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

## 7. Design Tokens

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

## 8. Current Videos (19 total)

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

## 9. Quick Commands

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

## 10. Troubleshooting

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
