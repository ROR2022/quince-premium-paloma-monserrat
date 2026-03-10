"use client"

import { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Crown, Sparkles } from 'lucide-react'
import { useMusicContext } from '@/context/music-context'
import { vipDemoData } from './data/vip-demo-data'

export function VipPlaylist() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const { isPlaying, togglePlay, isClient } = useMusicContext()

  const currentTrack = vipDemoData.playlist[currentTrackIndex]

  const handlePlayPause = () => {
    togglePlay()
  }

  const handlePrevious = () => {
    setCurrentTrackIndex(prev => 
      prev === 0 ? vipDemoData.playlist.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentTrackIndex(prev => 
      prev === vipDemoData.playlist.length - 1 ? 0 : prev + 1
    )
  }

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }

  // const formatTime = (timeString: string) => {
  //   return timeString
  // }

  if (!isClient) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2 border-yellow-300">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 fill-current" />
                <span>Característica VIP Enhanced</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
              🎵 PLAYLIST MÚLTIPLE
            </h2>
            
            <div className="flex items-center justify-center mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
              <Crown className="w-8 h-8 text-yellow-500 fill-current" />
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            </div>
            
            <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
              Cargando playlist VIP...
            </p>
          </div>

          {/* Skeleton loading */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 p-8">
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
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
            🎵 PLAYLIST MÚLTIPLE
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            <Crown className="w-8 h-8 text-yellow-500 fill-current" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Disfruta de música personalizada para cada momento especial de nuestra boda. 
            Cada playlist ha sido cuidadosamente seleccionada para crear la atmósfera perfecta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reproductor principal */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-amber-800 mb-2">Reproductor VIP</h3>
              <p className="text-gray-600">Controla la música de tu evento</p>
            </div>

            {/* Track actual */}
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  {currentTrack.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{currentTrack.title}</h4>
                  <p className="text-sm text-gray-600">{currentTrack.description}</p>
                  <p className="text-xs text-amber-600 font-medium">{currentTrack.duration}</p>
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full flex items-center justify-center hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full flex items-center justify-center hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-xl"
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </button>
              
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full flex items-center justify-center hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Control de volumen */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-gray-600 w-12">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          {/* Lista de tracks */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-amber-800 mb-2">Playlist Completa</h3>
              <p className="text-gray-600">Selecciona cualquier momento para reproducir</p>
            </div>

            <div className="space-y-3">
              {vipDemoData.playlist.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${
                    currentTrackIndex === index 
                      ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => handleTrackSelect(index)}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                    currentTrackIndex === index 
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    <span className="text-lg">{track.icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      currentTrackIndex === index ? 'text-amber-800' : 'text-gray-900'
                    }`}>
                      {track.title}
                    </h4>
                    <p className="text-sm text-gray-600">{track.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">{track.duration}</p>
                    {currentTrackIndex === index && isPlaying && (
                      <div className="flex gap-1 mt-1">
                        <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse delay-100"></div>
                        <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse delay-200"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-8 h-8 text-amber-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            Música para Cada Momento
          </h3>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Desde la llegada de invitados hasta la despedida, cada playlist ha sido 
            diseñada para crear la atmósfera perfecta en cada momento de nuestra boda.
          </p>
        </div>

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>💡 Demo:</strong> Esta playlist VIP incluye 5 tracks para diferentes momentos. 
            En tu invitación real, podrás personalizar completamente la música y agregar hasta 20 tracks.
          </p>
        </div>
      </div>
    </section>
  )
} 