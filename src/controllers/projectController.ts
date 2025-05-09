import { Request, Response } from 'express';
import ProjectService from '../services/projectService';

class ProjectController {
  async createProject(req: Request, res: Response) {
    try {
      const project = await ProjectService.createProject(req.body, req.user!.id, req.file);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProjects(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await ProjectService.getProjects(Number(page), Number(limit));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ProjectController();