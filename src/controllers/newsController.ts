import { Request, Response } from 'express';
import NewsService from '../services/newsService';

class NewsController {
  async createNews(req: Request, res: Response) {
    try {
      const news = await NewsService.createNews(req.body, req.user!.id);
      res.status(201).json(news);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateNews(req: Request, res: Response) {
    try {
      const news = await NewsService.updateNews(req.params.id, req.body);
      if (!news) return res.status(404).json({ message: 'News not found' });
      res.status(200).json(news);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteNews(req: Request, res: Response) {
    try {
      const news = await NewsService.deleteNews(req.params.slug);
      if (!news) return res.status(404).json({ message: 'News not found' });
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getNewsBySlug(req: Request, res: Response) {
    try {
      const news = await NewsService.getNewsBySlug(req.params.slug);
      if (!news) return res.status(404).json({ message: 'News not found' });
      res.status(200).json(news);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getNewsList(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await NewsService.getNewsList(Number(page), Number(limit));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new NewsController();