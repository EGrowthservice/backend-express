// models/productVariant.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProductVariant extends Document {
  productId: Schema.Types.ObjectId;
  sku: string;
  price: number;
  stock: number;
  images: string[];
  status: 'active' | 'inactive' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

const productVariantSchema: Schema<IProductVariant> = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sku: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [String], // Hình ảnh riêng cho biến thể (nếu có)
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ProductVariant = mongoose.model<IProductVariant>('ProductVariant', productVariantSchema);

export default ProductVariant;