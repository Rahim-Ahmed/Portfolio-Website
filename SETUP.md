# Portfolio Website - Complete Setup Guide

This guide will walk you through setting up and deploying your portfolio website step by step.

## 📋 Table of Contents
1. [Initial Setup](#initial-setup)
2. [Configuration](#configuration)
3. [Adding Your Content](#adding-your-content)
4. [Testing Locally](#testing-locally)
5. [Deployment](#deployment)
6. [Post-Deployment](#post-deployment)

---

## 🚀 Initial Setup

### Step 1: Install Node.js
1. Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)
2. Verify installation:
```bash
node --version  # Should show v18.x or higher
npm --version
```

### Step 2: Get the Project Files
```bash
# If using Git
git clone https://github.com/YOUR_USERNAME/portfolio-website.git
cd portfolio-website

# Or extract the ZIP file and navigate to the folder
cd portfolio-website
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install all required packages (~2-3 minutes).

---

## ⚙️ Configuration

### Step 1: Environment Variables

1. Copy the example file:
```bash
# Windows (PowerShell)
Copy-Item .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

2. Edit `.env.local` with your information:

```bash
NEXT_PUBLIC_GITHUB_USERNAME=Rahim-Ahmed
NEXT_PUBLIC_GOOGLE_SCHOLAR_ID=OjXnAP4AAAAJ
GITHUB_TOKEN=ghp_xxxxxxxxxxxx  # Optional but recommended
```

**How to find your Google Scholar ID:**
1. Go to your Google Scholar profile
2. Look at the URL: `https://scholar.google.com/citations?user=YOUR_ID`
3. Copy the `YOUR_ID` part

**How to create a GitHub Personal Access Token:**
1. Go to GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic) → Generate new token
3. Select scope: `public_repo`
4. Copy the token (starts with `ghp_`)
5. Paste in `.env.local`

### Step 2: Personal Information

Edit `config/site-config.ts`:

```typescript
export const config = {
  personal: {
    name: "Your Full Name",
    title: "Your Professional Title",
    email: "your.email@example.com",
    phone: "+1234567890",
    location: "Your City, Country",
    bio: "Your professional bio...",
    avatar: "/your-photo.jpg",
    resume: "/Your_Name_CV.pdf",
    social: {
      github: "your-github-username",
      linkedin: "your-linkedin-username",
      twitter: "your-twitter-handle",  // Optional
      googleScholar: "your-scholar-id",
    },
  },
  
  // Update education, experience, and skills sections
  // ... (see comments in the file)
}
```

---

## 📝 Adding Your Content

### Profile Photo
1. Add your photo to `public/` folder
2. Rename it to `new.jpg` or update `avatar` path in config
3. Recommended: Square image, at least 500x500px

### CV/Resume PDF
1. Add your CV to `public/` folder
2. Use filename: `Your_Name_CV.pdf` (no spaces or special characters recommended)
3. Update `resume` path in config to match your filename

### Institution Logos (Optional)
For the Education section hover effect:
1. Create folder: `public/institutions/`
2. Add logo images:
   - `buet.png` (or your institution names)
   - `ewu.png`
   - etc.
3. Update image paths in `config/site-config.ts` education section

**Tip:** Use transparent PNG files for best results.

---

## 🧪 Testing Locally

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Open in Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

### Step 3: Check All Sections
- ✅ Hero section displays your name with typing animation
- ✅ About section shows your skills
- ✅ Education cards display correctly (hover to see institution logos)
- ✅ Experience section shows your work history
- ✅ Projects section fetches your GitHub repos
- ✅ Live Projects section displays demo apps
- ✅ Research section shows Google Scholar publications
- ✅ Contact section displays your information
- ✅ Dark mode toggle works
- ✅ All buttons are clickable
- ✅ Download CV button works

### Step 4: Test Production Build
Before deploying, test the production build:
```bash
npm run build
npm start
```

If build succeeds with no errors, you're ready to deploy! 🚀

---

## 🌐 Deployment

### Option A: Deploy to Vercel (Recommended)

**Why Vercel?**
- ✅ Free for personal projects
- ✅ Made by Next.js creators
- ✅ Automatic deployments on git push
- ✅ Global CDN
- ✅ Free SSL certificate
- ✅ Zero configuration

**Steps:**

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Vercel auto-detects Next.js settings ✅
   
3. **Add Environment Variables:**
   In Vercel project settings → Environment Variables, add:
   - `NEXT_PUBLIC_GITHUB_USERNAME` = `your-username`
   - `NEXT_PUBLIC_GOOGLE_SCHOLAR_ID` = `your-id`
   - `GITHUB_TOKEN` = `your-token` (optional)

4. **Deploy:**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your site is live! 🎉

5. **Get Your URL:**
   - Default: `your-project.vercel.app`
   - Add custom domain in settings (optional)

### Option B: Deploy to Netlify

1. Push code to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. New site from Git → Choose repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables in Site settings
6. Deploy!

### Option C: Vercel CLI (Quick Deploy)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🎯 Post-Deployment

### Verify Everything Works
1. ✅ Visit your live URL
2. ✅ Test all sections scroll smoothly
3. ✅ Check mobile responsiveness
4. ✅ Verify Projects section loads GitHub repos
5. ✅ Verify Research section loads publications
6. ✅ Test dark mode toggle
7. ✅ Try Download CV button
8. ✅ Test all navigation links
9. ✅ Check contact information displays correctly

### Continuous Deployment
Once connected to GitHub:
- Every `git push` triggers automatic deployment
- Changes go live in ~2 minutes
- Preview deployments for pull requests
- Rollback to previous deployments if needed

### Custom Domain (Optional)

**On Vercel:**
1. Go to Project Settings → Domains
2. Add your domain (e.g., `yourname.com`)
3. Update DNS settings with your domain provider
4. Vercel handles SSL automatically

**DNS Settings Example:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

Or use CNAME:
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Projects Not Loading
- ✅ Check `NEXT_PUBLIC_GITHUB_USERNAME` is correct
- ✅ Add `GITHUB_TOKEN` to increase rate limit (60 → 5000 requests/hour)
- ✅ Check browser console for errors
- ✅ Verify GitHub username has public repositories

### Research Section Not Loading
- ✅ Verify `NEXT_PUBLIC_GOOGLE_SCHOLAR_ID` is correct
- ✅ Google Scholar may block requests due to rate limiting
- ✅ Check browser console for errors
- ✅ Consider adding caching for production

### Environment Variables Not Working
- ✅ Must start with `NEXT_PUBLIC_` for client-side access
- ✅ Restart dev server after changing `.env.local`
- ✅ In Vercel, redeploy after adding/changing variables
- ✅ Check variable names match exactly (case-sensitive)

### Download CV Button Not Working
- ✅ Ensure PDF is in `public/` folder
- ✅ Check filename matches `resume` path in config
- ✅ Avoid spaces in filename (use underscores)
- ✅ Verify file extension is `.pdf`

### Hydration Errors
- ✅ Already handled in Hero component with `isMounted` pattern
- ✅ If you see warnings, ensure client components have `"use client"` directive
- ✅ Check no SSR/client mismatches

### Images Not Loading
- ✅ All images must be in `public/` folder
- ✅ Reference with leading slash: `/image.jpg`
- ✅ Check file extensions match (case-sensitive on Linux)

---

## 🔄 Updating Your Portfolio

### Add New Project
- Push new project to GitHub
- Portfolio auto-updates from GitHub API
- No manual changes needed ✅

### Add New Publication
- Add publication to Google Scholar
- Portfolio auto-fetches updates
- May take a few hours to appear

### Update Personal Content
1. Edit `config/site-config.ts`
2. Save changes
3. Commit and push:
```bash
git add .
git commit -m "Update: [description]"
git push
```
4. Vercel auto-deploys in ~2 minutes

### Update Institution Logos
1. Add/replace images in `public/institutions/`
2. Commit and push
3. Auto-deploys

---

## 🛠️ Maintenance

### Keep Dependencies Updated
```bash
npm outdated           # Check for updates
npm update            # Update packages
npm audit             # Check security vulnerabilities
npm audit fix         # Fix vulnerabilities
```

### Monitor Performance
- Use Vercel Analytics (free in dashboard)
- Check Lighthouse scores in Chrome DevTools
- Monitor GitHub API rate limits
- Check Google Scholar scraping success rate

### Backup Checklist
- ✅ Code is on GitHub
- ✅ Environment variables saved in Vercel
- ✅ Static assets committed to repository
- ✅ Configuration in `site-config.ts`

---

## 📚 Resources & Support

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **GitHub API**: [docs.github.com/rest](https://docs.github.com/rest)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

---

## 📋 Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Run production build locally
npm run lint         # Check code quality

# Git Commands
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub (triggers auto-deploy on Vercel)
git pull             # Pull latest changes

# Deployment
vercel               # Deploy preview to Vercel
vercel --prod        # Deploy to production
vercel logs          # View deployment logs
```

---

## ✅ Pre-Launch Checklist

- [ ] Updated all personal info in `config/site-config.ts`
- [ ] Added profile photo (`public/new.jpg` or custom path)
- [ ] Added CV PDF (`public/Your_Name_CV.pdf`)
- [ ] Added institution logos to `public/institutions/` (optional)
- [ ] Created and configured `.env.local`
- [ ] Tested locally with `npm run dev`
- [ ] Production build succeeds with `npm run build`
- [ ] Pushed code to GitHub
- [ ] Deployed to Vercel/Netlify
- [ ] Verified live site works on desktop
- [ ] Verified live site works on mobile
- [ ] Tested all navigation links
- [ ] Tested Download CV button
- [ ] Verified Projects section loads
- [ ] Verified Research section loads
- [ ] Tested dark mode toggle
- [ ] Added custom domain (optional)
- [ ] Shared portfolio link! 🎉

---

## 🎉 Congratulations!

Your portfolio is now live and ready to showcase your work to the world!

**Next Steps:**
- Share your portfolio link on LinkedIn
- Add link to your GitHub profile README
- Include in your resume/CV
- Share with potential employers
- Update regularly with new projects and publications

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**


```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Next Steps

1. **Customize Colors**: Edit `app/globals.css` to change theme colors
2. **Add Profile Picture**: Place your image in `public/` folder
3. **Update Navigation**: Modify `components/Header.tsx` if needed
4. **Add More Sections**: Create components in `components/sections/`

## Common Issues

### GitHub API not working?
- Make sure `NEXT_PUBLIC_GITHUB_USERNAME` is set correctly
- Add `GITHUB_TOKEN` to increase rate limits

### Google Scholar not loading?
- Check if `NEXT_PUBLIC_GOOGLE_SCHOLAR_ID` is correct
- Google may block automated requests (this is expected)
- Consider using a proxy or alternative API service

### TypeScript errors in editor?
- Run `npm install` to ensure all dependencies are installed
- Restart VS Code TypeScript server

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

## Need Help?

Check the `.github/copilot-instructions.md` file for detailed architecture and development guidance.
