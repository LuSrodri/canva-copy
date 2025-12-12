import { memo } from 'react'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const MEDIA_LINKS = [
  {
    title: 'Show HN: Bringing the alternative to remove.bg that are privacy and AI-first',
    excerpt: 'I built I Hate Background (IHB) after noticing that most background-removal tools send every image to external servers...',
    source: 'news.ycombinator.com',
    url: 'https://news.ycombinator.com/item?id=45940793',
  },
  {
    title: '[PITCH] I Hate Background! O que vocês sentem falta do remove.bg?',
    excerpt: 'O I Hate Background (IHB) é uma plataforma para remoção de background que roda inteiramente no seu navegador...',
    source: 'tabnews',
    url: 'https://www.tabnews.com.br/LusRodri/pitch-i-hate-background-o-que-voces-sentem-falta-do-remove-bg',
  },
  {
    title: 'Why I Built "I Hate Background" — a Privacy-First Background Removal Service',
    excerpt: 'So I built I Hate Background – a privacy-first, AI-first tool that runs directly in your browser...',
    source: 'dev.to',
    url: 'https://dev.to/lusrodri/why-i-built-i-hate-background-a-privacy-first-background-removal-service-1f6a',
  },
  {
    title: '🏖️ Built a Privacy-First Background Removal Tool Running Entirely in the Browser',
    excerpt: 'I\'d like to share a personal project I built that demonstrates the power of running AI models directly in the browser...',
    source: 'discuss.huggingface.co',
    url: 'https://discuss.huggingface.co/t/built-a-privacy-first-background-removal-tool-running-entirely-in-the-browser-with-transformers-js/163477',
  },
]

export const Media = memo(function Media() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">
          I Hate Background na Mídia
        </h2>
        <p className="text-lg text-muted-foreground">
          Veja o que estão dizendo sobre nós.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {MEDIA_LINKS.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 group-hover:scale-[1.02]">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {link.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {link.excerpt}
                </p>
                <p className="text-xs text-muted-foreground/70 italic">
                  ({link.source})
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
})
