import type { Bean, GlobalSettings } from '@/types'
import { getTheme } from '@/themes/themes'
import { IMAGE_DIMENSIONS } from '@/types'

interface BeanCardProps {
  bean: Bean
  settings: GlobalSettings
}

export function BeanCard({ bean, settings }: BeanCardProps) {
  const themeConfig = getTheme(settings.theme)
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

  const renderCard = () => {
    if (settings.theme === 'minimal' || settings.theme === 'minimal-dark') {
      return <MinimalLayout bean={bean} themeConfig={themeConfig} />
    } else if (settings.theme === 'warm' || settings.theme === 'warm-dark') {
      return <WarmLayout bean={bean} themeConfig={themeConfig} />
    } else {
      return <VintageLayout bean={bean} themeConfig={themeConfig} />
    }
  }

  return (
    <div
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
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

      {renderCard()}
    </div>
  )
}

function MinimalLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      {/* Name */}
      <h2
        style={{
          fontSize: '72px',
          fontWeight: 300,
          marginBottom: '12px',
          color: themeConfig.colors.text,
          fontFamily: themeConfig.fonts.heading,
          letterSpacing: '-2px',
        }}
      >
        {bean.name}
      </h2>

      {/* Roaster */}
      <div
        style={{
          fontSize: '24px',
          marginBottom: '80px',
          color: themeConfig.colors.mutedText,
          fontFamily: themeConfig.fonts.body,
          fontWeight: 300,
        }}
      >
        {bean.roaster}
      </div>

      {/* Divider */}
      <div
        style={{
          width: '200px',
          height: '1px',
          backgroundColor: themeConfig.colors.text,
          margin: '0 auto 80px',
          opacity: 0.1,
        }}
      />

      {/* Origin & Varietal - Side by Side */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '120px',
          marginBottom: '80px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '11px',
              color: themeConfig.colors.mutedText,
              marginBottom: '16px',
              fontFamily: themeConfig.fonts.body,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '32px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 300,
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '11px',
              color: themeConfig.colors.mutedText,
              marginBottom: '16px',
              fontFamily: themeConfig.fonts.body,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '32px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 300,
            }}
          >
            {bean.varietal}
          </div>
        </div>
      </div>

      {/* Roast - Centered, Emphasized */}
      <div
        style={{
          fontSize: '20px',
          marginBottom: '60px',
          color: themeConfig.colors.accent,
          fontFamily: themeConfig.fonts.body,
          textTransform: 'uppercase',
          letterSpacing: '4px',
          fontWeight: 500,
        }}
      >
        {bean.roastProfile}
      </div>

      {/* Tasting Notes with Borders */}
      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '11px',
              color: themeConfig.colors.mutedText,
              marginBottom: '32px',
              fontFamily: themeConfig.fonts.body,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {bean.tastingNotes.slice(0, 6).map(note => (
              <div
                key={note.id}
                style={{
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontFamily: themeConfig.fonts.body,
                  color: themeConfig.colors.text,
                  border: `1px solid ${themeConfig.colors.text}`,
                  fontWeight: 300,
                  letterSpacing: '0.5px',
                }}
              >
                {note.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function WarmLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      {/* Name - Decorative top accent */}
      <div
        style={{
          width: '60px',
          height: '4px',
          backgroundColor: themeConfig.colors.accent,
          margin: '0 auto 40px',
          borderRadius: '2px',
        }}
      />

      {/* Name */}
      <h2
        style={{
          fontSize: '64px',
          fontWeight: 700,
          marginBottom: '12px',
          color: themeConfig.colors.text,
          fontFamily: themeConfig.fonts.heading,
          lineHeight: 1.2,
        }}
      >
        {bean.name}
      </h2>

      {/* Roaster */}
      <div
        style={{
          fontSize: '28px',
          marginBottom: '80px',
          color: themeConfig.colors.accent,
          fontFamily: 'Merriweather, serif',
          fontStyle: 'italic',
        }}
      >
        by {bean.roaster}
      </div>

      {/* Origin, Varietal, Roast - Three columns */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '80px',
          marginBottom: '80px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '11px',
              color: themeConfig.colors.mutedText,
              marginBottom: '12px',
              fontFamily: 'Merriweather, serif',
              fontStyle: 'italic',
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 500,
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '11px',
              color: themeConfig.colors.mutedText,
              marginBottom: '12px',
              fontFamily: 'Merriweather, serif',
              fontStyle: 'italic',
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 500,
            }}
          >
            {bean.varietal}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '11px',
              color: themeConfig.colors.mutedText,
              marginBottom: '12px',
              fontFamily: 'Merriweather, serif',
              fontStyle: 'italic',
            }}
          >
            Roast
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 500,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {/* Tasting Notes with Pills */}
      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '11px',
              color: themeConfig.colors.mutedText,
              marginBottom: '24px',
              fontFamily: 'Merriweather, serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
            }}
          >
            {bean.tastingNotes.slice(0, 6).map(note => (
              <div
                key={note.id}
                style={{
                  padding: '14px 32px',
                  backgroundColor: themeConfig.colors.secondary,
                  color: themeConfig.colors.text,
                  fontSize: '18px',
                  borderRadius: '30px',
                  fontFamily: themeConfig.fonts.body,
                  fontWeight: 500,
                }}
              >
                {note.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function VintageLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        border: `4px solid ${themeConfig.colors.accent}`,
      }}
    >
      {/* Name */}
      <h2
        style={{
          fontSize: '68px',
          fontWeight: 400,
          marginBottom: '20px',
          color: themeConfig.colors.text,
          fontFamily: 'Playfair Display, serif',
          letterSpacing: '2px',
        }}
      >
        {bean.name}
      </h2>

      {/* Decorative Divider */}
      <div
        style={{
          width: '120px',
          height: '3px',
          backgroundColor: themeConfig.colors.accent,
          margin: '0 auto 40px',
        }}
      />

      {/* Roaster - Italic */}
      <div
        style={{
          fontSize: '30px',
          marginBottom: '70px',
          color: themeConfig.colors.text,
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          opacity: 0.9,
        }}
      >
        {bean.roaster}
      </div>

      {/* Origin, Varietal, Roast */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '70px',
          marginBottom: '70px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '10px',
              color: themeConfig.colors.mutedText,
              marginBottom: '14px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 600,
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: 'Playfair Display, serif',
              fontWeight: 400,
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '10px',
              color: themeConfig.colors.mutedText,
              marginBottom: '14px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 600,
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: 'Playfair Display, serif',
              fontWeight: 400,
            }}
          >
            {bean.varietal}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '10px',
              color: themeConfig.colors.mutedText,
              marginBottom: '14px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 600,
            }}
          >
            Roast
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: 'Playfair Display, serif',
              fontWeight: 400,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {/* Tasting Notes - Bullet Separators */}
      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '10px',
              marginBottom: '24px',
              color: themeConfig.colors.text,
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 600,
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              fontSize: '20px',
              color: themeConfig.colors.text,
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.8,
              letterSpacing: '0.5px',
            }}
          >
            {bean.tastingNotes.slice(0, 6).map((note, index) => (
              <span key={note.id}>
                {note.text}
                {index < Math.min(bean.tastingNotes.length, 6) - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}