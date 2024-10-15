import { type PropsWithChildren, createContext } from 'react'
import {
  ConnectionProvider,
  ConnectionProviderProps,
  WalletProvider,
  WalletProviderProps,
} from '@solana/wallet-adapter-react'

interface Value {
  connection: Omit<ConnectionProviderProps, 'children'>
  wallet: Omit<WalletProviderProps, 'children'>
}

const Context = createContext<Value | null>(null)

export const SolHooksProvider = ({
  children,
  ...value
}: PropsWithChildren<Value>) => (
  <Context.Provider value={{ ...value }}>
    <ConnectionProvider {...value.connection}>
      <WalletProvider {...value.wallet}>{children}</WalletProvider>
    </ConnectionProvider>
  </Context.Provider>
)
