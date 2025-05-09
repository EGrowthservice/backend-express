import mongoose, { Schema } from 'mongoose';
import { INews } from '../types/news';

const newsSchema: Schema<INews> = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    image: { type: String },
    seo_title: { type: String },
    seo_description: { type: String },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INews>('News', newsSchema);