"use client"

import { vipDemoData } from './data/vip-demo-data'

export function VipHero() {
  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${vipDemoData.hero.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay de gradiente VIP */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/30 to-orange-900/30"></div>
      
      {/* Efectos de partículas VIP */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-orange-300 rounded-full animate-pulse delay-3000"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in">
          <span className="text-yellow-300 font-script italic">
            {vipDemoData.hero.name}
          </span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider animate-fade-in-delay">
          {vipDemoData.hero.subtitle}
        </h2>
        
        {/* Información del bebé */}
        <div className="mt-8 space-y-2">
          <p className="text-xl md:text-2xl font-medium">
            {vipDemoData.event.celebrant.age} • {vipDemoData.event.celebrant.birthDate}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {vipDemoData.event.ceremony.venue}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {vipDemoData.event.ceremony.time}
          </p>
        </div>

        {/* Badge VIP */}
        <div className="mt-8">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg animate-pulse">
            {vipDemoData.demo.badge}
          </div>
        </div>

        {/* Indicadores VIP */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            🏨 Hospedaje Incluido
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            📅 Itinerario Completo
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            🎵 Playlist Múltiple
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
