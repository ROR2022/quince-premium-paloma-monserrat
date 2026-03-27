import { UPLOAD_CONFIG } from '../constants/upload.constants'
import { UploadResult } from '../types/upload.types'
import { GALERIA_CONFIG } from '@/config/galeria.config'

/**
 * Sube un archivo directamente a Cloudinary desde el browser (unsigned upload).
 * El archivo NUNCA pasa por Vercel — elimina el límite de 4.5 MB por completo.
 * Requiere: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME y NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 */
export async function uploadToCloudinary(
  files: File[],
  uploaderName: string
): Promise<{ publicId: string; secureUrl: string; width: number; height: number }[]> {
  const cloudName    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    const msg = 'Cloudinary no configurado (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / UPLOAD_PRESET)'
    await logClientError('uploadToCloudinary:config', msg, { cloudName: !!cloudName, uploadPreset: !!uploadPreset })
    throw new Error(msg)
  }

  const results = []

  for (const file of files) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    formData.append('folder', GALERIA_CONFIG.upload.cloudinaryFolder)
    formData.append('context', `uploader=${uploaderName}`)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    )

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      const msg = errBody.error?.message ?? `HTTP ${res.status} de Cloudinary`
      await logClientError('uploadToCloudinary:response', msg, {
        status: res.status,
        cloudName,
        uploadPreset,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        cloudinaryError: errBody,
      })
      throw new Error(msg)
    }

    const data = await res.json()
    results.push({
      publicId:  data.public_id,
      secureUrl: data.secure_url,
      width:     data.width,
      height:    data.height,
    })
  }

  return results
}

/** Envía un error del cliente a /api/log-client-error para verlo en Vercel logs. */
async function logClientError(context: string, message: string, details?: object) {
  try {
    await fetch('/api/log-client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, message, details }),
    })
  } catch {
    // silencioso — no queremos que el log falle el flujo principal
  }
}

/** Sube un archivo al almacenamiento local (fallback). */
export async function uploadToLocal(
  file: File,
  uploaderName: string
): Promise<{ originalName: string; filePath: string; fileSize: number }> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('uploaderName', uploaderName)

  const res = await fetch(UPLOAD_CONFIG.endpoints.local, {
    method: 'POST',
    body:   formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Error al guardar el archivo')
  }

  const data = await res.json()
  return data.files[0]
}

/** Registra los metadatos de una foto ya subida en MongoDB. */
export async function registerPhotoInDB(params: {
  filename:     string
  originalName: string
  cloudinaryId?:  string
  cloudinaryUrl?: string
  localPath?:     string
  uploadSource:   'cloudinary' | 'local'
  fileSize:       number
  mimeType:       string
  dimensions:     { width: number; height: number }
  uploaderName:   string
}): Promise<void> {
  const res = await fetch(UPLOAD_CONFIG.endpoints.register, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      filename:      params.filename,
      originalName:  params.originalName,
      cloudinaryId:  params.cloudinaryId,
      cloudinaryUrl: params.cloudinaryUrl,
      localPath:     params.localPath,
      uploadSource:  params.uploadSource,
      fileSize:      params.fileSize,
      mimeType:      params.mimeType,
      dimensions:    params.dimensions,
      uploader:      { name: params.uploaderName },
      eventMoment:   'general',
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Error al registrar la foto')
  }
}

/** Construye un resultado de upload unificado. */
export function buildUploadResult(
  file: File,
  cloudinaryResult: { publicId: string; secureUrl: string; width: number; height: number } | null,
  localResult: { filePath: string } | null
): UploadResult {
  if (cloudinaryResult) {
    return {
      success:       true,
      uploadSource:  'cloudinary',
      cloudinaryUrl: cloudinaryResult.secureUrl,
      cloudinaryId:  cloudinaryResult.publicId,
      fileSize:      file.size,
      mimeType:      file.type,
      dimensions:    { width: cloudinaryResult.width, height: cloudinaryResult.height },
      filename:      `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
      originalName:  file.name,
    }
  }

  return {
    success:      true,
    uploadSource: 'local',
    localPath:    localResult?.filePath ?? '',
    fileSize:     file.size,
    mimeType:     file.type,
    dimensions:   { width: 0, height: 0 },
    filename:     `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
    originalName: file.name,
  }
}
