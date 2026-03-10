type PremiumBadgeProps = {
  text?: string
}

export function PremiumBadge({ text = "⭐ PREMIUM" }: PremiumBadgeProps) {
  return (
    <div 
    style={{display:'none'}}
    className="absolute top-4 left-4 z-20 bg-gradient-to-r from-coquette-rosa-intenso-600 to-coquette-rosa-intenso-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-plateado-300/20">
      {text}
    </div>
  )
}
