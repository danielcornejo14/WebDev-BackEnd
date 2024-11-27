import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Image URLs
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
    rating: { type: Number, required: true, default: 0 },
  },
  { timestamps: true } //createdAt and updatedAt fields
);


const ProductModel = model('Product', productSchema);

export { ProductModel };