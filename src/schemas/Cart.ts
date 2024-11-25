import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId, 
          ref: 'Product', 
          required: true
        },
        quantity: { 
          type: Number, 
          required: true, 
          default: 1 
        }
      }
    ],
  },
  { timestamps: true }
);

const CartModel = model('Cart', cartSchema);

export { CartModel };
