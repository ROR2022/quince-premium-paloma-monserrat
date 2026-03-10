import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

type ScrollIndicatorProps = {
  isLoaded: boolean
}

export function ScrollIndicator({ isLoaded }: ScrollIndicatorProps) {
  if (!isLoaded) return null
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-white z-10"
    >
      <p className="mb-2 text-center">Desliza para ver mi invitación premium</p>
      <ChevronDown className="animate-bounce w-6 h-6 text-rosa-gold-300" />
    </motion.div>
  )
}
