# Portfolio Website - Ab Rahim Ahmed Sowrov

A modern, fully responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features dynamic GitHub project integration, Google Scholar publications, and a beautiful glassmorphism design with dark mode support.

## ✨ Features

- 🎨 **Modern Glassmorphism UI**: Beautiful backdrop blur effects and gradient designs
- 🔄 **Dynamic Content**: Automatically fetches projects from GitHub API and publications from Google Scholar
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- ⚡ **High Performance**: Built with Next.js 14 App Router for optimal speed
- 🎯 **Type-Safe**: Written in TypeScript with strict type checking
- 🌙 **Dark Mode**: Seamless light/dark theme switching with next-themes
- 🎭 **Smooth Animations**: Scroll-triggered animations and hover effects
- 📊 **Live Project Demos**: Showcase interactive live projects
- 🎓 **Interactive Education Timeline**: Hover effects with institution logos
- 📝 **Research Publications**: Automatically fetched from Google Scholar with citation metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode
- **APIs**: 
  - GitHub REST API (with rate limiting protection)
  - Google Scholar web scraping (with Cheerio)
- **Animations**: CSS animations + Intersection Observer

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git (for version control)
- GitHub account (for deployment)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required
NEXT_PUBLIC_GITHUB_USERNAME=Rahim-Ahmed
NEXT_PUBLIC_GOOGLE_SCHOLAR_ID=OjXnAP4AAAAJ

# Optional (increases GitHub API rate limit from 60 to 5000 requests/hour)
GITHUB_TOKEN=your_github_personal_access_token
```

**How to get a GitHub Personal Access Token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `public_repo` scope
3. Copy the token and add to `.env.local`

### 4. Configure Personal Information

Edit `config/site-config.ts` to add your:
- Personal details (name, title, bio, contact info)
- Education history
- Work experience
- Skills and technologies
- Social media links

### 5. Add Your Assets

Add these files to the `public` folder:
- **Profile Image**: `public/new.jpg` (or update path in config)
- **CV/Resume**: `public/Ab_Rahim_Ahmed_Sowrov_CV.pdf`
- **Institution Logos** (optional): `public/institutions/[institution-name].png`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 7. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio-website/
├── .github/
│   └── copilot-instructions.md    # AI agent development guide
├── app/                            # Next.js App Router
│   ├── api/                       # API Routes
│   │   ├── github/route.ts        # Fetch GitHub repositories
│   │   └── scholar/route.ts       # Scrape Google Scholar
│   ├── globals.css                # Global styles & CSS variables
│   ├── layout.tsx                 # Root layout with theme provider
│   └── page.tsx                   # Home page (imports all sections)
├── components/
│   ├── sections/                  # Page sections
│   │   ├── About.tsx              # Skills & bio with categories
│   │   ├── Contact.tsx            # Contact form section
│   │   ├── Education.tsx          # Timeline with hover effects
│   │   ├── Experience.tsx         # Work experience cards
│   │   ├── Hero.tsx               # Landing section with typing animation
│   │   ├── LiveProjects.tsx       # Live demo projects showcase
│   │   ├── Projects.tsx           # GitHub projects (dynamic)
│   │   └── Research.tsx           # Publications (dynamic)
│   ├── ui/                        # Reusable UI components
│   │   ├── button.tsx             # Button component
│   │   └── card.tsx               # Card component
│   ├── Footer.tsx                 # Footer with social links
│   ├── Header.tsx                 # Navigation header
│   ├── ThemeToggle.tsx            # Dark mode toggle
│   └── theme-provider.tsx         # Theme context
├── config/
│   └── site-config.ts             # ⚙️ Main configuration file
├── hooks/
│   └── useScrollAnimation.ts      # Intersection Observer hook
├── lib/
│   └── utils.ts                   # Utility functions
├── public/                        # Static assets
│   ├── institutions/              # Institution logos
│   ├── new.jpg                    # Profile image
│   └── Ab_Rahim_Ahmed_Sowrov_CV.pdf
├── .env.local                     # Environment variables (create this)
├── .gitignore                     # Git ignore rules
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🎨 Customization Guide

### Update Personal Information
Edit `config/site-config.ts` - this is the single source of truth for all content.

### Change Colors/Theme
Edit CSS variables in `app/globals.css`:
```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* Change primary color */
  /* ... more variables */
}
```

### Add New Section
1. Create component in `components/sections/NewSection.tsx`
2. Import in `app/page.tsx`
3. Add navigation link in `components/Header.tsx`

### Modify Styling
All components use Tailwind CSS classes. Common patterns:
- Background effects: gradient overlays + animated orbs + dot patterns
- Cards: glassmorphism (`backdrop-blur`, `bg-card/80`)
- Animations: `useScrollAnimation` hook for scroll-triggered effects

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Click Deploy

3. **Your site is live!** 🎉

### Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site from Git → Choose repo
4. Add environment variables
5. Deploy

## 🔧 Troubleshooting

### GitHub API Rate Limiting
- Add `GITHUB_TOKEN` to `.env.local` to increase limit
- API route has 10-second timeout protection

### Google Scholar Not Loading
- Scholar may block requests due to rate limiting
- Consider using proxy or caching solution for production

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Hydration Errors
- Check that client components have `"use client"` directive
- Ensure no SSR/client mismatches (use `isMounted` pattern)

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GITHUB_USERNAME` | Yes | Your GitHub username |
| `NEXT_PUBLIC_GOOGLE_SCHOLAR_ID` | Yes | Your Google Scholar ID |
| `GITHUB_TOKEN` | No | GitHub PAT (increases API rate limit) |

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🙋‍♂️ Contact

**Ab Rahim Ahmed Sowrov**
- Email: sajimahmed3030@gmail.com
- GitHub: [@Rahim-Ahmed](https://github.com/Rahim-Ahmed)
- LinkedIn: [ab-rahim-ahmed-sowrov](https://linkedin.com/in/ab-rahim-ahmed-sowrov-66a083247)
- Scholar: [Profile](https://scholar.google.com/citations?user=OjXnAP4AAAAJ)

---

Built with ❤️ using Next.js 14 and TypeScript


## API Routes

### GitHub API (`/api/github`)
Fetches repositories from GitHub for the specified username. Filters out forked repos and sorts by stars.

### Google Scholar API (`/api/scholar`)
Scrapes Google Scholar profile for publications and citation statistics. Note: May be rate-limited by Google.

## Customization

### Adding More Sections
Create a new component in `components/sections/` and import it in `app/page.tsx`.

### Styling
Modify Tailwind configuration in `tailwind.config.ts` or update the CSS variables in `app/globals.css`.

### Theme Colors
Edit the CSS variables in `app/globals.css` under `:root` and `.dark` selectors.

## Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any platform supporting Node.js**

## Notes

- **GitHub Token**: Optional but recommended to increase API rate limits
- **Google Scholar**: Web scraping may be blocked. Consider using alternative APIs or services
- **Images**: Add your profile image and project screenshots to the `public` folder

## License

MIT License - feel free to use this template for your own portfolio!
