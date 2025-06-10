import { useState, useEffect } from 'react';
import MainSection from './components/MainSection';
import BottomNav from './components/BottomNav';
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
    <div className="container">
      <MainSection coins={coins} onClick={handleClick} />
      <BottomNav />
    </div>
  );
}

export default App;
