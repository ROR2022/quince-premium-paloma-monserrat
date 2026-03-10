import { useIsMobile } from "@/hooks/use-mobile"

type CarouselIndicatorsProps = {
  count: number
  currentIndex: number
  onSelect: (index: number) => void
}

export function CarouselIndicators({ count, currentIndex, onSelect }: CarouselIndicatorsProps) {
  const isMobile = useIsMobile()
  
  if (count <= 0) return null
  
  return (
    <div className={`absolute left-0 right-0 z-10 flex justify-center gap-2 ${
      isMobile 
        ? 'bottom-4 gap-2 sm:bottom-6 sm:gap-2.5 md:bottom-8 md:gap-3' // Breakpoints granulares para móviles
        : 'bottom-24 gap-2' // En desktop: posición original
    }`}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`rounded-full transition-all duration-300 ${
            index === currentIndex
              ? 'bg-rosa-gold-500 shadow-lg shadow-rosa-gold-500/50' // Activo
              : 'bg-white/30 hover:bg-white/50 backdrop-blur-sm' // Inactivo
          } ${
            isMobile 
              ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3' // Breakpoints granulares para móviles
              : 'w-3 h-3' // En desktop: tamaño original
          }`}
          onClick={() => onSelect(index)}
          aria-label={`Ir a slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
