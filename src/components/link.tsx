import React, { type ComponentProps } from 'react'
import NextLink from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const linkVariant = cva(
  'text-blue-600 cursor-pointer underline-offset-2 hover:underline',
  {
    variants: {},
    defaultVariants: {},
  }
)

export const Link = React.forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NextLink> & VariantProps<typeof linkVariant>
>(({ className, ...props }, ref) => (
  <NextLink
    ref={ref}
    className={cn(linkVariant(), className)}
    {...props}
  ></NextLink>
))
