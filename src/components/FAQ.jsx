import { memo } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: 'O I Hate Background é realmente 100% gratuito?',
    answer: 'Sim! O I Hate Background é completamente gratuito, sem limites de uso, sem marcas d\'água e sem necessidade de cadastro. Você pode processar quantas imagens quiser, quantas vezes precisar, sem pagar nada. Não temos planos "premium" ou recursos escondidos atrás de paywall.'
  },
  {
    question: 'Minhas imagens são enviadas para algum servidor?',
    answer: 'Não! Esta é uma das principais vantagens do I Hate Background. Todo o processamento acontece diretamente no seu navegador, usando inteligência artificial que roda localmente no seu dispositivo. Suas imagens nunca saem do seu computador, garantindo privacidade total.'
  },
  {
    question: 'Preciso criar uma conta ou fazer login?',
    answer: 'Não! Você pode usar o I Hate Background imediatamente, sem criar conta, sem fornecer email, sem login. Basta acessar o site e começar a remover fundos. Valorizamos sua privacidade e tempo.'
  },
  {
    question: 'Quais formatos de imagem são suportados?',
    answer: 'O I Hate Background suporta os formatos mais comuns: JPEG (JPG), PNG e WebP. Após o processamento, você pode baixar a imagem com fundo transparente no formato PNG, que preserva a transparência.'
  },
  {
    question: 'Existe limite de tamanho ou quantidade de imagens?',
    answer: 'Não há limite de quantidade - processe quantas imagens precisar! Quanto ao tamanho, imagens muito grandes podem demorar mais para processar dependendo do seu dispositivo, mas não há limite técnico imposto por nós.'
  },
  {
    question: 'O I Hate Background funciona em celular/tablet?',
    answer: 'Sim! O I Hate Background funciona em qualquer dispositivo com um navegador moderno: computadores (Windows, Mac, Linux), tablets e smartphones. A interface é totalmente responsiva e otimizada para todos os tamanhos de tela.'
  },
  {
    question: 'A qualidade da imagem é mantida após remover o fundo?',
    answer: 'Sim! Nossa IA de segmentação avançada preserva todos os detalhes da imagem original, incluindo bordas suaves, cabelos, pelos e transparências parciais. A resolução da imagem também é mantida integralmente.'
  },
  {
    question: 'Posso usar as imagens processadas comercialmente?',
    answer: 'Absolutamente! As imagens processadas são suas. Você pode usá-las para qualquer finalidade: e-commerce, redes sociais, materiais de marketing, apresentações, etc. Não adicionamos marcas d\'água nem reivindicamos direitos sobre suas imagens.'
  },
  {
    question: 'O I Hate Background funciona offline?',
    answer: 'Após o primeiro acesso, o modelo de IA fica armazenado no cache do seu navegador. Isso significa que, em acessos subsequentes, você pode usar a ferramenta mesmo sem conexão com a internet (modo offline).'
  },
  {
    question: 'Como o I Hate Background se compara a ferramentas pagas?',
    answer: 'O I Hate Background oferece qualidade comparável às melhores ferramentas pagas do mercado, com a vantagem de ser totalmente gratuito, ilimitado e focado em privacidade. Enquanto outras ferramentas cobram por imagem ou limitam o uso mensal, aqui você tem liberdade total.'
  },
  {
    question: 'Posso processar várias imagens ao mesmo tempo?',
    answer: 'Sim! O I Hate Background suporta processamento em lote. Você pode arrastar e soltar múltiplas imagens de uma vez, e todas serão processadas sequencialmente. Ideal para quem trabalha com grandes volumes de imagens.'
  },
  {
    question: 'O código do I Hate Background é aberto?',
    answer: 'Sim! O I Hate Background é um projeto de código aberto disponível no GitHub. Você pode verificar exatamente como funciona, contribuir com melhorias, reportar bugs ou até mesmo hospedar sua própria versão. Transparência total!'
  }
]

const FAQItem = memo(function FAQItem({ item, index }) {
  return (
    <details 
      className="group border-b border-gray-200 last:border-0"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none hover:text-primary transition-colors">
        <h3 className="text-left font-medium text-foreground group-open:text-primary" itemProp="name">
          {item.question}
        </h3>
        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div 
        className="pb-5 text-muted-foreground leading-relaxed"
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <p itemProp="text">{item.answer}</p>
      </div>
    </details>
  )
})

export const FAQ = memo(function FAQ() {
  return (
    <div className="space-y-8" itemScope itemType="https://schema.org/FAQPage">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <HelpCircle className="w-4 h-4" />
          Perguntas Frequentes
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Dúvidas sobre o I Hate Background?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Reunimos as perguntas mais comuns sobre nosso <strong>removedor de fundo de imagens gratuito</strong>. 
          Se sua dúvida não estiver aqui, entre em contato pelo GitHub.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-6 sm:p-8">
        {FAQ_ITEMS.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Ainda tem dúvidas? {' '}
          <a 
            href="https://github.com/lusrodri/canva-copy/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Abra uma issue no GitHub
          </a>
          {' '} e teremos prazer em ajudar!
        </p>
      </div>
    </div>
  )
})
