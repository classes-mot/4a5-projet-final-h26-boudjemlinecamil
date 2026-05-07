import mongoose from 'mongoose';

const recetteSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  tempsPreparation: { type: Number, required: true },
});

const Recette = mongoose.model('Recette', recetteSchema);

export default Recette;