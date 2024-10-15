'use client'

import React, { ComponentProps } from 'react'
import { t } from 'i18next'

import { Logo } from '@/components/logo'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link } from '@/components/link'
import { ConnectLink } from '@/components/connect/link'
import { HeaderMobile } from './mobile'
import { useResponsive } from '@/hooks/use-responsive'
import { Routes } from '@/routes'
import { useLang } from '@/hooks/use-lang'
import { cn } from '@/lib/utils'

export const navs = [
  {
    label: () => t('mining'),
    // href: Routes.MiningPage,
    href: '#',
  },
  {
    label: () => t('airdrop'),
    // href: Routes.AirdropPage,
    href: '#',
  },
  {
    label: () => t('team'),
    href: Routes.TeamPage,
  },
]

export const Header = ({ className, ...props }: ComponentProps<'header'>) => {
  const { isMaxSm } = useResponsive()
  const { toggleLang } = useLang()

  return (
    <header
      className={cn(
        'flex justify-between items-center px-4 sm:px-8 h-16 sticky top-0 bg-red-600/50 backdrop-blur z-50',
        className
      )}
      {...props}
    >
      {isMaxSm ? (
        <HeaderMobile />
      ) : (
        <>
          <Logo />
          <NavigationMenu>
            <NavigationMenuList className="space-x-10">
              {navs.map(({ label, href }, i) => (
                <NavigationMenuItem key={i}>
                  <Link href={href} className="text-white">
                    {label()}
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem asChild>
                <Link
                  href="#"
                  className="text-white"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleLang()
                  }}
                >
                  {t('lang')}
                </Link>
              </NavigationMenuItem>
              <ConnectLink />
            </NavigationMenuList>
          </NavigationMenu>
        </>
      )}
    </header>
  )
}
