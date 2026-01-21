# 🚀 Quick Start Guide - The Kinship Website

## What You've Got

A fully custom Next.js website with:
- ✨ Cinematic design with film grain effects
- 🎭 Dramatic typography (Playfair Display + Outfit)
- 🎬 Scroll-triggered animations
- 📱 Fully responsive
- ⚡ Optimized for performance
- 🎨 Your brand colors (cinema black, gold accents)

## Get It Running (3 Steps)

### 1. Install Dependencies
```bash
cd thekinship-site
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: http://localhost:3000

That's it! Your site is running locally.

## Deploy to Vercel (5 minutes)

### Option A: Quick Deploy
1. Push to GitHub
2. Go to vercel.com
3. Click "Import Project"
4. Select your repo
5. Click "Deploy"

**Done!** Your site is live.

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts → Site deployed!

## Customize Your Site

### Update Content

**Projects** - Edit `components/Showcase.tsx`:
```typescript
const projects = [
  {
    title: 'Your New Project',
    subtitle: 'Subtitle',
    description: '...',
    category: 'Category',
    video: '/path/to/image.jpg',
  },
]
```

**Services** - Edit `components/Services.tsx`:
```typescript
const services = [
  {
    number: '01',
    title: 'Your Service',
    description: '...',
    highlights: ['Item 1', 'Item 2'],
  },
]
```

**Contact Email** - Find/replace `info@thekinship.ai` with your email

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'cinema-black': '#0a0a0a',
  'cinema-gold': '#d4af37',
  // ... customize
}
```

### Add Your Images
1. Put images in `public/` folder
2. Reference them: `/image-name.jpg`
3. Or use external URLs (already set up for Squarespace CDN)

## Project Structure

```
thekinship-site/
├── app/
│   ├── layout.tsx          # Site wrapper (fonts, metadata)
│   ├── page.tsx            # Homepage (assembles all sections)
│   └── globals.css         # Global styles + animations
├── components/
│   ├── Navigation.tsx      # Top nav bar
│   ├── Hero.tsx           # Big headline section
│   ├── Showcase.tsx       # Project gallery
│   ├── Services.tsx       # What you do
│   ├── About.tsx          # Your story
│   ├── Contact.tsx        # CTA section
│   └── Footer.tsx         # Bottom section
└── public/                # Your images go here
```

## Common Tasks

### Build for Production
```bash
npm run build
npm run start
```

### Check for Errors
```bash
npm run lint
```

### Add a New Page
1. Create `app/new-page/page.tsx`
2. Export a component:
```typescript
export default function NewPage() {
  return <div>Your content</div>
}
```
3. Access at `/new-page`

## Tips

- **Images**: Use WebP format for best performance
- **Videos**: Replace placeholder images with actual video embeds
- **SEO**: Update metadata in `app/layout.tsx`
- **Analytics**: Add Vercel Analytics in project settings

## Need Help?

- Full docs: See `README.md`
- Deployment: See `DEPLOYMENT.md`
- Issues: info@thekinship.ai

---

**Pro Tip**: Before deploying, replace the placeholder images with your actual project images/videos for the best first impression!
