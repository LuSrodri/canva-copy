import { useState, useCallback, useRef, useEffect } from 'react'
import { webpToPng } from '@/lib/utils'

// Image states
const ImageState = {
  QUEUED: 'queued',
  PROCESSING: 'processing',
  READY: 'ready',
  ERROR: 'error'
}

export function useImageProcessor() {
  const [images, setImages] = useState([])
  const [isProcessorReady, setIsProcessorReady] = useState(false)
  const workerRef = useRef(null)
  const pendingRequestsRef = useRef(new Map())
  const nextIdRef = useRef(1)
  const nextRequestIdRef = useRef(1)
  const processingQueueRef = useRef([])
  const currentlyProcessingRef = useRef(null)
  const preloadedImagesRef = useRef(new Map())
  const imagesRef = useRef([])
  const isProcessorReadyRef = useRef(false)
  const isProcessingRef = useRef(false)

  // Keep refs in sync with state
  useEffect(() => {
    imagesRef.current = images
  }, [images])

  useEffect(() => {
    isProcessorReadyRef.current = isProcessorReady
  }, [isProcessorReady])

  // Initialize worker
  useEffect(() => {
    const worker = new Worker(
      new URL('../workers/inference.worker.js', import.meta.url),
      { type: 'module' }
    )

    worker.onmessage = (event) => {
      const { id, result, error, success } = event.data

      if (success) {
        setIsProcessorReady(true)
        return
      }

      if (!id) {
        if (error) {
          console.error('Processor error:', error)
        }
        return
      }

      const pending = pendingRequestsRef.current.get(id)
      if (pending) {
        pendingRequestsRef.current.delete(id)
        if (error) {
          pending.reject(new Error(error))
        } else {
          pending.resolve(result)
        }
      }
    }

    workerRef.current = worker

    // Preload example images
    const exampleUrls = [
      '/examples/tree.png',
      '/examples/plane.jpg',
      '/examples/father-daughter-walking.jpg',
      '/examples/beside-pool.jpg'
    ]

    exampleUrls.forEach(async (url) => {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        preloadedImagesRef.current.set(url, blob)
      } catch (error) {
        console.warn(`Failed to preload: ${url}`)
      }
    })

    return () => worker.terminate()
  }, [])

  // Process queue - uses refs to avoid stale closures
  const processNextInQueue = useCallback(async () => {
    // Prevent concurrent processing
    if (isProcessingRef.current) {
      return
    }

    if (processingQueueRef.current.length === 0) {
      return
    }

    if (!isProcessorReadyRef.current) {
      setTimeout(processNextInQueue, 100)
      return
    }

    // Lock processing
    isProcessingRef.current = true

    const nextId = processingQueueRef.current.shift()
    currentlyProcessingRef.current = nextId

    setImages(prev => prev.map(img =>
      img.id === nextId ? { ...img, state: ImageState.PROCESSING } : img
    ))

    try {
      // Use ref to get current images
      const image = imagesRef.current.find(img => img.id === nextId)
      if (!image) {
        isProcessingRef.current = false
        currentlyProcessingRef.current = null
        // Continue with next if current image not found
        if (processingQueueRef.current.length > 0) {
          processNextInQueue()
        }
        return
      }

      const result = await new Promise((resolve, reject) => {
        const requestId = nextRequestIdRef.current++
        pendingRequestsRef.current.set(requestId, { resolve, reject })
        workerRef.current.postMessage({ id: requestId, file: image.file })
      })

      setImages(prev => prev.map(img =>
        img.id === nextId
          ? { ...img, state: ImageState.READY, processedResult: result }
          : img
      ))
    } catch (error) {
      console.error('Error processing image:', error)
      setImages(prev => prev.map(img =>
        img.id === nextId ? { ...img, state: ImageState.ERROR } : img
      ))
    } finally {
      currentlyProcessingRef.current = null
      isProcessingRef.current = false
      
      // Process next image if queue is not empty
      if (processingQueueRef.current.length > 0) {
        // Use setTimeout to avoid stack overflow with many images
        setTimeout(processNextInQueue, 0)
      }
    }
  }, [])

  // Watch for processor ready to start processing
  useEffect(() => {
    if (isProcessorReady && processingQueueRef.current.length > 0 && !isProcessingRef.current) {
      processNextInQueue()
    }
  }, [isProcessorReady, processNextInQueue])

  const addImage = useCallback(async (file) => {
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/png']
    
    if (!allowedTypes.includes(file.type)) {
      console.error(`File type not supported: ${file.type}`)
      return null
    }

    let processedFile = file
    if (file.type === 'image/webp') {
      processedFile = await webpToPng(file)
    }

    const id = nextIdRef.current++
    const preview = URL.createObjectURL(processedFile)

    const newImage = {
      id,
      file: processedFile,
      originalName: file.name,
      state: ImageState.QUEUED,
      preview,
      processedResult: null,
      addedAt: new Date()
    }

    setImages(prev => [...prev, newImage])
    processingQueueRef.current.push(id)

    // Trigger processing if not already running
    if (!isProcessingRef.current) {
      setTimeout(processNextInQueue, 0)
    }

    return id
  }, [processNextInQueue])

  const addExampleImage = useCallback(async (url) => {
    try {
      let blob = preloadedImagesRef.current.get(url)
      
      if (!blob) {
        const response = await fetch(url)
        blob = await response.blob()
      }

      const urlParts = url.split('/')
      const originalName = urlParts[urlParts.length - 1].replace('-reduced', '')
      
      const file = new File([blob], originalName, { type: blob.type || 'image/png' })
      return addImage(file)
    } catch (error) {
      console.error('Error adding example image:', error)
      return null
    }
  }, [addImage])

  const removeImage = useCallback((id) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id)
      if (image) {
        URL.revokeObjectURL(image.preview)
      }
      return prev.filter(img => img.id !== id)
    })

    const queueIndex = processingQueueRef.current.indexOf(id)
    if (queueIndex > -1) {
      processingQueueRef.current.splice(queueIndex, 1)
    }
  }, [])

  const canRemoveImage = useCallback((id) => {
    const image = images.find(img => img.id === id)
    return image && image.state !== ImageState.PROCESSING
  }, [images])

  return {
    images,
    isProcessorReady,
    addImage,
    addExampleImage,
    removeImage,
    canRemoveImage
  }
}

export { ImageState }
