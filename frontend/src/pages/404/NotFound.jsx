import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import './NotFound.css'

export default function NotFound() {
  const languageContext = useContext(LanguageContext)
  const t = languageContext.translations

  return (
    <div className="not-found-page">
      <h1>{t.notFound}</h1>
    </div>
  )
}