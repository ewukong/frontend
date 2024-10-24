'use client'

import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import { t } from 'i18next'
import { useInView } from 'framer-motion'

import { Icons } from '@/components/icons'
import { wukongLinks } from '@/config/wukong'
import { Routes } from '@/routes'
import { Link } from '@/components/link'
import { langReplace } from '@/utils/lang'
import { cn } from '@/lib/utils'
import { LetterPullup } from '@/components/ui/letter-pullup'
import { isZn } from '@/utils/lang'
import { toast } from 'sonner'

const navs = [
  {
    label: () => t('mining'),
    path: Routes.MiningPage,
  },
  {
    label: () => t('airdrop'),
    path: Routes.AirdropPage,
  },
  {
    label: () => t('team'),
    path: Routes.TeamPage,
  },
]

export const Footer = () => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <footer className="bg-gray-950 p-10 pt-28 max-sm:px-4">
      <div className="text-center space-y-20 !mt-10 max-sm:!mt-4" ref={ref}>
        {isInView && (
          <LetterPullup
            words={t('footer.title')}
            className={cn(
              '!text-5xl text-background sm:tracking-widest max-sm:!text-4xl',
              isZn() && '!tracking-widest'
            )}
          />
        )}
        <div className="flex items-center justify-center space-x-10">
          <NextLink href={wukongLinks.x} target="_blank">
            <Icons.X className="invert w-8 h-8" />
          </NextLink>
          <NextLink href={wukongLinks.telegram} target="_blank">
            <Icons.Telegram className="w-10 h-10" />
          </NextLink>
        </div>
      </div>

      <nav
        className={cn(
          'flex items-end justify-between border-b border-b-muted-foreground',
          'max-sm:flex-col max-sm:items-center'
        )}
      >
        <img
          src="/images/wukong/transparent/w7.png"
          alt="poster"
          className="w-40 max-sm:my-6"
        />
        <ul className="flex items-center space-x-10 pb-2">
          {navs.map(({ label, path }, i) => (
            <li key={i}>
              <Link href={path} className="text-white">
                {label()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-sm mt-2 max-sm:text-center max-sm:whitespace-nowrap max-sm:text-xs max-sm:-ml-0.5">
        {langReplace(t('footer.copyright'), [new Date().getFullYear()])}
      </p>
    </footer>
  )
}
