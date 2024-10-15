'use client'

import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const H3 = ({ className, ...props }: ComponentProps<'h2'>) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    ></h3>
  )
}
