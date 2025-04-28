// models/productAttribute.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProductAttribute extends Document {
  productId?: Schema.Types.ObjectId;
  variantId?: Schema.Types.ObjectId;
  attributeId: Schema.Types.ObjectId;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const productAttributeSchema: Schema<IProductAttribute> = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    attributeId: { type: Schema.Types.ObjectId, ref: 'Attribute', required: true },
    value: { type: String, required: true }, // Giá trị cụ thể, ví dụ: "Red"
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ProductAttribute = mongoose.model<IProductAttribute>('ProductAttribute', productAttributeSchema);

export default ProductAttribute;