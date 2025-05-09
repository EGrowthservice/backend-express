import { Router } from 'express';
import ConsultationController from '../controllers/consultationController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', verifyToken, ConsultationController.registerConsultation);

export default router;