"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQ_DATA } from "@/lib/data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-5xl xl:max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
          RESOLUCIÓN DE DUDAS B2B // TRANSPARENCIA TÉCNICA
        </span>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Preguntas Frecuentes sobre Software y SisCloud Enterprise
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Respuestas técnicas directas para directores de tecnología, gerentes de operaciones y CEOs:
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-surface-card border-cyan-glow/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                  : "bg-surface/70 border-white/10 hover:border-white/25"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle
                    size={18}
                    className={isOpen ? "text-cyan-glow" : "text-slate-500"}
                  />
                  <span className="font-orbitron text-sm sm:text-base font-bold text-white tracking-wide">
                    {item.question}
                  </span>
                </div>
                <div className="text-cyan-glow flex-shrink-0">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
