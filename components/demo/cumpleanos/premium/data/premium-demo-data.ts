export const premiumDemoData = {
  // Información del celebrante
  hero: {
    name: "Súper Emma",
    subtitle: "¡La nueva heroína de la Liga de Súper Héroes!",
    backgroundImage: "/images/cumple/super/superheroes1.png"
  },

  // Información del evento
  event: {
    celebrant: {
      name: "Emma Victoria",
      age: "7 años",
      birthDate: "22 de Marzo de 2017"
    },
    parents: {
      father: "David Hernández",
      mother: "Laura Morales"
    },
    padrinos: {
      padrino: "Miguel Ángel Torres",
      madrina: "Carmen Jiménez"
    },
    ceremony: {
      date: "Viernes 22 de Marzo, 2024",
      time: "4:00 PM",
      location: "Ciudad de los Héroes",
      address: "Centro de Convenciones Metropolitan, Sala A"
    },
    celebration: {
      date: "Viernes 22 de Marzo, 2024",
      time: "5:00 PM", 
      location: "Base Secreta de Héroes",
      address: "Av. Justicia 456, Col. Heroica"
    },
    dressCode: "Disfraces de superhéroes: capas, máscaras y trajes heroicos",
    restrictions: "Evento libre de villanos y kriptonita"
  },

  // Cronograma del evento
  timeline: [
    {
      time: "4:00 PM",
      activity: "Llegada de héroes",
      description: "Registro en la base secreta",
      icon: "🦸‍♀️"
    },
    {
      time: "4:30 PM",
      activity: "Entrenamiento heroico", 
      description: "Pruebas de fuerza, velocidad y valentía",
      icon: "💪"
    },
    {
      time: "5:30 PM",
      activity: "Misión especial",
      description: "Búsqueda del tesoro perdido del villano",
      icon: "🗺️"
    },
    {
      time: "6:30 PM",
      activity: "Ceremonia heroica",
      description: "Entrega de poderes especiales y foto grupal",
      icon: "🏆"
    },
    {
      time: "7:00 PM",
      activity: "Festín de héroes",
      description: "Comida especial para recargar energías",
      icon: "🍕"
    },
    {
      time: "8:00 PM",
      activity: "Baile heroico",
      description: "Música épica y bailes de victoria",
      icon: "🎵"
    }
  ],

  // Galería de fotos
  gallery: {
    title: "Galería Heroica",
    description: "Momentos épicos de la celebración",
    categories: [
      {
        name: "Entrenamiento",
        images: [
          "/images/cumple/super/superheroes1.png",
          "/images/cumple/super/superheroes2.png"
        ]
      },
      {
        name: "Misión Especial",
        images: [
          "/images/cumple/super/superheroes3.png",
          "/images/cumple/super/superheroes4.png"
        ]
      }
    ]
  },

  // Música temática
  music: {
    title: "Banda Sonora Heroica",
    tracks: [
      {
        name: "Marcha de los Héroes",
        artist: "Orquesta Épica",
        duration: "3:45",
        file: "/audio/cumple/heroes-march.mp3"
      },
      {
        name: "Tema de Súper Emma",
        artist: "Compositores Heroicos", 
        duration: "4:12",
        file: "/audio/cumple/emma-theme.mp3"
      },
      {
        name: "Batalla Final",
        artist: "Sinfónica del Poder",
        duration: "5:20",
        file: "/audio/cumple/final-battle.mp3"
      }
    ]
  },

  // Colores y tema
  theme: {
    primary: "from-blue-600 to-indigo-600",
    secondary: "from-red-500 to-red-600",
    accent: "from-yellow-400 to-orange-500", 
    background: "bg-gradient-to-br from-blue-50 to-indigo-100",
    text: "text-blue-900"
  },

  // Color para badges premium
  premium: {
    color: "from-blue-600 to-indigo-600"
  },

  // Información del demo
  demo: {
    badge: "🦸 DEMO - Paquete Premium ($499)",
    description: "Esta es una demostración del paquete premium para cumpleaños temáticos",
    features: [
      "Todo del Básico",
      "Galería de fotos interactiva",
      "Música temática personalizada",
      "Cronograma avanzado",
      "Diseño premium con animaciones",
      "Efectos visuales especiales"
    ],
    cta: {
      title: "¿Te gusta el paquete Premium?",
      subtitle: "Incluye características heroicas para una celebración épica",
      buttonText: "Contratar Paquete Premium - $499",
      link: "/#pricing"
    }
  }
}
