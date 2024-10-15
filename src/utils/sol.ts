import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { nanoid } from 'nanoid'
import { type DigitalAsset } from '@metaplex-foundation/mpl-token-metadata'

import { solExplorerLinks } from '@/config/links'
import { qs } from '@/lib/qs'

export const getSolExplorer = (
  path: string,
  cluster: `${WalletAdapterNetwork}`,
  explorer: keyof typeof solExplorerLinks = 'solscan'
) => {
  const query = cluster !== 'mainnet-beta' ? qs.stringify({ cluster }) : ''
  return solExplorerLinks[explorer] + path + query
}

export const randomSeed = () => nanoid().replaceAll('-', '')

export const isSolNft = (mint: DigitalAsset['mint']) =>
  mint.decimals === 0 && mint.supply === 1n
