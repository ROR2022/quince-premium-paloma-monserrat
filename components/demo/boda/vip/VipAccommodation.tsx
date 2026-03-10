"use client"
import Image from "next/image"
import { 
  MapPin, 
  Phone, 
  Star, 
  ExternalLink, 
  Wifi, 
  Car, 
  Coffee,
  Crown,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsClient } from "@/hooks/useIsClient"
import { vipDemoData } from "./data/vip-demo-data"

export function VipAccommodation() {
  const isClient = useIsClient()

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  }

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="w-4 h-4" />
    if (amenity.toLowerCase().includes('parking') || amenity.toLowerCase().includes('estacionamiento')) return <Car className="w-4 h-4" />
    if (amenity.toLowerCase().includes('desayuno')) return <Coffee className="w-4 h-4" />
    return <Star className="w-4 h-4" />
  }

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'lujo':
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900'
      case 'premium':
        return 'bg-gradient-to-r from-purple-400 to-pink-400 text-purple-900'
      case 'ejecutivo':
        return 'bg-gradient-to-r from-blue-400 to-cyan-400 text-blue-900'
      case 'confort':
        return 'bg-gradient-to-r from-green-400 to-emerald-400 text-green-900'
      default:
        return 'bg-gray-400 text-gray-900'
    }
  }

  // Mostrar loading mientras el cliente no esté listo
  if (!isClient) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2 border-yellow-300">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 fill-current" />
                <span>Característica VIP Exclusiva</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
              🏨 HOSPEDAJE RECOMENDADO
            </h2>
            
            <div className="flex items-center justify-center mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
              <Crown className="w-8 h-8 text-yellow-500 fill-current" />
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            </div>
            
            <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
              Cargando información de hospedaje...
            </p>
          </div>

          {/* Skeleton loading */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-amber-100"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-yellow-100 rounded"></div>
                  <div className="h-4 bg-yellow-50 rounded w-3/4"></div>
                  <div className="h-4 bg-yellow-50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        {/* Header VIP */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2 border-yellow-300">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 fill-current" />
              <span>Característica VIP Exclusiva</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            🏨 HOSPEDAJE RECOMENDADO
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
            <Crown className="w-8 h-8 text-yellow-500 fill-current" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-4"></div>
          </div>
          
          <p className="text-lg text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Hemos seleccionado los mejores hoteles en Monterrey para que tus invitados 
            disfruten de una estadía cómoda y elegante durante nuestra boda.
          </p>
        </div>

        {/* Grid de hoteles */}
        <div className="grid md:grid-cols-2 gap-8">
                      {vipDemoData.accommodation.map((hotel) => (
            <div 
              key={hotel.id}
              className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Imagen del hotel */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={hotel.image} 
                  alt={hotel.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Badge de categoría */}
                <div className={`absolute top-4 left-4 ${getCategoryStyle(hotel.category)} px-3 py-1 rounded-full text-xs font-bold`}>
                  {hotel.category}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-gray-700">{hotel.rating}</span>
                </div>
              </div>

              {/* Información del hotel */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.distance}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{hotel.description}</p>
                
                {/* Precio */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-amber-600">{hotel.price}</span>
                    <span className="text-sm text-gray-500 ml-1">{hotel.priceUnit}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Desde</div>
                  </div>
                </div>

                {/* Amenidades */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenidades incluidas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity, amenityIndex) => (
                      <div key={amenityIndex} className="flex items-center gap-2 text-xs text-gray-600">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <Button 
                    asChild 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
                  >
                    <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Reservar
                    </a>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                  >
                    <a href={getGoogleMapsUrl(hotel.address)} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-1" />
                      Mapa
                    </a>
                  </Button>
                </div>

                {/* Información de contacto */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${hotel.phone}`} className="hover:text-amber-600 transition-colors">
                      {hotel.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-8 h-8 text-amber-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            Reservas Especiales para Invitados
          </h3>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Menciona que eres invitado de la boda de Ana & Carlos para obtener 
            tarifas especiales y beneficios exclusivos en cualquiera de estos hoteles.
          </p>
        </div>

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>💡 Demo:</strong> Esta sección VIP incluye 4 hoteles con reservas directas. 
            En tu invitación real, podrás personalizar los hoteles y agregar hasta 8 opciones.
          </p>
        </div>
      </div>
    </section>
  )
} 