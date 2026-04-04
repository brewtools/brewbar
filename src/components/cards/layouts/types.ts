import type { Bean } from '@/types'
import type { getTheme } from '@/themes/themes'
import type { AuroraThemeData, Star } from '@/utils/aurora'

export type ThemeConfig = ReturnType<typeof getTheme>

export interface LayoutProps {
  bean: Bean
  themeConfig: ThemeConfig
}

export interface AuroraLayoutProps {
  bean: Bean
  auroraData?: AuroraThemeData
}

export interface StarryNightLayoutProps {
  bean: Bean
  themeConfig: ThemeConfig
  stars?: Star[]
}
