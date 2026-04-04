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
  espresso: {
    name: 'Espresso',
    description: 'Rich espresso browns, modern coffee shop aesthetic',
    colors: {
      primary: '#F5F0EB',
      secondary: '#E8E0D8',
      accent: '#3D2314',
      paper: '#FFFDF9',
      text: '#2C1810',
      mutedText: '#6B4423',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.5rem',
      shadowClass: 'shadow-xl',
    },
  },
  'espresso-dark': {
    name: 'Espresso Dark',
    description: 'Deep espresso tones, dark roast aesthetic',
    colors: {
      primary: '#1A0F0A',
      secondary: '#2A1810',
      accent: '#D4A574',
      paper: '#0F0906',
      text: '#F5E6D3',
      mutedText: '#A0826D',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.5rem',
      shadowClass: 'shadow-xl',
    },
  },
  aurora: {
    name: 'Aurora',
    description: 'Ethereal gradient beauty, celestial vibes',
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#e94560',
      paper: '#0f0f1a',
      text: '#eaeaea',
      mutedText: '#a0a0a0',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    styles: {
      borderRadius: '1rem',
      shadowClass: 'shadow-2xl',
    },
  },
  'zen-garden': {
    name: 'Zen Garden',
    description: 'Peaceful sage greens, minimalist tranquility',
    colors: {
      primary: '#F8FAF7',
      secondary: '#E8EDE6',
      accent: '#5B7065',
      paper: '#FEFFFD',
      text: '#2C3E35',
      mutedText: '#7A8F82',
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.125rem',
      shadowClass: 'shadow-sm',
    },
  },
  washi: {
    name: 'Washi',
    description: 'Traditional Japanese paper, indigo and vermillion',
    colors: {
      primary: '#F7F5F0',
      secondary: '#EBE7DE',
      accent: '#C9302C',
      paper: '#FFFEFB',
      text: '#1E3A5F',
      mutedText: '#4A6B8A',
    },
    fonts: {
      heading: 'Noto Serif JP',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.125rem',
      shadowClass: 'shadow-md',
    },
  },
  'washi-dark': {
    name: 'Washi Dark',
    description: 'Traditional Japanese aesthetic, dark indigo',
    colors: {
      primary: '#1E3A5F',
      secondary: '#152A45',
      accent: '#E74C3C',
      paper: '#0F1F35',
      text: '#F5F3EF',
      mutedText: '#8FA4B8',
    },
    fonts: {
      heading: 'Noto Serif JP',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.125rem',
      shadowClass: 'shadow-md',
    },
  },
  matcha: {
    name: 'Matcha',
    description: 'Kyoto cafe style, fresh matcha green aesthetic',
    colors: {
      primary: '#FAFCF5',
      secondary: '#F0F5E6',
      accent: '#6B8E23',
      paper: '#FEFFF9',
      text: '#2D3B1F',
      mutedText: '#5D6B3F',
    },
    fonts: {
      heading: 'Noto Sans JP',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.25rem',
      shadowClass: 'shadow-lg',
    },
  },
  space: {
    name: 'Space',
    description: 'Project Hail Mary inspired, stellar cosmic aesthetic',
    colors: {
      primary: '#0A0A0F',
      secondary: '#12121A',
      accent: '#7B68EE',
      paper: '#050508',
      text: '#E8E8FF',
      mutedText: '#8888AA',
    },
    fonts: {
      heading: 'Orbitron',
      body: 'Rajdhani',
    },
    styles: {
      borderRadius: '0.75rem',
      shadowClass: 'shadow-2xl',
    },
  },
  'starry-night': {
    name: 'Starry Night',
    description: 'Van Gogh inspired, twinkling starfield with dynamic stars',
    colors: {
      primary: '#0d1b2a',
      secondary: '#1b263b',
      accent: '#ffd700',
      paper: '#0b1320',
      text: '#e0e1dd',
      mutedText: '#778da9',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    styles: {
      borderRadius: '0.5rem',
      shadowClass: 'shadow-2xl',
    },
  },
}

export function getTheme(theme: Theme): ThemeConfig {
  return themes[theme]
}