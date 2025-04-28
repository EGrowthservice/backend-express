import { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock_quantity: number;
  sku: string;
  status: 'active' | 'inactive' | 'deleted';
  categories: Schema.Types.ObjectId[];
  images: string[]; // Hình ảnh sản phẩm
  seo_title: string; // Tiêu đề SEO
  seo_description: string; // Mô tả SEO
  createdAt: Date;
  updatedAt: Date;
}
