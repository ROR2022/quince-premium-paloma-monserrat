"use client"

import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2,
  Crown,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicContext } from "@/context/music-context"
import { vipDemoData } from "./data/vip-demo-data"

export function VipPlaylist() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { isPlaying, togglePlay, isClient } = useMusicContext()
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTrackSelect = (index: number) => {
    if (!isClient) return
    setCurrentTrack(index)
    // En un caso real, aquí cambiaríamos la canción del contexto
  }

  const handleNextTrack = () => {
    if (!isClient) return
    const nextIndex = (currentTrack + 1) % vipDemoData.playlist.length
    setCurrentTrack(nextIndex)
  }

  const toggleExpanded = () => {
    if (!isClient) return
    setIsExpanded(!isExpanded)
  }

  const getCurrentMoment = () => {
    return vipDemoData.playlist[currentTrack]
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header VIP */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2 border-yellow-300">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 fill-current" />
              <span>Característica VIP Enhanced</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            🎵 PLAYLIST VIP
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            <Music className="w-8 h-8 text-yellow-500" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Playlist curada con múltiples canciones organizadas por momento del evento. 
            Cada momento tiene su música perfecta.
          </p>
        </div>

        {/* Reproductor principal */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-100 p-8 mb-8 vip-glow">
          {/* Display de la canción actual */}
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl text-white mb-4">
              <div className="text-4xl mb-2">{getCurrentMoment().icon}</div>
              <h3 className="text-xl font-bold">{getCurrentMoment().title}</h3>
            </div>
            <p className="text-amber-600 text-lg mb-2">{getCurrentMoment().description}</p>
            <p className="text-amber-500 text-sm">{getCurrentMoment().duration}</p>
          </div>

          {/* Controles principales */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <Button
              onClick={handleNextTrack}
              variant="outline"
              size="lg"
              disabled={!isClient}
              className="border-yellow-300 text-amber-700 hover:bg-yellow-50"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={togglePlay}
              size="lg"
              disabled={!isClient}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-900 shadow-xl"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              disabled={!isClient}
              className="border-yellow-300 text-amber-700 hover:bg-yellow-50"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Indicador de progreso simulado */}
          <div className="relative">
            <div className="w-full h-2 bg-yellow-100 rounded-full">
              <div 
                className="h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: isPlaying ? '45%' : '0%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-amber-600 mt-2">
              <span>1:24</span>
              <span>{getCurrentMoment().duration}</span>
            </div>
          </div>
        </div>

        {/* Lista de playlist */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 p-4 cursor-pointer"
            onClick={toggleExpanded}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <Music className="w-5 h-5" />
                Playlist Completa ({vipDemoData.playlist.length} canciones)
              </h4>
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-900 hover:bg-amber-600/20"
              >
                {isExpanded ? 'Contraer' : 'Ver todas'}
              </Button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="p-6 space-y-3">
              {vipDemoData.playlist.map((track, index) => (
                <div 
                  key={track.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    currentTrack === index 
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleTrackSelect(index)}
                >
                  {/* Icono del momento */}
                  <div className={`p-3 rounded-xl text-white ${
                    currentTrack === index 
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                      : 'bg-gray-400'
                  }`}>
                    <span className="text-lg">{track.icon}</span>
                  </div>
                  
                  {/* Información de la canción */}
                  <div className="flex-1">
                    <h5 className={`font-semibold ${
                      currentTrack === index ? 'text-amber-800' : 'text-gray-800'
                    }`}>
                      {track.title}
                    </h5>
                    <p className={`text-sm ${
                      currentTrack === index ? 'text-amber-600' : 'text-gray-600'
                    }`}>
                      {track.description}
                    </p>
                  </div>
                  
                  {/* Duración */}
                  <div className={`text-sm font-mono ${
                    currentTrack === index ? 'text-amber-700' : 'text-gray-500'
                  }`}>
                    {track.duration}
                  </div>
                  
                  {/* Indicador de reproducción */}
                  {currentTrack === index && isPlaying && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Características de la playlist VIP */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Información de la playlist */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-yellow-100">
            <h4 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600 fill-current" />
              Playlist Personalizada
            </h4>
            <div className="space-y-3 text-sm text-amber-700">
              <div className="flex items-center justify-between">
                <span>Total de canciones:</span>
                <span className="font-semibold">{vipDemoData.playlist.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Duración aproximada:</span>
                <span className="font-semibold">20 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Momentos cubiertos:</span>
                <span className="font-semibold">5 diferentes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Calidad de audio:</span>
                <span className="font-semibold">Premium</span>
              </div>
            </div>
          </div>
          
          {/* Características VIP */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-yellow-100">
            <h4 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              Características VIP
            </h4>
            <div className="space-y-3 text-sm text-amber-700">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Música organizada por momento del evento</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Transiciones automáticas suaves</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Control total de reproducción</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Canciones libres de derechos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nota explicativa VIP */}
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl border-2 border-yellow-200 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-yellow-600 fill-current flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-amber-800 mb-2">Experiencia Musical VIP</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                La playlist VIP incluye múltiples canciones cuidadosamente seleccionadas para cada 
                momento de tu evento. Desde la llegada de invitados hasta la despedida final, 
                cada momento tiene su banda sonora perfecta.
              </p>
              <div className="mt-3 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-amber-600">
                  💎 <strong>VIP Enhanced:</strong> La playlist múltiple con organización por momentos 
                  es una mejora exclusiva del paquete VIP sobre la música básica del Premium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 