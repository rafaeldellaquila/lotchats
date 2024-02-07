import { useTranslation } from 'react-i18next'

function Profile() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('pt')}>Português</button>
    </div>
  )
}

export default Profile
