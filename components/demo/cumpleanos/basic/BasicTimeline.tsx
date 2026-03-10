"use client"

import { Clock } from 'lucide-react'
import { basicDemoData } from './data/basic-demo-data'

export function BasicTimeline() {
  const { timeline, theme } = basicDemoData

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-4`}>
            🕐 Cronograma del Salvaje Oeste
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            El itinerario completo de nuestra aventura vaquera
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Línea central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>

            {/* Eventos del timeline */}
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Círculo central */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                    <span className="text-2xl">{event.icon}</span>
                  </div>

                  {/* Contenido del evento */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-amber-500 hover:shadow-2xl transition-all duration-300 group">
                      {/* Hora */}
                      <div className="flex items-center mb-3 text-amber-700">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="font-bold text-lg">{event.time}</span>
                      </div>

                      {/* Actividad */}
                      <h3 className="text-xl font-bold text-amber-800 mb-2 group-hover:text-amber-900 transition-colors">
                        {event.activity}
                      </h3>

                      {/* Descripción */}
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Decoración temática */}
                      <div className="mt-4 flex justify-center">
                        <div className="w-16 h-1 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Flecha indicadora */}
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                      <div className="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-amber-400"
                           style={{
                             [index % 2 === 0 ? 'borderLeftWidth' : 'borderRightWidth']: '12px',
                             [index % 2 === 0 ? 'borderRightWidth' : 'borderLeftWidth']: '0px'
                           }}>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <span className="text-3xl mr-3">🤠</span>
              ¡Consejos del Sheriff!
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-bold text-lg mb-2">👢 Qué traer:</h4>
                <ul className="space-y-1 text-amber-100">
                  <li>• Sombrero vaquero (opcional)</li>
                  <li>• Botas cómodas para caminar</li>
                  <li>• Cámara para los recuerdos</li>
                  <li>• Mucha energía para divertirse</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">🌟 Actividades especiales:</h4>
                <ul className="space-y-1 text-amber-100">
                  <li>• Competencia de lazo</li>
                  <li>• Búsqueda del oro perdido</li>
                  <li>• Fotos con caballos</li>
                  <li>• Duelo de pistolas de agua</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
