"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { heroImages, carouselConfig } from "./data/hero-images"
import { useIsClient } from "@/hooks/useIsClient"

interface HeroCarouselProps {
  children?: React.ReactNode
  className?: string
}

export function HeroCarousel({ children, className = "" }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false) // Iniciar como false
  const [isTransitioning, setIsTransitioning] = useState(false)
  const isClient = useIsClient()

  // Preload next image for better performance - solo en cliente
  useEffect(() => {
    if (!isClient) return
    const nextSlide = (currentSlide + 1) % heroImages.length
    const nextImage = document.createElement('img')
    nextImage.src = heroImages[nextSlide].src
  }, [currentSlide, isClient])

  // Inicializar auto-play solo después de hidratación
  useEffect(() => {
    if (!isClient) return
    setIsPlaying(true)
  }, [isClient])

  const nextSlide = useCallback(() => {
    console.log('nextSlide called', { isTransitioning, isClient })
    if (isTransitioning) {
      console.log('Blocked by isTransitioning')
      return
    }
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    setTimeout(() => {
      console.log('Resetting isTransitioning to false')
      setIsTransitioning(false)
    }, carouselConfig.transitionDuration)
  }, [isTransitioning, isClient])

  // Auto-play functionality - solo activo en cliente
  useEffect(() => {
    if (!isClient || !isPlaying || heroImages.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, carouselConfig.autoplayInterval)

    return () => clearInterval(interval)
  }, [currentSlide, isPlaying, isClient, nextSlide])

  // Fallback de seguridad para isTransitioning
  useEffect(() => {
    if (!isClient) return
    
    const safetyTimeout = setTimeout(() => {
      if (isTransitioning) {
        console.log('Safety timeout: resetting isTransitioning')
        setIsTransitioning(false)
      }
    }, carouselConfig.transitionDuration + 1000) // 1 segundo extra de seguridad

    return () => clearTimeout(safetyTimeout)
  }, [isTransitioning, isClient])

  const prevSlide = useCallback(() => {
    console.log('prevSlide called', { isTransitioning, isClient })
    if (isTransitioning) {
      console.log('Blocked by isTransitioning')
      return
    }
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    setTimeout(() => {
      console.log('Resetting isTransitioning to false')
      setIsTransitioning(false)
    }, carouselConfig.transitionDuration)
  }, [isTransitioning, isClient])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), carouselConfig.transitionDuration)
  }, [currentSlide, isTransitioning])

  const handleMouseEnter = () => {
    if (carouselConfig.pauseOnHover && isClient) {
      setIsPlaying(false)
    }
  }

  const handleMouseLeave = () => {
    if (carouselConfig.pauseOnHover && isClient) {
      setIsPlaying(true)
    }
  }

  const currentImage = heroImages[currentSlide]

  if (heroImages.length === 0) {
    return (
      <section className={`relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 ${className}`}>
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">No hay imágenes disponibles</h1>
        </div>
      </section>
    )
  }

  return (
    <section 
      className={`relative h-screen flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Carrusel de imágenes hero"
    >
      {/* Background Images Stack */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-${carouselConfig.transitionDuration} ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image 
              src={image.src} 
              alt={image.alt}
              fill 
              className="object-cover" 
              priority={index === 0} // Only prioritize first image
              quality={85}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 z-20" />
      </div>

      {/* Navigation Arrows - Solo mostrar si está habilitado Y estamos en cliente */}
      {carouselConfig.showNavigation && heroImages.length > 1 && isClient && (
        <>
          <button 
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 z-50 disabled:opacity-50 disabled:cursor-not-allowed p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-sm touch-manipulation"
            onClick={prevSlide}
            onTouchStart={(e) => {
              e.preventDefault()
              console.log('Touch start on prev button')
              prevSlide()
            }}
            disabled={isTransitioning}
            aria-label="Imagen anterior"
            style={{ minWidth: '44px', minHeight: '44px' }} // Mínimo recomendado para touch
          >
            <ChevronLeft size={24} className="md:w-10 md:h-10" />
          </button>
          <button 
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 z-50 disabled:opacity-50 disabled:cursor-not-allowed p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-sm touch-manipulation"
            onClick={nextSlide}
            onTouchStart={(e) => {
              e.preventDefault()
              console.log('Touch start on next button')
              nextSlide()
            }}
            disabled={isTransitioning}
            aria-label="Siguiente imagen"
            style={{ minWidth: '44px', minHeight: '44px' }} // Mínimo recomendado para touch
          >
            <ChevronRight size={24} className="md:w-10 md:h-10" />
          </button>
        </>
      )}

      {/* Content Overlay */}
      <div className="relative z-30 text-center text-white px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in">
          <span className="text-pink-500 font-script italic">{currentImage.title}</span>
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-wider animate-fade-in-delay">
          {currentImage.subtitle}
        </h2>
        {children}
      </div>

      {/* Slide Indicators - Solo mostrar si está habilitado Y estamos en cliente */}
      {carouselConfig.showIndicators && heroImages.length > 1 && isClient && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                } disabled:cursor-not-allowed`}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Play/Pause Indicator - Solo mostrar en cliente */}
      {isClient && (
        <div className="absolute top-4 right-4 z-30">
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isPlaying ? 'bg-green-500' : 'bg-red-500'
            }`}
            title={isPlaying ? 'Auto-play activo' : 'Auto-play pausado'}
          />
        </div>
      )}
    </section>
  )
} 