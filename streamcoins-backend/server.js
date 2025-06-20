import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB подключена');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Сервер запущен на http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ Ошибка подключения MongoDB:', err));
