"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const closeModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setCurrentImageIndex((prev) => 
        prev === premiumDemoData.gallery.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [selectedImage])

  const prevImage = useCallback(() => {
    if (selectedImage !== null) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? premiumDemoData.gallery.images.length - 1 : prev - 1
      )
    }
  }, [selectedImage])

  const openImage = (index: number) => {
    setSelectedImage(index)
    setCurrentImageIndex(index)
  }

  // Cerrar modal con Escape
  useState(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  })

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {premiumDemoData.gallery.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {premiumDemoData.gallery.subtitle}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {premiumDemoData.gallery.description}
          </p>
        </div>

        {/* Grid de imágenes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumDemoData.gallery.images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => openImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={256}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay con información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium mb-1">{image.caption}</p>
                  <p className="text-xs opacity-80 capitalize">{image.category}</p>
                </div>
              </div>

              {/* Icono de corazón */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal de imagen */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Imagen */}
              <Image
                src={premiumDemoData.gallery.images[currentImageIndex].src}
                alt={premiumDemoData.gallery.images[currentImageIndex].alt}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Información de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-lg font-medium mb-2">
                  {premiumDemoData.gallery.images[currentImageIndex].caption}
                </p>
                <p className="text-white/80 text-sm capitalize">
                  {premiumDemoData.gallery.images[currentImageIndex].category}
                </p>
              </div>

              {/* Contador */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {premiumDemoData.gallery.images.length}
              </div>

              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navegación */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mensaje especial */}
        <div className="mt-12 bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-purple-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Momentos Especiales
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Cada foto cuenta una historia de amor, risas y momentos inolvidables. 
            Estas imágenes capturan la esencia de nuestra relación y la emoción 
            de prepararnos para nuestro día especial.
          </p>
        </div>

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800 text-center">
            <strong>💡 Demo:</strong> Esta galería premium incluye 4 fotos con navegación interactiva. 
            En tu invitación real, podrás agregar hasta 20 fotos con categorías personalizadas.
          </p>
        </div>
      </div>
    </section>
  )
} 