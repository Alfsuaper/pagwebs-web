import { NextResponse } from "next/server";
import { chatReply, ChatMessageItem } from "@/lib/aiConversationalEngine";

const SYSTEM_INSTRUCTION = `Eres el Asesor Consultor Virtual con Inteligencia Artificial oficial de PAGWEBS & SISCLOUD TECHNOLOGY (https://www.pagwebs.com/).
Tu objetivo es brindar asesoría y consultoría comercial y técnica personalizada a los clientes que visitan la página web.

REGLAS ESENCIALES:
- Eres una IA conversacional humana, profesional, cálida y analítica. Responde de forma personalizada a lo que te pregunten. NUNCA des respuestas prefabricadas o genéricas si el usuario pregunta algo específico.
- Mantén tus respuestas concisas y directas (2 a 4 párrafos cortos o puntos clave bien estructurados).
- NUNCA menciones nombres como "Rukovoditel" ni "SGA". Usa exclusivamente "SisCloud Enterprise", "SisCloud Core" o "PagWebs".
- Moneda oficial: Pesos Colombianos (COP) o dólares (USD) para clientes internacionales.
- WhatsApp oficial de contacto directo: +57 300 662 8344.

CATÁLOGO DE SERVICIOS Y SOLUCIONES DE SISCLOUD / PAGWEBS:
1. PÁGINAS WEB PROFESIONALES Y E-COMMERCE:
   - Entrega rápida: 1 a 3 días hábiles.
   - 100% autoadministrables, optimizadas para Google (SEO), pasarela de pagos y diseño responsivo móvil/escritorio.
   - Precios desde $1.200.000 COP.

2. APLICACIONES MÓVILES (iOS / Android) Y SOFTWARE A LA MEDIDA:
   - Entrega récord: 1 a 2 semanas hábiles.
   - Se entrega el 100% del CÓDIGO FUENTE propio por contrato notariado (sin amarres a proveedores).
   - Precios desde $4.500.000 COP según alcance.

3. SISCLOUD ENTERPRISE (SISTEMAS DE GESTIÓN Y ERP MODULAR):
   - Plataforma en la nube alojada en servidor dedicado privado para la empresa cliente.
   - Cero cobro por usuario o licencia adicional ($0 por usuario).
   - Módulos configurables: Control de Obras y Presupuestos, Kardex y Bodegas, Contratos, CRM y Ventas, Facturación Electrónica DIAN, Gestión Documental.
   - Modalidades: Arrendamiento mensual (SaaS en servidor privado) o Venta definitiva de la plataforma.

4. SISTEMAS PARA CALL CENTERS Y CONTACT CENTERS:
   - Ofrecemos solución en la nube (CCaaS) o plataforma SisCloud Enterprise adaptada a Call Centers.
   - Incluye: telefonía / troncales SIP con numeración local (DIDs), marcador predictivo, progresivo y manual, IVR, grabación de llamadas, monitoreo en tiempo real, supervisión de asesores y módulo de Help Desk / CRM con tickets SLA.
   - Modalidad de arrendamiento mensual por puesto o por servidor dedicado con agentes ilimitados sin sobrecosto por usuario.

DIRECTRICES DE CONVERSACIÓN:
- Saluda amablemente si es el primer contacto.
- Responde directamente a la necesidad que expresa el usuario (ej: si pregunta por call center, detalla el sistema de call center; si pregunta qué contiene, lista todos los componentes completos).
- SIEMPRE completa tus respuestas, oraciones y listas. NUNCA dejes frases cortadas a medias o ideas incompletas.
- Haz una pregunta de cierre amigable para continuar la conversación o invitarlo a agendar una sesión demostrativa o continuar por WhatsApp con un asesor humano (+57 300 662 8344) si lo prefiere.`;

export async function POST(req: Request) {
  try {
    const { message, history } = (await req.json()) as {
      message: string;
      history: ChatMessageItem[];
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Si hay una API Key de Gemini, usar el LLM de Google
    if (geminiKey) {
      try {
        // En la API de Gemini, construir un historial limpio y perfectamente alternado
        const validHistory = (history || []).filter((h) => h.text && h.text.trim().length > 0);

        // Si el último mensaje del historial ya es igual al mensaje actual del usuario, retirarlo para no duplicar
        const previousHistory =
          validHistory.length > 0 &&
          validHistory[validHistory.length - 1].sender === "user" &&
          validHistory[validHistory.length - 1].text === message
            ? validHistory.slice(0, -1)
            : validHistory;

        // Filtrar para que comience obligatoriamente con el rol 'user'
        const firstUserIdx = previousHistory.findIndex((h) => h.sender === "user");
        const trimmedHistory = firstUserIdx !== -1 ? previousHistory.slice(firstUserIdx) : [];

        // Asegurar estricta alternancia de roles (user -> model -> user -> model)
        const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];
        for (const item of trimmedHistory.slice(-8)) {
          const role = item.sender === "user" ? "user" : "model";
          if (contents.length > 0 && contents[contents.length - 1].role === role) {
            contents[contents.length - 1].parts[0].text += `\n${item.text}`;
          } else {
            contents.push({ role, parts: [{ text: item.text }] });
          }
        }

        // Agregar el mensaje actual del usuario
        if (contents.length > 0 && contents[contents.length - 1].role === "user") {
          contents[contents.length - 1].parts[0].text += `\n${message}`;
        } else {
          contents.push({ role: "user", parts: [{ text: message }] });
        }

        // Intentar primero con gemini-3.5-flash y fallback a gemini-3.1-flash-lite y gemini-3.8-flash
        const modelNames = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
        let generatedText: string | null = null;

        for (const model of modelNames) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents,
                  systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                  generationConfig: {
                    maxOutputTokens: 4096,
                    temperature: 0.7,
                  },
                }),
              }
            );

            if (response.ok) {
              const data = await response.json();
              const parts = data.candidates?.[0]?.content?.parts || [];
              const fullText = parts.map((p: any) => p.text || "").join("").trim();
              if (fullText) {
                generatedText = fullText;
                break;
              }
            } else {
              const errBody = await response.text();
              console.warn(`Model ${model} returned status ${response.status}:`, errBody.slice(0, 150));
            }
          } catch (modelErr) {
            console.warn(`Error calling model ${model}:`, modelErr);
          }
        }

        if (generatedText) {
          return NextResponse.json({
            reply: generatedText,
            provider: "gemini",
          });
        }
      } catch (llmError) {
        console.error("Gemini API call failed, falling back to local engine:", llmError);
      }
    }

    // Fallback inteligente local si no hay internet o falla la API
    const localResult = chatReply(message, history || []);
    return NextResponse.json({
      reply: localResult.text,
      whatsappPrompt: localResult.whatsappPrompt,
      provider: "conversational_engine",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error procesando el mensaje" },
      { status: 500 }
    );
  }
}
