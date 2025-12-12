import { memo, useCallback } from 'react'
import { Share2, Coffee, Github, ExternalLink, Heart } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export const About = memo(function About() {
  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'I Hate Background',
      text: 'Remova o fundo de imagens grátis, rápido e 100% privado!',
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
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Sobre o projeto
          </h2>
        </div>

        <div className="prose prose-lg text-muted-foreground">
          <p>
            <a 
              href="https://github.com/lusrodri/canva-copy" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              O I Hate Background é um projeto de código aberto disponível no GitHub.
            </a>
          </p>

          <p>
            É desenvolvido e mantido por{' '}
            <a 
              href="https://lusrodri.me" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Lucas Santos Rodrigues
            </a>,
            engenheiro da computação e entusiasta de IA, apaixonado por tecnologia e inovação.
          </p>

          <p>
            O intuito é fornecer uma ferramenta de alto desempenho, fácil de usar e totalmente 
            gratuita para remover fundos de imagens, sem a necessidade de uploads ou 
            preocupações com privacidade.
          </p>

          <p>
            Se você gostou e quer incentivar o desenvolvimento contínuo do projeto,{' '}
            <strong className="text-foreground">veja como você pode ajudar:</strong>
          </p>
        </div>

        <img
          src="/making-donation.webp"
          alt="Making donation illustration"
          width={200}
          height={200}
          className="w-max h-auto"
          loading="lazy"
        />
      </div>

      <div className="space-y-4">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50">
                <Share2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Compartilhando</h3>
            </div>
            <p className="text-muted-foreground">
              Compartilhe o I Hate Background com amigos, familiares e colegas.
              Poste sobre o projeto nas redes sociais, fóruns e comunidades.
            </p>
            <Button onClick={handleShare} className="gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhar o site
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-yellow-50">
                <Coffee className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">Apoiando via BMC ©</h3>
            </div>
            <p className="text-muted-foreground">
              Se você quer contribuir apoiando, considere acessar o meu Buy Me A Coffee ©.
              Seu apoio ajuda a manter o projeto ativo e em evolução.
            </p>
            <Button 
              variant="secondary" 
              className="gap-2"
              onClick={() => window.open('https://buymeacoffee.com/lusrodri', '_blank')}
            >
              <Coffee className="w-4 h-4" />
              Buy Me A Coffee ©
              <ExternalLink className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gray-100">
                <Github className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold">Contribuindo</h3>
            </div>
            <p className="text-muted-foreground">
              Se você é desenvolvedor, envie pull requests, reporte problemas,
              sugira melhorias ou torne-se um Sponsor no GitHub.
            </p>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open('https://github.com/lusrodri/canva-copy', '_blank')}
            >
              <Github className="w-4 h-4" />
              Contribuir no GitHub
              <ExternalLink className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})
