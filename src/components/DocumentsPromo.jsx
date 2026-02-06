import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, FileText, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

import heroDocImage from '@/assets/images/hero-doc-ihb.png?w=280&quality=90&format=webp'

export const DocumentsPromo = memo(function DocumentsPromo() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-green-200/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-8 lg:p-12 items-center">
        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Segurança Máxima
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Precisa remover fundo de{' '}
            <span className="text-gradient">documentos sensíveis</span>?
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg">
            RG, CPF, certidões, comprovantes... Processe imagens de documentos com{' '}
            <strong className="text-foreground">total privacidade</strong>.
            Seus dados nunca saem do seu dispositivo.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
              100% Local
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
              Sem envio de dados
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
              Ideal para documentos
            </div>
          </div>

          <Link to="/remover-fundo-documentos-com-seguranca">
            <Button size="lg" className="gap-2 btn-glow w-full sm:w-auto">
              Acessar ferramenta segura
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex justify-center lg:justify-end">
          <Link
            to="/remover-fundo-documentos-com-seguranca"
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
            <img
              src={heroDocImage}
              alt="Remover fundo de documentos com segurança"
              width={280}
              height={280}
              className="relative w-44 sm:w-64 lg:w-72 h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </div>
  )
})
