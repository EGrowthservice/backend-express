import mongoose, { Schema } from 'mongoose';
import { IAffiliate, IAffiliateTracking } from '../types/affiliate';

const affiliateSchema: Schema<IAffiliate> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, unique: true, required: true },
    commissionRate: { type: Number, default: 0.1 },
    totalEarnings: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

const affiliateTrackingSchema: Schema<IAffiliateTracking> = new Schema(
  {
    affiliate: { type: Schema.Types.ObjectId, ref: 'Affiliate', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    amount: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  },
  { timestamps: true }
);

export const Affiliate = mongoose.model<IAffiliate>('Affiliate', affiliateSchema);
export const AffiliateTracking = mongoose.model<IAffiliateTracking>('AffiliateTracking', affiliateTrackingSchema);