import type { LayoutProps } from './types'

export function SpaceLayout({ bean, themeConfig }: LayoutProps) {
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

      {bean.process && (
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
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
            Process
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
            {bean.process}
          </div>
        </div>
      )}

      {bean.tastingNotes.length > 0 && (
        <div style={{ textAlign: 'center' }}>
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
