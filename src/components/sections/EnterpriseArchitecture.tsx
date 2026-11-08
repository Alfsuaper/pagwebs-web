"use client";

import { useState } from "react";
import Image from "next/image";
import { Server, Database, Users, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MODULES_HUD = {
  kardex: {
    badge: "OPERACIONES • STOCK",
    title: "Kardex, Inventarios y Control de Activos Fijos",
    desc: "Monitoreo en tiempo real de entradas, salidas, traslados entre bodegas y stock mínimo. Etiquetado con código de barras y códigos QR para auditorías exprés de activos con lectores móviles o teléfonos.",
    specs: [
      "Valorización de inventarios PEPS, Promedio Ponderado y Costo Estándar.",
      "Alertas automáticas de punto de reorden y stock crítico.",
      "Hoja de vida de maquinaria con programación de mantenimientos preventivos.",
    ],
    img: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_kardex_rsi.jpg",
    cta: "https://wa.me/573006628344?text=Deseo%20demo%20del%20modulo%20Kardex%20en%20SisCloud",
  },
  crm: {
    badge: "VENTAS • PIPELINE",
    title: "CRM Comercial y Embudos de Conversión",
    desc: "Seguimiento riguroso de prospectos comerciales desde el primer contacto hasta el cierre. Cotizaciones profesionales generadas en PDF en 1 solo clic y registro cronológico de llamadas, correos y visitas.",
    specs: [
      "Embudos visuales tipo Kanban personalizables por línea de negocio.",
      "Plantillas de cotización dinámica con cálculo de impuestos y descuentos.",
      "Reportes predictivos de cierre de ventas y comisiones comerciales.",
    ],
    img: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_saas_dashboard.jpg",
    cta: "https://wa.me/573006628344?text=Deseo%20demo%20del%20modulo%20CRM%20en%20SisCloud",
  },
  doc: {
    badge: "GOBIERNO DIGITAL",
    title: "Gestión Documental Centralizada y Cifrada",
    desc: "Repositorio soberano para la custodia digital de facturas, actas, manuales y registros normativos. Control de versiones estricto, permisos jerárquicos y búsqueda indexada en milisegundos.",
    specs: [
      "Clasificación por series documentales y tablas de retención.",
      "Firma digital y registro inmutable de quién leyó o modificó cada archivo.",
      "Almacenamiento cifrado en reposo dentro del servidor dedicado privado.",
    ],
    img: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_databases_rsi.jpg",
    cta: "https://wa.me/573006628344?text=Deseo%20demo%20del%20modulo%20Gestion%20Documental%20en%20SisCloud",
  },
  desk: {
    badge: "SOPORTE • SLA",
    title: "Help Desk y Mesa de Ayuda Omnicanal",
    desc: "Canalización de peticiones, quejas, reclamos y soporte técnico en una sola bandeja. Asignación automática por especialista y medición estricta de acuerdos de nivel de servicio (SLA).",
    specs: [
      "Apertura de tickets por correo electrónico, formulario web o portal de clientes.",
      "Semáforo de vencimiento con escalamiento automático a supervisores.",
      "Encuesta automática de satisfacción y métricas de resolución al primer contacto.",
    ],
    img: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_saas_dashboard.jpg",
    cta: "https://wa.me/573006628344?text=Deseo%20demo%20del%20modulo%20Help%20Desk%20en%20SisCloud",
  },
  rrhh: {
    badge: "TALENTO HUMANO",
    title: "Recursos Humanos y Expediente de Personal",
    desc: "Gestión integral del ciclo de vida del colaborador: expediente digital, asignación de turnos, registro de permisos/incapacidades, evaluaciones periódicas y control de dotación.",
    specs: [
      "Historial completo de cargos, contratos, aumentos y capacitaciones.",
      "Módulo de autoservicio para solicitud de vacaciones y certificados laborales.",
      "Alertas preventivas de vencimiento de contratos y exámenes médicos ocupacionales.",
    ],
    img: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_kardex_rsi.jpg",
    cta: "https://wa.me/573006628344?text=Deseo%20demo%20del%20modulo%20RRHH%20en%20SisCloud",
  },
  legal: {
    badge: "LEGAL • PROVEEDORES",
    title: "Gestión de Contratos y Control de Pólizas",
    desc: "Monitoreo preventivo del estado legal y contractual de la empresa con proveedores y clientes. Auditoría de vigencias, valores comprometidos y ejecución presupuestal.",
    specs: [
      "Semáforo de alertas tempranas 30, 15 y 5 días antes de vencimientos.",
      "Control de anexos, adiciones presupuestales y actas de liquidación.",
      "Trazabilidad de garantías bancarias y pólizas de cumplimiento vigentes.",
    ],
    img: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_databases_rsi.jpg",
    cta: "https://wa.me/573006628344?text=Deseo%20demo%20del%20modulo%20Contratos%20en%20SisCloud",
  },
  proj: {
    badge: "OPERACIONES",
    title: "Gestión de Proyectos Gantt & Kanban",
    desc: "Planificación táctica y seguimiento de proyectos con cronogramas interactivos, asignación de responsables, control de avance porcentual y consumo de horas-hombre.",
    specs: [
      "Visualización dual en Diagrama de Gantt y Tableros Kanban ágiles.",
      "Dependencias entre tareas críticas e identificación de cuellos de botella.",
      "Comparativo en tiempo real entre presupuesto proyectado vs ejecutado.",
    ],
    img: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_saas_dashboard.jpg",
    cta: "https://wa.me/573006628344?text=Deseo%20demo%20del%20modulo%20Proyectos%20en%20SisCloud",
  },
};

const ROI_DATA: Record<number, { savings: string; detail: string; cta: string }> = {
  10: {
    savings: "+$30.000.000 COP / AÑO",
    detail: "10 usuarios en un SaaS tradicional cuestan ~$38.000.000 COP/año ($315.000 COP/mes por usuario). Con SisCloud pagas un arriendo mensual fijo accesible en pesos colombianos con usuarios ilimitados.",
    cta: "https://wa.me/573006628344?text=Deseo%20cotizar%20SisCloud%20Enterprise%20para%2010%20usuarios",
  },
  25: {
    savings: "+$78.000.000 COP / AÑO",
    detail: "25 usuarios en un SaaS tradicional representan más de $95.000.000 COP/año. Con SisCloud Enterprise ahorras más del 80% del presupuesto de software corporativo.",
    cta: "https://wa.me/573006628344?text=Deseo%20cotizar%20SisCloud%20Enterprise%20para%2025%20usuarios",
  },
  50: {
    savings: "+$165.000.000 COP / AÑO",
    detail: "50 usuarios en licencias estándar superan los $190.000.000 COP anuales. En SisCloud el costo de arriendo del servidor dedicado permanece estable sin sobrecostos por asiento.",
    cta: "https://wa.me/573006628344?text=Deseo%20cotizar%20SisCloud%20Enterprise%20para%2050%20usuarios",
  },
  100: {
    savings: "+$340.000.000 COP / AÑO",
    detail: "Para más de 100 colaboradores, un ERP tradicional supera los $400.000.000 COP anuales. Con SisCloud aseguras usuarios ilimitados en cuota fija en moneda local (COP).",
    cta: "https://wa.me/573006628344?text=Deseo%20cotizar%20SisCloud%20Enterprise%20para%20100%20usuarios",
  },
};

export default function EnterpriseArchitecture() {
  const [activeMod, setActiveMod] = useState<keyof typeof MODULES_HUD>("kardex");
  const [roiUsers, setRoiUsers] = useState<number>(25);

  const mod = MODULES_HUD[activeMod];
  const roi = ROI_DATA[roiUsers];

  return (
    <section id="plataforma" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto space-y-24">
      {/* 3 Pillars */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
            ARQUITECTURA SOBERANA • ALTERNATIVA REAL A ERPS COSTOSOS
          </span>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            SISCLOUD ENTERPRISE: EL NÚCLEO MODULAR DE TU EMPRESA
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Basado en la robustez de la arquitectura <strong className="text-cyan-glow">SisCloud Enterprise Core</strong>, implementamos su plataforma en servidor dedicado exclusivo para operar con control absoluto de su información.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-card border border-white/10 rounded-xl p-8 space-y-4 hover:border-cyan-glow/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cyan-glow font-bold tracking-wider">
                PILAR 01 // AISLAMIENTO TOTAL
              </span>
              <Server className="text-cyan-glow" size={20} />
            </div>
            <h3 className="font-orbitron text-lg font-bold text-white">
              Servidor Dedicado Propio
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Cero multitenancy. Tu software y tu base de datos no conviven con empresas ajenas. Hardware y memoria RAM 100% asignados a tu operación.
            </p>
          </div>

          <div className="bg-surface-card border border-white/10 rounded-xl p-8 space-y-4 hover:border-emerald-glow/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-glow font-bold tracking-wider">
                PILAR 02 // PROPIEDAD TOTAL
              </span>
              <Database className="text-emerald-glow" size={20} />
            </div>
            <h3 className="font-orbitron text-lg font-bold text-white">
              Base de Datos Soberana SQL
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Acceso directo a la base de datos con credenciales maestras. Realiza auditorías, conecta Power BI o extrae copias de seguridad diarias descargables.
            </p>
          </div>

          <div className="bg-surface-card border border-white/10 rounded-xl p-8 space-y-4 hover:border-amber-glow/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-amber-glow font-bold tracking-wider">
                PILAR 03 // ESCALABILIDAD REAL
              </span>
              <Users className="text-amber-glow" size={20} />
            </div>
            <h3 className="font-orbitron text-lg font-bold text-white">
              Cero Cobro por Usuario
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Paga una cuota fija de arriendo por la infraestructura y el soporte. Conecta a 10, 50 o 500 colaboradores sin que tu factura aumente un solo centavo.
            </p>
          </div>
        </div>
      </div>

      {/* 7 Modules HUD Explorer */}
      <div className="bg-surface-card border border-cyan-glow/30 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block mb-1">
              EXPLORADOR DE MÓDULOS ACTIVOS
            </span>
            <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
              Componentes Pre-Arquitecturados Listos para Despliegue
            </h3>
          </div>
          <span className="font-mono text-xs text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/30 px-3 py-1 rounded">
            DESPLIEGUE EN 3 A 7 DÍAS
          </span>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {(Object.keys(MODULES_HUD) as Array<keyof typeof MODULES_HUD>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveMod(key)}
              className={`font-orbitron text-xs font-bold px-4 py-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                activeMod === key
                  ? "bg-cyan-glow/20 border-cyan-glow text-cyan-glow shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                  : "bg-surface/60 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dynamic Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block font-mono text-xs text-cyan-glow tracking-wider uppercase border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 rounded">
              {mod.badge}
            </span>
            <h4 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
              {mod.title}
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {mod.desc}
            </p>
            <ul className="space-y-2 pt-2">
              {mod.specs.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-glow flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <a href={mod.cta} target="_blank" rel="noopener noreferrer">
                <Button size="md" variant="primary" className="gap-2">
                  <MessageSquare size={16} />
                  <span>SOLICITAR DEMO DE ESTE MÓDULO</span>
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={mod.img}
                alt={mod.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Matrix vs SAP & ROI Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Comparative Matrix */}
        <div className="lg:col-span-7 bg-surface-card border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase block">
            MATRIZ TÉCNICA DE MERCADO
          </span>
          <h3 className="font-orbitron text-xl font-bold text-white">
            SisCloud Enterprise vs. ERPs Tradicionales
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3">CAPACIDAD</th>
                  <th className="pb-3 text-cyan-glow">SISCLOUD ENTERPRISE</th>
                  <th className="pb-3 text-red-400">SAP / SALESFORCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-3 font-semibold text-white">Costo por Usuario</td>
                  <td className="py-3 text-emerald-glow font-bold">$0 COP (Ilimitados)</td>
                  <td className="py-3 text-slate-400">$250.000 - $650.000 COP/mes c/u</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Servidor &amp; Datos</td>
                  <td className="py-3 text-emerald-glow font-bold">100% Privado Dedicado</td>
                  <td className="py-3 text-slate-400">Nube Multitenant Compartida</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Tiempo de Despliegue</td>
                  <td className="py-3 text-emerald-glow font-bold">3 a 7 Días Hábiles</td>
                  <td className="py-3 text-slate-400">6 a 12 Meses</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Personalización</td>
                  <td className="py-3 text-emerald-glow font-bold">Inmediata (Sin Costos Extra)</td>
                  <td className="py-3 text-slate-400">Consultoría Altamente Costosa</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Financial Simulator */}
        <div className="lg:col-span-5 bg-surface-card border border-emerald-glow/40 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between" id="roi-simulator">
          <div className="space-y-4">
            <span className="font-mono text-xs text-emerald-glow tracking-widest uppercase block">
              SIMULADOR DE AHORRO FINANCIERO
            </span>
            <h3 className="font-orbitron text-xl font-bold text-white">
              Calcule su Ahorro Anual de TI
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Seleccione la cantidad de colaboradores que utilizarán el sistema en su empresa:
            </p>

            {/* User count selector */}
            <div className="grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((qty) => (
                <button
                  key={qty}
                  onClick={() => setRoiUsers(qty)}
                  className={`font-orbitron text-xs font-bold py-2 rounded border cursor-pointer transition-all ${
                    roiUsers === qty
                      ? "bg-emerald-glow text-black border-emerald-glow shadow-green-glow"
                      : "bg-surface/80 border-white/10 text-slate-300 hover:border-emerald-glow/40"
                  }`}
                >
                  {qty === 100 ? "+100" : qty} USR
                </button>
              ))}
            </div>

            {/* Savings Display */}
            <div className="p-4 rounded-xl bg-surface/90 border border-emerald-glow/30 space-y-2">
              <span className="font-mono text-[11px] text-slate-400 block">
                AHORRO ESTIMADO EN LICENCIAS:
              </span>
              <div className="font-orbitron text-2xl sm:text-3xl font-extrabold text-emerald-glow">
                {roi.savings}
              </div>
              <p className="text-slate-300 text-xs leading-relaxed pt-1">
                {roi.detail}
              </p>
            </div>
          </div>

          <a href={roi.cta} target="_blank" rel="noopener noreferrer">
            <Button size="md" variant="secondary" className="w-full gap-2">
              <span>BLOQUEAR ESTE AHORRO EN WHATSAPP</span>
              <ArrowRight size={16} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
