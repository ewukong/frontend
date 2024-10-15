import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import zh from './locales/zh.json'
import en from './locales/en.json'

export const i18nResources = {
  en: {
    name: 'English',
    translation: en,
    iso31661: 'en',
  },
  zh: {
    name: '中文',
    translation: zh,
    iso31661: 'cn',
  },
} as const

i18n.use(initReactI18next).init({
  resources: i18nResources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export const i18nConfig = i18n

export const languages = Object.entries(i18nResources)

export type I18nCodes = keyof typeof i18nResources

export type I18nIso31661Codes = (typeof i18nResources)[I18nCodes]['iso31661']
