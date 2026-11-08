/**
 * MOTOR DE CONVERSACIÓN NATURAL INTELIGENTE - SISCLOUD TECHNOLOGY (PAGWEBS)
 * Analiza intención, sector, necesidades de arriendo o compra, y sostiene una charla fluida y coherente.
 */

export interface ChatMessageItem {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

// Normalización de texto (elimina tildes y corrige errores ortográficos comunes)
export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(nenecito|nesecito|nesesito|necesito|ocupa|ocupo|kiero|kero|quiero)\b/g, "necesito")
    .replace(/\b(cotisar|cotisar|cotizar|cotisacion|cotizacion)\b/g, "cotizar")
    .replace(/\b(pagina|pag|sitio|portal)\b/g, "pagina")
    .trim();
}

/**
 * Genera una respuesta humana, coherente y conversacional basada en la intención real del usuario.
 */
export function chatReply(
  userText: string,
  history: ChatMessageItem[]
): { text: string; whatsappPrompt?: string } {
  const norm = normalizeText(userText);
  const userOnlyHistory = history
    .filter((h) => h.sender === "user")
    .map((h) => normalizeText(h.text));

  // Contexto total acumulado del usuario
  const fullUserContext = (userOnlyHistory.join(" ") + " " + norm);

  // 1. Detección específica de CALL CENTER / CONTACT CENTER / TELEMERCADEO
  if (
    norm.includes("call center") ||
    norm.includes("callcenter") ||
    norm.includes("contact center") ||
    norm.includes("telemercadeo") ||
    norm.includes("televentas") ||
    norm.includes("campanas telefonicas") ||
    fullUserContext.includes("call center") ||
    fullUserContext.includes("callcenter")
  ) {
    // Si el usuario acaba de decir "Para un call center" o está preguntando por arriendo
    if (norm.includes("arrendar") || norm.includes("alquilar") || norm.includes("cuanto") || norm.includes("precio") || fullUserContext.includes("arrendar")) {
      return {
        text: "¡Totalmente! Tenemos disponible **SisCloud Enterprise para Call Centers** en modalidad de arriendo mensual.\n\nLa mayor ventaja para tu call center es que tienes **USUARIOS Y AGENTES ILIMITADOS ($0 costo por asiento adicional)**, a diferencia de plataformas que cobran mensualidades en dólares por cada operador.\n\nTe incluye en tu servidor dedicado:\n• **Mesa de Ayuda (Help Desk) & Tickets:** Recepción de peticiones, asignación automática a asesores y medición de tiempos SLA.\n• **CRM de Telemercadeo:** Gestión de bases de prospectos, historial de llamadas y embudos de venta.\n• **Conexión con WhatsApp Business y Telefonía.**\n\n¿Cuántos asesores u operadores de call center tienes actualmente?",
        whatsappPrompt: "Hola SisCloud, deseo cotizar el arriendo de SisCloud Enterprise para mi call center.",
      };
    } else {
      return {
        text: "¡Excelente! Para un **Call Center**, SisCloud Enterprise es ideal porque te permite conectar a 5, 20 o más de 50 operadores en un servidor dedicado privado sin pagar licencias mensuales por cada agente.\n\nTe incluye gestión de tickets, CRM de telemercadeo, registro de llamadas e indicadores de atención al cliente.\n\n¿Buscas el sistema para atención al cliente (soporte/tickets) o para campañas de ventas y telemercadeo?",
        whatsappPrompt: "Hola SisCloud, tengo un call center y deseo información del sistema.",
      };
    }
  }

  // 2. Saludos iniciales
  if (
    norm === "hola" ||
    norm === "buenas" ||
    norm === "buen dia" ||
    norm === "buenos dias" ||
    norm === "buenas tardes" ||
    norm === "buenas noches" ||
    norm === "saludos" ||
    norm === "hola buenas" ||
    norm === "hey"
  ) {
    if (userOnlyHistory.length <= 1) {
      return {
        text: "¡Hola! Qué gusto saludarte. Bienvenido a **PagWebs & SisCloud Technology**.\n\n¿En qué te podemos colaborar hoy? ¿Estás buscando una página web, una aplicación móvil o un software de gestión para tu empresa?",
      };
    } else {
      return {
        text: "¡Hola de nuevo! Dime, ¿en qué te puedo colaborar o sobre qué servicio te gustaría conocer más?",
      };
    }
  }

  // 3. Arrendar sistema / Alquilar software (Genérico de arriendo)
  if (
    (norm.includes("arrendar") || norm.includes("alquilar") || norm.includes("arriendo")) &&
    (norm.includes("sistema") || norm.includes("software") || norm.includes("plataforma") || norm.includes("erp") || norm.includes("crm"))
  ) {
    return {
      text: "¡Claro que sí! Ofrecemos **SisCloud Enterprise en modalidad de arriendo mensual** en servidor privado dedicado.\n\nLa ventaja principal frente a cualquier otro software es que **NO cobramos por cada usuario o empleado**. Tienes usuarios ilimitados en una cuota fija mensual predecible con soporte y copias de seguridad incluidas.\n\n¿Para qué tipo de empresa o negocio necesitas arrendar el sistema? (Por ejemplo: call center, constructora, distribuidora, servicios o ferretería).",
      whatsappPrompt: "Hola SisCloud, deseo cotizar el arriendo de SisCloud Enterprise en servidor dedicado.",
    };
  }

  // 4. Cotizar página web
  if (
    norm.includes("pagina web") ||
    (norm.includes("pagina") && (norm.includes("necesito") || norm.includes("cotizar") || norm.includes("cuanto") || norm.includes("crear") || norm.includes("hacer"))) ||
    norm === "pagina" ||
    norm === "una pagina web"
  ) {
    return {
      text: "¡Con gusto te ayudo a cotizar tu página web! En **PagWebs** diseñamos páginas corporativas modernas, ultrarrápidas, adaptadas para celular y optimizadas para Google que entregamos listas en solo **1 a 3 días hábiles**.\n\nLos planes van desde **$1.200.000 COP** (incluyendo hosting, dominio .com y correos corporativos).\n\nCuéntame: ¿de qué es tu empresa o negocio y qué secciones te gustaría que tenga?",
      whatsappPrompt: "Hola PagWebs, deseo cotizar una página web corporativa.",
    };
  }

  // 5. Sector Construcción & Obras
  if (norm.includes("constructora") || norm.includes("construccion") || norm.includes("obra") || norm.includes("contratista")) {
    if (fullUserContext.includes("pagina")) {
      return {
        text: "¡Excelente! Para una constructora, lo más importante es proyectar solidez y confianza. Te diseñamos una página web corporativa con catálogo de proyectos (en venta y ejecutados), galería de fotos/renders, planos descargables y botón directo a WhatsApp para tu sala de ventas en 1 a 3 días.\n\n¿Ya tienes fotos y logotipo de tu constructora, o empezaríamos desde cero?",
        whatsappPrompt: "Hola PagWebs, deseo cotizar una página web para mi empresa constructora.",
      };
    } else {
      return {
        text: "¡Excelente! Para constructoras tenemos **SisCloud Obras**, especializado en:\n\n• Control presupuestal (proyectado vs ejecutado).\n• Requisiciones de materiales en campo desde el celular para residentes.\n• Actas de obra, avance físico y financiero.\n• Control de maquinaria pesada.\n\nY con **usuarios ilimitados sin mensualidad por empleado**. ¿Buscas organizar la gestión de obras o la página web de proyectos?",
        whatsappPrompt: "Hola SisCloud, deseo información del módulo de Control de Obras para mi constructora.",
      };
    }
  }

  // 6. Restaurantes y Comidas
  if (norm.includes("restaurante") || norm.includes("comida") || norm.includes("bar") || norm.includes("cafeteria")) {
    return {
      text: "¡Genial para un restaurante! Te recomendamos una web con menú digital interactivo, fotos de tus platos, ubicación con mapa, botón para pedidos por WhatsApp y sistema de reservas.\n\nSe entrega en 1 a 3 días hábiles. ¿Quieres que los clientes puedan pedir a domicilio o solo ver el menú y la ubicación?",
      whatsappPrompt: "Hola PagWebs, deseo cotizar una página web para mi restaurante.",
    };
  }

  // 7. Ferreterías y Distribuidoras
  if (norm.includes("ferreteria") || norm.includes("distribuidora") || norm.includes("tienda") || norm.includes("comercio") || norm.includes("inventario")) {
    return {
      text: "¡Perfecto! Para ferreterías y distribuidoras ofrecemos dos soluciones:\n\n• Si buscas vender por internet: una **Tienda Virtual / Catálogo Web** con carrito de compras y pagos por PSE.\n• Si buscas ordenar tu empresa: **SisCloud Enterprise** para control de inventarios multisede, cotizaciones rápidas en PDF y cartera de clientes, con usuarios ilimitados.\n\n¿Qué es lo más prioritario para ti en este momento: conseguir más clientes o controlar inventarios?",
      whatsappPrompt: "Hola SisCloud, tengo una ferretería/distribuidora y deseo asesoría.",
    };
  }

  // 8. Salud y Clínicas
  if (norm.includes("salud") || norm.includes("ips") || norm.includes("clinica") || norm.includes("consultorio") || norm.includes("odontologia") || norm.includes("medico")) {
    return {
      text: "Para el área médica y de salud, te ayudamos tanto con tu **página web profesional con agenda de citas**, como con el **software privado SisCloud** para custodia confidencial de historias clínicas y consentimientos informados.\n\n¿Buscas la página web para atraer pacientes o el software de gestión para consultorio?",
      whatsappPrompt: "Hola SisCloud, deseo cotizar soluciones para clínica / consultorio médico.",
    };
  }

  // 9. Transporte y Flotas
  if (norm.includes("transporte") || norm.includes("camion") || norm.includes("flota") || norm.includes("logistica") || norm.includes("carga")) {
    return {
      text: "¡Muy bien! Para transporte y logística tenemos **SisCloud Flotas**, donde puedes controlar hojas de vida de vehículos, alertas de vencimiento de SOAT/tecnomecánica, mantenimientos preventivos y guías de despacho desde el celular.\n\n¿Cuántos vehículos o camiones manejas aproximadamente en tu empresa?",
      whatsappPrompt: "Hola SisCloud, tengo una empresa de transporte y deseo cotizar el software de flotas.",
    };
  }

  // 10. Precios Generales
  if (norm.includes("precio") || norm.includes("costo") || norm.includes("cuanto vale") || norm.includes("cuanto cuesta") || norm.includes("tarifas") || norm.includes("planes")) {
    return {
      text: "Te comparto nuestros precios transparentes (en Pesos Colombianos):\n\n• **Páginas Web Corporativas:** Desde **$1.200.000 COP** (entrega en 1 a 3 días con hosting y dominio .com).\n• **Desarrollo de Software y Apps a Medida:** Desde **$4.500.000 COP** (entrega en 1 a 2 semanas con entrega del código fuente propio).\n• **SisCloud Enterprise:** Planes de implementación y servidor privado desde **$6.800.000 COP** o arriendo mensual accesible, con **usuarios ilimitados ($0 costo por empleado adicional)**.\n\n¿Cuál de estas tres alternativas se ajusta a lo que necesitas?",
      whatsappPrompt: "Hola PagWebs, deseo una cotización formal detallada.",
    };
  }

  // 11. Apps Móviles o Software a la medida (Solo cuando explícitamente hablan de app o desarrollo a medida)
  if (
    norm.includes("app") ||
    norm.includes("aplicacion movil") ||
    norm.includes("aplicacion") ||
    norm.includes("desarrollo a medida") ||
    norm.includes("crear un software") ||
    norm.includes("programar")
  ) {
    return {
      text: "¡Excelente! Desarrollamos aplicaciones móviles nativas para Android y iPhone (iOS), así como plataformas web a la medida.\n\nLo mejor es que entregamos en plazos récord de **1 semana a 15 días hábiles** y contractualmente te entregamos el **100% del código fuente propio** (no quedas amarrado a nadie).\n\n¿De qué trataría tu aplicación o qué funciones principales te gustaría que tenga?",
      whatsappPrompt: "Hola PagWebs, tengo una idea de app/software y deseo cotizar su desarrollo.",
    };
  }

  // 12. Tiempos de entrega
  if (norm.includes("tiempo") || norm.includes("demora") || norm.includes("tarda") || norm.includes("plazo") || norm.includes("entrega")) {
    return {
      text: "Nuestros tiempos son garantizados por contrato:\n\n• **Páginas Web:** 1 a 3 días hábiles.\n• **Software Web & Apps a Medida:** 1 a 2 semanas.\n• **SisCloud Enterprise en tu servidor:** 3 a 7 días hábiles.\n\n¿Para cuándo te gustaría tener listo tu proyecto?",
      whatsappPrompt: "Hola PagWebs, deseo evaluar tiempos de entrega para mi proyecto.",
    };
  }

  // 13. Hablar con persona / Asesor humano
  if (norm.includes("humano") || norm.includes("persona") || norm.includes("asesor") || norm.includes("whatsapp") || norm.includes("telefono") || norm.includes("llamar") || norm.includes("contacto")) {
    return {
      text: "¡Claro que sí! Con mucho gusto puedes hablar directamente con un asesor o ingeniero de nuestro equipo a través de nuestro WhatsApp oficial: **+57 300 662 8344**.\n\nPuedes hacer clic en el botón de abajo o abrir WhatsApp directamente para continuar con una persona real:",
      whatsappPrompt: "Hola PagWebs, deseo hablar directamente con un asesor sobre mi proyecto.",
    };
  }

  // 14. Confirmaciones cortas ("sí", "claro", "me interesa")
  if (norm === "si" || norm === "claro" || norm === "de una" || norm === "me interesa" || norm === "quiero cotizar" || norm === "deseo cotizar") {
    return {
      text: "¡Perfecto! Para darte el valor y alcance exacto: ¿qué nombre tiene tu empresa o negocio y cuál es tu meta principal con este proyecto?",
      whatsappPrompt: "Hola PagWebs, deseo cotizar un proyecto para mi empresa.",
    };
  }

  if (norm === "no" || norm === "nada") {
    return {
      text: "Entendido. Si más adelante te surge alguna duda o quieres cotizar tu página web, software o aplicación móvil, aquí estaré disponible 24/7 para ayudarte. ¡Que tengas un excelente día!",
    };
  }

  // 15. Agradecimientos
  if (norm.includes("gracias") || norm.includes("muchas gracias") || norm.includes("ok gracias")) {
    return {
      text: "¡Con muchísimo gusto! Ha sido un placer atenderte. Si quieres que revisemos tu proyecto más a fondo o agendar una llamada de 15 minutos sin costo, estamos a tu disposición en WhatsApp al **+57 300 662 8344**.",
      whatsappPrompt: "Hola PagWebs, deseo agendar una llamada corta de asesoría.",
    };
  }

  // 16. Consulta abierta general
  return {
    text: `Te entiendo perfectamente. En **PagWebs & SisCloud** ayudamos a empresas a solucionar justo ese tipo de necesidades.\n\nPara orientarte de la forma más precisa: ¿tu proyecto se enfoca en una **página web corporativa**, en una **aplicación móvil**, o en **arrendar/implementar un software de gestión para tu empresa**?`,
    whatsappPrompt: `Hola PagWebs, deseo consultar sobre: ${userText}`,
  };
}
