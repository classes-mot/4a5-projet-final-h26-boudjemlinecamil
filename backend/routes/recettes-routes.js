import express from 'express';
import { check } from 'express-validator';
import recettesController from '../controllers/recettes-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', recettesController.getAllRecettes);
router.get('/:rid', recettesController.getRecetteById);

router.use(checkAuth);

router.post('/', [
  check('titre').not().isEmpty(),
  check('description').not().isEmpty(),
  check('ingredients').not().isEmpty(),
  check('tempsPreparation').not().isEmpty()
], recettesController.createRecette);

router.patch('/:rid', recettesController.updateRecette);

router.delete('/:rid', recettesController.deleteRecette);

export default router;