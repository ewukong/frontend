export interface MiningNftItem {
  nft_id: number
  url: string
  name: string
  mint_address: string
  collection_address: string
  is_staking: 0 | 1
}

export interface MiningAreaRes {
  area: {
    end_at: number
    start_at: number
  }
  token: {
    address: null
    name: string
    total_amount: number
  }
  user: {
    mining_count: number
    nft_count: number
    power: number
  }
}
