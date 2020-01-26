import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './messages/zh'
import en from './messages/en'

const resources = {
  'zh-CN': {
    translation: zh,
  },
  'en-US': {
    translation: en,
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'zh-CN',
  lng: navigator.language,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
