// models/attribute.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAttribute extends Document {
  name: string;
  slug: string;
  values: string[];
  createdAt: Date;
  updatedAt: Date;
}

const attributeSchema: Schema<IAttribute> = new Schema(
  {
    name: { type: String, required: true }, // Ví dụ: "Color", "Size"
    slug: { type: String, unique: true, required: true },
    values: [{ type: String }], // Ví dụ: ["Red", "Blue"] cho Color
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Attribute = mongoose.model<IAttribute>('Attribute', attributeSchema);

export default Attribute;