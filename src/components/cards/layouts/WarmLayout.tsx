import type { LayoutProps } from './types'

export function WarmLayout({ bean, themeConfig }: LayoutProps) {
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
