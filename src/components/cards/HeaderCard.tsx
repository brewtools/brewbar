import type { Bean, GlobalSettings } from '@/types'
import { getTheme } from '@/themes/themes'
import { IMAGE_DIMENSIONS, LOGO_SIZES } from '@/types'
import { getBackgroundStyle } from '@/utils/styles'
import type { AuroraThemeData, Star } from '@/utils/aurora'

interface HeaderCardProps {
  beans: Bean[]
  settings: GlobalSettings
  auroraData?: AuroraThemeData
  starryNightStars?: Star[]
}

export function HeaderCard({ beans, settings, auroraData, starryNightStars }: HeaderCardProps) {
  const themeConfig = getTheme(settings.theme)
  const hasBorder = ['vintage', 'vintage-dark', 'espresso', 'espresso-dark', 'washi', 'washi-dark', 'zen-garden'].includes(settings.theme)
  const dimensions = IMAGE_DIMENSIONS[settings.format]
  
  const bgStyle = getBackgroundStyle(
    settings.backgroundType,
    settings.backgroundImage,
    settings.gradientColor,
    settings.gradientIntensity,
    settings.theme
  )

  // Special background for Aurora theme
  const isAurora = settings.theme === 'aurora'
  const isStarryNight = settings.theme === 'starry-night'
  
  const containerStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px',
    position: 'relative' as const,
    ...(isAurora ? { background: auroraData?.gradient } : 
      isStarryNight ? { 
        background: `radial-gradient(ellipse at bottom, ${themeConfig.colors.secondary} 0%, ${themeConfig.colors.primary} 100%)` 
      } : bgStyle),
  }

  // Determine text colors based on theme
  const textColor = isAurora 
    ? (auroraData?.textColor ?? '#ffffff')
    : isStarryNight 
      ? themeConfig.colors.text 
      : themeConfig.colors.text
  
  const mutedTextColor = isAurora 
    ? (auroraData?.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)')
    : isStarryNight 
      ? themeConfig.colors.mutedText 
      : themeConfig.colors.mutedText

  const dividerColor = isAurora
    ? (auroraData?.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')
    : isStarryNight
      ? 'rgba(255,255,255,0.15)'
      : `${themeConfig.colors.text}15`

  return (
    <div style={containerStyle}>
      {/* Stars for Starry Night theme */}
      {isStarryNight && starryNightStars?.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: themeConfig.colors.accent,
            borderRadius: '50%',
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px ${themeConfig.colors.accent}`,
            animation: `twinkle 3s infinite ${star.animationDelay}s`,
          }}
        />
      ))}

      {settings.logo && (
        <div
          style={{
            position: 'absolute',
            ...(settings.logoPosition === 'top-left' && { top: '60px', left: '60px' }),
            ...(settings.logoPosition === 'top-right' && { top: '60px', right: '60px' }),
            ...(settings.logoPosition === 'bottom-left' && { bottom: '60px', left: '60px' }),
            ...(settings.logoPosition === 'bottom-right' && { bottom: '60px', right: '60px' }),
          }}
        >
          <img
            src={settings.logo}
            alt="Logo"
            style={{
              width: `${LOGO_SIZES[settings.logoSize]}px`,
              height: 'auto',
            }}
          />
        </div>
      )}

      <div
        style={{
          textAlign: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: hasBorder ? '60px' : '0',
          border: hasBorder ? `4px solid ${themeConfig.colors.accent}` : 'none',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            marginBottom: '80px',
            color: textColor,
            textAlign: 'center',
            fontFamily: themeConfig.fonts.heading,
            textShadow: isAurora && auroraData?.isDark ? '0 0 30px rgba(255,255,255,0.3)' : undefined,
          }}
        >
          {settings.headerText}
        </h1>

        <div style={{ width: '100%', maxWidth: '800px' }}>
          {beans.slice(0, 5).map((bean, index) => (
            <div
              key={bean.id}
              style={{
                padding: '24px 0',
                borderBottom:
                  index < Math.min(beans.length - 1, 4)
                    ? `1px solid ${dividerColor}`
                    : 'none',
                fontSize: '28px',
                fontFamily: themeConfig.fonts.heading,
                color: textColor,
                textAlign: 'center',
              }}
            >
              <span style={{ fontWeight:600 }}>{bean.roaster}</span>
              <span style={{ margin: '0 16px', opacity: 0.5 }}>—</span>
              <span style={{ opacity: 0.8 }}>{bean.origin}</span>
            </div>
          ))}
          {beans.length > 5 && (
            <div
              style={{
                padding: '24px 0',
                fontSize: '24px',
                fontFamily: themeConfig.fonts.heading,
                color: mutedTextColor,
                textAlign: 'center',
              }}
            >
              + {beans.length - 5} more
            </div>
          )}
        </div>
      </div>

      {/* CSS for twinkling animation */}
      {isStarryNight && (
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      )}
    </div>
  )
}
