import { memo } from 'react'
import { Zap, Lock } from 'lucide-react'

import heroImage from '@/assets/images/hero.webp?w=384&h=384&format=avif&quality=80'

export const Hero = memo(function Hero({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className="flex flex-col items-center justify-center space-y-6 text-center lg:text-left order-1 lg:order-1">
        <img
          src={heroImage}
          alt="Ilustração de remoção de fundo"
          loading='eager'
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
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 order-2 lg:order-2">
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Eficiente
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-500" />
            Privacidade Total
          </div>
        </div>

        {children}
      </div>
    </div>
  )
})
