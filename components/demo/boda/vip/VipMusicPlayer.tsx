"use client"

import { useEffect, useRef, useCallback } from "react"
import { useMusicContext } from "@/context/music-context"
import { vipDemoData } from "./data/vip-demo-data"

export function VipMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { isPlaying, setIsPlaying, isClient } = useMusicContext()

  // Inicializar audio y event listeners solo en cliente
  useEffect(() => {
    if (!isClient) return

    // Usar la música del primer track de la playlist VIP
    const defaultTrack = vipDemoData.playlist[0]?.track || "/music/romantic-wedding1.mp3"
    audioRef.current = new Audio(defaultTrack)
    audioRef.current.loop = true // Loop por defecto para música de fondo

    const handleUserInteraction = () => {
      if (audioRef.current && !audioRef.current.paused) return

      audioRef.current
        ?.play()
        .then(() => {
          setIsPlaying(true)
          console.log("🎵 VIP Audio iniciado correctamente")
        })
        .catch((error) => {
          console.error("❌ Error reproduciendo VIP audio:", error)
        })

      // Remove event listeners after first interaction
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }

    // Auto-iniciar con interacción del usuario
    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)

    return () => {
      audioRef.current?.pause()
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [setIsPlaying, isClient])

  // Control de reproducción solo en cliente
  useEffect(() => {
    if (!isClient || !audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("❌ Error reproduciendo VIP audio:", error)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isClient])

  // Función para cambiar de track (para uso futuro)
  const changeTrack = useCallback((trackPath: string) => {
    if (!isClient || !audioRef.current) return

    const wasPlaying = !audioRef.current.paused
    audioRef.current.src = trackPath
    audioRef.current.load()

    if (wasPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("❌ Error cambiando track VIP:", error)
      })
    }
  }, [isClient])

  // Exponer función para uso externo (opcional)
  useEffect(() => {
    if (isClient) {
      (window as typeof window & { 
        vipMusicPlayer?: {
          changeTrack: (trackPath: string) => void;
          audioRef: HTMLAudioElement | null;
        }
      }).vipMusicPlayer = {
        changeTrack,
        audioRef: audioRef.current
      }
    }
  }, [isClient, changeTrack])

  return null
} 