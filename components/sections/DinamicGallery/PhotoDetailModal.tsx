'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { GalleryPhoto } from './hooks/useHybridGallery'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface Props {
  photo:   GalleryPhoto
  photos:  GalleryPhoto[]
  onClose: () => void
  onNavigate: (photo: GalleryPhoto) => void
}

export function PhotoDetailModal({ photo, photos, onClose, onNavigate }: Props) {
  const currentIndex = photos.findIndex((p) => p._id === photo._id)

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) onNavigate(photos[currentIndex + 1])
  }, [currentIndex, photos, onNavigate])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(photos[currentIndex - 1])
  }, [currentIndex, photos, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  goNext()
      if (e.key === 'ArrowLeft')   goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, goNext, goPrev])

  const displayUrl = photo.cloudinaryUrl
    ? photo.cloudinaryUrl.replace('/upload/', '/upload/f_auto,q_best,w_1920/')
    : photo.localPath ?? '/placeholder.svg'

  const timeAgo = formatDistanceToNow(new Date(photo.uploadedAt), { addSuffix: true, locale: es })

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span className="font-medium text-white">{photo.uploader.name}</span>
            <span className="flex items-center gap-1 text-white/60">
              <Clock className="w-3 h-3" /> {timeAgo}
            </span>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Imagen */}
        <div className="relative flex-1 min-h-0" style={{ height: '75vh' }}>
          <Image
            src={displayUrl}
            alt={`Foto de ${photo.uploader.name}`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        {/* Navegación */}
        {currentIndex > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < photos.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Indicador */}
        <p className="text-center text-white/40 text-xs mt-2">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>
    </div>
  )
}
