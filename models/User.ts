import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// wallet schema
const walletSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    stripeCustomerId: {
        type: String,
        required: true
    }
}, { _id: false });


// user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      wallet: walletSchema,
      createdAt: {
        type: Date,
        default: Date.now
      }
});

// hash password
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
  next();
})

// check password
export default userSchema.methods.checkPassword = async function(candidatePassword: any) : Promise<Boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model('User', userSchema);