# I Hate Background - React + Vite Edition

A modern, privacy-first background removal platform built with React, Vite, Tailwind CSS, and shadcn/ui. More than just a tool - it's a complete content platform featuring AI-powered background removal, educational blog, and specialized pages for different use cases.

## 📋 What's New in v2.0

This project has evolved from a simple background removal tool into a **comprehensive content platform**:

- ✅ **Multi-page application** with React Router DOM
- ✅ **Blog system** with 4 SEO-optimized articles
- ✅ **Specialized landing pages** for different use cases
- ✅ **Advanced SEO** with React Helmet Async
- ✅ **Content marketing strategy** targeting e-commerce, designers, and creators
- ✅ **Portuguese localization** (pt-BR) with cultural context
- ✅ **Ad banner integration** for monetization
- ✅ **FAQ and promotional sections** for conversion optimization

## 🚀 Features

### Core Tool
- **100% Privacy**: All processing happens in your browser - no uploads to external servers
- **AI-Powered**: Uses Hugging Face Transformers.js for local ML inference
- **Lightning Fast**: Optimized for performance with Lighthouse 100 scores
- **Batch Processing**: Process multiple images simultaneously
- **Responsive**: Works perfectly on desktop and mobile devices
- **Accessible**: WCAG compliant with proper ARIA labels

### Content Platform
- **Blog System**: SEO-optimized articles about background removal, e-commerce, and design
- **Multiple Pages**: Specialized landing pages for different use cases
- **Dynamic Routing**: Article pages with dynamic slugs
- **SEO Optimization**: React Helmet for meta tags, Open Graph, and Twitter Cards

## 🛠️ Tech Stack

### Frontend Framework
- **Framework**: React 18 with Vite 7
- **Routing**: React Router DOM v7 (multi-page app)
- **SEO**: React Helmet Async (dynamic meta tags)

### Styling & UI
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Icons**: Lucide React
- **Animations**: tailwindcss-animate

### AI/ML & Processing
- **AI/ML**: @huggingface/transformers (browser-based inference)
- **Image Processing**: Sharp, vite-imagetools
- **Compression**: Brotli + Gzip

### UI Components
- **Radix UI**: Dialog, Dropdown Menu, Progress, Tooltip, Toast

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd canva-copy

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Setup

No environment variables required! The app runs entirely in the browser with:
- Client-side AI inference (no API keys needed)
- No backend server
- No database
- Pure static site (can be deployed to any static host)

## 🎯 Lighthouse Optimization

This project is optimized to achieve 100/100 on all Lighthouse metrics:

### Performance
- Code splitting with lazy loading
- Image optimization with WebP/AVIF formats
- Critical CSS inlining
- Tree shaking and minification
- Brotli/Gzip compression
- Preconnect to critical origins
- Font display swap

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels on interactive elements
- Sufficient color contrast
- Focus management

### Best Practices
- HTTPS enforced
- No deprecated APIs
- Console error free
- Proper meta tags

### SEO
- Meta descriptions
- Canonical URLs
- Structured data (JSON-LD)
- Open Graph tags
- Twitter Cards
- Sitemap.xml
- Robots.txt

## 📁 Project Structure

```
canva-copy/
├── public/
│   ├── examples/          # Example images
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components (button, card, progress, tooltip)
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── DropZone.jsx
│   │   ├── ImageGallery.jsx
│   │   ├── ImageCard.jsx
│   │   ├── Features.jsx
│   │   ├── HowToUse.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── SEOContent.jsx        # SEO-optimized content sections
│   │   ├── DocumentsPromo.jsx    # Promo for document background removal
│   │   ├── ArticlesPreview.jsx   # Blog articles preview grid
│   │   ├── FAQ.jsx               # Frequently asked questions
│   │   ├── About.jsx
│   │   ├── Media.jsx
│   │   ├── AdBanner.jsx          # Advertisement banner
│   │   └── Footer.jsx
│   ├── pages/            # Page components (routing)
│   │   ├── HomePage.jsx                        # Main landing page
│   │   ├── BlogPage.jsx                        # Blog listing page
│   │   ├── ArticlePage.jsx                     # Individual article page
│   │   ├── ArticleRouter.jsx                   # Dynamic article router
│   │   └── RemoverFundoDocumentosPage.jsx      # Specialized documents page
│   ├── data/             # Static data
│   │   └── articles.js   # Blog articles content (4 articles)
│   ├── hooks/            # Custom React hooks
│   │   └── useImageProcessor.js
│   ├── workers/          # Web Workers
│   │   └── inference.worker.js
│   ├── lib/              # Utilities
│   │   └── utils.js
│   ├── assets/           # Static assets
│   ├── main.jsx          # App entry point with routing
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🧩 Key Components

### Tool Components
- **DropZone**: Drag-and-drop file upload with example images
- **ImageGallery**: Grid display of processed images
- **ImageCard**: Individual image card with download/remove actions
- **useImageProcessor**: Custom hook managing image processing state and AI worker

### Content Components
- **Hero**: Main hero section with CTA
- **Features**: Feature highlights grid
- **HowToUse**: Step-by-step usage tutorial
- **HowItWorks**: Technical explanation of the tool
- **SEOContent**: Rich, keyword-optimized content blocks
- **FAQ**: Accordion-style frequently asked questions
- **ArticlesPreview**: Grid of blog article cards
- **DocumentsPromo**: Promotional section for document processing

### Layout Components
- **Header**: Navigation with logo and menu
- **Footer**: Links, social media, and legal info
- **AdBanner**: Global advertisement banner

### UI Components (shadcn/ui)
- Button, Card, Dialog, Dropdown Menu
- Progress, Tooltip, Toast

## 🗺️ Routes & Pages

The application uses React Router for multi-page navigation:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Main landing page with tool, features, FAQ, articles preview |
| `/blog` | `BlogPage` | Blog listing with all articles |
| `/blog/:slug` | `ArticleRouter → ArticlePage` | Individual article pages (dynamic) |
| `/remover-fundo-documentos-com-seguranca` | `RemoverFundoDocumentosPage` | Specialized page for document background removal |

### Current Articles (4)
1. **Remover fundo de logotipo** - Tutorial for logo background removal
2. **PNGs falsos resolver** - How to fix fake transparent PNGs
3. **Destacar produto** - Product photography for e-commerce
4. **Melhor ferramenta PNG 2026** - Best PNG transparent tool in 2026

## 📝 Adding New Blog Articles

To add a new article to the blog:

### 1. Edit `src/data/articles.js`

Add a new article object to the `ARTICLES` array:

```javascript
{
  id: 'my-article-slug',
  slug: 'my-article-slug',
  title: 'Article Title for Card Display',
  metaTitle: 'SEO Optimized Title | Brand',
  metaDescription: 'SEO meta description (150-160 chars)',
  summary: 'Brief summary shown in article cards',
  keywords: 'keyword1, keyword2, keyword3',
  publishedAt: '2026-02-05',
  updatedAt: '2026-02-05',
  readingTime: '5 min',
  category: 'Tutorial', // or 'Dica', 'E-commerce'
  icon: 'Image', // Lucide icon name
  color: 'blue', // or 'green', 'purple'
  content: `
## Article Content in Markdown

Your article content here...
  `
}
```

### 2. Article Metadata Fields

- **id/slug**: URL-friendly identifier (must match)
- **title**: Displayed in article cards and page header
- **metaTitle**: SEO title tag (include keywords)
- **metaDescription**: Meta description for search engines
- **summary**: Brief description shown in article preview cards
- **keywords**: Comma-separated SEO keywords
- **publishedAt/updatedAt**: ISO date format (YYYY-MM-DD)
- **readingTime**: Estimated reading time
- **category**: Article category for filtering
- **icon**: Lucide React icon name (e.g., 'Image', 'Zap', 'Trophy')
- **color**: Theme color ('blue', 'green', 'purple', etc.)
- **content**: Full article in Markdown format

### 3. SEO Best Practices

- Include target keyword in `metaTitle` and `metaDescription`
- Keep `metaDescription` between 150-160 characters
- Use semantic headings in content (##, ###)
- Include internal links to other articles or pages
- Add relevant keywords naturally throughout content

## 🖼️ Required Assets

Copy these assets from the original project to `public/`:

```bash
# Logo
public/logo.webp           # Logo image
public/favicon.ico         # Favicon

# Hero section
public/hero.webp           # Hero illustration

# Examples
public/examples/
├── tree.png
├── tree-thumb.webp
├── plane.jpg
├── plane-thumb.webp
├── father-daughter-walking.jpg
├── father-daughter-thumb.webp
├── beside-pool.jpg
└── beside-pool-thumb.webp

# Other images
public/example.webp            # How it works example
public/making-donation.webp    # About section
public/how-to-use.mp4         # Tutorial video

# PWA Icons
public/icon-192.png
public/icon-512.png
```

## 🎨 Customization

### Theme Colors

Edit `src/index.css` to customize the theme:

```css
:root {
  --primary: 210 100% 50%;  /* Blue */
  --radius: 0.75rem;
}
```

### Tailwind Config

Extend colors and animations in `tailwind.config.js`.

## 🔍 SEO Features

The platform is heavily optimized for search engines:

### Page-Level SEO
- **React Helmet Async**: Dynamic meta tags per page
- **Canonical URLs**: Proper canonical links for all pages
- **Open Graph Tags**: Social media preview optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: JSON-LD schema markup

### Content SEO
- **Keyword Optimization**: Each article targets specific keywords
- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **Internal Linking**: Cross-linking between articles and pages
- **Alt Text**: All images have descriptive alt attributes
- **Robots.txt**: Proper crawling instructions
- **Sitemap.xml**: Complete sitemap for search engines

### Technical SEO
- **Lighthouse 100 Scores**: Performance, Accessibility, Best Practices, SEO
- **Mobile-First**: Fully responsive design
- **Fast Load Times**: Code splitting, lazy loading, image optimization
- **Clean URLs**: SEO-friendly route structure

### Portuguese Language Optimization
All content is in Brazilian Portuguese (pt-BR) with:
- Localized keywords and phrases
- Cultural context and examples
- Currency in Brazilian Real (R$)

## 🚢 Deployment

The application is a static site and can be deployed to:

- **Vercel**: Zero config deployment (recommended)
- **Netlify**: Simple drag-and-drop or Git integration
- **GitHub Pages**: Free hosting for public repositories
- **Cloudflare Pages**: Fast CDN with automatic builds
- **AWS S3 + CloudFront**: Enterprise-grade hosting

### Build Output

```bash
npm run build
```

Generates optimized production files in `dist/`:
- Minified JavaScript bundles with code splitting
- Optimized CSS with Tailwind purge
- Compressed assets (Brotli + Gzip)
- Source maps for debugging

### Deployment Checklist

- [ ] Update canonical URLs in SEO meta tags
- [ ] Configure custom domain in hosting provider
- [ ] Set up SSL certificate (usually automatic)
- [ ] Update `sitemap.xml` with production domain
- [ ] Configure redirects if needed (404 → /)
- [ ] Enable Brotli/Gzip compression
- [ ] Set proper cache headers for assets

## 🎯 Project Strategy

This project combines a functional tool with content marketing:

### Tool as Value Proposition
- Free, unlimited background removal
- 100% privacy-focused (no server uploads)
- No registration required
- Professional quality results

### Content Marketing
- SEO-optimized blog articles targeting relevant keywords
- Educational content for e-commerce, designers, and content creators
- Internal linking strategy to drive tool usage
- Social proof and use case demonstrations

### Target Audience
- **E-commerce sellers**: Product photo preparation
- **Designers**: Quick background removal for projects
- **Content creators**: Social media assets
- **Small business owners**: Logo and marketing materials
- **Students**: Project and presentation materials

## 🚀 Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Adding Features

1. **New Components**: Add to `src/components/`
2. **New Pages**: Add to `src/pages/` and register route in `src/main.jsx`
3. **New Articles**: Edit `src/data/articles.js`
4. **Styling**: Use Tailwind classes or edit `src/index.css`

### Performance Tips

- Keep images optimized (use WebP/AVIF)
- Lazy load heavy components
- Use React.memo for expensive renders
- Test with Lighthouse regularly

## 📊 Analytics & Monitoring

### Recommended Tools

- **Google Analytics 4**: Track page views, conversions, and user behavior
- **Google Search Console**: Monitor SEO performance and indexing
- **Plausible/Fathom**: Privacy-friendly analytics alternative
- **Sentry**: Error tracking and performance monitoring

### Key Metrics to Track

- **Tool Usage**: Images processed, download rate
- **Content Performance**: Article page views, time on page, bounce rate
- **Conversions**: CTA clicks, tool engagement
- **SEO**: Organic traffic, keyword rankings, backlinks
- **Technical**: Core Web Vitals, error rate, load times

## 🐛 Troubleshooting

### AI Model Loading Issues

If the AI model fails to load:
- Check browser console for errors
- Ensure browser supports WebAssembly
- Try clearing cache and reloading
- Verify network connection (model downloads ~40MB on first use)

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Routing Issues in Production

If routes don't work after deployment:
- Configure catch-all redirect: `/* → /index.html`
- For Vercel: Create `vercel.json` with rewrites
- For Netlify: Create `_redirects` file
- For Apache: Configure `.htaccess`

### Performance Issues

- Reduce image sizes in `public/examples/`
- Enable code splitting for large components
- Lazy load blog articles
- Use `React.lazy()` for route-based splitting

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Credits

- Original project by [Lucas Santos Rodrigues](https://lusrodri.me)
- AI model: [onnx-community/ormbg-ONNX](https://huggingface.co/onnx-community/ormbg-ONNX)
- Powered by [Transformers.js](https://huggingface.co/docs/transformers.js)
