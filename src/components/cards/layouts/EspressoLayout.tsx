import type { LayoutProps } from './types'

export function EspressoLayout({ bean, themeConfig }: LayoutProps) {
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
