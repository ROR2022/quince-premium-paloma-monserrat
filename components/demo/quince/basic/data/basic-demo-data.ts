// Datos para el paquete básico de quinceañera
/**
 * Papas 
Lupita Carlos Castañeda 
Sergio Serrano Correa 
Padrinos 
Hilda Serrano Correa 
Enrique Arteaga Talamantes 

El nombre de la quinceañera es Paloma Monserrat
Fecha: Sabado 18/abril/2026
Misa: Capilla de San Francisco 12:00 pm 
Recepción: Rancho los Arteaga 4:00 pm
 * 
 */
export const basicDemoData = {
  hero: {
  name: "Paloma Monserrat",
    subtitle: "¡Mis XV años!",
    backgroundImage: "/images/quince/paloma01.jpeg"
  },
  
  event: {
  celebrant: "Paloma Monserrat",
    parents: {
      father: "Sergio Serrano Correa",
      mother: "Lupita Carlos Castañeda"
    },
    date: {
      full: "Sábado 18 de Abril 2026",
      day: "Sábado",
      date: "18 de Abril 2026"
    },
    ceremony: {
      time: "12:00 pm",
      venue: "Capilla de San Francisco",
      address: "Francisco I. Madero 225, San Francisco, 99700 Tlaltenango de Sánchez Román, Zac.",
      ubiLink: "https://maps.app.goo.gl/nKy8DBW8oAmRMrwv6", // Link de ubicación en Google Maps
      type: "Misa de Acción de Gracias"
    },
    party: {
      time: "4:00 pm",
      venue: "Rancho los Arteaga",
      address: "Cam. De Tlaltenango De Sanchez Roman 15, San Payo, 99700 Santo Niño, Zac.",
      ubiLink: "https://maps.app.goo.gl/UaYtcURkmLHWuwxw8", // Link de ubicación en Google Maps
      type: "Recepción"
    },
    dressCode: "Formal",
    restrictions: "No Niños"
  },

  countdown: {
    targetDate: "April 18, 2026 12:00:00",
    backgroundImage: "/images/countdown-bg.jpg"
  },

  attendance: {
    title: "CONFIRMACIÓN DE ASISTENCIA",
    message: "Respetuosamente <No Niños>",
    subtitle: "Espero que no sea impedimento para que ustedes puedan asistir a mi fiesta.",
    fields: {
      name: "Nombre completo",
      response: "¿Podrás acompañarme?",
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
    message: "Mi mejor regalo es compartir contigo este gran día, si deseas obsequiarme algo, puedo sugerir las siguientes opciones:",
    options: [
      
      {
        icon: "🎁",
        title: "Regalo Sorpresa",
        description: "¡Sorpréndeme con algo que creas que me encantará!",
        details: "Confía en tu buen gusto, ¡me encantan las sorpresas!"
      },
      {
        icon: "💰",
        title: "Lluvia de Sobres",
        description: "Si prefieres contribuir a mi fondo para mis sueños futuros, puedes hacerlo a través de una lluvia de sobres.",
        details: "Gracias por ayudarme a construir el futuro que sueño."
      }
    ]
  },

  // Colores y tema Coquette
  theme: {
    primary: "from-coquette-rosa-intenso-400 to-coquette-rosa-intenso-600",
    secondary: "from-coquette-rosa-claro-300 to-coquette-rosa-claro-500",
    accent: "from-plateado-400 to-plateado-600",
    background: "bg-gradient-to-br from-coquette-rosa-claro-50 to-coquette-rosa-claro-100",
    text: "text-coquette-rosa-intenso-800"
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
      subtitle: "Incluye todas las características esenciales para tu evento",
      buttonText: "Contratar Paquete Básico - $299",
      link: "/#pricing"
    }
  }
}

export type BasicDemoData = typeof basicDemoData 