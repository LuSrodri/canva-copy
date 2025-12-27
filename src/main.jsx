import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TooltipProvider } from './components/ui/tooltip'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
)
