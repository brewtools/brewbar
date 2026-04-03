import type { Bean, GlobalSettings } from '@/types'
import { getTheme } from '@/themes/themes'
import { IMAGE_DIMENSIONS } from '@/types'

interface HeaderCardProps {
  beans: Bean[]
  settings: GlobalSettings
}

export function HeaderCard({ beans, settings }: HeaderCardProps) {
  const themeConfig = getTheme(settings.theme)
  const isVintage = settings.theme === 'vintage' || settings.theme === 'vintage-dark'
  const dimensions = IMAGE_DIMENSIONS[settings.format]

  const getBackgroundStyle = (): React.CSSProperties => {
    if (settings.backgroundType === 'default') {
      return { backgroundColor: themeConfig.colors.paper }
    }

    if (settings.backgroundType === 'global' && settings.backgroundImage) {
      return {
        backgroundImage: `url(${settings.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }

    if (settings.backgroundType === 'gradient') {
      const intensity = settings.gradientIntensity / 100
      const baseColor = themeConfig.colors.paper
      return {
        background: `linear-gradient(135deg, ${baseColor} 0%, ${settings.gradientColor}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 100%)`,
      }
    }

    return { backgroundColor: themeConfig.colors.paper }
  }

  return (
    <div
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        position: 'relative',
        ...getBackgroundStyle(),
      }}
    >
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
              width: settings.logoSize === 'small' ? '80px' : settings.logoSize === 'medium' ? '120px' : '180px',
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
          padding: isVintage ? '60px' : '0',
          border: isVintage ? `4px solid ${themeConfig.colors.accent}` : 'none',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            marginBottom: '80px',
            color: themeConfig.colors.text,
            textAlign: 'center',
            fontFamily: themeConfig.fonts.heading,
          }}
        >
          {settings.headerText}
        </h1>

        {/* Bean List */}
        <div style={{ width: '100%', maxWidth: '800px' }}>
          {beans.slice(0, 5).map((bean, index) => (
            <div
              key={bean.id}
              style={{
                padding: '24px 0',
                borderBottom:
                  index < Math.min(beans.length - 1, 4)
                    ? `1px solid ${themeConfig.colors.text}15`
                    : 'none',
                fontSize: '28px',
                fontFamily: themeConfig.fonts.body,
                color: themeConfig.colors.text,
                textAlign: 'center',
              }}
            >
              <span style={{ fontWeight: 600 }}>{bean.roaster}</span>
              <span style={{ margin: '0 16px', opacity: 0.3 }}>—</span>
              <span style={{ opacity: 0.7 }}>{bean.origin}</span>
            </div>
          ))}
          {beans.length > 5 && (
            <div
              style={{
                padding: '24px 0',
                fontSize: '24px',
                fontFamily: themeConfig.fonts.body,
                color: themeConfig.colors.mutedText,
                textAlign: 'center',
              }}
            >
              + {beans.length - 5} more
            </div>
          )}
        </div>
      </div>
    </div>
  )
}