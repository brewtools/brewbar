import type { Theme } from '@/types'

export interface ThemeConfig {
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    paper: string
    text: string
    mutedText: string
  }
  fonts: {
    heading: string
    body: string
  }
  styles: {
    borderRadius: string
    shadowClass: string
  }
}

export const themes: Record<Theme, ThemeConfig> = {
  warm: {
    name: 'Warm & Cozy',
    description: 'Earthy tones, warm browns, soft shadows',
    colors: {
      primary: '#FEF9F3',
      secondary: '#E8DDD4',
      accent: '#8B7355',
      paper: '#FFF9F5',
      text: '#3E2723',
      mutedText: '#6D4C41',
    },
    fonts: {
      heading: 'Merriweather',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.75rem',
      shadowClass: 'shadow-lg',
    },
  },
  'warm-dark': {
    name: 'Warm Dark',
    description: 'Earthy tones, dark background, warm accents',
    colors: {
      primary: '#2D1F1A',
      secondary: '#3E2723',
      accent: '#D4A574',
      paper: '#1A1311',
      text: '#F5E6D3',
      mutedText: '#A0826D',
    },
    fonts: {
      heading: 'Merriweather',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.75rem',
      shadowClass: 'shadow-lg',
    },
  },
  vintage: {
    name: 'Vintage Retro',
    description: 'Aged paper, sepia tones, classic typography',
    colors: {
      primary: '#F4ECD8',
      secondary: '#E8DCCA',
      accent: '#5D4037',
      paper: '#F5E6D3',
      text: '#3E2723',
      mutedText: '#6D4C41',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.25rem',
      shadowClass: 'shadow-md',
    },
  },
  'vintage-dark': {
    name: 'Vintage Dark',
    description: 'Aged paper look, dark background, classic typography',
    colors: {
      primary: '#2C2418',
      secondary: '#3E3226',
      accent: '#C4A77D',
      paper: '#1F1810',
      text: '#E8DCCA',
      mutedText: '#A89880',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.25rem',
      shadowClass: 'shadow-md',
    },
  },
}

export function getTheme(theme: Theme): ThemeConfig {
  return themes[theme]
}