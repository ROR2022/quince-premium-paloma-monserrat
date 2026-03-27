import { UPLOAD_CONFIG } from '../constants/upload.constants'

export interface ValidationResult {
  valid: boolean
  error?: string
}

/** Validación PRE-compresión: solo tipo, extensión y límite de intake crudo (50 MB). */
export function validateImageFile(file: File): ValidationResult {
  if (!UPLOAD_CONFIG.allowedMimeTypes.includes(file.type)) {
    return { valid: false, error: `Tipo no permitido: ${file.type}. Usa JPG, PNG o WebP.` }
  }

  const ext = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!UPLOAD_CONFIG.allowedExtensions.includes(ext)) {
    return { valid: false, error: `Extensión no permitida: ${ext}` }
  }

  // Límite de intake crudo — solo rechaza archivos absurdamente grandes (>50 MB).
  // Fotos de alta calidad (10-25 MB) pasan y se comprimen antes de subirse.
  if (file.size > UPLOAD_CONFIG.rawIntakeLimitBytes) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(0)
    return { valid: false, error: `El archivo es demasiado grande: ${sizeMB} MB (máx 50 MB)` }
  }

  return { valid: true }
}

/** Validación POST-compresión: el archivo ya fue comprimido, verifica que cabe en Vercel. */
export function validateCompressedFile(file: File): ValidationResult {
  if (file.size > UPLOAD_CONFIG.maxFileSizeBytes) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1)
    return { valid: false, error: `La imagen comprimida pesa ${sizeMB} MB. Intenta con una foto más pequeña.` }
  }
  return { valid: true }
}
