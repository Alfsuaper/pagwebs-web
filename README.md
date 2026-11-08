# SISCLOUD TECHNOLOGY — ENTERPRISE FRONTEND (NEXT.JS 15 + THREE.JS + TAILWIND)

Arquitectura frontend moderna de nivel AAA para **SISCLOUD TECHNOLOGY**, inspirada en los estándares de Star Citizen / Sci-Fi HUD militar.

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **3D Canvas:** [Three.js](https://threejs.org/) (Cyber particle grid & starfield)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Tipografías:** Orbitron, JetBrains Mono, Inter

---

## 📁 Estructura del Proyecto

```
siscloud-frontend/
├── src/
│   ├── app/
│   │   ├── globals.css           # Directivas Tailwind, glassmorphism, scrollbars HUD
│   │   ├── layout.tsx            # RootLayout con Lenis, Three.js, JSON-LD Schema
│   │   ├── page.tsx              # Landing Page con las 10 secciones integradas
│   │   ├── robots.ts             # Directivas de indexación SEO
│   │   └── sitemap.ts            # Mapa del sitio dinámico
│   ├── components/
│   │   ├── ai/
│   │   │   └── ChatbotWidget.tsx # ATLAS-01 AI Chatbot flotante con chips y WhatsApp
│   │   ├── canvas/
│   │   │   └── CyberBackground.tsx # Canvas 3D Three.js responsivo
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # HUD Navbar indestructible fija con drawer móvil
│   │   │   └── Footer.tsx        # Footer táctico con telemetría operativa
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.tsx # Integración fluida con Lenis
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx   # Hero H1, telemetría y dual CTAs
│   │   │   ├── AboutSection.tsx  # Manifiesto y 3 pilares soberanos
│   │   │   ├── ServicesCatalog.tsx # 16 servicios con filtros y modal HUD
│   │   │   ├── RoadmapSection.tsx # Roadmap de 4 etapas (1 a 15 días)
│   │   │   ├── EnterpriseArchitecture.tsx # SisCloud Enterprise core y ROI
│   │   │   ├── SectorAdaptability.tsx # 10 sectores y 11 módulos
│   │   │   ├── QuoteFunnel.tsx   # Cotizador en 4 pasos y tablero de propuestas
│   │   │   ├── CaseStudiesSection.tsx # Casos antes vs después
│   │   │   ├── FaqSection.tsx    # Acordeón de 8 preguntas consultivas
│   │   │   └── ContactSection.tsx # Formulario B2B progresivo con WhatsApp
│   │   └── ui/
│   │       ├── badge.tsx         # Chips de estado con borde neón
│   │       ├── button.tsx        # Botones primarios, secundarios y outline
│   │       └── modal.tsx         # Modal animado con soporte ESC y backdrop
│   ├── lib/
│   │   ├── data.ts               # Dataset maestro de 16 servicios, 10 sectores, FAQ
│   │   └── utils.ts              # Utilidad `cn` (clsx + tailwind-merge)
│   └── types/
│       └── index.ts              # Definiciones e interfaces de TypeScript
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Comandos de Ejecución

```bash
# Desarrollo local
pnpm run dev

# Compilación para producción
pnpm run build

# Iniciar servidor de producción
pnpm run start
```

---

## 🛡️ Principios Comerciales y de Negocio

- **Métricas de Entrega:**
  - Páginas Web: **1 a 3 Días**
  - Software a la Medida: **1 a 2 Semanas**
  - Aplicaciones Móviles: **1 Semana a 15 Días**
  - SisCloud Enterprise: **3 a 7 Días**
- **Soberanía Absoluta:** Base de datos SQL dedicada, código fuente Git 100% propio y cero dependencia de terceros.
- **Modelo Anti-SaaS:** SisCloud Enterprise en arriendo dedicado con **usuarios ilimitados sin sobrecostos ($0 por asiento)**.
- **WhatsApp Oficial:** [+57 300 662 8344](https://wa.me/573006628344).
