import { memo } from 'react'
import { Sparkles, Shield, Zap, Lock } from 'lucide-react'

export const Hero = memo(function Hero() {
  return (
    <div className="text-center space-y-8 py-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          100% Gratuito • 100% Privado
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Uma Nova Forma de{' '}
          <span className="text-gradient">
            Remover Background
          </span>
          {' '}de Imagens!
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          ✨ Um clique e pronto! <em>Suas imagens</em> com fundo transparente.
          <br />
          Sem uploads, tudo no navegador.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          Super Rápido
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          100% Seguro
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-500" />
          Privacidade Total
        </div>
      </div>

      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20 animate-pulse" />
        <img
          src="/hero.webp"
          alt="Ilustração de remoção de fundo"
          width={400}
          height={300}
          className="relative w-full h-auto rounded-2xl shadow-2xl"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  )
})
