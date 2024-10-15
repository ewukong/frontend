import i18n from 'i18next'

import { I18nCodes } from '@/i18n'

export const isEn = () => (i18n.language as I18nCodes) === 'en'

export const isZn = () => (i18n.language as I18nCodes) === 'zh'

export const langReplace = (
  value: string,
  args: (string | number)[],
  symbol = '{}'
) => {
  let i = 0
  return (value || '').replace(new RegExp(symbol, 'g'), () => String(args[i++]))
}

export const langLocale = <T extends Record<string, string>>(
  obj: T | undefined
) => {
  if (!obj) return ''
  return obj[i18n.language] || obj.en || ''
}
