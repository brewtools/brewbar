import type { LayoutProps } from './types'

export function ZenGardenLayout({ bean, themeConfig }: LayoutProps) {
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

      {bean.process && (
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
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
            Process
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
            {bean.process}
          </div>
        </div>
      )}

      {bean.tastingNotes.length > 0 && (
        <div style={{ textAlign: 'center' }}>
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
