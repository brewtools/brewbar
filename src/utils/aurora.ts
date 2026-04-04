// Utility for Aurora theme gradient generation and text color calculation

const AURORA_COLORS = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe',
  '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f', '#ff8a80', '#ffab91',
  '#ea80fc', '#b388ff', '#8c9eff', '#82b1ff', '#84ffff', '#a7ffeb',
  '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd',
]

export interface AuroraThemeData {
  gradient: string
  textColor: string
  isDark: boolean
}

// Calculate luminance of a hex color
function getLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  
  // Relative luminance formula
  const rsRGB = r / 255
  const gsRGB = g / 255
  const bsRGB = b / 255
  
  const rLum = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const gLum = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const bLum = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)
  
  return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum
}

// Generate a random Aurora gradient and determine text color
export function generateAuroraThemeData(): AuroraThemeData {
  // Pick 3-5 random colors
  const numColors = 3 + Math.floor(Math.random() * 3)
  const selectedColors: string[] = []
  for (let i = 0; i < numColors; i++) {
    selectedColors.push(AURORA_COLORS[Math.floor(Math.random() * AURORA_COLORS.length)])
  }
  
  // Generate random angle
  const angle = Math.floor(Math.random() * 360)
  const gradient = `linear-gradient(${angle}deg, ${selectedColors.join(', ')})`
  
  // Calculate average luminance to determine text color
  const avgLuminance = selectedColors.reduce((sum, color) => sum + getLuminance(color), 0) / selectedColors.length
  
  // If background is light (luminance > 0.5), use dark text, otherwise use light text
  const isDark = avgLuminance < 0.5
  const textColor = isDark ? '#ffffff' : '#1a1a2e'
  
  return { gradient, textColor, isDark }
}

// Generate random stars for Starry Night theme
export interface Star {
  id: number
  left: number
  top: number
  size: number
  opacity: number
  animationDelay: number
}

export function generateStarryNightStars(count: number = 50): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7,
      animationDelay: Math.random() * 3,
    })
  }
  return stars
}
