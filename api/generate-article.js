export default async function handler(req, res) {
  // CORS - definir antes de qualquer coisa
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { slug } = req.body

  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' })
  }

  try {
    // Import dinamico para evitar crash no carregamento
    const { GoogleGenAI, Type } = await import('@google/genai')

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
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
            description: 'Titulo atraente e otimizado para SEO (maximo 70 caracteres)',
          },
          subtitle: {
            type: Type.STRING,
            description: 'Subtitulo que complementa o titulo (maximo 160 caracteres)',
          },
          metaTitle: {
            type: Type.STRING,
            description: 'Meta titulo para SEO (maximo 60 caracteres)',
          },
          metaDescription: {
            type: Type.STRING,
            description: 'Meta descricao para SEO (maximo 155 caracteres)',
          },
          keywords: {
            type: Type.STRING,
            description: 'Palavras-chave separadas por virgula',
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
            description: 'Conteudo completo do artigo em formato Markdown',
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
                  description: 'Titulo do artigo relacionado',
                },
                subtitle: {
                  type: Type.STRING,
                  description: 'Subtitulo/resumo do artigo relacionado',
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

    const prompt = `Voce e um especialista em SEO e redacao de conteudo para um site chamado "I Hate Background", que e um removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login.

Gere um artigo completo em portugues brasileiro sobre o tema: "${slug.replace(/-/g, ' ')}".

O artigo DEVE estar relacionado a remocao de fundo de imagens, edicao de fotos, transparencia em imagens, ou topicos relacionados.

O conteudo deve:
- Ter entre 800-1500 palavras
- Incluir headers (## e ###)
- Incluir pelo menos uma tabela comparativa usando sintaxe Markdown
- Incluir listas (ordenadas e nao ordenadas)
- Mencionar o I Hate Background naturalmente como solucao
- Ser informativo e util para o leitor
- Incluir dicas praticas
- Ter uma conclusao com call-to-action

Para relatedArticles, gere 2 artigos relacionados com informacoes completas (slug, titulo, subtitulo, categoria e tempo de leitura). Os slugs devem ser no formato kebab-case e relacionados a remocao de fundo de imagens.`

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      config,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    })

    const article = JSON.parse(response.text)

    // Adicionar metadados
    article.publishedAt = new Date().toISOString().split('T')[0]
    article.slug = slug

    const colorMap = {
      'Tutorial': 'blue',
      'Dica': 'green',
      'E-commerce': 'purple',
      'Design': 'blue',
      'Fotografia': 'green'
    }
    article.color = colorMap[article.category] || 'blue'

    return res.status(200).json(article)
  } catch (error) {
    console.error('Error generating article:', error)
    return res.status(500).json({ error: 'Failed to generate article', details: error.message })
  }
}
