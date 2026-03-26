import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Photo from '@/models/Photo'
import cloudinary from '@/lib/cloudinary'

// ─── DELETE /api/photos/[id] ─────────────────────────────────────────────────
// Elimina la foto de MongoDB y de Cloudinary si corresponde.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const photo = await Photo.findById(id)

    if (!photo) {
      return NextResponse.json(
        { success: false, error: 'Foto no encontrada' },
        { status: 404 }
      )
    }

    // Eliminar de Cloudinary si fue subida ahí
    if (photo.uploadSource === 'cloudinary' && photo.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(photo.cloudinaryId)
      } catch (cloudinaryError) {
        // No bloquear la eliminación de MongoDB si Cloudinary falla
        console.warn('[DELETE /api/photos] Error eliminando de Cloudinary:', cloudinaryError)
      }
    }

    await photo.deleteOne()

    return NextResponse.json({ success: true, message: 'Foto eliminada' })
  } catch (error) {
    console.error('[DELETE /api/photos/[id]]', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar la foto' },
      { status: 500 }
    )
  }
}
