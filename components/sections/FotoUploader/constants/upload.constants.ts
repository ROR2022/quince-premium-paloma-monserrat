import { GALERIA_CONFIG } from '@/config/galeria.config'

export const UPLOAD_CONFIG = {
  maxFiles:              GALERIA_CONFIG.upload.maxFiles,
  /** Pre-compression raw intake limit (large files get compressed before upload) */
  rawIntakeLimitBytes:   GALERIA_CONFIG.upload.rawIntakeLimitMB * 1024 * 1024,
  /** Post-compression limit — must stay ≤ Vercel serverless body limit (4.5 MB) */
  maxFileSizeBytes:      GALERIA_CONFIG.upload.maxFileSizeMB * 1024 * 1024,
  allowedMimeTypes:  ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] as string[],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'] as string[],
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
