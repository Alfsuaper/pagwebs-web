/**
 * SISCLOUD TECHNOLOGY - MOTOR DE CONSULTORÍA IA CONTEXTUAL
 * Orientador empresarial en tiempo real para clientes y prospectos.
 */

export interface ConversationTurn {
  sender: "user" | "bot";
  text: string;
}

export interface ConsultationResponse {
  reply: string;
  suggestedAction?: {
    label: string;
    url: string;
  };
  detectedSector?: string;
}

// Base de Conocimiento Especializada de SisCloud Technology
const KNOWLEDGE_BASE = {
  construccion: {
    name: "Sector Construcción & Obras Civiles",
    diagnosis: "En el sector de la construcción, el 80% de los sobrecostos ocurren por descontrol de compras en campo, desincronización entre el presupuesto proyectado vs ejecutado y pérdida de herramientas en obra.",
    solution: "Implementamos SisCloud Enterprise con el módulo especializado de **Control de Obras & Presupuestos**, integrando requisiciones móviles para residentes, actas de avance físico/financiero y control de maquinaria pesada.",
    modules: ["Control de Obras", "Kardex de Bodega en Obra", "Gestión de Contratos", "Gestión Documental (Planos)"],
    timeline: "Despliegue operativo en servidor privado en 3 a 7 días hábiles.",
    priceRef: "Planes llave en mano desde $6.8M COP con usuarios ilimitados (ingenieros, residentes, maestros y administrativos sin costo por usuario).",
  },
  comercio: {
    name: "Sector Comercial, Distribución & Ferreterías",
    diagnosis: "Los comercios y distribuidores pierden ventas cuando los asesores no conocen el stock real en bodega al momento de cotizar, o cuando la cartera y cobranza se desactualiza en hojas de Excel.",
    solution: "Sistematizamos su operación con el **CRM Comercial & Cotizador PDF Automático** enlazado en tiempo real con el **Kardex Multialmacén**, escaneo de código de barras y liquidación automática de comisiones de vendedores.",
    modules: ["CRM & Cotizaciones", "Kardex & Inventarios", "Cartera y Cuentas por Cobrar", "Asistente con IA en WhatsApp"],
    timeline: "Puesta en marcha en 3 a 5 días hábiles con importación de su catálogo actual en Excel.",
    priceRef: "Tarifa fija sin costo por vendedor adicional ($0 por usuario).",
  },
  industrial: {
    name: "Sector Industrial, Fábricas & Manufactura",
    diagnosis: "En manufactura y fábricas, las paradas no programadas de maquinaria y el desperdicio de materia prima encarecen el costo unitario de producción.",
    solution: "Parametrizamos órdenes de producción con rutas de fabricación, hojas de vida y mantenimiento preventivo de maquinaria con código QR, y trazabilidad total por lote.",
    modules: ["Órdenes de Producción", "Mantenimiento de Activos", "Inventario de Materias Primas", "Control de Calidad"],
    timeline: "Implementación en 5 a 10 días hábiles.",
    priceRef: "Servidor dedicado propio con base de datos SQL privada.",
  },
  servicios: {
    name: "Sector Servicios B2B, Consultoras & Tecnología",
    diagnosis: "Las empresas de servicios sufren por falta de trazabilidad en las horas dedicadas a clientes (timesheets), vencimiento de acuerdos de nivel de servicio (SLA) y contratos sin renovar.",
    solution: "Desplegamos la **Mesa de Ayuda (Help Desk)** con tickets automatizados, tablero de gestión de proyectos y alertas anticipadas a 90, 60 y 30 días de vencimiento de contratos.",
    modules: ["Mesa de Ayuda (Help Desk)", "Gestión de Proyectos", "Gestión de Contratos", "Recursos Humanos"],
    timeline: "Configurado y en producción en 3 a 5 días hábiles.",
    priceRef: "Planes escalables con usuarios y clientes ilimitados.",
  },
  salud: {
    name: "Sector Salud, IPS & Centros Clínicos",
    diagnosis: "Las instituciones de salud enfrentan rigurosas auditorías de Habeas Data, agendamiento ineficiente de citas y descontrol en la calibración de equipos biomédicos.",
    solution: "Instalamos en servidor dedicado privado para garantizar soberanía absoluta de datos (sin que terceros accedan a las historias), con agendamiento web y seguimiento a equipos biomédicos.",
    modules: ["Historias Administrativas", "Agenda Médica", "Mantenimiento Biomédico", "PQRS Normativo"],
    timeline: "Despliegue y certificación en 5 a 8 días hábiles.",
    priceRef: "Servidor dedicado exclusivo en Colombia o nube privada.",
  },
  transporte: {
    name: "Sector Transporte, Flotas & Logística",
    diagnosis: "Tener vehículos parados por seguros vencidos (SOAT, tecnomecánica) o despachos sin confirmación en tiempo real genera pérdidas millonarias y riesgos legales.",
    solution: "Centralizamos la hoja de vida de cada vehículo con alertas automáticas de pólizas, control de conductores, guías de despacho con firma digital en smartphone y trazabilidad WMS.",
    modules: ["Hojas de Vida de Flota", "Mantenimientos Preventivos", "WMS & Almacén", "Confirmación Móvil de Entrega"],
    timeline: "Implementación en 4 a 7 días hábiles.",
    priceRef: "Acceso ilimitado para conductores, despachadores y supervisores.",
  },
};

/**
 * Motor de análisis contextual de la consulta del usuario
 */
export function generateConsultation(
  userQuery: string,
  history: ConversationTurn[]
): ConsultationResponse {
  const q = userQuery.toLowerCase().trim();

  // 1. Detectar el sector o industria mencionado en la consulta o en el historial
  let matchedSectorKey: string | null = null;
  const fullText = (history.map((h) => h.text).join(" ") + " " + q).toLowerCase();

  if (
    fullText.includes("construc") ||
    fullText.includes("obra") ||
    fullText.includes("contratista") ||
    fullText.includes("arquitect") ||
    fullText.includes("edific") ||
    fullText.includes("ingenier")
  ) {
    matchedSectorKey = "construccion";
  } else if (
    fullText.includes("ferreter") ||
    fullText.includes("distribui") ||
    fullText.includes("tienda") ||
    fullText.includes("comercial") ||
    fullText.includes("almacen") ||
    fullText.includes("almacén") ||
    fullText.includes("ventas") ||
    fullText.includes("inventario") ||
    fullText.includes("mayorista")
  ) {
    matchedSectorKey = "comercio";
  } else if (
    fullText.includes("fabric") ||
    fullText.includes("fábric") ||
    fullText.includes("industr") ||
    fullText.includes("manufactur") ||
    fullText.includes("taller") ||
    fullText.includes("producc")
  ) {
    matchedSectorKey = "industrial";
  } else if (
    fullText.includes("salud") ||
    fullText.includes("ips") ||
    fullText.includes("clinica") ||
    fullText.includes("clínica") ||
    fullText.includes("medico") ||
    fullText.includes("médico") ||
    fullText.includes("odontol") ||
    fullText.includes("paciente")
  ) {
    matchedSectorKey = "salud";
  } else if (
    fullText.includes("transport") ||
    fullText.includes("camion") ||
    fullText.includes("camión") ||
    fullText.includes("flota") ||
    fullText.includes("vehicul") ||
    fullText.includes("logíst") ||
    fullText.includes("despacho")
  ) {
    matchedSectorKey = "transporte";
  } else if (
    fullText.includes("servici") ||
    fullText.includes("consultor") ||
    fullText.includes("agencia") ||
    fullText.includes("tecnolog") ||
    fullText.includes("software")
  ) {
    matchedSectorKey = "servicios";
  }

  // 2. Saludos puros (sin pregunta de negocio)
  const isGreeting =
    (q === "hola" ||
      q === "buenas" ||
      q === "buen dia" ||
      q === "buen día" ||
      q === "buenos dias" ||
      q === "buenos días" ||
      q === "buenas tardes" ||
      q === "buenas noches" ||
      q === "saludos" ||
      q === "hola buenas") &&
    history.length <= 2;

  if (isGreeting) {
    return {
      reply:
        "¡Hola! Qué gusto saludarle. Soy su **Asesor Consultor con IA** en **SISCLOUD TECHNOLOGY (PagWebs)**.\n\n" +
        "Mi función es analizar las necesidades de su negocio y orientarle con una solución exacta (arquitectura, módulos necesarios, tiempos y presupuesto estimado).\n\n" +
        "Cuénteme con total libertad:\n" +
        "• **¿A qué se dedica su empresa o negocio?**\n" +
        "• **¿Qué proceso le gustaría ordenar o automatizar hoy?** (Por ejemplo: inventarios, ventas, control de obras, facturación, atención a clientes o crear una aplicación nueva).\n\n" +
        "Con esa información le presento un diagnóstico y la propuesta más conveniente.",
      suggestedAction: {
        label: "Hacer una pregunta sobre mi empresa",
        url: "#",
      },
    };
  }

  // 3. Si el usuario describe un negocio / problema específico
  if (matchedSectorKey && KNOWLEDGE_BASE[matchedSectorKey as keyof typeof KNOWLEDGE_BASE]) {
    const sec = KNOWLEDGE_BASE[matchedSectorKey as keyof typeof KNOWLEDGE_BASE];

    // Verificar si pregunta por precio
    if (
      q.includes("precio") ||
      q.includes("costo") ||
      q.includes("cuanto") ||
      q.includes("cuánto") ||
      q.includes("tarifa") ||
      q.includes("vale")
    ) {
      return {
        reply:
          `📊 **Propuesta Económica para su Empresa (${sec.name}):**\n\n` +
          `Para su operación, el modelo más rentable es **SisCloud Enterprise en Servidor Dedicado Privado**:\n\n` +
          `• **Inversión:** ${sec.priceRef}\n` +
          `• **Ventaja Clave:** **$0 sobrecosto por usuario.** Puede conectar a 5, 20 o 100 colaboradores sin pagar licencias mensuales en dólares por cada empleado (ahorro promedio de $45M a $85M COP/año frente a SAP o Salesforce).\n` +
          `• **Tiempo de Entrega:** ${sec.timeline}\n` +
          `• **Módulos incluidos para su caso:** ${sec.modules.join(", ")}.\n\n` +
          `¿Cuántas personas aproximadamente utilizarían el sistema en su empresa para darle el dimensionamiento exacto del servidor?`,
        suggestedAction: {
          label: "Cotizar formalmente en WhatsApp",
          url: `https://wa.me/573006628344?text=Hola%20SisCloud,%20deseo%20cotizar%20para%20${encodeURIComponent(sec.name)}`,
        },
        detectedSector: sec.name,
      };
    }

    // Diagnóstico y orientación completa
    return {
      reply:
        `🎯 **Orientación Estratégica para ${sec.name}:**\n\n` +
        `**1. Diagnóstico del proceso:**\n${sec.diagnosis}\n\n` +
        `**2. Cómo lo soluciona SisCloud Enterprise en su empresa:**\n${sec.solution}\n\n` +
        `**3. Módulos que le recomendamos activar:**\n${sec.modules.map((m) => `• **${m}**`).join("\n")}\n\n` +
        `**4. Tiempos y Despliegue:**\n${sec.timeline} Toda la información se aloja en su propia base de datos SQL privada, garantizando 100% de confidencialidad.\n\n` +
        `¿Desea que le explique en detalle cómo funciona alguno de estos módulos en el celular o computador de su equipo?`,
      suggestedAction: {
        label: `Ver demostración para ${sec.name}`,
        url: `https://wa.me/573006628344?text=Hola%20SisCloud,%20deseo%20ver%20una%20demostracion%20de%20SisCloud%20para%20${encodeURIComponent(sec.name)}`,
      },
      detectedSector: sec.name,
    };
  }

  // 4. Preguntas sobre Precios Generales
  if (
    q.includes("precio") ||
    q.includes("costo") ||
    q.includes("cuanto cuesta") ||
    q.includes("cuánto cuesta") ||
    q.includes("cuanto vale") ||
    q.includes("cuánto vale") ||
    q.includes("tarifa")
  ) {
    return {
      reply:
        "💰 **Estructura de Precios Transparentes (Pesos Colombianos - COP):**\n\n" +
        "En SISCLOUD TECHNOLOGY no cobramos mensualidades ocultas ni comisiones sorpresa:\n\n" +
        "1️⃣ **Páginas Web Corporativas:** Desde **$1.200.000 COP** (entrega en 1 a 3 días hábiles, hosting y dominio incluidos).\n" +
        "2️⃣ **Desarrollo de Software & Apps a Medida:** Desde **$4.500.000 COP** (entrega en 1 a 2 semanas con entrega del 100% del código fuente).\n" +
        "3️⃣ **SisCloud Enterprise (Servidor Privado Dedicado):** Despliegue desde **$6.800.000 COP** o modalidad de arriendo mensual accesible, con **USUARIOS ILIMITADOS ($0 costo por empleado adicional)**.\n\n" +
        "¿Cuál de estas tres opciones se adapta mejor a lo que tiene en mente?",
      suggestedAction: {
        label: "Cotizar mi proyecto en WhatsApp",
        url: "https://wa.me/573006628344?text=Hola%20SisCloud,%20deseo%20una%20cotizacion%20economica",
      },
    };
  }

  // 5. Preguntas sobre desarrollo de software a medida o aplicaciones móviles
  if (
    q.includes("app") ||
    q.includes("móvil") ||
    q.includes("movil") ||
    q.includes("desarrollo") ||
    q.includes("software a medida") ||
    q.includes("programar") ||
    q.includes("sistema web")
  ) {
    return {
      reply:
        "📱 **Desarrollo de Software & Apps a Medida:**\n\n" +
        "Construimos plataformas desde cero adaptadas a su modelo de negocio particular:\n\n" +
        "• **Tecnologías:** Flutter y React Native para aplicaciones móviles nativas (iOS y Android), y React/Next.js/Python para plataformas web escalables.\n" +
        "• **Tiempo Récord:** Entregamos versiones en producción en **1 semana a 15 días hábiles** gracias a nuestra arquitectura de componentes de grado industrial y metodologías con IA.\n" +
        "• **Propiedad del Código:** A diferencia de agencias tradicionales, contractualmente le transferimos el 100% de los derechos patrimoniales y el código fuente de su repositorio Git.\n\n" +
        "¿De qué trata la aplicación o software que desea crear?",
      suggestedAction: {
        label: "Evaluar viabilidad técnica en WhatsApp",
        url: "https://wa.me/573006628344?text=Hola%20SisCloud,%20tengo%20una%20idea%20de%20software/app%20y%20deseo%20evaluar%20su%20desarrollo",
      },
    };
  }

  // 6. Preguntas sobre seguridad, base de datos y migración de datos
  if (
    q.includes("segurid") ||
    q.includes("privacid") ||
    q.includes("base de datos") ||
    q.includes("sql") ||
    q.includes("excel") ||
    q.includes("migr") ||
    q.includes("servidor")
  ) {
    return {
      reply:
        "🔒 **Seguridad, Soberanía y Migración de Datos:**\n\n" +
        "• **Base de Datos Exclusiva:** Su información nunca se comparte en una base de datos multitenant comunitaria. Se instala una instancia SQL dedicada en su servidor privado.\n" +
        "• **Copias de Seguridad:** Copias de seguridad automáticas diarias cifradas.\n" +
        "• **Migración desde Excel:** Si actualmente maneja su empresa en hojas de cálculo desincronizadas, nosotros migramos e importamos toda su información histórica (clientes, inventario, cartera) en menos de 24 horas.\n" +
        "• **Roles y Permisos (RBAC):** Cada usuario tiene permisos estrictos. Por ejemplo, un vendedor solo ve sus clientes y cotizaciones, mientras gerencia supervisa todos los números.\n\n" +
        "¿Tiene actualmente su información en Excel o en algún software anterior?",
      suggestedAction: {
        label: "Consultar proceso de migración de datos",
        url: "https://wa.me/573006628344?text=Hola%20SisCloud,%20deseo%20migrar%20los%20datos%20de%20mi%20empresa",
      },
    };
  }

  // 7. Pregunta abierta / cualquier otra consulta libre
  return {
    reply:
      `Entiendo su consulta sobre **"${userQuery}"**.\n\n` +
      "Para darle una orientación precisa y útil:\n\n" +
      "En **SISCLOUD TECHNOLOGY** resolvemos tres tipos de necesidades:\n" +
      "1. **Ordenar y controlar una empresa en marcha:** Centralizar inventarios, ventas, cotizaciones, personal o proyectos en un sistema propio sin pagar licencias por usuario.\n" +
      "2. **Crear una plataforma o app móvil nueva desde cero:** Diseñar un producto digital exclusivo para comercializar o prestar un servicio.\n" +
      "3. **Página web corporativa o asistente de ventas con IA en WhatsApp:** Para aumentar la captación de clientes las 24 horas.\n\n" +
      "¿Hacia cuál de estos tres objetivos apunta su requerimiento? Si me comparte detalles breves de su negocio, le indico exactamente el camino técnico y económico más conveniente.",
    suggestedAction: {
      label: "Conversar en detalle por WhatsApp",
      url: `https://wa.me/573006628344?text=Hola%20SisCloud,%20estoy%20consultando%20sobre:%20${encodeURIComponent(userQuery)}`,
    },
  };
}
