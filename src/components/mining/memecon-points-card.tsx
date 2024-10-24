import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Icons } from '../icons'
import { NumberTicker } from '../ui/number-ticker'
import { t } from 'i18next'
import { Button } from '../ui/button'

export const MemecoinPointsCard = () => {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl">{t('mining.points-title')}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex items-center space-x-2">
          <Icons.Mining className="font-led-counter text-3xl" />
          <NumberTicker
            value={1}
            decimalPlaces={4}
            className="font-led-counter text-3xl leading-[inherit]"
          />
          <span className="text-lg max-sm:text-sm">
            {t('mining.points-already-claimed')}
          </span>
        </div>
        {/* TODO: remove comment */}
        {/* <div className="flex items-center space-x-2">
          <Icons.WukongCoin className="font-led-counter text-3xl" />
          <NumberTicker
            value={+claiemdAmount}
            decimalPlaces={decimalsSelector(+claiemdAmount)}
            className="font-led-counter text-3xl"
          />
          <span className="text-lg max-sm:text-sm">
            {t('already-withdrawn')}
          </span>
        </div> */}
      </CardContent>
      <CardFooter className="flex-col space-y-4 items-start">
        <Button
          variant="destructive"
          size="lg"
          className="min-w-28"
          disabled={false}
        >
          {t('withdraw')}
        </Button>
      </CardFooter>
    </Card>
  )
}
