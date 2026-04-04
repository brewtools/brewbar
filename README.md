# Brewbar

A single-page web application for cafe owners to create Instagram-ready menu images for their coffee bean offerings. The application runs entirely in the browser with no server dependencies.

## Prerequisites

- [Bun](https://bun.sh/) 1.3.11 or later

## Installation

```bash
bun install
```

## Development

Start the development server:

```bash
bun run dev
```

## Build

Build for production:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- html2canvas
- JSZip

## Features

- Create coffee bean menu cards for Instagram
- Three image formats: Square (1080x1080), Portrait (1080x1350), Story (1080x1920)
- Four themes: Warm Light, Warm Dark, Vintage Light, Vintage Dark
- Export images individually or as ZIP archive
