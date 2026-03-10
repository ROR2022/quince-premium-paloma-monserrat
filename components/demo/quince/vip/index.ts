// Componentes VIP exclusivos (NUEVOS)
export { VipHero } from './VipHero'
export { VipAccommodation } from './VipAccommodation'
export { VipItinerary } from './VipItinerary'
export { VipGuestPasses } from './VipGuestPasses'

// Componentes VIP enhanced (MEJORADOS)
export { VipPlaylist } from './VipPlaylist'
export { VipGallery } from './VipGallery'

// Datos del demo VIP
export { vipDemoData, type VipDemoData } from './data/vip-demo-data'

// Componentes básicos y premium reutilizados (re-export para conveniencia)
export {
  BasicCountdown,
  BasicEventDetails,
  BasicAttendance,
  BasicGiftOptions
} from '@/components/demo/quince/basic'

export {
  PremiumInvitation,
  PremiumPadrinos,
  PremiumThankYou,
  PremiumMusicPlayer
} from '@/components/demo/quince/premium'

// RESUMEN COMPLETO DEL PAQUETE VIP:
// ====================================
// 
// ✅ CARACTERÍSTICAS BÁSICAS (heredadas):
// - Cuenta Regresiva
// - Cuándo y dónde  
// - Confirmación de asistencia
// - Opciones de regalo
// - Código de vestimenta
//
// ✅ CARACTERÍSTICAS PREMIUM (heredadas):
// - Música personalizada
// - Galería de fotos
// - Lista de padrinos
// - Invitación completa con padres
// - Mensaje final personalizado
//
// 🌟 CARACTERÍSTICAS VIP EXCLUSIVAS (NUEVAS):
// - 🏨 Hospedaje recomendado (VipAccommodation)
// - 📅 Itinerario completo (VipItinerary)  
// - 🎫 Pases de invitados (VipGuestPasses)
//
// ✨ CARACTERÍSTICAS VIP ENHANCED (MEJORADAS):
// - 🎵 Playlist múltiple por momentos (VipPlaylist)
// - 📸 Galería categorizada con vistas (VipGallery)
//
// 💎 TOTAL: 11 características (5 básicas + 3 premium + 3 VIP exclusivas)
// 🎯 PRECIO: $899 (vs $499 básico, $699 premium)
// 👑 ENFOQUE: Logística completa + experiencia premium integral 