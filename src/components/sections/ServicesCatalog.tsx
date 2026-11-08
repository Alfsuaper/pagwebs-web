"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, ArrowUpRight, MessageSquare } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { ServiceItem, ServiceCluster } from "@/types";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

const CLUSTERS: { key: ServiceCluster; label: string }[] = [
  { key: "all", label: "TODOS (16)" },
  { key: "siscloud", label: "PLATAFORMA SISCLOUD" },
  { key: "crm", label: "CLIENTES & SOPORTE" },
  { key: "ai", label: "INTELIGENCIA ARTIFICIAL" },
  { key: "software", label: "INGENIERÍA DE SOFTWARE" },
];

export default function ServicesCatalog() {
  const [activeCluster, setActiveCluster] = useState<ServiceCluster>("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices =
    activeCluster === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.cluster === activeCluster);

  return (
    <section id="servicios" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
          CATÁLOGO TÉCNICO // 16 CAPACIDADES ACTIVAS DE PRODUCCIÓN
        </span>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Ecosistema Tecnológico de Alto Impacto
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Seleccione una especialidad para explorar especificaciones técnicas, arquitectura de software y tiempos de entrega récord garantizados.
        </p>
      </div>

      {/* Cluster Navigation Filter */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-14">
        {CLUSTERS.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCluster(c.key)}
            className={`font-orbitron text-xs font-bold tracking-wider px-4 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
              activeCluster === c.key
                ? "bg-cyan-glow/20 border-cyan-glow text-cyan-glow shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                : "bg-surface/80 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredServices.map((service) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="group bg-surface-card border border-white/10 hover:border-cyan-glow/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,255,0.1)]"
            >
              <div className="space-y-4">
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-cyan-glow font-bold tracking-wider">
                    {service.clusterLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/30 px-2 py-0.5 rounded text-[10px] font-bold">
                    <Clock size={11} />
                    {service.timeBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-orbitron text-base font-bold text-white group-hover:text-cyan-glow transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables snippet */}
                <ul className="space-y-1.5 pt-2 border-t border-white/5">
                  {service.deliverables.slice(0, 2).map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 size={13} className="text-cyan-glow flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="pt-6 flex items-center justify-between gap-2 border-t border-white/5 mt-6">
                <button
                  onClick={() => setSelectedService(service)}
                  className="font-orbitron text-xs font-bold text-cyan-glow hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>+ FICHA TÉCNICA</span>
                  <ArrowUpRight size={14} />
                </button>
                <a
                  href={service.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline" className="text-xs px-3 py-1">
                    COTIZAR
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Technical Spec Modal HUD */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
        protocol={selectedService?.proto}
      >
        {selectedService && (
          <div className="space-y-6">
            {/* Meta row */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-surface/90 border border-white/5 font-mono text-xs">
              <div>
                <span className="text-slate-400 block mb-1">PLAZO DE ENTREGA:</span>
                <span className="text-emerald-glow font-bold text-sm">
                  {selectedService.timeBadge}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">SOBERANÍA DE DATOS:</span>
                <span className="text-cyan-glow font-bold text-sm">
                  100% CÓDIGO &amp; BD PROPIA
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="block font-orbitron text-xs font-bold text-white uppercase tracking-wider mb-2">
                DESCRIPCIÓN DE INGENIERÍA
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            {/* Stack */}
            <div>
              <span className="block font-orbitron text-xs font-bold text-white uppercase tracking-wider mb-2">
                STACK TECNOLÓGICO &amp; ARQUITECTURA
              </span>
              <p className="font-mono text-xs text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/30 p-3 rounded-lg">
                {selectedService.stack}
              </p>
            </div>

            {/* Deliverables */}
            <div>
              <span className="block font-orbitron text-xs font-bold text-white uppercase tracking-wider mb-3">
                ENTREGABLES TÉCNICOS CERTIFICADOS
              </span>
              <ul className="space-y-2">
                {selectedService.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-cyan-glow flex-shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                SOPORTE DE INGENIERÍA DIRECTO • SLA &lt;2H
              </span>
              <a
                href={selectedService.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="md" variant="primary" className="gap-2">
                  <MessageSquare size={16} />
                  <span>COTIZAR EN WHATSAPP</span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
