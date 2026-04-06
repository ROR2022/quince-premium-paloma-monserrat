import { basicDemoData } from '@/components/demo/quince/basic/data/basic-demo-data'

// Datos demo para el paquete premium de quinceañera
export const premiumDemoData = {
  // Heredar todos los datos del básico
  ...basicDemoData,
  
  // Sobreescribir configuración del hero con múltiples imágenes para el carrusel
  hero: {
    ...basicDemoData.hero,
    backgroundImages: [
      "/images/paloma02.jpeg",
    ],
    // Imágenes optimizadas para móviles (utilizamos las mismas pero se pueden reemplazar por versiones específicas)
    mobileBackgroundImages: [
      "/images/paloma02.jpeg",
    ],
    carouselOptions: {
      delay: 5000, // tiempo entre cambios de imagen (5 segundos)
      loop: true,
      fadeTransition: true,
    },
  },
  
  // Sobreescribir información demo con datos premium
  demo: {
    badge: "🌟 DEMO - Paquete Premium ($499)",
    description: "¡La más solicitada! - Incluye música, galería y padrinos",
    features: [
      ...basicDemoData.demo.features,
      "Música personalizada",
      "Galería de fotos", 
      "Lista de padrinos"
    ],
    cta: {
      title: "¿Te encanta el paquete Premium?",
      subtitle: "El más solicitado - Incluye TODAS las características esenciales + 3 premium exclusivas",
      buttonText: "Contratar Paquete Premium - $499",
      link: "/#pricing"
    }
  },
  
  // Configuración de música premium
  music: {
    title: "Música Especial",
    track: "/music/music.mp3",
    autoplay: false, // Por UX, mejor no autoplay automático
    loop: true,
    description: "Música para tu evento"
  },
  
  // Información completa de invitación (característica premium)
  invitation: {
    title: "INVITACIÓN ESPECIAL",
    message: "Acompáñanos a celebrar",
    subtitle: "Mis XV años",
    blessing: "con la bendición de Dios y el amor de mi familia",
    celebrant: basicDemoData.event.celebrant,
    parents: basicDemoData.event.parents,
    decorativeMessage: "Te esperamos en este día tan especial"
  },
  
  // Lista de padrinos (característica premium NUEVA)
  /**
   * Padrinos 
Hilda Serrano Correa 
Enrique Arteaga Talamantes 
   */
  padrinos: [
    { 
      role: "Mis Padrinos", 
      names: ["Enrique Arteaga Talamantes", "Hilda Serrano Correa"],
      description: "Quienes han sido como segundos padres"
    },
    
  ],
  
  // Galería de fotos (característica premium)
  gallery: {
    title: "Galería de Recuerdos",
    subtitle: "Momentos especiales",
    description: "Una colección de mis fotos favoritas preparándome para este gran día",
    images: [
      { 
        src: "/images/paloma01.jpeg", 
        alt: "Paloma Monserrat - Sesión fotográfica 1", 
        caption: "",
        category: "preparacion"
      },
      { 
        src: "/images/paloma02.jpeg", 
        alt: "Paloma Monserrat - Sesión fotográfica 2", 
        caption: "",
        category: "vestido"
      },
      
    ]
  },
  
  // Mensaje final personalizado (característica premium)
  thankYou: {
    title: "¡Gracias por ser parte de uno de los mejores días de mi vida!",
    personalMessage: "Cada uno de ustedes tiene un lugar especial en mi corazón, y no puedo imaginar esta celebración sin su presencia.",
    message: "Con todo mi cariño:",
    signature: "Paloma Monserrat",
    footer: {
      year: "2026",
      name: "PALOMA MONSERRAT XV",
      company: "BY INVITACIONES WEB MX",
      rights: "ALL RIGHTS RESERVED",
      cta: {
        question: "¿TIENES UN EVENTO EN PUERTA?",
        action: "DISEÑA CON NOSOTROS TU INVITACIÓN WEB DIGITAL.",
        linkText: "AQUÍ",
        link: "https://www.invitacionesweb.lat/"
      }
    }
  },
  
  // Configuración premium coquette adicional
  premium: {
    hasMusic: true,
    hasGallery: true,
    hasPadrinos: true,
    hasFullInvitation: true,
    hasPersonalizedThankYou: true,
    badge: "PREMIUM",
    color: "from-coquette-rosa-intenso-500 to-coquette-rosa-claro-400"
  },

  // Colores y tema Coquette Premium (sobrescribe el básico)
  theme: {
    ...basicDemoData.theme,
    primary: "from-coquette-rosa-intenso-500 to-coquette-rosa-intenso-700",
    secondary: "from-coquette-rosa-claro-200 to-coquette-rosa-claro-400",
    accent: "from-plateado-300 to-plateado-500",
    background: "bg-gradient-to-br from-coquette-blanco to-coquette-rosa-claro-50",
    musicPlayer: "bg-coquette-rosa-intenso-400/90",
    gallery: "bg-gradient-to-t from-coquette-rosa-claro-100 to-coquette-blanco",
    padrinos: "bg-gradient-to-br from-coquette-rosa-claro-50 to-plateado-100"
  }
}

export type PremiumDemoData = typeof premiumDemoData 