import { Router } from 'express';
import ProductController from '../controllers/productController';

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/search', ProductController.searchProducts);

export default router;
