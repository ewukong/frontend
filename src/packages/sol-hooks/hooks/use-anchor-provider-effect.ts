import { useEffect, EffectCallback } from 'react'
import { Provider } from '@coral-xyz/anchor'

import { useAnchorProvider } from './use-anchor-provider'

export const useAnchorProviderEffect = (
  effect: (provider: Provider) => ReturnType<EffectCallback>,
  deps: unknown[]
) => {
  const { provider } = useAnchorProvider()

  useEffect(() => {
    if (provider) effect(provider)
  }, [provider, ...deps])
}
