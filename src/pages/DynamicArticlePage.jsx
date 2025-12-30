import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Clock, Calendar, Tag, Share2, CheckCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { DropZone } from '../components/DropZone'
import { ImageGallery } from '../components/ImageGallery'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { useImageProcessor } from '../hooks/useImageProcessor'
import { generateArticle } from '../services/geminiService'

// Simple markdown-like renderer for our content
function renderContent(content) {
  const lines = content.trim().split('\n')
  const elements = []
  let currentList = null
  let listType = null
  let tableRows = []
  let inTable = false

  const processInlineMarkdown = (text) => {
    // Bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    // Italic
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
    return text
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Skip empty lines
    if (!trimmedLine) {
      if (currentList) {
        elements.push(
          listType === 'ul' 
            ? <ul key={elements.length} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">{currentList}</ul>
            : <ol key={elements.length} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground">{currentList}</ol>
        )
        currentList = null
        listType = null
      }
      if (inTable && tableRows.length > 0) {
        elements.push(
          <div key={elements.length} className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                {tableRows[0]}
              </thead>
              <tbody>
                {tableRows.slice(1)}
              </tbody>
            </table>
          </div>
        )
        tableRows = []
        inTable = false
      }
      continue
    }

    // Table rows
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      // Skip separator row
      if (trimmedLine.includes('---')) continue
      
      inTable = true
      const cells = trimmedLine.slice(1, -1).split('|').map(cell => cell.trim())
      const isHeader = tableRows.length === 0
      
      tableRows.push(
        <tr key={tableRows.length} className={isHeader ? '' : 'border-t border-gray-200'}>
          {cells.map((cell, idx) => 
            isHeader 
              ? <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-foreground">{cell}</th>
              : <td key={idx} className="px-4 py-3 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(cell) }} />
          )}
        </tr>
      )
      continue
    }

    // Headers
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-foreground mt-8 mb-4">
          {trimmedLine.slice(3)}
        </h2>
      )
      continue
    }

    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-foreground mt-6 mb-3">
          {trimmedLine.slice(4)}
        </h3>
      )
      continue
    }

    // Unordered list
    if (trimmedLine.startsWith('- ')) {
      if (!currentList || listType !== 'ul') {
        if (currentList) {
          elements.push(
            <ol key={elements.length} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground">{currentList}</ol>
          )
        }
        currentList = []
        listType = 'ul'
      }
      currentList.push(
        <li key={currentList.length} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(trimmedLine.slice(2)) }} />
      )
      continue
    }

    // Ordered list
    const orderedMatch = trimmedLine.match(/^(\d+)\.\s(.+)$/)
    if (orderedMatch) {
      if (!currentList || listType !== 'ol') {
        if (currentList) {
          elements.push(
            <ul key={elements.length} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">{currentList}</ul>
          )
        }
        currentList = []
        listType = 'ol'
      }
      currentList.push(
        <li key={currentList.length} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(orderedMatch[2]) }} />
      )
      continue
    }

    // Paragraphs
    elements.push(
      <p key={elements.length} className="text-muted-foreground leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(trimmedLine) }} />
    )
  }

  // Close any remaining lists
  if (currentList) {
    elements.push(
      listType === 'ul' 
        ? <ul key={elements.length} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">{currentList}</ul>
        : <ol key={elements.length} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground">{currentList}</ol>
    )
  }

  // Close any remaining table
  if (inTable && tableRows.length > 0) {
    elements.push(
      <div key={elements.length} className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            {tableRows[0]}
          </thead>
          <tbody>
            {tableRows.slice(1)}
          </tbody>
        </table>
      </div>
    )
  }

  return elements
}

export default function DynamicArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const galleryRef = useRef(null)
  const toolRef = useRef(null)
  
  const {
    images,
    processorError,
    addImage,
    addExampleImage,
    removeImage,
    canRemoveImage
  } = useImageProcessor()

  // Gerar artigo via Gemini
  useEffect(() => {
    let isMounted = true

    async function loadArticle() {
      setLoading(true)
      setError(null)

      try {
        // Gerar artigo via Gemini
        const generatedArticle = await generateArticle(slug)
        if (isMounted) {
          setArticle(generatedArticle)
          setLoading(false)
        }
      } catch (err) {
        console.error('Error loading article:', err)
        if (isMounted) {
          setError('generation-failed')
          setLoading(false)
        }
      }
    }

    loadArticle()

    return () => {
      isMounted = false
    }
  }, [slug])

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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

  const scrollToTool = useCallback(() => {
    if (toolRef.current) {
      toolRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const handleShare = useCallback(async () => {
    const shareData = {
      title: article?.title,
      text: article?.subtitle,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copiado!')
      }
    } catch (error) {
      console.error('Share failed:', error)
    }
  }, [article])

  // Loading state
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Carregando... | I Hate Background</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Gerando artigo...</p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  }

  // Error states
  if (error === 'not-found') {
    return (
      <>
        <Helmet>
          <title>Artigo não encontrado | I Hate Background</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
              <p className="text-muted-foreground">O artigo que você procura não existe.</p>
              <Link to="/blog" className="text-primary hover:underline">
                Ver todos os artigos
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  }

  if (error === 'generation-failed') {
    return (
      <>
        <Helmet>
          <title>Erro ao carregar | I Hate Background</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">Erro ao carregar artigo</h1>
              <p className="text-muted-foreground">Não foi possível gerar o artigo. Tente novamente mais tarde.</p>
              <Link to="/blog" className="text-primary hover:underline">
                Ver todos os artigos
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  }

  if (!article) {
    return null
  }

  const articleUrl = `https://ihatebackground.com/blog/${article.slug}`

  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }
  }
  const colors = colorClasses[article.color] || colorClasses.blue

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.keywords} />
        <link rel="canonical" href={articleUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:section" content={article.category} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o blog
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('pt-BR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readingTime} de leitura
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare} className="gap-1">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>
          </header>

          {/* CTA Banner */}
          <Card className={`mb-8 ${colors.bg} ${colors.border} border`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-semibold text-foreground">
                    Quer experimentar agora?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Use o I Hate Background gratuitamente - sem cadastro, sem limites!
                  </p>
                </div>
                <Button onClick={scrollToTool} className="gap-2 whitespace-nowrap">
                  <Sparkles className="w-4 h-4" />
                  Usar a ferramenta
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            {renderContent(article.content)}
          </article>

          {/* Tool Section */}
          <section ref={toolRef} className="mt-16 scroll-mt-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Experimente agora mesmo!
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                O <strong className="text-foreground">I Hate Background</strong> é um{' '}
                <strong className="text-foreground">removedor de fundo de imagens 100% gratuito, ilimitado, 
                com foco em privacidade e sem necessidade de login</strong>. 
                Arraste sua imagem abaixo e veja a mágica acontecer!
              </p>
            </div>

            <Card className="p-6 sm:p-8">
              <DropZone
                onFilesAdded={handleFilesAdded}
                onExampleClick={handleExampleClick}
                processorError={processorError}
              />
            </Card>

            {images.length > 0 && (
              <div ref={galleryRef} className="mt-8 animate-fade-in">
                <ImageGallery
                  images={images}
                  onRemove={removeImage}
                  canRemove={canRemoveImage}
                />
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                100% Gratuito
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Sem limite de imagens
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Sem cadastro
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Privacidade total
              </div>
            </div>
          </section>

          {/* Related Articles */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Artigos relacionados</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {article.relatedArticles.map((relatedArticle) => {
                  const colorMap = {
                    'Tutorial': { bg: 'bg-blue-50', text: 'text-blue-600' },
                    'Dica': { bg: 'bg-green-50', text: 'text-green-600' },
                    'E-commerce': { bg: 'bg-purple-50', text: 'text-purple-600' },
                    'Design': { bg: 'bg-blue-50', text: 'text-blue-600' },
                    'Fotografia': { bg: 'bg-green-50', text: 'text-green-600' },
                  }
                  const relatedColors = colorMap[relatedArticle.category] || { bg: 'bg-gray-100', text: 'text-gray-600' }
                  
                  return (
                    <Link 
                      key={relatedArticle.slug} 
                      to={`/blog/${relatedArticle.slug}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 space-y-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${relatedColors.bg} ${relatedColors.text}`}>
                            {relatedArticle.category}
                          </span>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedArticle.subtitle}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {relatedArticle.readingTime}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}
