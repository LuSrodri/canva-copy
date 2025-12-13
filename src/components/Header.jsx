import { memo } from 'react'
import { Sparkles } from 'lucide-react'

import logoImage from '@/assets/images/logo.webp?w=40&h=40&format=webp&quality=85'

export const Header = memo(function Header() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center gap-2 group"
          aria-label="I Hate Background - Home"
        >
          <div className="relative">
            <img
              src={logoImage}
              alt="I Hate Background Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </a>

        <nav className="hidden sm:flex items-center gap-6">
          <a 
            href="#features" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Por que usar
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Como funciona
          </a>
          <a 
            href="#about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre
          </a>
        </nav>

        <a
          href="https://www.producthunt.com/products/i-hate-background"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors text-sm font-medium"
        >
          <Sparkles className="w-4 h-4" />
          Product Hunt
        </a>
      </div>
    </header>
  )
})
