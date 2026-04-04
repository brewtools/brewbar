import type { Bean, GlobalSettings } from '@/types'
import { getTheme } from '@/themes/themes'
import { IMAGE_DIMENSIONS, LOGO_SIZES } from '@/types'
import { getBackgroundStyle } from '@/utils/styles'
import type { AuroraThemeData, Star } from '@/utils/aurora'

interface BeanCardProps {
  bean: Bean
  settings: GlobalSettings
  auroraData?: AuroraThemeData
  starryNightStars?: Star[]
}

export function BeanCard({ bean, settings, auroraData, starryNightStars }: BeanCardProps) {
  const themeConfig = getTheme(settings.theme)
  const dimensions = IMAGE_DIMENSIONS[settings.format]
  
  const bgStyle = getBackgroundStyle(
    settings.backgroundType,
    settings.backgroundImage,
    settings.gradientColor,
    settings.gradientIntensity,
    settings.theme
  )

  const renderCard = () => {
    if (settings.theme === 'warm' || settings.theme === 'warm-dark') {
      return <WarmLayout bean={bean} themeConfig={themeConfig} />
    } else if (settings.theme === 'vintage' || settings.theme === 'vintage-dark') {
      return <VintageLayout bean={bean} themeConfig={themeConfig} />
    } else if (settings.theme === 'espresso' || settings.theme === 'espresso-dark') {
      return <EspressoLayout bean={bean} themeConfig={themeConfig} />
    } else if (settings.theme === 'aurora') {
      return <AuroraLayout bean={bean} auroraData={auroraData} />
    } else if (settings.theme === 'zen-garden') {
      return <ZenGardenLayout bean={bean} themeConfig={themeConfig} />
    } else if (settings.theme === 'washi' || settings.theme === 'washi-dark') {
      return <WashiLayout bean={bean} themeConfig={themeConfig} />
    } else if (settings.theme === 'matcha') {
      return <MatchaLayout bean={bean} themeConfig={themeConfig} />
    } else if (settings.theme === 'starry-night') {
      return <StarryNightLayout bean={bean} themeConfig={themeConfig} stars={starryNightStars} />
    } else {
      return <SpaceLayout bean={bean} themeConfig={themeConfig} />
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
        ...bgStyle,
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
              width: `${LOGO_SIZES[settings.logoSize]}px`,
              height: 'auto',
            }}
          />
        </div>
      )}

      {renderCard()}
    </div>
  )
}

function WarmLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div
        style={{
          width: '60px',
          height: '4px',
          backgroundColor: themeConfig.colors.accent,
          margin: '0 auto 40px',
          borderRadius: '2px',
        }}
      />

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
              fontSize: '16px',
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
              fontSize: '26px',
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
              fontSize: '16px',
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
              fontSize: '26px',
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
              fontSize: '16px',
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
              fontSize: '26px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 500,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '16px',
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
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
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

      <div
        style={{
          width: '120px',
          height: '3px',
          backgroundColor: themeConfig.colors.accent,
          margin: '0 auto 40px',
        }}
      />

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
              fontSize: '14px',
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
              fontSize: '26px',
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
              fontSize: '14px',
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
              fontSize: '26px',
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
              fontSize: '14px',
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
              fontSize: '26px',
              color: themeConfig.colors.text,
              fontFamily: 'Playfair Display, serif',
              fontWeight: 400,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '14px',
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
              fontSize: '22px',
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

function EspressoLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div
        style={{
          width: '80px',
          height: '3px',
          backgroundColor: themeConfig.colors.accent,
          margin: '0 auto 30px',
          borderRadius: '1px',
        }}
      />

      <h2
        style={{
          fontSize: '60px',
          fontWeight: 600,
          marginBottom: '16px',
          color: themeConfig.colors.text,
          fontFamily: themeConfig.fonts.heading,
          lineHeight: 1.2,
          letterSpacing: '1px',
        }}
      >
        {bean.name}
      </h2>

      <div
        style={{
          fontSize: '26px',
          marginBottom: '70px',
          color: themeConfig.colors.accent,
          fontFamily: themeConfig.fonts.heading,
          fontStyle: 'italic',
        }}
      >
        {bean.roaster}
      </div>

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
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '26px',
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
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '26px',
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
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
            }}
          >
            Roast
          </div>
          <div
            style={{
              fontSize: '26px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 500,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
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

function AuroraLayout({ bean, auroraData }: { bean: Bean; auroraData?: AuroraThemeData }) {
  const textColor = auroraData?.textColor ?? '#ffffff'
  const mutedTextColor = auroraData?.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
  const accentColor = auroraData?.isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'
  const dividerColor = auroraData?.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
  
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        padding: '60px',
        borderRadius: '20px',
        background: auroraData?.gradient ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '2px',
          background: dividerColor,
          margin: '0 auto 40px',
        }}
      />

      <h2
        style={{
          fontSize: '58px',
          fontWeight: 500,
          marginBottom: '20px',
          color: textColor,
          fontFamily: 'Playfair Display, serif',
          lineHeight: 1.2,
          textShadow: auroraData?.isDark ? '0 0 30px rgba(255,255,255,0.3)' : 'none',
        }}
      >
        {bean.name}
      </h2>

      <div
        style={{
          fontSize: '24px',
          marginBottom: '70px',
          color: accentColor,
          fontFamily: 'Playfair Display, serif',
          letterSpacing: '2px',
        }}
      >
        {bean.roaster}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
          marginBottom: '70px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: mutedTextColor,
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '24px',
              color: textColor,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: mutedTextColor,
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '24px',
              color: textColor,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            {bean.varietal}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: mutedTextColor,
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            Roast
          </div>
          <div
            style={{
              fontSize: '24px',
              color: textColor,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '14px',
              color: accentColor,
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 500,
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              fontSize: '22px',
              color: textColor,
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

function ZenGardenLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  const fontFamily = 'Cormorant Garamond, serif'
  
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        padding: '70px',
        border: `1px solid ${themeConfig.colors.secondary}`,
      }}
    >
      <div
        style={{
          width: '40px',
          height: '1px',
          backgroundColor: themeConfig.colors.accent,
          margin: '0 auto 50px',
        }}
      />

      <h2
        style={{
          fontSize: '56px',
          fontWeight: 400,
          marginBottom: '16px',
          color: themeConfig.colors.text,
          fontFamily: fontFamily,
          lineHeight: 1.3,
          letterSpacing: '1px',
        }}
      >
        {bean.name}
      </h2>

      <div
        style={{
          fontSize: '24px',
          marginBottom: '80px',
          color: themeConfig.colors.mutedText,
          fontFamily: fontFamily,
          fontStyle: 'italic',
        }}
      >
        {bean.roaster}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '90px',
          marginBottom: '80px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 400,
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: fontFamily,
              fontWeight: 400,
              letterSpacing: '1px',
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 400,
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: fontFamily,
              fontWeight: 400,
              letterSpacing: '1px',
            }}
          >
            {bean.varietal}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 400,
            }}
          >
            Roast
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: fontFamily,
              fontWeight: 400,
              letterSpacing: '1px',
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '5px',
              fontWeight: 400,
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: fontFamily,
              lineHeight: 2,
              letterSpacing: '1px',
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

function WashiLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        padding: '60px',
        border: `2px solid ${themeConfig.colors.accent}`,
        borderTop: `6px solid ${themeConfig.colors.accent}`,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '4px 16px',
          border: `1px solid ${themeConfig.colors.accent}`,
          marginBottom: '40px',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            color: themeConfig.colors.accent,
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          Single Origin
        </span>
      </div>

      <h2
        style={{
          fontSize: '58px',
          fontWeight: 600,
          marginBottom: '20px',
          color: themeConfig.colors.text,
          fontFamily: themeConfig.fonts.heading,
          lineHeight: 1.2,
          letterSpacing: '2px',
        }}
      >
        {bean.name}
      </h2>

      <div
        style={{
          fontSize: '24px',
          marginBottom: '60px',
          color: themeConfig.colors.mutedText,
          fontFamily: themeConfig.fonts.heading,
        }}
      >
        {bean.roaster}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          marginBottom: '60px',
          padding: '30px 0',
          borderTop: `1px solid ${themeConfig.colors.secondary}`,
          borderBottom: `1px solid ${themeConfig.colors.secondary}`,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '13px',
              color: themeConfig.colors.mutedText,
              marginBottom: '10px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '2px',
            }}
          >
            ORIGIN
          </div>
          <div
            style={{
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.heading,
              fontWeight: 500,
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div
          style={{
            width: '1px',
            backgroundColor: themeConfig.colors.secondary,
          }}
        />

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '13px',
              color: themeConfig.colors.mutedText,
              marginBottom: '10px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '2px',
            }}
          >
            VARIETAL
          </div>
          <div
            style={{
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.heading,
              fontWeight: 500,
            }}
          >
            {bean.varietal}
          </div>
        </div>

        <div
          style={{
            width: '1px',
            backgroundColor: themeConfig.colors.secondary,
          }}
        />

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '13px',
              color: themeConfig.colors.mutedText,
              marginBottom: '10px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '2px',
            }}
          >
            ROAST
          </div>
          <div
            style={{
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.heading,
              fontWeight: 500,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '13px',
              color: themeConfig.colors.accent,
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '3px',
              fontWeight: 500,
            }}
          >
            FLAVOR PROFILE
          </div>
          <div
            style={{
              fontSize: '20px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.heading,
              lineHeight: 1.8,
              letterSpacing: '1px',
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

function MatchaLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  return (
    <div style={{ textAlign: 'center', width: '100%', padding: '60px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            width: '30px',
            height: '2px',
            backgroundColor: themeConfig.colors.accent,
          }}
        />
        <div
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: themeConfig.colors.accent,
            margin: '0 12px',
            transform: 'rotate(45deg)',
          }}
        />
        <div
          style={{
            width: '30px',
            height: '2px',
            backgroundColor: themeConfig.colors.accent,
          }}
        />
      </div>

      <h2
        style={{
          fontSize: '56px',
          fontWeight: 500,
          marginBottom: '16px',
          color: themeConfig.colors.text,
          fontFamily: themeConfig.fonts.heading,
          lineHeight: 1.2,
        }}
      >
        {bean.name}
      </h2>

      <div
        style={{
          fontSize: '22px',
          marginBottom: '70px',
          color: themeConfig.colors.mutedText,
          fontFamily: themeConfig.fonts.heading,
          letterSpacing: '2px',
        }}
      >
        {bean.roaster}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
          marginBottom: '70px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.accent,
              marginBottom: '10px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 400,
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.accent,
              marginBottom: '10px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 400,
            }}
          >
            {bean.varietal}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.accent,
              marginBottom: '10px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
            }}
          >
            Roast
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 400,
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '1px',
                backgroundColor: themeConfig.colors.accent,
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: themeConfig.colors.accent,
                margin: '0 8px',
                transform: 'rotate(45deg)',
              }}
            />
            <div
              style={{
                width: '20px',
                height: '1px',
                backgroundColor: themeConfig.colors.accent,
              }}
            />
          </div>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              lineHeight: 1.8,
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

function StarryNightLayout({ bean, themeConfig, stars }: { bean: Bean; themeConfig: ReturnType<typeof getTheme>; stars?: Star[] }) {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        padding: '60px',
        position: 'relative',
        background: `radial-gradient(ellipse at bottom, ${themeConfig.colors.secondary} 0%, ${themeConfig.colors.primary} 100%)`,
      }}
    >
      {/* Stars */}
      {stars?.map((star) => (
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

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: '80px',
            height: '2px',
            backgroundColor: themeConfig.colors.accent,
            margin: '0 auto 40px',
            opacity: 0.6,
          }}
        />

        <h2
          style={{
            fontSize: '58px',
            fontWeight: 600,
            marginBottom: '16px',
            color: themeConfig.colors.text,
            fontFamily: themeConfig.fonts.heading,
            lineHeight: 1.2,
            letterSpacing: '1px',
          }}
        >
          {bean.name}
        </h2>

        <div
          style={{
            fontSize: '24px',
            marginBottom: '70px',
            color: themeConfig.colors.mutedText,
            fontFamily: themeConfig.fonts.heading,
            fontStyle: 'italic',
          }}
        >
          {bean.roaster}
        </div>

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
                fontSize: '14px',
                color: themeConfig.colors.accent,
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontWeight: 500,
              }}
            >
              Origin
            </div>
            <div
              style={{
                fontSize: '24px',
                color: themeConfig.colors.text,
                fontFamily: themeConfig.fonts.body,
                fontWeight: 400,
              }}
            >
              {bean.origin}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '14px',
                color: themeConfig.colors.accent,
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontWeight: 500,
              }}
            >
              Varietal
            </div>
            <div
              style={{
                fontSize: '24px',
                color: themeConfig.colors.text,
                fontFamily: themeConfig.fonts.body,
                fontWeight: 400,
              }}
            >
              {bean.varietal}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '14px',
                color: themeConfig.colors.accent,
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontWeight: 500,
              }}
            >
              Roast
            </div>
            <div
              style={{
                fontSize: '24px',
                color: themeConfig.colors.text,
                fontFamily: themeConfig.fonts.body,
                fontWeight: 400,
              }}
            >
              {bean.roastProfile}
            </div>
          </div>
        </div>

        {bean.tastingNotes.length > 0 && (
          <div>
            <div
              style={{
                fontSize: '14px',
                color: themeConfig.colors.accent,
                marginBottom: '20px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                fontWeight: 500,
              }}
            >
              Flavor Profile
            </div>
            <div
              style={{
                fontSize: '22px',
                color: themeConfig.colors.text,
                fontFamily: themeConfig.fonts.body,
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

      {/* CSS for twinkling animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

function SpaceLayout({ bean, themeConfig }: { bean: Bean; themeConfig: ReturnType<typeof getTheme> }) {
  const sciFiFont = 'Rajdhani, sans-serif'
  
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        padding: '60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '120px',
          border: `2px solid ${themeConfig.colors.accent}`,
          borderRadius: '50%',
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '100px',
          border: `1px solid ${themeConfig.colors.accent}`,
          borderRadius: '50%',
          opacity: 0.2,
        }}
      />

      <h2
        style={{
          fontSize: '54px',
          fontWeight: 700,
          marginTop: '20px',
          marginBottom: '16px',
          color: themeConfig.colors.text,
          fontFamily: themeConfig.fonts.heading,
          lineHeight: 1.1,
          letterSpacing: '4px',
          textTransform: 'uppercase',
        }}
      >
        {bean.name}
      </h2>

      <div
        style={{
          fontSize: '22px',
          marginBottom: '70px',
          color: themeConfig.colors.accent,
          fontFamily: sciFiFont,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {bean.roaster}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          marginBottom: '70px',
          padding: '0 40px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '10px',
              fontFamily: sciFiFont,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Origin
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: sciFiFont,
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            {bean.origin}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '10px',
              fontFamily: sciFiFont,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Varietal
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: sciFiFont,
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            {bean.varietal}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '10px',
              fontFamily: sciFiFont,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Roast
          </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: sciFiFont,
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            {bean.roastProfile}
          </div>
        </div>
      </div>

      {bean.tastingNotes.length > 0 && (
        <div>
          <div
            style={{
              width: '60px',
              height: '1px',
              backgroundColor: themeConfig.colors.accent,
              margin: '0 auto 20px',
              opacity: 0.5,
            }}
          />
          <div
            style={{
              fontSize: '14px',
              color: themeConfig.colors.mutedText,
              marginBottom: '16px',
              fontFamily: sciFiFont,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Flavor Profile
          </div>
          <div
            style={{
              fontSize: '22px',
              color: themeConfig.colors.text,
              fontFamily: sciFiFont,
              lineHeight: 1.8,
              letterSpacing: '2px',
              fontWeight: 500,
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
