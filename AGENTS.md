# Brewbar Architecture

## Project Overview

Brewbar is a single-page web application for cafe owners to create Instagram-ready menu images showcasing their coffee bean offerings. The application is 100% client-side with no server dependencies.

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Build Tool | Bun | 1.3.11+ | Fast JavaScript runtime and package manager |
| Framework | React | 19.2.4 | UI component library |
| Build Tool | Vite | 8.0.3 | Fast development server and build tool |
| Styling | Tailwind CSS | 3.4.19 | Utility-first CSS framework (Flexoki color scheme) |
| Image Generation | html2canvas | 1.4.1 | Client-side DOM to canvas rendering |
| ZIP Downloads | JSZip | 3.10.1 | Create ZIP archives in browser |
| Fonts | Google Fonts | - | Inter, Merriweather, Playfair Display, Orbitron, Cormorant Garamond, Noto Serif JP, Noto Sans JP, Rajdhani |

## Project Structure

```
brewbar/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment config
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── HeaderCard.tsx   # Header card layout (format-aware, dynamic backgrounds)
│   │   │   └── BeanCard.tsx     # Bean detail card layouts (10 unique themes)
│   │   ├── common/
│   │   │   ├── FileUpload.tsx   # Drag-and-drop file upload
│   │   │   ├── FormatSelector.tsx # Image format selector (square/portrait/story)
│   │   │   ├── TagInput.tsx     # Tag input for tasting notes
│   │   │   └── ThemeSelector.tsx # Theme selection UI with category tabs
│   │   └── steps/
│   │       ├── BeanEntryForm.tsx # Step 1: Bean data entry
│   │       ├── ImageSettings.tsx # Step 2: Settings & preview
│   │       └── GenerateDownload.tsx # Step 3: Generate & download (theme-aware)
│   ├── hooks/
│   │   └── (reserved for custom hooks)
│   ├── store/
│   │   └── appState.tsx        # React Context-based state management
│   ├── themes/
│   │   └── themes.ts           # Theme configurations (12 themes)
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions + IMAGE_DIMENSIONS
│   ├── utils/
│   │   ├── aurora.ts           # Dynamic gradient & star generation utilities
│   │   ├── export.ts           # Download and export utilities
│   │   └── styles.ts           # Background style helpers for card components
│   ├── App.tsx                 # Main app component
│   ├── index.css              # Global styles (Flexoki light theme only)
│   ├── main.tsx               # App entry point
│   └── vite-env.d.ts          # TypeScript declarations
├── index.html                 # HTML entry point (with CSP)
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # TypeScript config for Vite
└── vite.config.ts             # Vite configuration
```

## Architecture Details

### State Management

- Uses React Context API (`AppProvider`) for global state
- All data stored in-memory only (no localStorage as per requirements)
- State managed via `useReducer` with typed actions
- State includes: beans array, current step, global settings
- Format selection stored in settings and used throughout generation

### Theme System

**Twelve distinct and unique themes** across 4 categories:

#### Classic Themes

##### Warm & Cozy / Warm Dark
- **Concept**: Inviting, artisanal, approachable shop feel
- **Typography**: Merriweather serif for headings + Inter for body text
- **Layout Features**:
  - Decorative accent line at top as branding element (60px wide, 4px thick, rounded)
  - Broad italic "by [Roaster]" subheading for personality
  - Three-column layout showing all info (Origin, Varietal, Roast)
  - Bullet-separated tasting notes (•) for clean presentation
  - Softer color palette with cream and brown tones
  - Italicized labels for vintage charm
- **Unique Element**: Decorative top accent bar and "by [Roaster]" attribution style

##### Vintage Retro / Vintage Dark
- **Concept**: Classic, timeless, sophisticated estate coffee aesthetic
- **Typography**: Playfair Display serif as primary, Inter for labels
- **Layout Features**:
  - Elegant 4px solid border frame around entire content (header and beans)
  - Decorative divider underneath name for refinement (120px wide)
  - Italicized roaster name for authenticity
  - Three-column layout with generous spacing (70px gaps)
  - Bullet-separated tasting notes (•) for clean presentation
  - Extra-wide letter-spacing on labels (3-4px)
- **Unique Element**: Signature border frame and text-only flavor profile (no boxes)

#### Coffee Theme

##### Espresso / Espresso Dark
- **Concept**: Rich espresso browns, modern coffee shop aesthetic
- **Typography**: Playfair Display serif for headings + Inter for body
- **Layout Features**:
  - Horizontal accent line (80px wide, 3px thick)
  - Italic roaster name in accent color
  - Clean three-column layout with uppercase labels
  - Rounded corners (0.5rem) with large shadows
- **Unique Element**: Deep espresso brown color palette with cream accents

#### Nature Themes

##### Zen Garden
- **Concept**: Peaceful sage greens, minimalist tranquility
- **Typography**: Cormorant Garamond serif throughout (consistent for title and body)
- **Layout Features**:
  - Thin 1px border frame
  - Minimalist line divider (40px wide, 1px)
  - Extra-wide spacing (90px gaps between columns)
  - Wide letter-spacing on labels (4-5px)
  - Double line-height for flavor profile (2.0)
- **Unique Element**: Maximum whitespace, elegant thin borders, serene aesthetic

##### Matcha
- **Concept**: Kyoto cafe style, fresh matcha green aesthetic
- **Typography**: Noto Sans JP for headings + Inter for body
- **Layout Features**:
  - Geometric diamond decorations (rotated squares as dividers)
  - Matcha green accent color on labels
  - Diamond-shaped dividers at top and flavor profile section
  - Clean geometric aesthetic
- **Unique Element**: Japanese-inspired geometric patterns, fresh green palette

#### Artistic Themes

##### Aurora
- **Concept**: Ethereal gradient beauty, celestial vibes with dynamic colors
- **Typography**: Playfair Display serif + Inter
- **Layout Features**:
  - **Dynamic gradient background**: Randomly generated on each render
  - **Adaptive text color**: Automatically switches between white/dark based on gradient luminance
  - Rounded card container (20px border-radius)
  - Gradient divider line
- **Unique Element**: Every generation produces a unique gradient; text color adapts for readability

##### Washi / Washi Dark
- **Concept**: Traditional Japanese paper, indigo and vermillion
- **Typography**: Noto Serif JP for headings + Inter for body
- **Layout Features**:
  - Top accent border (6px thick) + 2px side borders
  - "Single Origin" badge with border
  - Horizontal dividers with vertical separator lines between columns
  - Traditional Japanese color palette (indigo, cream, vermillion red)
- **Unique Element**: Traditional Japanese paper aesthetic, vermillion accents

##### Space
- **Concept**: Project Hail Mary inspired, stellar cosmic aesthetic
- **Typography**: Orbitron (sci-fi) for headings + Rajdhani (angular) for body
- **Layout Features**:
  - Orbital ring decorations (concentric circles with 30% and 20% opacity)
  - Uppercase title with wide letter-spacing (4px)
  - Angular sci-fi typography throughout
  - Deep space black background with purple stellar accents
- **Unique Element**: Sci-fi orbital rings, space-themed angular fonts

##### Starry Night
- **Concept**: Van Gogh inspired, twinkling starfield with dynamic stars
- **Typography**: Playfair Display serif + Inter
- **Layout Features**:
  - **Dynamic starfield**: 50 randomly positioned twinkling stars
  - Deep blue radial gradient background
  - Gold/yellow star accents with glow effects
  - Twinkling CSS animation on stars
- **Unique Element**: Random star positions generated per session; header and bean cards share same starfield

### Key Visual Differences Between Themes

| Feature | Warm | Vintage | Espresso | Zen Garden | Matcha | Aurora | Washi | Space | Starry Night |
|---------|------|---------|----------|------------|--------|--------|-------|-------|--------------|
| Typography | Merriweather + Inter | Playfair + Inter | Playfair + Inter | Cormorant Garamond | Noto Sans JP + Inter | Playfair + Inter | Noto Serif JP + Inter | Orbitron + Rajdhani | Playfair + Inter |
| Tasting Notes | Bullets (•) | Bullets (•) | Bullets (•) | Bullets (•) | Bullets (•) | Bullets (•) | Bullets (•) | Bullets (•) | Bullets (•) |
| Info Layout | 3-column | 3-column | 3-column | 3-column | 3-column | 3-column | 3-column | 3-column | 3-column |
| Frame/Border | Top accent | Full border | None | Thin border | None | Rounded card | Top + side borders | Orbital rings | Starfield |
| Dynamic Elements | Static | Static | Static | Static | Static | Gradient | Static | Static | Stars |

### Dynamic Theme Features

#### Aurora Theme
- **Random Gradient Generation**: 3-5 random colors selected from 18-color palette
- **Random Angle**: 0-360 degrees for gradient direction
- **Luminance-Based Text Color**: Automatically calculates if gradient is light or dark
  - Dark background (luminance < 0.5) → White text with glow
  - Light background (luminance ≥ 0.5) → Dark text (#1a1a2e)
- **Shared Across Cards**: Same gradient used for header + all bean cards per generation

#### Starry Night Theme
- **Random Star Generation**: 50 stars with random positions, sizes, and opacity
- **Twinkling Animation**: CSS keyframes for star brightness pulsing
- **Consistent Starfield**: Same star positions used for header + all bean cards per generation
- **Radial Gradient Background**: Deep blue night sky effect

### Image Generation Flow

1. User enters bean data (Step 1)
2. User customizes settings including format selection (Step 2)
3. User clicks "Generate Images" (Step 3)
4. App generates dynamic theme data (Aurora gradient / Starry Night stars) once per session
5. App uses html2canvas to render React components to canvas
6. **Canvas dimensions dynamically set based on selected format** (square/portrait/story)
7. Canvas converted based on quality setting (JPEG 95% or PNG Lossless)
8. Images downloadable individually or as ZIP

### Image Formats

**Dynamic dimensions based on user selection:**
- **Square**: 1080 × 1080 (1:1 aspect ratio) - Universal Instagram posts
- **Portrait**: 1080 × 1350 (4:5 aspect ratio) - Maximized feed visibility
- **Story**: 1080 × 1920 (9:16 aspect ratio) - Instagram Stories/Reels

All cards (header and bean) use `IMAGE_DIMENSIONS` from types to set width/height dynamically.

### Component Structure

#### Step 1: BeanEntryForm
- Displays up to 5 bean cards
- Each card: roaster, name, origin, varietal, roast profile, tasting notes (tags)
- Real-time validation
- Import/Export JSON functionality

#### Step 2: ImageSettings
- Format selector (3 options: square, portrait, story)
- **Theme selector with category tabs** (4 categories: Classic, Coffee, Nature, Artistic)
- Export quality selector (2 options: High JPEG 95%, Maximum PNG Lossless)
- Background options: default, custom, gradient
- Logo upload (PNG/SVG, max 2MB)
- Header text customization

#### Step 3: GenerateDownload
- Generates 1 header card + N bean cards using selected format dimensions
- **Shares dynamic theme data** (Aurora gradient / Starry Night stars) across all cards
- Preview gallery with navigation
- Individual download buttons
- Download all as ZIP
- Export as JSON
- Start over (clears all data)

### Security Features

- 100% client-side (no server, no API calls)
- Content Security Policy in index.html
- File validation: MIME type + extension checks
- File size limits enforced (5MB for images, 2MB for logos)
- No localStorage (data cleared on browser close/refresh)
- No external data fetching

### GitHub Pages Deployment

- Automated deployment via GitHub Actions
- Triggered on push to `main` branch
- Uses Bun for installation and build
- Deploys built `dist` folder to GitHub Pages
- Custom domain support via CNAME

## Development Commands

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type check
bun run lint
```

## Color Palette (Flexoki)

The application uses the Flexoki color scheme for light theme only (no dark mode toggle):

**Light Mode Only:**
- Background: #FFFCF0 (paper white)
- Foreground: #100F0F (black)
- Paper: #F2F0E5 (cream)
- Muted: #878580 (gray)
- Accent: #D14D41 (red)

**Individual Theme Colors:**
- Warm Light: Cream (#FEF9F3), earthy tones
- Warm Dark: Dark brown (#1A1311), cream accents
- Vintage Light: Aged paper (#F4ECD8), sepia tones
- Vintage Dark: Dark sepia (#1F1810), aged paper aesthetic
- Espresso: Light (#F5F0EB) / Dark (#1A0F0A), rich brown accents
- Zen Garden: Sage green (#F8FAF7), stone gray accents
- Matcha: Warm white (#FAFCF5), matcha green (#6B8E23)
- Aurora: Deep blue/purple base with dynamic vibrant gradients
- Washi: Cream (#F7F5F0), indigo (#1E3A5F), vermillion (#C9302C)
- Space: Deep space black (#0A0A0F), stellar purple (#7B68EE)
- Starry Night: Night blue (#0d1b2a), gold stars (#ffd700)

## Key Design Decisions

1. **No State Persistence**: As per requirements, data is stored in-memory only
2. **Client-Side Only**: All processing happens in browser, works offline
3. **Twelve Distinct Themes**: Each with fundamentally different layouts, not just color changes
4. **Theme Uniqueness**: Each theme has unique information architecture, typography weight, and visual elements
5. **Dynamic Themes**: Aurora and Starry Night generate unique visuals on every generation
6. **Consistent Spacing**: 80px outer padding, 60-80px section spacing across all themes
7. **Centered Layouts**: All content properly centered with textAlign: 'center'
8. **Format-Aware Generation**: Image dimensions dynamically adjust based on selected format
9. **Static Build**: Vite produces static files suitable for GitHub Pages
10. **Progressive Generation**: Images generated sequentially with progress feedback
11. **Modular Components**: Easy to add new themes or image formats
12. **Adaptive Text Colors**: Aurora theme automatically adjusts text color based on gradient luminance
13. **Shared Theme Data**: Header and bean cards share dynamic elements (gradients/stars) per generation

## Recent Updates

### New Themes Added (2025)
- **Espresso / Espresso Dark**: Rich coffee shop aesthetic with elegant typography
- **Aurora**: Dynamic gradient theme with adaptive text colors
- **Zen Garden**: Minimalist sage green aesthetic with Cormorant Garamond font
- **Washi / Washi Dark**: Traditional Japanese paper aesthetic with Noto Serif JP
- **Matcha**: Kyoto cafe style with geometric patterns
- **Space**: Project Hail Mary inspired with sci-fi fonts (Orbitron + Rajdhani)
- **Starry Night**: Van Gogh inspired with dynamic twinkling starfield

### Dynamic Theme Features
- **Aurora Gradient Generation**: Random 3-5 color gradients with luminance-based text color
- **Starry Night Stars**: 50 randomly positioned stars with twinkling animation
- **Shared Theme Data**: Header and all bean cards use same gradient/star positions per generation

### Label Size Improvements
- **Increased readability**: Label sizes increased from 10-11px to 14-16px across all themes
- **Warm Layout**: 16px labels (was 11px)
- **Vintage Layout**: 14px labels (was 10px)
- **Consistent sizing**: All themes now use 14-16px for Origin, Varietal, Roast, Flavor Profile labels

### Font Consistency
- **Zen Garden**: Now uses Cormorant Garamond consistently for all text (title, roaster, details)
- **Space**: Uses Orbitron for title only, Rajdhani for body text (angular sci-fi aesthetic)
- **Header/Bean Card Consistency**: Both now use heading font for bean details

### ThemeSelector Redesign
- **Category Tabs**: Themes organized into Classic, Coffee, Nature, Artistic categories
- **3-Column Grid**: Better space utilization for theme selection
- **Color Preview Dots**: Shows primary, accent, and text colors
- **Selected Indicator**: Checkmark in theme accent color
- **Dynamic Descriptions**: Shows theme description at bottom

### New Utility: aurora.ts
- **`generateAuroraThemeData()`**: Creates random gradient + calculates text color
- **`generateStarryNightStars()`**: Generates random star positions
- **Luminance calculation**: Determines if background is light or dark for text contrast

## File Size Limits

- Logo images: 2MB max, PNG/SVG/JPG recommended at 500×500px or larger
- Generated images: JPEG 95% or PNG Lossless based on quality setting

## Browser Compatibility

Targets modern browsers with:
- ES2020 JavaScript features
- CSS Grid and Flexbox
- Canvas rendering
- File API and Blob handling
- Drag and drop API
- CSS Animations (for twinkling stars)

## Layout Principles

- Centered alignment throughout all themes
- Consistent spacing rhythm (80px, 60px, 40px, 24px increments)
- Three-column info sections for Origin, Varietal, Roast (all themes)
- Flavor Profile always at bottom with proper labels
- Vintage theme uses decorative borders (4px solid) on both cards
- Zen Garden uses thin 1px borders for minimalist aesthetic
- All text elements properly centered with textAlign: 'center'
- Dynamic canvas dimensions based on selected image format

## Mobile Responsive Design

The application uses a **mobile-first responsive approach** with Tailwind CSS breakpoints.

### Breakpoint Strategy
- **Mobile (default)**: < 640px - Single column layouts, stacked buttons, reduced padding
- **Desktop (sm+)**: ≥ 640px - Multi-column grids, horizontal buttons, full padding

### Component Adaptations

**App.tsx (Progress Steps)**
- Step indicators: `px-3 py-1.5` on mobile, `px-4 py-2` on desktop
- Spacing between steps: `gap-1` on mobile, `gap-3` on desktop
- Dividers: `w-6` on mobile, `w-12` on desktop
- Labels hidden on mobile with `hidden sm:inline`

**BeanEntryForm.tsx**
- Bean cards: `p-4` padding on mobile, `p-8` on desktop
- Heading: `text-xl` on mobile, `text-2xl` on desktop
- Footer buttons: Stacked (`flex-col-reverse`) on mobile, horizontal (`sm:flex-row`) on desktop

**ImageSettings.tsx**
- Background tabs: `flex-wrap` to prevent overflow
- Logo position/size grids: Single column on mobile, two columns on desktop (`grid-cols-1 sm:grid-cols-2`)
- Button text: `text-xs` on mobile, `text-sm` on desktop
- Section padding: `p-4` on mobile, `p-8` on desktop

**FormatSelector.tsx**
- Format cards: Single column on mobile, three columns on desktop (`grid-cols-1 sm:grid-cols-3`)

**ThemeSelector.tsx**
- Category tabs: Horizontal scroll on mobile, full display on desktop
- Theme cards: 2-column grid on mobile, 3-column on desktop (`grid-cols-2 sm:grid-cols-3`)

**GenerateDownload.tsx**
- Image navigation buttons: `flex-wrap` with reduced padding on mobile
- Action buttons: Stacked (`flex-col`) on mobile, horizontal (`sm:flex-row`) on desktop
- Preview container: `p-4` on mobile, `p-8` on desktop

### Responsive Patterns Used

1. **Button Stacking**: Footer and action buttons use `flex-col-reverse sm:flex-row` to stack vertically on mobile while maintaining visual hierarchy
2. **Progressive Padding**: Reduced padding on mobile (`p-4`) with larger values on desktop (`p-8`)
3. **Flexible Grids**: Grids start single column and expand at breakpoints (`grid-cols-1 sm:grid-cols-3`)
4. **Text Scaling**: Headings and labels use responsive font sizes (`text-xl sm:text-2xl`)
5. **Flex Wrapping**: Tab buttons and navigation use `flex-wrap` to prevent horizontal overflow
