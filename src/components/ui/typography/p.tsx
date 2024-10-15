'use client'

import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const P = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    ></p>
  )
}
