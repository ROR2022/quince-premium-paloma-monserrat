import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-coquette-rosa-intenso-500 text-white hover:bg-coquette-rosa-intenso-600 focus-visible:ring-coquette-rosa-intenso-500 shadow-lg shadow-coquette-rosa-intenso-500/25",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-plateado-300 bg-white/80 hover:bg-coquette-rosa-claro-50 hover:border-coquette-rosa-claro-400 text-plateado-700 hover:text-coquette-rosa-intenso-800 focus-visible:ring-coquette-rosa-intenso-500",
        secondary:
          "bg-coquette-rosa-claro-200 text-coquette-rosa-intenso-800 hover:bg-coquette-rosa-claro-300 focus-visible:ring-coquette-rosa-intenso-500 shadow-md shadow-coquette-rosa-claro-500/20",
        ghost: "hover:bg-coquette-rosa-claro-50 hover:text-coquette-rosa-intenso-700 text-coquette-rosa-intenso-600",
        link: "text-coquette-rosa-intenso-600 underline-offset-4 hover:text-coquette-rosa-intenso-700 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
