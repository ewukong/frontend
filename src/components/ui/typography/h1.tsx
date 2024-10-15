'use client'

import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const H1 = ({ className, ...props }: ComponentProps<'h1'>) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
      {...props}
    ></h1>
  )
}
