"use client";

import { useState } from "react";
import { Printer, MessageSquare, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOLUTIONS = [
  {
    key: "siscloud",
    name: "SisCloud Enterprise",
    sub: "Servidor Dedicado (3-7 días)",
    engine: "SisCloud Enterprise Core",
    delivery: "3 A 7 DÍAS HÁBILES",
  },
  {
    key: "software",
    name: "Software Web a Medida",
    sub: "Clean Architecture (1-2 semanas)",
    engine: "Clean Architecture | Node / Python / Laravel",
    delivery: "1 A 2 SEMANAS (7-15 DÍAS)",
  },
  {
    key: "app",
    name: "App Móvil iOS / Android",
    sub: "Flutter / React (1 sem a 15 días)",
    engine: "Flutter / React Native Nativa",
    delivery: "1 SEMANA A 15 DÍAS",
  },
  {
    key: "web",
    name: "Página Web Corporativa",
    sub: "AAA Core Web Vitals (1-3 días)",
    engine: "HTML5 Semántico | Core Web Vitals 95+",
    delivery: "1 A 3 DÍAS HÁBILES",
  },
  {
    key: "ia",
    name: "Agentes de IA & RPA",
    sub: "WhatsApp & RAG (3-7 días)",
    engine: "WhatsApp Cloud API | RAG Privado | RPA",
    delivery: "3 A 7 DÍAS HÁBILES",
  },
];

const USER_OPTIONS = [
  { key: "pyme", name: "1 a 25 Usuarios", sub: "Pyme / Operación Ágil", label: "1 a 25 Usuarios ($0 COP por Asiento)" },
  { key: "mid", name: "26 a 50 Usuarios", sub: "Mediana Empresa", label: "26 a 50 Usuarios ($0 COP por Asiento)" },
  { key: "corp", name: "51 a 100 Usuarios", sub: "Corporativo Multisede", label: "51 a 100 Usuarios ($0 COP por Asiento)" },
  { key: "enterprise", name: "+100 Usuarios", sub: "Ilimitados ($0 Sobrecosto)", label: "+100 Usuarios Ilimitados ($0 COP por Asiento)" },
];

const ALL_MODULES = [
  "CRM & Ventas",
  "Inventarios (Kardex)",
  "Gestión Documental",
  "Help Desk & Tickets",
  "Recursos Humanos",
  "Contratos & Pólizas",
  "Proyectos Gantt",
  "Control de Obras",
  "Activos & Maquinaria",
  "PQRS Normativo",
  "IA en WhatsApp",
];

const INFRA_OPTIONS = [
  { key: "cloud", name: "Servidor Dedicado Cloud", sub: "Zero Multitenancy (Recomendado)", label: "Servidor Dedicado Cloud Soberano" },
  { key: "metal", name: "Bare-Metal Alto Desempeño", sub: "Hardware Físico Exclusivo", label: "Bare-Metal Alto Desempeño Físico" },
  { key: "onprem", name: "On-Premise Privado", sub: "Data Center del Cliente", label: "Infraestructura On-Premise del Cliente" },
];

export default function QuoteFunnel() {
  const [selectedSolKey, setSelectedSolKey] = useState("siscloud");
  const [selectedUserKey, setSelectedUserKey] = useState("pyme");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "CRM & Ventas",
    "Inventarios (Kardex)",
    "Gestión Documental",
    "Help Desk & Tickets",
    "IA en WhatsApp",
  ]);
  const [selectedInfraKey, setSelectedInfraKey] = useState("cloud");
  const [proposalCode] = useState(() => `PROP-${Math.floor(1000 + Math.random() * 9000)}`);

  const currentSol = SOLUTIONS.find((s) => s.key === selectedSolKey) || SOLUTIONS[0];
  const currentUser = USER_OPTIONS.find((u) => u.key === selectedUserKey) || USER_OPTIONS[0];
  const currentInfra = INFRA_OPTIONS.find((i) => i.key === selectedInfraKey) || INFRA_OPTIONS[0];

  const toggleModule = (modName: string) => {
    setSelectedModules((prev) =>
      prev.includes(modName) ? prev.filter((m) => m !== modName) : [...prev, modName]
    );
  };

  const waMessage = `¡Hola SisCloud Technology! He generado la propuesta táctica *${proposalCode}* en su cotizador online:
• *Solución:* ${currentSol.name}
• *Plazo de Entrega:* ${currentSol.delivery}
• *Capacidad:* ${currentUser.label}
• *Infraestructura:* ${currentInfra.label}
• *Módulos:* ${selectedModules.join(", ")}

Deseo formalizar y recibir cotización para mi empresa.`;

  return (
    <section id="cotizador" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
          HERRAMIENTA TÁCTICA // ESTIMACIÓN EN TIEMPO REAL
        </span>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Configurador de Arquitectura &amp; Propuesta Instantánea
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Configure las especificaciones técnicas de su proyecto. Nuestro motor generará una propuesta ejecutiva formal con plazo de entrega récord garantizado y enlace directo a WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4-Step Configurator */}
        <div className="lg:col-span-7 bg-surface-card border border-cyan-glow/30 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-8">
          {/* Step 1 */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              PASO 01 // SELECCIÓN DE SOLUCIÓN TECNOLÓGICA
            </span>
            <h3 className="font-orbitron text-base font-bold text-white">
              ¿Qué tipo de solución requiere su empresa?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOLUTIONS.map((sol) => (
                <button
                  key={sol.key}
                  onClick={() => setSelectedSolKey(sol.key)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSolKey === sol.key
                      ? "bg-cyan-glow/15 border-cyan-glow text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                      : "bg-surface/80 border-white/10 text-slate-300 hover:border-white/25"
                  }`}
                >
                  <div className="font-orbitron text-xs font-bold">{sol.name}</div>
                  <div className="font-mono text-[11px] text-cyan-glow mt-1">{sol.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              PASO 02 // DIMENSIÓN OPERACIONAL
            </span>
            <h3 className="font-orbitron text-base font-bold text-white">
              ¿Cuántos usuarios o colaboradores interactuarán con el sistema?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {USER_OPTIONS.map((u) => (
                <button
                  key={u.key}
                  onClick={() => setSelectedUserKey(u.key)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedUserKey === u.key
                      ? "bg-cyan-glow/15 border-cyan-glow text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                      : "bg-surface/80 border-white/10 text-slate-300 hover:border-white/25"
                  }`}
                >
                  <div className="font-orbitron text-xs font-bold">{u.name}</div>
                  <div className="font-mono text-[11px] text-emerald-glow mt-1">{u.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              PASO 03 // CAPACIDADES MODULARES
            </span>
            <h3 className="font-orbitron text-base font-bold text-white">
              Seleccione los módulos o componentes requeridos:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ALL_MODULES.map((modName) => {
                const isSelected = selectedModules.includes(modName);
                return (
                  <button
                    key={modName}
                    onClick={() => toggleModule(modName)}
                    className={`p-3 rounded-lg border text-xs text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-glow/10 border-cyan-glow text-cyan-glow"
                        : "bg-surface/60 border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span>{modName}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold border ${
                        isSelected
                          ? "bg-cyan-glow text-black border-cyan-glow"
                          : "border-white/20 text-transparent"
                      }`}
                    >
                      <Check size={12} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              PASO 04 // MODELO DE HOSPEDAJE &amp; SOBERANÍA
            </span>
            <h3 className="font-orbitron text-base font-bold text-white">
              Seleccione la infraestructura de alojamiento:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INFRA_OPTIONS.map((inf) => (
                <button
                  key={inf.key}
                  onClick={() => setSelectedInfraKey(inf.key)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedInfraKey === inf.key
                      ? "bg-cyan-glow/15 border-cyan-glow text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                      : "bg-surface/80 border-white/10 text-slate-300 hover:border-white/25"
                  }`}
                >
                  <div className="font-orbitron text-xs font-bold">{inf.name}</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-1">{inf.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live HUD Proposal Board */}
        <div className="lg:col-span-5 sticky top-28 bg-background/95 border border-cyan-glow rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.25),0_20px_70px_rgba(0,0,0,0.9)] space-y-6">
          <div className="border-b border-dashed border-cyan-glow/40 pb-4">
            <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block mb-1">
              SYS://QUOTE: {proposalCode} // SISCLOUD
            </span>
            <h3 className="font-orbitron text-xl font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-glow" />
              <span>PROPUESTA TÉCNICA FORMAL</span>
            </h3>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm divide-y divide-white/5">
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-400">SOLUCIÓN BASE:</span>
              <span className="font-orbitron font-bold text-cyan-glow text-right">
                {currentSol.name}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-400">MOTOR TÉCNICO:</span>
              <span className="font-mono text-xs text-slate-200 text-right">
                {currentSol.engine}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-400">TIEMPO DE ENTREGA:</span>
              <span className="font-orbitron font-bold text-emerald-glow text-right">
                {currentSol.delivery}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-400">ESCALA USUARIOS:</span>
              <span className="font-orbitron font-bold text-slate-200 text-right">
                {currentUser.label}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-400">INFRAESTRUCTURA:</span>
              <span className="font-mono text-xs text-slate-200 text-right">
                {currentInfra.label}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-slate-400">SOBERANÍA DE DATOS:</span>
              <span className="font-mono font-bold text-amber-glow text-right">
                100% Base SQL Privada
              </span>
            </div>

            <div className="pt-3 space-y-2">
              <span className="font-mono text-slate-400 block text-xs">
                MÓDULOS INCLUIDOS ({selectedModules.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedModules.map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[10.5px] text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/30 px-2 py-0.5 rounded"
                  >
                    {m}
                  </span>
                ))}
                {selectedModules.length === 0 && (
                  <span className="text-slate-500 text-xs italic">Ningún módulo seleccionado</span>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={`https://wa.me/573006628344?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button size="lg" variant="secondary" className="w-full gap-2">
                <MessageSquare size={16} />
                <span>SOLICITAR EN WHATSAPP</span>
              </Button>
            </a>

            <button
              onClick={() => window.print()}
              className="w-full py-3 rounded-lg border border-cyan-glow/35 bg-surface/80 hover:bg-cyan-glow/10 text-cyan-glow font-orbitron text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer size={15} />
              <span>IMPRIMIR / DESCARGAR PDF TÉCNICO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
