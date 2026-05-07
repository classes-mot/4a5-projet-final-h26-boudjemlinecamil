import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { LanguageContext } from '../../context/LanguageContext'
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher'
import './Header.css'

export default function Header() {
  const auth = useContext(AuthContext)
  const languageContext = useContext(LanguageContext)
  const t = languageContext.translations
  const navigate = useNavigate()

  return (
    <header className="header">
      <h2 onClick={() => navigate('/')}>Camil Recettes</h2>

      <nav>
        <button onClick={() => navigate('/')}>{t.title}</button>

        {auth.isLoggedIn ? (
          <>
            <button onClick={() => navigate('/ajouter')}>{t.addRecipe}</button>
            <button onClick={auth.logout}>{t.logout}</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>{t.login}</button>
            <button onClick={() => navigate('/inscription')}>{t.signup}</button>
          </>
        )}

        <LanguageSwitcher />
      </nav>
    </header>
  )
}