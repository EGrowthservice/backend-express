import { Router } from 'express';
import CategoryController from '../controllers/categoryController';

const router = Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;
