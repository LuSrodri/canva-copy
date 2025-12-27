import { memo } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { ArrowRight, CheckCircle } from 'lucide-react'

const STEPS = [
  { 
    step: 1, 
    title: 'Acesse o I Hate Background', 
    description: 'Não precisa criar conta, baixar app ou fornecer email. Basta acessar e usar.'
  },
  { 
    step: 2, 
    title: 'Selecione suas imagens', 
    description: 'Arraste e solte, cole da área de transferência ou clique para escolher arquivos JPG, PNG ou WebP.'
  },
  { 
    step: 3, 
    title: 'Aguarde o processamento', 
    description: 'A IA processa suas imagens em segundos, diretamente no seu navegador.'
  },
  { 
    step: 4, 
    title: 'Baixe o resultado', 
    description: 'Pronto! Sua imagem está com fundo transparente, em alta qualidade, sem marca d\'água.'
  },
]

export const HowToUse = memo(function HowToUse({ onCtaClick }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="order-2 lg:order-1">
        <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600">
          <CardContent className="p-0">
            <video
              src="/how-to-use.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              width={640}
              height={360}
              className="w-full h-auto"
              aria-label="Demonstração de como usar o I Hate Background para remover fundo de imagens gratuitamente"
            />
          </CardContent>
        </Card>
      </div>

      <div className="order-1 lg:order-2 space-y-6">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Tutorial Rápido
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Como usar o I Hate Background?
          </h2>
          <p className="text-lg text-muted-foreground">
            Remover o fundo de imagens nunca foi tão fácil! O <strong className="text-foreground">I Hate Background é 100% gratuito, ilimitado e não requer cadastro</strong>. 
            Siga os passos abaixo e transforme suas fotos em segundos:
          </p>
        </div>

        <ol className="space-y-3">
          {STEPS.map(({ step, title, description }) => (
            <li 
              key={step}
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                {step}
              </span>
              <div>
                <span className="font-medium text-foreground">{title}</span>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Pronto!</strong> Agora você pode usar sua imagem com fundo transparente em qualquer lugar: 
            e-commerce, redes sociais, apresentações, materiais de marketing e muito mais.
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Sem marca d'água
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Alta resolução
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Download instantâneo
            </span>
          </div>

          <Button size="lg" onClick={onCtaClick} className="gap-2">
            Testar agora - Grátis
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
})
