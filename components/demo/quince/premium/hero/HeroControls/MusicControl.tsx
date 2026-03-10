import { Play, Pause } from "lucide-react"

type MusicControlProps = {
  isPlaying: boolean
  onToggle: () => void
  isClient: boolean
}

export function MusicControl({ isPlaying, onToggle, isClient }: MusicControlProps) {
  if (!isClient) return null
  
  return (
    <div className="fixed top-4 right-4 z-20">
      <button
        onClick={onToggle}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-coquette-rosa-intenso-500/20 to-coquette-rosa-intenso-600/20 backdrop-blur-sm flex items-center justify-center text-white hover:from-coquette-rosa-intenso-500/30 hover:to-coquette-rosa-intenso-600/30 transition-all duration-300 border border-plateado-300/20 shadow-lg"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      {/* Indicador de música premium */}
      <div 
      style={{display:'none'}}
      className="absolute -bottom-8 right-0 text-white/80 text-xs bg-plateado-800/20 px-2 py-1 rounded-full backdrop-blur-sm border border-plateado-300/20">
        🎵 Premium
      </div>
    </div>
  )
}
