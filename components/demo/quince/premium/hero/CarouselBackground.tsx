import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi
} from "@/components/ui/carousel"
import { useIsMobile } from "@/hooks/use-mobile"
import { premiumDemoData } from "../data/premium-demo-data"

export type CarouselBackgroundProps = {
  images: string[]
  fallbackImage: string
  onApiChange: (api: CarouselApi | null) => void
  debugLog: (message: string) => void
  onLoaded?: () => void
}

export function CarouselBackground({ 
  images, 
  fallbackImage,
  onApiChange,
  onLoaded,
  debugLog
}: CarouselBackgroundProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)
  const isMobile = useIsMobile()
  
  // Referencia para el carrusel
  const carouselRef = useRef<HTMLDivElement>(null)
  // Referencia para evitar llamadas innecesarias a onApiChange
  const previousApiRef = useRef<CarouselApi | null>(null)
  
  // Configuración de imágenes - Agregar lógica para usar imágenes móviles
  const getMobileImages = () => {
    // Si estamos en móvil y existen imágenes específicas para móvil en premiumDemoData, usarlas
    if (isMobile && premiumDemoData?.hero?.mobileBackgroundImages && 
        premiumDemoData.hero.mobileBackgroundImages.length > 0) {
      return premiumDemoData.hero.mobileBackgroundImages
    }
    // De lo contrario, usar las imágenes normales
    return images.length > 0 ? images : [fallbackImage]
  }

  const displayImages = getMobileImages()
  const totalImages = displayImages.length
  
  // Handler para cambio de API
  const handleApiChange = useCallback((newApi: CarouselApi | null) => {
    // Solo llamar onApiChange si la API realmente cambió
    if (newApi !== previousApiRef.current) {
      debugLog(`[CarouselBackground] API cambiada: ${newApi ? 'disponible' : 'no disponible'}`)
      onApiChange(newApi)
      previousApiRef.current = newApi
      
      if (newApi) {
        // Configurar listener para cambios de índice
        const handleSelect = () => {
          const newIndex = newApi.selectedScrollSnap()
          debugLog(`[CarouselBackground] Índice cambiado a: ${newIndex}`)
        }
        
        newApi.on('select', handleSelect)
      }
    }
  }, [onApiChange, debugLog])
  
  // Handler para imagen cargada
  const handleImageLoad = useCallback((imageSrc: string) => {
    debugLog(`[CarouselBackground] Imagen cargada: ${imageSrc}`)
    
    // Si es la primera imagen, notificar inmediatamente para mostrar contenido
    if (!firstImageLoaded && (imageSrc === displayImages[0] || displayImages.length === 1)) {
      debugLog(`[CarouselBackground] Primera imagen cargada, permitiendo mostrar contenido`)
      setFirstImageLoaded(true)
      // Notificar que al menos hay una imagen lista para mostrar
      if (onLoaded) {
        onLoaded()
      }
    }
    
    setLoadedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(imageSrc)
      return newSet
    })
  }, [debugLog, firstImageLoaded, displayImages, onLoaded]) // Actualizadas las dependencias
  
  // Verificar si todas las imágenes están cargadas
  useEffect(() => {
    if (loadedImages.size === totalImages && isLoading) {
      setIsLoading(false)
      debugLog(`[CarouselBackground] Todas las imágenes cargadas (${totalImages})`)
      onLoaded?.()
    }
  }, [loadedImages, totalImages, isLoading, onLoaded, debugLog])
  
  // Timeout de seguridad para evitar spinner infinito
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        debugLog('[CarouselBackground] Timeout de carga alcanzado, forzando finalización')
        setIsLoading(false)
        onLoaded?.()
      }
    }, 5000) // 5 segundos máximo de espera

    return () => clearTimeout(loadingTimeout)
  }, [isLoading, onLoaded, debugLog])
  
  // Log de estado
  useEffect(() => {
    debugLog(`[CarouselBackground] Estado - Imágenes: ${totalImages}, Cargadas: ${loadedImages.size}, Cargando: ${isLoading}`)
  }, [totalImages, loadedImages.size, isLoading, debugLog])

  return (
    <div className="w-full h-full relative">
      {/* Carrusel principal */}
      <Carousel
        ref={carouselRef}
        className="w-full h-full"
        setApi={handleApiChange}
        opts={{
          loop: true,
          align: "start",
          duration: 20,
        }}
      >
        <CarouselContent className="h-full">
          {displayImages.map((image, index) => (
            <CarouselItem key={`${image}-${index}`} className="h-full">
              <div className="w-full h-full relative">
                <Image
                  src={image}
                  alt={`Imagen de fondo ${index + 1}`}
                  fill
                  className={`object-cover ${
                    isMobile 
                      ? 'object-[center_30%]' // Centrado más arriba en móviles
                      : 'object-center'
                  }`}
                  style={{
                    transform: isMobile ? 'scale(1.25)' : 'none',
                    transformOrigin: 'center center'
                  }}
                  priority={index === 0}
                  quality={85}
                  sizes="100vw"
                  onLoadingComplete={() => handleImageLoad(image)}
                  onError={() => {
                    debugLog(`[CarouselBackground] Error cargando imagen: ${image}`)
                    // Marcar como cargada aunque haya fallado
                    handleImageLoad(image)
                    
                    // Si es la última imagen pendiente, asegurar que se complete la carga
                    if (loadedImages.size === totalImages - 1) {
                      setIsLoading(false)
                      onLoaded?.()
                    }
                  }}
                />
                
                {/* Overlay sutil para mejorar legibilidad del contenido */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navegación del carrusel (oculta por defecto, visible en hover) */}
        {totalImages > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
          </>
        )}
      </Carousel>
      
      {/* Indicador de carga */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}
