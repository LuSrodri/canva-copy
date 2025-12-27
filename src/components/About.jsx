import { memo, useCallback } from 'react'
import { Share2, Coffee, Github, ExternalLink, Heart, Code, Users } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

import donationImage from '@/assets/images/making-donation.webp?w=512&h=512&format=webp&quality=75'

export const About = memo(function About() {
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
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Sobre o Projeto
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Conheça o I Hate Background
          </h2>
        </div>

        <div className="prose prose-lg text-muted-foreground space-y-4">
          <p>
            O <strong className="text-foreground">I Hate Background</strong> nasceu de uma frustração comum: 
            ferramentas de remoção de fundo que cobram caro, limitam o uso ou comprometem sua privacidade. 
            Decidimos criar uma alternativa verdadeiramente gratuita e acessível para todos.
          </p>

          <p>
            <a 
              href="https://github.com/lusrodri/canva-copy" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              O I Hate Background é um projeto de código aberto disponível no GitHub
            </a>, 
            desenvolvido e mantido por{' '}
            <a 
              href="https://lusrodri.me" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Lucas Santos Rodrigues
            </a>,
            engenheiro da computação e entusiasta de inteligência artificial, apaixonado por criar tecnologia que realmente ajuda as pessoas.
          </p>

          <p>
            Nossa missão é fornecer uma <strong className="text-foreground">ferramenta de alto desempenho, fácil de usar e totalmente 
            gratuita</strong> para remover fundos de imagens. Sem necessidade de uploads para servidores, sem preocupações com privacidade, 
            sem limites de uso e sem cadastro.
          </p>

          <p>
            O <strong className="text-foreground">I Hate Background é um removedor de fundo de imagens 100% gratuito, ilimitado, 
            com foco em privacidade e sem necessidade de login</strong>. Acreditamos que ferramentas essenciais devem ser acessíveis a todos.
          </p>

          <p>
            Se você gostou do projeto e quer incentivar o desenvolvimento contínuo,{' '}
            <strong className="text-foreground">existem várias formas de ajudar:</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" />
            Código aberto
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Comunidade ativa
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Feito com amor
          </div>
        </div>

        <img
          src={donationImage}
          alt="Ilustração de apoio ao projeto I Hate Background - removedor de fundo gratuito"
          width={512}
          height={512}
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
              A melhor forma de ajudar é compartilhar! Conte para amigos, familiares e colegas sobre o I Hate Background.
              Poste nas redes sociais, fóruns e comunidades. Quanto mais pessoas conhecerem, mais o projeto cresce.
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
              <h3 className="text-xl font-semibold">Apoiando financeiramente</h3>
            </div>
            <p className="text-muted-foreground">
              Manter o projeto gratuito tem custos. Se o I Hate Background te ajudou, considere fazer uma contribuição 
              via Buy Me A Coffee. Qualquer valor ajuda a manter o projeto ativo e em constante evolução.
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
              <h3 className="text-xl font-semibold">Contribuindo com código</h3>
            </div>
            <p className="text-muted-foreground">
              É desenvolvedor? O código é aberto! Envie pull requests, reporte bugs, sugira melhorias ou 
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
      </div>
    </div>
  )
})
