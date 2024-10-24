import type { Metadata, Viewport } from 'next'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjsZh from 'dayjs/locale/zh-cn'
import dayjsEn from 'dayjs/locale/en'

import { Toaster } from '@/components/ui/sonner'
import { AppProviders } from '@/components/providers/app'
import '@/styles/globals.css'
import 'react-h5-audio-player/lib/styles.css'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale(dayjsZh)
dayjs.locale(dayjsEn)

declare module 'react' {
  interface CSSProperties {
    [k: `--${string}`]: string
  }
}

export const metadata: Metadata = {
  title: 'Wukong',
  description:
    'Buiding the highest marketcap Memecoin and NFT Collection from the East',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-red-600 text-background">
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  )
}
