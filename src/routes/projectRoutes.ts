import { Router } from 'express';
import ProjectController from '../controllers/projectController';
import { verifyToken, hasRole } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/', verifyToken, upload.single('file'), ProjectController.createProject);
router.get('/', verifyToken, hasRole(['admin']), ProjectController.getProjects);

export default router;