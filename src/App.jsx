import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSection from './components/MainSection';
import Shop from './components/Shop';
import BottomNav from './components/BottomNav';
import { getUserData, saveUserData } from './api/api';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [points, setPoints] = useState(0);

  // ✅ Ожидание загрузки Telegram SDK
  useEffect(() => {
    const tg = window?.Telegram?.WebApp;

    if (tg) {
      tg.ready();

      const id = tg?.initDataUnsafe?.user?.id;
      if (id) {
        setUserId(id);
        setIsReady(true);
      }
    }
  }, []);

  // ✅ Загрузка данных пользователя
  useEffect(() => {
    if (userId) {
      getUserData(userId).then((data) => {
        if (data?.coins !== undefined) {
          setPoints(data.coins);
        }
      });
    }
  }, [userId]);

  // ✅ Обработка клика
  const handleClick = () => {
    const newPoints = points + 1;
    setPoints(newPoints);
    if (userId) {
      saveUserData(userId, { coins: newPoints });
    }
  };

  // ❗ Пока не готов Telegram — показываем заглушку
  if (!isReady) {
    return (
      <div className="text-black p-4 text-center">
        <p>⏳ Загрузка...</p>
        <p className="text-sm opacity-70 mt-2">
          Убедитесь, что вы открыли мини-приложение через Telegram
        </p>
      </div>
    );
  }

  // ✅ Основной рендер
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* 🎥 Видео-фон */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="/bg_loop.mp4" type="video/mp4" />
        </video>

        {/* 📱 Контент */}
        <Routes>
          <Route path="/" element={<MainSection coins={points} onClick={handleClick} />} />
          <Route path="/shop" element={<Shop coins={points} setCoins={setPoints} userId={userId} />} />
        </Routes>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
