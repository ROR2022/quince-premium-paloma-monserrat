import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

type HeroContentProps = {
  title: string
  subtitle: string
  extraContent?: string
}

export function HeroContent({ 
  title, 
  subtitle, 
  extraContent = "¡Gracias por ser parte de este día tan especial!" 
}: HeroContentProps) {
  const isMobile = useIsMobile()
  
  return (
    <div className="relative z-20 text-center w-full max-w-4xl mx-auto">
      {/* Fondo semi-transparente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl pointer-events-none" />
      
      {/* Contenido con padding y z-index correcto */}
      <div className="relative z-10 p-8 sm:p-10 md:p-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`text-coquette-rosa-claro-300 font-light mb-4 break-words ${
            isMobile 
              ? 'text-sm sm:text-base md:text-lg'
              : 'text-lg lg:text-xl'
          }`}
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6)'
          }}
        >
          {extraContent}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.8, 
            duration: 1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`font-bold text-white mb-6 leading-tight break-words ${
            isMobile 
              ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
              : 'text-4xl lg:text-6xl xl:text-7xl'
          }`}
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.1, 
            duration: 1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`text-white/95 font-medium break-words ${
            isMobile 
              ? 'text-lg sm:text-xl md:text-2xl'
              : 'text-xl lg:text-2xl xl:text-3xl'
          }`}
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6)'
          }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  )
}
