import { GALERIA_CONFIG } from '@/config/galeria.config'

export const UPLOAD_CONFIG = {
  maxFiles:          GALERIA_CONFIG.upload.maxFiles,
  maxFileSizeBytes:  GALERIA_CONFIG.upload.maxFileSizeMB * 1024 * 1024,
  allowedMimeTypes:  ['image/jpeg', 'image/png', 'image/webp'] as string[],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'] as string[],
  compression: {
    maxWidth:  4000,
    maxHeight: 4000,
    quality:   0.8,
  },
  endpoints: {
    cloudinary: '/api/upload-fotos-cloudinary',
    local:      '/api/upload-fotos-simple',
    register:   '/api/photos',
  },
  resetDelayMs: GALERIA_CONFIG.upload.resetDelayMs,
} as const
