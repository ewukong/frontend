import React, { type ComponentProps } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export const ConnectDialog = ({ children }: ComponentProps<typeof Dialog>) => {
  const { t } = useTranslation()
  const { wallets, select } = useWallet()

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t('connect.dialog-title')}:</DialogTitle>
        <ul className="space-y-2">
          {wallets.map(({ adapter }) => (
            <li key={adapter.name} className="w-full">
              <Button
                variant="secondary"
                className="space-x-2 w-full"
                onClick={() => select(adapter.name)}
              >
                <img src={adapter.icon} alt="logo" className="w-5 h-5" />
                <span>{adapter.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
