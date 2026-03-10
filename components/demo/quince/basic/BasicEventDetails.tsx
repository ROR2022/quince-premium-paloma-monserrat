"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { basicDemoData } from "./data/basic-demo-data"

// Función helper para abrir Google Maps
const openInMaps = (address: string) => {
  try {
    //const encodedAddress = encodeURIComponent(address)
    //const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    //window.open(mapsUrl, '_blank')
    window.location.href = address;
  } catch (error) {
    console.error('Error al abrir Google Maps:', error)
  }
}

export function BasicEventDetails() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Capas de mosaico rotado con mono2.jpeg */}
      <div 
        className="absolute inset-0 bg-repeat opacity-20 transform rotate-12" 
        style={{
          backgroundImage: "url('/images/custom/mono2.jpeg')", 
          backgroundSize: '150px 150px'
        }} 
      />
      <div 
        className="absolute inset-0 bg-repeat opacity-15 transform -rotate-45" 
        style={{
          backgroundImage: "url('/images/custom/mono2.jpeg')", 
          backgroundSize: '120px 120px'
        }} 
      />
      <div 
        className="absolute inset-0 bg-repeat opacity-12 transform rotate-75" 
        style={{
          backgroundImage: "url('/images/custom/mono2.jpeg')", 
          backgroundSize: '100px 100px'
        }} 
      />
      <div 
        className="absolute inset-0 bg-repeat opacity-8 transform -rotate-30" 
        style={{
          backgroundImage: "url('/images/custom/mono2.jpeg')", 
          backgroundSize: '80px 80px'
        }} 
      />
      
      {/* Overlay coquette para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-coquette-rosa-claro-50/85 to-white/90"></div>
      
      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-coquette-rosa-intenso-600 to-coquette-rosa-intenso-700 bg-clip-text text-transparent drop-shadow-sm">
          ¡LO QUE TIENES QUE SABER!
        </h2>

        <div className="divider">
          <div className="divider-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-coquette-rosa-intenso-500"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-12">
          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/60">
            <Calendar className="w-12 h-12 text-coquette-rosa-intenso-500 mb-4" />
            <h3 className="text-xl font-medium mb-2 text-coquette-rosa-intenso-700">¿Cuándo?</h3>
            <p className="text-lg text-coquette-plateado-700">{basicDemoData.event.date.day}</p>
            <p className="text-lg text-coquette-plateado-700">{basicDemoData.event.date.date}</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/60">
            <Clock className="w-12 h-12 text-coquette-rosa-intenso-500 mb-4" />
            <h3 className="text-xl font-medium mb-2 text-coquette-rosa-intenso-700">{basicDemoData.event.ceremony.type}</h3>
            <p className="text-lg text-coquette-plateado-700">{basicDemoData.event.ceremony.time}</p>
            <p className="text-lg mt-2 text-coquette-plateado-700">{basicDemoData.event.ceremony.venue}</p>
            <p className="text-sm mt-1 text-coquette-plateado-600">{basicDemoData.event.ceremony.address}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-coquette-rosa-claro-400 text-coquette-rosa-intenso-600 hover:bg-coquette-rosa-intenso-500 hover:text-white hover:border-coquette-rosa-intenso-500 transition-all duration-300 shadow-md"
              onClick={() => openInMaps(basicDemoData.event.ceremony.ubiLink)}
            >
              IR A MAPS
            </Button>
          </div>

          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/60">
            <Clock className="w-12 h-12 text-coquette-rosa-intenso-500 mb-4" />
            <h3 className="text-xl font-medium mb-2 text-coquette-rosa-intenso-700">{basicDemoData.event.party.type}</h3>
            <p className="text-lg text-coquette-plateado-700">{basicDemoData.event.party.time}</p>
            <p className="text-lg mt-2 text-coquette-plateado-700">{basicDemoData.event.party.venue}</p>
            <p className="text-sm mt-1 text-coquette-plateado-600">{basicDemoData.event.party.address}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-coquette-rosa-claro-400 text-coquette-rosa-intenso-600 hover:bg-coquette-rosa-intenso-500 hover:text-white hover:border-coquette-rosa-intenso-500 transition-all duration-300 shadow-md"
              onClick={() => openInMaps(basicDemoData.event.party.ubiLink)}
            >
              IR A MAPS
            </Button>
          </div>

          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/60">
            <MapPin className="w-12 h-12 text-coquette-rosa-intenso-500 mb-4" />
            <h3 className="text-xl font-medium mb-2 text-coquette-rosa-intenso-700">Código de Vestimenta</h3>
            <p className="text-lg text-coquette-rosa-intenso-600 font-medium">{basicDemoData.event.dressCode}</p>
          </div>
        </div>
      </div>
    </section>
  )
} 