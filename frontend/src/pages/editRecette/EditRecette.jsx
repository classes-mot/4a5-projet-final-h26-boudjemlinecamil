import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { LanguageContext } from '../../context/LanguageContext'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import RecetteForm from '../../components/recetteForm/RecetteForm'
import './EditRecette.css'
import API_URL from '../../config';

export default function EditRecette() {
  const auth = useContext(AuthContext)
  const languageContext = useContext(LanguageContext)
  const t = languageContext.translations

  const navigate = useNavigate()
  const params = useParams()

  const [recette, setRecette] = useState(null)
  const [erreur, setErreur] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />
  }

  useEffect(() => {
    const fetchRecette = async () => {
      try {
        const response = await fetch(`${API_URL}/api/recettes/${params.rid}`)
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setRecette(responseData.recette)
      } catch (err) {
        setErreur(err.message)
      }

      setIsLoading(false)
    }

    fetchRecette()
  }, [params.rid])

  const handleModifier = async (data) => {
    try {
      const response = await fetch(`${API_URL}/api/recettes/${params.rid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }

      navigate('/')
    } catch (err) {
      setErreur(err.message)
    }
  }

  return (
    <div className="edit-recette-page">
      <h1>{t.edit}</h1>

      {erreur && <p>{erreur}</p>}

      {isLoading && <p>Chargement...</p>}

      {!isLoading && recette && (
        <RecetteForm
          recetteInitiale={recette}
          onSubmit={handleModifier}
          texteBouton={t.save}
        />
      )}

      <button onClick={() => navigate('/')}>
        {t.cancel}
      </button>
    </div>
  )
}