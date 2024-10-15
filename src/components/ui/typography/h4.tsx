'use client'

import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const H4 = ({ className, ...props }: ComponentProps<'h4'>) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    ></h4>
  )
}
