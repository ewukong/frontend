import * as React from 'react'
import { ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  containerClass?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, containerClass, ...props }, ref) => {
    const hasIcon = startIcon || endIcon

    const Comp = (...classes: ClassValue[]) => (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent',
          'px-3 py-1 text-sm shadow-sm transition-colors file:border-0',
          'file:bg-transparent file:text-sm file:font-medium',
          'file:text-foreground placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
          classes
        )}
        ref={ref}
        {...props}
      />
    )

    if (hasIcon) {
      return (
        <div
          className={cn(
            'flex items-center space-x-2 border rounded-md px-2.5',
            'focus-within:ring-ring focus-within:ring-1',
            containerClass
          )}
        >
          {startIcon}
          {Comp(
            'border-none px-0 focus-visible:ring-none focus-visible:ring-0'
          )}
          {endIcon}
        </div>
      )
    }

    return Comp()
  }
)
Input.displayName = 'Input'

export { Input }
