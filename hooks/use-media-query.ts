"use client"

import { useState, useEffect } from 'react'

/**
 * Hook personalizado para detectar media queries
 * Optimizado para renderizado condicional basado en tamaño de pantalla
 */
export function useMediaQuery(query: string): boolean {
  // Por defecto, asumimos false (para renderizado del lado del servidor)
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    // Solo ejecutamos en el cliente
    if (typeof window === 'undefined') return
    
    // Inicializamos correctamente basado en el estado actual
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    // Handler para actualizar el estado cuando cambia el match
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Agregamos listener
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      // Fallback para navegadores antiguos
      media.addListener(listener)
    }
    
    // Limpieza
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        // Fallback para navegadores antiguos
        media.removeListener(listener)
      }
    }
  }, [query])
  
  return matches
}
