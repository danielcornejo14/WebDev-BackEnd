import { Schema, model } from 'mongoose';

// CreditCard schema definition
const creditCardSchema = new Schema(
  {
    number: { 
      type: String, 
      required: true 
    },
    expirationDate: { 
      type: Date, 
      required: true 
    },
    cvv: { 
      type: Number, 
      required: true 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the CreditCard model
const CreditCardModel = model('CreditCard', creditCardSchema);

export { CreditCardModel };
