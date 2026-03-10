"use client"

import { useRef, useEffect } from 'react'
import { useMusicContext } from '@/context/music-context'
import { premiumDemoData } from './data/premium-demo-data'

export function AudioElement() {
  const { 
    isPlaying, 
    setIsPlaying, 
    currentTrack 
  } = useMusicContext()
  const audioRef = useRef<HTMLAudioElement>(null)
  
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
  }, [isPlaying, currentTrack, setIsPlaying])
  
  // Obtenemos la pista actual desde los datos
  const currentTrackData = premiumDemoData.music.tracks[currentTrack || 0]
  
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
