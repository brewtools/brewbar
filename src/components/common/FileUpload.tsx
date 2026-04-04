import { useCallback, useRef } from 'react'

interface FileUploadProps {
  onFileSelect: (file: string | null) => void
  currentFile: string | null
  accept?: string
  maxSize?: number
  label?: string
}

export function FileUpload({
  onFileSelect,
  currentFile,
  accept = 'image/jpeg,image/png',
  maxSize = 5 * 1024 * 1024,
  label = 'Upload Image',
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      const allowedTypes = accept.split(',')
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a valid image.')
        return
      }

      if (file.size > maxSize) {
        alert(`File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`)
        return
      }

      const reader = new FileReader()
      reader.onload = e => {
        const result = e.target?.result
        if (typeof result === 'string') {
          onFileSelect(result)
        }
      }
      reader.readAsDataURL(file)
    },
    [accept, maxSize, onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleRemove = () => {
    onFileSelect(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      {currentFile ? (
        <div className="relative">
          <div className="w-full h-32 border border-border rounded-lg overflow-hidden bg-bg">
            <img
              src={currentFile}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent hover:bg-paper/50 transition-all flex flex-col items-center justify-center gap-2"
        >
          <svg className="w-10 h-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm text-muted">{label}</span>
          <span className="text-xs text-muted">Drag & drop or click to upload</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}