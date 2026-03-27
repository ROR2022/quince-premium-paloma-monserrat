import { UPLOAD_CONFIG } from '../constants/upload.constants'
import { UploadResult } from '../types/upload.types'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { serverLog, fmtBytes } from './debugLogger'

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

  await serverLog('info', 'cloudinary:env-check', 'Verificando configuración Cloudinary', {
    cloudName:       cloudName ?? '⚠️ FALTA',
    uploadPreset:    uploadPreset ?? '⚠️ FALTA',
    folder:          GALERIA_CONFIG.upload.cloudinaryFolder,
    cloudNameOk:     !!cloudName,
    uploadPresetOk:  !!uploadPreset,
  })

  if (!cloudName || !uploadPreset) {
    const msg = 'Cloudinary no configurado (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / UPLOAD_PRESET)'
    await serverLog('error', 'cloudinary:env-missing', msg, { cloudNameOk: !!cloudName, uploadPresetOk: !!uploadPreset })
    throw new Error(msg)
  }

  const results = []

  for (const file of files) {
    const folder = GALERIA_CONFIG.upload.cloudinaryFolder

    await serverLog('info', 'cloudinary:request', 'Enviando archivo a Cloudinary', {
      fileName:     file.name,
      fileSize:     fmtBytes(file.size),
      fileType:     file.type,
      folder,
      uploadPreset,
      uploaderName,
      endpoint:     `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    })

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    formData.append('folder', folder)
    formData.append('context', `uploader=${uploaderName}`)

    let res: Response
    try {
      res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      )
    } catch (fetchErr) {
      const msg = fetchErr instanceof Error ? fetchErr.message : 'fetch falló'
      await serverLog('error', 'cloudinary:fetch-error', 'Error de red al conectar con Cloudinary', {
        error:    msg,
        file:     file.name,
        endpoint: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      })
      throw new Error(`Error de red: ${msg}`)
    }

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      const msg = (errBody as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status} de Cloudinary`
      await serverLog('error', 'cloudinary:response-error', 'Cloudinary rechazó el upload', {
        httpStatus:      res.status,
        httpStatusText:  res.statusText,
        cloudinaryError: errBody,
        file:            file.name,
        size:            fmtBytes(file.size),
        type:            file.type,
        folder,
        uploadPreset,
      })
      throw new Error(msg)
    }

    const data = await res.json() as {
      public_id: string
      secure_url: string
      width: number
      height: number
      format: string
      bytes: number
      resource_type: string
      created_at: string
    }

    await serverLog('info', 'cloudinary:response-ok', 'Cloudinary respondió OK', {
      publicId:     data.public_id,
      secureUrl:    data.secure_url,
      width:        data.width,
      height:       data.height,
      format:       data.format,
      bytes:        fmtBytes(data.bytes),
      resourceType: data.resource_type,
      createdAt:    data.created_at,
    })

    results.push({
      publicId:  data.public_id,
      secureUrl: data.secure_url,
      width:     data.width,
      height:    data.height,
    })
  }

  return results
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
  const payload = {
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
  }

  await serverLog('info', 'db:register-request', 'Enviando POST /api/photos', {
    endpoint:    UPLOAD_CONFIG.endpoints.register,
    uploadSource: params.uploadSource,
    mimeType:    params.mimeType,
    dimensions:  params.dimensions,
    fileSize:    fmtBytes(params.fileSize),
    cloudinaryId: params.cloudinaryId ?? 'n/a',
  })

  const res = await fetch(UPLOAD_CONFIG.endpoints.register, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    await serverLog('error', 'db:register-error', 'POST /api/photos respondió con error', {
      httpStatus: res.status,
      body:       err,
      mimeType:   params.mimeType,
      cloudinaryId: params.cloudinaryId ?? 'n/a',
    })
    throw new Error((err as { error?: string }).error ?? 'Error al registrar la foto')
  }

  const responseData = await res.json().catch(() => ({}))
  await serverLog('info', 'db:register-ok', 'POST /api/photos respondió 2xx', {
    httpStatus: res.status,
    response:   responseData,
  })
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
