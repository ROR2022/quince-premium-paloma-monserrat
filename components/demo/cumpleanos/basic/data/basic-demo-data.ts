export const basicDemoData = {
  // Información del celebrante
  hero: {
    name: "Pequeño Sheriff Juan",
    subtitle: "¡Se va de aventura por el Salvaje Oeste!",
    backgroundImage: "/images/cumple/vaqueros/vaqueros1.png"
  },

  // Información del evento
  event: {
    celebrant: {
      name: "Juan Carlos",
      age: "6 años",
      birthDate: "15 de Enero de 2018"
    },
    parents: {
      father: "Carlos Rodríguez",
      mother: "María González"
    },
    padrinos: {
      padrino: "Roberto Martínez",
      madrina: "Ana López"
    },
    ceremony: {
      date: "Sábado 15 de Enero, 2024",
      time: "3:00 PM",
      location: "Rancho Los Vaqueros",
      address: "Carretera del Oeste Km 5, Valle Verde"
    },
    celebration: {
      date: "Sábado 15 de Enero, 2024", 
      time: "4:00 PM",
      location: "Salón de Fiestas El Corral",
      address: "Av. Revolución 123, Col. Centro"
    },
    dressCode: "Temática vaquera: sombreros, botas y pañuelos",
    restrictions: "Por favor, no traer juguetes con sonidos muy fuertes"
  },

  // Cronograma del evento
  timeline: [
    {
      time: "3:00 PM",
      activity: "Llegada de los invitados",
      description: "Recepción en la entrada del rancho",
      icon: "🤠"
    },
    {
      time: "3:30 PM", 
      activity: "Juegos del Oeste",
      description: "Búsqueda del tesoro perdido y tiro al blanco",
      icon: "🎯"
    },
    {
      time: "4:30 PM",
      activity: "Espectáculo de vaqueros",
      description: "Show especial con caballos y trucos",
      icon: "🐎"
    },
    {
      time: "5:30 PM",
      activity: "Hora del pastel",
      description: "Feliz cumpleaños y foto grupal",
      icon: "🎂"
    },
    {
      time: "6:00 PM",
      activity: "Cena estilo BBQ",
      description: "Deliciosa comida del oeste",
      icon: "🍖"
    },
    {
      time: "7:00 PM",
      activity: "Baile y diversión",
      description: "Música country para toda la familia",
      icon: "🎵"
    }
  ],

  // Colores y tema
  theme: {
    primary: "from-amber-600 to-orange-600",
    secondary: "from-yellow-500 to-amber-500", 
    accent: "from-red-600 to-red-700",
    background: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-900"
  },

  // Información del demo
  demo: {
    badge: "🤠 DEMO - Paquete Básico ($299)",
    description: "Esta es una demostración del paquete básico para cumpleaños temáticos",
    features: [
      "Invitación digital personalizada",
      "Cronograma del evento",
      "Información completa",
      "Diseño temático vaquero",
      "Responsive en todos los dispositivos",
      "Entrega en 24-48 horas"
    ],
    cta: {
      title: "¿Te gusta el paquete Básico?",
      subtitle: "Perfecto para celebraciones temáticas divertidas",
      buttonText: "Contratar Paquete Básico - $299",
      link: "/#pricing"
    }
  }
}
