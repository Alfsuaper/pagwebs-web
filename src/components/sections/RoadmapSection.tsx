"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const STAGES = [
  {
    num: "01",
    time: "24 HORAS",
    title: "DIAGNÓSTICO TÉCNICO",
    desc: "Levantamiento de requerimientos, auditoría de sistemas legados y propuesta de arquitectura cerrada.",
  },
  {
    num: "02",
    time: "3 A 5 DÍAS",
    title: "ARQUITECTURA & BASE",
    desc: "Aprovisionamiento de servidor dedicado, configuración de bases de datos y despliegue del núcleo modular.",
  },
  {
    num: "03",
    time: "7 A 10 DÍAS",
    title: "INTEGRACIÓN & IA",
    desc: "Desarrollo de módulos específicos, entrenamiento de agentes y parametrización de flujos de trabajo.",
  },
  {
    num: "04",
    time: "15 DÍAS",
    title: "SALIDA A PRODUCCIÓN",
    desc: "Migración de datos, pruebas de estrés de alta concurrencia, capacitación y pase a producción en vivo.",
  },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
          DESPLIEGUE ACELERADO // METODOLOGÍA ÁGIL
        </span>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Roadmap de Transformación Digital
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          De la concepción a la producción real en 1 a 15 días certificados. Sin burocracia ni dilaciones innecesarias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STAGES.map((stage, idx) => (
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-card border border-white/10 hover:border-cyan-glow/40 rounded-xl p-6 relative overflow-hidden group transition-all"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between mb-4">
              <span className="font-orbitron font-extrabold text-2xl text-cyan-glow/40 group-hover:text-cyan-glow transition-colors">
                {stage.num}
              </span>
              <span className="font-mono text-xs text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/30 px-2 py-0.5 rounded font-bold">
                {stage.time}
              </span>
            </div>

            <h3 className="font-orbitron text-sm font-bold text-white mb-2 tracking-wide">
              {stage.title}
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              {stage.desc}
            </p>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-glow">
              <CheckCircle2 size={13} />
              <span>HITO GARANTIZADO</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
