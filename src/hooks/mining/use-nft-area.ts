import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'

import { miningApi } from '@/api/mining'

export const useNftArea = (refetchInterval: number | false = false) => {
  const { publicKey } = useWallet()
  const address = publicKey?.toString()

  const {
    data: areaInfo,
    isLoading: isLoadingArea,
    refetch: refetchArea,
  } = useQuery({
    queryKey: [miningApi.getAreaInfo.name, address],
    queryFn: () => miningApi.getAreaInfo(address!),
    enabled: !!address,
    refetchInterval,
  })

  return {
    areaInfo,
    isLoadingArea,
    refetchArea,
  }
}
