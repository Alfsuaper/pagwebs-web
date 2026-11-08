"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, Unlock, Database, Rocket, ShieldCheck, Zap } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

interface StoryAct {
  actNumber: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Lock;
  metric: string;
  metricLabel: string;
  color: "cyan" | "emerald" | "amber" | "purple";
  badge: string;
}

const STORY_ACTS: StoryAct[] = [
  {
    actNumber: "ACTO 01",
    title: "La Trampa del SaaS Multitenant",
    subtitle: "El peaje mensual que castiga el crecimiento",
    description:
      "Las empresas medianas y grandes son obligadas a pagar tarifas crecientes de $180.000 a $650.000 COP por cada usuario al mes. Los datos residen en nubes compartidas sin acceso directo a SQL ni propiedad real del código fuente.",
    icon: Lock,
    metric: "+$250 Millones COP",
    metricLabel: "Gasto anual promedio en licencias por asiento en Colombia",
    color: "amber",
    badge: "PROBLEMA COMÚN DEL MERCADO",
  },
  {
    actNumber: "ACTO 02",
    title: "La Ruptura de la Soberanía",
    subtitle: "Aislamiento físico y propiedad absoluta de los datos",
    description:
      "Implementamos su propia infraestructura en servidores dedicados privados. Cero multi-inquilino. Acceso irrestricto a su base de datos PostgreSQL/MySQL con encriptación militar y políticas de contingencia automáticas.",
    icon: Unlock,
    metric: "100% SOBERANO",
    metricLabel: "Aislamiento físico y base de datos privada",
    color: "cyan",
    badge: "ARQUITECTURA DEDICADA",
  },
  {
    actNumber: "ACTO 03",
    title: "El Motor SisCloud Enterprise",
    subtitle: "SisCloud Enterprise Core como base de alta elasticidad",
    description:
      "Moldeamos los 11 módulos (CRM, Kardex, Gestión Documental, RRHH, Obras, Contratos, PQRS) como un traje a la medida exacta de su negocio, eliminando procesos redundantes e integrando APIs en tiempo real.",
    icon: Database,
    metric: "11 MÓDULOS",
    metricLabel: "Flexibilidad sin alterar el código fuente base",
    color: "emerald",
    badge: "MOTOR EMPRESARIAL",
  },
  {
    actNumber: "ACTO 04",
    title: "La Entrega Récord Garantizada",
    subtitle: "De la concepción a producción en tiempo récord",
    description:
      "Desplegamos SisCloud Enterprise en 3 a 7 días hábiles, software a medida en 1 a 2 semanas y aplicaciones móviles en 1 semana a 15 días, con soporte de ingeniería B2B en Colombia.",
    icon: Rocket,
    metric: "3 A 7 DÍAS",
    metricLabel: "Puesta en marcha productiva garantizada",
    color: "purple",
    badge: "MÉTRICA CERTIFICADA",
  },
];

export default function ScrollStorytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="storytelling"
      className="relative py-28 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto overflow-hidden"
    >
      {/* Background Volumetric Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-glow/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow font-mono text-xs tracking-wider">
          <Zap size={14} />
          <span>SCROLL STORYTELLING // EL VIAJE DE LA SOBERANÍA</span>
        </div>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          De la Dependencia del Licenciamiento a la{" "}
          <span className="text-cyan-glow">Autonomía Digital Total</span>
        </h2>
        <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed">
          Descubra por qué los líderes tecnológicos están sustituyendo el modelo SaaS tradicional por servidores dedicados con $0 cobro por usuario adicional.
        </p>
      </div>

      {/* Storyline Timeline */}
      <div className="relative">
        {/* Central Laser Timeline Bar */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/10">
          <motion.div
            style={{ height: progressHeight }}
            className="w-full bg-gradient-to-b from-cyan-glow via-emerald-glow to-purple-glow shadow-[0_0_12px_#00f0ff]"
          />
        </div>

        {/* Story Acts */}
        <div className="space-y-16 lg:space-y-24">
          {STORY_ACTS.map((act, index) => {
            const isEven = index % 2 === 0;
            const Icon = act.icon;

            return (
              <div
                key={act.actNumber}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Center Timeline Node Indicator */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20 h-10 w-10 items-center justify-center rounded-full border border-cyan-glow bg-[#060b13] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <div className="h-3 w-3 rounded-full bg-cyan-glow animate-pulse" />
                </div>

                {/* Content Side (Tilt Card) */}
                <div className="w-full lg:w-1/2">
                  <TiltCard
                    maxTilt={8}
                    glowColor={
                      act.color === "cyan"
                        ? "rgba(0,240,255,0.2)"
                        : act.color === "emerald"
                        ? "rgba(16,185,129,0.2)"
                        : act.color === "amber"
                        ? "rgba(245,158,11,0.2)"
                        : "rgba(168,85,247,0.2)"
                    }
                    className="glass-panel p-6 sm:p-8 border-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs tracking-widest text-cyan-glow">
                        {act.actNumber}
                      </span>
                      <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-[10px] text-slate-300">
                        {act.badge}
                      </span>
                    </div>

                    <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-1">
                      {act.title}
                    </h3>
                    <div className="font-mono text-xs text-slate-400 mb-4">
                      {act.subtitle}
                    </div>

                    <p className="font-sans text-sm text-slate-300 leading-relaxed mb-6">
                      {act.description}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-cyan-glow">
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="font-orbitron text-lg font-extrabold text-white">
                          {act.metric}
                        </div>
                        <div className="font-sans text-xs text-slate-400">
                          {act.metricLabel}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>

                {/* Visual / Metric Accent Side */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="relative w-full max-w-md p-6 rounded-2xl border border-white/5 bg-[#080d18]/70 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-slate-400">ESTADO DEL PROTOCOLO</span>
                      <span className="font-mono text-xs text-emerald-glow flex items-center gap-1.5">
                        <ShieldCheck size={14} />
                        VERIFICADO
                      </span>
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between py-1.5 border-b border-white/5 text-slate-400">
                        <span>INFRAESTRUCTURA:</span>
                        <span className="text-white font-semibold">SERVIDOR DEDICADO PRIVADO</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-white/5 text-slate-400">
                        <span>BASE DE DATOS:</span>
                        <span className="text-cyan-glow font-semibold">SQL SOBERANA (PROPIEDAD TOTAL)</span>
                      </div>
                      <div className="flex justify-between py-1.5 text-slate-400">
                        <span>MODELO ECONÓMICO:</span>
                        <span className="text-amber-glow font-semibold">USUARIOS ILIMITADOS ($0 ADICIONAL)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
