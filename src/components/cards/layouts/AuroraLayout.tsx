import type { AuroraLayoutProps } from './types'

export function AuroraLayout({ bean, auroraData }: AuroraLayoutProps) {
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
