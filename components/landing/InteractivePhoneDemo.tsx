"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { interactiveFeatures, demoConfig } from "./data/interactive-features"
import { useIsClient } from "@/hooks/useIsClient"

interface InteractivePhoneDemoProps {
  className?: string
}

export function InteractivePhoneDemo({ className = "" }: InteractivePhoneDemoProps) {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false) // Iniciar como false
  const isClient = useIsClient()

  // Inicializar auto-play solo después de hidratación
  useEffect(() => {
    if (!isClient) return
    setIsAutoPlaying(true)
  }, [isClient])

  // Auto-cycle through features - solo en cliente
  useEffect(() => {
    if (!isClient || !isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % interactiveFeatures.length)
    }, demoConfig.autoChangeInterval)

    return () => clearInterval(interval)
  }, [activeFeature, isAutoPlaying, isClient])

  const currentFeature = interactiveFeatures[activeFeature]
  const IconComponent = currentFeature.icon

  const handleFeatureClick = (index: number) => {
    if (!isClient) return
    setActiveFeature(index)
    setIsAutoPlaying(false)
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Demo Container */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        
        {/* Phone Mockup */}
        <div className="relative order-2 lg:order-1 w-full flex justify-center px-4 lg:px-0">
          <div className="relative w-56 h-[480px] sm:w-64 sm:h-[520px] lg:w-72 lg:h-[600px] mx-auto max-w-full">
            {/* Phone Frame */}
            <div className="absolute inset-0 bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] p-1.5 sm:p-2 shadow-xl lg:shadow-2xl">
              {/* Screen */}
              <div className="relative w-full h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-6 sm:h-7 lg:h-8 bg-black rounded-t-[1.5rem] sm:rounded-t-[2rem] lg:rounded-t-[2.5rem] flex items-center justify-between px-3 sm:px-4 lg:px-6 text-white text-xs z-20">
                  <span>9:41</span>
                  <span className="flex gap-1">
                    <div className="w-3 h-1.5 sm:w-4 sm:h-2 border border-white rounded-sm">
                      <div className="w-2 h-0.5 sm:w-3 sm:h-1 bg-white rounded-sm m-0.5"></div>
                    </div>
                  </span>
                </div>

                {/* Content Area */}
                <div className="pt-6 sm:pt-7 lg:pt-8 h-full relative overflow-hidden">
                  {/* Current Feature Demo */}
                  <div className={`absolute inset-0 transition-all duration-${demoConfig.animationDuration} ${
                    currentFeature.demo.animationType === 'slide' ? 'animate-slide-in' :
                    currentFeature.demo.animationType === 'fade' ? 'animate-fade-in' :
                    currentFeature.demo.animationType === 'bounce' ? 'animate-bounce-in' :
                    'animate-pulse-in'
                  }`}>
                    <Image
                      src={currentFeature.demo.mockupImage}
                      alt={`Demo de ${currentFeature.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                    />
                  </div>

                  {/* Feature Overlay */}
                  <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 z-10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${currentFeature.bgColor}`}>
                        <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${currentFeature.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">{currentFeature.title}</h4>
                        <p className="text-xs text-gray-600 leading-tight line-clamp-2 sm:line-clamp-none">{currentFeature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Feature Indicator - Solo en desktop y cliente */}
            {isClient && (
              <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg border-2 border-gray-100">
                <IconComponent className={`w-6 h-6 ${currentFeature.color}`} />
              </div>
            )}

            {/* Mobile Feature Indicator - Solo en cliente */}
            {isClient && (
              <div className="lg:hidden absolute -top-2 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
                <IconComponent className={`w-5 h-5 ${currentFeature.color}`} />
              </div>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="order-1 lg:order-2 w-full space-y-2 sm:space-y-3">
          <div className="mb-4 sm:mb-6 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Características Interactivas</h3>
            <p className="text-sm sm:text-base text-gray-600">Explora todas las funcionalidades que hacen especiales nuestras invitaciones digitales</p>
          </div>

          {interactiveFeatures.map((feature, index) => {
            const FeatureIcon = feature.icon
            const isActive = index === activeFeature
            
            return (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(index)}
                className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 border-2 ${
                  isActive 
                    ? `${feature.bgColor} border-current ${feature.color} shadow-md sm:shadow-lg transform` 
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm sm:hover:shadow-md'
                }`}
                disabled={!isClient} // Deshabilitar hasta que esté hidratado
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors flex-shrink-0 ${
                    isActive ? 'bg-white' : feature.bgColor
                  }`}>
                    <FeatureIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      isActive ? feature.color : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-base sm:text-lg ${
                      isActive ? 'text-current' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isActive ? 'text-current opacity-80' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                  {isActive && isClient && (
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-current animate-pulse flex-shrink-0" />
                  )}
                </div>
              </button>
            )
          })}

          {/* Auto-play Indicator - Solo mostrar en cliente */}
          {isClient && (
            <div className="flex items-center justify-between pt-3 sm:pt-4 text-xs sm:text-sm text-gray-500">
              <span>Demo automático</span>
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
              }`} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 