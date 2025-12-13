import { memo } from 'react'
import { Heart } from 'lucide-react'

export const Footer = memo(function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full py-8 px-4 border-t bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground text-center">
          © {year} I Hate Background
        </p>
        <p className="text-sm text-muted-foreground text-center">
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

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a
            href="https://github.com/lusrodri/canva-copy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://www.producthunt.com/products/i-hate-background"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Product Hunt
          </a>
          <span>•</span>
          <a
            href="https://buymeacoffee.com/lusrodri"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Buy Me A Coffee
          </a>
        </div>
      </div>
    </footer>
  )
})
