# Brewbar - Agent Guide

## Quick Overview

Brewbar is a client-side React app for generating Instagram-ready coffee menu images. Uses html2canvas to render React components to images.

**Tech Stack**: React 19 + TypeScript + Vite + Tailwind CSS + html2canvas

## Key Architecture Decisions

1. **100% Client-Side** - No server, no API calls, works offline
2. **No State Persistence** - Data only in memory (no localStorage)
3. **Image Generation** - Uses html2canvas: DOM → Canvas → Image
4. **Dynamic Themes** - Aurora/Starry Night generate unique visuals per generation
5. **Dark Mode** - CSS variables with system preference detection, no persistence

## Project Structure

```
src/
├── components/
│   ├── cards/
│   │   ├── HeaderCard.tsx      # Header image
│   │   ├── BeanCard.tsx        # Main card - delegates to layouts/
│   │   └── layouts/            # One file per theme layout
│   │       ├── types.ts        # LayoutProps interface
│   │       ├── WarmLayout.tsx
│   │       ├── VintageLayout.tsx
│   │       ├── EspressoLayout.tsx
│   │       ├── AuroraLayout.tsx
│   │       ├── ZenGardenLayout.tsx
│   │       ├── WashiLayout.tsx
│   │       ├── MatchaLayout.tsx
│   │       ├── StarryNightLayout.tsx
│   │       └── SpaceLayout.tsx
│   ├── common/                 # Reusable UI
│   └── steps/                  # 3-step wizard
├── themes/themes.ts            # Theme configs
├── types/index.ts              # TypeScript types
├── utils/
│   ├── aurora.ts              # Dynamic gradients/stars
│   ├── export.ts              # Download utilities
│   └── styles.ts              # Background helpers
└── store/appState.tsx         # React Context state
```

## Adding a New Theme

### 1. Add type (`src/types/index.ts`):
```typescript
export type Theme = ... | 'your-theme'
```

### 2. Add config (`src/themes/themes.ts`):
```typescript
'your-theme': {
  name: 'Your Theme',
  description: 'Description',
  colors: { primary, secondary, accent, paper, text, mutedText },
  fonts: { heading: 'Font Name', body: 'Inter' },
  styles: { borderRadius: '0.5rem', shadowClass: 'shadow-lg' }
}
```

### 3. Create layout (`src/components/cards/layouts/YourThemeLayout.tsx`):
```typescript
import type { LayoutProps } from './types'

export function YourThemeLayout({ bean, themeConfig }: LayoutProps) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h2 style={{ fontFamily: themeConfig.fonts.heading }}>
        {bean.name}
      </h2>
      {/* Layout JSX */}
    </div>
  )
}
```

### 4. Export (`src/components/cards/layouts/index.ts`):
```typescript
export { YourThemeLayout } from './YourThemeLayout'
```

### 5. Add to BeanCard (`src/components/cards/BeanCard.tsx`):
```typescript
case 'your-theme':
  return <YourThemeLayout bean={bean} themeConfig={themeConfig} />
```

### 6. Update ThemeSelector (`src/components/common/ThemeSelector.tsx`):
Add theme ID to appropriate category in `themeCategories` array.

## Theme Categories

- **Classic**: warm, warm-dark, vintage, vintage-dark
- **Coffee**: espresso, espresso-dark
- **Nature**: zen-garden, matcha
- **Artistic**: aurora, washi, washi-dark, space, starry-night

## Layout Architecture

Each theme has its own file in `layouts/`. All implement `LayoutProps`:

```typescript
interface LayoutProps {
  bean: Bean
  themeConfig: ThemeConfig
}
```

Special cases:
- **AuroraLayout**: Accepts `auroraData` prop with gradient + text color
- **StarryNightLayout**: Accepts `stars` prop for consistent starfield

## Dynamic Theme Details

### Aurora (`utils/aurora.ts`)
- Generates random gradient (3-5 colors from 18-color palette)
- Calculates luminance → determines text color (white or dark)
- Same gradient shared across header + all bean cards per generation
- **Regenerate Button**: Available on Download page after images are generated (only for Aurora theme)

### Starry Night
- Generates 50 random stars (position, size, opacity)
- Twinkling CSS animation
- Same starfield shared across header + all bean cards per generation

## Dark Mode

### Implementation
- **CSS Variables**: Colors defined in `index.html` with `:root` (light) and `.dark` (dark) selectors
- **System Preference**: Defaults to `prefers-color-scheme: dark` on initial load
- **Toggle**: Footer contains "Switch Theme" button to toggle between modes
- **No Persistence**: Theme resets to system default on page refresh (no localStorage)

### CSS Variables
```css
:root {
  --bg: #FFFCF0;        /* Light: cream, Dark: near-black */
  --fg: #100F0F;        /* Light: near-black, Dark: soft gray */
  --paper: #F2F0E5;     /* Light: paper, Dark: dark gray */
  --muted: #878580;     /* Light: gray, Dark: muted gray */
  --accent: #D14D41;    /* Same red in both modes */
  --accent-fg: #FFFCF0; /* Light: cream, Dark: soft white */
  --border: #E8E6E1;    /* Light: light gray, Dark: dark gray */
}
```

### Button Text Colors
Accent buttons use `text-accent-fg` instead of `text-white` for proper contrast in both light and dark modes.

### Browser Chrome (Safari iOS)
Safari on iOS has limited support for coloring the browser chrome (address bar):
- `theme-color` meta tag only affects the **tab bar**, not the address bar
- `color-scheme: dark` CSS property helps Safari understand the page's color scheme
- The `apple-mobile-web-app-status-bar-style` only works when added to home screen as PWA
- Dynamic theme-color changes after page load have limited effect on Safari

## Important Constraints

- **Image formats**: Square (1080×1080), Portrait (1080×1350), Story (1080×1920)
- **Max beans**: 5 per menu
- **Logo**: Max 2MB, positioned via absolute positioning
- **Label sizes**: Use 14-16px for Origin/Varietal/Roast/Flavor Profile
- **Fonts**: Must be loaded in index.html Google Fonts link

## Build Commands

```bash
bun install    # Install dependencies
bun run dev    # Start dev server
bun run build  # Production build
bun run lint   # Type check
```

## Bean Data Structure

```typescript
interface Bean {
  id: string
  roaster: string      // Required
  name: string         // Required
  origin: string       // Required
  varietal: string     // Required
  roastProfile: string // Required
  process: string      // Required - e.g., "Washed", "Natural", "Honey"
  tastingNotes: TastingNote[]  // Optional, max 6
}
```

### Layout Display Order

All theme layouts display bean data in this vertical order:
1. Bean Name (heading)
2. Roaster
3. Origin / Varietal / Roast (horizontal row)
4. **Process** (optional, on its own row)
5. Flavor Profile (optional)

## Quick Reference

**Current themes**: 13 total (warm, warm-dark, vintage, vintage-dark, espresso, espresso-dark, aurora, zen-garden, washi, washi-dark, matcha, space, starry-night)

**Adding fonts**: Update Google Fonts link in `index.html`

**Changing label sizes**: Edit fontSize in respective layout file

**Header vs Bean consistency**: Both now use `themeConfig.fonts.heading` for text

**Adding a new bean property**: Update `Bean` interface in `types/index.ts`, `ADD_EMPTY_BEAN` in `store/appState.tsx`, `BeanEntryForm.tsx`, and all 9 layout files
