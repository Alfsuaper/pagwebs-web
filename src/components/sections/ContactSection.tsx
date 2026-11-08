"use client";

import { useState, FormEvent } from "react";
import { MessageSquare, Shield, Send, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "Construccion",
    solution: "SisCloud Enterprise",
    users: "1 a 25 usuarios",
    timeframe: "1 a 2 semanas",
    notes: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `¡Hola SisCloud Technology! Deseo solicitar un diagnóstico técnico:
• *Nombre:* ${formData.name}
• *Empresa:* ${formData.company}
• *Email:* ${formData.email}
• *Teléfono:* ${formData.phone}
• *Sector:* ${formData.sector}
• *Solución:* ${formData.solution}
• *Usuarios:* ${formData.users}
• *Plazo Deseado:* ${formData.timeframe}
• *Detalles:* ${formData.notes || "No especificado"}`;

    window.open(`https://wa.me/573006628344?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-6xl xl:max-w-[1600px] mx-auto space-y-12">
      <div className="text-center space-y-3">
        <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
          CANAL DE CALIFICACIÓN TÉCNICA // INGENIERÍA DIRECTA
        </span>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Solicite un Diagnóstico de Arquitectura sin Costo
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Converse directamente con un Ingeniero de Soluciones Senior. Analizaremos sus cuellos de botella operativos y le entregaremos una propuesta técnica en menos de 24 horas.
        </p>
      </div>

      <div className="bg-surface-card border border-cyan-glow/35 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              NOMBRE COMPLETO *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Carlos Mendoza"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              CORREO CORPORATIVO *
            </label>
            <input
              type="email"
              required
              placeholder="carlos@tuempresa.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              TELÉFONO / WHATSAPP *
            </label>
            <input
              type="tel"
              required
              placeholder="+57 300 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              EMPRESA *
            </label>
            <input
              type="text"
              required
              placeholder="Nombre de su compañía"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              SECTOR PRODUCTIVO *
            </label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors cursor-pointer"
            >
              <option value="Construccion">Construcción / Obras Civiles</option>
              <option value="Servicios B2B">Empresas de Servicios / Consultoría</option>
              <option value="Logistica">Logística, Almacenamiento &amp; Transporte</option>
              <option value="Salud">Salud, Clínicas &amp; Centros Médicos</option>
              <option value="Educacion">Educación / Universidades</option>
              <option value="Inmobiliario">Inmobiliarias &amp; Gestión de Propiedades</option>
              <option value="Manufactura">Industria &amp; Manufactura</option>
              <option value="Comercial">Comercio / Retail</option>
              <option value="Agropecuario">Agropecuario &amp; Agroindustria</option>
              <option value="Otro">Otro Sector</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              SOLUCIÓN REQUERIDA *
            </label>
            <select
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors cursor-pointer"
            >
              <option value="SisCloud Enterprise">Arriendo SisCloud Enterprise (Servidor Dedicado)</option>
              <option value="Software a Medida">Desarrollo de Software Web a Medida (1-2 semanas)</option>
              <option value="App Movil">Aplicación Móvil iOS / Android (1 semana a 15 días)</option>
              <option value="Inteligencia Artificial">Agentes de IA &amp; Automatización RPA</option>
              <option value="Pagina Web">Página Web Corporativa de Alta Conversión (1-3 días)</option>
              <option value="Infraestructura">Consultoría Cloud &amp; Servidores Soberanos</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              NÚMERO DE USUARIOS ESTIMADOS *
            </label>
            <select
              value={formData.users}
              onChange={(e) => setFormData({ ...formData, users: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors cursor-pointer"
            >
              <option value="1 a 10 usuarios">1 a 10 usuarios</option>
              <option value="11 a 25 usuarios">11 a 25 usuarios</option>
              <option value="26 a 50 usuarios">26 a 50 usuarios</option>
              <option value="51 a 100 usuarios">51 a 100 usuarios</option>
              <option value="Mas de 100 usuarios">Más de 100 usuarios (Enterprise)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              PLAZO DESEADO DE ENTREGA *
            </label>
            <select
              value={formData.timeframe}
              onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors cursor-pointer"
            >
              <option value="Inmediato (< 7 dias)">Inmediato (Menos de 7 días)</option>
              <option value="1 a 2 semanas">1 a 2 semanas</option>
              <option value="1 mes">1 mes</option>
              <option value="Exploratorio">Fase exploratoria / Planificación</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              DESCRIPCIÓN DEL REQUERIMIENTO O DOLOR OPERATIVO
            </label>
            <textarea
              rows={3}
              placeholder="Describa brevemente el proceso que desea digitalizar o automatizar..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-background/90 border border-white/15 focus:border-cyan-glow rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Shield size={16} className="text-cyan-glow" />
              <span>Privacidad Garantizada &bull; Ley Habeas Data &bull; Respuesta &lt;4h</span>
            </div>
            <Button size="lg" variant="primary" type="submit" className="gap-2">
              <Send size={16} />
              <span>ENVIAR SOLICITUD A INGENIERÍA</span>
            </Button>
          </div>
        </form>

        {/* Instant Phone / Voice Call Banner */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface/50 p-6 rounded-xl">
          <div className="space-y-1">
            <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              ¿PREFIERE ATENCIÓN INMEDIATA POR VOZ O MENSAJE?
            </span>
            <div className="font-orbitron text-lg font-bold text-white">
              LÍNEA DIRECTA DE ARQUITECTURA DE SOFTWARE
            </div>
            <p className="text-slate-400 text-xs">
              Bogotá &bull; Medellín &bull; Cali &bull; Barranquilla &bull; Cobertura Internacional
            </p>
          </div>
          <a
            href="https://wa.me/573006628344?text=Hola%20SisCloud,%20deseo%20comunicarme%20directamente%20con%20un%20arquitecto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button size="md" variant="primary" className="gap-2">
              <PhoneCall size={16} />
              <span>WHATSAPP: +57 300 662 8344</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
