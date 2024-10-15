import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'

import { miningApi } from '@/api/mining'

export const useNftList = () => {
  const { publicKey } = useWallet()
  const address = publicKey?.toString()

  const {
    data: nftList = [],
    isLoading: isLoadingList,
    refetch: refetchList,
  } = useQuery({
    queryKey: [miningApi.getNftList.name, address],
    queryFn: () => miningApi.getNftList(address!),
    enabled: !!address,
    refetchInterval: 6_000,
  })
  const hasStakingNft = useMemo(
    () => !!nftList.find((n) => n.is_staking),
    [nftList]
  )

  return {
    nftList,
    hasStakingNft,
    isLoadingList,
    refetchList,
  }
}
