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

        {/* Instant Phone / Voice Call Banner & Social Links */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface/50 p-6 rounded-xl">
          <div className="space-y-1">
            <span className="font-mono text-xs text-cyan-glow tracking-wider uppercase block">
              ¿PREFIERE ATENCIÓN INMEDIATA POR VOZ O MENSAJE?
            </span>
            <div className="font-orbitron text-lg font-bold text-white">
              LÍNEA DIRECTA & REDES OFICIALES
            </div>
            <p className="text-slate-400 text-xs">
              Bogotá &bull; Medellín &bull; Cali &bull; Barranquilla &bull; Cobertura Internacional
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100086534530050"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#1877F2]/15 hover:bg-[#1877F2] border border-[#1877F2]/40 text-[#1877F2] hover:text-white transition-all text-xs font-semibold shadow-sm hover:scale-105"
              title="Facebook PagWebs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/pagwebs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#E4405F]/15 hover:bg-[#E4405F] border border-[#E4405F]/40 text-[#E4405F] hover:text-white transition-all text-xs font-semibold shadow-sm hover:scale-105"
              title="Instagram PagWebs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>

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
      </div>
    </section>
  );
}
