import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.set('trust proxy', true); // Оставляем

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.get('/', (req, res) => {
  res.send('✅ StreamCoins API is running!');
});

app.use(express.json());

app.use(cors({
  origin: [
    'https://streamcoins.ru',
    'https://preeminent-biscotti-993d1b.netlify.app'
  ],
  credentials: true,
}));

app.use('/api/user', userRoutes);

// Подключение к Mongo и запуск
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
};

startServer();
