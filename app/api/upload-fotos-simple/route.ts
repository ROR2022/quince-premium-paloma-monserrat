import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { GALERIA_CONFIG } from '@/config/galeria.config'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE_BYTES = 4.5 * 1024 * 1024 // 4.5 MB

// ─── POST /api/upload-fotos-simple ───────────────────────────────────────────
// Fallback local: guarda la imagen en /public/uploads/{slug}/fotos/{date}/
// Solo se usa si Cloudinary falla. En producción (Vercel) el filesystem
// es efímero, por lo que este endpoint es solo para desarrollo local.
//
// FormData fields:
//   file  — un archivo de imagen (uno por request)
//   uploaderName — nombre del invitado (opcional)
export async function POST(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? 'unknown'
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  console.log(`[upload-fotos-simple] POST recibido (FALLBACK LOCAL) | ip=${ip} | ua=${ua}`)

  try {
    const formData = await request.formData()
    const file     = formData.get('file') as File | null
    const uploaderName = formData.get('uploaderName') ?? 'anon'

    console.log(`[upload-fotos-simple] uploaderName=${uploaderName}`)

    if (!file) {
      console.warn('[upload-fotos-simple] Sin archivo en FormData')
      return NextResponse.json(
        { success: false, error: 'No se recibió ningún archivo' },
        { status: 400 }
      )
    }

    const sizeMB = (file.size / 1024 / 1024).toFixed(2)
    console.log(`[upload-fotos-simple] Archivo: ${file.name} | tipo=${file.type} | tamaño=${sizeMB} MB`)

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.warn(`[upload-fotos-simple] RECHAZADO tipo: ${file.type}`)
      return NextResponse.json(
        { success: false, error: `Tipo de archivo no permitido: ${file.type}` },
        { status: 422 }
      )
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      console.warn(`[upload-fotos-simple] RECHAZADO tamaño: ${sizeMB} MB > 4.5 MB`)
      return NextResponse.json(
        { success: false, error: `El archivo supera el límite de 4.5 MB (${sizeMB} MB)` },
        { status: 422 }
      )
    }

    // Construir path usando el slug del config (único dato del evento aquí)
    const dateFolder = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const uploadDir  = path.join(
      process.cwd(),
      'public',
      'uploads',
      GALERIA_CONFIG.event.slug,
      'fotos',
      dateFolder
    )

    console.log(`[upload-fotos-simple] Guardando en: ${uploadDir}`)
    await mkdir(uploadDir, { recursive: true })

    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const filePath = path.join(uploadDir, safeName)

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)
    console.log(`[upload-fotos-simple] ✅ Guardado localmente: ${safeName}`)

    // Ruta accesible desde el browser (relativa a /public)
    const publicPath = `/uploads/${GALERIA_CONFIG.event.slug}/fotos/${dateFolder}/${safeName}`

    return NextResponse.json({
      success: true,
      files: [
        {
          originalName: file.name,
          filePath:     publicPath,
          fileSize:     file.size,
        },
      ],
    })
  } catch (error) {
    console.error('[upload-fotos-simple] ❌ Error general:', error)
    return NextResponse.json(
      { success: false, error: 'Error al guardar el archivo localmente' },
      { status: 500 }
    )
  }
}
