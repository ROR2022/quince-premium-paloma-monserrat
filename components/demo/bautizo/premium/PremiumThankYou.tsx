"use client"

import { Heart, Users, Crown, Baby } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumThankYou() {
  const getIcon = (title: string) => {
    if (title.includes('Familia')) return <Users className="w-6 h-6" />
    if (title.includes('Padrinos')) return <Crown className="w-6 h-6" />
    if (title.includes('Amigos')) return <Heart className="w-6 h-6" />
    return <Baby className="w-6 h-6" />
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {premiumDemoData.thankYou.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {premiumDemoData.thankYou.message}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Secciones de agradecimiento */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {premiumDemoData.thankYou.sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Icono */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  {getIcon(section.title)}
                </div>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                {section.title}
              </h3>

              {/* Mensaje */}
              <p className="text-gray-700 text-center">
                {section.message}
              </p>
            </div>
          ))}
        </div>

        {/* Mensaje especial */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Un Día Inolvidable
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Gracias por hacer de este bautizo un momento tan especial y significativo. 
            Cada uno de ustedes ha contribuido a crear recuerdos que atesoraremos para siempre.
          </p>
        </div>

        {/* Información de contacto */}
        <div className="mt-8 bg-white rounded-2xl p-6 text-center border border-purple-100">
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Para cualquier consulta
          </h4>
          <p className="text-gray-600">
            No duden en contactarnos si necesitan información adicional sobre el evento
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <div className="text-center">
              <p className="font-semibold text-gray-800">Carlos Martínez</p>
              <p className="text-gray-600">(81) 1234-5678</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">María Rodríguez</p>
              <p className="text-gray-600">(81) 8765-4321</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
