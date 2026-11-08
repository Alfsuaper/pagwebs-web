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

          {/* Direct Line */}
          <div className="space-y-3">
            <span className="block font-orbitron text-xs font-bold text-white tracking-widest uppercase">
              CANAL DE INGENIERÍA
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
