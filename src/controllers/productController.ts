import { Request, Response } from 'express';
import ProductService from '../services/productService';

class ProductController {
  // Tạo mới sản phẩm
  async createProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lấy tất cả sản phẩm
  async getProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lấy sản phẩm theo ID
  async getProductById(req: Request, res: Response) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Xóa sản phẩm
  async deleteProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async searchProducts(req: Request, res: Response) {
    try {
      const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
      const filters: any = {};
  
      if (search) filters.name = { $regex: search, $options: 'i' };
      if (category) filters.categories = category;
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
      }
  
      const products = await ProductService.searchProducts(filters, Number(page), Number(limit));
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ProductController();
