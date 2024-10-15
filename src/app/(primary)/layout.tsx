'use client'

import React, { type PropsWithChildren } from 'react'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { usePathname } from 'next/navigation'
import { Routes } from '@/routes'
import { cn } from '@/lib/utils'
import { AudioPlayerComponent } from '@/components/audio-player'

export default function PrimaryLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const isTeamPage = pathname === Routes.TeamPage

  return (
    <>
      <Header className={cn(isTeamPage && 'bg-transparent backdrop-blur-0')} />
      <main className="mx-auto min-h-[calc(100vh-4rem)]">{children}</main>
      {!isTeamPage && <Footer />}
      <AudioPlayerComponent />
    </>
  )
}
