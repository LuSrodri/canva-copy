import { memo } from 'react'
import { CheckCircle, Shield, Zap, Globe, Heart, Users, Clock, Infinity } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const STATS = [
  { icon: Users, value: 'Milhares', label: 'Usuários satisfeitos', color: 'text-blue-500' },
  { icon: Clock, value: '<35s', label: 'Tempo médio de processamento', color: 'text-green-500' },
  { icon: Infinity, value: '∞', label: 'Imagens ilimitadas', color: 'text-purple-500' },
  { icon: Shield, value: '100%', label: 'Privacidade garantida', color: 'text-orange-500' },
]

export const SEOContent = memo(function SEOContent() {
  return (
    <div className="space-y-12">
      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main SEO Content */}
      <div className="prose prose-lg max-w-none">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground !mt-0">
              O que é o I Hate Background?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              O <strong className="text-foreground">I Hate Background</strong> é um <strong className="text-foreground">removedor de fundo de imagens 100% gratuito, ilimitado, com foco em privacidade e sem necessidade de login</strong>. 
              Desenvolvido com inteligência artificial de última geração, nossa ferramenta permite que você remova o fundo de qualquer imagem em segundos, 
              diretamente no seu navegador.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Diferente de outras ferramentas que limitam o número de imagens, adicionam marcas d'água ou exigem cadastro, 
              o I Hate Background foi criado para ser <strong className="text-foreground">verdadeiramente gratuito e acessível para todos</strong>. 
              Seja você um designer profissional, empreendedor, criador de conteúdo ou simplesmente alguém que precisa remover 
              o fundo de uma foto, nossa ferramenta está pronta para ajudar.
            </p>

            <h3 className="text-xl font-semibold text-foreground">
              Por que escolher o I Hate Background?
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Totalmente gratuito:</strong> Não cobramos nada, nunca. Sem planos premium, sem truques.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Sem limites:</strong> Processe quantas imagens quiser, quantas vezes precisar.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Privacidade absoluta:</strong> Suas imagens nunca saem do seu computador. Zero uploads para servidores.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Sem cadastro:</strong> Use imediatamente. Não pedimos email, nome ou qualquer dado pessoal.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Alta qualidade:</strong> IA avançada que preserva detalhes e bordas com precisão.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground !mt-0">
              Como funciona a remoção de fundo?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              O I Hate Background utiliza <strong className="text-foreground">modelos de inteligência artificial de segmentação semântica</strong> que 
              são executados diretamente no seu navegador usando WebGPU e WebAssembly. Isso significa que todo o processamento 
              acontece localmente, no seu próprio dispositivo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Quando você faz upload de uma imagem, a IA analisa cada pixel para identificar o que é o objeto principal 
              (pessoa, produto, animal, objeto) e o que é fundo. Em seguida, remove cirurgicamente o fundo, preservando 
              todos os detalhes importantes como cabelos, pelos, bordas suaves e transparências.
            </p>

            <h3 className="text-xl font-semibold text-foreground">
              Casos de uso populares
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Fotos de produtos para e-commerce</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Logotipos e identidade visual</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50">
                <Zap className="w-4 h-4 text-purple-500" />
                <span>Fotos para redes sociais</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Retratos e fotos pessoais</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-pink-50">
                <Zap className="w-4 h-4 text-pink-500" />
                <span>Materiais de marketing</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-cyan-50">
                <Zap className="w-4 h-4 text-cyan-500" />
                <span>Apresentações profissionais</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Thumbnails para YouTube</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-indigo-50">
                <Zap className="w-4 h-4 text-indigo-500" />
                <span>Montagens e colagens</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="text-center space-y-4 py-8 px-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Heart className="w-5 h-5 fill-current" />
          <span className="font-semibold">Milhares pessoas já usaram</span>
        </div>
        <h3 className="text-2xl font-bold text-foreground">
          Confiado por designers, empreendedores e criadores do mundo todo
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          O I Hate Background é um projeto de <strong className="text-foreground">código aberto</strong> disponível no GitHub. 
          Você pode verificar exatamente como funciona, contribuir com melhorias ou até mesmo hospedar sua própria versão. 
          Transparência total, sem pegadinhas.
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Funciona em qualquer navegador moderno
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Código aberto e auditável
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Tecnologia de ponta com IA local
          </div>
        </div>
      </div>
    </div>
  )
})
