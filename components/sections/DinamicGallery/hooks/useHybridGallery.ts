import { useState, useEffect, useCallback, useRef } from 'react'
import { GALERIA_CONFIG } from '@/config/galeria.config'

export interface GalleryPhoto {
  _id:          string
  filename:     string
  originalName: string
  cloudinaryUrl: string | null
  localPath:    string | null
  uploadSource: 'cloudinary' | 'local'
  fileSize:     number
  mimeType:     string
  dimensions:   { width: number; height: number }
  uploader:     { name: string }
  uploadedAt:   string
  displayUrl:   string
}

export interface PaginationInfo {
  page:    number
  limit:   number
  total:   number
  pages:   number
  hasNext: boolean
  hasPrev: boolean
}

export function useHybridGallery() {
  const [photos, setPhotos]       = useState<GalleryPhoto[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [loading, setLoading]     = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [deletingIds, setDeletingIds] = useState<string[]>([])
  const [newPhotosCount, setNewPhotosCount] = useState(0)

  const lastRefreshRef = useRef<string>(new Date().toISOString())
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchPage = useCallback(async (page: number, append = false) => {
    try {
      if (!append) setLoading(true)
      else         setLoadingMore(true)
      setError(null)

      const res  = await fetch(`/api/photos?page=${page}&limit=${GALERIA_CONFIG.gallery.photosPerPage}`)
      const data = await res.json()

      if (!data.success) throw new Error(data.error ?? 'Error al cargar fotos')

      setPhotos((prev) => append ? [...prev, ...data.photos] : data.photos)
      setPagination(data.pagination)
      if (!append) lastRefreshRef.current = new Date().toISOString()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Carga inicial
  useEffect(() => {
    fetchPage(1)
  }, [fetchPage])

  // Check de fotos nuevas cada N segundos
  useEffect(() => {
    checkIntervalRef.current = setInterval(async () => {
      try {
        const since = encodeURIComponent(lastRefreshRef.current)
        const res   = await fetch(`/api/photos/check-new?since=${since}`)
        const data  = await res.json()
        if (data.success && data.hasNewPhotos) {
          setNewPhotosCount(data.newPhotosCount)
        }
      } catch {
        // silencioso — no interrumpir la experiencia
      }
    }, GALERIA_CONFIG.gallery.checkNewIntervalMs)

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current)
    }
  }, [])

  const refresh = useCallback(() => {
    setNewPhotosCount(0)
    fetchPage(1)
  }, [fetchPage])

  const goToPage = useCallback((page: number) => {
    setNewPhotosCount(0)
    fetchPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [fetchPage])

  const deletePhoto = useCallback(async (id: string) => {
    setDeletingIds((prev) => [...prev, id])
    try {
      const res = await fetch(`/api/photos/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar')
      setPhotos((prev) => prev.filter((p) => p._id !== id))
      setPagination((prev) => prev ? { ...prev, total: prev.total - 1 } : prev)
    } catch (err) {
      console.error('Error eliminando foto:', err)
    } finally {
      setDeletingIds((prev) => prev.filter((i) => i !== id))
    }
  }, [])

  const isNew = useCallback((uploadedAt: string) => {
    const uploaded = new Date(uploadedAt).getTime()
    const cutoff   = Date.now() - GALERIA_CONFIG.gallery.newBadgeHours * 60 * 60 * 1000
    return uploaded > cutoff
  }, [])

  return {
    photos,
    pagination,
    loading,
    loadingMore,
    error,
    deletingIds,
    newPhotosCount,
    refresh,
    goToPage,
    deletePhoto,
    isNew,
  }
}
