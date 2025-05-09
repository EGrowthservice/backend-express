import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types/project';

const projectSchema: Schema<IProject> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    fileUrl: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', projectSchema);