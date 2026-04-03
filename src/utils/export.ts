import JSZip from 'jszip'

export function formatDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function downloadImage(canvas: HTMLCanvasElement, index: number): Promise<void> {
  const date = formatDate()
  const link = document.createElement('a')
  link.download = `brewbar-${date}-${index}.jpg`
  link.href = canvas.toDataURL('image/jpeg', 0.9)
  link.click()
}

export async function downloadAllAsZip(canvases: HTMLCanvasElement[]): Promise<void> {
  const zip = new JSZip()
  const date = formatDate()

  canvases.forEach((canvas, index) => {
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
    const base64 = dataUrl.split(',')[1]
    zip.file(`brewbar-${date}-${index + 1}.jpg`, base64, { base64: true })
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  const link = document.createElement('a')
  link.download = `brewbar-menu-${date}.zip`
  link.href = URL.createObjectURL(blob)
  link.click()
  URL.revokeObjectURL(link.href)
}

export function exportAsJSON(data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.download = `brewbar-data-${formatDate()}.json`
  link.href = URL.createObjectURL(blob)
  link.click()
  URL.revokeObjectURL(link.href)
}

export async function importFromJSON(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const result = e.target?.result
        if (typeof result === 'string') {
          const data = JSON.parse(result)
          resolve(data)
        } else {
          reject(new Error('Invalid file content'))
        }
      } catch (error) {
        reject(new Error('Invalid JSON format'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}