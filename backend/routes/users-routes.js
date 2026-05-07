import express from 'express';
import { check } from 'express-validator';
import usersController from '../controllers/users-controller.js';

const router = express.Router();

router.post('/register', [
  check('nom').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({ min: 6 })
], usersController.register);

router.post('/login', usersController.login);

export default router;