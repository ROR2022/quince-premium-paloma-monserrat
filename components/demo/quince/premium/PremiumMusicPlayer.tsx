"use client"

import { useEffect, useRef } from "react"
import { useMusicContext } from "@/context/music-context"
import { premiumDemoData } from "./data/premium-demo-data"

export function PremiumMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { isPlaying, setIsPlaying, isClient } = useMusicContext()

  // Inicializar audio y event listeners solo en cliente
  useEffect(() => {
    if (!isClient) return

    // Usar la música específica del paquete premium
    audioRef.current = new Audio(premiumDemoData.music.track)
    audioRef.current.loop = premiumDemoData.music.loop

    const handleUserInteraction = () => {
      if (audioRef.current && !audioRef.current.paused) return

      audioRef.current
        ?.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error("Error playing premium audio:", error)
        })

      // Remove event listeners after first interaction
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }

    // Solo auto-iniciar si está configurado (actualmente está en false)
    if (premiumDemoData.music.autoplay) {
      document.addEventListener("click", handleUserInteraction)
      document.addEventListener("touchstart", handleUserInteraction)
    }

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
        console.error("Error playing premium audio:", error)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isClient])

  return null
} 