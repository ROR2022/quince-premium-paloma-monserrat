'use client'

import Link from 'next/link'
import { Images } from 'lucide-react'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { CreateQR } from './CreateQR'
import { QRDownloadButton } from './QRDownloadButton'

interface Props {
  /** URL a la que apunta el QR — la decide quien use el componente */
  url: string
  size?: number
}

export function QRCode({ url, size = 220 }: Props) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">

      {/* Canvas del QR envuelto en un div con id para la descarga */}
      <div id="qr-download-target" className="bg-white p-4 rounded-2xl shadow-md inline-block">
        <CreateQR url={url} size={size} />
      </div>

      {/* URL visible bajo el QR */}
      <p className="text-xs text-gray-400 max-w-xs break-all">{url}</p>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3">
        <QRDownloadButton
          targetId="qr-download-target"
          fileName={`qr-${GALERIA_CONFIG.event.slug}.png`}
          label={GALERIA_CONFIG.qr.downloadLabel}
        />
        <Link
          href={GALERIA_CONFIG.pages.gallery}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-coquette-rosa-intenso-500 to-coquette-rosa-intenso-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-coquette-rosa-intenso-600 hover:to-coquette-rosa-intenso-700 transition-all"
        >
          <Images className="w-4 h-4" />
          Ver galería
        </Link>
      </div>
    </div>
  )
}
