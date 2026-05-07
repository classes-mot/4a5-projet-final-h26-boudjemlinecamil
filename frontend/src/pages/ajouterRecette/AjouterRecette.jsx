import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, Navigate } from 'react-router-dom'
import API_URL from '../../config'

export default function AjouterRecette() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fd = new FormData(event.target)
    const data = Object.fromEntries(fd.entries())

    try {
      const response = await fetch(`${API_URL}/api/recettes`, {
        method: 'POST',
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
      alert(err.message)
    }
  }

  return (
    <div>
      <h1>Ajouter une recette</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titre">Titre</label>
          <input id="titre" type="text" name="titre" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" type="text" name="description" required />
        </div>
        <div>
          <label htmlFor="ingredients">Ingrédients</label>
          <input id="ingredients" type="text" name="ingredients" required />
        </div>
        <div>
          <label htmlFor="tempsPreparation">Temps de préparation (minutes)</label>
          <input id="tempsPreparation" type="number" name="tempsPreparation" required />
        </div>
        <button type="submit">Ajouter</button>
        <button type="button" onClick={() => navigate('/')}>Annuler</button>
      </form>
    </div>
  )
}