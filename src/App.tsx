import { useEffect } from 'react'
import { AppProvider, useAppState } from '@/store/appState'
import { BeanEntryForm } from '@/components/steps/BeanEntryForm'
import { ImageSettings } from '@/components/steps/ImageSettings'
import { GenerateDownload } from '@/components/steps/GenerateDownload'

function AppContent() {
  const { state, dispatch } = useAppState()

  // Check system preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    // Apply to html element for CSS variables to work
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <BeanEntryForm />
      case 2:
        return <ImageSettings />
      case 3:
        return <GenerateDownload />
      default:
        return <BeanEntryForm />
    }
  }

  const steps = [
    { number: 1, label: 'Beans' },
    { number: 2, label: 'Settings' },
    { number: 3, label: 'Download' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Progress Steps */}
      <div className="border-b border-border bg-paper">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-center gap-1 sm:gap-3">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => {
                    if (step.number < state.currentStep) {
                      dispatch({ type: 'SET_STEP', step: step.number as 1 | 2 | 3 })
                    }
                  }}
                  disabled={step.number > state.currentStep}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all ${
                    state.currentStep === step.number
                      ? 'bg-accent text-accent-fg font-medium'
                      : state.currentStep > step.number
                      ? 'text-accent hover:bg-accent/10'
                      : 'text-muted'
                  }`}
                  style={{ cursor: step.number > state.currentStep ? 'not-allowed' : 'pointer' }}
                >
                  <span 
                    className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-xs font-semibold ${
                      state.currentStep === step.number 
                        ? 'bg-white/20' 
                        : state.currentStep > step.number 
                        ? 'border-2 border-accent'
                        : 'border border-muted/30'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-6 sm:w-12 h-px bg-muted/30 mx-1 sm:mx-3"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <p className="text-xs text-muted text-center">
            Built by kei.{' '}
            <button
              onClick={toggleTheme}
              className="underline hover:text-fg transition-colors"
            >
              Switch Theme
            </button>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}