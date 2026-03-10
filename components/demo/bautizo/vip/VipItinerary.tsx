"use client"

import { Clock, MapPin, Calendar, ChevronRight } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipItinerary() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {vipDemoData.itinerary.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {vipDemoData.itinerary.message}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Fecha */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
            {vipDemoData.itinerary.date}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea de tiempo */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 to-orange-500"></div>

          {/* Eventos */}
          <div className="space-y-8">
            {vipDemoData.itinerary.schedule.map((event, index) => (
              <div key={index} className="relative flex items-start">
                {/* Punto de tiempo */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Contenido */}
                <div className="ml-16 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 flex-1">
                  {/* Hora y evento */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="font-bold text-gray-900">{event.time}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{event.event}</h3>
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{event.location}</p>
                    </div>
                  </div>

                  {/* Detalles */}
                  <div className="bg-white rounded-lg p-4 border border-yellow-100">
                    <p className="text-gray-700">{event.details}</p>
                  </div>

                  {/* Indicador de progreso */}
                  {index < vipDemoData.itinerary.schedule.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-8 bg-gradient-to-b from-yellow-500 to-orange-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Información Importante
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Antes del Evento
              </h4>
              <ul className="space-y-2 text-yellow-100">
                <li>• Confirmar asistencia con anticipación</li>
                <li>• Revisar código de vestimenta</li>
                <li>• Coordinar traslados si es necesario</li>
                <li>• Preparar regalos o sobres</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Durante el Evento
              </h4>
              <ul className="space-y-2 text-yellow-100">
                <li>• Llegar 30 minutos antes</li>
                <li>• Seguir el itinerario establecido</li>
                <li>• Disfrutar de cada momento</li>
                <li>• Tomar muchas fotos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contacto de emergencia */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-yellow-200 text-center">
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Contacto de Emergencia
          </h4>
          <p className="text-gray-600 mb-4">
            Para cualquier consulta o cambio en el itinerario
          </p>
          <div className="flex justify-center gap-6">
            <div>
              <p className="font-semibold text-gray-800">Carlos Martínez</p>
              <p className="text-gray-600">(81) 1234-5678</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">María Rodríguez</p>
              <p className="text-gray-600">(81) 8765-4321</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
