import { useState, useCallback, useRef, memo } from 'react'
import { Upload, Image as ImageIcon, Clipboard } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'

const EXAMPLE_IMAGES = [
  { src: '/examples/tree-thumb.webp', full: '/examples/tree.png', alt: 'Árvore' },
  { src: '/examples/plane-thumb.webp', full: '/examples/plane.jpg', alt: 'Avião' },
  { src: '/examples/father-daughter-thumb.webp', full: '/examples/father-daughter-walking.jpg', alt: 'Pai e filha' },
  { src: '/examples/beside-pool-thumb.webp', full: '/examples/beside-pool.jpg', alt: 'Piscina' },
]

export const DropZone = memo(function DropZone({ onFilesAdded, onExampleClick, isReady }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFiles = useCallback((files) => {
    const validFiles = Array.from(files).filter(file => 
      ['image/webp', 'image/jpeg', 'image/png'].includes(file.type)
    )
    if (validFiles.length > 0) {
      onFilesAdded(validFiles)
    }
  }, [onFilesAdded])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false)
    }
  }, [])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((e) => {
    handleFiles(e.target.files)
    e.target.value = ''
  }, [handleFiles])

  // Handle paste events
  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items
    if (!items) return

    const images = Array.from(items)
      .filter(item => item.type.startsWith('image/'))
      .map(item => item.getAsFile())
      .filter(Boolean)

    if (images.length > 0) {
      handleFiles(images)
    }
  }, [handleFiles])

  // Add paste listener
  useState(() => {
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  })

  return (
    <div className="space-y-6">
      <Card
        className={cn(
          "relative p-8 sm:p-12 border-2 border-dashed transition-all duration-300 cursor-pointer group",
          "bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30",
          "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5",
          isDragging && "border-primary bg-primary/5 scale-[1.02] shadow-2xl shadow-primary/10",
          "max-w-[96dvw]"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Área para upload de imagens"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/webp,image/jpeg,image/png"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center gap-6 text-center">
          <div className={cn(
            "p-4 rounded-2xl bg-primary/10 text-primary transition-all duration-300",
            "group-hover:scale-110 group-hover:bg-primary/15",
            isDragging && "scale-125 bg-primary/20"
          )}>
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Button 
              size="xl" 
              className="font-semibold gap-3 btn-glow"
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
              <ImageIcon className="w-5 h-5" />
              Selecionar imagem
            </Button>

            <p className="text-sm text-muted-foreground">
              Ou <strong>arraste e solte</strong> imagens aqui
            </p>
            
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span className="px-2 py-1 rounded bg-muted font-mono text-xs">CTRL</span>
              +
              <span className="px-2 py-1 rounded bg-muted font-mono text-xs">V</span>
              para colar
            </p>
          </div>

          {!isReady && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Carregando modelo de IA...
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-3">
        <p className="text-center text-sm text-muted-foreground">
          <strong>Não tem imagem?</strong> Use uma abaixo!
        </p>
        
        <div className="flex justify-center gap-3 flex-wrap">
          {EXAMPLE_IMAGES.map((img) => (
            <button
              key={img.full}
              onClick={() => onExampleClick(img.full)}
              className={cn(
                "w-16 h-16 rounded-xl overflow-hidden border-2 border-transparent",
                "transition-all duration-200 hover:scale-110 hover:border-primary hover:shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
              aria-label={`Usar imagem de exemplo: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})
