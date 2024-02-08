import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en/index'
import pt from './pt/index'

const i18n = use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
