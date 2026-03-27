import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Camera } from 'lucide-react'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { DinamicGallery } from '@/components/sections/DinamicGallery'

export const metadata: Metadata = {
  title: `Galería — ${GALERIA_CONFIG.event.name}`,
}

export default function GalleryPage() {
  return (
    <>
      {/* Padding inferior para que el contenido no quede bajo la barra */}
      <div className="pb-20">
        <DinamicGallery />
      </div>

      {/* Barra de navegación fija — diseño mobile-first */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border bg-background/95 backdrop-blur-sm">
        <Link
          href={GALERIA_CONFIG.pages.home}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Inicio</span>
        </Link>

        <Link
          href={GALERIA_CONFIG.pages.upload}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Camera className="w-5 h-5" />
          <span className="text-xs font-medium">Subir fotos</span>
        </Link>
      </nav>
    </>
  )
}
