import React, { type ComponentProps } from 'react'
import Link from 'next/link'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer'
import { Logo } from '@/components/logo'
import { ConnectLink } from '@/components/connect/link'
import { Icons } from '@/components/icons'
import { navs } from '.'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'
import { languages } from '@/i18n'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/use-lang'
import { cn } from '@/lib/utils'
import { Routes } from '@/routes'

export const HeaderMobile = ({
  className,
}: ComponentProps<typeof DrawerTrigger>) => {
  const { t } = useTranslation()
  const { lang, setLang } = useLang()

  return (
    <>
      <div className="flex space-x-2">
        <Drawer>
          <DrawerTrigger className={className}>
            <HamburgerMenuIcon className="w-6 h-6" />
          </DrawerTrigger>
          <DrawerContent className="px-4 pb-4 space-y-4">
            <Accordion type="single" collapsible defaultValue="lang">
              <AccordionItem value="home" asChild>
                <DrawerClose asChild>
                  <Link
                    href={Routes.HomePage}
                    className="border-b border-b-zinc-200 text-foreground block text-sm font-semibold py-4"
                  >
                    {t('home')}
                  </Link>
                </DrawerClose>
              </AccordionItem>
              {navs.map(({ label, href }, i) => (
                <AccordionItem value={i.toString()} asChild>
                  <DrawerClose asChild>
                    <Link
                      href={href}
                      className="border-b border-b-zinc-200 text-foreground block text-sm font-semibold py-4"
                    >
                      {label()}
                    </Link>
                  </DrawerClose>
                </AccordionItem>
              ))}
              <AccordionItem value="lang">
                <AccordionTrigger>{t('lang')}</AccordionTrigger>
                <AccordionContent className="flex flex-col items-start">
                  {languages.map(([code, { name }]) => (
                    <Button
                      key={code}
                      variant="link"
                      className={cn(
                        'p-0 text-muted-foreground',
                        lang === code && 'text-blue-600'
                      )}
                      onClick={() => setLang(code)}
                    >
                      {name}
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Icons.X className="w-6 h-6" />
                <Icons.Telegram className="w-7 h-7" />
              </div>
              <Logo className="invert w-28" />
            </div>
          </DrawerContent>
        </Drawer>
        <Logo className="w-24" />
      </div>
      <ConnectLink />
    </>
  )
}
