import type { Theme } from '@/types'
import { getTheme } from '@/themes/themes'
import { useState } from 'react'

interface ThemeCardProps {
  theme: Theme
  isSelected: boolean
  onClick: () => void
}

function ThemeCard({ theme, isSelected, onClick }: ThemeCardProps) {
  const themeConfig = getTheme(theme)
  const isDark = theme.includes('dark') || theme === 'starry-night' || theme === 'space'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-lg text-left transition-all relative overflow-hidden ${
        isSelected
          ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper'
          : 'hover:ring-1 hover:ring-border hover:ring-offset-1 hover:ring-offset-paper'
      }`}
      style={{ 
        backgroundColor: themeConfig.colors.primary,
        borderRadius: themeConfig.styles.borderRadius,
      }}
    >
      {/* Accent bar at top */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: themeConfig.colors.accent }}
      />
      
      <div className="mt-2">
        <h4 
          className="font-semibold mb-1 text-sm"
          style={{ color: themeConfig.colors.text }}
        >
          {themeConfig.name}
        </h4>
        <p 
          className="text-xs leading-relaxed"
          style={{ color: themeConfig.colors.mutedText }}
        >
          {isDark ? 'Dark' : 'Light'}
        </p>
      </div>
      
      {/* Color preview dots */}
      <div className="flex gap-1.5 mt-3">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: themeConfig.colors.primary }}
        />
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: themeConfig.colors.accent }}
        />
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: themeConfig.colors.text }}
        />
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div 
          className="absolute bottom-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: themeConfig.colors.accent }}
        >
          <svg 
            className="w-3 h-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke={isDark ? '#000' : '#fff'}
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  )
}

interface ThemeSelectorProps {
  selectedTheme: Theme
  onThemeChange: (theme: Theme) => void
}

type Category = 'classic' | 'coffee' | 'nature' | 'artistic'

interface ThemeCategory {
  id: Category
  label: string
  themes: Theme[]
}

const themeCategories: ThemeCategory[] = [
  {
    id: 'classic',
    label: 'Classic',
    themes: ['warm', 'warm-dark', 'vintage', 'vintage-dark'],
  },
  {
    id: 'coffee',
    label: 'Coffee',
    themes: ['espresso', 'espresso-dark'],
  },
  {
    id: 'nature',
    label: 'Nature',
    themes: ['zen-garden', 'matcha'],
  },
  {
    id: 'artistic',
    label: 'Artistic',
    themes: ['aurora', 'washi', 'washi-dark', 'space', 'starry-night'],
  },
]

export function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  // Determine initial active category based on selected theme
  const getInitialCategory = (): Category => {
    for (const category of themeCategories) {
      if (category.themes.includes(selectedTheme)) {
        return category.id
      }
    }
    return 'classic'
  }
  
  const [activeCategory, setActiveCategory] = useState<Category>(getInitialCategory())
  
  const currentCategory = themeCategories.find(c => c.id === activeCategory)

  return (
    <div className="bg-paper rounded-xl p-6 sm:p-8 ">
      <h3 className="text-lg font-semibold mb-4 text-fg">Theme</h3>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {themeCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-fg text-bg'
                : 'bg-bg border border-border hover:border-muted text-fg'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Theme Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {currentCategory?.themes.map((theme) => (
          <ThemeCard
            key={theme}
            theme={theme}
            isSelected={selectedTheme === theme}
            onClick={() => onThemeChange(theme)}
          />
        ))}
      </div>
      
      {/* Theme description */}
      <div className="mt-4 p-3 bg-bg rounded-lg ">
        <p className="text-sm text-muted">
          {getTheme(selectedTheme).description}
        </p>
      </div>
    </div>
  )
}
