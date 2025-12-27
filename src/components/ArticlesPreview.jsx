import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Tag, ArrowRight, CheckCircle } from 'lucide-react'
import { getAllArticles } from '../data/articles'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export const ArticlesPreview = memo(function ArticlesPreview() {
  const articles = getAllArticles()

  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Artigos e Tutoriais
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Aprenda a usar o I Hate Background
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Descubra como o <strong className="text-foreground">I Hate Background, o removedor de fundo de imagens 100% gratuito, ilimitado e focado em privacidade</strong>, 
          pode transformar seu fluxo de trabalho. Confira nossos guias práticos e dicas exclusivas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const colors = colorClasses[article.color] || colorClasses.blue
          return (
            <Link 
              key={article.slug} 
              to={`/blog/${article.slug}`}
              className="group"
            >
              <Card className="h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="flex items-center gap-1 text-sm text-primary font-medium pt-2">
                    Ler artigo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="text-center space-y-4 pt-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
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

        <Link to="/blog">
          <Button variant="outline" size="lg" className="gap-2">
            Ver todos os artigos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
})
