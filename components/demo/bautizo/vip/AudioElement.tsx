"use client"

import { useRef, useEffect, useState } from 'react'
import { useMusicContext } from '@/context/music-context'
import { vipDemoData } from './data/vip-demo-data'

export function AudioElement() {
  const { 
    isPlaying, 
    setIsPlaying, 
    currentTrack
  } = useMusicContext()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentCategory, setCurrentCategory] = useState(vipDemoData.music.currentCategory)
  
  // Definir interfaz para evento personalizado
  interface CategoryChangeEvent extends Event {
    detail: {
      category: string
    }
  }

  // Actualizar la categoría actual cuando cambie en los datos
  useEffect(() => {
    const handleCategoryChange = (event: CategoryChangeEvent) => {
      setCurrentCategory(event.detail.category)
    }
    
    // Usar el tipo correcto para eventos personalizados
    window.addEventListener('categoryChange', handleCategoryChange as unknown as EventListener)
    
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange as unknown as EventListener)
    }
  }, [])

  // Manejo de reproducción cuando cambia el estado isPlaying o la pista actual
  useEffect(() => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      // Intentar reproducir y manejar posibles errores (por ejemplo, políticas de autoplay)
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error al reproducir audio:', error)
          setIsPlaying(false)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentTrack, setIsPlaying, currentCategory])
  
  // Obtenemos la pista actual desde los datos según la categoría
  const tracks = vipDemoData.music.tracks[currentCategory as keyof typeof vipDemoData.music.tracks] || []
  const currentTrackData = tracks[currentTrack || 0]
  
  return (
    <audio
      ref={audioRef}
      src={currentTrackData?.file || ''}
      onEnded={() => setIsPlaying(false)}
      preload="metadata"
      style={{ display: 'none' }}
    />
  )
}
