# Brewbar

Create Instagram-ready coffee menu images in seconds. Brewbar is a client-side web application for cafe owners to showcase their coffee bean offerings with beautiful, professional-looking menu cards.

## Features

### 12 Unique Themes

Organized into 4 categories:

- **Classic**: Warm & Cozy, Warm Dark, Vintage Retro, Vintage Dark
- **Coffee**: Espresso, Espresso Dark
- **Nature**: Zen Garden, Matcha
- **Artistic**: Aurora, Washi, Washi Dark, Space, Starry Night

### Dynamic Themes

- **Aurora**: Generates a unique gradient every time you create images. Text color automatically adapts for perfect contrast.
- **Starry Night**: Creates a unique starfield with 50 twinkling stars that matches across all your menu images.

### Multiple Formats

- **Square** (1080x1080) - Perfect for Instagram posts
- **Portrait** (1080x1350) - Maximum feed visibility
- **Story** (1080x1920) - Instagram Stories and Reels

### Customization

- Upload your cafe logo
- Customize header text
- Choose background type (default, gradient, or custom image)
- Position logo in any corner
- Select export quality (High JPEG or Maximum PNG)

### Export Options

- Download individual images
- Download all as ZIP archive
- Export/Import JSON for backup

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.3.11 or later

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

### Build for Production

```bash
bun run build
```

## Usage

1. **Enter Bean Details** - Add up to 5 coffee beans with roaster, name, origin, varietal, roast profile, and tasting notes
2. **Customize Settings** - Choose theme, format, logo, and header text
3. **Generate and Download** - Create your menu images and download them

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 8** - Build tool
- **Tailwind CSS 3** - Styling
- **html2canvas** - DOM to image generation
- **JSZip** - ZIP file creation

## How It Works

Brewbar uses `html2canvas` to render React components directly to canvas elements, which are then converted to downloadable images. The entire app runs client-side with:

- No server required
- No data persistence (everything in memory)
- Works offline
- No external API calls

## Themes Showcase

| Theme | Style |
|-------|-------|
| Warm & Cozy | Earthy, approachable |
| Vintage | Classic, timeless |
| Espresso | Rich, modern |
| Zen Garden | Minimalist, peaceful |
| Matcha | Fresh, geometric |
| Aurora | Dynamic gradients |
| Washi | Traditional Japanese |
| Space | Sci-fi, cosmic |
| Starry Night | Twinkling stars |

## Development

### Project Structure

```
src/
├── components/
│   ├── cards/          # Card components (Header, Bean)
│   ├── common/         # Reusable UI components
│   └── steps/          # Form steps (Bean Entry, Settings, Generate)
├── themes/             # Theme configurations
├── utils/              # Utilities (export, aurora generator)
└── store/              # React Context state
```
