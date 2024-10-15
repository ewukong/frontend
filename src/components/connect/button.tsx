'use client'

import { ComponentProps } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { ConnectDialog } from './dialog'
import { formatAddress } from '@/utils/format'

export const ConnectButton = ({ children }: ComponentProps<typeof Button>) => {
  const { t } = useTranslation()
  const { connected, publicKey, disconnect } = useWallet()

  if (connected && children) return children
  if (connected) {
    return (
      <Button variant="destructive" onClick={disconnect}>
        {formatAddress(publicKey?.toString() ?? '')}
      </Button>
    )
  }

  return (
    <ConnectDialog>
      <Button>{t('connect')}</Button>
    </ConnectDialog>
  )
}
