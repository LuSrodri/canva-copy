import { memo } from 'react'
import donationImage from '@/assets/images/making-donation.webp?w=512&h=512&format=webp&quality=75'

export const About = memo(function About() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Sobre o Projeto
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Conheça o I Hate Background
          </h2>
        </div>

        <div className="prose prose-lg text-muted-foreground space-y-4">
          <p>
            O <strong className="text-foreground">I Hate Background</strong> nasceu de uma frustração comum:
            ferramentas de remoção de fundo que cobram caro, limitam o uso ou comprometem sua privacidade.
            Decidimos criar uma alternativa verdadeiramente gratuita e acessível para todos.
          </p>

          <p>
            <a
              href="https://github.com/lusrodri/canva-copy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              O I Hate Background é um projeto de código aberto disponível no GitHub
            </a>,
            desenvolvido e mantido por{' '}
            <a
              href="https://lusrodri.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Lucas Santos Rodrigues
            </a>,
            engenheiro da computação e entusiasta de inteligência artificial, apaixonado por criar tecnologia que realmente ajuda as pessoas.
          </p>

          <p>
            Nossa missão é fornecer uma <strong className="text-foreground">ferramenta de alto desempenho, fácil de usar e totalmente
            gratuita</strong> para remover fundos de imagens. Sem necessidade de uploads para servidores, sem preocupações com privacidade,
            sem limites de uso e sem cadastro.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={donationImage}
          alt="Ilustração de apoio ao projeto I Hate Background"
          width={512}
          height={512}
          className="w-full max-w-md h-auto rounded-2xl"
          loading="lazy"
        />
      </div>
    </div>
  )
})
