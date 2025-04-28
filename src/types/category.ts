import { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentId?: Schema.Types.ObjectId;
  image?: string;
  status: 'active' | 'inactive';
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
