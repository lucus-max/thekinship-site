# The Kinship - Next.js Website

A cinematic, production-grade website for The Kinship AI Creative Studio, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🎬 Features

- **Cinematic Design**: Film-industry aesthetic with dramatic typography and scroll-driven animations
- **Performance Optimized**: Built on Next.js 14 with App Router for optimal performance
- **Responsive**: Fully responsive design that works beautifully on all devices
- **Animations**: Smooth scroll-triggered animations using Framer Motion
- **Type-Safe**: Built with TypeScript for reliability and developer experience
- **SEO Optimized**: Proper metadata, semantic HTML, and Open Graph tags

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
thekinship-site/
├── app/
│   ├── globals.css          # Global styles with cinematic theme
│   ├── layout.tsx            # Root layout with fonts and metadata
│   └── page.tsx              # Main homepage
├── components/
│   ├── Navigation.tsx        # Sticky navigation header
│   ├── Hero.tsx             # Hero section with dramatic typography
│   ├── Showcase.tsx         # Project showcase with hover effects
│   ├── Services.tsx         # Services grid with animations
│   ├── About.tsx            # About section with philosophy
│   ├── Contact.tsx          # Contact CTA section
│   └── Footer.tsx           # Site footer
├── public/                   # Static assets
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Cinema Black**: #0a0a0a (Primary background)
- **Cinema Charcoal**: #1a1a1a (Secondary background)
- **Cinema Silver**: #c0c0c0 (Primary text)
- **Cinema Gold**: #d4af37 (Accent color)
- **Cinema Red**: #8b0000 (Accent color)

### Typography
- **Display Font**: Playfair Display (Headlines, dramatic text)
- **Body Font**: Outfit (Body text, UI elements)

### Animations
- Scroll-triggered fade and slide animations
- Hover effects on cards and buttons
- Film grain effect overlay
- Smooth transitions throughout

## 🌐 Deployment to Vercel

### Quick Deploy

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"

### Environment Variables
No environment variables are required for basic deployment.

### Custom Domain
1. In your Vercel project dashboard, go to Settings → Domains
2. Add your custom domain (e.g., thekinship.ai)
3. Follow Vercel's DNS configuration instructions
4. Update your domain's DNS records as instructed

## 🛠 Customization

### Adding New Projects
Edit `/components/Showcase.tsx` and add new entries to the `projects` array:

```typescript
{
  title: 'Your Project',
  subtitle: 'Project Subtitle',
  description: 'Project description...',
  category: 'Category Name',
  video: '/path/to/image.jpg',
}
```

### Updating Services
Edit `/components/Services.tsx` and modify the `services` array.

### Changing Colors
Edit `/tailwind.config.js` to update the color scheme:

```javascript
colors: {
  'cinema-black': '#0a0a0a',
  // ... add or modify colors
}
```

### Adding Pages
Create new files in the `app` directory:
```
app/
├── about/
│   └── page.tsx
├── case-studies/
│   └── page.tsx
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Performance Tips

1. **Images**: Replace placeholder images with optimized versions
2. **Lazy Loading**: Components use Framer Motion's `useInView` for lazy animation
3. **Code Splitting**: Next.js automatically splits code by route
4. **Font Optimization**: Google Fonts are optimized via next/font

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

This is a custom website build. For changes or updates, contact the development team.

## 📄 License

© 2024-2025 The Kinship. All rights reserved.

## 🆘 Support

For technical support or questions about deployment:
- Email: info@thekinship.ai

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion.
