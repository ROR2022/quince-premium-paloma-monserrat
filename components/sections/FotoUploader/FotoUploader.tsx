'use client'

import { useEffect, useRef } from 'react'
import { Camera, Upload, CheckCircle, XCircle, Loader2, Images } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { useFileUpload } from './hooks/useFileUpload'
import { useHybridUpload } from './hooks/useHybridUpload'
import { useImagePreview } from './hooks/useImagePreview'
import { UPLOAD_CONFIG } from './constants/upload.constants'

export function FotoUploader() {
  const { selectedFiles, fileError, handleFileChange, clearFiles } = useFileUpload()
  const { upload, reset, status, fileProgress, globalError, isUploading, autoResetDelay } = useHybridUpload()
  const previews   = useImagePreview(selectedFiles)
  const nameRef    = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-reset tras éxito
  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(() => {
      reset()
      clearFiles()
      if (nameRef.current)    nameRef.current.value = ''
      if (fileInputRef.current) fileInputRef.current.value = ''
    }, autoResetDelay)
    return () => clearTimeout(timer)
  }, [status, reset, clearFiles, autoResetDelay])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value.trim() ?? ''
    if (!name) {
      nameRef.current?.focus()
      return
    }
    if (selectedFiles.length === 0) return
    await upload(selectedFiles, name)
  }

  // ─── ESTADO: ÉXITO ───────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coquette-rosa-claro-50 to-coquette-rosa-claro-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-coquette-rosa-intenso-700 mb-2">
            ¡Listo!
          </h2>
          <p className="text-gray-600 mb-6">{GALERIA_CONFIG.upload.successMessage}</p>
          <Link
            href={GALERIA_CONFIG.pages.gallery}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-coquette-rosa-intenso-500 to-coquette-rosa-intenso-600 text-white px-6 py-3 rounded-full font-medium hover:from-coquette-rosa-intenso-600 hover:to-coquette-rosa-intenso-700 transition-all shadow-md"
          >
            <Images className="w-4 h-4" />
            Ver la galería
          </Link>
          <p className="text-xs text-gray-400 mt-4">
            El formulario se reiniciará en unos segundos...
          </p>
        </div>
      </div>
    )
  }

  // ─── ESTADO: SUBIENDO ────────────────────────────────────────────────────
  if (isUploading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coquette-rosa-claro-50 to-coquette-rosa-claro-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Loader2 className="w-10 h-10 text-coquette-rosa-intenso-500 animate-spin mx-auto mb-3" />
            <h2 className="text-xl font-bold text-coquette-rosa-intenso-700">
              Subiendo fotos...
            </h2>
          </div>
          <div className="space-y-3">
            {fileProgress.map((fp, i) => (
              <div key={i} className="bg-coquette-rosa-claro-50 rounded-xl p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700 truncate max-w-[200px]">{fp.name}</span>
                  {fp.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                  {fp.status === 'error'   && <XCircle     className="w-4 h-4 text-red-500  shrink-0" />}
                  {(fp.status === 'compressing' || fp.status === 'uploading') && (
                    <Loader2 className="w-4 h-4 text-coquette-rosa-intenso-500 animate-spin shrink-0" />
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      fp.status === 'error' ? 'bg-red-400' : 'bg-coquette-rosa-intenso-500'
                    }`}
                    style={{ width: `${fp.progress}%` }}
                  />
                </div>
                {fp.error && <p className="text-xs text-red-500 mt-1">{fp.error}</p>}
                {fp.status === 'compressing' && <p className="text-xs text-gray-400 mt-1">Optimizando...</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── ESTADO: FORMULARIO ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-coquette-rosa-claro-50 to-coquette-rosa-claro-100 py-10 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-coquette-rosa-intenso-400 to-coquette-rosa-intenso-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-coquette-rosa-intenso-700 mb-1">
            Comparte tus fotos
          </h1>
          <p className="text-gray-500 text-sm">
            {GALERIA_CONFIG.event.name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 space-y-5">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {GALERIA_CONFIG.upload.uploaderLabel}
              <span className="text-coquette-rosa-intenso-500 ml-0.5">*</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder={GALERIA_CONFIG.upload.uploaderPlaceholder}
              maxLength={60}
              required
              className="w-full border border-plateado-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coquette-rosa-intenso-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Selector de archivos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Fotos
              <span className="text-coquette-rosa-intenso-500 ml-0.5">*</span>
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-coquette-rosa-claro-400 rounded-2xl cursor-pointer hover:border-coquette-rosa-intenso-400 hover:bg-coquette-rosa-claro-50 transition-all">
              <Upload className="w-7 h-7 text-coquette-rosa-intenso-400 mb-2" />
              <span className="text-sm text-gray-500">
                Toca para seleccionar fotos
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                JPG, PNG o WebP · Máx {UPLOAD_CONFIG.maxFiles} fotos · {UPLOAD_CONFIG.maxFileSizeBytes / 1024 / 1024} MB c/u
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {fileError && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> {fileError}
              </p>
            )}
          </div>

          {/* Preview de imágenes seleccionadas */}
          {previews.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">{previews.length} foto{previews.length > 1 ? 's' : ''} seleccionada{previews.length > 1 ? 's' : ''}</p>
              <div className="grid grid-cols-4 gap-2">
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image src={src} alt={`Preview ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error global */}
          {globalError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{globalError}</p>
            </div>
          )}

          {/* Botón submit */}
          <button
            type="submit"
            disabled={selectedFiles.length === 0 || isUploading}
            className="w-full bg-gradient-to-r from-coquette-rosa-intenso-500 to-coquette-rosa-intenso-600 text-white py-3.5 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 hover:from-coquette-rosa-intenso-600 hover:to-coquette-rosa-intenso-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4" />
            Subir {selectedFiles.length > 0 ? `${selectedFiles.length} foto${selectedFiles.length > 1 ? 's' : ''}` : 'fotos'}
          </button>

          {/* Link a galería */}
          <div className="text-center pt-1">
            <Link
              href={GALERIA_CONFIG.pages.gallery}
              className="text-sm text-coquette-rosa-intenso-600 hover:text-coquette-rosa-intenso-700 underline underline-offset-2"
            >
              Ver la galería del evento →
            </Link>
          </div>
        </form>

        {/* Volver */}
        <div className="text-center mt-4">
          <Link
            href={GALERIA_CONFIG.pages.home}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Volver a la invitación
          </Link>
        </div>
      </div>
    </div>
  )
}
