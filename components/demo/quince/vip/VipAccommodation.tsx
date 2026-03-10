"use client"
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
          
          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Hemos seleccionado los mejores hoteles cerca del evento para que tus invitados 
            de fuera tengan una estancia cómoda y memorable.
          </p>
        </div>

        {/* Grid de hoteles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {vipDemoData.accommodation && vipDemoData.accommodation.map((hotel) => (
            <div 
              key={hotel.id} 
              className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 overflow-hidden hover:shadow-2xl transition-all duration-300 vip-glow"
            >
              {/* Imagen del hotel */}
              <div className="relative h-48 bg-gradient-to-br from-yellow-100 to-amber-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${hotel.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Badge de categoría */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${getCategoryStyle(hotel.category)}`}>
                  {hotel.category}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    {[...Array(hotel.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Precio destacado */}
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-4 py-2 rounded-full font-bold text-sm">
                  {hotel.price} {hotel.priceUnit}
                </div>
              </div>
              
              {/* Contenido del hotel */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">
                  {hotel.name}
                </h3>
                
                <p className="text-amber-600 text-sm mb-4 leading-relaxed">
                  {hotel.description}
                </p>
                
                {/* Distancia */}
                <div className="flex items-center gap-2 text-amber-700 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{hotel.distance}</span>
                </div>
                
                {/* Amenidades */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-amber-800 mb-3">Amenidades incluidas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-amber-600">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {hotel.amenities.length > 4 && (
                    <p className="text-xs text-amber-500 mt-2">
                      +{hotel.amenities.length - 4} amenidades más
                    </p>
                  )}
                </div>
                
                {/* Botones de acción */}
                <div className="space-y-3">
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-900 font-semibold"
                  >
                    <a 
                      href={getGoogleMapsUrl(hotel.address)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Ver ubicación en Maps
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="border-yellow-300 text-amber-700 hover:bg-yellow-50"
                    >
                      <a href={`tel:${hotel.phone}`} className="flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" />
                        Llamar
                      </a>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="border-yellow-300 text-amber-700 hover:bg-yellow-50"
                    >
                      <a 
                        href={hotel.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Web
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota informativa VIP */}
        <div className="mt-12 p-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl border-2 border-yellow-200 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-yellow-600 fill-current flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-amber-800 mb-2">Servicio VIP de Hospedaje</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                Hemos pre-seleccionado estos hoteles basándonos en calidad, ubicación y servicios. 
                Cada hotel ha sido verificado para garantizar la mejor experiencia para tus invitados. 
                Los precios son aproximados y pueden variar según fechas y disponibilidad.
              </p>
              <div className="mt-3 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-amber-600">
                  💎 <strong>VIP Exclusivo:</strong> Esta sección de hospedaje recomendado está disponible 
                  únicamente en el paquete VIP para brindar logística completa del evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 