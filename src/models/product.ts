import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/product';  

const productSchema: Schema<IProduct> = new Schema(
    {
      name: { type: String, required: true },
      slug: { type: String, unique: true, required: true },  // SEO-friendly URL
      description: { type: String, required: true },
      price: { type: Number, required: true },
      stock_quantity: { type: Number, default: 0 },
      status: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'active' },
      categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],  // Liên kết danh mục
      images: [String],
      seo_title: { type: String },
      seo_description: { type: String },
    },
    { timestamps: true }
  );

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
