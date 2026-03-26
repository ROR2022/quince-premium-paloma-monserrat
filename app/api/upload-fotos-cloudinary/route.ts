import { NextRequest, NextResponse } from 'next/server'
import { uploadImageToCloudinary } from '@/lib/uploadToCloudinary'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE_BYTES = 4.5 * 1024 * 1024 // 4.5 MB

// ─── POST /api/upload-fotos-cloudinary ───────────────────────────────────────
// Recibe archivos via FormData, los valida y los sube a Cloudinary.
// El registro en MongoDB se hace por separado en POST /api/photos.
//
// FormData fields:
//   files   — uno o más archivos de imagen
//   uploaderName — nombre del invitado (opcional, solo para logging)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files    = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No se recibieron archivos' },
        { status: 400 }
      )
    }

    const uploadResults = []
    const errors: string[] = []

    for (const file of files) {
      // Validar tipo MIME
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        errors.push(`${file.name}: tipo no permitido (${file.type})`)
        continue
      }

      // Validar tamaño
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1)
        errors.push(`${file.name}: supera el límite de 4.5 MB (${sizeMB} MB)`)
        continue
      }

      const buffer   = Buffer.from(await file.arrayBuffer())
      const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')

      const result = await uploadImageToCloudinary(buffer, fileName)
      uploadResults.push(result)
    }

    if (uploadResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Ningún archivo pudo subirse', errors },
        { status: 422 }
      )
    }

    return NextResponse.json({
      success: true,
      uploadResults,
      ...(errors.length > 0 && { warnings: errors }),
    })
  } catch (error) {
    console.error('[POST /api/upload-fotos-cloudinary]', error)
    return NextResponse.json(
      { success: false, error: 'Error al subir las imágenes' },
      { status: 500 }
    )
  }
}
