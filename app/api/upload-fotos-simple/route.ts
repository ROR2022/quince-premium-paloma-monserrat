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
  try {
    const formData = await request.formData()
    const file     = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se recibió ningún archivo' },
        { status: 400 }
      )
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `Tipo de archivo no permitido: ${file.type}` },
        { status: 422 }
      )
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1)
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

    await mkdir(uploadDir, { recursive: true })

    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const filePath = path.join(uploadDir, safeName)

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

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
    console.error('[POST /api/upload-fotos-simple]', error)
    return NextResponse.json(
      { success: false, error: 'Error al guardar el archivo localmente' },
      { status: 500 }
    )
  }
}
