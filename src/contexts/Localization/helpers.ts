import { EN } from 'config/localization/languages'

const publicUrl = 'https://jetswap.finance'
// const publicUrl = 'http://localhost:3000'
// const publicUrl = 'https://jetswap-lottery.netlify.app'
// const publicUrl = 'https://jetswap-front.netlify.app'

export const LS_KEY = 'jetswap_language'

export const fetchLocale = async (locale) => {
  const response = await fetch(`${publicUrl}/locales/${locale}.json`)
  const data = await response.json()
  return data
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
