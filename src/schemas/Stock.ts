import { Schema, model } from 'mongoose';

const stockSchema = new Schema(
  {
    quantity: { type: Number, required: true, default: 0 },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Ref Product
  },
  {
    timestamps: true, // createdAt and updatedAt fields
  }
);

const StockModel = model('Stock', stockSchema);

export { StockModel };
