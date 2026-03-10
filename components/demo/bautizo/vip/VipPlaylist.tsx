"use client"

import { useState } from 'react'
import { Music, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipPlaylist() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)

  const currentCategory = vipDemoData.playlist.categories[selectedCategory]
  const currentTrackData = currentCategory.tracks[currentTrack]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const next = (currentTrack + 1) % currentCategory.tracks.length
    setCurrentTrack(next)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    const prev = currentTrack === 0 ? currentCategory.tracks.length - 1 : currentTrack - 1
    setCurrentTrack(prev)
    setIsPlaying(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {vipDemoData.playlist.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {vipDemoData.playlist.message}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Selector de categorías */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {vipDemoData.playlist.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(index)
                  setCurrentTrack(0)
                  setIsPlaying(false)
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === index
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border border-yellow-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Reproductor principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-yellow-200">
          {/* Información de la canción actual */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentTrackData.title}
            </h3>
            <p className="text-lg text-gray-600 mb-1">
              {currentTrackData.artist}
            </p>
            <p className="text-sm text-gray-500">
              Duración: {currentTrackData.duration}
            </p>
          </div>

          {/* Controles principales */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={prevTrack}
              className="w-12 h-12 bg-yellow-100 hover:bg-yellow-200 rounded-full flex items-center justify-center transition-colors"
            >
              <SkipBack className="w-6 h-6 text-yellow-600" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
            </button>

            <button
              onClick={nextTrack}
              className="w-12 h-12 bg-yellow-100 hover:bg-yellow-200 rounded-full flex items-center justify-center transition-colors"
            >
              <SkipForward className="w-6 h-6 text-yellow-600" />
            </button>
          </div>

          {/* Control de volumen */}
          <div className="flex items-center justify-center gap-3">
            <Volume2 className="w-5 h-5 text-yellow-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Lista de canciones por categoría */}
        <div className="grid md:grid-cols-3 gap-6">
          {vipDemoData.playlist.categories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.tracks.map((track, trackIndex) => (
                  <button
                    key={trackIndex}
                    onClick={() => {
                      setSelectedCategory(categoryIndex)
                      setCurrentTrack(trackIndex)
                      setIsPlaying(false)
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === categoryIndex && currentTrack === trackIndex
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                        : 'bg-yellow-50 hover:bg-yellow-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{track.title}</p>
                        <p className="text-sm opacity-75">{track.artist}</p>
                      </div>
                      <span className="text-sm opacity-75">{track.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Música para Todos los Momentos
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🎵 Música Religiosa</h4>
              <p className="text-yellow-100 text-sm">
                Para la ceremonia y momentos solemnes
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">👶 Música Infantil</h4>
              <p className="text-yellow-100 text-sm">
                Para entretener a los más pequeños
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎉 Música Familiar</h4>
              <p className="text-yellow-100 text-sm">
                Para celebrar y bailar en familia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
