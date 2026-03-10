"use client"

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Crown, Sparkles } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipGallery() {
  const [selectedCategory, setSelectedCategory] = useState(vipDemoData.galleryCategories[0].id)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentCategory = vipDemoData.galleryCategories.find(cat => cat.id === selectedCategory)
  const currentImages = currentCategory?.images || []

  const closeModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const nextImage = () => {
    if (currentImages.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === currentImages.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (currentImages.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentImages.length - 1 : prev - 1
      )
    }
  }

  const openImage = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(index)
  }

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, closeModal])

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header VIP */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2 border-yellow-300">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 fill-current" />
              <span>Característica VIP Enhanced</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            📸 GALERÍA CATEGORIZADA
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            <Crown className="w-8 h-8 text-yellow-500 fill-current" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explora nuestros momentos especiales organizados por categorías. 
            Cada foto cuenta una historia única de nuestro camino hacia el matrimonio.
          </p>
        </div>

        {/* Selector de categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {vipDemoData.galleryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Galería de imágenes */}
        {currentCategory && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold ${currentCategory.color} mb-2`}>
                {currentCategory.name}
              </h3>
              <p className="text-gray-600">{currentCategory.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => openImage(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="font-semibold text-sm">{image.caption}</p>
                      <p className="text-xs opacity-80">{image.year}</p>
                    </div>
                  </div>
                  
                  {/* Icono de zoom */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm">🔍</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal de imagen */}
        {selectedImage !== null && currentImages.length > 0 && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Imagen principal */}
              <Image
                src={currentImages[currentImageIndex].src}
                alt={currentImages[currentImageIndex].caption}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Información de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold mb-2">
                  {currentImages[currentImageIndex].caption}
                </h3>
                <p className="text-white/80">{currentImages[currentImageIndex].year}</p>
              </div>

              {/* Controles de navegación */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Botón de cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Indicador de imagen */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {currentImages.length}
              </div>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-8 h-8 text-amber-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            Momentos Inolvidables
          </h3>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Cada foto captura un momento especial de nuestra historia de amor. 
            Explora las diferentes categorías para descubrir todos nuestros recuerdos.
          </p>
        </div>

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>💡 Demo:</strong> Esta galería VIP incluye 4 categorías con navegación modal. 
            En tu invitación real, podrás personalizar las categorías y agregar hasta 100 fotos por categoría.
          </p>
        </div>
      </div>
    </section>
  )
} 