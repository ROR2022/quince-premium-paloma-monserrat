import { useState, useCallback } from 'react'
import { compressImage } from '../utils/imageCompression'
import { validateImageFile } from '../utils/imageValidation'
import { uploadToCloudinary, uploadToLocal, registerPhotoInDB, buildUploadResult } from '../utils/uploadHelpers'
import { UPLOAD_CONFIG } from '../constants/upload.constants'

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export interface FileProgress {
  name:     string
  progress: number
  status:   'pending' | 'compressing' | 'uploading' | 'success' | 'error'
  error?:   string
}

export function useHybridUpload() {
  const [status, setStatus]       = useState<UploadStatus>('idle')
  const [fileProgress, setFileProgress] = useState<FileProgress[]>([])
  const [globalError, setGlobalError]   = useState<string | null>(null)

  const updateFileProgress = (index: number, update: Partial<FileProgress>) => {
    setFileProgress((prev) =>
      prev.map((fp, i) => (i === index ? { ...fp, ...update } : fp))
    )
  }

  const upload = useCallback(async (files: File[], uploaderName: string) => {
    if (files.length === 0) return

    setStatus('uploading')
    setGlobalError(null)
    setFileProgress(files.map((f) => ({ name: f.name, progress: 0, status: 'pending' })))

    let successCount = 0

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // 1. Validar
      const validation = validateImageFile(file)
      if (!validation.valid) {
        updateFileProgress(i, { status: 'error', error: validation.error, progress: 100 })
        continue
      }

      // 2. Comprimir
      updateFileProgress(i, { status: 'compressing', progress: 20 })
      let compressed: File
      try {
        compressed = await compressImage(file)
      } catch {
        compressed = file // si falla la compresión, usar el original
      }

      // 3. Subir a Cloudinary (con fallback local)
      updateFileProgress(i, { status: 'uploading', progress: 50 })
      let cloudinaryResult = null
      let localResult      = null

      try {
        const results  = await uploadToCloudinary([compressed], uploaderName)
        cloudinaryResult = results[0]
      } catch {
        // Fallback local
        try {
          localResult = await uploadToLocal(compressed, uploaderName)
        } catch (localErr) {
          const msg = localErr instanceof Error ? localErr.message : 'Error desconocido'
          updateFileProgress(i, { status: 'error', error: msg, progress: 100 })
          continue
        }
      }

      // 4. Registrar en DB
      updateFileProgress(i, { progress: 80 })
      const result = buildUploadResult(compressed, cloudinaryResult, localResult)

      try {
        await registerPhotoInDB({
          filename:      result.filename,
          originalName:  result.originalName,
          cloudinaryId:  result.cloudinaryId,
          cloudinaryUrl: result.cloudinaryUrl,
          localPath:     result.localPath,
          uploadSource:  result.uploadSource,
          fileSize:      result.fileSize,
          mimeType:      result.mimeType,
          dimensions:    result.dimensions,
          uploaderName,
        })
        updateFileProgress(i, { status: 'success', progress: 100 })
        successCount++
      } catch (dbErr) {
        const msg = dbErr instanceof Error ? dbErr.message : 'Error al registrar'
        updateFileProgress(i, { status: 'error', error: msg, progress: 100 })
      }
    }

    if (successCount === 0) {
      setStatus('error')
      setGlobalError('Ninguna foto pudo subirse. Intenta de nuevo.')
    } else {
      setStatus('success')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setFileProgress([])
    setGlobalError(null)
  }, [])

  const isUploading = status === 'uploading'
  const autoResetDelay = UPLOAD_CONFIG.resetDelayMs

  return { upload, reset, status, fileProgress, globalError, isUploading, autoResetDelay }
}
