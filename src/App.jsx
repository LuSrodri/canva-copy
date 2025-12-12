import { useState, useCallback, useRef, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { DropZone } from './components/DropZone'
import { ImageGallery } from './components/ImageGallery'
import { Features } from './components/Features'
import { HowToUse } from './components/HowToUse'
import { HowItWorks } from './components/HowItWorks'
import { About } from './components/About'
import { Media } from './components/Media'
import { Footer } from './components/Footer'
import { useImageProcessor } from './hooks/useImageProcessor'

function App() {
  const galleryRef = useRef(null)
  const dropZoneRef = useRef(null)
  const {
    images,
    isProcessorReady,
    addImage,
    addExampleImage,
    removeImage,
    canRemoveImage
  } = useImageProcessor()

  const scrollToGallery = useCallback(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const scrollToDropZone = useCallback(() => {
    if (dropZoneRef.current) {
      dropZoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const handleFilesAdded = useCallback((files) => {
    files.forEach(file => addImage(file))
    setTimeout(scrollToGallery, 100)
  }, [addImage, scrollToGallery])

  const handleExampleClick = useCallback((url) => {
    addExampleImage(url)
    setTimeout(scrollToGallery, 100)
  }, [addExampleImage, scrollToGallery])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
        <section id="hero" className="pt-8">
          <Hero />
        </section>

        <section id="app" ref={dropZoneRef}>
          <DropZone
            onFilesAdded={handleFilesAdded}
            onExampleClick={handleExampleClick}
            isReady={isProcessorReady}
          />
        </section>

        {images.length > 0 && (
          <section ref={galleryRef} className="animate-fade-in">
            <ImageGallery
              images={images}
              onRemove={removeImage}
              canRemove={canRemoveImage}
            />
          </section>
        )}

        <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />

        <section id="features">
          <Features onCtaClick={scrollToDropZone} />
        </section>

        <section id="how-to-use">
          <HowToUse onCtaClick={scrollToDropZone} />
        </section>

        <section id="how-it-works">
          <HowItWorks onCtaClick={scrollToDropZone} />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="media">
          <Media />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
