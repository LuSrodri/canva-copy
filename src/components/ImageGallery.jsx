import { memo, useMemo } from 'react'
import { ImageCard } from './ImageCard'

export const ImageGallery = memo(function ImageGallery({ images, onRemove, canRemove }) {
  const sortedImages = useMemo(() => 
    [...images].sort((a, b) => b.addedAt - a.addedAt),
    [images]
  )

  if (images.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Suas imagens
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({images.length} {images.length === 1 ? 'imagem' : 'imagens'})
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedImages.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onRemove={() => onRemove(image.id)}
            canRemove={canRemove(image.id)}
          />
        ))}
      </div>
    </div>
  )
})
