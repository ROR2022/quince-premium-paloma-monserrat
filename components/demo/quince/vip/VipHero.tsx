"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Play, Pause, Crown, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useMusicContext } from "@/context/music-context"
import { vipDemoData } from "./data/vip-demo-data"

export function VipHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isPlaying, togglePlay, isClient } = useMusicContext()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('${vipDemoData.hero.backgroundImage}')`,
          filter: "brightness(0.6)",
        }}
      />

      {/* Overlay coquette exclusivo VIP */}
      <div className="absolute inset-0 bg-gradient-to-b from-coquette-rosa-intenso-600/20 via-transparent to-plateado-400/30 z-1"></div>

      {/* Music control button VIP - INCLUIDO en paquete VIP */}
      {isClient && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-coquette-rosa-intenso-400/30 to-plateado-400/30 backdrop-blur-sm flex items-center justify-center text-white hover:from-coquette-rosa-intenso-400/40 hover:to-plateado-400/40 transition-all duration-300 border-2 border-coquette-rosa-intenso-400/50 shadow-2xl coquette-shadow"
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          
          {/* Indicador de música VIP */}
          <div className="absolute -bottom-10 right-0 text-white/90 text-xs bg-gradient-to-r from-coquette-rosa-intenso-600/80 to-plateado-500/80 px-3 py-1 rounded-full backdrop-blur-sm font-medium border border-coquette-rosa-intenso-400/30">
            🎵 VIP Playlist
          </div>
        </div>
      )}

      {/* Badge VIP flotante superior izquierda */}
      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-coquette-rosa-intenso-400 to-plateado-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl border-2 border-coquette-rosa-intenso-300 coquette-shimmer">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 fill-current" />
          <span>VIP EXCLUSIVO</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Contenido principal */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="z-10 text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-yellow-200 text-xl mb-2 font-light tracking-wider"
          >
            {vipDemoData.hero.subtitle}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="font-script text-6xl md:text-8xl text-white mb-6 vip-text-gradient drop-shadow-2xl"
          >
            {vipDemoData.hero.name}
          </motion.h1>
          
          {/* Mensaje VIP exclusivo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 max-w-2xl mx-auto"
          >
            <p className="text-white text-lg md:text-xl font-light tracking-wide leading-relaxed">
              La experiencia más completa para tu quinceañera
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-yellow-200 text-sm">
              <span className="flex items-center gap-1">
                <span>🏨</span>
                <span>Hospedaje</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>📅</span>
                <span>Itinerario</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>🎫</span>
                <span>Pases VIP</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Indicador de scroll VIP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-white z-10"
      >
        <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-400/30 mb-4">
          <p className="text-center font-medium">Desliza para ver tu experiencia VIP completa</p>
        </div>
        <ChevronDown className="animate-bounce w-6 h-6 text-yellow-300" />
      </motion.div>

      {/* Efectos de partículas doradas (simuladas con CSS) */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-coquette-rosa-intenso-400 rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-coquette-rosa-claro-300 rounded-full opacity-40 animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-coquette-rosa-intenso-500 rounded-full opacity-50 animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-amber-400 rounded-full opacity-30 animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>
    </section>
  )
} 