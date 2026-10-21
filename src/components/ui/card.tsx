import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border border-transparent bg-background hover:border-accent transition-colors",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        hover: "bg-card-hover text-card-foreground",
        shadow: "shadow-sm",
        outline: "outline-2",
      },
      size: {
        default: "",
        sm: "md",
        xs: "sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(cardVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }