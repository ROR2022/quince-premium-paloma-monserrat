import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Photo from '@/models/Photo'

// ─── GET /api/photos ─────────────────────────────────────────────────────────
// Lista fotos paginadas, ordenadas por fecha descendente.
// Query params: page (default 1), limit (default 20)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = request.nextUrl
    const page  = Math.max(1, parseInt(searchParams.get('page')  ?? '1',  10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
    const skip  = (page - 1) * limit

    const filter = { isPublic: true, status: 'ready' }

    const [docs, total] = await Promise.all([
      Photo.find(filter)
        .sort({ uploadedAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      Photo.countDocuments(filter),
    ])

    // toJSON() activa los virtuals definidos en el schema (displayUrl)
    const photos = docs.map((d) => d.toJSON())

    const pages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      photos,
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('[GET /api/photos]', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener las fotos' },
      { status: 500 }
    )
  }
}

// ─── POST /api/photos ────────────────────────────────────────────────────────
// Registra los metadatos de una foto ya subida a Cloudinary o almacenamiento local.
export async function POST(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? 'unknown'
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  console.log(`[photos POST] Solicitud de registro | ip=${ip} | ua=${ua}`)

  try {
    console.log('[photos POST] Conectando a MongoDB...')
    await connectDB()
    console.log('[photos POST] MongoDB OK')

    const body = await request.json()

    const {
      filename,
      originalName,
      cloudinaryId,
      cloudinaryUrl,
      localPath,
      uploadSource,
      fileSize,
      mimeType,
      dimensions,
      uploader,
      eventMoment = 'general',
      comment = '',
    } = body

    const sizeMB = fileSize ? (fileSize / 1024 / 1024).toFixed(2) : 'n/a'
    console.log(`[photos POST] Datos recibidos: filename=${filename} | source=${uploadSource} | size=${sizeMB}MB | uploader=${uploader?.name} | cloudinaryUrl=${cloudinaryUrl ?? 'null'}`)

    if (!filename || !originalName || !uploadSource || !fileSize || !mimeType) {
      const missing = { filename: !filename, originalName: !originalName, uploadSource: !uploadSource, fileSize: !fileSize, mimeType: !mimeType }
      console.warn('[photos POST] Campos obligatorios faltantes:', missing)
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const ip        = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? ''
    const userAgent = request.headers.get('user-agent') ?? ''

    const photo = await Photo.create({
      filename,
      originalName,
      cloudinaryId:  cloudinaryId  ?? null,
      cloudinaryUrl: cloudinaryUrl ?? null,
      localPath:     localPath     ?? null,
      uploadSource,
      fileSize,
      mimeType,
      dimensions,
      uploader: {
        name: uploader?.name ?? 'Anónimo',
        ip,
        userAgent,
      },
      eventMoment,
      comment,
    })

    console.log(`[photos POST] ✅ Foto registrada en DB: _id=${photo._id} | publicId=${photo.cloudinaryId ?? 'local'}`)
    return NextResponse.json({ success: true, photo }, { status: 201 })
  } catch (error) {
    console.error('[photos POST] ❌ Error general:', error)
    return NextResponse.json(
      { success: false, error: 'Error al registrar la foto' },
      { status: 500 }
    )
  }
}
