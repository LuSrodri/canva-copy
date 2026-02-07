import { useCallback, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/Hero'
import { DropZone } from '../components/DropZone'
import { ImageGallery } from '../components/ImageGallery'
import { About } from '../components/About'
import { HelpUs } from '../components/HelpUs'
import { Footer } from '../components/Footer'
import { useImageProcessor } from '../hooks/useImageProcessor'
import { Media } from '@/components/Media'

export default function HomePage() {
  const galleryRef = useRef(null)
  const {
    images,
    processorError,
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

  const handleFilesAdded = useCallback((files) => {
    files.forEach(file => addImage(file))
    setTimeout(scrollToGallery, 100)
  }, [addImage, scrollToGallery])

  const handleExampleClick = useCallback((url) => {
    addExampleImage(url)
    setTimeout(scrollToGallery, 100)
  }, [addExampleImage, scrollToGallery])

  return (
    <>
      <Helmet>
        <title>Remova Background de Imagens! Sem perder a privacidade.</title>
        <meta name="description" content="Remova o fundo de qualquer imagem em segundos com I Hate Background. Ferramenta gratuita, ilimitada, sem login e 100% focada em privacidade. Funciona direto no navegador com inteligência artificial." />
        <meta name="keywords" content="remover fundo, remover fundo de imagem, remover fundo gratis, remover fundo png, tirar fundo de foto, background remover, removedor de fundo, remover fundo online, remover fundo automatico, i hate background" />
        <link rel="canonical" href="https://ihatebackground.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="Remova Background de Imagens! Sem perder a privacidade." />
        <meta property="og:description" content="Remova o fundo de qualquer imagem em segundos. 100% gratuito, ilimitado, sem login e focado em privacidade." />
        <meta property="og:url" content="https://ihatebackground.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ihatebackground.com/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Remova Background de Imagens! Sem perder a privacidade." />
        <meta name="twitter:description" content="Remova o fundo de qualquer imagem em segundos. 100% gratuito, ilimitado, sem login e focado em privacidade." />
        <meta name="twitter:image" content="https://ihatebackground.com/og-image.png" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">
          <section id="hero">
            <Hero>
              <DropZone
                onFilesAdded={handleFilesAdded}
                onExampleClick={handleExampleClick}
                processorError={processorError}
              />
            </Hero>
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

          <section id="about">
            <About />
          </section>

          <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />

          <section id="help-us">
            <HelpUs />
          </section>

          <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />

          <section id="help-us">
            <Media />
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
