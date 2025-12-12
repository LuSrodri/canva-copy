import { memo } from 'react'
import { Zap, Shield, Lock, Images, Sparkles, Globe } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Grátis para usar',
    description: 'Sem limites, sem cadastros, sem cartão de crédito.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Zap,
    title: 'Super rápido',
    description: 'Processamento instantâneo com IA de última geração.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: '100% seguro',
    description: 'Suas imagens nunca saem do seu computador.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Lock,
    title: 'Privacidade total',
    description: 'Sem uploads para servidores externos.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Images,
    title: 'Múltiplas imagens',
    description: 'Processe várias imagens de uma vez.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Globe,
    title: 'Funciona offline',
    description: 'Após carregar, use mesmo sem internet.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
]

export const Features = memo(function Features({ onCtaClick }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Por que usar?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experimente agora e veja como é fácil remover fundos de imagens!
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
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" onClick={onCtaClick}>
          Usar agora
        </Button>
      </div>
    </div>
  )
})
