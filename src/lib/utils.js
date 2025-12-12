import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a WEBP File/Blob to PNG format
 */
export function webpToPng(webpFile) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(webpFile)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)
        const convertedFile = new File(
          [blob],
          webpFile.name.replace(/\.webp$/, '.png'),
          { type: 'image/png' }
        )
        resolve(convertedFile)
      }, 'image/png')
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load WEBP image'))
    }

    img.src = url
  })
}

/**
 * Normalizes alpha channel for better transparency
 */
export function normalizeAlphaPixels(imageData) {
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    let alpha = data[i + 3]
    let v = (alpha - 127) * 255 / 59
    v = Math.round(v)
    data[i + 3] = Math.max(0, Math.min(255, v))
  }
  return imageData
}

/**
 * Creates a downloadable image from processed result
 */
export function createDownloadableImage(result) {
  const imageData = result[0].data
  const imageWidth = result[0].width
  const imageHeight = result[0].height

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = imageWidth
  canvas.height = imageHeight

  let imageDataObj = new ImageData(imageData, imageWidth, imageHeight)
  imageDataObj = normalizeAlphaPixels(imageDataObj)

  ctx.putImageData(imageDataObj, 0, 0)

  return canvas.toDataURL('image/png')
}

/**
 * Downloads the processed image
 */
export function downloadImage(result, originalName = 'image-without-background.png') {
  const imgURL = createDownloadableImage(result)

  const a = document.createElement('a')
  a.href = imgURL

  const fileName = originalName.includes('.')
    ? originalName.replace(/\.(jpg|jpeg|webp|png)$/i, '-without-background.png')
    : 'image-without-background.png'

  a.download = fileName
  a.click()
}

/**
 * Formats file size to human readable format
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
