"use client";

import { motion } from "framer-motion";
import { Zap, Code2, Users2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
          MANIFIESTO DE INGENIERÍA // POR QUÉ EXISTIMOS
        </span>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          No Somos una Agencia Tradicional. Somos su Brazo de Ingeniería Acelerada y Soberanía Tecnológica
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Las empresas modernas pierden millones de dólares atrapadas entre dos extremos: agencias de diseño que improvisan código vulnerable y consultoras tradicionales que tardan 12 meses en entregar un MVP cobrando fortunas en consultoría redundante.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 bg-surface-card border border-cyan-glow/20 rounded-xl p-8 backdrop-blur-md space-y-4 shadow-xl"
        >
          <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
            FILOSOFÍA DE DATOS SOBERANOS
          </span>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            En <strong className="text-white">SISCLOUD TECHNOLOGY</strong> fusionamos la disciplina de la ingeniería de software de alto nivel con marcos de desarrollo asistidos por Inteligencia Artificial y componentes pre-arquitecturados de grado enterprise. Esto nos permite comprimir los tiempos de entrega hasta en un <strong className="text-cyan-glow">80%</strong>, sin sacrificar seguridad, escalabilidad ni limpieza arquitectónica.
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Nuestra convicción fundamental es simple: <strong className="text-white">sus datos y sus procesos son el activo más valioso de su compañía</strong>. Por ello, no lo encerramos en nubes cautivas ni en esquemas multitenant donde sus datos conviven con miles de empresas ajenas.
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Cada solución que entregamos garantiza que la propiedad intelectual, el control administrativo y las bases de datos permanezcan bajo su gobernanza exclusiva.
          </p>
        </motion.div>

        {/* 3 Pillars */}
        <div className="lg:col-span-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface/80 border border-white/10 border-l-4 border-l-cyan-glow rounded-lg p-6 space-y-2 hover:border-cyan-glow/50 transition-all hover:translate-x-1"
          >
            <div className="flex items-center gap-3">
              <Zap className="text-cyan-glow" size={20} />
              <h3 className="font-orbitron text-base font-bold text-white tracking-wide">
                01. Velocidad Tangible Garantizada
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pl-8">
              Si un desarrollo tarda 9 meses en ver la luz, la oportunidad de mercado ya murió. Entregamos valor en producción desde la primera semana con plazos contractuales garantizados (1 a 15 días).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface/80 border border-white/10 border-l-4 border-l-emerald-glow rounded-lg p-6 space-y-2 hover:border-emerald-glow/50 transition-all hover:translate-x-1"
          >
            <div className="flex items-center gap-3">
              <Code2 className="text-emerald-glow" size={20} />
              <h3 className="font-orbitron text-base font-bold text-white tracking-wide">
                02. Propiedad Intelectual Total (Cero Lock-in)
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pl-8">
              Usted es dueño absoluto del repositorio Git, los esquemas relacionales SQL y la infraestructura. Sin licencias abusivas por usuario ni dependencias tecnológicas forzadas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface/80 border border-white/10 border-l-4 border-l-amber-glow rounded-lg p-6 space-y-2 hover:border-amber-glow/50 transition-all hover:translate-x-1"
          >
            <div className="flex items-center gap-3">
              <Users2 className="text-amber-glow" size={20} />
              <h3 className="font-orbitron text-base font-bold text-white tracking-wide">
                03. Diálogo Directo con Arquitectos Senior
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pl-8">
              Hable directamente con los ingenieros que programan su sistema, sin pasar por filtros burocráticos ni ejecutivos de ventas que desconocen la técnica.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
