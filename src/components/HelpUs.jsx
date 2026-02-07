import { memo, useCallback } from 'react'
import { Github, Share2, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export const HelpUs = memo(function HelpUs() {
  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'I Hate Background - Removedor de Fundo Gratuito',
      text: 'Descobri o I Hate Background: removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login!',
      url: 'https://ihatebackground.com',
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
  }, [])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Apoie o Projeto
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Como ajudar o I Hate Background?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gray-100">
                <Github className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold">Contribuindo com projeto</h3>
            </div>
            <p className="text-muted-foreground">
              O I Hate Background é um projeto de código aberto. Envie pull requests, reporte bugs, sugira melhorias ou
              torne-se um Sponsor no GitHub. Toda contribuição é bem-vinda e valorizada.
            </p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open('https://github.com/lusrodri/canva-copy', '_blank')}
            >
              <Github className="w-4 h-4" />
              Ver no GitHub
              <ExternalLink className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50">
                <Share2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Compartilhando com os outros</h3>
            </div>
            <p className="text-muted-foreground">
              A melhor forma de ajudar é compartilhar! Conte para amigos, familiares e colegas sobre o I Hate Background.
              Poste nas redes sociais, fóruns e comunidades. Quanto mais pessoas conhecerem, mais o projeto cresce.
            </p>
            <Button onClick={handleShare} className="gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhar o site
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})
