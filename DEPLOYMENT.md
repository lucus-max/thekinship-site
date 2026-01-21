# Deployment Guide for Vercel

## Quick Setup (5 minutes)

### Step 1: Prepare Your Repository
```bash
# Navigate to the project directory
cd thekinship-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - The Kinship website"

# Create a GitHub repository and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/thekinship-site.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository `thekinship-site`

3. **Configure (Auto-detected):**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (auto-detected)
   - Build Command: `next build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site is now live at `https://your-project.vercel.app`

### Step 3: Add Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `thekinship.ai` or `www.thekinship.ai`
4. Follow DNS configuration instructions:
   - Add A record: `76.76.21.21`
   - Add CNAME record: `cname.vercel-dns.com`
5. Wait for DNS propagation (up to 48 hours, usually much faster)

## Environment Variables

This project doesn't require any environment variables for basic deployment.

If you need to add any in the future:
1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy to apply changes

## Automatic Deployments

Once connected to GitHub:
- **Production**: Every push to `main` branch triggers a production deployment
- **Preview**: Every push to other branches creates a preview deployment
- **Pull Requests**: Get unique preview URLs for testing

## Performance Optimizations

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Zero-config deployment

## Monitoring & Analytics

Enable Vercel Analytics:
1. Go to your project dashboard
2. Navigate to "Analytics" tab
3. Click "Enable Analytics"
4. Add `<Analytics />` component to `app/layout.tsx` if desired

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first to catch errors

### 404 Errors
- Ensure file structure matches Next.js 14 App Router conventions
- Check that files are in the `app` directory, not `pages`

### Slow Performance
- Optimize images (use WebP format, proper sizing)
- Enable Image Optimization in Vercel settings
- Check Lighthouse scores in DevTools

## Support

For Vercel-specific issues:
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

For site-specific issues:
- Contact: info@thekinship.ai
