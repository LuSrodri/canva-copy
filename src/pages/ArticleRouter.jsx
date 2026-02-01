import { useParams, Navigate } from 'react-router-dom'
import { getArticleBySlug } from '../data/articles'
import ArticlePage from './ArticlePage'

export default function ArticleRouter() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  if (article) {
    return <ArticlePage />
  }

  return <Navigate to="/blog" replace />
}
