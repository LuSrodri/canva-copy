import { memo } from 'react'
import { Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import logoImage from '@/assets/images/logo.webp?w=40&h=40&format=webp&quality=85'

export const Header = memo(function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Função para navegar para seção na home ou redirecionar para home com hash
  const handleSectionClick = (sectionId) => (e) => {
    if (isHomePage) {
      // Se está na home, apenas scroll suave
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // Se não está na home, o Link vai redirecionar para /#sectionId
  }

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          aria-label="I Hate Background - Removedor de fundo de imagens gratuito"
          title="I Hate Background - Removedor de fundo 100% gratuito, ilimitado e sem login"
        >
          <div className="relative">
            <img
              src={logoImage}
              alt="I Hate Background Logo - Removedor de fundo de imagens gratuito"
              width={40}
              height={40}
              className="h-10 w-auto"
              loading="eager"
              fetchpriority="high"
            />
          </div>
          <span className="hidden sm:inline font-semibold text-foreground">
            I Hate Background
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
          <a 
            href={isHomePage ? "#features" : "/#features"}
            onClick={handleSectionClick('features')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="Por que usar o I Hate Background"
          >
            Por que usar
          </a>
          <a 
            href={isHomePage ? "#how-to-use" : "/#how-to-use"}
            onClick={handleSectionClick('how-to-use')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="Como usar o I Hate Background"
          >
            Como usar
          </a>
          <a 
            href={isHomePage ? "#how-it-works" : "/#how-it-works"}
            onClick={handleSectionClick('how-it-works')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="Como o I Hate Background funciona"
          >
            Como funciona
          </a>
          <Link 
            to="/blog" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="Blog com artigos e tutoriais sobre remoção de fundo"
          >
            Blog
          </Link>
          <a 
            href={isHomePage ? "#faq" : "/#faq"}
            onClick={handleSectionClick('faq')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="Perguntas frequentes"
          >
            FAQ
          </a>
          <a 
            href={isHomePage ? "#about" : "/#about"}
            onClick={handleSectionClick('about')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="Sobre o projeto I Hate Background"
          >
            Sobre
          </a>
        </nav>

        <a
          href="https://www.producthunt.com/products/i-hate-background"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors text-sm font-medium"
          title="I Hate Background no Product Hunt"
        >
          <Sparkles className="w-4 h-4" />
          Product Hunt
        </a>
      </div>
    </header>
  )
})
