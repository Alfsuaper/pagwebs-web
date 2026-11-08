"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Zap, Shield, DollarSign, ArrowRight, Calculator, Radio, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 60]);
  const opacityParallax = useTransform(scrollY, [0, 450], [1, 0.4]);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative pt-36 pb-20 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto overflow-hidden"
    >
      {/* Background Volumetric Aura */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-cyan-glow/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[350px] bg-emerald-glow/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content with stable parallax and zero text flickering */}
        <motion.div
          style={{ y: yParallax, opacity: opacityParallax }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Telemetry pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 text-cyan-glow font-mono text-xs tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Radio size={14} className="text-cyan-glow animate-pulse" />
            <span>[SYS://HUD.INIT] // ARQUITECTURA DE SOFTWARE &amp; IA SOBERANA</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-glow border-l border-cyan-glow/30 pl-2">
              <Activity size={10} /> 18ms
            </span>
          </div>

          {/* Main Cinematic H1 */}
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Escale su Operación con{" "}
            <span className="bg-gradient-to-r from-cyan-glow via-sky-400 to-emerald-glow bg-clip-text text-transparent">
              Software a Medida
            </span>
            , Inteligencia Artificial y Soberanía Total de sus Datos
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
            Liberamos a medianas y grandes empresas de los costos abusivos de licencias mensuales por usuario y los ciclos eternos de desarrollo. Entregamos{" "}
            <strong className="text-white">plataformas web corporativas en 1 a 3 días</strong>,{" "}
            <strong className="text-white">software y apps nativas en 1 a 2 semanas</strong>, y desplegamos{" "}
            <strong className="text-cyan-glow">SisCloud Enterprise</strong> en su propio servidor dedicado en{" "}
            <strong className="text-white">3 a 7 días</strong>.
          </p>

          {/* Key Metrics Bullets with Holographic Glow */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="p-1.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow">
                <Zap size={16} />
              </div>
              <span>
                <strong className="text-white">Despliegue Acelerado:</strong> De prototipo a producción en 1 a 15 días certificados.
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="p-1.5 rounded-lg bg-emerald-glow/10 border border-emerald-glow/30 text-emerald-glow">
                <Shield size={16} />
              </div>
              <span>
                <strong className="text-white">Soberanía Absoluta:</strong> Base de datos SQL dedicada, código fuente 100% de su propiedad y cero dependencias.
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="p-1.5 rounded-lg bg-amber-glow/10 border border-amber-glow/30 text-amber-glow">
                <DollarSign size={16} />
              </div>
              <span>
                <strong className="text-white">Modelo Anti-SaaS:</strong> SisCloud Enterprise en arriendo dedicado con{" "}
                <strong className="text-amber-glow">usuarios ilimitados sin sobrecostos</strong>.
              </span>
            </div>
          </div>

          {/* Dual Cinematic CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="https://wa.me/573006628344?text=Hola%20SisCloud,%20deseo%20evaluar%20un%20proyecto%20de%20software%20empresarial"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Button size="lg" variant="primary" className="gap-2 shadow-[0_0_30px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_45px_rgba(0,240,255,0.5)]">
                <span>EVALUAR PROYECTO CON UN ARQUITECTO</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#cotizador">
              <Button size="lg" variant="outline" className="gap-2 border-white/20 hover:border-cyan-glow/60">
                <Calculator size={16} />
                <span>COTIZAR EN TIEMPO REAL</span>
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Right Asset Frame with 3D Holographic Tilt Card */}
        <div className="lg:col-span-5 relative">
          <TiltCard maxTilt={8} glowColor="rgba(0,240,255,0.3)" className="border border-cyan-glow/40 overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.25)] bg-surface">
            {/* Holographic Scanning Laser Line */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-glow to-transparent z-30 opacity-70" />

            <div className="relative h-[380px] sm:h-[460px] w-full">
              <Image
                src="https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_software_ai.jpg"
                alt="SisCloud Enterprise Architecture"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-transparent opacity-90" />
            </div>

            {/* Bottom HUD Telemetry Card */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 bg-gradient-to-t from-[#010409] via-[#010409]/90 to-transparent z-20">
              <div className="flex items-center justify-between font-mono text-[11px] text-cyan-glow tracking-widest uppercase">
                <span>NÚCLEO DE CONTROL // LIVE STATUS</span>
                <span className="text-emerald-glow font-bold">100% OPERACIONAL</span>
              </div>
              <p className="font-orbitron text-base font-bold text-white tracking-wider">
                ARQUITECTURA SOBERANA EN ALTA DISPONIBILIDAD
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                {[40, 70, 90, 60, 100, 80, 50, 95].map((val, idx) => (
                  <div
                    key={idx}
                    className="h-2 w-1.5 rounded-sm bg-cyan-glow/60"
                    style={{ height: `${val / 6}px` }}
                  />
                ))}
                <span className="font-mono text-[10px] text-slate-400 pl-2">SISCLOUD CORE READY</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Differential Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-surface-card border border-cyan-glow/35 border-l-4 border-l-cyan-glow rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md"
      >
        <div className="space-y-1">
          <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
            PILAR ESTRATÉGICO DE NEGOCIO
          </span>
          <h2 className="font-orbitron text-lg sm:text-xl font-bold text-white tracking-wide">
            TRANSFORMAMOS SISCLOUD ENTERPRISE EN UN TRAJE A LA MEDIDA SIN COBRO POR USUARIO
          </h2>
          <p className="text-slate-400 text-sm font-sans">
            Servidor dedicado propio &bull; Base de datos SQL soberana &bull; Arquitectura propietaria SisCloud &bull; Despliegue en 3 a 7 días.
          </p>
        </div>
        <a href="#plataforma" className="flex-shrink-0">
          <Button size="md" variant="primary">
            VER ARQUITECTURA
          </Button>
        </a>
      </motion.div>
    </section>
  );
}
