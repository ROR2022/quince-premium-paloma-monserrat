import { useState, useCallback } from 'react'
import { compressImage } from '../utils/imageCompression'
import { validateImageFile, validateCompressedFile } from '../utils/imageValidation'
import { uploadToCloudinary, uploadToLocal, registerPhotoInDB, buildUploadResult } from '../utils/uploadHelpers'
import { UPLOAD_CONFIG } from '../constants/upload.constants'
import { serverLog, serializeError, fmtBytes } from '../utils/debugLogger'

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

    await serverLog('info', 'upload:start', `Iniciando upload de ${files.length} archivo(s)`, {
      totalFiles:  files.length,
      uploaderName,
      files: files.map(f => ({ name: f.name, size: fmtBytes(f.size), type: f.type })),
    })

    let successCount = 0

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      await serverLog('info', 'upload:file-start', `Procesando archivo ${i + 1}/${files.length}`, {
        index: i,
        name:  file.name,
        size:  fmtBytes(file.size),
        type:  file.type,
      })

      // 1. Validar
      const validation = validateImageFile(file)
      if (!validation.valid) {
        await serverLog('warn', 'upload:validate-fail', 'Validación pre-compresión fallida', {
          name:  file.name,
          error: validation.error,
          size:  fmtBytes(file.size),
          type:  file.type,
        })
        updateFileProgress(i, { status: 'error', error: validation.error, progress: 100 })
        continue
      }
      await serverLog('info', 'upload:validate-ok', 'Validación pre-compresión pasada', { name: file.name })

      // 2. Comprimir (siempre — aunque la foto sea pequeña)
      updateFileProgress(i, { status: 'compressing', progress: 20 })
      let compressed: File
      try {
        compressed = await compressImage(file)
        await serverLog('info', 'upload:compress-ok', 'Compresión exitosa', {
          originalSize:   fmtBytes(file.size),
          compressedSize: fmtBytes(compressed.size),
          compressedType: compressed.type,
          compressedName: compressed.name,
        })
      } catch (compressErr) {
        await serverLog('warn', 'upload:compress-fallback', 'Compresión falló — usando archivo original', {
          error: serializeError(compressErr),
          file:  file.name,
          size:  fmtBytes(file.size),
          type:  file.type,
        })
        compressed = file // si falla la compresión, usar el original
      }

      // 2b. Validar tamaño post-compresión (límite Vercel 4.5 MB)
      const postValidation = validateCompressedFile(compressed)
      if (!postValidation.valid) {
        await serverLog('warn', 'upload:post-validate-fail', 'Validación post-compresión fallida', {
          name:  compressed.name,
          size:  fmtBytes(compressed.size),
          error: postValidation.error,
        })
        updateFileProgress(i, { status: 'error', error: postValidation.error, progress: 100 })
        continue
      }
      await serverLog('info', 'upload:post-validate-ok', 'Validación post-compresión pasada', {
        name: compressed.name,
        size: fmtBytes(compressed.size),
      })

      // 3. Subir a Cloudinary (direct upload — sin pasar por Vercel)
      updateFileProgress(i, { status: 'uploading', progress: 50 })
      let cloudinaryResult = null
      let localResult      = null

      await serverLog('info', 'upload:cloudinary-start', 'Iniciando direct upload a Cloudinary', {
        file: compressed.name,
        size: fmtBytes(compressed.size),
        type: compressed.type,
      })

      try {
        const results  = await uploadToCloudinary([compressed], uploaderName)
        cloudinaryResult = results[0]
        await serverLog('info', 'upload:cloudinary-ok', 'Cloudinary direct upload exitoso', {
          publicId:  cloudinaryResult.publicId,
          secureUrl: cloudinaryResult.secureUrl,
          width:     cloudinaryResult.width,
          height:    cloudinaryResult.height,
        })
      } catch (cloudErr) {
        const cloudMsg = cloudErr instanceof Error ? cloudErr.message : 'Error Cloudinary'
        await serverLog('error', 'upload:cloudinary-fail', 'Cloudinary direct upload falló', {
          error:          serializeError(cloudErr),
          compressedSize: fmtBytes(compressed.size),
          compressedType: compressed.type,
        })

        // Fallback local SOLO si el archivo es pequeño (< 4 MB).
        // Archivos más grandes causarían 413 en Vercel — mejor mostrar el error real.
        const VERCEL_SAFE_BYTES = 4 * 1024 * 1024
        if (compressed.size > VERCEL_SAFE_BYTES) {
          await serverLog('warn', 'upload:fallback-skip', 'Fallback omitido — archivo muy grande para Vercel', {
            size:      fmtBytes(compressed.size),
            threshold: '4 MB',
          })
          updateFileProgress(i, {
            status: 'error',
            error: `Error al subir: ${cloudMsg}. Intenta con una foto más pequeña.`,
            progress: 100,
          })
          continue
        }

        // Fallback local (solo dev / fotos pequeñas)
        await serverLog('info', 'upload:fallback-start', 'Intentando fallback local', {
          size: fmtBytes(compressed.size),
        })
        try {
          localResult = await uploadToLocal(compressed, uploaderName)
          await serverLog('info', 'upload:fallback-ok', 'Fallback local exitoso', localResult as Record<string, unknown>)
        } catch (localErr) {
          const msg = localErr instanceof Error ? localErr.message : 'Error desconocido'
          await serverLog('error', 'upload:fallback-fail', 'Fallback local también falló', {
            error: serializeError(localErr),
          })
          updateFileProgress(i, { status: 'error', error: msg, progress: 100 })
          continue
        }
      }

      // 4. Registrar en DB
      updateFileProgress(i, { progress: 80 })
      const result = buildUploadResult(compressed, cloudinaryResult, localResult)

      await serverLog('info', 'upload:db-start', 'Registrando foto en MongoDB', {
        uploadSource:  result.uploadSource,
        cloudinaryId:  result.cloudinaryId ?? 'n/a',
        cloudinaryUrl: result.cloudinaryUrl ?? 'n/a',
        filename:      result.filename,
        originalName:  result.originalName,
        fileSize:      fmtBytes(result.fileSize),
        mimeType:      result.mimeType,
        dimensions:    result.dimensions,
        uploaderName,
      })

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
        await serverLog('info', 'upload:db-ok', 'Foto registrada en DB correctamente', {
          originalName: result.originalName,
          uploaderName,
        })
        updateFileProgress(i, { status: 'success', progress: 100 })
        successCount++
      } catch (dbErr) {
        const msg = dbErr instanceof Error ? dbErr.message : 'Error al registrar'
        await serverLog('error', 'upload:db-fail', 'Error al registrar en MongoDB', {
          error:        serializeError(dbErr),
          originalName: result.originalName,
          uploadSource: result.uploadSource,
        })
        updateFileProgress(i, { status: 'error', error: msg, progress: 100 })
      }
    }

    await serverLog('info', 'upload:complete', `Upload terminado: ${successCount}/${files.length} exitosos`, {
      successCount,
      totalFiles: files.length,
      finalStatus: successCount === 0 ? 'error' : 'success',
    })

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
