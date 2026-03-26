'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RefreshCw, Trash2, Loader2, Images, ChevronLeft, ChevronRight, Bell } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { useHybridGallery, GalleryPhoto } from './hooks/useHybridGallery'
import { PhotoDetailModal } from './PhotoDetailModal'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'

export function DinamicGallery() {
  const { photos, pagination, loading, error, deletingIds, newPhotosCount, refresh, goToPage, deletePhoto, isNew } =
    useHybridGallery()

  const [selectedPhoto, setSelectedPhoto]   = useState<GalleryPhoto | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  // ─── CARGANDO ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coquette-rosa-claro-50 to-coquette-rosa-claro-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-coquette-rosa-intenso-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Cargando galería...</p>
        </div>
      </div>
    )
  }

  // ─── ERROR ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coquette-rosa-claro-50 to-coquette-rosa-claro-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow p-6 text-center max-w-sm">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 bg-coquette-rosa-intenso-500 text-white px-4 py-2 rounded-xl text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coquette-rosa-claro-50 to-coquette-rosa-claro-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-coquette-rosa-intenso-400 to-coquette-rosa-intenso-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Images className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-coquette-rosa-intenso-700 mb-1">
            {GALERIA_CONFIG.gallery.title}
          </h1>
          <p className="text-sm text-gray-500">{GALERIA_CONFIG.event.name}</p>
          {pagination && (
            <p className="text-xs text-gray-400 mt-1">{pagination.total} foto{pagination.total !== 1 ? 's' : ''}</p>
          )}
        </div>

        {/* Banner: fotos nuevas */}
        {newPhotosCount > 0 && (
          <button
            onClick={refresh}
            className="w-full mb-6 bg-coquette-rosa-intenso-500 text-white py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-coquette-rosa-intenso-600 transition-colors shadow-md animate-pulse"
          >
            <Bell className="w-4 h-4" />
            {newPhotosCount} foto{newPhotosCount > 1 ? 's' : ''} nueva{newPhotosCount > 1 ? 's' : ''} disponible{newPhotosCount > 1 ? 's' : ''} · Toca para ver
          </button>
        )}

        {/* Grid vacío */}
        {photos.length === 0 ? (
          <div className="text-center py-16">
            <Images className="w-16 h-16 text-coquette-rosa-claro-300 mx-auto mb-4" />
            <p className="text-gray-500">{GALERIA_CONFIG.gallery.emptyMessage}</p>
          </div>
        ) : (
          <>
            {/* Grid de fotos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {photos.map((photo) => {
                const thumbUrl = photo.cloudinaryUrl
                  ? photo.cloudinaryUrl.replace('/upload/', '/upload/f_auto,q_auto,w_400,h_400,c_fill/')
                  : photo.localPath ?? '/placeholder.svg'
                const timeAgo = formatDistanceToNow(new Date(photo.uploadedAt), { addSuffix: true, locale: es })
                const isDeleting = deletingIds.includes(photo._id)

                return (
                  <div
                    key={photo._id}
                    className={`relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group ${isDeleting ? 'opacity-50' : ''}`}
                  >
                    {/* Imagen */}
                    <div
                      className="relative aspect-square cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <Image
                        src={thumbUrl}
                        alt={`Foto de ${photo.uploader.name}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className="object-cover"
                      />

                      {/* Badge NUEVO */}
                      {isNew(photo.uploadedAt) && (
                        <span className="absolute top-2 left-2 bg-coquette-rosa-intenso-500 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow">
                          NUEVO
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-700 truncate">{photo.uploader.name}</p>
                      <p className="text-xs text-gray-400">{timeAgo}</p>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => setConfirmDeleteId(photo._id)}
                      disabled={isDeleting}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white text-gray-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow"
                      aria-label="Eliminar foto"
                    >
                      {isDeleting
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <Trash2 className="w-3.5 h-3.5" />
                      }
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Paginación */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => goToPage(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-coquette-rosa-claro-300 text-coquette-rosa-intenso-600 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-coquette-rosa-claro-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>

                <span className="text-sm text-gray-500">
                  Página <strong className="text-coquette-rosa-intenso-600">{pagination.page}</strong> de {pagination.pages}
                </span>

                <button
                  onClick={() => goToPage(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-coquette-rosa-claro-300 text-coquette-rosa-intenso-600 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-coquette-rosa-claro-100 transition-colors"
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Botón refresh manual */}
        <div className="text-center mt-6">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 text-sm text-coquette-rosa-intenso-600 hover:text-coquette-rosa-intenso-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Actualizar galería
          </button>
        </div>
      </div>

      {/* Modal detalle */}
      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={setSelectedPhoto}
        />
      )}

      {/* Modal confirmar eliminación */}
      {confirmDeleteId && (
        <DeleteConfirmationModal
          onConfirm={() => {
            deletePhoto(confirmDeleteId)
            setConfirmDeleteId(null)
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  )
}
