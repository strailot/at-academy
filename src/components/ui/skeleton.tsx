import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "animate-pulse",
  {
    variants: {
      variant: {
        text: "h-4 w-full rounded",
        circle: "h-4 w-4 rounded-full",
        rect: "h-4 w-full rounded-md",
        rectxl: "h-24 w-full rounded-md",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
      ref={ref}
    />
  )
)
Skeleton.displayName = "Skeleton"

export { Skeleton, skeletonVariants }