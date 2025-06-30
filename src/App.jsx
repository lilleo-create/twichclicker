import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSection from './components/MainSection';
import Shop from './components/Shop';
import BottomNav from './components/BottomNav';
import { getUserData, saveUserData } from './api/api';

function App() {
  const tg = window?.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id || null;
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (tg) tg.ready();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserData(userId).then((data) => {
        if (data?.coins !== undefined) {
          setPoints(data.coins);
        }
      });
    }
  }, [userId]);

  const handleClick = () => {
    const newPoints = points + 1;
    setPoints(newPoints);
    saveUserData(userId, { coins: newPoints });
  };

  if (!userId) {
    return (
      <div className="text-white p-4 text-center">
        <p>Ошибка: Telegram WebApp не передал <code>user.id</code></p>
        <p>Пожалуйста, открой мини-приложение через Telegram → кнопку «Открыть игру»</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="./bg_loop.mp4" type="video/mp4" />
        </video>

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
