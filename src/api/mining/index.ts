import { wukongFetch } from '..'
import { MiningAreaRes, MiningNftItem } from './types'

export const miningApi = {
  getNftList: (address: string) => {
    return wukongFetch.GET<MiningNftItem[]>('/nfts', { query: { address } })
  },
  getAreaInfo: (address: string) => {
    return wukongFetch.GET<MiningAreaRes>(`/mining/area/${address}`)
  },
}
