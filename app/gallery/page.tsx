import type { Metadata } from 'next'
import Link from 'next/link'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { DinamicGallery } from '@/components/sections/DinamicGallery'

export const metadata: Metadata = {
  title: `Galería — ${GALERIA_CONFIG.event.name}`,
}

export default function GalleryPage() {
  return (
    <>
      <DinamicGallery />
      {/* Links de navegación fijos en la parte inferior */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        <Link
          href={GALERIA_CONFIG.pages.upload}
          className="bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-xs font-medium shadow-lg hover:opacity-90 transition-all"
        >
          📸 Subir fotos
        </Link>
        <Link
          href={GALERIA_CONFIG.pages.home}
          className="bg-background text-primary border border-border px-4 py-2.5 rounded-full text-xs font-medium shadow-lg hover:bg-muted transition-all"
        >
          ← Invitación
        </Link>
      </div>
    </>
  )
}
