import { Schema, model } from 'mongoose';

// Order schema definition
const orderSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', // Reference to the User model
      required: true 
    },
    total: { 
      type: Number, 
      required: true 
    },
    paymentMethod: { 
      type: String, 
      enum: ['credit', 'paypal', 'googlepay', 'applepay'], // Payment methods
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'paid', 'shipped', 'delivered'], // Order status
      required: true 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Order model
const OrderModel = model('Order', orderSchema);

export { OrderModel };
