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
    type: [String], // или позже сделаем массив объектов
    default: [],
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
