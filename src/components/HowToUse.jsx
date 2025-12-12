import { memo } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const STEPS = [
  { step: 1, title: 'Acesse o I Hate Background' },
  { step: 2, title: 'Selecione uma imagem' },
  { step: 3, title: 'Aguarde alguns segundos' },
  { step: 4, title: 'E pronto!' },
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
              className="w-full h-auto"
              aria-label="Demonstração de como usar o I Hate Background"
            />
          </CardContent>
        </Card>
      </div>

      <div className="order-1 lg:order-2 space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Como usar?
          </h2>
          <p className="text-lg text-muted-foreground">
            Siga os passos e veja como é fácil remover fundos de imagens:
          </p>
        </div>

        <ol className="space-y-3">
          {STEPS.map(({ step, title }) => (
            <li 
              key={step}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {step}
              </span>
              <span className="font-medium">{title}</span>
            </li>
          ))}
        </ol>

        <p className="text-muted-foreground">
          Basta aproveitar a sua imagem com background transparente.
        </p>

        <Button size="lg" onClick={onCtaClick}>
          Testar agora
        </Button>
      </div>
    </div>
  )
})
