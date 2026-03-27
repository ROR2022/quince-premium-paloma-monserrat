import { UPLOAD_CONFIG } from '../constants/upload.constants'
import { serverLogSync, fmtBytes } from './debugLogger'
import { readExifOrientation } from './exifOrientation'

// ---------------------------------------------------------------------------
// Helpers Promise-based para trabajar con Canvas de forma async/await
// ---------------------------------------------------------------------------

/** Carga un archivo en un HTMLImageElement. */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload  = () => { URL.revokeObjectURL(url); resolve(img) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo cargar la imagen')) }
    img.src = url
  })
}

/** Wrapper Promise para canvas.toBlob. */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise(resolve => canvas.toBlob(resolve, type, quality))
}

// ---------------------------------------------------------------------------
// Compresión principal
// ---------------------------------------------------------------------------

/**
 * Comprime una imagen usando Canvas API (nativa del browser, sin dependencias).
 *
 * Estrategia por niveles:
 *  1. Lee orientación EXIF y corrige rotación portrait (iPhone)
 *  2. Intenta WebP a quality=[0.65, 0.45] — usa el primero más pequeño que el original
 *  3. Si es PNG y WebP falló, intenta JPEG 0.80 como fallback
 *  4. Si todo falla, devuelve el archivo original
 */
export async function compressImage(file: File): Promise<File> {
  const { maxWidth, maxHeight, quality } = UPLOAD_CONFIG.compression

  serverLogSync('info', 'compress:start', 'Iniciando compresión', {
    name:    file.name,
    size:    fmtBytes(file.size),
    type:    file.type,
    lastMod: new Date(file.lastModified).toISOString(),
  })

  // --- 1. Leer orientación EXIF -------------------------------------------
  const orientation = await readExifOrientation(file)
  serverLogSync('info', 'compress:exif', 'EXIF orientation leído', {
    file:        file.name,
    orientation,
    willRotate:  orientation !== 1,
  })

  // --- 2. Cargar imagen ----------------------------------------------------
  let img: HTMLImageElement
  try {
    img = await loadImage(file)
  } catch {
    serverLogSync('error', 'compress:img-error', 'No se pudo cargar la imagen', {
      file: file.name,
      type: file.type,
      size: fmtBytes(file.size),
    })
    return file
  }

  // --- 3. Calcular dimensiones escaladas -----------------------------------
  let { width, height } = img
  const origW = width, origH = height

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

  // --- 4. Crear canvas con corrección de orientación ----------------------
  // Para rotaciones de 90° los ejes del canvas se intercambian
  const needsSwap   = orientation === 6 || orientation === 8
  const canvas      = document.createElement('canvas')
  canvas.width      = needsSwap ? height : width
  canvas.height     = needsSwap ? width  : height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    serverLogSync('error', 'compress:no-ctx', 'No se pudo obtener el contexto del canvas', { width, height })
    return file
  }

  // Transformaciones EXIF
  switch (orientation) {
    case 3: ctx.translate(width,  height); ctx.rotate(Math.PI);       break  // 180°
    case 6: ctx.translate(height, 0);      ctx.rotate(Math.PI / 2);   break  // 90° horario
    case 8: ctx.translate(0,      width);  ctx.rotate(-Math.PI / 2);  break  // 90° antihorario
  }

  ctx.drawImage(img, 0, 0, width, height)

  // --- 5. Intentar WebP a calidades descendentes --------------------------
  const webpQualities = [quality, 0.45]

  for (const q of webpQualities) {
    const blob = await canvasToBlob(canvas, 'image/webp', q)
    if (blob && blob.size < file.size) {
      const name = file.name.replace(/\.[^.]+$/, '.webp')
      serverLogSync('info', 'compress:done', 'Compresión WebP exitosa', {
        outputName: name,
        outputSize: fmtBytes(blob.size),
        quality:    q,
        ratio:      `${((1 - blob.size / file.size) * 100).toFixed(1)}% reducción`,
      })
      return new File([blob], name, { type: 'image/webp' })
    }
    serverLogSync('warn', 'compress:webp-too-large',
      `WebP a quality ${q} mayor/igual que original — siguiente intento`, {
        webpSize:     fmtBytes(blob?.size ?? 0),
        originalSize: fmtBytes(file.size),
        quality:      q,
      })
  }

  // --- 6. Fallback JPEG para PNG (JPEG comprime mucho mejor) ---------------
  if (file.type === 'image/png') {
    const blob = await canvasToBlob(canvas, 'image/jpeg', 0.80)
    if (blob && blob.size < file.size) {
      const name = file.name.replace(/\.[^.]+$/, '.jpg')
      serverLogSync('info', 'compress:done-jpeg', 'Fallback JPEG para PNG exitoso', {
        outputName: name,
        outputSize: fmtBytes(blob.size),
        ratio:      `${((1 - blob.size / file.size) * 100).toFixed(1)}% reducción`,
      })
      return new File([blob], name, { type: 'image/jpeg' })
    }
  }

  // --- 7. Sin mejor opción — devolver el original -------------------------
  serverLogSync('warn', 'compress:original-kept',
    'Todos los intentos de compresión fallaron — usando archivo original', {
      originalSize: fmtBytes(file.size),
      originalType: file.type,
    })
  return file
}
