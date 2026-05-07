import HttpError from '../util/http-error.js';
import { validationResult } from 'express-validator';
import Recette from '../models/recette.js';

const getAllRecettes = async (req, res, next) => {
  let recettes;

  try {
    recettes = await Recette.find().exec();
  } catch (e) {
    console.log(e);
    return next(new HttpError('Une erreur BD est survenue', 500));
  }

  res.json({ recettes });
};

const getRecetteById = async (req, res, next) => {
  const recetteId = req.params.rid;

  let recette;
  try {
    recette = await Recette.findById(recetteId);
  } catch (e) {
    console.log(e);
    return next(new HttpError('Une erreur BD est survenue', 500));
  }

  if (!recette) {
    return next(new HttpError('Recette non trouvée', 404));
  }

  res.json({ recette: recette.toObject({ getters: true }) });
};

const createRecette = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(new HttpError('Données saisies invalides. Vérifiez votre payload.', 422));
  }

  const { titre, description, ingredients, tempsPreparation } = req.body;

  const createdRecette = new Recette({
    titre,
    description,
    ingredients,
    tempsPreparation
  });

  try {
    await createdRecette.save();
  } catch (e) {
    return next(new HttpError('Création dans la BD échouée.', 500));
  }

  res.status(201).json({ recette: createdRecette });
};

const updateRecette = async (req, res, next) => {
  const recetteId = req.params.rid;
  const { titre, description, ingredients, tempsPreparation } = req.body;

  let recette;
  try {
    recette = await Recette.findById(recetteId);
  } catch (e) {
    console.log(e);
    return next(new HttpError('Une erreur BD est survenue', 500));
  }

  if (!recette) {
    return next(new HttpError('Recette non trouvée', 404));
  }

  if (titre) recette.titre = titre;
  if (description) recette.description = description;
  if (ingredients) recette.ingredients = ingredients;
  if (tempsPreparation) recette.tempsPreparation = tempsPreparation;

  try {
    await recette.save();
  } catch (e) {
    return next(new HttpError('Mise à jour échouée.', 500));
  }

  res.json({ recette: recette.toObject({ getters: true }) });
};

const deleteRecette = async (req, res, next) => {
  const recetteId = req.params.rid;

  let recette;
  try {
    recette = await Recette.findByIdAndDelete(recetteId);
  } catch (e) {
    console.log(e);
    return next(new HttpError('Une erreur BD est survenue', 500));
  }

  if (!recette) {
    return next(new HttpError('Recette non trouvée', 404));
  }

  res.json({ message: 'Recette supprimée avec succès.' });
};

export default {
  getAllRecettes,
  getRecetteById,
  createRecette,
  updateRecette,
  deleteRecette
};