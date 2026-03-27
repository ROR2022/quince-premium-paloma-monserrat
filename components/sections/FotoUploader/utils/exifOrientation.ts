/**
 * Lee el tag de orientación EXIF de un archivo JPEG sin dependencias externas.
 * Canvas ignora este tag, causando que fotos portrait de iPhone aparezcan rotadas.
 *
 * Valores EXIF Orientation relevantes:
 *  1 = normal (no se necesita transformación)
 *  3 = 180°
 *  6 = 90° en sentido horario (portrait iPhone — el más común)
 *  8 = 90° en sentido antihorario
 */
export async function readExifOrientation(file: File): Promise<number> {
  // Solo JPEG puede tener EXIF al que Canvas no aplique automáticamente
  if (!file.type.includes('jpeg') && !file.type.includes('jpg') && !file.name.toLowerCase().match(/\.jpe?g$/)) {
    return 1
  }

  try {
    // 64 KB es suficiente para el segmento APP1 de EXIF
    const buffer = await file.slice(0, 65536).arrayBuffer()
    const view   = new DataView(buffer)

    // Verificar firma JPEG (FFD8)
    if (view.byteLength < 4 || view.getUint16(0) !== 0xFFD8) return 1

    let offset = 2
    while (offset < view.byteLength - 4) {
      // Cada marcador comienza con 0xFF
      if (view.getUint8(offset) !== 0xFF) break

      const marker = view.getUint16(offset)
      const length = view.getUint16(offset + 2) // longitud incluye los 2 bytes de length

      if (marker === 0xFFE1) {
        // APP1 — verificar identificador "Exif\0\0" (0x45786966 0000)
        if (
          offset + 10 < view.byteLength &&
          view.getUint32(offset + 4) === 0x45786966 // "Exif"
        ) {
          return parseOrientationFromTiff(view, offset + 10)
        }
      }

      if (length < 2) break
      offset += 2 + length
    }

    return 1
  } catch {
    return 1
  }
}

function parseOrientationFromTiff(view: DataView, tiffOffset: number): number {
  if (tiffOffset + 8 > view.byteLength) return 1

  // Byte order: 0x4949 = little-endian ("II"), 0x4D4D = big-endian ("MM")
  const byteOrder    = view.getUint16(tiffOffset)
  const littleEndian = byteOrder === 0x4949

  // Offset del primer IFD (relativo a tiffOffset)
  const ifd0Offset = tiffOffset + view.getUint32(tiffOffset + 4, littleEndian)
  if (ifd0Offset + 2 > view.byteLength) return 1

  const entryCount = view.getUint16(ifd0Offset, littleEndian)

  for (let i = 0; i < entryCount && i < 64; i++) {
    const entryOffset = ifd0Offset + 2 + i * 12
    if (entryOffset + 12 > view.byteLength) break

    const tag = view.getUint16(entryOffset, littleEndian)

    if (tag === 0x0112) {
      // Tag Orientation — tipo SHORT (3), count 1, valor en los próximos 2 bytes
      const orientation = view.getUint16(entryOffset + 8, littleEndian)
      return orientation >= 1 && orientation <= 8 ? orientation : 1
    }
  }

  return 1
}
