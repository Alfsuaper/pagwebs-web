"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Cog,
  Target,
  TrendingUp,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Briefcase,
  Building2,
  Hammer,
} from "lucide-react";
import { SECTORS_DATA, MODULAR_PLATFORM_MODULES, NICHE_OPPORTUNITIES } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function SectorAdaptability() {
  const [activeSectorId, setActiveSectorId] = useState<string>("construccion");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "crm",
    "kardex",
    "obras",
    "documental",
  ]);

  const sector = SECTORS_DATA.find((s) => s.id === activeSectorId) || SECTORS_DATA[0];

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const selectedModuleNames = MODULAR_PLATFORM_MODULES.filter((m) =>
    selectedModules.includes(m.id)
  )
    .map((m) => m.name)
    .join(", ");

  const waModularText = `Hola SisCloud Technology, deseo cotizar una plataforma modular con los siguientes módulos seleccionados: ${selectedModuleNames}.`;

  return (
    <section id="adaptabilidad" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto space-y-20">
      {/* Main Section Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow font-mono text-xs tracking-wider">
          <Sparkles size={14} />
          <span>CAPACIDAD MULTISECTORIAL // 10 SECTORES INDUSTRIALES Y COMERCIALES</span>
        </div>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
          ¿Qué Puede Construir y Gestionar con{" "}
          <span className="bg-gradient-to-r from-cyan-glow via-sky-400 to-emerald-glow bg-clip-text text-transparent">
            SisCloud Enterprise
          </span>
          ?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          Cada tipo de negocio tiene operaciones y procesos únicos. Seleccione su sector a continuación para ver exactamente los flujos de trabajo, herramientas y módulos listos para desplegar en su servidor privado sin costo por usuario:
        </p>
      </div>

      {/* 10-Sector Visual Grid (All 10 sectors clearly visible at a glance without horizontal scroll) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span className="flex items-center gap-1.5 text-cyan-glow">
            <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
            HAGA CLIC EN SU SECTOR PARA VER TODO LO QUE PUEDE CONSTRUIR:
          </span>
          <span className="hidden sm:inline text-slate-500">10 SECTORES DISPONIBLES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SECTORS_DATA.map((s) => {
            const isActive = activeSectorId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSectorId(s.id)}
                className={`group relative p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isActive
                    ? "bg-cyan-glow/20 border-cyan-glow text-white shadow-[0_0_25px_rgba(0,240,255,0.35)] ring-2 ring-cyan-glow scale-[1.02]"
                    : "bg-surface/85 border-white/10 text-slate-300 hover:text-white hover:border-cyan-glow/50 hover:bg-surface/95 hover:shadow-lg"
                }`}
              >
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl p-2 rounded-lg bg-white/[0.05] border border-white/10 group-hover:border-cyan-glow/30 transition-colors">
                    {s.icon}
                  </span>
                  {s.highlightBadge ? (
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full border text-right truncate max-w-[110px] ${
                        isActive
                          ? "bg-cyan-glow text-black border-cyan-glow font-bold"
                          : "bg-emerald-glow/15 text-emerald-glow border-emerald-glow/30"
                      }`}
                    >
                      {s.highlightBadge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">
                      {isActive ? "● ACTIVO" : "VER MÁS"}
                    </span>
                  )}
                </div>

                {/* Bottom Row: Title + Hint */}
                <div>
                  <div className="font-orbitron text-xs sm:text-sm font-bold leading-tight group-hover:text-cyan-glow transition-colors">
                    {s.title.split("&")[0].trim()}
                  </div>
                  <div className="text-[11px] font-sans text-slate-400 mt-1 line-clamp-1">
                    {s.subsectors
                      ? s.subsectors.map((sub) => sub.name.split(" ")[0]).slice(0, 3).join(", ")
                      : "Ver módulos"}
                  </div>
                </div>

                {/* Active arrow indicator pointing to content below */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-cyan-glow" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Sector Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sector.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-surface-card border border-cyan-glow/35 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-10 relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-glow to-transparent" />

          {/* Sector Top Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase">
                  {sector.code}
                </span>
                {sector.highlightBadge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-glow/15 text-cyan-glow border border-cyan-glow/30">
                    ★ {sector.highlightBadge}
                  </span>
                )}
              </div>
              <h3 className="font-orbitron text-xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">{sector.icon}</span>
                <span>{sector.title}</span>
              </h3>
            </div>
            <a
              href={`https://wa.me/573006628344?text=${encodeURIComponent(sector.waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button size="md" variant="primary" className="gap-2 text-xs">
                <MessageSquare size={14} />
                <span>COTIZAR ESTE SECTOR EN WHATSAPP</span>
              </Button>
            </a>
          </div>

          {/* Subsectors Breakdown: What can be built in each specific sub-business */}
          {sector.subsectors && sector.subsectors.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-cyan-glow" />
                <h4 className="font-orbitron text-sm sm:text-base font-bold text-white tracking-wide">
                  TIPOS DE NEGOCIO Y CAPACIDADES ESPECÍFICAS QUE SE CONSTRUYEN EN ESTE SECTOR:
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sector.subsectors.map((sub, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-surface/70 hover:border-cyan-glow/50 p-5 space-y-3 transition-all hover:bg-surface/90 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)] group"
                  >
                    <div className="flex items-center gap-2 font-orbitron text-xs sm:text-sm font-bold text-cyan-glow group-hover:text-white transition-colors">
                      <div className="w-2 h-2 rounded-full bg-cyan-glow" />
                      <span>{sub.name}</span>
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {sub.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-300 font-sans leading-relaxed"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-emerald-glow flex-shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4-Quadrant Grid: Operational details & ROI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            {/* Quadrant 1: Procesos */}
            <div className="bg-surface/70 border border-white/10 border-l-4 border-l-cyan-glow rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-cyan-glow">
                <Cog size={18} />
                <h4 className="font-orbitron text-sm font-bold text-white tracking-wide">
                  PROCESOS QUE ADMINISTRA EL SISTEMA
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc pl-5 leading-relaxed">
                {sector.procesos.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Quadrant 2: Casos de Uso */}
            <div className="bg-surface/70 border border-white/10 border-l-4 border-l-emerald-glow rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-glow">
                <Target size={18} />
                <h4 className="font-orbitron text-sm font-bold text-white tracking-wide">
                  PERFIL DE EMPRESAS QUE LO UTILIZAN
                </h4>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {sector.casos}
              </p>
            </div>

            {/* Quadrant 3: Beneficios */}
            <div className="bg-surface/70 border border-white/10 border-l-4 border-l-amber-glow rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-glow">
                <TrendingUp size={18} />
                <h4 className="font-orbitron text-sm font-bold text-white tracking-wide">
                  BENEFICIOS ECONÓMICOS CUANTIFICADOS
                </h4>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {sector.beneficios}
              </p>
            </div>

            {/* Quadrant 4: Módulos Recomendados */}
            <div className="bg-surface/70 border border-white/10 border-l-4 border-l-purple-glow rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-purple-glow">
                <Layers size={18} />
                <h4 className="font-orbitron text-sm font-bold text-white tracking-wide">
                  MÓDULOS SISCLOUD RECOMENDADOS
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {sector.modulos.map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-block font-mono text-xs text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/30 px-3 py-1 rounded-md"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* MODULAR PLATFORM MODEL SECTION */}
      <div className="rounded-3xl border border-cyan-glow/30 bg-gradient-to-b from-[#060b13] via-[#09111e] to-[#060b13] p-6 sm:p-12 space-y-10 shadow-2xl relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow font-mono text-xs">
            <Zap size={14} />
            <span>MODELO MODULAR ESCALABLE // PAGUE SOLO POR LO QUE NECESITA</span>
          </div>
          <h3 className="font-orbitron text-2xl sm:text-4xl font-extrabold text-white">
            Arme su Solución con los 10 Módulos de SisCloud Enterprise
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Su empresa puede iniciar adquiriendo únicamente los módulos que requiere hoy (por ejemplo CRM + Inventarios o Control de Obras). Más adelante puede activar más funciones <strong>sin cambiar de sistema, sin migrar bases de datos y manteniendo siempre $0 cobro por usuario adicional</strong>.
          </p>
        </div>

        {/* 10 Modules Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {MODULAR_PLATFORM_MODULES.map((mod) => {
            const isChecked = selectedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isChecked
                    ? "border-cyan-glow bg-cyan-glow/15 shadow-[0_0_20px_rgba(0,240,255,0.25)] ring-1 ring-cyan-glow"
                    : "border-white/10 bg-surface/80 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{mod.icon}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isChecked
                          ? "bg-cyan-glow text-black border-cyan-glow font-bold"
                          : "bg-white/5 text-slate-400 border-white/10"
                      }`}
                    >
                      {isChecked ? "SELECCIONADO" : mod.badge}
                    </span>
                  </div>
                  <h4 className="font-orbitron text-xs sm:text-sm font-bold text-white">
                    {mod.name}
                  </h4>
                  <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  {mod.features.slice(0, 2).map((feat, i) => (
                    <div
                      key={i}
                      className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 truncate"
                    >
                      <span className="text-emerald-glow">✓</span>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Selection Action Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-cyan-glow/40 bg-surface/90 backdrop-blur-md">
          <div className="space-y-1 text-center lg:text-left">
            <div className="font-orbitron text-sm font-bold text-white flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-pulse" />
              <span>
                {selectedModules.length} de 10 MÓDULOS SELECCIONADOS
              </span>
            </div>
            <div className="font-sans text-xs text-slate-300 max-w-xl">
              {selectedModules.length > 0
                ? selectedModuleNames
                : "Haga clic en los módulos superiores para armar su paquete empresarial a medida."}
            </div>
          </div>

          <a
            href={`https://wa.me/573006628344?text=${encodeURIComponent(waModularText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button size="lg" variant="primary" className="gap-2">
              <span>COTIZAR ESTA COMBINACIÓN EN WHATSAPP</span>
              <ArrowRight size={16} />
            </Button>
          </a>
        </div>
      </div>

      {/* TOP COMMERCIAL NICHES & HIGH ROI SHOWCASE */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs text-amber-glow uppercase tracking-wider block">
            ESTRATEGIA B2B // NICHOS DE RÁPIDO DESPLIEGUE Y ALTA RENTABILIDAD
          </span>
          <h3 className="font-orbitron text-xl sm:text-3xl font-extrabold text-white">
            Sectores con Mayor Demanda y Retorno de Inversión (ROI)
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Si su objetivo es implementar rápidamente y ver ahorros tangibles de inmediato, estos son los nichos empresariales con mayor impacto:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NICHE_OPPORTUNITIES.map((niche, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-surface/70 p-5 space-y-3 hover:border-amber-glow/40 transition-all hover:bg-surface/90"
            >
              <div className="flex items-center justify-between">
                <span className="font-orbitron text-xs sm:text-sm font-bold text-white">
                  {niche.niche}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/30 px-2.5 py-0.5 rounded-full">
                  {niche.roi}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {niche.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
