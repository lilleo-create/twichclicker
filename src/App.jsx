import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainSection from './components/MainSection';
import BottomNav from './components/BottomNav';
import Shop from './components/Shop';

import './App.css';
import { getUserData, saveUserData } from './api/api';

function App() {
  const tg = window.Telegram.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id;

  const [points, setPoints] = useState(0);

  // загружаем очки с сервера
  useEffect(() => {
    if (userId) {
      getUserData(userId).then(data => {
        if (data?.points) {
          setPoints(data.points);
        }
      });
    }
  }, [userId]);

  // инициализируем Telegram WebApp
  useEffect(() => {
    if (tg) tg.expand();
  }, []);

  // логика при клике
  const handleClick = () => {
    const newPoints = points + 1;
    setPoints(newPoints);
    saveUserData(userId, { points: newPoints });
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainSection coins={points} onClick={handleClick} />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
