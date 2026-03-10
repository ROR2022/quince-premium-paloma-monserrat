"use client"

import { useRef } from "react"
import { 
  Clock, 
  MapPin, 
  ExternalLink,
  Crown,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { vipDemoData } from "./data/vip-demo-data"

export function VipItinerary() {
  const ref = useRef<HTMLDivElement>(null)

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'preparation':
        return 'from-pink-400 to-rose-400'
      case 'photos':
        return 'from-purple-400 to-violet-400'
      case 'ceremony':
        return 'from-blue-400 to-indigo-400'
      case 'reception':
        return 'from-yellow-400 to-amber-400'
      case 'party':
        return 'from-green-400 to-emerald-400'
      case 'farewell':
        return 'from-gray-400 to-slate-400'
      default:
        return 'from-yellow-400 to-amber-400'
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'preparation':
        return { label: 'Preparación', color: 'text-pink-700 bg-pink-100' }
      case 'photos':
        return { label: 'Fotografía', color: 'text-purple-700 bg-purple-100' }
      case 'ceremony':
        return { label: 'Ceremonia', color: 'text-blue-700 bg-blue-100' }
      case 'reception':
        return { label: 'Recepción', color: 'text-yellow-700 bg-yellow-100' }
      case 'party':
        return { label: 'Fiesta', color: 'text-green-700 bg-green-100' }
      case 'farewell':
        return { label: 'Despedida', color: 'text-gray-700 bg-gray-100' }
      default:
        return { label: 'Evento', color: 'text-amber-700 bg-amber-100' }
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div
        ref={ref}
        className="max-w-4xl mx-auto opacity-100 translate-y-0"
      >
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
            📅 ITINERARIO COMPLETO
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Planificación detallada de todo el día para que no se pierdan ni un momento especial.
            Desde la preparación hasta la despedida.
          </p>
        </div>

        {/* Timeline del itinerario */}
        <div className="relative">
          {/* Línea central del timeline - solo visible en desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 to-amber-500 h-full rounded-full"></div>
          
          {/* Línea lateral del timeline - solo visible en móvil */}
          <div className="md:hidden absolute left-6 w-1 bg-gradient-to-b from-yellow-400 to-amber-500 h-full rounded-full"></div>
          
          <div className="space-y-6 md:space-y-8">
            {vipDemoData.itinerary.map((event, index) => (
              <div 
                key={index} 
                className={`relative flex items-center ${
                  // En móvil: siempre alineado a la izquierda
                  // En desktop: alternancia izquierda/derecha
                  'md:' + (index % 2 === 0 ? 'justify-start' : 'justify-end')
                }`}
              >
                {/* Indicador de tiempo - responsive */}
                <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg border-2 md:border-4 border-white z-10">
                  {event.time}
                </div>
                
                {/* Tarjeta del evento - responsive */}
                <div className={`
                  w-full ml-16 md:ml-0 md:w-5/12 
                  ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}
                `}>
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border-2 border-yellow-100 p-4 md:p-6 hover:shadow-2xl transition-all duration-300 vip-glow">
                    {/* Header del evento */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0">
                        <div className={`text-lg md:text-2xl p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${getTypeColor(event.type)} text-white shadow-lg`}>
                          {event.icon}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base md:text-lg font-bold text-amber-800 leading-tight">
                          {event.activity}
                        </h3>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(event.type).color} mt-1`}>
                          {getTypeBadge(event.type).label}
                        </div>
                      </div>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-amber-600 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    {/* Ubicación */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-start gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="min-w-0">{event.location}</span>
                      </h4>
                      <p className="text-xs text-amber-600 pl-6 break-words">
                        {event.address}
                      </p>
                    </div>
                    
                    {/* Botón de ubicación */}
                    {event.address !== "Residencia familiar" && (
                      <Button 
                        asChild
                        size="sm"
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-900 font-semibold"
                      >
                        <a 
                          href={getGoogleMapsUrl(event.address)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Ver ubicación
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                    
                    {event.address === "Residencia familiar" && (
                      <div className="w-full text-center py-2 px-4 bg-yellow-50 text-amber-600 text-sm rounded-lg border border-yellow-200">
                        📍 Ubicación privada
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional VIP */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Resumen por tipo */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-yellow-200">
            <h4 className="text-base md:text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
              <Crown className="w-4 md:w-5 h-4 md:h-5 text-yellow-600 fill-current flex-shrink-0" />
              <span>Resumen del Día</span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-amber-700 text-sm">Duración total:</span>
                <span className="font-semibold text-amber-800">15 horas</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-700 text-sm">Ubicaciones:</span>
                <span className="font-semibold text-amber-800">5 diferentes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-700 text-sm">Tipos de eventos:</span>
                <span className="font-semibold text-amber-800">6 categorías</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-700 text-sm">Traslados:</span>
                <span className="font-semibold text-amber-800">4 necesarios</span>
              </div>
            </div>
          </div>
          
          {/* Recordatorios importantes */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-yellow-200">
            <h4 className="text-base md:text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-yellow-600 flex-shrink-0" />
              <span>Recordatorios Importantes</span>
            </h4>
            <div className="space-y-3 text-sm text-amber-700">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Llegar 30 min antes a cada ubicación</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Confirmar transportación entre venues</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Tener números de contacto de cada lugar</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Verificar horarios de traffic y rutas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nota explicativa VIP */}
        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl md:rounded-2xl border-2 border-yellow-200 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 md:gap-4">
            <Crown className="w-5 md:w-6 h-5 md:h-6 text-yellow-600 fill-current flex-shrink-0 mt-1" />
            <div className="min-w-0">
              <h4 className="font-bold text-amber-800 mb-2 text-sm md:text-base">Planificación VIP Completa</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                Este itinerario detallado te permite coordinar todos los aspectos logísticos del evento. 
                Cada horario ha sido cuidadosamente planificado considerando traslados, preparación y 
                momentos de descanso para garantizar que todo fluya perfectamente.
              </p>
              <div className="mt-3 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-amber-600">
                  💎 <strong>VIP Exclusivo:</strong> El itinerario completo con timeline detallado 
                  está disponible únicamente en el paquete VIP para logística integral del evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 