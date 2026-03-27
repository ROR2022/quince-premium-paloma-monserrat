import { GALERIA_CONFIG } from '@/config/galeria.config'

export const UPLOAD_CONFIG = {
  maxFiles:              GALERIA_CONFIG.upload.maxFiles,
  /** Pre-compression raw intake limit (large files get compressed before upload) */
  rawIntakeLimitBytes:   GALERIA_CONFIG.upload.rawIntakeLimitMB * 1024 * 1024,
  /** Post-compression limit — only relevant for local fallback (Vercel 4.5 MB).
   *  Direct Cloudinary uploads bypass Vercel entirely — no size limit. */
  maxFileSizeBytes:      GALERIA_CONFIG.upload.maxFileSizeMB * 1024 * 1024,
  allowedMimeTypes:  ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] as string[],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'] as string[],
  compression: {
    /** 2048px = 2x retina en cualquier pantalla mobile/desktop. */
    maxWidth:  2048,
    maxHeight: 2048,
    /** 0.65: Safari/iOS WebP encoder es ineficiente a calidades altas — produce
     *  archivos más grandes que el JPEG original. 0.65 garantiza reducción real. */
    quality:   0.65,
  },
  endpoints: {
    cloudinary: '/api/upload-fotos-cloudinary',
    local:      '/api/upload-fotos-simple',
    register:   '/api/photos',
  },
  resetDelayMs: GALERIA_CONFIG.upload.resetDelayMs,
} as const
