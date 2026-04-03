import type { ImageFormat } from '@/types'

interface FormatSelectorProps {
  selectedFormat: ImageFormat
  onFormatChange: (format: ImageFormat) => void
}

const formats: Array<{ value: ImageFormat; label: string; description: string }> = [
  { value: 'square', label: 'Square', description: '1080 × 1080' },
  { value: 'portrait', label: 'Portrait', description: '1080 × 1350' },
  { value: 'story', label: 'Story', description: '1080 × 1920' },
]

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  return (
    <div className="bg-paper rounded-xl p-6 sm:p-8 border border-border/30">
      <h3 className="text-lg font-semibold mb-4 text-fg">Image Format</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {formats.map(format => (
          <button
            key={format.value}
            type="button"
            onClick={() => onFormatChange(format.value)}
            className={`p-6 border-2 rounded-lg transition-all text-center ${
              selectedFormat === format.value
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-muted'
            }`}
          >
            <div className="flex justify-center mb-3">
              <div
                className={`border-2 rounded ${
                  selectedFormat === format.value
                    ? 'border-accent'
                    : 'border-muted'
                }`}
                style={{
                  width:
                    format.value === 'square'
                      ? '40px'
                      : format.value === 'portrait'
                        ? '40px'
                        : '27px',
                  height:
                    format.value === 'square'
                      ? '40px'
                      : format.value === 'portrait'
                        ? '53px'
                        : '48px',
                }}
              />
            </div>
            <div className="font-medium text-sm text-fg">{format.label}</div>
            <div className="text-xs text-muted mt-1">{format.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}