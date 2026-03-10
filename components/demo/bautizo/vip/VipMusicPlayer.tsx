"use client"

import { useState, useRef, useEffect, useMemo } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Download } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'
import { useMusicContext } from '@/context/music-context'
import { toast } from "@/components/ui/use-toast"

export function VipMusicPlayer() {
  const { 
    isPlaying, 
    setIsPlaying, 
    currentTrack, 
    setCurrentTrack,
    // Eliminamos las variables no utilizadas pero mantenemos setTracksCount
    setTracksCount
  } = useMusicContext()
  
  const [volume, setVolume] = useState(0.7)
  const [currentCategory, setCurrentCategory] = useState(vipDemoData.music.currentCategory)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Obtener las pistas de la categoría actual con useMemo para evitar recálculos innecesarios
  const tracks = useMemo(() => {
    return vipDemoData.music.tracks[currentCategory as keyof typeof vipDemoData.music.tracks] || []
  }, [currentCategory])
  
  const currentTrackData = tracks[currentTrack || 0]

  // Establecer el número total de pistas en el contexto cuando cambia la categoría
  useEffect(() => {
    if (tracks?.length) {
      setTracksCount?.(tracks.length)
    }
  }, [tracks, setTracksCount])
  
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  // Cambiar la categoría actual y notificar al sistema
  const changeCategory = (categoryId: string) => {
    setCurrentCategory(categoryId)
    setCurrentTrack(0)
    setIsPlaying(false)
    
    // Disparar un evento personalizado para notificar a otros componentes
    const event = new CustomEvent('categoryChange', { detail: { category: categoryId } })
    window.dispatchEvent(event)
    
    toast({
      title: "Categoría cambiada",
      description: `Reproduciendo música ${getCategoryName(categoryId)}`,
      duration: 3000,
    })
  }
  
  // Obtener el nombre legible de una categoría
  const getCategoryName = (categoryId: string) => {
    const category = vipDemoData.music.categories.find(cat => cat.id === categoryId)
    return category?.name || "";
  }

  const handleNextTrack = () => {
    const next = (currentTrack + 1) % tracks.length
    setCurrentTrack(next)
    setIsPlaying(false)
  }

  const handlePrevTrack = () => {
    const prev = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1
    setCurrentTrack(prev)
    setIsPlaying(false)
  }
  
  const handleDownload = () => {
    if (currentTrackData?.file) {
      const link = document.createElement('a')
      link.href = currentTrackData.file
      link.download = `${currentTrackData.title}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast({
        title: "Descarga iniciada",
        description: `Descargando ${currentTrackData.title}`,
        duration: 3000,
      })
    }
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${vipDemoData.music.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {vipDemoData.music.title}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {vipDemoData.music.message}
          </p>
          
          {/* Selector de categorías */}
          <div className="flex justify-center gap-3 mt-6">
            {vipDemoData.music.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => changeCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all ${currentCategory === category.id 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium' 
                  : 'bg-white/20 text-white/90 hover:bg-white/30'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
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
              className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all shadow-lg"
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

          {/* Control de volumen y descarga */}
          <div className="flex items-center justify-center gap-5">
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
            
            {/* Botón de descarga (exclusivo VIP) */}
            <button 
              onClick={handleDownload}
              className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
              title="Descargar pista"
            >
              <Download className="w-3 h-3" />
              <span>VIP</span>
            </button>
          </div>

          {/* Lista de canciones */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Lista de Reproducción {getCategoryName(currentCategory)}</h4>
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTrack(index)
                    setIsPlaying(false)
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentTrack === index
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
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
        {/* Audio element manejado por el componente AudioElement */}
        {/* Controlamos solo el volumen en este componente */}
        {audioRef.current && (audioRef.current.volume = volume)}
      </div>
    </section>
  )
}
