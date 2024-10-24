'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { MemecoinPointsCard } from '@/components/mining/memecon-points-card'

export default function MiningPage() {
  return (
    <div className="p-4 sm:p-8 grid gap-4 lg:grid-cols-5">
      <div className="flex flex-col space-y-4 lg:col-span-3 max-w-screen-lg">
        <MemecoinPointsCard />
        <MemecoinPointsCard />
        <MemecoinPointsCard />
        <MemecoinPointsCard />
        <MemecoinPointsCard />
      </div>
      <img
        src="/images/mining/poster2.png"
        alt="poster"
        style={{ '--duration': '5.7s' }}
        className={cn(
          'max-h-[50rem] object-cover lg:col-span-2 animate-floating',
          'sm:sticky sm:top-16 mx-auto'
        )}
      />
    </div>
  )
}
