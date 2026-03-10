"use client"

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'
import { useMusicContext } from '@/context/music-context'

export function PremiumMusicPlayer() {
  const { 
    isPlaying, 
    setIsPlaying, 
    currentTrack, 
    setCurrentTrack, 
    nextTrack, 
    prevTrack,
    setTracksCount
  } = useMusicContext()
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Establecer el número total de pistas en el contexto
  useEffect(() => {
    setTracksCount?.(premiumDemoData.music.tracks.length)
  }, [setTracksCount])

  const currentTrackData = premiumDemoData.music.tracks[currentTrack || 0]

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNextTrack = () => {
    nextTrack()
  }

  const handlePrevTrack = () => {
    prevTrack()
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <section 
      className="py-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${premiumDemoData.music.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {premiumDemoData.music.title}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {premiumDemoData.music.message}
          </p>
        </div>

        {/* Reproductor */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          {/* Información de la canción */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              {currentTrackData.title}
            </h3>
            <p className="text-lg opacity-90">
              {currentTrackData.artist}
            </p>
            <p className="text-sm opacity-75">
              Duración: {currentTrackData.duration}
            </p>
          </div>

          {/* Controles principales */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handlePrevTrack}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Control de volumen */}
          <div className="flex items-center justify-center gap-3">
            <Volume2 className="w-5 h-5 opacity-75" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Lista de canciones */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Lista de Reproducción</h4>
            <div className="space-y-2">
              {premiumDemoData.music.tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTrack(index)
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentTrack === index
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
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
        </div>

        {/* Audio element (hidden) */}
        <audio
          ref={audioRef}
          src={currentTrackData.file}
          onEnded={handleNextTrack}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              audioRef.current.volume = volume
            }
          }}
        />
      </div>
    </section>
  )
}
