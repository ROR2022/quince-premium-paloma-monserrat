"use client"

import { Heart, Baby, Users } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumInvitation() {
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
            {premiumDemoData.invitation.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Tarjeta de invitación */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-100">
          {/* Información del bebé */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Baby className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {premiumDemoData.event.celebrant.name}
            </h3>
            <p className="text-xl text-purple-600 font-medium">
              {premiumDemoData.event.celebrant.age} • {premiumDemoData.event.celebrant.birthDate}
            </p>
          </div>

          {/* Mensaje principal */}
          <div className="text-center mb-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {premiumDemoData.invitation.message}
            </p>
          </div>

          {/* Detalles */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {premiumDemoData.invitation.details.map((detail, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-gray-700">{detail}</p>
              </div>
            ))}
          </div>

          {/* Información de los padres */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
            <div className="flex justify-center mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 text-center mb-4">
              Con la bendición de sus padres
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-semibold text-gray-800">Padre</p>
                <p className="text-gray-600">{premiumDemoData.event.parents.father}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Madre</p>
                <p className="text-gray-600">{premiumDemoData.event.parents.mother}</p>
              </div>
            </div>
          </div>

          {/* Cierre */}
          <div className="text-center">
            <p className="text-lg text-gray-700 italic">
              {premiumDemoData.invitation.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
