// models/category.ts
import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../types/category';  

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String }, // Hình ảnh đại diện danh mục
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    displayOrder: { type: Number, default: 0 }, // Thứ tự hiển thị
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;