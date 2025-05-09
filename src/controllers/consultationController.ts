import { Request, Response } from 'express';
import ConsultationService from '../services/consultationService';

class ConsultationController {
  async registerConsultation(req: Request, res: Response) {
    try {
      const consultation = await ConsultationService.registerConsultation(req.body, req.user!.id);
      res.status(201).json(consultation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ConsultationController();