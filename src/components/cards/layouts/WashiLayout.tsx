import type { LayoutProps } from './types'

export function WashiLayout({ bean, themeConfig }: LayoutProps) {
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
