
# Sem fundos 🏖️ (A Canva Copy)

## O que é?
Esse projeto é uma tentativa de bater de frente com o famoso, e já consolidado, **Canva**. Mas a execução aqui é diferente: Será utilizado o que tem de melhor do **Open-Source** para rodar tudo o que for referente a edição de imagem, **utilizando IA**, **localmente** no navegador, **preservando a privacidade** e sem a necessidade de enviar nada a servidor nenhum.

## Como funciona?
Hoje, existe o módulo de **remoção de fundos de imagens**, o Sem fundos. Esse módulo utiliza a biblioteca **Open-Source TransformersJs do Hugging Face** para rodar modelos de IA **localmente**, também Open-Source (hoje é o **RMBG-1.4**), para executar modificações nas imagens para remover tudo o que for de plano de fundo, evitando a necessidade de enviar arquivos para servidores de terceiros.

## Como rodar na sua máquina?
Em uma máquina com um navegador (de preferência Windows com Chrome ou Firefox), basta abrir o `index.html`. **Recomendação** é utilizar o Live server do VS code, para evitar problemas de segurança dos navegadores, como o CORS.

## Próximos passos
- ⚒️ Garantir que o modelo de IA para remoção de fundo de imagens funcione em outros ambientes, como Linux, MacOS, Android, IOS, e outros.
- ⚒️ Implementar um módulo de trocar o fundo da imagem por cores sólidas.
- 🚀 E expandir cada vez mais, aqui a imaginação é o limite.