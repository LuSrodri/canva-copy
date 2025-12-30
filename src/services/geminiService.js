const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Cache para evitar regeneração desnecessária durante a sessão
const articleCache = new Map()

export async function generateArticle(slug) {
  // Verificar cache primeiro
  if (articleCache.has(slug)) {
    return articleCache.get(slug)
  }

  try {
    const response = await fetch(`${API_URL}/api/generate-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const article = await response.json()

    // Salvar no cache
    articleCache.set(slug, article)

    return article
  } catch (error) {
    console.error('Error generating article:', error)
    throw error
  }
}

// Limpar cache (útil para desenvolvimento)
export function clearArticleCache() {
  articleCache.clear()
}
