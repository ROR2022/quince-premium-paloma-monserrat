"use client"

import { useState, useRef } from 'react'
import { Download, QrCode, Crown, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { vipDemoData } from './data/vip-demo-data'

export function VipGuestPasses() {
  const [selectedPass, setSelectedPass] = useState<string | null>(null)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const passRef = useRef<HTMLDivElement>(null)

  const generateQRCode = (passId: string, guestName: string) => {
    // En una implementación real, esto generaría un QR code real
    // Por ahora, simulamos con un div estilizado
    return `QR-${passId}-${guestName.replace(/\s+/g, '-')}`
  }

  const downloadPass = async () => {
    if (!passRef.current || !selectedPass) return

    try {
      // En una implementación real, usaríamos html2canvas para generar la imagen
      // Por ahora, simulamos la descarga
      const pass = vipDemoData.guestPasses.find(p => p.id === selectedPass)
      if (!pass) return

      // Simular descarga
      const link = document.createElement('a')
      link.download = `pase-${pass.type.toLowerCase()}-${guestName}.png`
      link.href = '#'
      link.click()
      
      alert('Pase descargado exitosamente! (Demo)')
    } catch (error) {
      console.error('Error al descargar pase:', error)
      alert('Error al descargar el pase')
    }
  }

  const selectedPassData = selectedPass ? vipDemoData.guestPasses.find(p => p.id === selectedPass) : null

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        {/* Header VIP */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2 border-yellow-300">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 fill-current" />
              <span>Característica VIP Exclusiva</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            🎫 PASES DE INVITADOS
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            <Crown className="w-8 h-8 text-yellow-500 fill-current" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Genera pases personalizados para tus invitados con códigos QR únicos. 
            Cada tipo de pase incluye beneficios específicos y acceso diferenciado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Selección de pases */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-amber-800 mb-6">Tipos de Pases Disponibles</h3>
            
            {vipDemoData.guestPasses.map((pass) => (
              <div
                key={pass.id}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                  selectedPass === pass.id 
                    ? 'border-yellow-400 ring-2 ring-yellow-200' 
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
                onClick={() => setSelectedPass(pass.id)}
              >
                {/* Header del pase */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${pass.color} flex items-center justify-center text-white text-xl`}>
                      {pass.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{pass.type}</h4>
                      <p className="text-sm text-gray-600">{pass.description}</p>
                    </div>
                  </div>
                  
                  {selectedPass === pass.id && (
                    <Check className="w-6 h-6 text-yellow-500 fill-current" />
                  )}
                </div>

                {/* Características del pase */}
                <div className="space-y-2">
                  {pass.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Generador de pases */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-amber-800 mb-6">Generar Pase Personalizado</h3>
            
            {selectedPassData ? (
              <div className="space-y-4">
                {/* Formulario */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Invitado
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Ej: María González"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="maria@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Vista previa del pase */}
                {guestName && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Vista Previa del Pase</h4>
                    
                    <div 
                      ref={passRef}
                      className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${selectedPassData.borderColor} overflow-hidden`}
                    >
                      {/* Header del pase */}
                      <div className={`bg-gradient-to-r ${selectedPassData.color} text-white p-4 rounded-xl mb-4`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{selectedPassData.icon}</span>
                            <div>
                              <h5 className="text-lg font-bold">{selectedPassData.type}</h5>
                              <p className="text-sm opacity-90">{selectedPassData.description}</p>
                            </div>
                          </div>
                          <Crown className="w-6 h-6 fill-current" />
                        </div>
                      </div>

                      {/* Información del invitado */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Invitado</p>
                          <p className="font-semibold text-gray-900">{guestName}</p>
                        </div>
                        
                        {guestEmail && (
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900">{guestEmail}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-600">Evento</p>
                          <p className="font-semibold text-gray-900">Boda Ana & Carlos</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">Fecha</p>
                          <p className="font-semibold text-gray-900">{vipDemoData.event.date.full}</p>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="flex justify-center">
                        <div 
                          className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
                          style={{ backgroundColor: selectedPassData.qrColor + '20' }}
                        >
                          <QrCode className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>

                      {/* Código único */}
                      <div className="text-center mt-3">
                        <p className="text-xs text-gray-500">Código único</p>
                        <p className="text-sm font-mono text-gray-700">
                          {generateQRCode(selectedPassData.id, guestName)}
                        </p>
                      </div>
                    </div>

                    {/* Botón de descarga */}
                    <Button
                      onClick={downloadPass}
                      className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
                      disabled={!guestName}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Pase
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Selecciona un tipo de pase para comenzar a generar tu pase personalizado
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-8 h-8 text-amber-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            Sistema de Acceso Inteligente
          </h3>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Cada pase incluye un código QR único que permite acceso diferenciado 
            según el tipo de invitado, asegurando una experiencia personalizada para todos.
          </p>
        </div>

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>💡 Demo:</strong> Este sistema VIP incluye 3 tipos de pases con códigos QR únicos. 
            En tu invitación real, podrás personalizar los tipos de pases y generar hasta 200 pases individuales.
          </p>
        </div>
      </div>
    </section>
  )
} 