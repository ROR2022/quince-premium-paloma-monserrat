"use client"

import { MapPin, Clock, Users, Heart } from 'lucide-react'
import { basicDemoData } from './data/basic-demo-data'

export function BasicEventDetails() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cuándo y Dónde
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Información de los novios */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-500 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {basicDemoData.event.celebrants.bride}
          </h3>
          <div className="text-4xl text-pink-500 mb-4">&</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {basicDemoData.event.celebrants.groom}
          </h3>
          
          {/* Padres */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Padres de la Novia</h4>
              <p className="text-gray-600">{basicDemoData.event.parents.brideParents.father}</p>
              <p className="text-gray-600">{basicDemoData.event.parents.brideParents.mother}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Padres del Novio</h4>
              <p className="text-gray-600">{basicDemoData.event.parents.groomParents.father}</p>
              <p className="text-gray-600">{basicDemoData.event.parents.groomParents.mother}</p>
            </div>
          </div>
        </div>

        {/* Fecha */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold">
            {basicDemoData.event.date.full}
          </div>
        </div>

        {/* Ceremonia */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Ceremonia Religiosa</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold text-gray-900">{basicDemoData.event.ceremony.time}</p>
                  <p className="text-gray-600">{basicDemoData.event.ceremony.type}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{basicDemoData.event.ceremony.venue}</p>
                  <p className="text-gray-600">{basicDemoData.event.ceremony.address}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Información Importante</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Llegar 30 minutos antes</li>
                <li>• Código de vestimenta: {basicDemoData.event.dressCode}</li>
                <li>• {basicDemoData.event.restrictions}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recepción */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Recepción</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold text-gray-900">{basicDemoData.event.party.time}</p>
                  <p className="text-gray-600">{basicDemoData.event.party.type}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{basicDemoData.event.party.venue}</p>
                  <p className="text-gray-600">{basicDemoData.event.party.address}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Durante la Recepción</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Coctel de bienvenida</li>
                <li>• Cena y baile</li>
                <li>• Mesa de regalos disponible</li>
                <li>• Estacionamiento gratuito</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 