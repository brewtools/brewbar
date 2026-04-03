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
| Fonts | Google Fonts | - | Inter, Merriweather, Playfair Display |

## Project Structure

```
brewbar/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment config
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── HeaderCard.tsx   # Header card layout (format-aware)
│   │   │   └── BeanCard.tsx     # Bean detail card layouts (format-aware)
│   │   ├── common/
│   │   │   ├── FileUpload.tsx   # Drag-and-drop file upload
│   │   │   ├── FormatSelector.tsx # Image format selector (square/portrait/story)
│   │   │   ├── TagInput.tsx     # Tag input for tasting notes
│   │   │   └── ThemeSelector.tsx # Theme selection UI (6 themes)
│   │   └── steps/
│   │       ├── BeanEntryForm.tsx # Step 1: Bean data entry
│   │       ├── ImageSettings.tsx # Step 2: Settings & preview
│   │       └── GenerateDownload.tsx # Step 3: Generate & download (format-aware)
│   ├── hooks/
│   │   └── (reserved for custom hooks)
│   ├── store/
│   │   └── appState.tsx        # React Context-based state management
│   ├── themes/
│   │   └── themes.ts           # Theme configurations (6 themes with colors)
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions + IMAGE_DIMENSIONS
│   ├── utils/
│   │   ├── export.ts           # Download and export utilities
│   │   ├── styles.ts           # Style calculation helpers
│   │   └── validation.ts       # Input validation functions
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

**Six distinct and unique themes** (3 light + 3 dark variants):

#### Minimal Modern / Minimal Dark
- **Concept**: Sleek, contemporary, editorial-style layout
- **Typography**: Inter font with thin weights (300), dramatic letter-spacing (-2px)
- **Layout Features**:
  - Bean name at 72px, ultra-light weight for elegance
  - Simple divider line for visual separation (1px, subtle)
  - Two-column layout for Origin/Varietal only
  - Roast level prominently centered, separate, in uppercase with wide letter-spacing (4px)
  - Clean, 1px bordered boxes for tasting notes
  - Minimal color palette with strong contrast
- **Unique Element**: Vertical information hierarchy with roast level emphasized separately

#### Warm & Cozy / Warm Dark
- **Concept**: Inviting, artisanal, approachable shop feel
- **Typography**: Merriweather serif for headings + Inter for body text
- **Layout Features**:
  - Decorative accent line at top as branding element (60px wide, 4px thick, rounded)
  - Broad italic "by [Roaster]" subheading for personality
  - Three-column layout showing all info (Origin, Varietal, Roast)
  - Pill-shaped tasting notes with rounded corners (30px radius)
  - Softer color palette with cream and brown tones
  - Italicized labels for vintage charm
- **Unique Element**: Decorative top accent bar and "by [Roaster]" attribution style

#### Vintage Retro / Vintage Dark
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

### Key Visual Differences Between Themes

| Feature | Minimal | Warm | Vintage |
|---------|--------|------|---------|
| Typography Weight | Ultra-light (300) | Regular/Medium (400-500) | Regular (400) |
| Font Family | Inter only | Merriweather + Inter | Playfair Display + Inter |
| Tasting Notes Display | Bordered boxes (1px) | Rounded pills (30px radius) | Bullet separators (•) |
| Info Layout | 2-column (+roast separate) | 3-column | 3-column |
| Frame/Border | None | Top accent line (4px) | Full border frame (4px) |
| Roaster Attribution | Simple text | "by [Name]" italic | Italicized plain |
| Decorative Elements | Divider line (1px) | Top accent bar | Border frame + divider |
| Spacing Feel | Spacious & airy | Cozy & gathered | Classic & structured |

### Image Generation Flow

1. User enters bean data (Step 1)
2. User customizes settings including format selection (Step 2)
3. User clicks "Generate Images" (Step 3)
4. App uses html2canvas to render React components to canvas
5. **Canvas dimensions dynamically set based on selected format** (square/portrait/story)
6. Canvas converted to JPEG (90% quality)
7. Images downloadable individually or as ZIP

### Image Formats

**Dynamic dimensions based on user selection:**
- **Square**: 1080 × 1080 (1:1 aspect ratio) - Universal Instagram posts
- **Portrait**: 1080 × 1350 (4:5 aspect ratio) - Maximized feed visibility
- **Story**: 1080 × 1920 (9:16 aspect ratio) - Instagram Stories/Reels

All cards (header and bean) use `IMAGE_DIMENSIONS` from types to set width/height dynamically.

### Component Structure

#### Step 1: BeanEntryForm
- Displays up to 5 bean cards
- Each card: roaster, name, origin, varietal, roast profile, tasting notes (tags), bag image
- Real-time validation
- Import/Export JSON functionality

#### Step 2: ImageSettings
- Format selector (3 options: square, portrait, story)
- Theme selector (6 options with live preview)
- Background options: default, global image, per-image, gradient
- Logo upload (PNG/SVG, max 2MB)
- Header text customization

#### Step 3: GenerateDownload
- Generates 1 header card + N bean cards using selected format dimensions
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
- Minimal Light: White (#FFFFFF) background, black text
- Minimal Dark: Black (#100F0F) background, white text
- Warm Light: Cream (#FEF9F3), earthy tones
- Warm Dark: Dark brown (#1A1311), cream accents
- Vintage Light: Aged paper (#F4ECD8), sepia tones
- Vintage Dark: Dark sepia (#1F1810), aged paper aesthetic

## Key Design Decisions

1. **No State Persistence**: As per requirements, data is stored in-memory only
2. **Client-Side Only**: All processing happens in browser, works offline
3. **Six Distinct Themes**: Each with fundamentally different layouts, not just color changes
4. **Theme Uniqueness**: Each theme has unique information architecture, typography weight, and visual elements
5. **Vintage Border Frame**: Vintage themes feature decorative 4px borders on both header and bean cards
6. **Consistent Spacing**: 80px outer padding, 60-80px section spacing across all themes
7. **Centered Layouts**: All content properly centered with textAlign: 'center'
8. **Format-Aware Generation**: Image dimensions dynamically adjust based on selected format
9. **Static Build**: Vite produces static files suitable for GitHub Pages
10. **Progressive Generation**: Images generated sequentially with progress feedback
11. **Modular Components**: Easy to add new themes or image formats

## Recent Updates

### Image Format Support
- **Dynamic Dimensions**: HeaderCard and BeanCard now use `IMAGE_DIMENSIONS[format]` for width/height
- **Format Selection**: Generates correct aspect ratio based on selection (1:1, 4:5, 9:16)
- **Format Display**: Shows selected format and dimensions when generating

### Theme Enhancements
- **Unique Characteristics**: Each theme now has distinctive visual elements beyond colors
- **Minimal**: Thin typography (300 weight), large letter-spacing, simple dividers
- **Warm**: Decorative accent bars, pill-shaped tags, "by Roaster" attribution
- **Vintage**: Border frames, italic elements, bullet separators, Playfair Display serif

### Border Consistency
- **Vintage Frames**: Both header and bean cards have matching 4px solid border frames
- **Inner Contents**: Border applied as inner frame around content, not outer container
- **Consistent Padding**: 60px padding inside bordered frame for all Vintage themes

## File Size Limits

- Bean images (bag photos): 5MB max, JPG/PNG only
- Logo images: 2MB max, PNG/SVG/JPG recommended at 500×500px or larger
- Generated images: JPEG at 90% quality for optimal size/quality balance

## Browser Compatibility

Targets modern browsers with:
- ES2020 JavaScript features
- CSS Grid and Flexbox
- Canvas rendering
- File API and Blob handling
- Drag and drop API

## Layout Principles

- Centered alignment throughout all themes
- Consistent spacing rhythm (80px, 60px, 40px, 24px increments)
- Three-column info sections for Origin, Varietal, Roast (Warm/Vintage) or two-column (Minimal)
- Flavor Profile always at bottom with proper labels
- Vintage theme uses decorative borders (4px solid) on both cards
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
- Theme cards: Single column on mobile, three columns on desktop (`grid-cols-1 sm:grid-cols-3`)

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