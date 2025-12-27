import { memo } from 'react'
import { Lightbulb, ExternalLink, Cpu, Shield, Zap, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

import exampleImage from '@/assets/images/example.webp?w=512&h=512&format=webp&quality=75'

export const HowItWorks = memo(function HowItWorks({ onCtaClick }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Tecnologia de Ponta
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Como o I Hate Background funciona?
          </h2>
        </div>

        <div className="prose prose-lg text-muted-foreground space-y-4">
          <p>
            O <strong className="text-foreground">I Hate Background</strong> utiliza técnicas avançadas de{' '}
            <strong className="text-foreground">segmentação de imagem com inteligência artificial</strong>{' '}
            para identificar e remover o fundo de imagens diretamente no seu navegador, sem enviar nenhum dado para servidores externos.
          </p>
          
          <p>
            Nossa tecnologia é baseada em modelos de machine learning de última geração, executados localmente 
            através de <strong className="text-foreground">WebGPU e WebAssembly</strong>. Isso significa que:{' '}
            <strong className="text-foreground">nenhuma imagem é enviada para servidores externos</strong>,
            garantindo a sua privacidade e segurança completas.
          </p>

          <p>
            O processo é rápido, eficiente e <strong className="text-foreground">totalmente gratuito</strong>. 
            Diferente de outras ferramentas, o I Hate Background não tem limites de uso, não adiciona marca d'água 
            e não exige cadastro ou login. É o <strong className="text-foreground">removedor de fundo de imagens 100% gratuito, ilimitado, 
            com foco em privacidade e sem necessidade de login</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 text-sm">
            <Cpu className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="text-blue-700">IA Local</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-sm">
            <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-green-700">Zero Upload</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 text-sm">
            <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-orange-700">Processamento Rápido</span>
          </div>
        </div>

        <a
          href="https://huggingface.co/docs/transformers.js/index"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Saiba mais sobre a tecnologia de IA local (Transformers.js)
        </a>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={onCtaClick} className="gap-2">
            Experimentar agora
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>Dica profissional:</strong> O I Hate Background permite{' '}
              <strong>remover o fundo de várias imagens ao mesmo tempo</strong>.
              Arraste e solte todas as suas fotos de uma vez e receba os arquivos prontos para uso. 
              Ideal para e-commerce, designers e criadores de conteúdo que trabalham com volume!
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-10" />
        <Card className="relative overflow-hidden border-0 shadow-2xl">
          <CardContent className="p-0">
            <img
              src={exampleImage}
              alt="Exemplo de remoção de fundo com I Hate Background - antes e depois mostrando a qualidade profissional do resultado"
              width={512}
              height={512}
              className="w-full h-auto"
              loading="lazy"
            />
          </CardContent>
        </Card>
        <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 text-sm">
          <span className="text-muted-foreground">Resultado em</span>
          <span className="font-bold text-primary ml-1">~30 segundos</span>
        </div>
      </div>
    </div>
  )
})
