"use client"

import Image from 'next/image'
import { basicDemoData } from './data/basic-demo-data'

export function BasicHero() {
  const { hero, event } = basicDemoData

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt="Tema vaquero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        {/* Título principal con efecto vaquero */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-shadow-lg">
            <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
              ¡Feliz Cumpleaños!
            </span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-2 text-amber-200">
            {hero.name}
          </h2>
          <p className="text-xl md:text-2xl text-amber-100 font-medium">
            {hero.subtitle}
          </p>
        </div>

        {/* Información del celebrante */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border-2 border-amber-400/50">
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-2xl font-bold text-amber-300 mb-4 flex items-center">
                🤠 El Celebrante
              </h3>
              <div className="space-y-2 text-lg">
                <p><span className="text-amber-200 font-semibold">Nombre:</span> {event.celebrant.name}</p>
                <p><span className="text-amber-200 font-semibold">Edad:</span> {event.celebrant.age}</p>
                <p><span className="text-amber-200 font-semibold">Nacimiento:</span> {event.celebrant.birthDate}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-amber-300 mb-4 flex items-center">
                📅 Cuándo y Dónde
              </h3>
              <div className="space-y-2 text-lg">
                <p><span className="text-amber-200 font-semibold">Fecha:</span> {event.ceremony.date}</p>
                <p><span className="text-amber-200 font-semibold">Hora:</span> {event.ceremony.time}</p>
                <p><span className="text-amber-200 font-semibold">Lugar:</span> {event.ceremony.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos temáticos */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce">
          🤠
        </div>
        <div className="absolute top-20 right-10 text-4xl animate-pulse">
          🐎
        </div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">
          🌵
        </div>
        <div className="absolute bottom-10 right-20 text-4xl animate-pulse delay-500">
          ⭐
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-sm mt-2 text-amber-200">Desliza para más</p>
      </div>
    </section>
  )
}
