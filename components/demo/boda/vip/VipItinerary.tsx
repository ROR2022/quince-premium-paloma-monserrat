"use client"

import { useState } from 'react'
import { MapPin, Clock, Crown, Sparkles } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipItinerary() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'preparation':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'photos':
        return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'ceremony':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'reception':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'party':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'farewell':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'preparation':
        return 'Preparación'
      case 'photos':
        return 'Fotografía'
      case 'ceremony':
        return 'Ceremonia'
      case 'reception':
        return 'Recepción'
      case 'party':
        return 'Fiesta'
      case 'farewell':
        return 'Despedida'
      default:
        return 'Evento'
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
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
            📅 ITINERARIO COMPLETO
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            <Crown className="w-8 h-8 text-yellow-500 fill-current" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre cada momento especial de nuestro día de boda, desde la preparación 
            hasta la despedida. Cada evento ha sido cuidadosamente planeado para crear 
            una experiencia inolvidable.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 to-amber-500 h-full hidden md:block"></div>
          
          {/* Eventos */}
          <div className="space-y-8">
            {vipDemoData.itinerary.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8 gap-4`}
              >
                {/* Contenido del evento */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
                  <div 
                    className={`bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                      selectedEvent === index ? 'ring-2 ring-yellow-400' : ''
                    }`}
                    onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                  >
                    {/* Header del evento */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{event.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{event.activity}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold text-amber-600">{event.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Badge de tipo */}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(event.type)}`}>
                        {getTypeLabel(event.type)}
                      </div>
                    </div>

                    {/* Información del evento */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                      
                      {selectedEvent === index && (
                        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-sm text-amber-800">
                            <strong>Dirección:</strong> {event.address}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Punto central en la línea */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Espacio vacío para alineación */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-8 h-8 text-amber-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            Planificación Detallada
          </h3>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Cada momento ha sido cuidadosamente planificado para asegurar que 
            todos nuestros invitados disfruten de una experiencia completa y memorable.
          </p>
        </div>

        {/* Leyenda de tipos */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Tipos de Eventos</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['preparation', 'photos', 'ceremony', 'reception', 'party', 'farewell'].map((type) => (
              <div key={type} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getTypeColor(type)}`}>
                <div className="w-3 h-3 rounded-full bg-current opacity-60"></div>
                <span className="text-sm font-medium">{getTypeLabel(type)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>💡 Demo:</strong> Este itinerario VIP incluye 12 eventos detallados. 
            En tu invitación real, podrás personalizar completamente el cronograma y agregar hasta 20 eventos.
          </p>
        </div>
      </div>
    </section>
  )
} 