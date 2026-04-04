import { useState } from 'react'
import { useAppState } from '@/store/appState'
import { HeaderCard } from '@/components/cards/HeaderCard'
import { BeanCard } from '@/components/cards/BeanCard'
import { IMAGE_DIMENSIONS, type ExportQuality } from '@/types'

function getExportSettings(quality: ExportQuality) {
  switch (quality) {
    case 'standard':
      return { scale: 1, mimeType: 'image/jpeg', quality: 0.9, extension: 'jpg' }
    case 'high':
      return { scale: 2, mimeType: 'image/jpeg', quality: 0.95, extension: 'jpg' }
    case 'maximum':
      return { scale: 2, mimeType: 'image/png', quality: undefined, extension: 'png' }
  }
}

export function GenerateDownload() {
  const { state, dispatch } = useAppState()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [currentPreview, setCurrentPreview] = useState(0)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      const images: string[] = []
      const dimensions = IMAGE_DIMENSIONS[state.settings.format]
      const exportSettings = getExportSettings(state.settings.exportQuality)

      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '-9999px'
      document.body.appendChild(container)

      const headerElement = document.createElement('div')
      headerElement.style.width = `${dimensions.width}px`
      headerElement.style.height = `${dimensions.height}px`
      container.appendChild(headerElement)

      const root = await import('react-dom/client')
      const headerRoot = root.createRoot(headerElement)
      headerRoot.render(<HeaderCard beans={state.beans} settings={state.settings} />)

      await new Promise(resolve => setTimeout(resolve, 100))
      const headerCanvas = await html2canvas(headerElement, {
        width: dimensions.width,
        height: dimensions.height,
        scale: exportSettings.scale,
        useCORS: true,
        allowTaint: true,
      })
      images.push(headerCanvas.toDataURL(exportSettings.mimeType, exportSettings.quality))

      headerRoot.unmount()
      container.removeChild(headerElement)

      for (const bean of state.beans) {
        const beanElement = document.createElement('div')
        beanElement.style.width = `${dimensions.width}px`
        beanElement.style.height = `${dimensions.height}px`
        container.appendChild(beanElement)

        const beanRoot = root.createRoot(beanElement)
        beanRoot.render(<BeanCard bean={bean} settings={state.settings} />)

        await new Promise(resolve => setTimeout(resolve, 100))
        const beanCanvas = await html2canvas(beanElement, {
          width: dimensions.width,
          height: dimensions.height,
          scale: exportSettings.scale,
          useCORS: true,
          allowTaint: true,
        })
        images.push(beanCanvas.toDataURL(exportSettings.mimeType, exportSettings.quality))

        beanRoot.unmount()
        container.removeChild(beanElement)
      }

      document.body.removeChild(container)
      setGeneratedImages(images)
    } catch (error) {
      console.error('Failed to generate images:', error)
      alert('Failed to generate images. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadSingle = (index: number) => {
    const link = document.createElement('a')
    const date = new Date().toISOString().split('T')[0]
    const exportSettings = getExportSettings(state.settings.exportQuality)
    link.download = `brewbar-${date}-${index + 1}.${exportSettings.extension}`
    link.href = generatedImages[index]
    link.click()
  }

  const downloadAll = async () => {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    const date = new Date().toISOString().split('T')[0]
    const exportSettings = getExportSettings(state.settings.exportQuality)

    generatedImages.forEach((dataUrl, index) => {
      const base64 = dataUrl.split(',')[1]
      zip.file(`brewbar-${date}-${index + 1}.${exportSettings.extension}`, base64, { base64: true })
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.download = `brewbar-menu-${date}.zip`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const exportJSON = async () => {
    const { exportAsJSON } = await import('@/utils/export')
    exportAsJSON({ beans: state.beans, settings: state.settings })
  }

  const handleStartOver = () => {
    if (confirm('This will clear all your data. Continue?')) {
      dispatch({ type: 'RESET' })
    }
  }

  const formatLabels = {
    square: 'Square (1080 × 1080)',
    portrait: 'Portrait (1080 × 1350)',
    story: 'Story (1080 × 1920)',
  }

  const qualityLabels: Record<ExportQuality, string> = {
    standard: 'Standard (1×)',
    high: 'High (2×)',
    maximum: 'Maximum (2× PNG)',
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-fg">Generate & Download</h2>
        <p className="text-sm sm:text-base text-muted">Create your Instagram-ready menu images.</p>
      </div>

      {generatedImages.length === 0 && !isGenerating && (
        <div className="text-center py-12">
          <button
            onClick={handleGenerate}
            className="px-12 py-4 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
          >
            Generate {state.beans.length + 1} Images
          </button>
          <p className="mt-4 text-sm text-muted">
            1 header card + {state.beans.length} bean card{state.beans.length !== 1 ? 's' : ''} • {formatLabels[state.settings.format]} • {qualityLabels[state.settings.exportQuality]}
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
          <p className="text-lg text-fg">Generating your images...</p>
        </div>
      )}

      {generatedImages.length > 0 && (
        <>
          <div className="bg-paper rounded-xl p-4 sm:p-8 border border-border/30">
            <img
              src={generatedImages[currentPreview]}
              alt={`Preview ${currentPreview + 1}`}
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
            />
            {generatedImages.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {generatedImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPreview(index)}
                    className={`px-3 sm:px-4 py-2 text-sm rounded transition-colors ${
                      currentPreview === index
                        ? 'bg-accent text-white'
                        : 'bg-bg text-fg hover:bg-accent/10'
                    }`}
                  >
                    Image {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => downloadSingle(currentPreview)}
              className="px-6 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
            >
              Download Image
            </button>
            <button
              onClick={downloadAll}
              className="px-6 py-2.5 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors font-medium text-sm"
            >
              Download All as ZIP
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-8 border-t border-border">
            <button
              onClick={exportJSON}
              className="px-6 py-2.5 border border-border rounded-lg hover:bg-paper transition-colors font-medium text-sm text-fg"
            >
              Export JSON
            </button>

            <button
              onClick={handleStartOver}
              className="px-6 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
            >
              Start Over
            </button>
          </div>
        </>
      )}
    </div>
  )
}