import type { Theme } from '@/types'
import { getTheme } from '@/themes/themes'

export function getBackgroundStyle(
  backgroundType: string,
  backgroundImage: string | null,
  gradientColor: string,
  gradientIntensity: number,
  theme: Theme
): React.CSSProperties {
  const themeConfig = getTheme(theme)

  if (backgroundType === 'default') {
    return {
      backgroundColor: themeConfig.colors.paper,
    }
  }

  if (backgroundType === 'global' || backgroundType === 'perImage') {
    if (backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    return {
      backgroundColor: themeConfig.colors.paper,
    }
  }

  if (backgroundType === 'gradient') {
    const intensity = gradientIntensity / 100
    const baseColor = themeConfig.colors.paper
    return {
      background: `linear-gradient(135deg, ${baseColor} 0%, ${gradientColor}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 100%)`,
    }
  }

  return {}
}