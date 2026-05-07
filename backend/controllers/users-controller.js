import HttpError from '../util/http-error.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const register = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(new HttpError('Données saisies invalides. Vérifiez votre payload.', 422));
  }

  const { nom, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (e) {
    return next(new HttpError('Une erreur BD est survenue', 500));
  }

  if (existingUser) {
    return next(new HttpError('Cet email est déjà utilisé', 422));
  }

  const createdUser = new User({
    nom,
    email,
    password
  });

  try {
    await createdUser.save();
  } catch (e) {
    return next(new HttpError('Création dans la BD échouée.', 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'cleSuperSecrete!',
      { expiresIn: '1h' }
    );
  } catch (e) {
    return next(new HttpError('Inscription échouée, réessayez plus tard.', 500));
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (e) {
    return next(new HttpError('Une erreur BD est survenue', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Email ou mot de passe invalide', 401));
  }

  if (existingUser.password !== password) {
    return next(new HttpError('Email ou mot de passe invalide', 401));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'cleSuperSecrete!',
      { expiresIn: '1h' }
    );
  } catch (e) {
    return next(new HttpError('Connexion échouée, réessayez plus tard.', 500));
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

export default { register, login };