// Datos demo para el paquete básico de bautizo
export const basicDemoData = {
  hero: {
    name: "Santiago Alejandro",
    subtitle: "¡Mi Bautizo!",
    backgroundImage: "/images/bautizo/bautizo1.jpeg"
  },
  
  event: {
    celebrant: {
      name: "SANTIAGO ALEJANDRO MARTÍNEZ RODRÍGUEZ",
      age: "6 meses",
      birthDate: "15 de Octubre 2024"
    },
    parents: {
      father: "CARLOS MARTÍNEZ GARCÍA",
      mother: "MARÍA RODRÍGUEZ FLORES"
    },
    padrinos: {
      padrino: "ROBERTO GONZÁLEZ SILVA",
      madrina: "ANA ISABEL MARTÍNEZ LÓPEZ"
    },
    ceremony: {
      time: "12:00 hrs.",
      venue: "Parroquia San José",
      address: "Calle Hidalgo 123, Centro, 64000 Monterrey, N.L.",
      type: "Misa de Bautizo"
    },
    celebration: {
      time: "14:00 hrs.",
      venue: "Salón Los Ángeles",
      address: "Av. Principal 456, Valle Alto, 64989 Monterrey, N.L.",
      type: "Comida de Celebración"
    },
    dressCode: "Formal",
    restrictions: "Niños bienvenidos"
  },

  countdown: {
    targetDate: "March 15, 2025 12:00:00",
    backgroundImage: "/images/countdown-bg.jpg"
  },

  attendance: {
    title: "CONFIRMACIÓN DE ASISTENCIA",
    message: "Respetuosamente solicitamos confirmar su asistencia",
    subtitle: "Esperamos que puedan acompañarnos en este día tan especial para nuestra familia.",
    fields: {
      name: "Nombre completo",
      response: "¿Podrás acompañarnos?",
      companions: "Nombre(s) de acompañante(s)",
      phone: "Número de celular",
      responseOptions: {
        yes: "¡Claro, ahí estaré!",
        no: "Lo siento, no podré asistir."
      }
    }
  },

  gifts: {
    title: "OPCIONES DE REGALO",
    message: "Su presencia es nuestro mejor regalo, pero si desean obsequiarle algo a Santiago, pueden considerar las siguientes opciones:",
    options: [
      {
        icon: "💳",
        title: "Transferencia Bancaria",
        description: "BBVA Bancomer",
        details: "Cuenta: 1234567890\nCLABE: 012345678901234567\nA nombre de: Carlos Martínez García"
      },
      {
        icon: "🎁",
        title: "Mesa de Regalos",
        description: "Liverpool",
        details: "Evento: Bautizo Santiago Alejandro\nCódigo: 51234567"
      },
      {
        icon: "💰",
        title: "Sobre con efectivo",
        description: "El día del evento",
        details: "Pueden entregarlo en la recepción"
      }
    ]
  },

  demo: {
    badge: "🍼 DEMO - Paquete Básico ($299)",
    description: "Esta es una demostración del paquete básico para bautizos",
    features: [
      "Cuenta Regresiva",
      "Cuándo y dónde", 
      "Confirmación de asistencia",
      "Opciones de regalo",
      "Código de vestimenta"
    ],
    cta: {
      title: "¿Te gusta el paquete Básico?",
      subtitle: "Incluye todas las características esenciales para un bautizo perfecto",
      buttonText: "Contratar Paquete Básico - $299",
      link: "/#pricing"
    }
  }
}

export type BasicDemoData = typeof basicDemoData
