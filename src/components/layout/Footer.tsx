import Link from "next/link";
import Image from "next/image";
import { MessageSquare, ShieldCheck, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/95 backdrop-blur-md pt-16 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 text-slate-400 text-sm">
      <div className="max-w-[1920px] mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-[36px] w-[105px]">
                <Image
                  src="/pagwebs_logo_white.png"
                  alt="PagWebs Logo Blanco"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-orbitron font-extrabold text-white text-lg tracking-wider">
                SISCLOUD<span className="text-cyan-glow">.AI</span>
              </span>
              <span className="font-mono text-xs text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/30 px-2 py-0.5 rounded">
                ENTERPRISE
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Ingeniería de software a la medida, plataformas web de alto impacto e infraestructura soberana SisCloud Enterprise. Despliegues en tiempo récord con $0 costo por usuario adicional.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-glow">
              <Terminal size={14} />
              <span>COLOMBIA (BOGOTÁ, MEDELLÍN, CALI) • COBERTURA GLOBAL</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <span className="block font-orbitron text-xs font-bold text-white tracking-widest uppercase">
              NAVEGACIÓN TÁCTICA
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="#servicios" className="hover:text-cyan-glow transition-colors">
                  &gt; Catálogo 16 Servicios
                </Link>
              </li>
              <li>
                <Link href="#plataforma" className="hover:text-cyan-glow transition-colors">
                  &gt; SisCloud Enterprise
                </Link>
              </li>
              <li>
                <Link href="#adaptabilidad" className="hover:text-cyan-glow transition-colors">
                  &gt; Adaptabilidad 10 Sectores
                </Link>
              </li>
              <li>
                <Link href="#cotizador" className="hover:text-cyan-glow transition-colors">
                  &gt; Cotizador Instantáneo
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-cyan-glow transition-colors">
                  &gt; Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Line & Social Networks */}
          <div className="space-y-3">
            <span className="block font-orbitron text-xs font-bold text-white tracking-widest uppercase">
              CANAL DE INGENIERÍA & REDES
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Atención directa sin intermediarios comerciales:
            </p>
            <a
              href="https://wa.me/573006628344?text=Hola%20SisCloud%20Technology,%20deseo%20evaluar%20un%20proyecto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-glow hover:underline text-sm font-mono font-bold"
            >
              <MessageSquare size={16} />
              <span>+57 300 662 8344</span>
            </a>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=100086534530050"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1877F2]/15 hover:bg-[#1877F2] border border-[#1877F2]/40 text-[#1877F2] hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
                title="Síguenos en Facebook (PagWebs)"
                aria-label="Facebook PagWebs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/pagwebs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#E4405F]/15 hover:bg-[#E4405F] border border-[#E4405F]/40 text-[#E4405F] hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
                title="Síguenos en Instagram (@pagwebs)"
                aria-label="Instagram PagWebs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://wa.me/573006628344?text=Hola%20SisCloud%20Technology,%20deseo%20evaluar%20un%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366] border border-[#25D366]/40 text-[#25D366] hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110"
                title="Escríbenos a WhatsApp (+57 300 662 8344)"
                aria-label="WhatsApp PagWebs"
              >
                <MessageSquare size={16} />
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <ShieldCheck size={14} className="text-cyan-glow" />
              <span>TRATAMIENTO HABEAS DATA GARANTIZADO</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; 2026 <strong>SISCLOUD TECHNOLOGY</strong>. Todos los derechos reservados.
          </div>
          <div className="text-cyan-glow flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-glow animate-pulse"></span>
            <span>SYS://CORE: SISCLOUD ENTERPRISE • STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
