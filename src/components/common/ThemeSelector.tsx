interface ThemeCardProps {
  theme: Theme
  name: string
  description: string
  isSelected: boolean
  onClick: () => void
}

type Theme = 'warm' | 'warm-dark' | 'vintage' | 'vintage-dark'

function ThemeCard({ theme, name, description, isSelected, onClick }: ThemeCardProps) {
  const colors: Record<Theme, { bg: string; text: string; accent: string }> = {
    'warm': { bg: '#FEF9F3', text: '#3E2723', accent: '#8B7355' },
    'warm-dark': { bg: '#2D1F1A', text: '#F5E6D3', accent: '#D4A574' },
    'vintage': { bg: '#F4ECD8', text: '#3E2723', accent: '#5D4037' },
    'vintage-dark': { bg: '#2C2418', text: '#E8DCCA', accent: '#C4A77D' },
  }

  const themeColors = colors[theme]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-lg text-left transition-all ${
        isSelected
          ? 'border-2 border-accent'
          : 'border-2 border-border hover:border-muted'
      }`}
      style={{ backgroundColor: themeColors.bg }}
    >
      <h4 className="font-semibold mb-1 text-sm" style={{ color: themeColors.text }}>
        {name}
      </h4>
      <p className="text-xs" style={{ color: themeColors.text, opacity: 0.6 }}>
        {description}
      </p>
      <div
        className="h-0.5 rounded mt-2"
        style={{ backgroundColor: themeColors.accent, opacity: isSelected ? 1 : 0 }}
      />
    </button>
  )
}

interface ThemeSelectorProps {
  selectedTheme: Theme
  onThemeChange: (theme: Theme) => void
}

const themes: Array<{ value: Theme; name: string; description: string }> = [
  { value: 'warm', name: 'Warm', description: 'Light' },
  { value: 'warm-dark', name: 'Warm', description: 'Dark' },
  { value: 'vintage', name: 'Vintage', description: 'Light' },
  { value: 'vintage-dark', name: 'Vintage', description: 'Dark' },
]

export function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="bg-paper rounded-xl p-6 sm:p-8 border border-border/30">
      <h3 className="text-lg font-semibold mb-4 text-fg">Theme</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {themes.slice(0, 2).map(theme => (
          <ThemeCard
            key={theme.value}
            theme={theme.value}
            name={theme.name}
            description={theme.description}
            isSelected={selectedTheme === theme.value}
            onClick={() => onThemeChange(theme.value)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {themes.slice(2, 4).map(theme => (
          <ThemeCard
            key={theme.value}
            theme={theme.value}
            name={theme.name}
            description={theme.description}
            isSelected={selectedTheme === theme.value}
            onClick={() => onThemeChange(theme.value)}
          />
        ))}
      </div>
    </div>
  )
}