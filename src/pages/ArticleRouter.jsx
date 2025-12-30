import { useParams } from 'react-router-dom'
import { getArticleBySlug } from '../data/articles'
import ArticlePage from './ArticlePage'
import DynamicArticlePage from './DynamicArticlePage'

// Este componente decide qual página de artigo renderizar:
// - ArticlePage para artigos estáticos (já existentes em articles.js)
// - DynamicArticlePage para artigos programáticos (gerados via Gemini)
export default function ArticleRouter() {
  const { slug } = useParams()
  
  // Verificar se é um artigo estático
  const staticArticle = getArticleBySlug(slug)
  
  if (staticArticle) {
    // Artigo estático - usar o componente original
    return <ArticlePage />
  }
  
  // Artigo programático - usar o componente dinâmico
  return <DynamicArticlePage />
}
