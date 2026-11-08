"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "INICIO", href: "#inicio" },
  { label: "NOSOTROS", href: "#nosotros" },
  { label: "SERVICIOS", href: "#servicios" },
  { label: "SISCLOUD", href: "#plataforma" },
  { label: "ADAPTABILIDAD", href: "#adaptabilidad" },
  { label: "COTIZADOR", href: "#cotizador" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACTO", href: "#contacto" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-background/90 backdrop-blur-md border-b border-cyan-glow/20 flex items-center px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-[1920px] w-full mx-auto flex items-center justify-between">
        {/* Brand with Animated PagWebs Logo */}
        <Link href="#inicio" className="group flex items-center gap-3 flex-shrink-0">
          <motion.div
            animate={{
              y: [0, -3.5, 0],
              filter: [
                "drop-shadow(0 0 6px rgba(0, 240, 255, 0.35))",
                "drop-shadow(0 0 16px rgba(0, 240, 255, 0.75))",
                "drop-shadow(0 0 6px rgba(0, 240, 255, 0.35))",
              ],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
              rotate: [0, -1, 1, 0],
              transition: { duration: 0.25 },
            }}
            className="relative h-[40px] w-[125px] overflow-hidden rounded-md"
          >
            {/* Holographic light sweep ray across logo */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1.5,
              }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent skew-x-12 z-20 pointer-events-none"
            />
            <Image
              src="/pagwebs_logo_white.png"
              alt="PagWebs Logo Blanco"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <span className="font-orbitron font-extrabold text-white text-base tracking-wider hidden sm:inline group-hover:text-cyan-glow transition-colors">
            SISCLOUD<span className="text-cyan-glow">.AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-orbitron text-xs font-semibold tracking-wider text-slate-300 hover:text-cyan-glow transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/573006628344?text=Hola%20SisCloud%20Technology,%20deseo%20evaluar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Iniciar consulta directa por WhatsApp"
          >
            <Button size="sm" variant="primary" className="gap-2">
              <MessageSquare size={14} />
              <span>CONSULTA DIRECTA</span>
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-slate-300 hover:text-cyan-glow p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
          aria-label={mobileOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-[68px] left-0 right-0 bg-background/98 border-b border-cyan-glow/25 p-6 backdrop-blur-xl flex flex-col gap-4 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-orbitron text-sm font-semibold tracking-wider text-slate-300 hover:text-cyan-glow py-2 border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/573006628344?text=Hola%20SisCloud%20Technology,%20deseo%20evaluar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-2"
          >
            <Button size="md" variant="primary" className="w-full gap-2">
              <MessageSquare size={16} />
              <span>CONSULTA WHATSAPP</span>
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
