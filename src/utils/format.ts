import { BigNumber } from 'bignumber.js'
import { Dayjs } from 'dayjs'

export const formatAddress = (
  addr: string,
  { prefixLen = 4, suffixLen = 4, separator = '...' } = {}
) => {
  if (!addr || !addr.trim()) return ''
  const prefix = addr.slice(0, prefixLen)
  const suffix = addr.slice(-suffixLen)

  return `${prefix}${separator}${suffix}`
}

export const formatCoundown = (
  d?: number | string,
  h?: number | string,
  m?: number | string,
  s?: number | string,
  ms?: number | string
) => {
  const dt = []

  const isValid = <T = any>(t: T) => typeof t !== 'undefined'

  if (isValid(d)) dt.push(`${d}d`)
  if (isValid(h)) dt.push(`${h}h`)
  if (isValid(m)) dt.push(`${m}m`)
  if (isValid(s)) dt.push(`${s}s`)
  if (isValid(ms)) dt.push(`${ms}ms`)

  return dt.join(': ')
}

export const formatDecimals = (
  value?: number | string | BigNumber,
  { fixed = 2, round = false } = {}
) => {
  if (!value) return '0'

  const roundMode = round ? BigNumber.ROUND_HALF_UP : BigNumber.ROUND_DOWN
  value = value instanceof BigNumber ? value : BigNumber(value)

  if (value.gte(1)) {
    return value.toFixed(fixed, roundMode)
  }
  if (value.lte(0)) return '0'

  const decimalIndex = value.toFixed(roundMode).indexOf('.')
  if (decimalIndex !== -1) {
    const decimalPart = value.toFixed().slice(decimalIndex + 1)
    const zeroLen = decimalPart.match(/^0*/)?.[0].length ?? 0
    const lastNumbers = decimalPart.replace(/^0+/, '')
    const slicedLastNum = lastNumbers.slice(0, fixed)
    const result = `0.0{${zeroLen}}${slicedLastNum}`

    if (zeroLen < 2) return value.toFixed(fixed, roundMode)
    if (zeroLen === 2) return value.toFixed(fixed + 1, roundMode)

    return result
  } else {
    return BigNumber(value).toFixed(roundMode)
  }
}

export const toForamtWithFixed = (n: number | string | BigNumber, fixed = 2) =>
  BigNumber(BigNumber(n).toFixed(fixed)).toFormat()

export const nonnegative = (value = 0) => Math.max(0, value)

export const formatDayjs = (day: Dayjs, template = 'YYYY-MM-DD HH:mm:ss') =>
  day.format(template)
