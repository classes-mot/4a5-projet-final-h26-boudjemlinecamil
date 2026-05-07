import RecetteCard from '../recetteCard/RecetteCard'
import './RecetteList.css'

export default function RecetteList({ recettes, onSupprimer }) {
  return (
    <div className="recette-list">
      {recettes.map((recette) => (
        <RecetteCard
          key={recette._id}
          recette={recette}
          onSupprimer={onSupprimer}
        />
      ))}
    </div>
  )
}