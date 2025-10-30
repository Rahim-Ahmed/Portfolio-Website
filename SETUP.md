# 🚀 Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-actual-github-username
NEXT_PUBLIC_GOOGLE_SCHOLAR_ID=your-scholar-id
GITHUB_TOKEN=ghp_your_token_here (optional but recommended)
```

**How to get your Google Scholar ID:**
1. Go to https://scholar.google.com
2. Search for your name and click on your profile
3. Look at the URL: `https://scholar.google.com/citations?user=SCHOLAR_ID`
4. Copy the `SCHOLAR_ID` part

**How to create a GitHub Token (optional):**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select `public_repo` scope
4. Copy and paste into `.env.local`

### 3. Update Personal Information

Edit `config/site-config.ts` with your details:
- Name, title, bio
- Education history
- Work experience
- Skills
- Contact information
- Social media handles

### 4. Add Your Resume/CV

Place your resume PDF in the `public` folder and ensure the filename matches what's in `site-config.ts`:

```typescript
resume: "/Ab. Rahim_s CV.pdf",  // Update this filename
```

### 5. Run Development Server

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
