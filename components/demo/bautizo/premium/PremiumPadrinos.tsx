"use client"

import { Crown, Heart, Users } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumPadrinos() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {premiumDemoData.padrinos.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {premiumDemoData.padrinos.message}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Grid de padrinos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumDemoData.padrinos.padrinos.map((padrino, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Icono */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Rol */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                {padrino.role}
              </h3>

              {/* Nombres */}
              <div className="text-center mb-4">
                {padrino.names.map((name, nameIndex) => (
                  <p key={nameIndex} className="text-gray-700 font-medium mb-1">
                    {name}
                  </p>
                ))}
              </div>

              {/* Descripción */}
              <div className="text-center">
                <p className="text-sm text-gray-600 italic">
                  {padrino.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Agradecimiento Especial
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            A todos nuestros padrinos, les agradecemos de corazón por aceptar esta 
            responsabilidad tan importante en la vida espiritual de Santiago. 
            Su amor y guía serán fundamentales en su camino de fe.
          </p>
        </div>
      </div>
    </section>
  )
}
