"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageCircle, Star, Check, ChevronRight } from "lucide-react"
import type { CatalogProduct } from "./data/catalog-data"

interface CatalogListProps {
  products: CatalogProduct[]
  onContactClick: (product: CatalogProduct) => void
  className?: string
}

interface CatalogListItemProps {
  product: CatalogProduct
  onContactClick: (product: CatalogProduct) => void
}

function CatalogListItem({ product, onContactClick }: CatalogListItemProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  
  // Safety timeout: ocultar spinner después de 3 segundos máximo
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setImageLoading(false)
    }, 3000)
    
    return () => clearTimeout(safetyTimeout)
  }, [])

  // Obtener colores según el tipo de paquete
  const getPackageColors = (packageType: string) => {
    switch (packageType) {
      case 'basico':
        return {
          badge: 'bg-gray-100 text-gray-700 border-gray-200',
          price: 'text-gray-600',
          accent: 'text-gray-500'
        }
      case 'premium':
        return {
          badge: 'bg-purple-100 text-purple-700 border-purple-200',
          price: 'text-purple-600',
          accent: 'text-purple-500'
        }
      case 'vip':
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          price: 'text-amber-600',
          accent: 'text-amber-500'
        }
      default:
        return {
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          price: 'text-blue-600',
          accent: 'text-blue-500'
        }
    }
  }

  const colors = getPackageColors(product.packageType)

  const handleImageLoad = () => setImageLoading(false)
  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onContactClick(product)
  }

  return (
    <div className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-gray-300">
      <div className="flex items-center p-4 gap-4">
        {/* Imagen del producto */}
        <div className="relative w-24 h-16 md:w-32 md:h-24 flex-shrink-0 rounded-lg overflow-hidden">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoading ? 'blur-sm' : 'blur-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="(max-width: 768px) 96px, 128px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
          )}

          {/* Loading overlay */}
          {imageLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600" />
            </div>
          )}

          {/* Badge popular superpuesto */}
          {product.popular && (
            <div className="absolute -top-1 -right-1">
              <Badge 
                variant="secondary"
                className="bg-red-500 text-white border-red-500 text-xs px-1.5 py-0.5 shadow-sm flex items-center gap-1"
              >
                <Star className="w-2.5 h-2.5 fill-current" />
              </Badge>
            </div>
          )}
        </div>

        {/* Información principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-900 truncate">
                  {product.name}
                </h3>
                <Badge 
                  variant="secondary"
                  className={`${colors.badge} text-xs px-2 py-1 flex-shrink-0`}
                >
                  {product.packageType.charAt(0).toUpperCase() + product.packageType.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {product.description}
              </p>
            </div>
            <div className="text-right ml-4 flex-shrink-0">
              <div className={`text-xl md:text-2xl font-bold ${colors.price}`}>
                {product.price}
              </div>
              <div className="text-xs text-gray-500">MXN</div>
            </div>
          </div>

          {/* Características en versión compacta */}
          <div className="hidden md:block mb-3">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {product.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span className="truncate max-w-[120px]">{feature}</span>
                </div>
              ))}
              {product.features.length > 4 && (
                <div className="text-xs text-gray-500">
                  +{product.features.length - 4} más
                </div>
              )}
            </div>
          </div>

          {/* Características en móvil (más compacto) */}
          <div className="md:hidden mb-3">
            <div className="text-xs text-gray-600">
              <span className="font-medium">{product.features.length} características</span>
              <span className={`ml-2 ${colors.accent}`}>• Ver detalles →</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-2">
            <Link href={product.demoLink} className="flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Ver Demo</span>
                <span className="sm:hidden">Demo</span>
              </Button>
            </Link>
            
            <Button
              onClick={handleContactClick}
              size="sm"
              className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Contactar</span>
              <span className="sm:hidden">Contacto</span>
            </Button>

            {/* Flecha indicadora en desktop */}
            <div className="hidden lg:block ml-2">
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CatalogList({ products, onContactClick, className = "" }: CatalogListProps) {
  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay productos disponibles
          </h3>
          <p className="text-gray-600">
            Prueba cambiando los filtros o selecciona otra categoría.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {products.map((product) => (
        <CatalogListItem
          key={product.id}
          product={product}
          onContactClick={onContactClick}
        />
      ))}
    </div>
  )
}