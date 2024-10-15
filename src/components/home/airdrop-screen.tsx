'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card } from '@/components/ui/card'
import { H2 } from '@/components/ui/typography/h2'
import { H4 } from '@/components/ui/typography/h4'
import { Icons } from '@/components/icons'
import { wukongAirdropProjects, wukongLinks } from '@/config/wukong'
import { cn } from '@/lib/utils'

export const AirdropScreen = () => {
  const { t } = useTranslation()

  const items = [
    {
      title: t('home.airdrop.memecoin'),
      logo: '/images/wukong/transparent/w1.png',
      projects: wukongAirdropProjects.memecoin,
    },
    {
      title: t('home.airdrop.nft'),
      logo: '/images/wukong/transparent/w2.png',
      projects: wukongAirdropProjects.nft,
    },
    {
      title: t('home.airdrop.wukongx'),
      logo: '/images/wukong/transparent/w3.png',
      description: t('home.airdrop.wukongx-description'),
      projects: [],
    },
    {
      title: t('home.airdrop.btc'),
      logo: '/images/wukong/transparent/w4.png',
      projects: wukongAirdropProjects.btc,
    },
  ]

  const links = [
    {
      title: t('twitter'),
      link: wukongLinks.x,
      icon: <Icons.X className="w-full h-14 group-hover:invert" />,
    },
    {
      title: t('telegram'),
      link: wukongLinks.telegram,
      icon: <Icons.Telegram className="w-16 h-16 mx-auto" />,
    },
  ]

  return (
    <Card
      className={cn(
        'p-6 sm:grid sm:grid-cols-10 space-x-6 bg-zinc-100 max-sm:grid-cols-1',
        'max-sm:flex max-sm:flex-col-reverse max-sm:p-4 max-sm:space-x-0 max-sm:space-y-4'
      )}
    >
      <div className="text-center space-y-10 max-sm:space-y-2 translate-x-0 sm:col-span-6">
        <H2 className="tracking-wide sm:!mt-4 max-sm:hidden">
          {t('home.airdrop.title')}
        </H2>
        <img
          src="/images/home/airdrop.png"
          alt="poster"
          className="w-[38rem] mx-auto max-sm:!mt-4 animate-floating"
        />
      </div>
      <div className="space-y-4 sm:col-span-4 max-sm:!mt-0">
        <H2 className="tracking-wide sm:hidden">{t('home.airdrop.title')}</H2>
        {items.map(({ title, logo, description, projects }) => (
          <Card
            key={title}
            variant="plain"
            padding="sm"
            className={cn(
              'flex items-center justify-between space-x-6 rounded-md max-sm:space-x-0',
              'max-sm:flex-col-reverse cursor-pointer hover:bg-gray-900 group duration-150'
            )}
          >
            <div className="max-sm:mt-2 group-hover:text-background">
              <H4>{title}</H4>
              <p className="text-muted-foreground group-hover:text-zinc-200">
                {description || projects.join(', ')}
              </p>
            </div>
            <img
              src={logo}
              alt="poster"
              className="w-32 sm:h-32 max-sm:w-full shrink-0"
            />
          </Card>
        ))}
        <div className="grid grid-cols-2 gap-4">
          {links.map(({ title, icon, link }) => (
            <Card
              key={title}
              variant="plain"
              padding="md"
              className={cn(
                'rounded-md cursor-pointer hover:bg-card/60 duration-150',
                'cursor-pointer hover:bg-gray-900 group duration-150'
              )}
              title={title}
              onClick={() => open(link)}
            >
              {icon}
            </Card>
          ))}
        </div>
      </div>
    </Card>
  )
}
