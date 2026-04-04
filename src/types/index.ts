export type ImageFormat = 'square' | 'portrait' | 'story'

export type Theme = 'warm' | 'warm-dark' | 'vintage' | 'vintage-dark'

export type BackgroundType = 'default' | 'global' | 'gradient'

export type LogoPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type LogoSize = 'small' | 'medium' | 'large'

export type ExportQuality = 'standard' | 'high' | 'maximum'

export interface TastingNote {
  id: string
  text: string
}

export interface Bean {
  id: string
  roaster: string
  name: string
  origin: string
  varietal: string
  roastProfile: string
  tastingNotes: TastingNote[]
}

export interface GlobalSettings {
  headerText: string
  format: ImageFormat
  theme: Theme
  backgroundType: BackgroundType
  backgroundImage: string | null
  gradientColor: string
  gradientIntensity: number
  logo: string | null
  logoPosition: LogoPosition
  logoSize: LogoSize
  exportQuality: ExportQuality
}

export interface AppState {
  beans: Bean[]
  currentStep: 1 | 2 | 3
  settings: GlobalSettings
}

export const IMAGE_DIMENSIONS: Record<ImageFormat, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  portrait: { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
}

export const LOGO_SIZES: Record<LogoSize, number> = {
  small: 80,
  medium: 120,
  large: 180,
}