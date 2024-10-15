import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import dayjsZh from 'dayjs/locale/zh-cn'
import dayjsEn from 'dayjs/locale/en'

import { useLocalStorage } from './use-storage'
// import { isUtcOffset8 } from '@/utils/day'

export const useLang = () => {
  const { i18n } = useTranslation()
  const { getStorage, setStorage } = useLocalStorage()

  const setLang = (code: string) => {
    i18n.changeLanguage(code)
    setStorage('lang', code)
  }

  const toggleLang = (langA = 'en', langB = 'zh') => {
    setLang(i18n.language === langA ? langB : langA)
  }

  useEffect(() => {
    const lang = getStorage('lang')
    if (lang) return setLang(lang)
    // if (isUtcOffset8()) setLang('zh')
  }, [])

  useEffect(() => {
    dayjs.locale(i18n.language === 'zh' ? dayjsZh : dayjsEn)
  }, [i18n.language])

  return {
    lang: i18n.language,
    getLang: () => getStorage('lang'),
    setLang,
    toggleLang,
  }
}
