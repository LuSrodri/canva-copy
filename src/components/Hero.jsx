import { memo } from 'react'
import { Zap, Lock, Infinity, Shield, CheckCircle } from 'lucide-react'

import heroImage from '@/assets/images/hero.webp?w=384&quality=100&format=webp';

export const Hero = memo(function Hero({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className="flex flex-col items-center justify-center space-y-6 text-center lg:text-left order-1 lg:order-1">
        <img
          src={heroImage}
          alt="I Hate Background - Removedor de fundo de imagens gratuito e ilimitado"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          width={384}
          height={384}
          className="w-96 h-auto"
        />

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
          <span className="text-gradient">Remova Background</span> de Imagens! Sem perder a privacidade.
        </h1>

        <p className="text-lg text-muted-foreground text-center max-w-xl">
          <strong className="text-foreground">Remova fundo de imagens 100% gratuito</strong>, 
          ilimitado, com foco em privacidade e <strong className="text-foreground">sem necessidade de login</strong>.
        </p>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            100% Gratuito
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
            <Infinity className="w-3.5 h-3.5" />
            Ilimitado
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
            <Shield className="w-3.5 h-3.5" />
            Privacidade Total
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 order-2 lg:order-2">
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Processamento instantâneo com IA
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-500" />
            Suas imagens nunca saem do seu dispositivo
          </div>
        </div>

        {children}

        <p className="text-xs text-muted-foreground text-center max-w-md pt-2">
          Arraste suas imagens, cole da área de transferência ou clique para selecionar. 
          Suporta JPG, PNG e WebP. Processe várias imagens ao mesmo tempo!
        </p>
      </div>
    </div>
  )
})
