import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Photo from '@/models/Photo'

// ─── GET /api/photos/check-new ───────────────────────────────────────────────
// Detecta si hay fotos nuevas desde una marca de tiempo.
// Query param: since={timestamp ISO} — ej. since=2024-01-01T12:00:00.000Z
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const since = request.nextUrl.searchParams.get('since')

    if (!since) {
      return NextResponse.json(
        { success: false, error: 'Parámetro "since" es obligatorio' },
        { status: 400 }
      )
    }

    const sinceDate = new Date(since)

    if (isNaN(sinceDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Formato de fecha inválido. Usar ISO 8601.' },
        { status: 400 }
      )
    }

    const newPhotosCount = await Photo.countDocuments({
      isPublic:   true,
      status:     'ready',
      uploadedAt: { $gt: sinceDate },
    })

    return NextResponse.json({
      success:       true,
      newPhotosCount,
      hasNewPhotos:  newPhotosCount > 0,
    })
  } catch (error) {
    console.error('[GET /api/photos/check-new]', error)
    return NextResponse.json(
      { success: false, error: 'Error al verificar fotos nuevas' },
      { status: 500 }
    )
  }
}
