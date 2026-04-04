import type { LayoutProps } from './types'

export function VintageLayout({ bean, themeConfig }: LayoutProps) {
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
