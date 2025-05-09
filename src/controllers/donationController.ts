import { Request, Response } from 'express';
import DonationService from '../services/donationService';

class DonationController {
  async createDonation(req: Request, res: Response) {
    try {
      const donation = await DonationService.createDonation(req.body, req.user!.id);
      res.status(201).json(donation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTrees(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await DonationService.getTrees(Number(page), Number(limit));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getContributors(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await DonationService.getContributors(Number(page), Number(limit));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new DonationController();