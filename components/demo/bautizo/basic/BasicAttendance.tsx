"use client"

import { useState } from 'react'
import { Users, CheckCircle, XCircle } from 'lucide-react'
import { basicDemoData } from './data/basic-demo-data'

export function BasicAttendance() {
  const [formData, setFormData] = useState({
    name: '',
    response: '',
    companions: '',
    phone: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // En un demo real, aquí se enviaría la información
    console.log('Datos de confirmación:', formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {basicDemoData.attendance.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {basicDemoData.attendance.message}
          </p>
          <p className="text-gray-600">
            {basicDemoData.attendance.subtitle}
          </p>
        </div>

        {/* Formulario */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* Nombre */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {basicDemoData.attendance.fields.name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: María González"
                required
              />
            </div>

            {/* Respuesta */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {basicDemoData.attendance.fields.response}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('response', 'yes')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.response === 'yes'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{basicDemoData.attendance.fields.responseOptions.yes}</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleInputChange('response', 'no')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.response === 'no'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" />
                    <span>{basicDemoData.attendance.fields.responseOptions.no}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Acompañantes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {basicDemoData.attendance.fields.companions}
              </label>
              <input
                type="text"
                value={formData.companions}
                onChange={(e) => handleInputChange('companions', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Juan González, Ana González"
              />
            </div>

            {/* Teléfono */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {basicDemoData.attendance.fields.phone}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: 81 1234 5678"
                required
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            >
              Confirmar Asistencia
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Gracias por confirmar!
            </h3>
            <p className="text-gray-600">
              Hemos recibido tu confirmación de asistencia al bautizo de {basicDemoData.hero.name}.
            </p>
            <p className="text-gray-600 mt-2">
              Te esperamos el {basicDemoData.event.ceremony.time} en {basicDemoData.event.ceremony.venue}.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
