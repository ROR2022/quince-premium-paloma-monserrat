"use client"

import { premiumDemoData } from './data/premium-demo-data'

export function PremiumHero() {
  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${premiumDemoData.hero.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay de gradiente premium */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in">
          <span className="text-purple-300 font-script italic">
            {premiumDemoData.hero.name}
          </span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider animate-fade-in-delay">
          {premiumDemoData.hero.subtitle}
        </h2>
        
        {/* Información del bebé */}
        <div className="mt-8 space-y-2">
          <p className="text-xl md:text-2xl font-medium">
            {premiumDemoData.event.celebrant.age} • {premiumDemoData.event.celebrant.birthDate}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {premiumDemoData.event.ceremony.venue}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {premiumDemoData.event.ceremony.time}
          </p>
        </div>

        {/* Badge premium */}
        <div className="mt-8">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
            {premiumDemoData.demo.badge}
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
