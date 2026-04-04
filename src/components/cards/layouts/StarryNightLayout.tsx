import type { StarryNightLayoutProps } from './types'

export function StarryNightLayout({ bean, themeConfig, stars }: StarryNightLayoutProps) {
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
