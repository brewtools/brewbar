import { useState } from 'react'
import { useAppState } from '@/store/appState'
import { FormatSelector } from '@/components/common/FormatSelector'
import { ThemeSelector } from '@/components/common/ThemeSelector'
import { FileUpload } from '@/components/common/FileUpload'
import type { BackgroundType, LogoPosition, LogoSize } from '@/types'

export function ImageSettings() {
  const { state, dispatch } = useAppState()
  const [activeBackgroundTab, setActiveBackgroundTab] = useState<BackgroundType>('default')

  const backgroundTabs: Array<{ value: BackgroundType; label: string }> = [
    { value: 'default', label: 'Default' },
    { value: 'global', label: 'Upload Global' },
    { value: 'perImage', label: 'Upload Per-Image' },
    { value: 'gradient', label: 'Gradient' },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2 text-fg">Customize Your Menu</h2>
        <p className="text-muted">Choose format, theme, and styling options.</p>
      </div>

      <FormatSelector
        selectedFormat={state.settings.format}
        onFormatChange={format =>
          dispatch({ type: 'UPDATE_SETTINGS', updates: { format } })
        }
      />

      <ThemeSelector
        selectedTheme={state.settings.theme}
        onThemeChange={theme =>
          dispatch({ type: 'UPDATE_SETTINGS', updates: { theme } })
        }
      />

      <div className="bg-paper rounded-xl p-8 border border-border/30">
        <h3 className="text-lg font-semibold mb-4 text-fg">Background</h3>
        <div className="flex gap-2 mb-4">
          {backgroundTabs.map(tab => (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                setActiveBackgroundTab(tab.value)
                dispatch({
                  type: 'UPDATE_SETTINGS',
                  updates: { backgroundType: tab.value },
                })
              }}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeBackgroundTab === tab.value
                  ? 'bg-accent text-white'
                  : 'bg-bg text-fg hover:bg-accent/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeBackgroundTab === 'global' && (
          <FileUpload
            onFileSelect={backgroundImage =>
              dispatch({ type: 'UPDATE_SETTINGS', updates: { backgroundImage } })
            }
            currentFile={state.settings.backgroundImage}
            label="Upload Background Image"
          />
        )}

        {activeBackgroundTab === 'gradient' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-fg">Color</label>
              <input
                type="color"
                value={state.settings.gradientColor}
                onChange={e =>
                  dispatch({
                    type: 'UPDATE_SETTINGS',
                    updates: { gradientColor: e.target.value },
                  })
                }
                className="w-20 h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-fg">
                Intensity: {state.settings.gradientIntensity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={state.settings.gradientIntensity}
                onChange={e =>
                  dispatch({
                    type: 'UPDATE_SETTINGS',
                    updates: { gradientIntensity: Number(e.target.value) },
                  })
                }
                className="w-full"
              />
            </div>
          </div>
        )}

        {activeBackgroundTab === 'perImage' && (
          <div className="space-y-4">
            <p className="text-sm text-muted">
              Upload separate backgrounds for each bean
            </p>
            {state.beans.map((bean, index) => (
              <div key={bean.id}>
                <label className="block text-sm font-medium mb-2 text-fg">
                  Bean #{index + 1}: {bean.name || 'Unnamed'}
                </label>
                <FileUpload
                  onFileSelect={() => {
                    // Per-bean background would need separate state
                  }}
                  currentFile={null}
                  label="Upload Background"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-paper rounded-xl p-8 border border-border/30">
        <h3 className="text-lg font-semibold mb-4 text-fg">Logo (Optional)</h3>
        <FileUpload
          onFileSelect={logo => dispatch({ type: 'UPDATE_SETTINGS', updates: { logo } })}
          currentFile={state.settings.logo}
          accept="image/png,image/svg+xml,image/jpeg"
          maxSize={2 * 1024 * 1024}
          label="Upload Logo"
        />
        {state.settings.logo && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-fg">Position</label>
              <div className="grid grid-cols-2 gap-2">
                {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as LogoPosition[]).map(
                  pos => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() =>
                        dispatch({ type: 'UPDATE_SETTINGS', updates: { logoPosition: pos } })
                      }
                      className={`px-3 py-2 text-sm rounded ${
                        state.settings.logoPosition === pos
                          ? 'bg-accent text-white'
                          : 'bg-bg text-fg'
                      }`}
                    >
                      {pos.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-fg">Size</label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as LogoSize[]).map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      dispatch({ type: 'UPDATE_SETTINGS', updates: { logoSize: size } })
                    }
                    className={`flex-1 px-3 py-2 text-sm rounded ${
                      state.settings.logoSize === size
                        ? 'bg-accent text-white'
                        : 'bg-bg text-fg'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-paper rounded-xl p-8 border border-border/30">
        <h3 className="text-lg font-semibold mb-4 text-fg">Header Text</h3>
        <input
          type="text"
          value={state.settings.headerText}
          onChange={e =>
            dispatch({ type: 'UPDATE_SETTINGS', updates: { headerText: e.target.value } })
          }
          maxLength={50}
          placeholder="On the brew bar"
          className="w-full px-4 py-3 border border-border rounded-lg bg-bg focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-sm text-fg"
        />
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-border">
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
          className="px-6 py-2.5 border border-border rounded-lg hover:bg-paper transition-colors font-medium text-sm text-fg"
        >
          ← Back to Beans
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_STEP', step: 3 })}
          className="px-8 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
        >
          Next: Generate Images →
        </button>
      </div>
    </div>
  )
}