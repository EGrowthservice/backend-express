import { Router } from 'express';
import NewsController from '../controllers/newsController';
import { verifyToken, hasRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', verifyToken, hasRole(['admin']), NewsController.createNews);
router.put('/:id', verifyToken, hasRole(['admin']), NewsController.updateNews);
router.delete('/:slug', verifyToken, hasRole(['admin']), NewsController.deleteNews);
router.get('/:slug', NewsController.getNewsBySlug);
router.get('/', verifyToken, hasRole(['admin']), NewsController.getNewsList);

export default router;