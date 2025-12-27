import { memo } from 'react'
import { Zap, Shield, Lock, Images, Sparkles, Globe, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Grátis para sempre',
    description: 'O I Hate Background é 100% gratuito, sem limites de uso, sem cadastros e sem cartão de crédito. Use quanto quiser, quando quiser.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Zap,
    title: 'Super rápido',
    description: 'Processamento instantâneo com inteligência artificial de última geração. Remova fundos em segundos, não minutos.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: '100% seguro',
    description: 'Suas imagens são processadas localmente no seu navegador. Elas nunca saem do seu computador, garantindo segurança total.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Lock,
    title: 'Privacidade absoluta',
    description: 'Zero uploads para servidores externos. Sua privacidade é nossa prioridade. Nenhum dado é coletado ou armazenado.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Images,
    title: 'Processamento em lote',
    description: 'Processe várias imagens ao mesmo tempo. Ideal para e-commerce, designers e criadores de conteúdo que trabalham com volume.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Globe,
    title: 'Funciona offline',
    description: 'Após o primeiro carregamento, o modelo de IA fica em cache. Use o I Hate Background mesmo sem conexão com a internet.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
]

export const Features = memo(function Features({ onCtaClick }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Recursos Exclusivos
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Por que usar o I Hate Background?
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          O <strong className="text-foreground">I Hate Background é um removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login</strong>. 
          Descubra por que milhares de pessoas escolhem nossa ferramenta todos os dias.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((feature) => (
          <Card 
            key={feature.title}
            className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50"
          >
            <CardContent className="p-6 space-y-3">
              <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Sem marca d'água
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Alta qualidade
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Suporte a JPG, PNG, WebP
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Código aberto
          </div>
        </div>
        <Button size="lg" onClick={onCtaClick}>
          Experimentar agora - É grátis!
        </Button>
      </div>
    </div>
  )
})
