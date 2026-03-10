"use client"

import { useMusicContext } from '@/context/music-context'
import { useState } from 'react'
import { vipDemoData } from './data/vip-demo-data'
import { Music } from 'lucide-react'

export function FloatingMusicPlayer() {
  const { isPlaying, togglePlay, currentTrack, isClient } = useMusicContext()
  const [showTooltip, setShowTooltip] = useState(false)
  // Usamos directamente 'religious' como categoría por defecto sin necesidad de estado
  const currentCategory = 'religious'

  // No hay necesidad de realizar cambios si estamos en el servidor
  if (!isClient) return null

  // Obtenemos los datos actuales
  const tracks = vipDemoData.music.tracks[currentCategory as keyof typeof vipDemoData.music.tracks] || []
  const currentTrackData = tracks[currentTrack || 0]
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Controles de música flotantes */}
      <div 
        className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-yellow-200 transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          onClick={togglePlay}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <div className="flex items-center justify-center">
              <span className="block h-2 w-1 mx-0.5 bg-amber-900 animate-music-bar-1"></span>
              <span className="block h-3 w-1 mx-0.5 bg-amber-900 animate-music-bar-2"></span>
              <span className="block h-4 w-1 mx-0.5 bg-amber-900 animate-music-bar-3"></span>
              <span className="block h-2 w-1 mx-0.5 bg-amber-900 animate-music-bar-4"></span>
            </div>
          ) : (
            <Music className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Indicador de música VIP activa */}
      {isPlaying && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-pulse shadow-md shadow-yellow-300/50">
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-amber-900">VIP</span>
        </div>
      )}

      {/* Tooltip con información de la canción actual */}
      {showTooltip && isPlaying && (
        <div className="absolute bottom-20 right-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-yellow-200 p-3 w-56">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
              <Music className="w-4 h-4 text-amber-900" />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900 truncate">
                {currentTrackData && currentTrackData.title ? currentTrackData.title : "Música VIP"}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {currentTrackData && currentTrackData.artist ? currentTrackData.artist : ""}
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-md p-1.5 text-xs text-amber-900 font-medium text-center">
            Selección musical exclusiva VIP
          </div>
        </div>
      )}
    </div>
  )
}
