import mongoose, { Schema } from 'mongoose';
import { IDonation } from '../types/donation';

const donationSchema: Schema<IDonation> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    treeCount: { type: Number, required: true },
    affiliate: { type: Schema.Types.ObjectId, ref: 'Affiliate' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<IDonation>('Donation', donationSchema);