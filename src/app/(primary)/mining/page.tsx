'use client'

import React, { useState } from 'react'
import dayjs from 'dayjs'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStake } from '@/hooks/mining/use-stake'
import { useNftList } from '@/hooks/mining/use-nft-list'
import { useNftArea } from '@/hooks/mining/use-nft-area'
import { formatDayjs } from '@/utils/format'

export default function MiningPage() {
  // TODO: temp
  return (
    <p className="min-h-screen flex justify-center items-center">Coming Soon</p>
  )
  const [selectedNft, setSelectedNft] = useState('')
  const { nftList, hasStakingNft, refetchList } = useNftList()
  // Only polling when NFT is staking.
  const { areaInfo, refetchArea } = useNftArea(hasStakingNft && 3_000)

  const { isPending, stake, unstake } = useStake(() => {
    refetchList()
    refetchArea()
  })

  const renderButtonText = (isStaked: boolean) => {
    if (isStaked) {
      return isPending ? 'Unstaking...' : 'Unstake'
    }
    return isPending ? 'Staking...' : 'Stake'
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Staking mining</CardTitle>
        <div className="flex space-x-10">
          <div>
            <p className="font-bold">Area</p>
            <p>
              Start at: {formatDayjs(dayjs.unix(areaInfo?.area.start_at || 0))}
            </p>
            <p>End at: {formatDayjs(dayjs.unix(areaInfo?.area.end_at || 0))}</p>
          </div>
          <div>
            <p className="font-bold">Token</p>
            <p>Address: {areaInfo?.token.address}</p>
            <p>Name: {areaInfo?.token.name}</p>
            <p>Total amount: {areaInfo?.token.total_amount}</p>
          </div>
          <div>
            <p className="font-bold">User</p>
            <p>Mining count: {areaInfo?.user.mining_count}</p>
            <p>NFT count: {areaInfo?.user.nft_count}</p>
            <p>Power: {areaInfo?.user.power}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {nftList.map((n) => {
          const isSelected = selectedNft === n.mint_address
          return (
            <div key={n.nft_id} className=" max-w-28 text-center">
              <img src={n.url} alt="nft" className="rounded" />
              <span>{n.name}</span>
              <Button
                variant={n.is_staking ? 'default' : 'destructive'}
                className="min-w-28"
                disabled={isSelected && isPending}
                onClick={() => {
                  setSelectedNft(n.mint_address)
                  n.is_staking ? unstake(n.mint_address) : stake(n.mint_address)
                }}
              >
                {renderButtonText(!!n.is_staking)}
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
