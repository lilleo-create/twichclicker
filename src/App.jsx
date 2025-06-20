import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSection from './components/MainSection';
import Shop from './components/Shop';
import BottomNav from './components/BottomNav';

import './App.css';
import { useState, useEffect } from 'react';
import { getUserData, saveUserData } from './api/api';

function App() {
  const tg = window?.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id || 'debug-user-id';
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (userId) {
      getUserData(userId).then((data) => {
        if (data?.points) setPoints(data.points);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (tg?.expand) tg.expand();
  }, []);

  const handleClick = () => {
    const newPoints = points + 1;
    setPoints(newPoints);
    saveUserData(userId, { points: newPoints });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/background.png')` }}>
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
