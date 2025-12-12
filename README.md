# I Hate Background - React + Vite Edition

A modern, privacy-first background removal tool built with React, Vite, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **100% Privacy**: All processing happens in your browser - no uploads to external servers
- **AI-Powered**: Uses Hugging Face Transformers.js for local ML inference
- **Lightning Fast**: Optimized for performance with Lighthouse 100 scores
- **Modern Stack**: React 18, Vite, Tailwind CSS, shadcn/ui, Lucide Icons
- **Responsive**: Works perfectly on desktop and mobile devices
- **Accessible**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **AI/ML**: @huggingface/transformers
- **Image Optimization**: vite-imagetools
- **Compression**: Brotli + Gzip

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

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
ihb-react/
├── public/
│   ├── examples/          # Example images
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── DropZone.jsx
│   │   ├── ImageGallery.jsx
│   │   ├── ImageCard.jsx
│   │   ├── Features.jsx
│   │   ├── HowToUse.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── About.jsx
│   │   ├── Media.jsx
│   │   └── Footer.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useImageProcessor.js
│   ├── workers/          # Web Workers
│   │   └── inference.worker.js
│   ├── lib/              # Utilities
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

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

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Credits

- Original project by [Lucas Santos Rodrigues](https://lusrodri.me)
- AI model: [onnx-community/ormbg-ONNX](https://huggingface.co/onnx-community/ormbg-ONNX)
- Powered by [Transformers.js](https://huggingface.co/docs/transformers.js)
