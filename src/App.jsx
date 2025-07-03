import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSection from './components/MainSection';
import Shop from './components/Shop';
import BottomNav from './components/BottomNav';
import { getUserData, saveUserData } from './api/api';
import { UPGRADE_CONFIG } from './config/upgradesConfig';

function App() {
  const tg = window?.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id || null;

  const [coins, setCoins] = useState(0);
  const [upgrades, setUpgrades] = useState({});
  const [clickPower, setClickPower] = useState(1);
  const [viewers, setViewers] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(Date.now());

  useEffect(() => {
    if (tg) tg.ready();
  }, []);

  // Загрузка данных
  useEffect(() => {
    if (userId) {
      getUserData(userId).then((data) => {
        setCoins(data?.coins || 0);
        setUpgrades(data?.upgrades || {});
        setViewers(data?.viewers || 0);
      });
    }
  }, [userId]);

  // Подсчёт clickPower
  useEffect(() => {
    let power = 1;
    for (const id in upgrades) {
      const qty = upgrades[id];
      const upgrade = UPGRADE_CONFIG.find((u) => u.id === id);
      if (!upgrade || qty <= 0) continue;
      power += upgrade.clickBonus * qty;
    }
    setClickPower(power);
  }, [upgrades]);

  // Автоматическое добавление зрителей каждые 10–30 сек
  useEffect(() => {
    let isMounted = true;

    const addViewers = () => {
      if (!isMounted) return;

      const afk = Date.now() - lastClickTime > 60000;
      const gain = afk
        ? Math.floor(Math.random() * 2) + 1  // 1–2
        : Math.floor(Math.random() * 3) + 2; // 2–4

      setViewers((prev) => {
        const updated = prev + gain;
        saveUserData(userId, { coins, upgrades, viewers: updated });
        return updated;
      });
    };

    const interval = setInterval(() => {
      addViewers();
    }, Math.random() * 20000 + 10000); // 10–30 сек

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [coins, upgrades, userId, lastClickTime]);

  // Клик по кнопке
  const handleClick = () => {
    const newCoins = coins + clickPower;
    setCoins(newCoins);
    setLastClickTime(Date.now());

    saveUserData(userId, {
      coins: newCoins,
      upgrades,
      viewers,
    });
  };

  if (!userId) {
    return (
      <div className="text-black p-4 text-center">
        <p>Ошибка: Telegram WebApp не передал <code>user.id</code></p>
        <p>Пожалуйста, открой мини-приложение через Telegram → кнопку «Открыть игру»</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
          <source src="./bg_loop.mp4" type="video/mp4" />
        </video>

        <Routes>
          <Route
            path="/"
            element={<MainSection coins={coins} onClick={handleClick} viewers={viewers} />}
          />
          <Route
            path="/shop"
            element={
              <Shop
                coins={coins}
                setCoins={setCoins}
                upgrades={upgrades}
                setUpgrades={setUpgrades}
                userId={userId}
              />
            }
          />
        </Routes>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
