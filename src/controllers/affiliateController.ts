import { Request, Response } from 'express';
import AffiliateService from '../services/affiliateService';

class AffiliateController {
  async getUserAffiliate(req: Request, res: Response) {
    try {
      const affiliate = await AffiliateService.getUserAffiliate(req.user!.id);
      if (!affiliate) return res.status(404).json({ message: 'Affiliate not found' });
      res.status(200).json(affiliate);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createAffiliate(req: Request, res: Response) {
    try {
      const affiliate = await AffiliateService.createAffiliate(req.body.userId, req.body.code);
      res.status(201).json(affiliate);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAffiliatePartners(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await AffiliateService.getAffiliatePartners(Number(page), Number(limit));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTrackingHistory(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await AffiliateService.getTrackingHistory(Number(page), Number(limit));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePayoutStatus(req: Request, res: Response) {
    try {
      const tracking = await AffiliateService.updatePayoutStatus(req.params.id, req.body.status);
      if (!tracking) return res.status(404).json({ message: 'Tracking not found' });
      res.status(200).json(tracking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AffiliateController();