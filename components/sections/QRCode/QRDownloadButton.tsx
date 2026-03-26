'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

interface Props {
  targetId: string   // id del elemento a capturar
  fileName?: string
  label?:   string
}

export function QRDownloadButton({ targetId, fileName = 'qr-evento.png', label = 'Descargar QR' }: Props) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const element = document.getElementById(targetId)
      if (!element) return

      // html2canvas v1.x options — los @types instalados son para v0.5
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const canvas  = await html2canvas(element, { scale: 2 } as any)
      const dataUrl = canvas.toDataURL('image/png')

      const link    = document.createElement('a')
      link.href     = dataUrl
      link.download = fileName
      link.click()
    } catch (err) {
      console.error('Error al descargar QR:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center gap-2 border border-coquette-rosa-intenso-400 text-coquette-rosa-intenso-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-coquette-rosa-intenso-50 transition-colors disabled:opacity-50"
    >
      {downloading
        ? <Loader2 className="w-4 h-4 animate-spin" />
        : <Download className="w-4 h-4" />
      }
      {label}
    </button>
  )
}
