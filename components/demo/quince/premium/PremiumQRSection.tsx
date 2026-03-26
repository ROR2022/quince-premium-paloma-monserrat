'use client'

import { QrCode } from 'lucide-react'
import { GALERIA_CONFIG } from '@/config/galeria.config'
import { QRCode } from '@/components/sections/QRCode'

/**
 * Sección de integración del QR en la landing de este proyecto.
 * Usa el tema Coquette explícitamente — es específica del proyecto.
 * El componente QRCode que renderiza sí es del núcleo portátil.
 */
export function PremiumQRSection() {
  const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}${GALERIA_CONFIG.pages.upload}`

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-coquette-rosa-intenso-50 to-coquette-rosa-claro-100">
      <div className="max-w-lg mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-coquette-rosa-intenso-500 to-coquette-rosa-intenso-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <QrCode className="w-4 h-4" />
          Galería colaborativa
        </div>

        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold text-coquette-rosa-intenso-800 mb-3">
          {GALERIA_CONFIG.qr.title}
        </h2>
        <p className="text-coquette-rosa-intenso-600 mb-8 max-w-sm mx-auto">
          {GALERIA_CONFIG.qr.subtitle}
        </p>

        {/* QR */}
        <div className="bg-white rounded-3xl shadow-xl p-8 inline-block">
          <QRCode url={qrUrl} size={200} />
        </div>

        {/* Instrucción */}
        <p className="text-xs text-gray-400 mt-6">
          Las fotos aparecerán en la galería en tiempo real
        </p>
      </div>
    </section>
  )
}
