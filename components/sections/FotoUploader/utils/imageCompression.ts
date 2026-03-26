import { UPLOAD_CONFIG } from '../constants/upload.constants'

/**
 * Comprime una imagen usando Canvas API (nativa del browser, sin dependencias).
 * Respeta la proporción original. Output en WebP al 80% de calidad.
 */
export async function compressImage(file: File): Promise<File> {
  const { maxWidth, maxHeight, quality } = UPLOAD_CONFIG.compression

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(img.src)

      let { width, height } = img

      // Redimensionar manteniendo proporción
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width  = Math.round(width  * ratio)
        height = Math.round(height * ratio)
      }

      const canvas = document.createElement('canvas')
      canvas.width  = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('No se pudo obtener el contexto del canvas'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('No se pudo comprimir la imagen'))
            return
          }
          const compressedName = file.name.replace(/\.[^.]+$/, '.webp')
          resolve(new File([blob], compressedName, { type: 'image/webp' }))
        },
        'image/webp',
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(img.src)
      reject(new Error('No se pudo cargar la imagen para compresión'))
    }
  })
}
