import type { Metadata } from 'next'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { FotoUploader } from '@/components/sections/FotoUploader'

export const metadata: Metadata = {
  title: `Subir fotos — ${GALERIA_CONFIG.event.name}`,
}

export default function FotosPage() {
  return <FotoUploader />
}
