import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const Icons = {
  Mint: ({ className, ...props }: ComponentProps<'img'>) => (
    <img
      src="/icons/mint.png"
      alt="mint"
      className={cn('w-5 h-5', className)}
      {...props}
    />
  ),
  Mining: ({ className, ...props }: ComponentProps<'img'>) => (
    <img
      src="/icons/mining.png"
      alt="mining"
      className={cn('w-5 h-5', className)}
      {...props}
    />
  ),
  Airdrop: ({ className, ...props }: ComponentProps<'img'>) => (
    <img
      src="/icons/airdrop.png"
      alt="airdrop"
      className={cn('w-5 h-5', className)}
      {...props}
    />
  ),
  Solana: ({ className, ...props }: ComponentProps<'img'>) => (
    <img
      src="/images/logo/solana.png"
      alt="solana"
      className={cn('w-5', className)}
      {...props}
    />
  ),
  LaunchMyNft: ({ className, ...props }: ComponentProps<'img'>) => (
    <img
      src="/images/logo/launchmynft.png"
      alt="launchmynft"
      className={cn('w-5 h-5', className)}
      {...props}
    />
  ),
  X: ({ className, ...props }: ComponentProps<'img'>) => (
    <img
      src="/icons/x.svg"
      alt="x"
      className={cn('w-5 h-5', className)}
      {...props}
    />
  ),
  Telegram: ({ className, ...props }: ComponentProps<'img'>) => (
    <img
      src="/icons/telegram.svg"
      alt="telegram"
      className={cn('w-6 h-6', className)}
      {...props}
    />
  ),
}
