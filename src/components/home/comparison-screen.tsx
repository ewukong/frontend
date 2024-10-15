'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { H2 } from '@/components/ui/typography/h2'

export const ComparisonScreen = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <H2>{t('home.vs-title')}</H2>
      <H2 className="text-2xl">{t('home.vs-nft')}</H2>
      <img
        src="/images/home/nft-vs.png"
        alt="nft"
        className="max-w-[38rem] rounded mx-auto my-4 max-sm:max-w-full"
      />

      <H2 className="mt-20 max-sm:mt-10">{t('home.vs-title')}</H2>
      <H2 className="text-2xl">{t('home.vs-coin')}</H2>
      <img
        src="/images/home/coin-vs.jpeg"
        alt="nft"
        className="max-w-[38rem] rounded mx-auto my-4 max-sm:max-w-full"
      />
    </div>
  )
}
