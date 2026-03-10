"use client"

import { Ticket, Users, Crown, CheckCircle, AlertCircle } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipGuestPasses() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Ticket className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {vipDemoData.guestPasses.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {vipDemoData.guestPasses.message}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Tipos de pases */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {vipDemoData.guestPasses.passes.map((pass, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${
                pass.type === 'Pase VIP' 
                  ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50' 
                  : 'border-yellow-200'
              }`}
            >
              {/* Header del pase */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  pass.type === 'Pase VIP' 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400'
                }`}>
                  {pass.type === 'Pase VIP' ? (
                    <Crown className="w-8 h-8 text-white" />
                  ) : pass.type === 'Pase Familiar' ? (
                    <Users className="w-8 h-8 text-white" />
                  ) : (
                    <Ticket className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className={`text-xl font-bold ${
                  pass.type === 'Pase VIP' ? 'text-yellow-700' : 'text-gray-900'
                }`}>
                  {pass.type}
                </h3>
                <p className="text-gray-600 mt-2">{pass.description}</p>
              </div>

              {/* Incluye */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
                <ul className="space-y-2">
                  {pass.includes.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Restricciones */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Restricciones
                </h4>
                <p className="text-sm text-gray-600">{pass.restrictions}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instrucciones */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Instrucciones Importantes
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {vipDemoData.guestPasses.instructions.map((instruction, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Beneficios Exclusivos VIP
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Acceso Prioritario</h4>
              <p className="text-yellow-100 text-sm">
                Entrada preferencial sin filas
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Servicio Personalizado</h4>
              <p className="text-yellow-100 text-sm">
                Atención especial durante el evento
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Recuerdos Exclusivos</h4>
              <p className="text-yellow-100 text-sm">
                Detalles especiales para cada invitado
              </p>
            </div>
          </div>
        </div>

        {/* Contacto para pases */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-yellow-200 text-center">
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            ¿Necesitas un pase adicional?
          </h4>
          <p className="text-gray-600 mb-4">
            Contacta con nosotros para solicitar pases adicionales o cambios
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
