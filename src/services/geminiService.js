// Serviço para geração de artigos via Gemini API
import { GoogleGenAI, Type } from '@google/genai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// Cache para evitar regeneração desnecessária durante a sessão
const articleCache = new Map()

export async function generateArticle(slug) {
  // Verificar cache primeiro
  if (articleCache.has(slug)) {
    return articleCache.get(slug)
  }

  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  })

  const config = {
    thinkingConfig: {
      thinkingLevel: 'MINIMAL',
    },
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      required: ['title', 'subtitle', 'metaTitle', 'metaDescription', 'keywords', 'category', 'readingTime', 'content', 'relatedArticles'],
      properties: {
        title: {
          type: Type.STRING,
          description: 'Título atraente e otimizado para SEO (máximo 70 caracteres)',
        },
        subtitle: {
          type: Type.STRING,
          description: 'Subtítulo que complementa o título (máximo 160 caracteres)',
        },
        metaTitle: {
          type: Type.STRING,
          description: 'Meta título para SEO (máximo 60 caracteres)',
        },
        metaDescription: {
          type: Type.STRING,
          description: 'Meta descrição para SEO (máximo 155 caracteres)',
        },
        keywords: {
          type: Type.STRING,
          description: 'Palavras-chave separadas por vírgula',
        },
        category: {
          type: Type.STRING,
          description: 'Categoria do artigo: Tutorial, Dica, E-commerce, Design ou Fotografia',
        },
        readingTime: {
          type: Type.STRING,
          description: 'Tempo de leitura estimado (ex: 5 min)',
        },
        content: {
          type: Type.STRING,
          description: 'Conteúdo completo do artigo em formato Markdown',
        },
        relatedArticles: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ['slug', 'title', 'subtitle', 'category', 'readingTime'],
            properties: {
              slug: {
                type: Type.STRING,
                description: 'Slug do artigo relacionado no formato kebab-case',
              },
              title: {
                type: Type.STRING,
                description: 'Título do artigo relacionado',
              },
              subtitle: {
                type: Type.STRING,
                description: 'Subtítulo/resumo do artigo relacionado',
              },
              category: {
                type: Type.STRING,
                description: 'Categoria: Tutorial, Dica, E-commerce, Design ou Fotografia',
              },
              readingTime: {
                type: Type.STRING,
                description: 'Tempo de leitura estimado (ex: 4 min)',
              },
            },
          },
          description: 'Array com 2 artigos relacionados completos',
        },
      },
    },
  }

  const prompt = `Você é um especialista em SEO e redação de conteúdo para um site chamado "I Hate Background", que é um removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login.

Gere um artigo completo em português brasileiro sobre o tema: "${slug.replace(/-/g, ' ')}".

O artigo DEVE estar relacionado a remoção de fundo de imagens, edição de fotos, transparência em imagens, ou tópicos relacionados.

O conteúdo deve:
- Ter entre 800-1500 palavras
- Incluir headers (## e ###)
- Incluir pelo menos uma tabela comparativa usando sintaxe Markdown
- Incluir listas (ordenadas e não ordenadas)
- Mencionar o I Hate Background naturalmente como solução
- Ser informativo e útil para o leitor
- Incluir dicas práticas
- Ter uma conclusão com call-to-action

Para relatedArticles, gere 2 artigos relacionados com informações completas (slug, título, subtítulo, categoria e tempo de leitura). Os slugs devem ser no formato kebab-case e relacionados a remoção de fundo de imagens.`

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ]

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      config,
      contents,
    })

    const textContent = response.text

    if (!textContent) {
      throw new Error('No content generated')
    }

    // Parse o JSON da resposta
    const article = JSON.parse(textContent)

    // Adicionar data de publicação baseada no momento atual
    const now = new Date()
    article.publishedAt = now.toISOString().split('T')[0]
    article.slug = slug

    // Determinar cor baseada na categoria
    const colorMap = {
      'Tutorial': 'blue',
      'Dica': 'green',
      'E-commerce': 'purple',
      'Design': 'blue',
      'Fotografia': 'green'
    }
    article.color = colorMap[article.category] || 'blue'

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
