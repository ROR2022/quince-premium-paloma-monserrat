import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-coquette-rosa-intenso-500 text-white hover:bg-coquette-rosa-intenso-600 shadow-sm shadow-coquette-rosa-intenso-500/25",
        secondary:
          "border-transparent bg-coquette-rosa-claro-200 text-coquette-rosa-intenso-800 hover:bg-coquette-rosa-claro-300 shadow-sm shadow-coquette-rosa-claro-500/20",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-coquette-rosa-intenso-700 border-coquette-rosa-intenso-300 bg-coquette-rosa-claro-50 hover:bg-coquette-rosa-claro-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
