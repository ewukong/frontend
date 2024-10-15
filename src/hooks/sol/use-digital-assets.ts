import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useConnection } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { publicKey } from '@metaplex-foundation/umi'
import { fetchAllDigitalAssetByOwner } from '@metaplex-foundation/mpl-token-metadata'

// import { solanaApi } from '@/api/solana'

export const useDigitalAssets = (owner: web3.PublicKey | null) => {
  const { connection } = useConnection()

  const { data: assets = [], ...results } = useQuery({
    queryKey: ['useDigitalAssets', owner],
    queryFn: async () => {
      const umi = createUmi(connection.rpcEndpoint)
      const pubkey = publicKey(owner!)

      const assets = await fetchAllDigitalAssetByOwner(umi, pubkey)
      // const metadataList = await solanaApi.fetchMedataUris({
      //   uris: assets.map((a) => a.metadata.uri),
      // })

      return assets.map((asset, i) => ({
        ...asset,
        // metadataResult: metadataList[i],
      }))
    },
    enabled: !!owner,
  })

  const [nfts, tokens] = useMemo(
    () => [
      assets.filter(({ mint }) => mint.decimals === 0 && mint.supply === 1n),
      assets.filter(({ mint }) => mint.decimals > 0 && mint.supply > 1n),
    ],
    [assets]
  )

  return {
    ...results,
    assets,
    nfts,
    tokens,
  }
}
