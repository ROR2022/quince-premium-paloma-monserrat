"use client"

import { useState, useEffect, memo, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageCircle, Star, Check } from "lucide-react"
import type { CatalogProduct } from "./data/catalog-data"
import { useMediaQuery } from "../../hooks/use-media-query"

interface CatalogCardProps {
  product: CatalogProduct
  onContactClick: (product: CatalogProduct) => void
  className?: string
}

// Usar memo para evitar re-renderizados innecesarios
function CatalogCardComponent({ product, onContactClick, className = "" }: CatalogCardProps) {
  // Agregar código para finalizar implementación
  // Detectar si estamos en dispositivo móvil
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [imageLoading, setImageLoading] = useState(true)
  
  // Safety timeout: ocultar spinner después de un tiempo más corto en móviles
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setImageLoading(false)
    }, isMobile ? 1000 : 2000)
    
    return () => clearTimeout(safetyTimeout)
  }, [isMobile])
  const [imageError, setImageError] = useState(false)

  // Obtener colores según el tipo de paquete (memoizado)
  const colors = useMemo(() => getPackageColors(product.packageType), [product.packageType])
  
  function getPackageColors(packageType: string) {
    switch (packageType) {
      case 'basico':
        return {
          badge: 'bg-gray-100 text-gray-700 border-gray-200',
          price: 'text-gray-600',
          gradient: 'from-gray-50 to-gray-100',
          button: 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }
      case 'premium':
        return {
          badge: 'bg-purple-100 text-purple-700 border-purple-200',
          price: 'text-purple-600',
          gradient: 'from-purple-50 to-purple-100',
          button: 'border-purple-300 text-purple-700 hover:bg-purple-50'
        }
      case 'vip':
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          price: 'text-amber-600',
          gradient: 'from-amber-50 to-amber-100',
          button: 'border-amber-300 text-amber-700 hover:bg-amber-50'
        }
      default:
        return {
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          price: 'text-blue-600',
          gradient: 'from-blue-50 to-blue-100',
          button: 'border-blue-300 text-blue-700 hover:bg-blue-50'
        }
    }
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onContactClick(product)
  }

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden ${className}`}>
      {/* Imagen del producto */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            className={`object-cover transition-all duration-300 ${!isMobile ? 'group-hover:scale-105' : ''} ${
              imageLoading ? 'blur-sm' : 'blur-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={product.popular ? "eager" : "lazy"}
            placeholder={"blur"}
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                <Eye className="w-8 h-8" />
              </div>
              <p className="text-sm">Vista previa</p>
            </div>
          </div>
        )}

        {/* Badges superpuestos */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Badge del tipo de paquete */}
          <Badge 
            variant="secondary"
            className={`${colors.badge} font-medium text-xs px-2 py-1 shadow-sm`}
          >
            {product.packageType.charAt(0).toUpperCase() + product.packageType.slice(1)}
          </Badge>

          {/* Badge de popular */}
          {product.popular && (
            <Badge 
              variant="secondary"
              className="bg-red-500 text-white border-red-500 font-medium text-xs px-2 py-1 shadow-sm flex items-center gap-1"
            >
              <Star className="w-3 h-3 fill-current" />
              Popular
            </Badge>
          )}
        </div>

        {/* Overlay de hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

        {/* Botón de vista rápida en hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link href={product.demoLink}>
            <Button
              size="sm"
              className="bg-white/90 text-gray-900 hover:bg-white shadow-lg backdrop-blur-sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista Rápida
            </Button>
          </Link>
        </div>
      </div>

      {/* Contenido del card */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-gray-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="text-right ml-3">
            <div className={`text-2xl font-bold ${colors.price}`}>
              {product.price}
            </div>
            <div className="text-xs text-gray-500">MXN</div>
          </div>
        </div>
      </CardHeader>

      {/* Características */}
      <CardContent className="pt-0 pb-3">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-800">Incluye:</h4>
          {/* Características principales - limitar más en móviles */}
          <div className="grid grid-cols-1 gap-2 mt-4">
            {product.features.slice(0, isMobile ? 2 : 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-xs text-gray-600 truncate">{feature}</span>
              </div>
            ))}
            {product.features.length > 3 && (
              <div className="text-xs text-gray-500 ml-5">
                +{product.features.length - 3} características más
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Footer con botones */}
      <CardFooter className="pt-3 bg-gradient-to-r bg-gray-50 flex gap-2">
        <Link href={product.demoLink} className="block mt-2" prefetch={false}>
          <Button 
            variant="outline" 
            className={`w-full ${colors.button} transition-all duration-200`}
            size="sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver Demo
          </Button>
        </Link>
        
        <Button
          onClick={handleContactClick}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contactar
        </Button>
      </CardFooter>

      {/* Loading overlay */}
      {imageLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
    </Card>
  )
}

// Exportar componente memoizado para evitar re-renders innecesarios
export const CatalogCard = memo(CatalogCardComponent);