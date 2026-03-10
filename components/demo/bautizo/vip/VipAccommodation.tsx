"use client"

import { Hotel, MapPin, Phone, Star, CheckCircle } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipAccommodation() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Hotel className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {vipDemoData.accommodation.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {vipDemoData.accommodation.message}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Grid de hoteles */}
        <div className="grid md:grid-cols-3 gap-6">
          {vipDemoData.accommodation.hotels.map((hotel, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Header del hotel */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{hotel.name}</h3>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-yellow-100 text-sm">{hotel.price}</p>
              </div>

              {/* Contenido */}
              <div className="p-6">
                {/* Ubicación */}
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">{hotel.address}</p>
                    <p className="text-sm text-yellow-600 font-medium">{hotel.distance}</p>
                  </div>
                </div>

                {/* Características */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Características:</h4>
                  <ul className="space-y-1">
                    {hotel.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contacto */}
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{hotel.contact}</p>
                    <p className="text-sm text-gray-600">Código: {hotel.bookingCode}</p>
                  </div>
                </div>

                {/* Botón de reserva */}
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md">
                  Reservar Habitación
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <Hotel className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Beneficios Especiales
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold mb-2">🎯 Reservas Garantizadas</h4>
              <p className="text-yellow-100 text-sm">
                Habitaciones reservadas exclusivamente para nuestros invitados
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💰 Precios Especiales</h4>
              <p className="text-yellow-100 text-sm">
                Tarifas preferenciales con descuentos del 15-20%
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🚗 Traslados</h4>
              <p className="text-yellow-100 text-sm">
                Servicio de transporte disponible entre hotel y eventos
              </p>
            </div>
          </div>
        </div>

        {/* Nota importante */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-yellow-200">
          <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">
            Información Importante
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><strong>• Reservas:</strong> Hasta el 10 de Marzo 2025</p>
              <p><strong>• Check-in:</strong> Desde las 15:00 hrs</p>
              <p><strong>• Check-out:</strong> Hasta las 12:00 hrs</p>
            </div>
            <div>
              <p><strong>• Cancelación:</strong> Sin cargo hasta 48h antes</p>
              <p><strong>• Mascotas:</strong> Consultar disponibilidad</p>
              <p><strong>• Estacionamiento:</strong> Incluido en todos los hoteles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
