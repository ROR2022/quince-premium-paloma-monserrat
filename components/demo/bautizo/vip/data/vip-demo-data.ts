// Datos demo para el paquete VIP de bautizo
export const vipDemoData = {
  hero: {
    name: "Santiago Alejandro",
    subtitle: "¡Mi Bautizo!",
    backgroundImage: "/images/bautizo/bautizo3.jpeg"
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

  accommodation: {
    title: "HOSPEDAJE RECOMENDADO",
    message: "Para su comodidad, hemos reservado habitaciones especiales en hoteles cercanos",
    hotels: [
      {
        name: "Hotel Fiesta Inn Centro",
        address: "Av. Constitución 123, Centro, Monterrey",
        distance: "5 min de la iglesia",
        price: "Desde $1,200/noche",
        features: ["Estacionamiento gratuito", "Desayuno incluido", "WiFi gratuito"],
        contact: "(81) 1234-5678",
        bookingCode: "BAUTIZO-SANTIAGO"
      },
      {
        name: "Holiday Inn Express",
        address: "Av. Principal 789, Valle Alto",
        distance: "10 min del salón",
        price: "Desde $1,500/noche",
        features: ["Piscina", "Gimnasio", "Desayuno buffet"],
        contact: "(81) 8765-4321",
        bookingCode: "BAUTIZO-SANTIAGO"
      },
      {
        name: "Hotel Boutique Los Ángeles",
        address: "Calle Privada 456, Valle Alto",
        distance: "2 min del salón",
        price: "Desde $2,000/noche",
        features: ["Suite familiar", "Servicio de niñera", "Restaurante gourmet"],
        contact: "(81) 5555-1234",
        bookingCode: "BAUTIZO-SANTIAGO"
      }
    ]
  },

  itinerary: {
    title: "ITINERARIO COMPLETO",
    message: "Programa detallado del día del bautizo",
    date: "Sábado 15 de Marzo 2025",
    schedule: [
      {
        time: "10:30 hrs.",
        event: "Llegada de invitados a la iglesia",
        location: "Parroquia San José",
        details: "Recepción y acomodo en la iglesia"
      },
      {
        time: "11:00 hrs.",
        event: "Ensayo de la ceremonia",
        location: "Parroquia San José",
        details: "Padrinos y familia directa"
      },
      {
        time: "12:00 hrs.",
        event: "Misa de Bautizo",
        location: "Parroquia San José",
        details: "Ceremonia principal"
      },
      {
        time: "13:00 hrs.",
        event: "Fotos oficiales",
        location: "Parroquia San José",
        details: "Fotos con padrinos y familia"
      },
      {
        time: "13:30 hrs.",
        event: "Traslado al salón",
        location: "Salón Los Ángeles",
        details: "Coordinado por la familia"
      },
      {
        time: "14:00 hrs.",
        event: "Cóctel de bienvenida",
        location: "Salón Los Ángeles",
        details: "Bebidas y aperitivos"
      },
      {
        time: "15:00 hrs.",
        event: "Comida principal",
        location: "Salón Los Ángeles",
        details: "Menú especial para niños"
      },
      {
        time: "16:30 hrs.",
        event: "Pastel y brindis",
        location: "Salón Los Ángeles",
        details: "Celebración especial"
      },
      {
        time: "17:00 hrs.",
        event: "Entrega de recuerdos",
        location: "Salón Los Ángeles",
        details: "Detalles para los invitados"
      },
      {
        time: "18:00 hrs.",
        event: "Despedida",
        location: "Salón Los Ángeles",
        details: "Agradecimientos finales"
      }
    ]
  },

  guestPasses: {
    title: "PASES DE INVITADOS",
    message: "Información importante para el acceso al evento",
    passes: [
      {
        type: "Pase Familiar",
        description: "Para familias con niños",
        includes: ["Acceso completo", "Menú infantil", "Área de juegos"],
        restrictions: "Máximo 4 personas por pase"
      },
      {
        type: "Pase Individual",
        description: "Para invitados adultos",
        includes: ["Acceso completo", "Menú gourmet", "Bar premium"],
        restrictions: "Una persona por pase"
      },
      {
        type: "Pase VIP",
        description: "Para padrinos y familia directa",
        includes: ["Acceso prioritario", "Mesa especial", "Servicio personalizado"],
        restrictions: "Invitación personal"
      }
    ],
    instructions: [
      "Presentar pase al llegar",
      "Llegar 30 minutos antes",
      "Código de vestimenta: Formal",
      "Estacionamiento gratuito disponible"
    ]
  },

  playlist: {
    title: "PLAYLIST ESPECIAL",
    message: "Música seleccionada especialmente para este día tan especial",
    categories: [
      {
        name: "Música Religiosa",
        tracks: [
          { title: "Ave María", artist: "Schubert", duration: "3:45" },
          { title: "Jesús de Nazareth", artist: "Villancico", duration: "2:30" },
          { title: "Noche de Paz", artist: "Tradicional", duration: "3:15" }
        ]
      },
      {
        name: "Música Infantil",
        tracks: [
          { title: "Los Pollitos", artist: "Tradicional", duration: "2:00" },
          { title: "Estrellita", artist: "Tradicional", duration: "1:45" },
          { title: "Arroz con Leche", artist: "Tradicional", duration: "2:15" }
        ]
      },
      {
        name: "Música Familiar",
        tracks: [
          { title: "La Bamba", artist: "Ritchie Valens", duration: "2:50" },
          { title: "Cielito Lindo", artist: "Tradicional", duration: "2:30" },
          { title: "Guadalajara", artist: "Tradicional", duration: "3:00" }
        ]
      }
    ]
  },

  music: {
    title: "MÚSICA ESPECIAL",
    message: "Disfruta de la música que hemos seleccionado para este día tan especial",
    categories: [
      {
        name: "Religiosa",
        id: "religious"
      },
      {
        name: "Infantil",
        id: "children"
      },
      {
        name: "Familiar",
        id: "family"
      }
    ],
    currentCategory: "religious",
    tracks: {
      religious: [
        {
          title: "Melodía Emocional de Violín",
          artist: "Música Espiritual",
          duration: "2:55",
          file: "/music/emotional-violin1.mp3"
        },
        {
          title: "Piano y Cuerdas Celestiales",
          artist: "Música para Ceremonias",
          duration: "3:20",
          file: "/music/piano-strings1.mp3"
        }
      ],
      children: [
        {
          title: "Cuento de Hadas",
          artist: "Música Infantil",
          duration: "2:30",
          file: "/music/fairy-tale1.mp3"
        },
        {
          title: "Melodías Alegres",
          artist: "Canciones para Niños",
          duration: "2:45",
          file: "/music/feel-good1.mp3"
        }
      ],
      family: [
        {
          title: "Piano Romántico",
          artist: "Música Familiar",
          duration: "3:15",
          file: "/music/romantic-love-piano1.mp3"
        },
        {
          title: "Piano de Fantasía",
          artist: "Música para Todos",
          duration: "2:50",
          file: "/music/beautiful-fairy-piano1.mp3"
        }
      ]
    },
    backgroundImage: "/images/bautizo/bautizo4.jpeg"
  },

  gallery: {
    title: "GALERÍA DE FOTOS",
    message: "Momentos especiales de Santiago y nuestra familia",
    categories: [
      {
        name: "Primeros Meses",
        images: [
          "/images/bautizo/bautizo1.jpeg",
          "/images/bautizo/bautizo2.jpeg",
          "/images/bautizo/bautizo3.jpeg",
          "/images/bautizo/bautizo4.jpeg"
        ]
      },
      {
        name: "Con la Familia",
        images: [
          "/images/bautizo/bautizo2.jpeg",
          "/images/bautizo/bautizo3.jpeg",
          "/images/bautizo/bautizo4.jpeg",
          "/images/bautizo/bautizo1.jpeg"
        ]
      },
      {
        name: "Momentos Especiales",
        images: [
          "/images/bautizo/bautizo3.jpeg",
          "/images/bautizo/bautizo4.jpeg",
          "/images/bautizo/bautizo1.jpeg",
          "/images/bautizo/bautizo2.jpeg"
        ]
      }
    ]
  },

  demo: {
    badge: "👑 DEMO - Paquete VIP ($699)",
    description: "Esta es una demostración del paquete VIP para bautizos",
    features: [
      "Todo del Premium",
      "Hospedaje recomendado",
      "Itinerario completo",
      "Pases de invitados",
      "Playlist múltiple",
      "Logística completa"
    ],
    cta: {
      title: "¿Te gusta el paquete VIP?",
      subtitle: "Incluye logística completa para un bautizo perfecto",
      buttonText: "Contratar Paquete VIP - $699",
      link: "/#pricing"
    }
  }
}

export type VipDemoData = typeof vipDemoData
