"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, List, Filter } from "lucide-react"
import { catalogCategories } from "./data/catalog-data"

interface CatalogFiltersProps {
  selectedCategory: string
  viewMode: 'grid' | 'list'
  onCategoryChange: (categoryId: string) => void
  onViewModeChange: (mode: 'grid' | 'list') => void
  productsCount?: number
}

export function CatalogFilters({ 
  selectedCategory, 
  viewMode, 
  onCategoryChange, 
  onViewModeChange,
  productsCount = 0
}: CatalogFiltersProps) {

  // Agregar opción "Todos" al inicio
  const allCategories = [
    { id: 'all', name: 'Todos', icon: '🎉', color: 'gray' },
    ...catalogCategories
  ]

  const getCategoryColor = (category: { id: string; color?: string }) => {
    switch(category.color || category.id) {
      case 'rose':
        return 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200'
      case 'purple': 
        return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200'
      case 'amber':
        return 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200'
      case 'gray':
      case 'all':
        return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
    }
  }

  const getSelectedCategoryColor = (category: { id: string; color?: string }) => {
    switch(category.color || category.id) {
      case 'rose':
        return 'bg-rose-500 text-white border-rose-500 hover:bg-rose-600'
      case 'purple':
        return 'bg-purple-500 text-white border-purple-500 hover:bg-purple-600'
      case 'amber':
        return 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600'
      case 'gray':
      case 'all':
        return 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700'
      default:
        return 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      {/* Header del filtro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Filtrar Catálogo
            </h2>
            <p className="text-sm text-gray-50 hidden">
              {productsCount} {productsCount === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>
        </div>

        {/* Toggle de vista - Solo visible en desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-gray-600 mr-2">Vista:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Cards
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              Lista
            </Button>
          </div>
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category.id
            const baseClasses = "px-3 py-2 rounded-full text-sm font-medium border transition-all duration-200 flex items-center gap-2"
            const colorClasses = isSelected 
              ? getSelectedCategoryColor(category)
              : getCategoryColor(category)

            return (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className={`${baseClasses} ${colorClasses}`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
                {isSelected && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1 bg-white/20 text-current border-none text-xs"
                  >
                    ✓
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Toggle de vista móvil */}
      <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Cambiar vista:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Indicador de filtro activo */}
      {selectedCategory !== 'all' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Filtrando por:</span>
              <Badge variant="outline" className="text-gray-700">
                {allCategories.find(cat => cat.id === selectedCategory)?.name}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCategoryChange('all')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Limpiar filtro
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}