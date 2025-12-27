import { memo, useState } from 'react'
import { ChevronDown, ChevronUp, Sparkles, CheckCircle, ArrowRight, Image as ImageIcon, ShieldCheck, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const ARTICLES = [
  {
    id: 'remover-fundo-logotipo',
    title: 'Veja como remover fundo de logotipo com I Hate Background',
    summary: 'Aprenda a remover o fundo do seu logotipo de forma gratuita, rápida e sem perder qualidade. Ideal para designers, empreendedores e criadores de conteúdo.',
    content: `
      <h3>Por que remover o fundo do logotipo é importante?</h3>
      <p>Um logotipo com fundo transparente é essencial para qualquer marca profissional. Ele permite que você aplique sua identidade visual em qualquer superfície, seja em sites, redes sociais, cartões de visita, camisetas ou materiais promocionais, sem aquele incômodo fundo branco ou colorido atrapalhando o design.</p>
      
      <p>Muitas ferramentas cobram mensalidades caras ou limitam a quantidade de imagens que você pode processar. Com o <strong>I Hate Background</strong>, você tem um <strong>removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login</strong>.</p>
      
      <h3>Passo a passo para remover o fundo do seu logotipo</h3>
      <ol>
        <li><strong>Acesse o I Hate Background:</strong> Não precisa criar conta, baixar aplicativo ou fornecer e-mail. Basta acessar e usar imediatamente.</li>
        <li><strong>Arraste ou selecione seu logotipo:</strong> Clique na área de upload ou simplesmente arraste o arquivo do seu computador. O I Hate Background aceita arquivos JPG, PNG e WebP.</li>
        <li><strong>Aguarde alguns segundos:</strong> A inteligência artificial processa sua imagem diretamente no navegador. Isso significa que seu logotipo nunca sai do seu computador - privacidade total garantida.</li>
        <li><strong>Baixe o resultado:</strong> Pronto! Seu logotipo agora está com fundo transparente, em alta qualidade, pronto para usar onde você quiser.</li>
      </ol>
      
      <h3>Dicas para melhores resultados</h3>
      <ul>
        <li>Use imagens com boa resolução para obter resultados mais nítidos</li>
        <li>Logotipos com bordas bem definidas funcionam melhor</li>
        <li>Se o logotipo tiver cores similares ao fundo, a IA ainda consegue identificar as bordas na maioria dos casos</li>
        <li>Você pode processar vários logotipos ao mesmo tempo - ideal para agências e designers</li>
      </ul>
      
      <h3>Por que escolher o I Hate Background?</h3>
      <p>Diferente de outras ferramentas, o <strong>I Hate Background é um removedor de fundo 100% gratuito e ilimitado</strong>. Não há marca d'água, não há limite de imagens por dia, e o mais importante: <strong>suas imagens nunca são enviadas para nenhum servidor</strong>. Todo o processamento acontece localmente no seu navegador usando inteligência artificial avançada.</p>
    `,
    icon: ImageIcon,
    color: 'blue'
  },
  {
    id: 'pngs-falsos-resolver',
    title: 'Problemas com PNGs falsos? Veja como resolver com 1 passo!',
    summary: 'Descubra o que são PNGs falsos e como o I Hate Background resolve esse problema comum de forma instantânea e gratuita.',
    content: `
      <h3>O que são PNGs falsos?</h3>
      <p>Você já baixou uma imagem PNG achando que tinha fundo transparente, mas quando foi usar, descobriu que o fundo era branco ou xadrez? Esse é o famoso problema dos "PNGs falsos" - imagens que parecem ter transparência mas na verdade têm um fundo sólido.</p>
      
      <p>Isso acontece porque muitos sites disponibilizam imagens com fundos que <em>simulam</em> transparência (aquele padrão xadrez cinza), mas o arquivo em si não possui canal alpha, ou seja, não tem transparência real.</p>
      
      <h3>Como identificar um PNG falso?</h3>
      <ul>
        <li>Ao colocar sobre outro fundo, aparece um quadrado branco ou cinza ao redor</li>
        <li>O arquivo pode ser grande demais para uma imagem que deveria ser simples</li>
        <li>Ao visualizar em editores de imagem, o fundo aparece como cor sólida</li>
      </ul>
      
      <h3>A solução: I Hate Background</h3>
      <p>Com o <strong>I Hate Background, removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login</strong>, resolver esse problema leva apenas 1 passo:</p>
      
      <ol>
        <li><strong>Arraste o PNG falso para o I Hate Background</strong> - em segundos, a inteligência artificial remove o fundo indesejado e você recebe a imagem com transparência REAL.</li>
      </ol>
      
      <p>Sim, é só isso! Não precisa abrir Photoshop, não precisa saber usar ferramentas complexas de edição, não precisa pagar por software caro. O I Hate Background faz todo o trabalho pesado para você.</p>
      
      <h3>Vantagens de usar o I Hate Background para corrigir PNGs falsos</h3>
      <ul>
        <li><strong>Gratuito e ilimitado:</strong> Processe quantas imagens precisar, sem pagar nada</li>
        <li><strong>Privacidade garantida:</strong> Suas imagens nunca saem do seu computador</li>
        <li><strong>Sem cadastro:</strong> Use imediatamente, sem criar conta ou fornecer dados</li>
        <li><strong>Rápido:</strong> Resultados em segundos graças à IA de última geração</li>
        <li><strong>Alta qualidade:</strong> A imagem resultante mantém todos os detalhes do original</li>
      </ul>
      
      <h3>Dica extra</h3>
      <p>Se você trabalha com design, marketing ou e-commerce, provavelmente lida com dezenas de imagens diariamente. O I Hate Background permite processar <strong>múltiplas imagens ao mesmo tempo</strong>, economizando horas do seu tempo.</p>
    `,
    icon: ShieldCheck,
    color: 'green'
  },
  {
    id: 'destacar-produto-remover-fundo',
    title: 'Como destacar o meu produto? Veja como remover o fundo da foto te ajuda!',
    summary: 'Aprenda como fotos de produtos com fundo transparente ou branco aumentam as vendas e como fazer isso gratuitamente.',
    content: `
      <h3>A importância da foto do produto no e-commerce</h3>
      <p>Em lojas virtuais, a foto do produto é o primeiro (e muitas vezes único) contato visual que o cliente tem com o que você está vendendo. Estudos mostram que <strong>produtos com fotos profissionais vendem até 3x mais</strong> do que produtos com fotos amadoras.</p>
      
      <p>E uma das características mais importantes de uma foto profissional de produto é: <strong>fundo limpo</strong>. Seja fundo branco, transparente ou uma cor sólida, remover distrações visuais faz o produto ser o protagonista.</p>
      
      <h3>Por que fundo transparente/branco vende mais?</h3>
      <ul>
        <li><strong>Foco total no produto:</strong> Sem elementos distrativos, o cliente vê apenas o que importa</li>
        <li><strong>Aparência profissional:</strong> Transmite credibilidade e confiança na sua marca</li>
        <li><strong>Consistência visual:</strong> Todas as fotos da loja ficam padronizadas</li>
        <li><strong>Versatilidade:</strong> A mesma foto pode ser usada em diferentes contextos e plataformas</li>
        <li><strong>Requisito de marketplaces:</strong> Amazon, Mercado Livre e outros exigem fundo branco</li>
      </ul>
      
      <h3>Como remover o fundo das fotos de produtos gratuitamente</h3>
      <p>O <strong>I Hate Background é um removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login</strong>. Veja como usar:</p>
      
      <ol>
        <li><strong>Fotografe seu produto:</strong> Use boa iluminação e tente ter contraste entre o produto e o fundo</li>
        <li><strong>Acesse o I Hate Background:</strong> Não precisa instalar nada ou criar conta</li>
        <li><strong>Faça upload da foto:</strong> Arraste a imagem ou clique para selecionar</li>
        <li><strong>Aguarde o processamento:</strong> A IA remove o fundo em segundos</li>
        <li><strong>Baixe e use:</strong> Pronto! Adicione fundo branco no seu editor favorito ou use com transparência</li>
      </ol>
      
      <h3>Dicas para fotos de produtos perfeitas</h3>
      <ul>
        <li>Use luz natural ou softbox para iluminação uniforme</li>
        <li>Fotografe em ângulos que mostrem os detalhes do produto</li>
        <li>Evite sombras muito fortes que possam confundir a IA</li>
        <li>Para produtos pequenos, use uma caixa de luz (lightbox)</li>
        <li>Processe várias fotos de uma vez para economizar tempo</li>
      </ul>
      
      <h3>Por que o I Hate Background é a melhor opção para e-commerce?</h3>
      <p>Ao contrário de serviços pagos que cobram por imagem ou limitam o uso mensal, o I Hate Background oferece:</p>
      <ul>
        <li><strong>Uso ilimitado:</strong> Processe centenas de fotos de produtos sem pagar nada</li>
        <li><strong>Privacidade:</strong> Suas fotos de produtos nunca saem do seu computador - importante para lançamentos sigilosos</li>
        <li><strong>Velocidade:</strong> Ideal para quem precisa processar muitas fotos rapidamente</li>
        <li><strong>Qualidade profissional:</strong> Resultados comparáveis a ferramentas pagas</li>
      </ul>
    `,
    icon: Zap,
    color: 'purple'
  }
]

const ArticleCard = memo(function ArticleCard({ article, isExpanded, onToggle, onCtaClick }) {
  const Icon = article.icon
  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }
  }
  const colors = colorClasses[article.color]

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-xl' : 'hover:shadow-lg'}`}>
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full p-6 flex items-start gap-4 text-left hover:bg-gray-50/50 transition-colors"
          aria-expanded={isExpanded}
        >
          <div className={`p-3 rounded-xl ${colors.bg} flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              {article.summary}
            </p>
          </div>
          <div className={`p-2 rounded-full ${colors.bg} flex-shrink-0`}>
            {isExpanded ? (
              <ChevronUp className={`w-5 h-5 ${colors.text}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${colors.text}`} />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 animate-fade-in">
            <div className={`border-t ${colors.border} pt-6`}>
              <article 
                className="prose prose-lg max-w-none text-muted-foreground
                  prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-6 prose-headings:mb-3
                  prose-p:mb-4 prose-p:leading-relaxed
                  prose-ul:my-4 prose-ul:space-y-2
                  prose-ol:my-4 prose-ol:space-y-2
                  prose-li:text-muted-foreground
                  prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              <div className={`mt-8 p-6 rounded-2xl ${colors.bg} ${colors.border} border`}>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-semibold text-foreground mb-1">
                      Pronto para experimentar?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Use o I Hate Background agora mesmo - é gratuito, ilimitado e não precisa de cadastro!
                    </p>
                  </div>
                  <Button onClick={onCtaClick} className="gap-2 whitespace-nowrap">
                    <Sparkles className="w-4 h-4" />
                    Experimentar agora
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

export const Articles = memo(function Articles({ onCtaClick }) {
  const [expandedId, setExpandedId] = useState(null)

  const toggleArticle = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Artigos e Tutoriais
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Aprenda a usar o I Hate Background
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Descubra como o <strong>I Hate Background, o removedor de fundo de imagens 100% gratuito, ilimitado e focado em privacidade</strong>, 
          pode transformar seu fluxo de trabalho. Confira nossos guias práticos e dicas exclusivas.
        </p>
      </div>

      <div className="space-y-4">
        {ARTICLES.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isExpanded={expandedId === article.id}
            onToggle={() => toggleArticle(article.id)}
            onCtaClick={onCtaClick}
          />
        ))}
      </div>

      <div className="text-center space-y-4 pt-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            100% Gratuito
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Sem limite de imagens
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Sem cadastro
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Privacidade total
          </div>
        </div>
      </div>
    </div>
  )
})
