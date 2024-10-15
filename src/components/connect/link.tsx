'use client'

import { type ComponentProps } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTranslation } from 'react-i18next'

import { ConnectDialog } from './dialog'
import { Link } from '@/components/link'
import { formatAddress } from '@/utils/format'
import { toast } from 'sonner'

export const ConnectLink = ({
  children,
}: Omit<ComponentProps<typeof Link>, 'href'>) => {
  const { t } = useTranslation()
  const { connected, publicKey, disconnect } = useWallet()

  if (connected && children) return children
  if (connected) {
    return (
      <Link href="#" className="text-white" onClick={disconnect}>
        {formatAddress(publicKey?.toString() ?? '')}
      </Link>
    )
  }

  // TODO: temp
  return (
    <Link
      href="#"
      className="text-white"
      onClick={(e) => {
        e.preventDefault()
        toast.info(t('coming-soon'))
      }}
    >
      {t('connect')}
    </Link>
  )

  return (
    <ConnectDialog>
      <Link href="#" className="text-white">
        {t('connect')}
      </Link>
    </ConnectDialog>
  )
}
