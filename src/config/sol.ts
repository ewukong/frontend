import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { web3 } from '@coral-xyz/anchor'

const endpoint = {
  prod: 'https://purple-wider-scion.solana-mainnet.quiknode.pro/f96c8f454fdab9096596f6ee377395c0318b3dfb',
  dev: web3.clusterApiUrl(WalletAdapterNetwork.Devnet, true),
}

export const solConfig = {
  endpoint: endpoint.dev,
  wallets: [],
}
