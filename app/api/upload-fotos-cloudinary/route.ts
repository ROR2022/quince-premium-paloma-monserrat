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
  const ua = request.headers.get('user-agent') ?? 'unknown'
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  console.log(`[upload-fotos-cloudinary] POST recibido | ip=${ip} | ua=${ua}`)

  try {
    const formData = await request.formData()
    const files    = formData.getAll('files') as File[]
    const uploaderName = formData.get('uploaderName') ?? 'anon'

    console.log(`[upload-fotos-cloudinary] uploaderName=${uploaderName} | archivos=${files.length}`)

    if (!files || files.length === 0) {
      console.warn('[upload-fotos-cloudinary] Sin archivos en FormData')
      return NextResponse.json(
        { success: false, error: 'No se recibieron archivos' },
        { status: 400 }
      )
    }

    const uploadResults = []
    const errors: string[] = []

    for (const file of files) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(2)
      console.log(`[upload-fotos-cloudinary] Procesando: ${file.name} | tipo=${file.type} | tamaño=${sizeMB} MB`)

      // Validar tipo MIME
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        console.warn(`[upload-fotos-cloudinary] RECHAZADO tipo no permitido: ${file.type}`)
        errors.push(`${file.name}: tipo no permitido (${file.type})`)
        continue
      }

      // Validar tamaño
      if (file.size > MAX_FILE_SIZE_BYTES) {
        console.warn(`[upload-fotos-cloudinary] RECHAZADO por tamaño: ${sizeMB} MB > 4.5 MB`)
        errors.push(`${file.name}: supera el límite de 4.5 MB (${sizeMB} MB)`)
        continue
      }

      try {
        const buffer   = Buffer.from(await file.arrayBuffer())
        const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        console.log(`[upload-fotos-cloudinary] Subiendo a Cloudinary: ${fileName}`)
        const result = await uploadImageToCloudinary(buffer, fileName)
        console.log(`[upload-fotos-cloudinary] ✅ Subido: publicId=${result.publicId} | ${result.width}x${result.height}`)
        uploadResults.push(result)
      } catch (uploadErr) {
        console.error(`[upload-fotos-cloudinary] ❌ Error subiendo ${file.name}:`, uploadErr)
        errors.push(`${file.name}: error al subir`)
      }
    }

    if (uploadResults.length === 0) {
      console.error('[upload-fotos-cloudinary] Ningún archivo pudo subirse. Errores:', errors)
      return NextResponse.json(
        { success: false, error: 'Ningún archivo pudo subirse', errors },
        { status: 422 }
      )
    }

    console.log(`[upload-fotos-cloudinary] ✅ Completado: ${uploadResults.length} subidas, ${errors.length} errores`)
    return NextResponse.json({
      success: true,
      uploadResults,
      ...(errors.length > 0 && { warnings: errors }),
    })
  } catch (error) {
    console.error('[upload-fotos-cloudinary] ❌ Error general:', error)
    return NextResponse.json(
      { success: false, error: 'Error al subir las imágenes' },
      { status: 500 }
    )
  }
}
