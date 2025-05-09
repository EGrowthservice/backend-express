import mongoose, { Schema } from 'mongoose';
import { IConsultation } from '../types/consultation';

const consultationSchema: Schema<IConsultation> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<IConsultation>('Consultation', consultationSchema);