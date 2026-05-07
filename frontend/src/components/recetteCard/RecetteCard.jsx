import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { LanguageContext } from '../../context/LanguageContext'
import './RecetteCard.css'

export default function RecetteCard({ recette, onSupprimer }) {
  const auth = useContext(AuthContext)
  const languageContext = useContext(LanguageContext)
  const t = languageContext.translations
  const navigate = useNavigate()

  return (
    <div className="recette-card">
      <h2>{recette.titre}</h2>
      <p>{recette.description}</p>
      <p>{t.ingredients} : {recette.ingredients}</p>
      <p>{t.preparationTime} : {recette.tempsPreparation} {t.minutes}</p>

      {auth.isLoggedIn && (
        <div className="recette-card-actions">
          <button onClick={() => navigate(`/modifier/${recette._id}`)}>
            {t.edit}
          </button>

          <button onClick={() => onSupprimer(recette._id)}>
            {t.delete}
          </button>
        </div>
      )}
    </div>
  )
}