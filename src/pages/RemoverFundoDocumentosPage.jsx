import { useCallback, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Zap, Lock, Infinity, Shield, FileText, EyeOff } from 'lucide-react'
import { DropZone } from '../components/DropZone'
import { ImageGallery } from '../components/ImageGallery'
import { Footer } from '../components/Footer'
import { useImageProcessor } from '../hooks/useImageProcessor'

import heroDocImage from '@/assets/images/hero-doc-ihb.png?w=384&quality=100&format=webp'
import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { AdBanner } from '@/components/AdBanner'

export default function RemoverFundoDocumentosPage() {
  const galleryRef = useRef(null)
  const dropZoneRef = useRef(null)
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
        <title>Remover Fundo de Documentos com Seguranca - 100% Privado e Gratuito | I Hate Background</title>
        <meta name="description" content="Remova o fundo de imagens de documentos com total seguranca e privacidade. Processamento 100% local no seu navegador. Ideal para RG, CPF, certidoes e documentos sensiveis. Gratuito, ilimitado e sem login." />
        <meta name="keywords" content="remover fundo documento, remover fundo rg, remover fundo cpf, remover fundo certidao, remover fundo documento seguro, remover fundo privacidade, remover fundo local, remover fundo offline, remover fundo documento identidade, remover fundo passaporte, remover fundo cnh, remover fundo comprovante" />
        <link rel="canonical" href="https://ihatebackground.com/remover-fundo-documentos-com-seguranca" />

        {/* Robots */}
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:title" content="Remover Fundo de Documentos com Seguranca - 100% Privado" />
        <meta property="og:description" content="Remova o fundo de imagens de documentos com total seguranca. Processamento 100% local, sem enviar seus dados para servidores. Ideal para documentos sensiveis." />
        <meta property="og:url" content="https://ihatebackground.com/remover-fundo-documentos-com-seguranca" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ihatebackground.com/og-image-documentos.png" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="I Hate Background" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Remover Fundo de Documentos com Seguranca - 100% Privado" />
        <meta name="twitter:description" content="Remova o fundo de imagens de documentos com total seguranca. Processamento 100% local, sem enviar dados para servidores." />
        <meta name="twitter:image" content="https://ihatebackground.com/og-image-documentos.png" />

        {/* Additional SEO */}
        <meta name="author" content="I Hate Background" />
        <meta name="theme-color" content="#3b82f6" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
        <AdBanner />
        <Header nav={"false"} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
          <section id="hero" ref={dropZoneRef}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="flex flex-col items-center justify-center space-y-6 text-center lg:text-left order-1 lg:order-1">
                <img
                  src={heroDocImage}
                  alt="Remover fundo de documentos com seguranca e privacidade"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  width={384}
                  height={384}
                  className="w-96 h-auto"
                />

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
                  <span className="text-gradient">Remova Fundo de Documentos</span> com Total Seguranca
                </h1>

                <p className="text-lg text-muted-foreground text-center max-w-xl">
                  <strong className="text-foreground">Processe imagens de documentos sensiveis</strong> como RG, CPF, certidoes e comprovantes{' '}
                  <strong className="text-foreground">sem enviar seus dados para nenhum servidor</strong>.
                  100% local, 100% privado.
                </p>

                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                    <Shield className="w-3.5 h-3.5" />
                    Seguranca Total
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                    <EyeOff className="w-3.5 h-3.5" />
                    Sem Envio de Dados
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                    <FileText className="w-3.5 h-3.5" />
                    Ideal para Documentos
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 order-2 lg:order-2">
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Processamento instantaneo com IA
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-500" />
                    Suas imagens nunca saem do seu dispositivo
                  </div>
                </div>

                <DropZone
                  onFilesAdded={handleFilesAdded}
                  onExampleClick={handleExampleClick}
                  processorError={processorError}
                />

                <p className="text-xs text-muted-foreground text-center max-w-md pt-2">
                  Arraste suas imagens de documentos, cole da area de transferencia ou clique para selecionar.
                  Suporta JPG, PNG e WebP. Processe varios documentos ao mesmo tempo!
                </p>
              </div>
            </div>
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

          {/* SEO Content Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Por que usar o <span className="text-gradient">I Hate Background</span> para documentos?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quando se trata de documentos sensiveis, a privacidade e essencial.
                Nossa ferramenta processa tudo localmente no seu navegador.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-green-500/10">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Processamento 100% Local</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Suas imagens de documentos <strong>nunca sao enviadas para servidores externos</strong>.
                  Todo o processamento acontece diretamente no seu navegador usando inteligencia artificial.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-blue-500/10">
                    <EyeOff className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Privacidade Garantida</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Nao coletamos, armazenamos ou transmitimos suas imagens. Ideal para documentos como
                  <strong> RG, CPF, CNH, passaporte, certidoes</strong> e outros documentos sensiveis.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-purple-500/10">
                    <Infinity className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Gratuito e Ilimitado</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Use quantas vezes precisar, <strong>sem limites, sem cadastro, sem login</strong>.
                  Remova o fundo de todos os seus documentos sem pagar nada.
                </p>
              </div>
            </div>
          </section>

          <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />

          {/* Use Cases Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Ideal para diversos tipos de documentos
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: FileText, label: 'RG e CPF', desc: 'Documentos de identidade' },
                { icon: FileText, label: 'CNH', desc: 'Carteira de motorista' },
                { icon: FileText, label: 'Passaporte', desc: 'Documentos de viagem' },
                { icon: FileText, label: 'Certidoes', desc: 'Nascimento, casamento' },
                { icon: FileText, label: 'Comprovantes', desc: 'Residencia, renda' },
                { icon: FileText, label: 'Diplomas', desc: 'Certificados academicos' },
                { icon: FileText, label: 'Contratos', desc: 'Documentos assinados' },
                { icon: FileText, label: 'Outros', desc: 'Qualquer documento' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-medium text-sm">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />

          {/* FAQ Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Perguntas Frequentes sobre Documentos
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: 'Minhas imagens de documentos sao enviadas para algum servidor?',
                  a: 'Nao! Todo o processamento e feito localmente no seu navegador. Suas imagens nunca saem do seu dispositivo, garantindo total privacidade e seguranca para seus documentos sensiveis.'
                },
                {
                  q: 'E seguro usar para documentos como RG e CPF?',
                  a: 'Sim, e completamente seguro. Como o processamento e 100% local, seus documentos de identidade nunca sao transmitidos pela internet. Voce tem controle total sobre suas imagens.'
                },
                {
                  q: 'Funciona offline?',
                  a: 'Apos carregar a pagina pela primeira vez, a ferramenta pode funcionar mesmo sem conexao com a internet, ja que todo o processamento e feito no seu navegador.'
                },
                {
                  q: 'Qual a qualidade da remocao de fundo em documentos?',
                  a: 'Utilizamos inteligencia artificial avancada que funciona muito bem com documentos escaneados ou fotografados. O resultado e um PNG com fundo transparente de alta qualidade.'
                },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-xl bg-white border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
