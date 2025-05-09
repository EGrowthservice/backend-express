import { Router } from 'express';
import AffiliateController from '../controllers/affiliateController';
import { verifyToken, hasRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/me', verifyToken, AffiliateController.getUserAffiliate);
router.post('/', verifyToken, hasRole(['admin']), AffiliateController.createAffiliate);
router.get('/', verifyToken, hasRole(['admin']), AffiliateController.getAffiliatePartners);
router.get('/tracking', verifyToken, hasRole(['admin']), AffiliateController.getTrackingHistory);
router.patch('/payout/:id', verifyToken, hasRole(['admin']), AffiliateController.updatePayoutStatus);

export default router;