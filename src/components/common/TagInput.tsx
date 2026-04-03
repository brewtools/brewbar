import { useState, useRef } from 'react'

interface TagInputProps {
  tags: Array<{ id: string; text: string }>
  onChange: (tags: Array<{ id: string; text: string }>) => void
  maxTags?: number
  maxChars?: number
}

export function TagInput({ tags, onChange, maxTags = 6, maxChars = 50 }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const generateId = () => Math.random().toString(36).substring(2, 11)

  const addTag = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    if (tags.length >= maxTags) return
    if (trimmed.length > maxChars) return

    onChange([...tags, { id: generateId(), text: trimmed }])
    setInputValue('')
  }

  const removeTag = (id: string) => {
    onChange(tags.filter(tag => tag.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    }
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1].id)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    const items = text.split(',').map(item => item.trim()).filter(Boolean)
    const newTags = items
      .slice(0, maxTags - tags.length)
      .map(text => ({ id: generateId(), text }))
    onChange([...tags, ...newTags])
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 border border-border rounded-lg bg-bg focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
      {tags.map(tag => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-accent text-white rounded-full"
        >
          {tag.text}
          <button
            type="button"
            onClick={() => removeTag(tag.id)}
            className="ml-1 hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
          >
            ×
          </button>
        </span>
      ))}
      {tags.length < maxTags && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={tags.length === 0 ? 'Type and press Enter...' : 'Add more...'}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-fg placeholder:text-muted"
          maxLength={maxChars}
        />
      )}
    </div>
  )
}