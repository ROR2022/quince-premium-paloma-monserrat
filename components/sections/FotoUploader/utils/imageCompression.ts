import { UPLOAD_CONFIG } from '../constants/upload.constants'
import { serverLogSync, fmtBytes } from './debugLogger'

/**
 * Comprime una imagen usando Canvas API (nativa del browser, sin dependencias).
 * Respeta la proporción original. Output en WebP al 80% de calidad.
 */
export async function compressImage(file: File): Promise<File> {
  const { maxWidth, maxHeight, quality } = UPLOAD_CONFIG.compression

  serverLogSync('info', 'compress:start', 'Iniciando compresión', {
    name:    file.name,
    size:    fmtBytes(file.size),
    type:    file.type,
    lastMod: new Date(file.lastModified).toISOString(),
  })

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(img.src)

      let { width, height } = img
      const origW = width
      const origH = height

      // Redimensionar manteniendo proporción
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width  = Math.round(width  * ratio)
        height = Math.round(height * ratio)
      }

      serverLogSync('info', 'compress:dimensions', 'Dimensiones calculadas', {
        original:  `${origW}×${origH}`,
        scaled:    `${width}×${height}`,
        limitCfg:  `${maxWidth}×${maxHeight}`,
        didResize: origW !== width || origH !== height,
      })

      const canvas = document.createElement('canvas')
      canvas.width  = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        const msg = 'No se pudo obtener el contexto del canvas'
        serverLogSync('error', 'compress:no-ctx', msg, { width, height })
        reject(new Error(msg))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            const msg = 'canvas.toBlob devolvió null'
            serverLogSync('error', 'compress:blob-null', msg, {
              file: file.name,
              canvasW: width,
              canvasH: height,
              quality,
            })
            reject(new Error('No se pudo comprimir la imagen'))
            return
          }

          // Safari/iOS WebP encoder puede producir archivos MÁS grandes que el JPEG
          // original. Si eso ocurre, devolver el archivo original sin comprimir.
          if (blob.size >= file.size) {
            serverLogSync('warn', 'compress:original-kept',
              'WebP más grande que original — usando archivo original', {
                originalSize:   fmtBytes(file.size),
                webpSize:       fmtBytes(blob.size),
                originalName:   file.name,
                originalType:   file.type,
                dimensions:     `${width}×${height}`,
              }
            )
            resolve(file)
            return
          }

          const compressedName = file.name.replace(/\.[^.]+$/, '.webp')
          const resultFile = new File([blob], compressedName, { type: 'image/webp' })

          serverLogSync('info', 'compress:done', 'Compresión completada', {
            outputName: compressedName,
            outputSize: fmtBytes(blob.size),
            outputType: 'image/webp',
            ratio:      `${((1 - blob.size / file.size) * 100).toFixed(1)}% reducción`,
          })

          resolve(resultFile)
        },
        'image/webp',
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(img.src)
      const msg = 'No se pudo cargar la imagen para compresión'
      serverLogSync('error', 'compress:img-error', msg, {
        file: file.name,
        type: file.type,
        size: fmtBytes(file.size),
      })
      reject(new Error(msg))
    }
  })
}
