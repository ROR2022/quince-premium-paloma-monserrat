import { premiumDemoData } from '@/components/demo/boda/premium/data/premium-demo-data'

// Datos demo para el paquete VIP de boda - El más exclusivo
export const vipDemoData = {
  // Heredar todos los datos del premium
  ...premiumDemoData,
  
  // Sobreescribir información demo con datos VIP
  demo: {
    badge: "👑 DEMO - Paquete VIP ($699)",
    description: "¡El más exclusivo! - Experiencia completa con logística del evento",
    features: [
      ...premiumDemoData.demo.features,
      "Hospedaje recomendado",
      "Itinerario completo", 
      "Pases de invitados"
    ],
    cta: {
      title: "¿Quieres la experiencia VIP completa?",
      subtitle: "El paquete más exclusivo - Incluye TODO + logística completa del evento",
      buttonText: "Contratar Paquete VIP - $699",
      link: "/#pricing"
    }
  },
  
  // Hospedaje recomendado (característica VIP NUEVA)
  accommodation: [
    {
      id: "hotel-quinta-real",
      name: "Hotel Quinta Real Monterrey",
      category: "Lujo",
      rating: 5,
      distance: "2.5 km del evento",
      price: "$2,500",
      priceUnit: "por noche",
      address: "Av. Diego Rivera 500, Valle Oriente, 66269 San Pedro Garza García, N.L.",
      phone: "+52 81 8368 1000",
      amenities: [
        "Spa completo",
        "Piscina exterior", 
        "Valet parking",
        "Room service 24hrs",
        "Wifi gratuito",
        "Gym"
      ],
      description: "Hotel boutique de máximo lujo, perfecto para huéspedes VIP de boda",
      image: "/images/boda/boda1.jpeg",
      website: "https://quintareal.com"
    },
    {
      id: "hotel-grand-fiesta",
      name: "Grand Fiesta Americana",
      category: "Premium",
      rating: 4,
      distance: "3.8 km del evento", 
      price: "$1,800",
      priceUnit: "por noche",
      address: "Av. Revolución 300, Centro, 64000 Monterrey, N.L.",
      phone: "+52 81 8319 6000",
      amenities: [
        "Piscina",
        "Estacionamiento",
        "Desayuno incluido",
        "Wifi gratuito",
        "Centro de negocios"
      ],
      description: "Excelente opción con muy buena ubicación para invitados de boda",
      image: "/images/boda/boda2.jpeg",
      website: "https://grandfiesta.com"
    },
    {
      id: "hotel-city-express",
      name: "City Express Plus Monterrey",
      category: "Ejecutivo",
      rating: 4,
      distance: "4.2 km del evento",
      price: "$1,200",
      priceUnit: "por noche", 
      address: "Carr. Nacional 1000, Valle Alto, 64989 Monterrey, N.L.",
      phone: "+52 81 8000 9000",
      amenities: [
        "Desayuno continental",
        "Estacionamiento gratuito",
        "Wifi gratuito",
        "Gym básico"
      ],
      description: "Opción económica pero cómoda para familias invitadas",
      image: "/images/boda/boda3.jpeg",
      website: "https://cityexpress.com"
    },
    {
      id: "hotel-holiday-inn",
      name: "Holiday Inn Monterrey Norte",
      category: "Confort",
      rating: 4,
      distance: "5.1 km del evento",
      price: "$1,400", 
      priceUnit: "por noche",
      address: "Av. Universidad 101, San Nicolás, 66460 San Nicolás de los Garza, N.L.",
      phone: "+52 81 8148 8000",
      amenities: [
        "Piscina",
        "Restaurante",
        "Estacionamiento",
        "Wifi gratuito",
        "Shuttle gratuito"
      ],
      description: "Hotel familiar con excelente servicio para invitados",
      image: "/images/boda/boda4.jpeg",
      website: "https://holidayinn.com"
    }
  ],
  
  // Itinerario completo del evento (característica VIP NUEVA)
  itinerary: [
    {
      time: "08:00",
      activity: "Desayuno familiar", 
      location: "Casa de Ana & Carlos",
      address: "Residencia familiar",
      description: "Desayuno especial con la familia más cercana",
      icon: "☕",
      type: "preparation"
    },
    {
      time: "09:30",
      activity: "Sesión de fotos matutina",
      location: "Jardín Botánico de Monterrey", 
      address: "Av. Universidad s/n, Ciudad Universitaria, 66451 San Nicolás de los Garza, N.L.",
      description: "Fotos de los novios con la naturaleza como fondo",
      icon: "📸",
      type: "photos"
    },
    {
      time: "12:00",
      activity: "Preparación de los novios",
      location: "Salón de belleza Elegance",
      address: "Av. Gonzalitos 248, Centro, 64000 Monterrey, N.L.",
      description: "Arreglo de cabello, maquillaje y preparación",
      icon: "💄",
      type: "preparation"
    },
    {
      time: "14:30",
      activity: "Llegada al lugar de ceremonia",
      location: "Parroquia San José Obrero",
      address: "Av. Revolución 123, Centro, 64000 Monterrey, N.L.",
      description: "Preparativos finales y fotos pre-ceremonia",
      icon: "⛪",
      type: "ceremony"
    },
    {
      time: "15:00",
      activity: "Ceremonia Religiosa",
      location: "Parroquia San José Obrero",
      address: "Av. Revolución 123, Centro, 64000 Monterrey, N.L.",
      description: "Misa de matrimonio con bendición especial",
      icon: "💒",
      type: "ceremony"
    },
    {
      time: "16:00",
      activity: "Sesión de fotos post-ceremonia",
      location: "Explanada de la Parroquia",
      address: "Av. Revolución 123, Centro, 64000 Monterrey, N.L.",
      description: "Fotos con invitados y familia",
      icon: "📷",
      type: "photos"
    },
    {
      time: "17:00",
      activity: "Recepción y cóctel",
      location: "Salón Los Encinos",
      address: "Carr. Nacional 456, Valle Alto, 64989 Monterrey, N.L.",
      description: "Recibimiento de invitados con cóctel de bienvenida",
      icon: "🥂",
      type: "reception"
    },
    {
      time: "18:30",
      activity: "Presentación de los novios",
      location: "Salón Los Encinos - Salón Principal",
      address: "Carr. Nacional 456, Valle Alto, 64989 Monterrey, N.L.",
      description: "Entrada triunfal de Ana & Carlos",
      icon: "👰🤵",
      type: "reception"
    },
    {
      time: "19:00",
      activity: "Primer vals",
      location: "Salón Los Encinos - Pista Principal",
      address: "Carr. Nacional 456, Valle Alto, 64989 Monterrey, N.L.",
      description: "Primer vals como esposos",
      icon: "💃",
      type: "reception"
    },
    {
      time: "19:30",
      activity: "Cena de gala",
      location: "Salón Los Encinos - Comedor Principal", 
      address: "Carr. Nacional 456, Valle Alto, 64989 Monterrey, N.L.",
      description: "Cena de 3 tiempos con menú especial",
      icon: "🍽️",
      type: "reception"
    },
    {
      time: "21:00",
      activity: "Baile y fiesta",
      location: "Salón Los Encinos - Pista de Baile",
      address: "Carr. Nacional 456, Valle Alto, 64989 Monterrey, N.L.",
      description: "Fiesta con DJ y música variada",
      icon: "🎵",
      type: "party"
    },
    {
      time: "23:00",
      activity: "Despedida y agradecimientos",
      location: "Salón Los Encinos - Lobby",
      address: "Carr. Nacional 456, Valle Alto, 64989 Monterrey, N.L.",
      description: "Palabras de agradecimiento y despedida",
      icon: "👋",
      type: "farewell"
    }
  ],
  
  // Sistema de pases de invitados (característica VIP NUEVA)
  guestPasses: [
    {
      id: "vip-exclusive",
      type: "VIP Exclusivo", 
      description: "Acceso completo + áreas exclusivas + mesa VIP",
      color: "from-yellow-400 to-amber-500",
      icon: "👑",
      features: [
        "Acceso a todas las áreas",
        "Mesa VIP cerca de los novios",
        "Cóctel de bienvenida premium",
        "Menú degustación exclusivo",
        "Estacionamiento valet",
        "Kit de cortesía"
      ],
      qrColor: "#F59E0B",
      borderColor: "border-yellow-400"
    },
    {
      id: "family-close",
      type: "Familia Cercana",
      description: "Acceso general + mesa familiar + participación en ceremonias",
      color: "from-purple-400 to-pink-400", 
      icon: "👨‍👩‍👧‍👦",
      features: [
        "Acceso general al evento",
        "Mesa familiar designada",
        "Participación en vals familiar",
        "Sesión de fotos familiares",
        "Estacionamiento preferencial"
      ],
      qrColor: "#A855F7",
      borderColor: "border-purple-400"
    },
    {
      id: "general-guest",
      type: "Invitado General",
      description: "Acceso a ceremonia y recepción general",
      color: "from-blue-400 to-cyan-400",
      icon: "🎊",
      features: [
        "Acceso a ceremonia religiosa",
        "Acceso a recepción general", 
        "Cena incluida",
        "Participación en bailes grupales",
        "Estacionamiento general"
      ],
      qrColor: "#3B82F6",
      borderColor: "border-blue-400"
    }
  ],
  
  // Playlist extendida VIP (característica premium mejorada)
  playlist: [
    {
      id: "arrival",
      title: "Música de Llegada",
      track: "/music/beautiful-fairy-piano1.mp3",
      description: "Música suave para recibir a los invitados",
      icon: "🎹",
      duration: "3:14"
    },
    {
      id: "ceremony", 
      title: "Ceremonia Religiosa",
      track: "/music/wonderful-cinematic-piano1.mp3",
      description: "Música sacra para la ceremonia de matrimonio",
      icon: "⛪",
      duration: "4:32"
    },
    {
      id: "reception",
      title: "Recepción Elegante", 
      track: "/music/romantic-wedding1.mp3",
      description: "Música romántica para la recepción",
      icon: "🥂",
      duration: "3:41"
    },
    {
      id: "dance",
      title: "Fiesta y Baile",
      track: "/music/uplifting-inspiration1.mp3", 
      description: "Música alegre para la fiesta",
      icon: "💃",
      duration: "4:22"
    },
    {
      id: "farewell",
      title: "Despedida Emotiva",
      track: "/music/emotional-violin1.mp3",
      description: "Música emotiva para el final",
      icon: "👋",
      duration: "4:06"
    }
  ],
  
  // Galería categorizada VIP (característica premium mejorada)
  galleryCategories: [
    {
      id: "novios",
      name: "Ana & Carlos",
      description: "Momentos especiales de los novios",
      icon: "👰🤵",
      color: "text-pink-500",
      images: [
        { 
          src: "/images/boda/boda1.jpeg", 
          caption: "Ana & Carlos en su sesión de compromiso",
          year: "2024"
        }
      ]
    },
    {
      id: "preparacion",
      name: "Preparación",
      description: "El proceso hacia el gran día",
      icon: "💍",
      color: "text-purple-500", 
      images: [
        { 
          src: "/images/boda/boda2.jpeg", 
          caption: "Eligiendo el vestido perfecto",
          year: "2024"
        }
      ]
    },
    {
      id: "familia",
      name: "Familia",
      description: "Momentos especiales en familia",
      icon: "👨‍👩‍👧‍👦",
      color: "text-blue-500",
      images: [
        { 
          src: "/images/boda/boda3.jpeg", 
          caption: "Con nuestras familias en las vacaciones",
          year: "2023"
        }
      ]
    },
    {
      id: "celebracion",
      name: "Celebración",
      description: "El gran día ha llegado",
      icon: "🎉",
      color: "text-yellow-500",
      images: [
        { 
          src: "/images/boda/boda4.jpeg", 
          caption: "Listos para celebrar nuestro amor",
          year: "2024"
        }
      ]
    }
  ],
  
  // Configuración VIP adicional
  vip: {
    hasAccommodation: true,
    hasItinerary: true,
    hasGuestPasses: true,
    hasPlaylist: true,
    hasGalleryCategories: true,
    hasAdvancedFeatures: true,
    badge: "VIP EXCLUSIVO",
    color: "from-yellow-400 to-amber-600",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-400"
  }
}

export type VipDemoData = typeof vipDemoData 