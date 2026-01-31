import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { TooltipProvider } from './components/ui/tooltip'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import ArticleRouter from './pages/ArticleRouter'
import RemoverFundoDocumentosPage from './pages/RemoverFundoDocumentosPage'
import './index.css'
import { AdBanner } from './components/AdBanner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <TooltipProvider>
          <AdBanner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/remover-fundo-documentos-com-seguranca" element={<RemoverFundoDocumentosPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticleRouter />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
