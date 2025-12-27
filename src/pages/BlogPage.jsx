import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Clock, Tag, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { getAllArticles } from '../data/articles'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

export default function BlogPage() {
  const articles = getAllArticles()

  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' }
  }

  return (
    <>
      <Helmet>
        <title>Blog | I Hate Background — Artigos e Tutoriais sobre Remoção de Fundo</title>
        <meta name="description" content="Artigos, tutoriais e dicas sobre remoção de fundo de imagens. Aprenda a usar o I Hate Background, o removedor de fundo 100% gratuito, ilimitado e focado em privacidade." />
        <meta name="keywords" content="blog remover fundo, tutorial remover fundo, como remover fundo de imagem, dicas remover fundo, artigos remoção de fundo" />
        <link rel="canonical" href="https://ihatebackground.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog | I Hate Background — Artigos e Tutoriais" />
        <meta property="og:description" content="Artigos, tutoriais e dicas sobre remoção de fundo de imagens com I Hate Background." />
        <meta property="og:url" content="https://ihatebackground.com/blog" />
        <meta property="og:type" content="blog" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | I Hate Background" />
        <meta name="twitter:description" content="Artigos e tutoriais sobre remoção de fundo de imagens." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 via-white to-purple-50/30">
        <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a página inicial
          </Link>
        </nav>

        {/* Header */}
        <header className="text-center space-y-4 mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Blog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Artigos e Tutoriais
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprenda a remover fundos de imagens como um profissional. Dicas, tutoriais e guias práticos 
            para usar o <strong className="text-foreground">I Hate Background</strong>, o removedor de fundo 
            100% gratuito, ilimitado e focado em privacidade.
          </p>
        </header>

        {/* Articles Grid */}
        <div className="space-y-6">
          {articles.map((article, index) => {
            const colors = colorClasses[article.color] || colorClasses.blue
            return (
              <Link 
                key={article.slug} 
                to={`/blog/${article.slug}`}
                className="block group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                            <Tag className="w-3 h-3" />
                            {article.category}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            <Clock className="w-3 h-3" />
                            {article.readingTime}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>

                        <p className="text-muted-foreground">
                          {article.summary}
                        </p>

                        <div className="flex items-center gap-2 text-primary font-medium">
                          Ler artigo completo
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      <div className={`hidden sm:flex items-center justify-center w-24 h-24 rounded-2xl ${colors.bg} flex-shrink-0`}>
                        <span className="text-4xl font-bold text-foreground/20">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <section className="mt-16 text-center space-y-6 p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <h2 className="text-2xl font-bold">
            Pronto para experimentar?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            O <strong className="text-foreground">I Hate Background</strong> é um removedor de fundo de imagens 
            100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              100% Gratuito
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Ilimitado
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

          <Link to="/#hero">
            <Button size="lg" className="gap-2">
              Usar o I Hate Background
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
      </div>
    </>
  )
}
