"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { CatalogCard } from "./CatalogCard"
import { CatalogFilters } from "./CatalogFilters"
import { catalogProducts, getProductsByCategory } from "./data/catalog-data"
import type { CatalogProduct } from "./data/catalog-data"
import { useMediaQuery } from "../../hooks/use-media-query"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Eye, MessageCircle } from "lucide-react"

// Componente CatalogList (para vista de lista)
interface CatalogListProps {
  products: CatalogProduct[];
  onContactClick: (product: CatalogProduct) => void;
}

export function CatalogList({ products, onContactClick }: CatalogListProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-200">
          <div className="relative w-full md:w-48 h-32 flex-shrink-0">
            {product.image && (
              <div className="relative w-full h-full">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover rounded-md" 
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                />
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between">
              <h3 className="font-medium">{product.name}</h3>
              <div className="text-sm font-medium text-green-600">${product.price}</div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <div className="mt-auto flex justify-between items-center pt-2">
              <div className="text-sm text-gray-600">
                {product.categoryId}
              </div>
              <div className="space-x-2">
                <Link href={product.demoLink}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Demo
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onContactClick(product)}
                  className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface CatalogGridProps {
  onContactClick: (product: CatalogProduct) => void;
  initialCategory?: string;
  initialView?: 'grid' | 'list';
  className?: string;
}

export function CatalogGrid({ 
  onContactClick, 
  initialCategory = 'all',
  initialView = 'grid',
  className = "" 
}: CatalogGridProps) {
  // Detectar dispositivo móvil
  const isMobile = useMediaQuery("(max-width: 768px)")
  
  // Estados principales
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Número de productos por página, reducido en móviles
  const itemsPerPage = useMemo(() => isMobile ? 4 : 9, [isMobile])

  // Productos filtrados con memoización para performance
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return catalogProducts
    }
    return getProductsByCategory(selectedCategory)
  }, [selectedCategory])
  
  // Productos paginados para mostrar solo los necesarios (mejora rendimiento en móviles)
  const paginatedProducts = useMemo(() => {
    const startIndex = 0;
    const endIndex = page * itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page, itemsPerPage])
  
  // Verificar si hay más productos para cargar
  const hasMoreProducts = useMemo(() => 
    filteredProducts.length > page * itemsPerPage, 
    [filteredProducts.length, page, itemsPerPage]
  )

  // Manejar cambio de categoría con animación
  const handleCategoryChange = useCallback((categoryId: string) => {
    if (categoryId === selectedCategory) return
    
    // Reiniciar página al cambiar categoría
    setIsLoading(true)
    setSelectedCategory(categoryId)
    setPage(1)
    
    // Simular carga para mejor UX
    setTimeout(() => {
      setIsLoading(false)
    }, isMobile ? 300 : 500)
  }, [selectedCategory, isMobile])
  
  // Cargar más productos (para implementación de scroll infinito)
  const loadMoreProducts = useCallback(() => {
    if (hasMoreProducts && !isLoading) {
      setIsLoading(true)
      // Simular delay de carga en red lenta
      setTimeout(() => {
        setPage(prev => prev + 1)
        setIsLoading(false)
      }, 500)
    }
  }, [hasMoreProducts, isLoading])
  
  // Escuchar eventos de scroll para implementar carga al hacer scroll
  useEffect(() => {
    if (!isMobile) return;
    
    const handleScroll = () => {
      // Calcula si el usuario ha llegado cerca del final de la página
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (!isLoading && hasMoreProducts) {
          loadMoreProducts();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMoreProducts, loadMoreProducts, isMobile])

  // Manejar cambio de vista
  const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
    if (mode === viewMode) return
    setViewMode(mode)
  }, [viewMode])

  return (
    <div className={`w-full ${className}`}>
      {/* Filtros y controles */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <CatalogFilters 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange('grid')}
            className={`${isMobile ? 'flex-1' : ''}`}
          >
            Cuadrícula
          </Button>
          <Button
            variant={viewMode === 'list' ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange('list')}
            className={`${isMobile ? 'flex-1' : ''}`}
          >
            Lista
          </Button>
        </div>
      </div>
      
      {/* Grid/Lista de productos */}
      <div className="mt-8">
        {/* Estado de carga inicial */}
        {isLoading && paginatedProducts.length === 0 && (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(isMobile ? 2 : 6).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-100 h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Array(isMobile ? 2 : 3).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-100 h-24 rounded-md"></div>
              ))}
            </div>
          )
        )}
        
        {/* Mensaje sin resultados */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No se encontraron productos en esta categoría</p>
            <button
              onClick={() => handleCategoryChange('all')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todos los productos →
            </button>
          </div>
        )}
        
        {/* Productos paginados */}
        {paginatedProducts.length > 0 && (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map(product => (
                <CatalogCard
                  key={product.id}
                  product={product}
                  onContactClick={onContactClick}
                />
              ))}
              
              {/* Indicadores de carga para nuevos elementos */}
              {isLoading && hasMoreProducts && (
                <>{Array(isMobile ? 1 : 3).fill(0).map((_, index) => (
                  <div key={`loading-${index}`} className="animate-pulse bg-gray-100 h-64 rounded-lg"></div>
                ))}</>
              )}
            </div>
          ) : (
            <CatalogList
              products={paginatedProducts}
              onContactClick={onContactClick}
            />
          )
        )}
        
        {/* Botón de carga manual para escritorio */}
        {!isMobile && hasMoreProducts && !isLoading && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMoreProducts}
              variant="outline"
              className="px-6 py-2"
            >
              Cargar más productos
            </Button>
          </div>
        )}
        
        {/* Indicador de carga */}
        {!isMobile && isLoading && hasMoreProducts && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center">
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></div>
              <span>Cargando más productos...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
