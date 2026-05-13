# Design Specification: Minimaliste Pixel-Épuré Redesign

**Date:** 2026-05-13  
**Decision:** Moderniser le portfolio avec un design inspiré de Studio Namma, plus épuré et minimaliste, tout en conservant une touche pixel art subtile et l'esprit gaming.

---

## Overview

Transformation du portfolio actuel (thème arcade CRT immersif) vers un design minimaliste moderne qui met en avant l'identité "MEHMET OZKAN" et les projets. Le style s'inspire de Studio Namma avec des typographies bold, un layout épuré, mais conserve un esprit gaming avec des touches pixel art subtiles.

**Core Principles:**
- Identité en grand format, impactante
- Projets en grille moderne, facile à scanner
- Minimalisme mais avec personnalité (touches pixel art subtiles)
- Performance (pas d'effets lourds comme CRT)
- Mobile-first responsive

---

## Architecture

### Page Structure

Single-page application with three main sections:

1. **Hero Section** (100vh, full viewport)
   - Identity and bio
   - Immediate visual impact
   
2. **Projects Section** (scroll natural flow)
   - Grid layout
   - All 7 projects visible
   
3. **Footer** (minimal)
   - Social links
   - Contact

**No navigation bar** - single page flow, natural scroll.

---

## Hero Section

### Layout

**Dimensions:** 100vh (full viewport height)  
**Background:** Very dark (#0a0a0a) with subtle pixel pattern  
**Content:** Centered vertically and horizontally

### Content Hierarchy

**Name (H1):**
```
MEHMET OZKAN
```
- Font: Monospace retro-futuristic (JetBrains Mono / Space Mono / IBM Plex Mono)
- Size: Very large (10-12vw on desktop, readable on mobile)
- Color: White with subtle gradient or accent
- Animation: "Depixelization" effect on load
  - Text starts pixelated (low-res)
  - Smoothly transitions to sharp, crisp resolution
  - Duration: ~800ms-1s
- Alternative effect: Subtle glitch (not aggressive like current CRT)

**Subtitle:**
```
PIXEL ARCHITECT • LVL 99 WIZARD
```
- Font: Same monospace family
- Size: Smaller (~1.5vw on desktop)
- Color: Lighter gray or accent color
- Separators: Middle dots (•)

**Bio:**
```
AI enthusiast, video game aficionado, 
crafting web experiences. Ready to join your squad.
```
- Font: Sans-serif (Inter or similar)
- Size: ~1-1.2vw on desktop
- Color: #f0f0f0
- Max-width: ~600px, centered
- Line-height: ~1.6 for readability
- Format: 2-3 lines max

### Pixel Art Elements

**Background Pattern:**
- Very subtle grid or dot pattern
- Pixel-style, almost imperceptible
- Low opacity (~5-10%)

**Custom Cursor:**
- Pixel art style (16x16 or 32x32)
- Applied globally or just on hero
- Simple design: arrow or crosshair

**Decorative Elements (Optional):**
- Small pixel art stars/dots in corners
- Pixel-style separators or borders
- Very subtle, not dominant

### Animations

**Load Animation:**
1. Background fades in first
2. Name depixelizes (primary effect)
3. Subtitle and bio fade in below
4. Total duration: ~1.5s

**Hover Effects:**
- None on name (too aggressive)
- Optional: slight color shift on bio

---

## Projects Section

### Layout

**Grid Configuration:**
- Desktop (≥1024px): 2 columns × 3 rows (or 2×4 if all 7 projects)
- Tablet (768-1023px): 2 columns
- Mobile (<768px): 1 column

**Spacing:**
- Gap between cards: ~2rem
- Section padding: ~4rem vertical, ~2rem horizontal
- Margins consistent with overall spacing

### Project Card Design

**Card Container:**
- Background: Slightly lighter than hero (#151515 or elevated with shadow)
- Border-radius: Subtle (8-12px), not aggressive rounded
- Shadow: Subtle elevation, not floating card style
- Border: None by default, color accent on hover

**Card Structure:**

```
┌─────────────────────────────────────┐
│                                     │
│         [Project Image]             │
│         (16:9 ratio, large)         │
│                                     │
├─────────────────────────────────────┤
│  Project Title                      │
│  (Bold, monospace or bold sans)     │
│                                     │
│  Short description...               │
│                                     │
│  [Tech Badge] [Tech Badge] [...]    │
│                                     │
│  [→ SOURCE]  [→ DEMO]  (on hover)   │
│                                     │
└─────────────────────────────────────┘
```

**Project Image:**
- Aspect ratio: 16:9 (landscape)
- Width: 100% of card
- Object-fit: cover
- No pixel art styling on images (keep modern)
- Hover brightness: Slight increase (+5-10%)

**Project Title:**
- Font: Bold sans-serif or monospace
- Size: ~1.5rem on desktop
- Color: White or project's accent color
- Margin: ~1rem below image

**Short Description:**
- Text from `description` field (short version)
- Font: Sans-serif, regular
- Size: ~0.9rem
- Color: #999 or similar
- Max lines: 2 (truncate with ellipsis)

**Tech Stack Badges:**
- Font: Monospace, slightly pixel-style or regular
- Size: ~0.75rem
- Style: Rounded pills or pixel-cornered boxes
- Background: Semi-transparent with border
- Layout: Flexbox row, wrap if needed

**Links (GitHub/Demo):**
- Display: Hidden by default, overlay on hover
- Position: Bottom of card or as overlay
- Style: Pixel art icons or simple text with [ ] brackets
- Colors: Project's accent color

**Hover State:**
```
1. Card border: 2px solid [project.color]
2. Image: brightness increase (+5-10%)
3. Links: fade in from bottom
4. Optional: card lift slightly
```

### Project Data Usage

All existing projects from `src/data/projects.ts`:
- RTK
- simple-agent
- cargo-feature-guard
- quick-xml
- electrotest
- Soft Delight
- chip8

Each project uses its existing:
- `image` URL
- `title`
- `description` (short, for card)
- `longDescription` (not used in grid view, only if modal later)
- `techStack` array
- `color` for accent
- `githubUrl` / `liveUrl` links

---

## Footer

### Layout

- Background: Slightly different from hero (#050505 or #111111)
- Height: Minimal (~120-150px)
- Content: Centered

### Content

**Social Links:**
- GitHub icon + link
- LinkedIn icon + link
- Email icon + email

**Style:**
- Icons: Pixel art style or simple SVGs
- Size: ~24-32px
- Layout: Horizontal row with gaps
- Hover: Slight scale or color change

**Optional:**
- Small copyright text
- "Built with [tech]" if desired

---

## Color Palette

### Primary Colors

```css
--color-bg-primary: #0a0a0a;      /* Hero background */
--color-bg-secondary: #151515;    /* Cards background */
--color-bg-footer: #050505;        /* Footer background */
--color-text-primary: #f0f0f0;     /* Main text */
--color-text-secondary: #999999;  /* Muted text */
--color-text-accent: #ffffff;      /* Highlight text */
```

### Project Accent Colors

Each project uses its unique color from `projects.ts`:
- RTK: #DEA584
- simple-agent: #22d3ee
- cargo-feature-guard: #CE422B
- quick-xml: #DEA584
- electrotest: #47848F
- Soft Delight: #6B5B95
- chip8: #4A90D9

These colors apply to:
- Card border on hover
- Title optional accent
- Links/buttons associated color

---

## Typography

### Font Families

**Headlines (Hero name):**
```css
font-family: 'JetBrains Mono', 'Space Mono', 'IBM Plex Mono', monospace;
```
- Weight: 700 (Bold)
- Character: Retro-futuristic
- Letter-spacing: Slightly tight

**Body Text:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```
- Weight: 400 (Regular), 600 (Semi-bold for titles)
- Modern, clean

**Badges/Code:**
```css
font-family: 'JetBrains Mono', monospace;
```
- Slightly pixel-esque feel
- Weight: 500

### Font Sizing

**Desktop:**
```css
.hero-name { font-size: 10vw; }        /* ~120-160px */
.hero-subtitle { font-size: 1.5vw; }   /* ~18-24px */
.hero-bio { font-size: 1.1vw; }        /* ~16-18px */
.project-title { font-size: 1.5rem; }
.project-desc { font-size: 0.9rem; }
.badge { font-size: 0.75rem; }
```

**Mobile:**
```css
.hero-name { font-size: 3rem; }        /* Fixed for readability */
.hero-subtitle { font-size: 1rem; }
.hero-bio { font-size: 0.9rem; }
```

---

## Animations & Effects

### Hero Load Sequence

```
Timeline:
  0ms    → Background fade in
  200ms  → Name starts depixelizing (pixelated → sharp)
  1000ms → Name depixelization complete
  1200ms → Subtitle fade in
  1400ms → Bio fade in + custom cursor enabled
```

### Project Card Hover

```
Timeline:
  0ms    → Card normal state
  200ms  → Border color fades in
  200ms  → Image brightness increases
  300ms  → Links slide up from bottom
```

### Scroll Behavior

- Smooth scroll to projects section when clicking CTA (if added)
- Intersection Observer for fade-in animations on scroll
- Optional: Staggered reveal for project cards

---

## Responsive Breakpoints

```css
/* Mobile First */
.hero { /* base styles */ }
.projects-grid { grid-template-columns: 1fr; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .hero-name {
    font-size: 10vw;
  }
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}
```

---

## Removal Items

**Delete from current codebase:**

### Components
- Remove `ArcadeMachine.tsx` and `ArcadeMachine.module.css`
- Create new components: `Hero.tsx`, `ProjectsGrid.tsx`, `Footer.tsx`

### Effects
- Remove all CRT effects (scanlines, vignette, cathode-ray)
- Remove all sound effects (coin, select, start sounds)
- Remove game state logic (title, select states)
- Remove keyboard navigation (arrows for carousel)
- Remove coin insertion animation
- Remove glitch text animation (replace with depixelization)

### Data
- Keep `projects.ts`, use only `description` (not `longDescription`)
- Keep `heroContent` but may adjust text

### Styles
- Remove all arcade/CRT CSS
- Create new minimal CSS or CSS modules

---

## Technical Implementation

### Tech Stack (Existing)

- React (Vite)
- TypeScript
- CSS Modules
- Keep Vite build system

### New Component Structure

```
src/
├── components/
│   ├── Hero.tsx
│   ├── Hero.module.css
│   ├── ProjectsGrid.tsx
│   ├── ProjectsGrid.module.css
│   ├── ProjectCard.tsx
│   ├── ProjectCard.module.css
│   ├── Footer.tsx
│   └── Footer.module.css
├── data/
│   └── projects.ts (keep existing)
├── styles/
│   └── theme.css (update)
├── App.tsx (refactor)
└── main.tsx (keep)
```

### Animations Library

- Use CSS keyframes for simple animations
- Optional: Framer Motion for more complex depixelization effect
- Keep bundle minimal (no heavy animation libraries)

### Fonts

- Load Google Fonts: JetBrains Mono, Inter
- OR use system fonts fallback
- Ensure font-display: swap for performance

---

## Success Criteria

**Design Goals:**
- ✅ Identité "MEHMET OZKAN" en grand, impactante
- ✅ Projets en grille moderne, faciles à scanner
- ✅ Style minimaliste inspiré de Studio Namma
- ✅ Touche pixel art subtile (pas agressive)
- ✅ Esprit gaming conservé
- ✅ Performance (pas d'effets lourds CRT)

**Technical Goals:**
- ✅ Mobile-first responsive
- ✅ Fast load time (<2s hero)
- ✅ No heavy dependencies
- ✅ Clean component architecture
- ✅ Type-safe (TypeScript)

**User Experience:**
- ✅ Navigation simple (scroll naturel)
- ✅ Projets immédiatement visibles
- ✅ Hover interactions engageantes
- ✅ Mobile-friendly
- ✅ Accessible (font sizes, contrast)

---

## Next Steps

1. Create implementation plan (invoke writing-plans skill)
2. Set up new component structure
3. Implement Hero section with animations
4. Implement ProjectsGrid with cards
5. Implement Footer
6. Update theme and typography
7. Test responsive breakpoints
8. Verify performance and accessibility

---

## Open Questions

- Depixelization animation: CSS keyframes or Framer Motion?
- Keep existing `longDescription` field? (not displayed but could be used for modals in future)
- Social links: which platforms? (GitHub confirmed, others?)
- Cursor custom pixel art: custom SVG or simple CSS?