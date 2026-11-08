"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard3D = dynamic(() => import("@/components/canvas/Dashboard3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] sm:h-[480px] w-full rounded-2xl border border-cyan-glow/20 bg-[#060b13]/80 flex items-center justify-center backdrop-blur-md">
      <div className="flex items-center gap-3 font-mono text-cyan-glow text-xs sm:text-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-ping" />
        <span>INICIALIZANDO MOTOR 3D // TOPOLOGÍA SISCLOUD...</span>
      </div>
    </div>
  ),
});

export default function HolographicDashboardSection() {
  return (
    <section id="dashboard-3d" className="relative py-28 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto overflow-hidden">
      {/* Background Neon Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-cyan-glow/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow font-mono text-xs tracking-wider">
          <Sparkles size={14} />
          <span>SU PLATAFORMA INTEGRAL EN 1 SOLO SISTEMA // 6 MÓDULOS ACTIVOS</span>
        </div>

        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
          Todo lo que su Empresa Recibe en su{" "}
          <span className="bg-gradient-to-r from-cyan-glow via-sky-400 to-emerald-glow bg-clip-text text-transparent">
            Servidor Dedicado
          </span>
        </h2>

        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          El núcleo central representa el <strong>servidor privado de su empresa</strong>. A su alrededor orbitan los <strong>6 módulos empresariales</strong> que gestionan su negocio: ERP central, base de datos propia, CRM de ventas, inventarios, facturación y un asistente con inteligencia artificial que cotiza automáticamente por WhatsApp.
        </p>
      </div>

      {/* 3D Dashboard Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <Dashboard3D />
      </motion.div>

      {/* Bottom CTA & Verification Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/30">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="font-orbitron text-sm font-bold text-white">
              SISTEMA PROBADO PARA ALTA CARGA Y USUARIOS ILIMITADOS
            </div>
            <div className="font-sans text-xs text-slate-400">
              Despliegue certificado en su servidor privado en 3 a 7 días hábiles con soporte continuo.
            </div>
          </div>
        </div>

        <a
          href="#cotizador"
          aria-label="Ir al cotizador interactivo para cotizar la plataforma empresarial"
        >
          <Button variant="primary" size="md" className="gap-2">
            <span>COTIZAR MI PLATAFORMA A MEDIDA</span>
            <ArrowRight size={14} />
          </Button>
        </a>
      </div>
    </section>
  );
}
