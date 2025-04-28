import Product from '../models/product';
import { IProduct } from '../types/product.ts';

class ProductService {
  // Tạo mới một sản phẩm
  async createProduct(data: IProduct) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  // Lấy tất cả sản phẩm
  async getProducts() {
    try {
      return await Product.find().populate('categories');
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  // Lấy sản phẩm theo ID
  async getProductById(productId: string) {
    try {
      return await Product.findById(productId).populate('categories');
    } catch (error) {
      throw new Error(`Error fetching product by ID: ${error.message}`);
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(productId: string, data: Partial<IProduct>) {
    try {
      return await Product.findByIdAndUpdate(productId, data, { new: true });
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // Xóa sản phẩm
  async deleteProduct(productId: string) {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

export default new ProductService();
