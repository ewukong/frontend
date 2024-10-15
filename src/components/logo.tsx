import { type ComponentProps } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export const Logo = ({
  className,
  children,
  linkProps,
  ...props
}: ComponentProps<'img'> & {
  linkProps?: Partial<ComponentProps<typeof Link>>
}) => {
  return (
    <Link href="/" {...linkProps} className={cn('z-50', linkProps?.className)}>
      {children || (
        <img
          src="/images/logo/wukong.svg"
          alt="logo"
          className={cn('w-40', className)}
          {...props}
        />
      )}
    </Link>
  )
}
