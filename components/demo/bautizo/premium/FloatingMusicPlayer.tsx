"use client"

import { useMusicContext } from '@/context/music-context'
import { useState } from 'react'
import { premiumDemoData } from './data/premium-demo-data'

export function FloatingMusicPlayer() {
  const { isPlaying, currentTrack, togglePlay, isClient } = useMusicContext()
  const [showTooltip, setShowTooltip] = useState(false)

  // No hay necesidad de realizar cambios si estamos en el servidor
  if (!isClient) return null

  const currentTrackData = premiumDemoData.music.tracks[currentTrack || 0]
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Controles de música flotantes */}
      <div 
        className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Indicador de música activa */}
      {isPlaying && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      )}

      {/* Tooltip con información de la canción actual */}
      {showTooltip && isPlaying && (
        <div className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3 w-48">
          <p className="font-medium text-sm text-gray-900 truncate">
            {currentTrackData?.title || "Música"}
          </p>
          <p className="text-xs text-gray-600 truncate">
            {currentTrackData?.artist || ""}
          </p>
        </div>
      )}
    </div>
  )
}
