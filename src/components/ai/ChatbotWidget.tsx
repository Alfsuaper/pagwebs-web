"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, X, Send, Sparkles, User, Bot } from "lucide-react";
import { chatReply, ChatMessageItem } from "@/lib/aiConversationalEngine";

const INITIAL_MESSAGES: ChatMessageItem[] = [
  {
    id: "init",
    sender: "bot",
    text: "¡Hola! Bienvenido a **PagWebs & SisCloud Technology** 👋\n\nSoy tu Asesor Virtual. ¿En qué te puedo colaborar hoy? Puedes consultarme con total confianza sobre páginas web, aplicaciones móviles, software a la medida o cotizaciones.",
    time: "Ahora",
  },
];

const SUGGESTED_QUESTIONS = [
  "Necesito cotizar una página web",
  "¿Cuánto cuesta un software a medida?",
  "¿Qué incluye SisCloud Enterprise?",
  "Tiempos de entrega garantizados",
  "Hablar con un asesor en WhatsApp",
];

function renderFormattedMessage(text: string) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) {
          return <div key={i} className="h-1" />;
        }

        // Parse bold **text**
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
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
          className="fixed bottom-24 right-4 sm:right-7 z-[99995] w-[410px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-120px)] bg-[#070d17] border border-cyan-glow/40 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(0,240,255,0.25)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 overscroll-contain"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0d2a3d] via-[#091b28] to-[#070d17] border-b border-white/10 flex items-center justify-between flex-shrink-0">
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
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body (Scrollable and isolated from page) */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 p-4 space-y-3.5 overflow-y-auto scrollbar-thin overscroll-contain"
          >
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed shadow-sm text-xs sm:text-sm ${
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

          {/* Suggested Quick Questions */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="p-2 border-t border-white/5 bg-surface/95 flex gap-2 overflow-x-auto scrollbar-thin overscroll-contain flex-shrink-0"
          >
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="font-sans text-[11px] text-slate-300 bg-white/[0.04] border border-cyan-glow/20 hover:border-cyan-glow hover:text-white px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer flex-shrink-0"
              >
                {q}
              </button>
            ))}
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
            <a
              href="https://wa.me/573006628344?text=Hola%20PagWebs,%20deseo%20asesoria%20personalizada"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-xl bg-emerald-glow/20 border border-emerald-glow/40 text-emerald-glow flex items-center justify-center hover:bg-emerald-glow/30 transition-all flex-shrink-0"
              title="Continuar en WhatsApp"
            >
              <MessageSquare size={16} />
            </a>
          </form>
        </div>
      )}
    </>
  );
}
