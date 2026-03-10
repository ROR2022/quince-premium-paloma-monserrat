"use client"

import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import html2canvas from "html2canvas"
import { 
  Crown, 
  Sparkles, 
  User, 
  Download,
  Calendar,
  MapPin,
  Clock,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function VipGuestPasses() {
  const ref = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const [guestName, setGuestName] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)

  // Información del evento desde los datos
  const eventInfo = {
    quinceaneraName: "Isabella María",
    date: "15 de Diciembre, 2024",
    time: "3:00 PM",
    location: "Salón Los Encinos",
    address: "Carr. Nacional 456, Valle Alto"
  }

  const downloadInvitation = async () => {
    if (!guestName.trim()) {
      alert("Por favor ingresa el nombre del invitado")
      return
    }

    if (!previewRef.current) return

    setIsDownloading(true)
    
    try {
      // Capturar el elemento DOM como canvas
      const canvas = await html2canvas(previewRef.current)
      
      // Convertir canvas a blob
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Error al generar la imagen")
        }
        
        // Crear URL temporal para el blob
        const url = URL.createObjectURL(blob)
        
        // Crear enlace de descarga
        const link = document.createElement('a')
        link.download = `invitacion-${guestName.replace(/\s+/g, '-').toLowerCase()}.png`
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Limpiar URL temporal
        URL.revokeObjectURL(url)
        
        alert(`¡Invitación para ${guestName} descargada exitosamente!`)
      }, 'image/png', 0.95)
      
    } catch (error) {
      console.error('Error al descargar:', error)
      alert("Error al descargar la invitación. Inténtalo de nuevo.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header VIP */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-bold mb-4 md:mb-6 shadow-xl border-2 border-yellow-300">
            <div className="flex items-center gap-2">
              <Crown className="w-4 md:w-5 h-4 md:h-5 fill-current" />
              <span>Característica VIP Exclusiva</span>
              <Sparkles className="w-4 md:w-5 h-4 md:h-5" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
            🎫 INVITACIONES PERSONALIZADAS
          </h2>
          
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-2 md:mx-4"></div>
            <User className="w-6 md:w-8 h-6 md:h-8 text-yellow-500" />
            <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-2 md:mx-4"></div>
          </div>
          
          <p className="text-base md:text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Crea invitaciones personalizadas con el nombre de cada invitado. 
            Descárgalas como imagen para compartir por WhatsApp o redes sociales.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8 md:mb-12">
          
          {/* Columna izquierda: Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl border-2 border-yellow-100">
              <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-4 md:mb-6 flex items-center gap-2">
                <User className="w-5 md:w-6 h-5 md:h-6" />
                Personalizar Invitación
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2">
                    Nombre del invitado o familia:
                  </label>
                  <Input
                    type="text"
                    placeholder="Ej: Familia González, María Elena, etc."
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full text-base md:text-lg p-3 md:p-4 border-2 border-yellow-200 focus:border-yellow-400 rounded-lg"
                    maxLength={50}
                  />
                  <p className="text-xs text-amber-600 mt-1">
                    Máximo 50 caracteres ({guestName.length}/50)
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-amber-800 mb-2 text-sm">💡 Consejos:</h4>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li>• Para familias: &ldquo;Familia García&rdquo;, &ldquo;Los Hernández&rdquo;</li>
                    <li>• Para personas: &ldquo;María Elena&rdquo;, &ldquo;Juan Carlos&rdquo;</li>
                    <li>• Para parejas: &ldquo;Ana y Roberto&rdquo;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Vista previa */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl border-2 border-yellow-100">
              <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-4 md:mb-6 flex items-center gap-2">
                <Sparkles className="w-5 md:w-6 h-5 md:h-6" />
                Vista Previa
              </h3>
              
              {/* Invitación preview */}
              <div
                ref={previewRef}
                className="bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-100 rounded-xl border-4 border-yellow-300 p-6 md:p-8 shadow-lg min-h-[400px] flex flex-col justify-center"
              >
                {/* Header de la invitación */}
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <Crown className="w-4 h-4 inline mr-1" />
                    Te invitamos
                  </div>
                  
                  <div className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
                    {guestName || "Escribe un nombre..."}
                  </div>
                  
                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto"></div>
                </div>
                
                {/* Información del evento */}
                <div className="text-center space-y-4">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-amber-800 mb-2">
                      A los XV años de
                    </h4>
                    <div className="text-2xl md:text-3xl font-bold text-yellow-600 mb-4">
                      {eventInfo.quinceaneraName}
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-amber-700">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{eventInfo.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{eventInfo.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{eventInfo.location}</span>
                    </div>
                    
                    <div className="text-sm text-amber-600">
                      {eventInfo.address}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-yellow-300">
                    <div className="flex items-center justify-center gap-2 text-yellow-600">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">¡Tu presencia es nuestro mejor regalo!</span>
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
              
              {guestName.trim() === "" && (
                <p className="text-center text-amber-600 text-sm mt-4">
                  👆 La vista previa se actualizará cuando escribas un nombre
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Botón de descarga */}
        <div className="text-center">
          <Button
            onClick={downloadInvitation}
            disabled={!guestName.trim() || isDownloading}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-900 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-900 mr-3"></div>
                Generando invitación...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-3" />
                Descargar Invitación
              </>
            )}
          </Button>
          
          {!guestName.trim() && (
            <p className="text-amber-600 text-sm mt-3">
              Ingresa un nombre para habilitar la descarga
            </p>
          )}
        </div>

        {/* Nota explicativa VIP */}
        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl md:rounded-2xl border-2 border-yellow-200 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 md:gap-4">
            <Crown className="w-5 md:w-6 h-5 md:h-6 text-yellow-600 fill-current flex-shrink-0 mt-1" />
            <div className="min-w-0">
              <h4 className="font-bold text-amber-800 mb-2 text-sm md:text-base">
                Invitaciones VIP Personalizadas
              </h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                Crea invitaciones únicas para cada uno de tus invitados. Cada invitación 
                se genera con el nombre personalizado y se puede descargar como imagen 
                de alta calidad para compartir por WhatsApp, redes sociales o imprimir.
              </p>
              <div className="mt-3 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-amber-600">
                  💎 <strong>VIP Exclusivo:</strong> Las invitaciones personalizadas están 
                  disponibles únicamente en el paquete VIP para una experiencia más exclusiva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 