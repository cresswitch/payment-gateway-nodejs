import mongoose from "mongoose";

// wallet schema
const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      balance: {
        type: Number,
        default: 0,
        min: 0
      },
      currency: {
        type: String,
        default: 'USD'
      },
      stripeCustomerId: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});

// update updatedAt
walletSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export const Wallet = mongoose.model('Wallet', walletSchema);