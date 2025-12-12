import { memo, useMemo } from 'react'
import { Download, Trash2, Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { cn, createDownloadableImage, downloadImage } from '@/lib/utils'
import { ImageState } from '@/hooks/useImageProcessor'

const STATUS_CONFIG = {
  [ImageState.QUEUED]: {
    icon: Clock,
    text: 'Na fila ⏳',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  [ImageState.PROCESSING]: {
    icon: Loader2,
    text: 'Processando 🔄',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  [ImageState.READY]: {
    icon: CheckCircle2,
    text: 'Pronto ✅',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  [ImageState.ERROR]: {
    icon: AlertCircle,
    text: 'Erro ❌',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
}

export const ImageCard = memo(function ImageCard({ image, onRemove, canRemove }) {
  const { id, preview, originalName, state, processedResult } = image
  const status = STATUS_CONFIG[state]
  const StatusIcon = status.icon

  const processedImageUrl = useMemo(() => {
    if (state === ImageState.READY && processedResult) {
      return createDownloadableImage(processedResult)
    }
    return null
  }, [state, processedResult])

  const handleDownload = () => {
    if (processedResult) {
      downloadImage(processedResult, originalName)
    }
  }

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      "hover:shadow-xl hover:scale-[1.02]",
      state === ImageState.PROCESSING && "ring-2 ring-primary/30"
    )}>
      <div className="relative aspect-square">
        {/* Image display */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          state === ImageState.READY && "checkered-bg"
        )}>
          <img
            src={processedImageUrl || preview}
            alt={originalName}
            className={cn(
              "max-w-full max-h-full object-contain transition-opacity duration-300",
              state === ImageState.PROCESSING && "opacity-50"
            )}
            loading="lazy"
          />
        </div>

        {/* Loading overlay */}
        {state === ImageState.PROCESSING && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
            <div className="p-3 rounded-full bg-white/90 shadow-lg">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className={cn(
          "absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
          status.bgColor, status.color
        )}>
          <StatusIcon className={cn("w-3 h-3", state === ImageState.PROCESSING && "animate-spin")} />
          {status.text}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm truncate flex-1 font-medium">
                {originalName}
              </span>
            </TooltipTrigger>
            <TooltipContent>{originalName}</TooltipContent>
          </Tooltip>

          <div className="flex gap-1">
            {state === ImageState.READY && (
              <Button
                size="icon"
                variant="default"
                className="h-8 w-8"
                onClick={handleDownload}
                aria-label="Baixar imagem"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}

            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8"
              onClick={onRemove}
              disabled={!canRemove}
              aria-label="Remover imagem"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {state === ImageState.PROCESSING && (
          <Progress value={undefined} className="mt-2 h-1" />
        )}
      </div>
    </Card>
  )
})
