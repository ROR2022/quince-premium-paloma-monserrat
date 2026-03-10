import { basicDemoData } from '@/components/demo/boda/basic/data/basic-demo-data'

// Datos demo para el paquete premium de boda
export const premiumDemoData = {
  // Heredar todos los datos del básico
  ...basicDemoData,
  
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
    title: "Música Romántica",
    track: "/music/romantic-wedding1.mp3",
    autoplay: false, // Por UX, mejor no autoplay automático
    loop: true,
    description: "Música romántica para nuestro día especial"
  },
  
  // Información completa de invitación (característica premium)
  invitation: {
    title: "INVITACIÓN DE BODA",
    message: "Con gran alegría les invitamos a celebrar",
    subtitle: "Nuestra Boda",
    blessing: "con la bendición de Dios y nuestros padres:",
    celebrants: basicDemoData.event.celebrants,
    parents: basicDemoData.event.parents,
    decorativeMessage: "Los esperamos en este día tan especial"
  },
  
  // Lista de padrinos (característica premium NUEVA)
  padrinos: [
    { 
      role: "Padrinos de Honor", 
      names: ["Carlos Rivera González", "María Elena Sosa Martínez"],
      description: "Quienes han sido como segundos padres"
    },
    { 
      role: "Padrinos de los Anillos", 
      names: ["Roberto González Silva", "Ana Isabel Martínez López"],
      description: "Por ser testigos de nuestro compromiso"
    },
    { 
      role: "Padrinos del Ramo", 
      names: ["Luis Alberto Hernández", "Carmen Rosa López Vega"],
      description: "Por las flores más hermosas"
    },
    { 
      role: "Padrinos de la Música", 
      names: ["Jorge Eduardo Ramírez", "Sofía Alejandra Torres"],
      description: "Por llenar de melodía nuestra celebración"
    },
    { 
      role: "Padrinos del Vals", 
      names: ["Fernando José García", "Lucía Mercedes Herrera"],
      description: "Por hacer mágico nuestro primer vals"
    },
    { 
      role: "Padrinos de las Arras", 
      names: ["Miguel Ángel Ruiz", "Rosa María Jiménez"],
      description: "Por bendecir nuestra unión"
    }
  ],
  
  // Galería de fotos (característica premium)
  gallery: {
    title: "Galería de Amor",
    subtitle: "Momentos especiales de Ana & Carlos",
    description: "Una colección de nuestras fotos favoritas preparándonos para este gran día",
    images: [
      { 
        src: "/images/boda/boda1.jpeg", 
        alt: "Ana & Carlos - Sesión fotográfica 1", 
        caption: "Preparándonos para nuestro día especial",
        category: "preparacion"
      },
      { 
        src: "/images/boda/boda2.jpeg", 
        alt: "Ana & Carlos - Sesión fotográfica 2", 
        caption: "Juntos para siempre",
        category: "amor"
      },
      { 
        src: "/images/boda/boda3.jpeg", 
        alt: "Ana & Carlos - Sesión fotográfica 3", 
        caption: "Momentos de alegría",
        category: "alegria"
      },
      { 
        src: "/images/boda/boda4.jpeg", 
        alt: "Ana & Carlos - Sesión fotográfica 4", 
        caption: "Listos para celebrar",
        category: "celebracion"
      }
    ]
  },
  
  // Mensaje final personalizado (característica premium)
  thankYou: {
    title: "¡Gracias por ser parte de uno de los mejores días de nuestras vidas!",
    personalMessage: "Cada uno de ustedes tiene un lugar especial en nuestros corazones, y no podemos imaginar esta celebración sin su presencia.",
    message: "Con todo nuestro cariño:",
    signature: "Ana & Carlos",
    footer: {
      year: "2024",
      name: "ANA & CARLOS WEDDING",
      company: "BY INVITACIONES WEB MX",
      rights: "ALL RIGHTS RESERVED",
      cta: {
        question: "¿TIENES UN EVENTO EN PUERTA?",
        action: "DISEÑA CON NOSOTROS TU INVITACIÓN WEB DIGITAL.",
        linkText: "AQUÍ",
        link: "/"
      }
    }
  },
  
  // Configuración premium adicional
  premium: {
    hasMusic: true,
    hasGallery: true,
    hasPadrinos: true,
    hasFullInvitation: true,
    hasPersonalizedThankYou: true,
    badge: "PREMIUM",
    color: "from-purple-600 to-pink-600"
  }
}

export type PremiumDemoData = typeof premiumDemoData 