import { memo } from 'react'
import { Heart, Shield, Zap, Lock } from 'lucide-react'

export const Footer = memo(function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full py-12 px-4 border-t bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">I Hate Background</h3>
            <p className="text-muted-foreground leading-relaxed">
              O <strong>I Hate Background</strong> remove fundo de imagens de forma <strong>100% gratuita,
              ilimitada, com foco em privacidade e sem necessidade de login.</strong> Remova fundos de fotos usando
              inteligência artificial avançada, diretamente no seu navegador.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="w-3 h-3 text-green-500" />
                Privacidade Total
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Zap className="w-3 h-3 text-yellow-500" />
                IA Avançada
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="w-3 h-3 text-blue-500" />
                Sem Login
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">Sobre o projeto</a></li>
              <li><a href="#help-us" className="hover:text-foreground transition-colors">Como ajudar</a></li>
              <li>
                <a
                  href="https://github.com/lusrodri/canva-copy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.producthunt.com/products/i-hate-background"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Product Hunt
                </a>
              </li>
              <li>
                <a
                  href="https://buymeacoffee.com/lusrodri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Apoiar o projeto
                </a>
              </li>
              <li>
                <a
                  href="https://lusrodri.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Desenvolvedor
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {year} I Hate Background — Remova fundo de imagens de forma gratuita, ilimitada e com foco em privacidade.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" aria-label="amor" /> por{' '}
            <a
              href="https://lusrodri.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Lucas Santos Rodrigues
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
})
