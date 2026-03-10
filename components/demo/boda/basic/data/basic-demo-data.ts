// Datos demo para el paquete básico de boda
export const basicDemoData = {
  hero: {
    name: "Ana & Carlos",
    subtitle: "¡Nos Casamos!",
    backgroundImage: "/images/boda/boda1.jpeg"
  },
  
  event: {
    celebrants: {
      bride: "ANA LUCÍA MARTÍNEZ RODRÍGUEZ",
      groom: "CARLOS EDUARDO LÓPEZ SANTIAGO"
    },
    parents: {
      brideParents: {
        father: "ROBERTO MARTÍNEZ GARCÍA",
        mother: "MARÍA RODRÍGUEZ FLORES"
      },
      groomParents: {
        father: "JOSÉ LÓPEZ HERNÁNDEZ",
        mother: "CARMEN SANTIAGO VARGAS"
      }
    },
    date: {
      full: "Sábado 8 de Junio 2024",
      day: "Sábado",
      date: "8 de Junio 2024"
    },
    ceremony: {
      time: "16:00 hrs.",
      venue: "Parroquia Nuestra Señora de Guadalupe",
      address: "Calle Hidalgo 789, Centro, 64000 Monterrey, N.L.",
      type: "Misa de Matrimonio"
    },
    party: {
      time: "18:30 hrs.",
      venue: "Hacienda Los Pinos",
      address: "Carr. Nacional 789, Valle Alto, 64989 Monterrey, N.L.",
      type: "Recepción"
    },
    dressCode: "Formal",
    restrictions: "No Niños"
  },

  countdown: {
    targetDate: "June 8, 2024 16:00:00",
    backgroundImage: "/images/countdown-bg.jpg"
  },

  attendance: {
    title: "CONFIRMACIÓN DE ASISTENCIA",
    message: "Respetuosamente <No Niños>",
    subtitle: "Esperamos que no sea impedimento para que puedan acompañarnos en este día tan especial.",
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
    message: "Su presencia es nuestro mejor regalo, pero si desean obsequiarnos algo, pueden considerar las siguientes opciones:",
    options: [
      {
        icon: "💳",
        title: "Transferencia Bancaria",
        description: "BBVA Bancomer",
        details: "Cuenta: 1234567890\nCLABE: 012345678901234567\nA nombre de: Ana Lucía Martínez Rodríguez"
      },
      {
        icon: "🎁",
        title: "Mesa de Regalos",
        description: "Liverpool",
        details: "Evento: Boda Ana & Carlos\nCódigo: 51234567"
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
    badge: "🎭 DEMO - Paquete Básico ($299)",
    description: "Esta es una demostración del paquete básico",
    features: [
      "Cuenta Regresiva",
      "Cuándo y dónde", 
      "Confirmación de asistencia",
      "Opciones de regalo",
      "Código de vestimenta"
    ],
    cta: {
      title: "¿Te gusta este paquete?",
      subtitle: "Incluye todas las características esenciales para tu boda",
      buttonText: "Contratar Paquete Básico - $299",
      link: "/#pricing"
    }
  }
}

export type BasicDemoData = typeof basicDemoData 