"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle, TrendingUp } from "lucide-react";

const CASES = [
  {
    industry: "CONSTRUCCIÓN & OBRAS CIVILES",
    title: "Control de Herramientas & Maquinaria",
    before:
      "Hojas de Excel compartidas que se desincronizaban constantemente. Pérdidas no detectadas de más de $60.000.000 COP anuales y 3 días para consolidar el stock total de 4 bodegas regionales.",
    after:
      "Despliegue en 5 días de módulo Kardex con app móvil. Cada operario firma la entrega con código QR desde su celular. Alertas instantáneas y visibilidad consolidada en 1 segundo.",
    metricLabel: "IMPACTO FINANCIERO:",
    metricVal: "Pérdidas Reducidas a $0",
  },
  {
    industry: "DISTRIBUCIÓN DE MAQUINARIA",
    title: "Cotizador Inteligente con IA en WhatsApp",
    before:
      "Los asesores comerciales tardaban entre 24 y 48 horas en generar cotizaciones en PDF por dispersión de listas de precios y fichas técnicas. Pérdida del 35% de prospectos por lentitud.",
    after:
      "Agente de IA en WhatsApp que consulta stock en tiempo real, aplica descuentos autorizados y emite el PDF formal timbrado en 45 segundos.",
    metricLabel: "TASA DE CONVERSIÓN:",
    metricVal: "+52% Cierres Efectivos",
  },
  {
    industry: "SERVICIOS DE MANTENIMIENTO",
    title: "Gobierno de Contratos & Pólizas",
    before:
      "Contratos archivados en carpetas de red sin alarmas de vencimiento. Pérdida de más de $170.000.000 COP en renovaciones automáticas no gestionadas y multas por pólizas vencidas.",
    after:
      "Tablero centralizado con semáforo preventivo a 90, 60 y 30 días vía correo y WhatsApp a la dirección jurídica. Cero pólizas vencidas en 24 meses.",
    metricLabel: "RETENCIÓN CONTRACTUAL:",
    metricVal: "98% de Renovaciones a Tiempo",
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="casos" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
          RESULTADOS COMPROBADOS // CASOS DE USO OPERATIVOS
        </span>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          La Brecha Entre una Operación Tradicional y una Empresa Potenciada por SisCloud
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Vea cómo situaciones operativas críticas se transforman radicalmente tras implementar nuestras soluciones en días:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CASES.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-card border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-amber-glow tracking-wider uppercase block mb-1">
                  {item.industry}
                </span>
                <h3 className="font-orbitron text-base font-bold text-white">
                  {item.title}
                </h3>
              </div>

              {/* Before */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-1 text-xs sm:text-sm text-red-200 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-red-400 font-mono">
                  <XCircle size={15} />
                  <span>ANTES (EL PROBLEMA):</span>
                </div>
                <p>{item.before}</p>
              </div>

              {/* After */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 space-y-1 text-xs sm:text-sm text-emerald-200 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 font-mono">
                  <CheckCircle size={15} />
                  <span>CON SISCLOUD:</span>
                </div>
                <p>{item.after}</p>
              </div>
            </div>

            {/* Metric Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400">{item.metricLabel}</span>
              <div className="flex items-center gap-1.5 font-orbitron font-extrabold text-emerald-glow text-sm">
                <TrendingUp size={16} />
                <span>{item.metricVal}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
