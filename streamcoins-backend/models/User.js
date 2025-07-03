import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  coins: {
    type: Number,
    default: 0,
  },
  upgrades: {
    type: Object,
    default: {},
  },
  viewers: {
    type: Number,
    default: 0,
  },
  lastVisit: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 0,
  }
});

export default mongoose.model('User', userSchema);
