'use client'

import { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { i18nConfig } from '@/i18n'
import { SolHooksProvider } from '@/packages/sol-hooks'
import { solConfig } from '@/config/sol'
import { useLang } from '@/hooks/use-lang'

const queryClient = new QueryClient()

export const AppProviders = ({ children }: PropsWithChildren) => {
  useLang() // Init language
  return (
    <I18nextProvider i18n={i18nConfig}>
      <QueryClientProvider client={queryClient}>
        <SolHooksProvider
          connection={{
            endpoint: solConfig.endpoint,
            config: { commitment: 'finalized' },
          }}
          wallet={{ wallets: solConfig.wallets, autoConnect: true }}
        >
          {children}
        </SolHooksProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
