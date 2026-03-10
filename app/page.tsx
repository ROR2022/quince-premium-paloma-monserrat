import { PremiumMusicPlayer } from '@/components/demo/quince/premium'
import { PremiumHero } from '@/components/demo/quince/premium'
import { PremiumInvitation } from '@/components/demo/quince/premium'
import { BasicCountdown } from '@/components/demo/quince/basic'
import { BasicEventDetails } from '@/components/demo/quince/basic'
import { PremiumGallery } from '@/components/demo/quince/premium'
import { PremiumPadrinos } from '@/components/demo/quince/premium'
import { BasicAttendance } from '@/components/demo/quince/basic'
import { BasicGiftOptions } from '@/components/demo/quince/basic'
import { PremiumThankYou } from '@/components/demo/quince/premium'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Music Player premium (invisible, maneja el audio) */}
      <PremiumMusicPlayer />
      
      {/* Hero premium con música */}
      <PremiumHero />
      
      {/* Información de padres (premium) */}
      <PremiumInvitation />
      
      {/* Características básicas reutilizadas */}
      <BasicCountdown />
      <BasicEventDetails />
      
      {/* Características premium exclusivas */}
      <PremiumGallery />
      <PremiumPadrinos />
      
      {/* Confirmación y regalos (reutilizados del básico) */}
      <BasicAttendance />
      <BasicGiftOptions />
      
      {/* Mensaje final premium */}
      <PremiumThankYou />
      
    </div>
  )
}
