import { type ComponentProps, useEffect } from 'react'
import { Dayjs } from 'dayjs'
import { useCountDown } from 'ahooks'

import { cn } from '@/lib/utils'
import { formatCoundown } from '@/utils/format'

interface Props {
  targetDate: Dayjs | string
  showZero?: boolean
  onExpired?: (isExpired: boolean) => void
}

export const Countdown = ({
  targetDate,
  className,
  showZero,
  onExpired,
  ...props
}: Props & ComponentProps<'div'>) => {
  const [left, { days, hours, minutes, seconds }] = useCountDown({ targetDate })
  const isExpired = left <= 0

  useEffect(() => {
    if (isExpired) onExpired?.(true)
  }, [isExpired])

  if (isExpired && !showZero) return

  return (
    <div className={cn('font-semibold text-lg', className)} {...props}>
      {formatCoundown(days, hours, minutes, seconds)}
    </div>
  )
}

export default Countdown
