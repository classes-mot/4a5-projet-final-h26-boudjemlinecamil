import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../config'

export default function ListeRecettes() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [recettes, setRecettes] = useState([])
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/recettes`)
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setRecettes(responseData.recettes)
      } catch (err) {
        setErreur(err.message)
      }
    }
    fetchRecettes()
  }, [])

  const handleSupprimer = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/recettes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + auth.token }
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      setRecettes(recettes.filter(r => r._id !== id))
    } catch (err) {
      setErreur(err.message)
    }
  }

  return (
    <div>
      <h1>Recettes de cuisine</h1>
      {auth.isLoggedIn ? (
        <div>
          <button onClick={() => navigate('/ajouter')}>Ajouter une recette</button>
          <button onClick={auth.logout}>Se déconnecter</button>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>Se connecter</button>
      )}
      {erreur && <p>{erreur}</p>}
      {recettes.map(recette => (
        <div key={recette._id}>
          <h2>{recette.titre}</h2>
          <p>{recette.description}</p>
          <p>Ingrédients : {recette.ingredients}</p>
          <p>Temps de préparation : {recette.tempsPreparation} minutes</p>
          {auth.isLoggedIn && (
            <button onClick={() => handleSupprimer(recette._id)}>Supprimer</button>
          )}
        </div>
      ))}
    </div>
  )
}