'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Camera, Crown, Sparkles, Grid, List } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useIsClient } from "@/hooks/useIsClient"
import { vipDemoData } from "./data/vip-demo-data"

export function VipGallery() {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isClient = useIsClient()

  const currentCategoryData = vipDemoData.galleryCategories[currentCategory]
  const currentImages = currentCategoryData.images

  const goToPrevious = useCallback(() => {
    if (!isClient) return
    const isFirstSlide = currentImage === 0
    const newIndex = isFirstSlide ? currentImages.length - 1 : currentImage - 1
    setCurrentImage(newIndex)
  }, [currentImage, isClient, currentImages.length])

  const goToNext = useCallback(() => {
    if (!isClient) return
    const isLastSlide = currentImage === currentImages.length - 1
    const newIndex = isLastSlide ? 0 : currentImage + 1
    setCurrentImage(newIndex)
  }, [currentImage, isClient, currentImages.length])

  const goToSlide = (slideIndex: number) => {
    if (!isClient) return
    setCurrentImage(slideIndex)
  }

  const openModal = () => {
    if (!isClient) return
    setIsModalOpen(true)
  }

  const closeModal = useCallback(() => {
    if (!isClient) return
    setIsModalOpen(false)
  }, [isClient])

  const selectCategory = (categoryIndex: number) => {
    if (!isClient) return
    setCurrentCategory(categoryIndex)
    setCurrentImage(0) // Reset to first image of new category
  }

  const toggleViewMode = () => {
    if (!isClient) return
    setViewMode(viewMode === 'grid' ? 'slideshow' : 'grid')
    setCurrentImage(0)
  }

  // Event listeners solo en cliente
  useEffect(() => {
    if (!isClient) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentImage, isModalOpen, goToNext, goToPrevious, closeModal, isClient])

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header VIP */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2 border-yellow-300">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 fill-current" />
              <span>Característica VIP Enhanced</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            📸 GALERÍA VIP
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-4"></div>
            <Camera className="w-8 h-8 text-purple-500" />
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-purple-700 max-w-2xl mx-auto leading-relaxed">
            {currentCategoryData.description}
          </p>
        </div>

        {/* Navegación de categorías */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {vipDemoData.galleryCategories.map((category, index) => (
              <Button
                key={category.id}
                onClick={() => selectCategory(index)}
                variant={currentCategory === index ? "default" : "outline"}
                className={`${
                  currentCategory === index 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Controles de vista */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleViewMode}
              variant="outline"
              size="sm"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              {viewMode === 'grid' ? <List className="w-4 h-4 mr-2" /> : <Grid className="w-4 h-4 mr-2" />}
              {viewMode === 'grid' ? 'Vista Slideshow' : 'Vista Grid'}
            </Button>
          </div>
        </div>

        {/* Vista Grid */}
        {viewMode === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentImages.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={openModal}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openModal()
                    e.preventDefault()
                  }
                }}
                role="button"
                tabIndex={isClient ? 0 : -1}
              >
                <div className="relative h-64">
                  <Image
                    src={image.src || '/placeholder.svg'}
                    alt={image.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white w-full">
                      <p className="font-medium mb-1">{image.caption}</p>
                      <p className="text-sm text-gray-200">{image.year}</p>
                    </div>
                  </div>
                  
                  {/* Badge de categoría */}
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${currentCategoryData.color} bg-white/90`}>
                    {currentCategoryData.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vista Slideshow */}
        {viewMode === 'slideshow' && (
          <div className="relative h-96 md:h-[500px] mb-8 group">
            <div className="w-full h-full flex justify-center">
              <div className="relative w-full max-w-4xl h-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
                {currentImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image.src || '/placeholder.svg'}
                      alt={image.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    
                    {/* Caption overlay permanent en slideshow */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                      <h3 className="text-white text-lg md:text-xl font-medium mb-2">
                        {image.caption}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-300 text-sm">{image.year}</p>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentCategoryData.color} bg-white/20 text-white`}>
                          {currentCategoryData.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons - solo mostrar en cliente */}
            {isClient && currentImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 transition-all z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 transition-all z-10"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Indicators - solo mostrar en cliente */}
            {isClient && currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {currentImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImage 
                        ? 'bg-purple-500 w-6' 
                        : 'bg-white/70 hover:bg-white'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Estadísticas de la galería */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-100 text-center">
            <div className={`text-3xl mb-2 ${currentCategoryData.color}`}>
              {currentCategoryData.icon}
            </div>
            <h4 className="font-bold text-purple-800 mb-2">{currentCategoryData.name}</h4>
            <p className="text-purple-600 text-sm">{currentImages.length} foto{currentImages.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-100 text-center">
            <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-current" />
            <h4 className="font-bold text-purple-800 mb-2">Calidad VIP</h4>
            <p className="text-purple-600 text-sm">Alta resolución</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-100 text-center">
            <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-bold text-purple-800 mb-2">Organizada</h4>
            <p className="text-purple-600 text-sm">Por categorías</p>
          </div>
        </div>

        {/* Nota del demo premium */}
        <div className="p-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl border-2 border-yellow-200 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-yellow-600 fill-current flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-amber-800 mb-2">Galería VIP Categorizada</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                La galería VIP organiza tus fotos por categorías temáticas, permitiendo una 
                navegación más intuitiva y una experiencia visual superior. Incluye modos de 
                vista grid y slideshow para diferentes preferencias.
              </p>
              <div className="mt-3 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-amber-600">
                  💎 <strong>VIP Enhanced:</strong> La organización por categorías y modos de vista múltiples 
                  son mejoras exclusivas del paquete VIP sobre la galería básica del Premium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - solo renderizar en cliente */}
      {isClient && isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-5xl h-[80vh]">
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full z-20 hover:from-purple-600 hover:to-pink-600 transition-all"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={currentImages[currentImage].src || '/placeholder.svg'}
                alt={currentImages[currentImage].caption}
                fill
                className="object-contain"
              />
              
              {/* Caption en modal */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-1">{currentImages[currentImage].caption}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-300 text-sm">{currentImages[currentImage].year}</p>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentCategoryData.color} bg-white/20`}>
                    {currentCategoryData.name}
                  </div>
                </div>
              </div>
            </div>

            {currentImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 transition-all z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={30} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 transition-all z-10"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight size={30} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
} 