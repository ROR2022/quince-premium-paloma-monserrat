"use client"

import { MapPin, Clock, Users, Shirt, AlertCircle } from 'lucide-react'
import { basicDemoData } from './data/basic-demo-data'

export function BasicInfo() {
  const { event, theme } = basicDemoData

  return (
    <section className={`py-16 ${theme.background}`}>
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-4`}>
            🤠 Información del Evento
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Todo lo que necesitas saber para la gran aventura en el Salvaje Oeste
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Información de la ceremonia */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-amber-500">
            <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
              🎪 Ceremonia Principal
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Fecha y Hora</p>
                  <p className="text-gray-600">{event.ceremony.date}</p>
                  <p className="text-amber-700 font-medium">{event.ceremony.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">{event.ceremony.location}</p>
                  <p className="text-gray-600">{event.ceremony.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de la celebración */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-orange-800 mb-6 flex items-center">
              🎉 Celebración y Fiesta
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Fecha y Hora</p>
                  <p className="text-gray-600">{event.celebration.date}</p>
                  <p className="text-orange-700 font-medium">{event.celebration.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">{event.celebration.location}</p>
                  <p className="text-gray-600">{event.celebration.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de los padres */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
              👨‍👩‍👦 Familia del Sheriff
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Papás</p>
                  <p className="text-gray-600">{event.parents.father}</p>
                  <p className="text-gray-600">{event.parents.mother}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Padrinos</p>
                  <p className="text-gray-600">{event.padrinos.padrino}</p>
                  <p className="text-gray-600">{event.padrinos.madrina}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Código de vestimenta y restricciones */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-yellow-500">
            <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center">
              👕 Información Importante
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shirt className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Código de Vestimenta</p>
                  <p className="text-gray-600">{event.dressCode}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Restricciones</p>
                  <p className="text-gray-600">{event.restrictions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">¡No te pierdas la aventura!</h3>
            <p className="text-lg mb-6">
              Únete a nosotros en esta increíble celebración del Salvaje Oeste
            </p>
            <div className="flex justify-center space-x-4 text-3xl">
              🤠 🐎 🌵 ⭐ 🎪
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
