import { useEffect, useState } from 'react'
import {
  type Provider,
  AnchorProvider,
  getProvider as getAnchorProvider,
  setProvider as setAnchorProvider,
  web3,
} from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'

export const useAnchorProvider = (options: web3.ConfirmOptions = {}) => {
  const [provider, setProvider] = useState<Provider>()
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  useEffect(() => {
    if (!wallet) return
    try {
      const provider = getAnchorProvider()
      setProvider(provider)
    } catch (error) {
      const provider = new AnchorProvider(connection, wallet, options)
      setProvider(provider)
      setAnchorProvider(provider)
    }
  }, [connection, wallet])

  return {
    provider,
    setProvider,
  }
}
