'use client'

import React, { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Routes } from '@/routes'

export default function AirdropPage() {
  const router = useRouter()

  useLayoutEffect(() => {
    router.replace(Routes.MiningPage)
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      Coming Soon
    </div>
  )
}
