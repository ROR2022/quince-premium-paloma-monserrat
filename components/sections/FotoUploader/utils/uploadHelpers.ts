import { UPLOAD_CONFIG } from '../constants/upload.constants'
import { UploadResult } from '../types/upload.types'

/** Sube archivos a Cloudinary via la API route. */
export async function uploadToCloudinary(
  files: File[],
  uploaderName: string
): Promise<{ publicId: string; secureUrl: string; width: number; height: number }[]> {
  const formData = new FormData()
  files.forEach((f) => formData.append('files', f))
  formData.append('uploaderName', uploaderName)

  const res = await fetch(UPLOAD_CONFIG.endpoints.cloudinary, {
    method: 'POST',
    body:   formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Error al subir a Cloudinary')
  }

  const data = await res.json()
  return data.uploadResults
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
