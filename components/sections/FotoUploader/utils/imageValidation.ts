import { UPLOAD_CONFIG } from '../constants/upload.constants'

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateImageFile(file: File): ValidationResult {
  if (!UPLOAD_CONFIG.allowedMimeTypes.includes(file.type)) {
    return { valid: false, error: `Tipo no permitido: ${file.type}. Usa JPG, PNG o WebP.` }
  }

  const ext = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!UPLOAD_CONFIG.allowedExtensions.includes(ext)) {
    return { valid: false, error: `Extensión no permitida: ${ext}` }
  }

  if (file.size > UPLOAD_CONFIG.maxFileSizeBytes) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1)
    return { valid: false, error: `El archivo pesa ${sizeMB} MB (máx ${UPLOAD_CONFIG.maxFileSizeBytes / 1024 / 1024} MB)` }
  }

  return { valid: true }
}
