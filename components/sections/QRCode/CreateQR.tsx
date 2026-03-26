'use client'

import { useEffect, useRef, useState } from 'react'
import QRCodeLib from 'qrcode'

interface Props {
  url:  string
  size?: number
}

export function CreateQR({ url, size = 220 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || !url) return

    QRCodeLib.toCanvas(canvasRef.current, url, {
      width:            size,
      margin:           2,
      color: {
        dark:  '#b30057', // coquette-rosa-intenso-800
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    }).catch(() => setError(true))
  }, [url, size])

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-xs"
        style={{ width: size, height: size }}
      >
        Error generando QR
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="rounded-xl shadow-md"
      style={{ width: size, height: size }}
    />
  )
}
