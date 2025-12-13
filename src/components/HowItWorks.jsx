import { memo } from 'react'
import { Lightbulb, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

import exampleImage from '@/assets/images/example.webp?w=512&h=512&format=webp&quality=75'

export const HowItWorks = memo(function HowItWorks({ onCtaClick }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Como funciona?
          </h2>
        </div>

        <div className="prose prose-lg text-muted-foreground">
          <p>
            O I Hate Background utiliza técnicas avançadas de{' '}
            <strong className="text-foreground">segmentação de imagem</strong>{' '}
            para identificar e remover o fundo de imagens diretamente no seu navegador.
          </p>
          
          <p>
            Isso significa que:{' '}
            <strong className="text-foreground">nenhuma imagem é enviada para servidores externos</strong>,
            garantindo a sua privacidade e segurança.
          </p>

          <p>
            O processo é rápido, eficiente e totalmente gratuito.
          </p>
        </div>

        <a
          href="https://huggingface.co/docs/transformers.js/index"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Saiba mais sobre a tecnologia de IA local
        </a>

        <br/>

        <Button size="lg" onClick={onCtaClick}>
          Ver a magia
        </Button>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Dica:</strong> Também é possível{' '}
              <strong>remover o fundo de várias imagens ao mesmo tempo</strong>.
              Arraste e solte todas elas e receba os arquivos prontos para uso.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-10" />
        <Card className="relative overflow-hidden border-0 shadow-2xl">
          <CardContent className="p-0">
            <img
              src={exampleImage}
              alt="Exemplo de funcionamento do I Hate Background"
              className="w-full h-auto"
              loading="lazy"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
})
