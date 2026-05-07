import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const languageContext = useContext(LanguageContext)

  return (
    <div className="language-switcher">
      <button onClick={() => languageContext.changeLanguage('fr')}>
        FR
      </button>
      <button onClick={() => languageContext.changeLanguage('en')}>
        EN
      </button>
    </div>
  )
}