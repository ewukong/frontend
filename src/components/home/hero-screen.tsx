'use client'

import React from 'react'
import NextLink from 'next/link'
import { BigNumber } from 'bignumber.js'
import { Trans, useTranslation } from 'react-i18next'

import { Icons } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/link'
import { langReplace } from '@/utils/lang'
import { wukongConfig } from '@/config/wukong'
import { linkConfig } from '@/config/links'
import { Routes } from '@/routes'
import { toast } from 'sonner'
import { useLang } from '@/hooks/use-lang'
import SparklesText from '@/components/ui/sparkles-text'
import PulsatingButton from '@/components/ui/pulsating-button'

export const HeroScreen = () => {
  const { t } = useTranslation()

  const buttons = [
    {
      // label: t('home.mint'),
      label: t('coming-soon'),
      icon: <Icons.Mint />,
      isBlue: false,
      href: wukongConfig.mintLink,
      pulseColor: 'black',
    },
    {
      label: t('home.mining'),
      icon: <Icons.Mining />,
      isBlue: true,
      path: Routes.MiningPage,
    },
    {
      label: t('home.airdrop'),
      icon: <Icons.Airdrop />,
      isBlue: true,
      path: Routes.AirdropPage,
    },
  ]

  const blocks = [
    {
      label: t('artworks'),
      number: wukongConfig.artworks,
    },
    {
      label: t('home.artists'),
      number: wukongConfig.artists,
    },
    {
      label: t('home.active-airdrop'),
      number: wukongConfig.airdropAddresses,
    },
  ]

  return (
    <div className="sm:pb-48 sm:pt-10 flex justify-between space-x-4">
      <div className="space-y-4 max-sm:space-y-2 flex flex-col justify-between">
        <Icons.Solana className="w-48 max-sm:mt-6" />
        <SparklesText
          className="text-3xl max-w-[30rem] tracking-wide leading-normal max-sm:max-w-full max-sm:tracking-normal max-sm:leading-tight !font-normal"
          text={t('home.hero')}
        />
        <div className="!my-10 max-sm:!my-0">
          <p className="max-w-[28rem] !my-0 max-sm:max-w-full">
            {langReplace(t('home.hero-description1'), [
              // wukongConfig.airdropPerMint,
              t('hoem.description1-blur'),
            ])}
          </p>
          <p>
            {langReplace(t('home.hero-description2'), [
              wukongConfig.goldMintTimes,
            ])}
          </p>
        </div>
        <img
          src="/images/wukong/nfts.gif"
          alt="wukong"
          className="rounded self-start sm:hidden max-sm:w-full"
        />
        <div className="flex items-center space-x-4 max-sm:space-x-0 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2">
          {buttons.map(({ label, icon, isBlue, href, path, pulseColor }) => (
            <NextLink
              key={label}
              href={(href || path)!}
              target={href ? '_blank' : '_self'}
              className="first:col-span-2"
            >
              <PulsatingButton
                variant={isBlue ? 'blue' : 'default'}
                size="xl"
                className="w-full"
                pulseColor={pulseColor}
              >
                <div className="flex items-center space-x-2 w-full">
                  {icon}
                  <span>{label}</span>
                </div>
              </PulsatingButton>
            </NextLink>
          ))}
        </div>
        {/* <div className="flex items-center space-x-1">
          <span>
            <Trans
              i18nKey="home.supported"
              values={{
                website: 'launchmynft.io',
              }}
              components={{
                a: (
                  <Link
                    href={linkConfig.launchMyNft}
                    target="_blank"
                    className="text-white"
                  ></Link>
                ),
              }}
            />
          </span>
          <Icons.LaunchMyNft className="rounded" />
        </div> */}
        <div className="flex items-center space-x-20 w-full justify-between max-sm:space-x-2 max-sm:flex-col max-sm:space-y-6 max-sm:!mt-10">
          {blocks.map(({ label, number }) => (
            <div key={label}>
              <p className="text-3xl font-bold max-sm:text-center">
                {BigNumber(number).toFormat()}
              </p>
              <p className="max-sm:text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <img
        src="/images/wukong/nfts.gif"
        alt="wukong"
        className="rounded self-start w-[32rem] h-[32rem] max-sm:hidden"
      />
    </div>
  )
}
