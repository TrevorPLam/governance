import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

/**
 * API Routes
 */
router.get('/', apiController.getRoot);
router.get('/users', apiController.getUsers);
router.post('/users', apiController.createUser);
router.get('/users/:id', apiController.getUserById);

export default router;
