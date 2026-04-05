import type { LayoutProps } from './types'

export function MatchaLayout({ bean, themeConfig }: LayoutProps) {
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

      {bean.process && (
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
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
            Process
            </div>
          <div
            style={{
              fontSize: '24px',
              color: themeConfig.colors.text,
              fontFamily: themeConfig.fonts.body,
              fontWeight: 400,
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
