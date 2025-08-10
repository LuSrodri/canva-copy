
# I Hate Background 🌹 (A Canva Copy)

## O que é?
Esse projeto é uma tentativa de bater de frente com o famoso, e já consolidado, **Canva**. Mas a execução aqui é diferente: Será utilizado o que tem de melhor do **Open-Source** para rodar tudo o que for referente a edição de imagem, **utilizando IA**, **localmente** no navegador, **preservando a privacidade** e sem a necessidade de enviar nada a servidor nenhum.

## Como funciona?
Hoje, existe o módulo de **remoção de fundos de imagens**, o I Hate Background. Esse módulo utiliza a biblioteca **Open-Source TransformersJs do Hugging Face** para rodar modelos de IA **localmente**, também Open-Source (hoje é o **RMBG-1.4**), para executar modificações nas imagens para remover tudo o que for de plano de fundo, evitando a necessidade de enviar arquivos para servidores de terceiros.

## 🚀 Arquitetura e Funcionalidades

### **ImagesProcessor - Sistema de Gerenciamento Avançado**
O projeto possui uma classe `ImagesProcessor` completa que gerencia todo o ciclo de vida das imagens:

#### **Estados das Imagens**
- **"Adicionado à fila"** (`queued`) - Imagem aguardando processamento ⏳
- **"Processando imagem"** (`processing`) - Imagem sendo processada pela IA 🔄
- **"Imagem pronta"** (`ready`) - Processamento concluído com sucesso ✅

#### **Funcionalidades Principais**
- ✅ **Processamento sequencial** - Uma imagem por vez para manter performance estável
- ✅ **Gerenciamento inteligente de fila** - Sistema automático para múltiplas imagens
- ✅ **Preservação de nomes originais** - Mantém nomes originais para download correto
- ✅ **Controle de remoção inteligente** - Permite remover apenas imagens não processando
- ✅ **Cache de imagens de exemplo** - Pré-carregamento elimina delays no primeiro acesso
- ✅ **Suporte multilíngue** - Interface em Português e Inglês

### **Melhorias de Performance**
- **Pré-carregamento**: Todas as imagens de exemplo são carregadas ao inicializar
- **Resposta imediata**: Clique nas imagens de exemplo funciona instantaneamente
- **Web Workers**: Processamento de IA em background sem travar a interface
- **Gerenciamento de memória**: Sistema eficiente de cache e limpeza

### **Interface Inteligente**
- **Indicadores visuais**: Estados claros com ícones e cores
- **Controles reativos**: Botões se ajustam automaticamente ao estado da imagem
- **Feedback em tempo real**: Usuário sempre sabe o que está acontecendo
- **Prevenção de erros**: Interface bloqueia ações incorretas automaticamente

## Como rodar na sua máquina?
Em uma máquina com um navegador (de preferência Windows com Chrome ou Firefox), basta abrir o `index.html`. **Recomendação** é utilizar o Live server do VS code, para evitar problemas de segurança dos navegadores, como o CORS.

## 🎯 Funcionalidades Técnicas

### **Gerenciamento de Estados**
```javascript
// Cada imagem passa por estes estados:
queued → processing → ready
```

### **Controles de Segurança**
- Impossível remover imagem durante processamento
- Interface bloqueada visualmente para ações não permitidas  
- Tratamento robusto de erros com fallbacks

### **Preservação de Arquivos**
- **Uploads**: `foto.jpg` → `foto-without-background.png`
- **Exemplos**: `tree.webp` → `tree-without-background.png`

### **Compatibilidade Total**
- ✅ Drag & Drop de múltiplas imagens
- ✅ Colar imagens da área de transferência
- ✅ Upload tradicional via botão
- ✅ Clique em imagens de exemplo
- ✅ Google Analytics integrado
- ✅ Suporte a WEBP, JPEG, PNG

## Próximos passos
- ⚒️ Garantir que o modelo de IA para remoção de fundo de imagens funcione em outros ambientes, como Linux, MacOS, Android, IOS, e outros.
- ⚒️ Implementar um módulo de trocar o fundo da imagem por cores sólidas.
- ⚒️ Adicionar histórico de imagens processadas
- ⚒️ Implementar processamento em lote otimizado
- 🚀 E expandir cada vez mais, aqui a imaginação é o limite.

---

Acesse o repositório da [API](https://github.com/LuSrodri/canva-copy-api) também.