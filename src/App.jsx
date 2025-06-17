import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainSection from './components/MainSection';
import BottomNav from './components/BottomNav';
import Shop from './components/Shop';

import './App.css';

function App() {
  const [coins, setCoins] = useState(0);

  const handleClick = () => {
    setCoins(prev => prev + 1);
  };

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      Telegram.WebApp.expand();
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainSection coins={coins} onClick={handleClick} />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
