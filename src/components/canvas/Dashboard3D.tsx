"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Shield, Zap, Database, Cpu, Activity, Sparkles, CheckCircle2 } from "lucide-react";

interface NodeInfo {
  id: string;
  name: string;
  subtitle: string;
  metric: string;
  description: string;
  benefit: string;
  color: string;
}

const NODES_DATA: NodeInfo[] = [
  {
    id: "core",
    name: "SISTEMA CENTRAL (ERP)",
    subtitle: "Servidor Privado Dedicado",
    metric: "Usuarios Ilimitados",
    description: "Panel central de administración para gestionar toda su empresa sin pagar suscripciones mensuales por cada empleado.",
    benefit: "Ahorro total sin costo por usuario",
    color: "#00f0ff",
  },
  {
    id: "sql",
    name: "BASE DE DATOS PROPIA",
    subtitle: "100% Soberana y Exclusiva",
    metric: "Seguridad y Copias Diarias",
    description: "Toda su información (clientes, compras, cartera y finanzas) vive en su propio servidor, sin que terceros tengan acceso a ella.",
    benefit: "Privacidad y soberanía garantizada",
    color: "#10b981",
  },
  {
    id: "ai",
    name: "ASISTENTE CON IA (WHATSAPP)",
    subtitle: "Atención y Cotizaciones 24/7",
    metric: "Respuestas y PDFs Automáticos",
    description: "Inteligencia artificial que atiende a sus clientes en WhatsApp en tiempo real, consulta disponibilidad de productos y genera cotizaciones.",
    benefit: "Ventas y respuestas sin pausa",
    color: "#a855f7",
  },
  {
    id: "crm",
    name: "CRM Y COTIZADOR COMERCIAL",
    subtitle: "Embudos y Propuestas en 1 Clic",
    metric: "Seguimiento de Prospectos",
    description: "Organice sus oportunidades de venta, mida la gestión de sus asesores y despache propuestas comerciales formales en PDF de inmediato.",
    benefit: "Mayor tasa de cierre en ventas",
    color: "#f59e0b",
  },
  {
    id: "kardex",
    name: "INVENTARIOS Y BODEGAS (KARDEX)",
    subtitle: "Control de Stock y Mercancía",
    metric: "Escaneo QR y Código de Barras",
    description: "Supervise entradas, salidas, traslados entre bodegas y alertas de existencias mínimas en tiempo real desde el celular o computador.",
    benefit: "Cero pérdidas y control exacto",
    color: "#00f0ff",
  },
  {
    id: "api",
    name: "FACTURACIÓN Y CONEXIONES",
    subtitle: "Integración con Sistemas",
    metric: "Facturación Electrónica DIAN",
    description: "Conecte su plataforma con facturación electrónica, bancos, pasarelas de pago y software contable mediante enlaces directos y seguros.",
    benefit: "Toda su contabilidad sincronizada",
    color: "#10b981",
  },
];

export default function Dashboard3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useRefState(NODES_DATA[0]);
  const [isHovered, setIsHovered] = useState(false);

  function useRefState<T>(initialValue: T): [T, (val: T) => void] {
    const [state, setState] = useState<T>(initialValue);
    return [state, setState];
  }

  useEffect(() => {
    if (!mountRef.current) return;

    let isVisible = true;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 26);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Center Core (Icosahedron Mainframe)
    const coreGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner Solid Glow
    const innerGeo = new THREE.IcosahedronGeometry(2.4, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x093b4f,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Orbiting Rings
    const ring1Geo = new THREE.TorusGeometry(7.5, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(9.2, 0.04, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.28 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // Orbital Nodes
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeCount = NODES_DATA.length;
    const radius = 7.5;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const nodeGeo = new THREE.SphereGeometry(0.65, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(NODES_DATA[i].color),
        wireframe: true,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, 0, z);
      scene.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Connection line to center
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.2 });
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, 0, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
    }

    // Particle cloud surrounding core
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 24;
      pPos[i + 1] = (Math.random() - 0.5) * 16;
      pPos[i + 2] = (Math.random() - 0.5) * 20;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.8,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
    });
    const pMesh = new THREE.Points(pGeo, pMat);
    scene.add(pMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Visibility Observer to save battery/performance (>90 Lighthouse)
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (isVisible) {
        const time = clock.getElapsedTime();

        coreMesh.rotation.y = time * 0.35;
        coreMesh.rotation.x = time * 0.15;
        innerMesh.rotation.y = -time * 0.25;

        ring1.rotation.z = time * 0.2;
        ring2.rotation.z = -time * 0.15;

        // Smooth camera drift following mouse
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 3 + 5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Orbit nodes along the ring
        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2 + time * 0.2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          nodeMeshes[i].position.set(x, Math.sin(time + i) * 0.8, z);
          nodeMeshes[i].rotation.y = time;
        }

        renderer.render(scene, camera);
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl border border-cyan-glow/30 bg-[#060b13]/90 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.18)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top HUD Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 px-5 sm:px-6 py-3 bg-surface/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-glow animate-ping" />
            <span className="h-2 w-2 rounded-full bg-cyan-glow" />
          </div>
          <span className="font-orbitron text-xs font-bold tracking-wider text-white">
            ARQUITECTURA INTEGRAL // TODO LO QUE INCLUYE SU SERVIDOR DEDICADO
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
          <span className="hidden sm:inline text-cyan-glow/90 font-semibold">6 MÓDULOS EMPRESARIALES ACTIVOS</span>
          <span className="text-emerald-glow flex items-center gap-1">
            <Activity size={12} />
            RESPUESTA EN TIEMPO REAL
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative h-[400px] sm:h-[480px] w-full cursor-grab active:cursor-grabbing" ref={mountRef}>
        {/* Floating Node Info Overlay (Explains clearly what the selected module does) */}
        <div className="absolute top-4 left-4 z-20 max-w-sm space-y-2 pointer-events-none">
          <div className="rounded-xl border border-cyan-glow/40 bg-surface/95 p-4 backdrop-blur-md shadow-lg shadow-black/50">
            <div className="flex items-center gap-2 text-cyan-glow font-orbitron text-xs sm:text-sm font-bold">
              <Cpu size={16} />
              <span>{activeNode.name}</span>
            </div>
            <div className="text-xs font-medium text-slate-300 mt-1">
              {activeNode.subtitle}
            </div>
            <p className="text-[11px] font-sans text-slate-400 mt-2 leading-relaxed">
              {activeNode.description}
            </p>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-emerald-glow">
              <CheckCircle2 size={13} />
              <span>{activeNode.benefit}</span>
            </div>
          </div>
        </div>

        {/* Floating Live Telemetry Cards (Right) */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none space-y-2 hidden md:block">
          <div className="rounded-xl border border-emerald-glow/40 bg-surface/95 px-4 py-2.5 backdrop-blur-md text-right font-mono text-xs">
            <div className="text-slate-400 text-[10px] uppercase tracking-wider">Seguridad y Privacidad</div>
            <div className="text-emerald-glow font-bold flex items-center justify-end gap-1.5 mt-0.5">
              <Shield size={13} />
              100% DATOS EN SU SERVIDOR
            </div>
          </div>
          <div className="rounded-xl border border-amber-glow/40 bg-surface/95 px-4 py-2.5 backdrop-blur-md text-right font-mono text-xs">
            <div className="text-slate-400 text-[10px] uppercase tracking-wider">Costo por Empleado Adicional</div>
            <div className="text-amber-glow font-bold flex items-center justify-end gap-1.5 mt-0.5">
              <Zap size={13} />
              $0 COP // USUARIOS ILIMITADOS
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Control Chips (Click to switch node explanation) */}
      <div className="p-3 border-t border-white/10 bg-surface/70">
        <div className="text-[11px] font-mono text-slate-400 mb-2 px-1 flex items-center justify-between">
          <span>HAGA CLIC EN UN MÓDULO PARA VER SUS BENEFICIOS:</span>
          <span className="text-cyan-glow text-[10px] hidden sm:inline">INTERACTIVO</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {NODES_DATA.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`p-2.5 rounded-lg text-left transition-all border ${
                  isSelected
                    ? "border-cyan-glow bg-cyan-glow/20 shadow-[0_0_15px_rgba(0,240,255,0.3)] text-white ring-1 ring-cyan-glow/50"
                    : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-white hover:border-cyan-glow/40 hover:bg-white/[0.05]"
                }`}
              >
                <div className="font-orbitron text-[10px] font-bold truncate">{node.name}</div>
                <div className="font-sans text-[10px] text-slate-300 truncate mt-0.5">{node.metric}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
