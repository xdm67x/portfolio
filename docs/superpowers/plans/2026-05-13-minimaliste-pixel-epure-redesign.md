# Minimaliste Pixel-Épuré Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from arcade CRT theme to a minimal, modern design inspired by Studio Namma while preserving subtle pixel art touches and gaming spirit.

**Architecture:** Single-page React app with three sections (Hero, ProjectsGrid, Footer). Clean component architecture using CSS Modules. CSS keyframes for animations (no Framer Motion dependency).

**Tech Stack:** React 19, TypeScript, Vite, CSS Modules, Google Fonts (JetBrains Mono, Inter)

---

## File Structure

```
src/
├── components/
│   ├── Hero.tsx (CREATE)
│   ├── Hero.module.css (CREATE)
│   ├── ProjectsGrid.tsx (CREATE)
│   ├── ProjectsGrid.module.css (CREATE)
│   ├── ProjectCard.tsx (CREATE)
│   ├── ProjectCard.module.css (CREATE)
│   ├── Footer.tsx (CREATE)
│   ├── Footer.module.css (CREATE)
│   ├── ArcadeMachine.tsx (DELETE)
│   └── ArcadeMachine.module.css (DELETE)
├── data/
│   └── projects.ts (MODIFY - remove longDescription)
├── styles/
│   └── theme.css (MODIFY - complete rewrite)
├── App.tsx (MODIFY - use new components)
└── main.tsx (KEEP)
```

---

## Task 1: Update Theme and Typography

**Files:**
- Modify: `src/styles/theme.css`

### [ ] Step 1: Replace font imports with minimal set

Replace the existing font import at the top of `theme.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');
```

### [ ] Step 2: Replace CSS custom properties for minimal design

Replace all `:root` variables in `theme.css`:

```css
:root {
  /* Colors */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #151515;
  --color-bg-footer: #050505;
  --color-text-primary: #f0f0f0;
  --color-text-secondary: #999999;
  --color-text-accent: #ffffff;

  /* Fonts */
  --font-mono: 'JetBrains Mono', 'Space Mono', 'IBM Plex Mono', monospace;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

### [ ] Step 3: Replace base styles for minimal design

Replace the base styles section (everything after `:root`) in `theme.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #333 #111;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3 {
  font-family: var(--font-mono);
  font-weight: 700;
  line-height: 1.2;
}

a {
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color 0.2s ease, opacity 0.2s ease;
}

a:hover {
  opacity: 0.8;
}

::selection {
  background-color: #ff004d;
  color: #fff;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #111;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

---

## Task 2: Update Project Data

**Files:**
- Modify: `src/data/projects.ts`

### [ ] Step 1: Remove longDescription field from Project interface

In `src/data/projects.ts`, update the `Project` interface (lines 4-13):

```typescript
export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  image: string
  color: string
  githubUrl?: string
  liveUrl?: string
}
```

### [ ] Step 2: Remove longDescription from all project objects

Remove the `longDescription` field from each project in the `projects` array. After removal, each project should look like this structure (example for RTK):

```typescript
{
  id: 'rtk',
  title: 'RTK (Rust Token Killer)',
  description:
    'CLI proxy that reduces LLM token consumption by 60-90%',
  techStack: ['Rust', 'LLM', 'CLI'],
  image: 'https://avatars.githubusercontent.com/u/258253854?v=4',
  color: '#DEA584',
  githubUrl: 'https://github.com/rtk-ai/rtk',
},
```

Apply this to all 7 projects.

---

## Task 3: Create Hero Component

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/Hero.module.css`

### [ ] Step 1: Create Hero.tsx with animation and content

Create `src/components/Hero.tsx`:

```typescript
import { heroContent } from '../data/projects'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.pixelGrid} />
      </div>
      <div className={styles.content}>
        <p className={styles.blink}>PLAYER 1 READY</p>
        <h1 className={styles.name}>{heroContent.name}</h1>
        <h2 className={styles.subtitle}>{heroContent.title}</h2>
        <p className={styles.bio}>{heroContent.bio}</p>
      </div>
    </section>
  )
}

export default Hero
```

### [ ] Step 2: Create Hero.module.css with animations and responsive styles

Create `src/components/Hero.module.css`:

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: var(--color-bg-primary);
}

.background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.pixelGrid {
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  animation: fadeInBg 1s ease-out;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: var(--spacing-md);
  animation: fadeInContent 1.2s ease-out 0.2s both;
}

.blink {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  letter-spacing: 0.2em;
  animation: blink 1s step-end infinite;
}

.name {
  font-family: var(--font-mono);
  font-size: clamp(2.5rem, 10vw, 8rem);
  font-weight: 700;
  color: var(--color-text-accent);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
  animation: depixelize 1s ease-out 0.3s both;
  text-shadow: 0 4px 20px rgba(255, 0, 77, 0.2);
}

.subtitle {
  font-family: var(--font-mono);
  font-size: clamp(0.875rem, 1.5vw, 1.25rem);
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  letter-spacing: 0.1em;
  animation: fadeIn 0.8s ease-out 0.8s both;
}

.bio {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  color: var(--color-text-primary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  animation: fadeIn 0.8s ease-out 1s both;
}

@keyframes fadeInBg {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}

@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

@keyframes depixelize {
  0% {
    filter: blur(4px);
    opacity: 0.5;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .content {
    padding: var(--spacing-sm);
  }

  .blink {
    font-size: 0.625rem;
    letter-spacing: 0.15em;
  }
}
```

---

## Task 4: Create ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectCard.module.css`

### [ ] Step 1: Create ProjectCard.tsx with hover interactions

Create `src/components/ProjectCard.tsx`:

```typescript
import type { Project } from '../data/projects'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={styles.card}
      style={{ '--project-color': project.color } as React.CSSProperties}
    >
      <div className={styles.imageContainer}>
        <img
          src={project.image}
          alt={project.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <div className={styles.links}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                [SOURCE]
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                [DEMO]
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.badge}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
```

### [ ] Step 2: Create ProjectCard.module.css with hover effects

Create `src/components/ProjectCard.module.css`:

```css
.card {
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.card:hover {
  border-color: var(--project-color);
  transform: translateY(-4px);
}

.imageContainer {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.card:hover .image {
  filter: brightness(1.1);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--spacing-md);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .overlay {
  opacity: 1;
}

.links {
  display: flex;
  gap: var(--spacing-sm);
}

.link {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--project-color);
  padding: 0.5rem 1rem;
  border: 1px solid var(--project-color);
  border-radius: var(--radius-sm);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.link:hover {
  background-color: var(--project-color);
  color: #000;
}

.content {
  padding: var(--spacing-md);
}

.title {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-accent);
  margin-bottom: var(--spacing-xs);
  transition: color 0.2s ease;
}

.card:hover .title {
  color: var(--project-color);
}

.description {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.techStack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}
```

---

## Task 5: Create ProjectsGrid Component

**Files:**
- Create: `src/components/ProjectsGrid.tsx`
- Create: `src/components/ProjectsGrid.module.css`

### [ ] Step 1: Create ProjectsGrid.tsx with responsive grid

Create `src/components/ProjectsGrid.tsx`:

```typescript
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import styles from './ProjectsGrid.module.css'

function ProjectsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
```

### [ ] Step 2: Create ProjectsGrid.module.css with grid layout

Create `src/components/ProjectsGrid.module.css`:

```css
.section {
  background-color: var(--color-bg-primary);
  padding: var(--spacing-xl) var(--spacing-md);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-family: var(--font-mono);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-text-accent);
  margin-bottom: var(--spacing-lg);
  text-align: left;
  position: relative;
}

.title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background-color: #ff004d;
  margin-top: var(--spacing-sm);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .grid {
    gap: 2rem;
  }
}
```

---

## Task 6: Create Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/Footer.module.css`

### [ ] Step 1: Create Footer.tsx with social links

Create `src/components/Footer.tsx`:

```typescript
import styles from './Footer.module.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.social}>
          <a
            href="https://github.com/xdm67x"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.icon}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/mehmetozkan/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.icon}
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.269c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.269h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="mailto:contact@mehmetozkan.dev"
            className={styles.socialLink}
            aria-label="Email"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.icon}
            >
              <path d="M0 3v18h24v-18h-24zm21.016 2.010l-9.016 6.339-9.016-6.339h18.032zm-19.006 13.99v-11.616l9.99 7.016 9.99-7.016v11.616h-19.98z" />
            </svg>
          </a>
        </nav>
        <p className={styles.copyright}>
          © {currentYear} Mehmet Ozkan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
```

### [ ] Step 2: Create Footer.module.css

Create `src/components/Footer.module.css`:

```css
.footer {
  background-color: var(--color-bg-footer);
  padding: var(--spacing-lg) var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.social {
  display: flex;
  gap: var(--spacing-md);
}

.socialLink {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-text-secondary);
  transition: color 0.2s ease, transform 0.2s ease;
}

.socialLink:hover {
  color: var(--color-text-accent);
  transform: scale(1.1);
}

.icon {
  width: 24px;
  height: 24px;
}

.copyright {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .footer {
    padding: var(--spacing-lg) var(--spacing-lg);
  }
}
```

---

## Task 7: Update App Component

**Files:**
- Modify: `src/App.tsx`

### [ ] Step 1: Replace ArcadeMachine with new components

Replace the entire content of `src/App.tsx`:

```typescript
import Footer from './components/Footer'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import './styles/theme.css'

function App() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <Footer />
    </>
  )
}

export default App
```

---

## Task 8: Remove Old Components

**Files:**
- Delete: `src/components/ArcadeMachine.tsx`
- Delete: `src/components/ArcadeMachine.module.css`

### [ ] Step 1: Delete ArcadeMachine components

Run:

```bash
rm src/components/ArcadeMachine.tsx src/components/ArcadeMachine.module.css
```

---

## Task 9: Update heroContent in projects.ts

**Files:**
- Modify: `src/data/projects.ts`

### [ ] Step 1: Update heroContent to match new design

Update the `heroContent` object at the end of `src/data/projects.ts` (lines 98-103):

```typescript
export const heroContent = {
  name: 'MEHMET OZKAN',
  title: 'PIXEL ARCHITECT • LVL 99 WIZARD',
  tagline: 'TRANSFORMING PIXELS INTO IMMERSIVE EXPERIENCES',
  bio: 'AI enthusiast, video game aficionado, crafting web experiences. Ready to join your squad.',
}
```

---

## Task 10: Test and Verify

### [ ] Step 1: Run TypeScript type check

Run:

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

### [ ] Step 2: Run linting

Run:

```bash
npm run lint
```

Expected: No linting errors.

### [ ] Step 3: Start development server

Run:

```bash
npm run dev
```

Expected: Dev server starts, opens in browser at localhost.

### [ ] Step 4: Manual visual verification

Open browser and verify:
- Hero section displays correctly with animations
- Projects grid shows all 7 projects in 2-column layout on desktop
- Cards have proper hover effects with colored borders
- Social links (GitHub, LinkedIn, Email) display in footer
- Responsive layout works on mobile/tablet breakpoints
- No console errors

### [ ] Step 5: Commit all changes

Run:

```bash
git add -A
git commit -m "feat: redesign portfolio with minimal pixel-epuré theme

- Replace arcade CRT theme with modern minimal design
- Add Hero, ProjectsGrid, ProjectCard, and Footer components
- Implement CSS-only animations for hero name depixelization
- Use JetBrains Mono and Inter fonts
- Responsive grid layout for projects (1-2 columns)
- Add hover effects with project accent colors
- Remove longDescription from project data
- Update theme with new color palette and typography"
```

---

## Self-Review Checklist

- [ ] All 7 projects display in the grid
- [ ] Each project card shows image, title, description, and tech badges
- [ ] Hover reveals GitHub/Demo links with project color
- [ ] Hero name is very large and centered
- [ ] Bio text is readable and centered
- [ ] Footer shows 3 social links (GitHub, LinkedIn, Email)
- [ ] No CRT/arcade effects remain
- [ ] No sound effects or game states
- [ ] Custom CSS properties use new color palette
- [ ] Responsive breakpoints work (mobile, tablet, desktop)
- [ ] Build and lint pass without errors
- [ ] No longDescription fields in project data

---

## Notes

- The animation uses a simple blur effect (`depixelize` keyframes) instead of complex pixelation for better performance
- Custom cursor is deferred to future iteration if needed
- The design uses CSS custom properties extensively for easy theming
- All images use `loading="lazy"` for performance
- No external dependencies added (uses existing React 19 + TypeScript + Vite)