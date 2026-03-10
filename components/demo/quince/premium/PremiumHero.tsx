"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import { useMusicContext } from "@/context/music-context"
import { premiumDemoData } from "./data/premium-demo-data"
import { HeroContent } from "./hero/HeroContent"
import { MusicControl } from "./hero/HeroControls/MusicControl"
import { ScrollIndicator } from "./hero/HeroControls/ScrollIndicator"
import { PremiumBadge } from "./hero/PremiumBadge"
import { useIsMobile } from "@/hooks/use-mobile"
import { useDebugLog } from "./hooks/useDebugLog"

export function PremiumHero() {
  // Hook para detectar si estamos en móvil
  const isMobile = useIsMobile()
  
  // Estado del carrusel y carga
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set())
  
  // Referencias para evitar re-renderizados
  const isTransitioningRef = useRef(false)
  const firstImageLoadedRef = useRef(false)
  
  // Hook de depuración
  const debug = useDebugLog()
  
  // Contexto de música
  const musicContext = useMusicContext()
  
  // Verificar si estamos en el cliente
  const isClient = musicContext.isClient
  
  // Configuración de imágenes
  const getImagesByDevice = () => {
    // Si estamos en móvil y existen imágenes específicas para móvil, usarlas
    if (isMobile && premiumDemoData?.hero?.mobileBackgroundImages && 
        premiumDemoData.hero.mobileBackgroundImages.length > 0) {
      return premiumDemoData.hero.mobileBackgroundImages
    }
    // De lo contrario, usar las imágenes normales
    return premiumDemoData.hero.backgroundImages || []
  }
  
  const images = getImagesByDevice()
  const fallbackImage = premiumDemoData.hero.backgroundImage || "/images/quince/quince1.jpeg"
  const displayImages = useMemo(() => images.length > 0 ? images : [fallbackImage], [images, fallbackImage])
  
  // Navegación del carrusel con protección de transición
  const nextSlide = useCallback(() => {
    if (isTransitioningRef.current) return
    
    setIsTransitioning(true)
    isTransitioningRef.current = true
    setCurrentSlide((prev) => (prev + 1) % displayImages.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
      isTransitioningRef.current = false
    }, 500) // Duración de transición
  }, [displayImages.length])
  
  const prevSlide = useCallback(() => {
    if (isTransitioningRef.current) return
    
    setIsTransitioning(true)
    isTransitioningRef.current = true
    setCurrentSlide((prev) => (prev - 1 + displayImages.length) % displayImages.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
      isTransitioningRef.current = false
    }, 500) // Duración de transición
  }, [displayImages.length])
  
  const goToSlide = useCallback((index: number) => {
    if (isTransitioningRef.current || index === currentSlide) return
    
    setIsTransitioning(true)
    isTransitioningRef.current = true
    setCurrentSlide(index)
    
    setTimeout(() => {
      setIsTransitioning(false)
      isTransitioningRef.current = false
    }, 500) // Duración de transición
  }, [currentSlide])
  
  // Función para manejar la carga de imágenes
  const handleImageLoad = useCallback((imageSrc: string) => {
    debug.debugLog(`[PremiumHero] Imagen cargada: ${imageSrc}`)
    
    // Registrar imagen como cargada
    setImagesLoaded(prev => {
      const newSet = new Set(prev)
      newSet.add(imageSrc)
      return newSet
    })
    
    // Si es la primera imagen y aún no se ha marcado como cargada
    if (!firstImageLoadedRef.current && imageSrc === displayImages[0]) {
      debug.debugLog('[PremiumHero] Primera imagen cargada, mostrando contenido')
      setIsLoaded(true)
      firstImageLoadedRef.current = true
    }
    
    // Si todas las imágenes están cargadas
    if (imagesLoaded.size === displayImages.length - 1) {
      debug.debugLog('[PremiumHero] Todas las imágenes cargadas')
      setIsLoaded(true)
    }
  }, [displayImages, debug.debugLog, imagesLoaded.size])

  // Precarga de la siguiente imagen para mejor rendimiento
  useEffect(() => {
    if (!isClient) return
    
    const nextSlideIndex = (currentSlide + 1) % displayImages.length
    if (typeof window !== 'undefined') {
      const preloadImage = document.createElement('img')
      preloadImage.src = displayImages[nextSlideIndex]
    }
    
    debug.debugLog(`[PremiumHero] Precargando siguiente imagen: ${displayImages[nextSlideIndex]}`)
  }, [currentSlide, displayImages, isClient, debug.debugLog])
  
  // Timeout de seguridad para evitar bloqueos de UI
  useEffect(() => {
    if (!isClient) return
    
    const safetyTimeout = setTimeout(() => {
      if (isTransitioning) {
        debug.debugLog('[PremiumHero] Safety timeout: resetting isTransitioning')
        setIsTransitioning(false)
        isTransitioningRef.current = false
      }
    }, 1000) // 1 segundo de seguridad
    
    return () => clearTimeout(safetyTimeout)
  }, [isTransitioning, isClient, debug.debugLog])
  
  // Timeout de seguridad para carga de imágenes
  useEffect(() => {
    if (!isClient) return
    
    const loadingTimeout = setTimeout(() => {
      if (!isLoaded) {
        debug.debugLog('[PremiumHero] Timeout de carga alcanzado, forzando finalización')
        setIsLoaded(true)
      }
    }, 5000) // 5 segundos máximo de espera
    
    return () => clearTimeout(loadingTimeout)
  }, [isLoaded, isClient, debug.debugLog])

  // Estructura completa del componente
  return (
    <section className="w-screen h-screen relative overflow-hidden">
      {/* Carrusel de fondo con Image de Next.js - SIEMPRE 100% del viewport - z-index base */}
      <div className="absolute inset-0 w-full h-full z-0">
        {displayImages.map((image, index) => (
          <div
            key={`image-${index}`}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
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
              onLoad={() => handleImageLoad(image)}
            />
            {/* Overlay sutil para mejorar legibilidad del contenido */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Indicador de carga sutil (solo visible durante carga) */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      {/* Contenido superpuesto - flota sobre la imagen - z-index 20 */}
      <div className="relative z-20 w-full h-full">
        {/* Navegación del carrusel - solo visible si hay más de una imagen */}
        {displayImages.length > 1 && (
          <>
            {/* Botón previo */}
            <button 
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 z-50 disabled:opacity-50 disabled:cursor-not-allowed p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-sm touch-manipulation"
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label="Imagen anterior"
              style={{ minWidth: '44px', minHeight: '44px' }} // Mínimo recomendado para touch
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            {/* Botón siguiente */}
            <button 
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 z-50 disabled:opacity-50 disabled:cursor-not-allowed p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-sm touch-manipulation"
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label="Siguiente imagen"
              style={{ minWidth: '44px', minHeight: '44px' }} // Mínimo recomendado para touch
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            
            {/* Indicadores del carrusel - posicionamiento responsivo */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 ${
              isMobile 
                ? 'bottom-4 sm:bottom-6 md:bottom-8'
                : 'bottom-8'
            }`}>
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/80'
                  } disabled:cursor-not-allowed`}
                  style={{ minWidth: '24px', minHeight: '24px', padding: '8px' }} // Área táctil mejorada
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Control de música - esquina superior derecha - z-index 30 */}
        <div className="absolute top-4 right-4 z-30">
          <MusicControl 
            isPlaying={musicContext.isPlaying}
            onToggle={musicContext.togglePlay}
            isClient={musicContext.isClient}
          />
        </div>

        {/* Badge premium - esquina superior izquierda - z-index 30 */}
        <div className="absolute top-4 left-4 z-30">
          <PremiumBadge />
        </div>

        {/* Contenido central - centrado en el viewport - z-index 20 */}
        {isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <HeroContent 
              title={premiumDemoData.hero.name}
              subtitle={premiumDemoData.hero.subtitle}
            />
          </div>
        )}

        {/* Indicador de desplazamiento - parte inferior central - z-index 30 - posicionamiento responsivo */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 z-30 ${
          isMobile 
            ? 'bottom-16 sm:bottom-18 md:bottom-20'
            : 'bottom-20'
        }`}>
          <ScrollIndicator isLoaded={isLoaded} />
        </div>
      </div>
    </section>
  )
}