"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  protocol?: string;
}

export function Modal({ isOpen, onClose, children, title, protocol }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-surface-card border border-cyan-glow/40 rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-surface/90">
              <div>
                {protocol && (
                  <span className="block font-mono text-xs text-cyan-glow tracking-widest uppercase mb-1">
                    {protocol}
                  </span>
                )}
                {title && (
                  <h3 className="font-orbitron text-lg font-bold text-white tracking-wide">
                    {title}
                  </h3>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-red-400 p-1.5 transition-colors"
                title="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-300 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
