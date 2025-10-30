# Portfolio Website - AI Agent Instructions

## Project Overview
A Next.js 14 portfolio website that dynamically fetches GitHub projects and Google Scholar publications. Uses TypeScript, Tailwind CSS, and the App Router pattern.

## Architecture & Key Concepts

### Core Technology Stack
- **Next.js 14** with App Router (not Pages Router)
- **TypeScript** for type safety
- **Tailwind CSS** with custom theming via CSS variables
- **next-themes** for dark mode support
- **Server Components** by default, `"use client"` only when needed (state, effects, browser APIs)

### Project Structure
```
app/                    # Next.js App Router
├── api/               # Route handlers (not serverless functions)
│   ├── github/        # Fetches user repos from GitHub API
│   └── scholar/       # Scrapes Google Scholar via cheerio
├── layout.tsx         # Root layout with ThemeProvider
└── page.tsx           # Main page importing all sections

components/
├── sections/          # Page sections: Hero, About, Education, Experience, Projects, Research, Contact
├── ui/               # Reusable UI: Card, Button (shadcn-style patterns)
└── Header/Footer/ThemeToggle

config/
└── site-config.ts    # Single source of truth for ALL personal data
```

### Critical Patterns

**1. Configuration-Driven Content**
- ALL personal data lives in `config/site-config.ts`
- Never hardcode names, emails, or social links in components
- Import `config` and reference properties like `config.personal.name`

**2. Client vs Server Components**
- Default to Server Components (no directive)
- Use `"use client"` ONLY for:
  - Components using hooks (`useState`, `useEffect`, `useTheme`)
  - Event handlers (`onClick`, form submissions)
  - Browser APIs
- Examples: `Hero.tsx`, `Projects.tsx`, `Research.tsx` need `"use client"`

**3. API Routes Pattern**
```typescript
// app/api/[name]/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const param = searchParams.get("param");
  // ... fetch logic
  return NextResponse.json(data);
}
```

**4. Theming System**
- Colors defined as CSS variables in `app/globals.css` (`:root` and `.dark`)
- Use Tailwind classes like `bg-primary`, `text-muted-foreground`
- Never use hex colors directly in components
- ThemeToggle uses `useTheme()` from next-themes

**5. Component Styling**
- Use `cn()` utility (from `lib/utils.ts`) to merge Tailwind classes
- Follow shadcn/ui patterns for component composition
- Cards use: `<Card><CardHeader><CardTitle>...</CardTitle></CardHeader><CardContent>...</CardContent></Card>`

### Data Flow

**GitHub Projects:**
1. User configures `NEXT_PUBLIC_GITHUB_USERNAME` in `.env.local`
2. `Projects.tsx` fetches `/api/github?username=...` on mount
3. API route calls GitHub REST API, filters forks, sorts by stars
4. Component displays repos in Card grid with language tags, stats

**Google Scholar Publications:**
1. User configures `NEXT_PUBLIC_GOOGLE_SCHOLAR_ID` in `.env.local`
2. `Research.tsx` fetches `/api/scholar?scholarId=...`
3. API route scrapes Scholar page with cheerio (axios + User-Agent)
4. Returns publications array + citation stats (h-index, i10-index)
5. **Note:** May fail due to Google rate limiting - handle errors gracefully

### Development Workflows

**Starting Development:**
```bash
npm install        # Install dependencies
npm run dev        # Start dev server on http://localhost:3000
```

**Common Tasks:**
- Edit personal info → `config/site-config.ts`
- Add new section → Create component in `components/sections/`, import in `app/page.tsx`
- Modify colors → `app/globals.css` CSS variables
- Debug API → Check browser Network tab, `/api/[route]` in dev tools

**Build & Deploy:**
```bash
npm run build      # Production build
npm start          # Run production server
```

### TypeScript Conventions
- Interfaces for data structures (e.g., `Repository`, `Publication`)
- Use type inference where possible
- Explicit types for API responses and props
- No `any` types (use `unknown` if needed)

### Common Pitfalls
1. **Don't add `"use client"` to Server Components** - Causes hydration errors
2. **GitHub API rate limits** - Use `GITHUB_TOKEN` env var for authenticated requests (60 → 5000 req/hour)
3. **Google Scholar blocking** - Error handling exists; may need proxy/alternative service
4. **CSS variable names** - Must match Tailwind config (e.g., `--primary` → `bg-primary`)
5. **Missing dependencies** - If lucide-react icons fail, check `npm install lucide-react`

### Adding New Features

**New Page Section:**
```typescript
// components/sections/NewSection.tsx
export default function NewSection() {
  return (
    <section id="new-section" className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          New Section
        </h2>
        {/* Content */}
      </div>
    </section>
  );
}

// Add to app/page.tsx
import NewSection from "@/components/sections/NewSection";
// ... add <NewSection /> in order
```

**New API Integration:**
```typescript
// app/api/newapi/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Fetch external API
  return NextResponse.json(data);
}
```

### Environment Variables
Required for full functionality:
```
NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GOOGLE_SCHOLAR_ID=your-scholar-id
GITHUB_TOKEN=ghp_xxx (optional, increases rate limit)
```

### File Naming Conventions
- Components: PascalCase (`Hero.tsx`, `ThemeToggle.tsx`)
- API routes: lowercase (`route.ts` in `app/api/[name]/`)
- Config: kebab-case (`site-config.ts`)
- Utilities: lowercase (`utils.ts`)

### Debugging Tips
- Check browser console for client-side errors
- API routes: Add `console.log()`, check terminal output
- Tailwind not working: Verify `tailwind.config.ts` content paths
- Dark mode issues: Ensure `suppressHydrationWarning` on `<html>`

### Performance Considerations
- Images should use Next.js `<Image>` component (not implemented yet - opportunity for improvement)
- API calls cached via Next.js automatic fetch caching (App Router)
- Static generation where possible (education, experience sections)

### Key Dependencies
- `next`: 14.2.5 (App Router)
- `react`, `react-dom`: ^18.3.1
- `axios`: HTTP client for API routes
- `cheerio`: HTML parsing for Google Scholar
- `lucide-react`: Icon library
- `next-themes`: Dark mode
- `tailwindcss`: Styling
- `class-variance-authority`, `clsx`, `tailwind-merge`: Utility styling

## Quick Reference

**Import Paths:**
- `@/*` → Root directory (configured in `tsconfig.json`)
- Example: `import { config } from "@/config/site-config"`

**Frequently Modified Files:**
- Personal info: `config/site-config.ts`
- Colors/theme: `app/globals.css`
- Layout/navigation: `components/Header.tsx`, `app/layout.tsx`
- Main page: `app/page.tsx`

**External APIs:**
- GitHub: `https://api.github.com/users/{username}/repos`
- Scholar: `https://scholar.google.com/citations?user={id}&hl=en` (scraped)
