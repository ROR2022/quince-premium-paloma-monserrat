export const vipDemoData = {
  // Información del celebrante
  hero: {
    name: "Princesa Sofia",
    subtitle: "¡La nueva heredera del Reino Mágico!",
    backgroundImage: "/images/cumple/princesas/princesas1.png"
  },

  // Información del evento
  event: {
    celebrant: {
      name: "Sofia Isabella",
      age: "5 años", 
      birthDate: "10 de Diciembre de 2018"
    },
    parents: {
      father: "Rey Alessandro Castillo",
      mother: "Reina Valentina Flores"
    },
    padrinos: {
      padrino: "Príncipe Eduardo Vega",
      madrina: "Princesa Isabella Cruz"
    },
    ceremony: {
      date: "Domingo 10 de Diciembre, 2024",
      time: "2:00 PM",
      location: "Castillo Encantado",
      address: "Palacio de Cristal, Jardines Reales"
    },
    celebration: {
      date: "Domingo 10 de Diciembre, 2024",
      time: "3:00 PM",
      location: "Salón del Trono Real",
      address: "Gran Salón de Baile, Ala Este del Palacio"
    },
    dressCode: "Gala real: vestidos elegantes, coronas y zapatos brillantes",
    restrictions: "Solo se permiten hadas madrinas y unicornios amigables"
  },

  // Cronograma del evento
  timeline: [
    {
      time: "2:00 PM",
      activity: "Llegada Real",
      description: "Recepción en carruaje dorado",
      icon: "👑"
    },
    {
      time: "2:30 PM",
      activity: "Ceremonia de Coronación",
      description: "Entrega oficial de corona y cetro mágico",
      icon: "💎"
    },
    {
      time: "3:30 PM",
      activity: "Búsqueda del Tesoro Mágico",
      description: "Aventura por el jardín encantado",
      icon: "🗝️"
    },
    {
      time: "4:30 PM",
      activity: "Espectáculo de Hadas",
      description: "Show mágico con polvo de estrellas",
      icon: "🧚‍♀️"
    },
    {
      time: "5:30 PM",
      activity: "Banquete Real",
      description: "Pastel de princesa y manjares del reino",
      icon: "🎂"
    },
    {
      time: "6:30 PM",
      activity: "Baile en el Palacio",
      description: "Vals real con música de orquesta",
      icon: "💃"
    },
    {
      time: "7:30 PM",
      activity: "Lluvia de Estrellas",
      description: "Despedida mágica con fuegos artificiales",
      icon: "✨"
    }
  ],

  // Galería de fotos VIP
  gallery: {
    title: "Álbum Real de Recuerdos",
    description: "Momentos mágicos del reino",
    categories: [
      {
        name: "Ceremonia Real",
        images: [
          "/images/cumple/princesas/princesas1.png",
          "/images/cumple/princesas/princesas2.png"
        ]
      },
      {
        name: "Aventuras Mágicas", 
        images: [
          "/images/cumple/princesas/princesas3.png",
          "/images/cumple/princesas/princesas4.png"
        ]
      }
    ]
  },

  // Música VIP
  music: {
    title: "Sinfónica del Reino Mágico",
    tracks: [
      {
        name: "Vals de la Princesa Sofia",
        artist: "Orquesta Real",
        duration: "4:32",
        file: "/audio/cumple/princess-waltz.mp3"
      },
      {
        name: "Canción de las Hadas",
        artist: "Coro Celestial",
        duration: "3:28", 
        file: "/audio/cumple/fairy-song.mp3"
      },
      {
        name: "Marcha Triunfal",
        artist: "Banda del Palacio",
        duration: "5:15",
        file: "/audio/cumple/royal-march.mp3"
      },
      {
        name: "Nana de Estrellas",
        artist: "Arpa Mágica",
        duration: "4:45",
        file: "/audio/cumple/star-lullaby.mp3"
      }
    ]
  },

  // Lista de invitados VIP
  guestList: {
    title: "Lista Real de Invitados",
    description: "Nobles y personajes mágicos del reino",
    guests: [
      {
        name: "Hada Madrina Aurora",
        role: "Protectora del Reino",
        status: "confirmed",
        specialNote: "Traerá polvo mágico especial"
      },
      {
        name: "Príncipe Valentín",
        role: "Mejor amigo real",
        status: "confirmed", 
        specialNote: "Acompañará en el baile de apertura"
      },
      {
        name: "Unicornio Estrella",
        role: "Mascota real",
        status: "confirmed",
        specialNote: "Dará paseos mágicos a los invitados"
      },
      {
        name: "Dragón Amigable Fuego",
        role: "Guardián del tesoro",
        status: "pending",
        specialNote: "Ayudará en la búsqueda del tesoro"
      },
      {
        name: "Reina de las Hadas",
        role: "Invitada de honor",
        status: "confirmed",
        specialNote: "Otorgará un deseo especial"
      }
    ]
  },

  // Colores y tema VIP
  theme: {
    primary: "from-pink-500 to-rose-500",
    secondary: "from-purple-500 to-pink-500",
    accent: "from-yellow-400 to-amber-400",
    background: "bg-gradient-to-br from-pink-50 to-purple-100", 
    text: "text-pink-900"
  },

  // Color para badges VIP
  vip: {
    color: "from-pink-500 to-rose-500"
  },

  // Información del demo
  demo: {
    badge: "👸 DEMO - Paquete VIP ($699)",
    description: "Esta es una demostración del paquete VIP para cumpleaños temáticos",
    features: [
      "Todo del Premium",
      "Lista de invitados especiales",
      "Múltiples galerías organizadas",
      "Banda sonora completa",
      "Cronograma extendido",
      "Efectos visuales premium",
      "Animaciones exclusivas",
      "Soporte prioritario 24/7"
    ],
    cta: {
      title: "¿Te gusta el paquete VIP?",
      subtitle: "La experiencia más mágica para una celebración de ensueño",
      buttonText: "Contratar Paquete VIP - $699",
      link: "/#pricing"
    }
  }
}
