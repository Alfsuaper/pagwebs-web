"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  ChevronDown,
  Globe,
  ShoppingCart,
  Smartphone,
  Cpu,
  ShieldCheck,
  Clock,
  Calculator,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { chatReply, ChatMessageItem } from "@/lib/aiConversationalEngine";

const INITIAL_MESSAGES: ChatMessageItem[] = [
  {
    id: "init",
    sender: "bot",
    text: "¡Hola! Bienvenido a **PagWebs & SisCloud Technology** 👋\n\nSoy tu Asesor Virtual. ¿En qué te puedo colaborar hoy? Puedes consultarme con total confianza sobre páginas web, aplicaciones móviles, software a la medida o cotizaciones.",
    time: "Ahora",
  },
];

interface ServiceOption {
  id: string;
  category: string;
  label: string;
  query: string;
  desc: string;
  icon: any;
  isWhatsApp?: boolean;
}

const ALL_SERVICES_OPTIONS: ServiceOption[] = [
  {
    id: "web",
    category: "Desarrollo Web",
    label: "Páginas Web Profesionales",
    query: "Deseo información sobre páginas web profesionales, qué incluyen y tiempos de entrega.",
    desc: "Entrega de 1 a 3 días, SEO, autoadministrables y diseño responsivo.",
    icon: Globe,
  },
  {
    id: "ecommerce",
    category: "Comercio Electrónico",
    label: "Tiendas Virtuales & E-commerce",
    query: "¿Qué características tienen las tiendas virtuales y cómo funcionan las pasarelas de pago?",
    desc: "Catálogo ilimitado, pasarelas de pago colombianas e inventario.",
    icon: ShoppingCart,
  },
  {
    id: "mobile",
    category: "Aplicaciones Móviles",
    label: "Apps Móviles Nativas (Android / iOS)",
    query: "Quiero cotizar una aplicación móvil para mi empresa.",
    desc: "Prototipo funcional en 1 a 2 semanas y publicación en tiendas.",
    icon: Smartphone,
  },
  {
    id: "custom",
    category: "Ingeniería de Software",
    label: "Software a la Medida Corporativo",
    query: "¿Cómo es el proceso y costo para desarrollar software a la medida?",
    desc: "Arquitectura escalable a la medida sin costos ocultos de licencias.",
    icon: Cpu,
  },
  {
    id: "enterprise",
    category: "ERP & Gestión Empresarial",
    label: "SisCloud Enterprise",
    query: "¿Qué es SisCloud Enterprise y qué módulos incluye para mi negocio?",
    desc: "Soberanía total de datos, sin cobro por usuario, en su propio servidor.",
    icon: ShieldCheck,
  },
  {
    id: "ai",
    category: "Inteligencia Artificial",
    label: "Automatización & Agentes IA",
    query: "¿Qué soluciones de Inteligencia Artificial tienen disponibles para empresas?",
    desc: "Chatbots cognitivos, modelos de lenguaje y análisis automatizado.",
    icon: Sparkles,
  },
  {
    id: "quote",
    category: "Cotización Inmediata",
    label: "¿Cuánto cuesta mi proyecto?",
    query: "Quiero calcular el costo aproximado de mi proyecto web o software.",
    desc: "Planes transparentes en Pesos Colombianos (COP) adaptados a su necesidad.",
    icon: Calculator,
  },
  {
    id: "times",
    category: "Garantías y Metodología",
    label: "Tiempos de Entrega & Garantía",
    query: "¿Cuáles son sus tiempos de entrega certificados y qué garantías ofrecen?",
    desc: "Entregas récord de 1 a 15 días con SLA y soporte continuo.",
    icon: Clock,
  },
  {
    id: "whatsapp",
    category: "Atención Humana Directa",
    label: "Hablar con un Asesor por WhatsApp",
    query: "Deseo conectar de inmediato con un asesor humano en WhatsApp.",
    desc: "Línea oficial +57 300 662 8344 con atención prioritaria.",
    icon: PhoneCall,
    isWhatsApp: true,
  },
];

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.06-1.503-.277-1.112-.433-1.842-1.536-1.897-1.611-.055-.075-.447-.595-.447-1.135 0-.54.279-.806.379-.916.1-.11.219-.138.292-.138.073 0 .146.002.21.005.068.003.159-.026.248.188.091.22.312.763.339.818.028.055.046.12.009.193-.036.073-.055.12-.11.183-.055.064-.116.143-.166.192-.055.055-.113.115-.049.225.064.11.284.47 0.61 0.76.42.373.774.489.884.544.11.055.174.046.238-.028.064-.073.274-.32.347-.43.073-.11.146-.091.247-.055.1.037.64.302.75.357.11.055.183.082.21.128.028.046.028.268-.116.673zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.176L2 22l4.981-1.309C8.423 21.523 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.156-.475-4.437-1.294l-.318-.203-2.956.776.789-2.883-.223-.355C4.015 14.887 3.5 13.486 3.5 12c0-4.687 3.813-8.5 8.5-8.5 4.687 0 8.5 3.813 8.5 8.5 0 4.687-3.813 8.5-8.5 8.5z"/>
    </svg>
  );
}

function renderFormattedMessage(text: string) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) {
          return <div key={i} className="h-1" />;
        }

        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="m-0">
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={pIdx} className="text-white font-semibold">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (pIdx === 0 && (part.startsWith("* ") || part.startsWith("- ") || part.startsWith("• "))) {
                return (
                  <span key={pIdx}>
                    <span className="text-cyan-glow font-bold mr-1.5">&bull;</span>
                    {part.slice(2)}
                  </span>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getTimeString = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessageItem = {
      id: Date.now().toString(),
      sender: "user",
      text: userText.trim(),
      time: getTimeString(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputValue("");
    setIsTyping(true);
    setIsDropdownOpen(false);

    try {
      const chatEndpoint =
        typeof window !== "undefined" && window.location.hostname.includes("pagwebs.com")
          ? "/wp-json/siscloud/v1/chat"
          : "/api/chat";

      const res = await fetch(chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: updatedHistory,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          const botMsg: ChatMessageItem = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: data.reply,
            time: getTimeString(),
          };
          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Si la API falla, usamos el motor local
    }

    setTimeout(() => {
      setIsTyping(false);
      const reply = chatReply(userText, updatedHistory);

      const botMsg: ChatMessageItem = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply.text,
        time: getTimeString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const handleSelectService = (option: ServiceOption) => {
    if (option.isWhatsApp) {
      window.open(
        "https://wa.me/573006628344?text=Hola%20PagWebs,%20deseo%20asesoria%20personalizada%20para%20mi%20proyecto",
        "_blank"
      );
      setIsDropdownOpen(false);
      return;
    }
    handleSend(option.query);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  const openWhatsAppDirect = () => {
    const url =
      "https://wa.me/573006628344?text=Hola%20PagWebs,%20acabo%20de%20consultar%20con%20el%20Asesor%20Virtual%20en%20el%20sitio%20web%20y%20deseo%20atenci%C3%B3n%20personalizada";
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-7 right-7 z-[99990] flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-full bg-surface-card/95 border border-cyan-glow/40 shadow-xl backdrop-blur-md text-xs text-white hover:border-cyan-glow transition-all cursor-pointer animate-in fade-in slide-in-from-right-2 duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
            <span className="font-sans font-medium text-slate-200">¿Desea cotizar? Chatee con nosotros</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0099cc] via-[#00f0ff] to-[#00f0ff] text-black shadow-[0_0_30px_rgba(0,240,255,0.45),0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Abrir chat interactivo"
        >
          {isOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <>
              <MessageSquare size={24} className="text-black" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-background animate-ping" />
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-background" />
            </>
          )}
        </button>
      </div>

      {/* Real Interactive Chat Window */}
      {isOpen && (
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="fixed bottom-24 right-4 sm:right-7 z-[99995] w-[430px] max-w-[calc(100vw-24px)] h-[620px] max-h-[calc(100vh-110px)] bg-[#070d17] border border-cyan-glow/40 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(0,240,255,0.25)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 overscroll-contain"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0d2a3d] via-[#091b28] to-[#070d17] border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-cyan-glow/20 border border-cyan-glow flex items-center justify-center text-cyan-glow">
                <Bot size={20} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div>
                <div className="font-orbitron text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Asesor Virtual PagWebs</span>
                  <Sparkles size={12} className="text-cyan-glow" />
                </div>
                <div className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>En línea &bull; Respuestas en tiempo real</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Header WhatsApp Quick Button */}
              <button
                onClick={openWhatsAppDirect}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] hover:text-white transition-all text-[11px] font-sans font-medium cursor-pointer shadow-sm group"
                title="Contactar directamente por WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span className="hidden xs:inline">WhatsApp</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 p-3.5 sm:p-4 space-y-3.5 overflow-y-auto scrollbar-thin overscroll-contain"
          >
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-2xl leading-relaxed shadow-sm text-xs sm:text-sm ${
                      isUser
                        ? "bg-gradient-to-r from-cyan-glow/25 to-sky-500/25 border border-cyan-glow/40 text-white rounded-br-none"
                        : "bg-surface/90 border border-white/10 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {renderFormattedMessage(m.text)}
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface/60 border border-cyan-glow/20 text-cyan-glow font-mono text-xs w-fit">
                <span>Escribiendo respuesta</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Desplegable de Servicios (Reemplaza barra de desplazamiento horizontal) */}
          <div ref={dropdownRef} className="relative px-3 py-2 border-t border-white/10 bg-[#050d18] flex-shrink-0">
            {/* Botón Selector Desplegable */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface/90 border border-cyan-glow/40 hover:border-cyan-glow text-left transition-all cursor-pointer shadow-md group"
              aria-expanded={isDropdownOpen}
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <Sparkles size={14} className="text-cyan-glow flex-shrink-0 animate-pulse" />
                <span className="font-sans text-xs font-semibold text-slate-200 truncate">
                  ⚡ Seleccionar un servicio o consulta rápida...
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-cyan-glow flex-shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Menú Desplegable con Todos los Servicios a la vista */}
            {isDropdownOpen && (
              <div
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                className="absolute bottom-full left-3 right-3 mb-2 max-h-72 bg-[#091522] border border-cyan-glow/50 rounded-xl shadow-[0_-10px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-xl overflow-y-auto scrollbar-thin z-50 p-1.5 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-glow/80 border-b border-white/5 flex items-center justify-between">
                  <span>Portafolio de Servicios PagWebs</span>
                  <span>{ALL_SERVICES_OPTIONS.length} opciones</span>
                </div>

                {ALL_SERVICES_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isWa = opt.isWhatsApp;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectService(opt)}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all cursor-pointer ${
                        isWa
                          ? "bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-white"
                          : "hover:bg-white/[0.07] text-slate-200 hover:text-white"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${
                          isWa
                            ? "bg-[#25D366] text-black"
                            : "bg-cyan-glow/15 text-cyan-glow border border-cyan-glow/30"
                        }`}
                      >
                        {isWa ? <WhatsAppIcon className="w-4 h-4" /> : <Icon size={15} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`font-sans text-xs font-semibold truncate ${
                              isWa ? "text-[#25D366]" : "text-white"
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span className="font-mono text-[9px] text-slate-400 flex-shrink-0">
                            {opt.category}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Barra pequeña de WhatsApp para cuando la persona termine de consultar */}
          <div className="px-3.5 py-1.5 bg-[#051119] border-t border-emerald-500/20 flex items-center justify-between text-xs flex-shrink-0">
            <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>¿Terminó su consulta con la IA?</span>
            </span>
            <button
              type="button"
              onClick={openWhatsAppDirect}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-[11px] shadow-[0_0_12px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Continuar en WhatsApp con un asesor humano"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Hablar en WhatsApp</span>
            </button>
          </div>

          {/* User Input Form */}
          <form
            onSubmit={onFormSubmit}
            className="p-3 border-t border-white/10 bg-[#040810] flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje aquí..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-surface border border-white/15 focus:border-cyan-glow rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="h-10 px-3.5 rounded-xl bg-gradient-to-r from-cyan-glow to-sky-400 text-black font-bold flex items-center justify-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex-shrink-0 text-xs"
              title="Enviar mensaje"
            >
              <span>Enviar</span>
              <Send size={13} />
            </button>
            <button
              type="button"
              onClick={openWhatsAppDirect}
              className="h-10 w-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-black flex items-center justify-center transition-all flex-shrink-0 shadow-sm cursor-pointer group"
              title="Abrir WhatsApp directo"
            >
              <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
