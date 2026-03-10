"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useIsClient } from "@/hooks/useIsClient"

type MusicContextType = {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  togglePlay: () => void
  isClient: boolean
  currentTrack: number
  setCurrentTrack: (trackIndex: number) => void
  nextTrack: () => void
  prevTrack: () => void
  tracksCount?: number
  setTracksCount?: (count: number) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [tracksCount, setTracksCount] = useState(1)
  const isClient = useIsClient()

  const togglePlay = () => {
    if (!isClient) return
    setIsPlaying(!isPlaying)
  }

  const safeSetIsPlaying = (playing: boolean) => {
    if (!isClient) return
    setIsPlaying(playing)
  }
  
  const safeSetCurrentTrack = (trackIndex: number) => {
    if (!isClient) return
    setCurrentTrack(trackIndex)
  }
  
  const nextTrack = () => {
    if (!isClient || tracksCount <= 1) return
    const next = (currentTrack + 1) % tracksCount
    setCurrentTrack(next)
    setIsPlaying(false) // Reset playing state when changing track
  }
  
  const prevTrack = () => {
    if (!isClient || tracksCount <= 1) return
    const prev = currentTrack === 0 ? tracksCount - 1 : currentTrack - 1
    setCurrentTrack(prev)
    setIsPlaying(false) // Reset playing state when changing track
  }

  return (
    <MusicContext.Provider value={{ 
      isPlaying, 
      setIsPlaying: safeSetIsPlaying, 
      togglePlay,
      isClient,
      currentTrack,
      setCurrentTrack: safeSetCurrentTrack,
      nextTrack,
      prevTrack,
      tracksCount,
      setTracksCount
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusicContext() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusicContext must be used within a MusicProvider")
  }
  return context
}
