# Unikon - Multi-Purpose Business Agency Website

A modern, responsive multi-purpose business website built with **Next.js 15**, **TypeScript**, and **GSAP animations**. Features multiple agency layouts including Digital Agency, Marketing Agency, Consultant Agency, Financial Advisor, Legal Advisor, Healthcare, Fitness, Architectural Agency, Startup Agency, and Showcase.

## 🚀 Features

### **Multiple Agency Layouts**
- **Digital Agency** - Default landing page
- **Marketing Agency** - Marketing services focused
- **Consultant Agency** - Business consulting layout  
- **Financial Advisor** - Financial services design
- **Legal Advisor** - Law firm template
- **Healthcare** - Medical services layout
- **Fitness** - Gym and fitness center design
- **Architectural Agency** - Architecture firm template
- **Startup Agency** - Startup company layout
- **Showcase** - Portfolio showcase design

### **Inner Pages**
- **Blog Pages**: Classic blog, Grid layout, Blog details
- **Portfolio Pages**: Portfolio grid, Portfolio details  
- **Service Pages**: Services overview, Service details
- **Team Pages**: Team grid, Team member details
- **Other Pages**: About, Contact, FAQ, Error 404

### **Technical Features**
- ⚡ **Next.js 15** with App Router
- 🎯 **TypeScript** for type safety
- 🎨 **Bootstrap 5** + **React Bootstrap** for responsive design
- ✨ **GSAP Animations** with custom hooks
- 📱 **Fully Responsive** design
- 🎪 **Swiper.js** for carousels and sliders
- 🔍 **SEO Optimized** with proper meta tags
- 🎭 **FontAwesome Icons** + **Bootstrap Icons**
- 🎨 **SCSS/Sass** for advanced styling
- 🔄 **React Hot Toast** for notifications
- 📊 **React CountUp** for animated counters
- 📅 **React DatePicker** for date selection
- 🎠 **React Fast Marquee** for scrolling text
- 👀 **Intersection Observer** for scroll animations

## 🛠️ Tech Stack

### **Core**
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Turbopack** - Fast bundler for development

### **Styling & UI**
- **Bootstrap 5.3.8** - CSS framework
- **React Bootstrap 2.10.10** - Bootstrap components for React
- **Sass 1.93.2** - CSS preprocessor
- **Bootstrap Icons 1.13.1** - Icon library

### **Animations & Interactions**
- **GSAP 3.13.0** - Professional animations
- **@gsap/react 2.1.2** - React integration for GSAP
- **Swiper 12.0.2** - Touch slider
- **React Fast Marquee 1.6.5** - Scrolling text effects

### **Icons & Components**
- **FontAwesome 7.0.1** - Icon library
- **React Icons 5.5.0** - Popular icons
- **React CountUp 6.5.3** - Animated counters
- **React DatePicker 8.7.0** - Date selection
- **React Hot Toast 2.6.0** - Toast notifications
- **React Intersection Observer 9.16.0** - Scroll detection

## 📁 Project Structure

```
src/
├── app/
│   └── (site)/                    # Site routes
│       ├── (inner)/               # Inner pages (blog, portfolio, etc.)
│       ├── architectural-agency/  # Architectural agency layout
│       ├── consultant-agency/     # Consultant agency layout
│       ├── digital-agency/        # Digital agency layout (default)
│       ├── financial-advisor/     # Financial advisor layout
│       ├── fitness/               # Fitness center layout
│       ├── healthcare/            # Healthcare layout
│       ├── legal-advisor/         # Legal advisor layout
│       ├── marketing-agency/      # Marketing agency layout
│       ├── showcase/              # Showcase layout
│       └── startup-agency/        # Startup agency layout
├── components/
│   ├── common/                    # Shared components (Header, Footer, etc.)
│   ├── [agency-name]/             # Agency-specific components
│   ├── inner-pages/               # Inner page components
│   └── widgets/                   # Reusable widgets
├── content/                       # Content data files
├── types/                         # TypeScript type definitions
├── hooks/                         # Custom React hooks
│   ├── useGSAPAnimations.tsx      # GSAP animation hook
│   ├── useSticky.ts               # Sticky header hook
│   └── useStickyIntersection.ts   # Intersection observer hook
├── providers/
│   └── AnimationProvider.tsx      # Animation context provider
├── assets/                        # Static assets
└── styles/                        # Global styles
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/hasanmasudnet/unikon-next.git
cd unikon-next
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

### **Build for Production**
```bash
npm run build
npm start
```

## 🎨 Customization

### **Adding New Agency Layout**
1. Create new folder in `src/app/(site)/your-agency/`
2. Add `layout.tsx` and `page.tsx`
3. Create components in `src/components/your-agency/`
4. Add content data in `src/content/your-agency/`
5. Define types in `src/types/your-agency/`

### **Modifying Animations**
- Edit `src/hooks/useGSAPAnimations.tsx` for custom animations
- Use `AnimationProvider` to wrap components needing animations
- Add animation classes to trigger GSAP effects

### **Styling**
- Global styles in `src/assets/css/`
- Component-specific styles using CSS modules or styled-components
- Bootstrap utilities available throughout

## 🔧 Configuration

### **Next.js Config**
- Default redirect to `/digital-agency`
- Turbopack enabled for faster development
- TypeScript strict mode enabled

### **TypeScript**
- Strict type checking enabled
- Path aliases configured (`@/*` → `./src/*`)
- ES2017 target for modern browser support

## 📱 Responsive Design

- **Mobile First** approach
- **Bootstrap 5** responsive grid system
- **Custom breakpoints** for different devices
- **Touch-friendly** interactions
- **Optimized images** with Next.js Image component

## ⚡ Performance Features

- **Next.js App Router** for optimal performance
- **Turbopack** for faster development builds
- **Image optimization** with Next.js Image
- **Code splitting** and lazy loading
- **GSAP animations** optimized for 60fps
- **Intersection Observer** for scroll-based animations

## 🎯 SEO & Accessibility

- **Semantic HTML** structure
- **Meta tags** optimization
- **Alt text** for all images
- **ARIA labels** for accessibility
- **Keyboard navigation** support
- **Screen reader** friendly

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **GSAP** for powerful animations
- **Bootstrap** for responsive design system
- **Vercel** for hosting and deployment platform

## 📞 Support

For support, email [hasanmasudnet@gmail.com](mailto:hasanmasudnet@gmail.com) or create an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and GSAP**
