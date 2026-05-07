import { useContext, useState } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import './RecetteForm.css'

export default function RecetteForm({ recetteInitiale, onSubmit, texteBouton }) {
  const languageContext = useContext(LanguageContext)
  const t = languageContext.translations

  const [titre, setTitre] = useState(recetteInitiale ? recetteInitiale.titre : '')
  const [description, setDescription] = useState(recetteInitiale ? recetteInitiale.description : '')
  const [ingredients, setIngredients] = useState(recetteInitiale ? recetteInitiale.ingredients : '')
  const [tempsPreparation, setTempsPreparation] = useState(
    recetteInitiale ? recetteInitiale.tempsPreparation : ''
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      titre,
      description,
      ingredients,
      tempsPreparation
    })
  }

  return (
    <form className="recette-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titre">Titre</label>
        <input
          id="titre"
          type="text"
          value={titre}
          onChange={(event) => setTitre(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">{t.description}</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="ingredients">{t.ingredients}</label>
        <input
          id="ingredients"
          type="text"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="tempsPreparation">{t.preparationTime}</label>
        <input
          id="tempsPreparation"
          type="number"
          value={tempsPreparation}
          onChange={(event) => setTempsPreparation(event.target.value)}
          required
        />
      </div>

      <button type="submit">{texteBouton}</button>
    </form>
  )
}