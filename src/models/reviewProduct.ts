// models/review.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewProductSchema: Schema<IReview> = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ReviewProduct = mongoose.model<IReview>('reviewProduct', reviewProductSchema);

export default ReviewProduct;