import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Доверять прокси (важно для корректной работы редиректов и CORS через nginx)
app.set('trust proxy', true);

// Заглушка для корневого роута
app.get('/', (req, res) => {
  res.send('✅ StreamCoins API is running!');
});

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});


// CORS – только разрешённые источники
app.use(cors({
  origin: [
    'https://streamcoins.ru',
    'https://preeminent-biscotti-993d1b.netlify.app'
  ],
  credentials: true,
}));

// Роуты
app.use('/api/user', userRoutes);

// Подключение к MongoDB и старт сервера
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
