"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { basicDemoData } from "./data/basic-demo-data"

export function BasicHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('${basicDemoData.hero.backgroundImage}')`,
          filter: "brightness(0.7)",
        }}
      />

      {/* NO Music control button - no está incluido en paquete básico */}

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-coquette-rosa-claro-200 text-xl mb-2 font-medium"
          >
            {basicDemoData.hero.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-script text-6xl md:text-8xl text-coquette-rosa-claro-100 mb-4 coquette-text-gradient"
          >
            {basicDemoData.hero.name}
          </motion.h1>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-plateado-200 z-10"
      >
        <p className="mb-2 text-center font-medium">Desliza para ver mi invitación</p>
        <ChevronDown className="animate-bounce w-6 h-6 text-coquette-rosa-claro-300" />
      </motion.div>
    </section>
  )
} 