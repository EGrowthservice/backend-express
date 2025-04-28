import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';

class CategoryController {
  // Tạo mới danh mục
  async createCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lấy tất cả danh mục
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lấy danh mục theo ID
  async getCategoryById(req: Request, res: Response) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Cập nhật danh mục
  async updateCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Xóa danh mục
  async deleteCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.deleteCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new CategoryController();
