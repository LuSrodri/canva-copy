import { memo } from 'react'
import { Sparkles, Shield, Zap, Lock } from 'lucide-react'

export const Hero = memo(function Hero({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className="flex flex-col items-center justify-center space-y-6 text-center lg:text-left order-1 lg:order-1">
        <img
          src="/hero.webp"
          alt="Ilustração de remoção de fundo"
          width={400}
          height={300}
          loading="eager"
          fetchpriority="high"
          className="w-96 h-auto"
        />

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
          Uma Nova Forma de{' '}
          <span className="text-gradient">
            Remover Background
          </span>
          {' '}de Imagens!
        </h1>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
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
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 order-2 lg:order-2">
        <p className="text-base sm:text-lg text-muted-foreground text-center">
          ✨ Um clique e pronto! <em>Suas imagens</em> com fundo transparente.
          <br />
          Sem uploads, tudo no navegador.
        </p>

        {children}
      </div>
    </div>
  )
})
