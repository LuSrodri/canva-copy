import { useState } from 'react'
import { X } from 'lucide-react'

export function AdBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2 px-4 text-center text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <a 
          href="https://amzn.to/4kgBj0c" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition-colors duration-200 grow"
        >
          <span className="font-semibold text-blue-400">Celular para Quem Cria de Verdade:</span>{' '}
          <span className="text-gray-200">Apple iPhone 17. Magicolorido. Feito para admirar e para durar.</span>
          <span className="ml-2 text-blue-400 hover:underline">Saiba mais →</span>
        </a>
        <button 
          onClick={() => setIsVisible(false)}
          className="w-min p-1 hover:bg-slate-700 rounded transition-colors duration-200"
          aria-label="Fechar anúncio"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  )
}
