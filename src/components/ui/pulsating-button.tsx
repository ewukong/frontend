'use client'

import React from 'react'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { buttonVariants } from './button'

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = '#2c30ee',
  duration = '1.5s',
  variant,
  size,
  ...props
}: PulsatingButtonProps & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(
        'relative text-center cursor-pointer flex justify-center items-center rounded-lg text-white dark:text-black bg-blue-500 dark:bg-blue-500 px-4 py-2',
        buttonVariants({ variant, size }),
        className
      )}
      style={
        {
          '--pulse-color': pulseColor,
          '--duration': duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  )
}
