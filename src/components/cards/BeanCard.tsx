import type { Bean, GlobalSettings } from '@/types'
import { getTheme } from '@/themes/themes'
import { IMAGE_DIMENSIONS, LOGO_SIZES } from '@/types'
import { getBackgroundStyle } from '@/utils/styles'
import type { AuroraThemeData, Star } from '@/utils/aurora'
import {
  WarmLayout,
  VintageLayout,
  EspressoLayout,
  AuroraLayout,
  ZenGardenLayout,
  WashiLayout,
  MatchaLayout,
  StarryNightLayout,
  SpaceLayout,
} from './layouts'

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
    switch (settings.theme) {
      case 'warm':
      case 'warm-dark':
        return <WarmLayout bean={bean} themeConfig={themeConfig} />
      case 'vintage':
      case 'vintage-dark':
        return <VintageLayout bean={bean} themeConfig={themeConfig} />
      case 'espresso':
      case 'espresso-dark':
        return <EspressoLayout bean={bean} themeConfig={themeConfig} />
      case 'aurora':
        return <AuroraLayout bean={bean} auroraData={auroraData} />
      case 'zen-garden':
        return <ZenGardenLayout bean={bean} themeConfig={themeConfig} />
      case 'washi':
      case 'washi-dark':
        return <WashiLayout bean={bean} themeConfig={themeConfig} />
      case 'matcha':
        return <MatchaLayout bean={bean} themeConfig={themeConfig} />
      case 'starry-night':
        return <StarryNightLayout bean={bean} themeConfig={themeConfig} stars={starryNightStars} />
      case 'space':
        return <SpaceLayout bean={bean} themeConfig={themeConfig} />
      default:
        return <WarmLayout bean={bean} themeConfig={themeConfig} />
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
