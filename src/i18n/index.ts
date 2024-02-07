import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en/en.json'
import pt from './pt/pt.json'

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
