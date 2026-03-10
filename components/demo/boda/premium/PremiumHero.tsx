"use client"

import { useEffect } from 'react'
import { useMusicContext } from '@/context/music-context'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumHero() {
  const { isPlaying, setIsPlaying } = useMusicContext()

  // Cargar música cuando el componente se monta
  useEffect(() => {
    const audio = new Audio(premiumDemoData.music.track)
    audio.loop = premiumDemoData.music.loop
    
    if (isPlaying) {
      audio.play().catch(console.error)
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [isPlaying])

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
          <span className="text-pink-300 font-script italic">
            {premiumDemoData.hero.name}
          </span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider animate-fade-in-delay">
          {premiumDemoData.hero.subtitle}
        </h2>
        
        {/* Información adicional */}
        <div className="mt-8 space-y-2">
          <p className="text-xl md:text-2xl font-medium">
            {premiumDemoData.event.date.full}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {premiumDemoData.event.ceremony.venue}
          </p>
        </div>

        {/* Indicador de música */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-pink-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm opacity-80">
            {isPlaying ? 'Música romántica reproduciéndose' : 'Música disponible'}
          </span>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Botón de música flotante */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </section>
  )
} 