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

      {/* Overlay dorado exclusivo VIP */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 via-transparent to-yellow-900/30 z-1"></div>

      {/* Music control button VIP - INCLUIDO en paquete VIP */}
      {isClient && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400/30 to-amber-500/30 backdrop-blur-sm flex items-center justify-center text-white hover:from-yellow-400/40 hover:to-amber-500/40 transition-all duration-300 border-2 border-yellow-400/50 shadow-2xl vip-glow"
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          
          {/* Indicador de música VIP */}
          <div className="absolute -bottom-10 right-0 text-white/90 text-xs bg-gradient-to-r from-yellow-600/80 to-amber-600/80 px-3 py-1 rounded-full backdrop-blur-sm font-medium border border-yellow-400/30">
            🎵 VIP Playlist
          </div>
        </div>
      )}

      {/* Badge VIP flotante superior izquierda */}
      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-4 py-2 rounded-full text-sm font-bold shadow-2xl border-2 border-yellow-300 vip-shimmer">
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
              La experiencia más completa para tu boda
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

          {/* Información adicional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 space-y-2"
          >
            <p className="text-xl md:text-2xl font-medium text-white">
              {vipDemoData.event.date.full}
            </p>
            <p className="text-lg md:text-xl text-yellow-100 opacity-90">
              {vipDemoData.event.ceremony.venue}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll indicator VIP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <ChevronDown className="w-5 h-5 text-yellow-400 animate-bounce" />
        </div>
      </motion.div>

      {/* Efectos de brillo VIP */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  )
} 