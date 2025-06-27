import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clickIcon from '../assets/icon-click.png';
import { saveUserData, getUserId } from '../api/api';

const MouseClicker = () => {
  const [coins, setCoins] = useState(0);

  const handleClick = async () => {
    const newCoins = coins + 1;
    setCoins(newCoins);

    const userId = getUserId();
    console.log('➡️ Сохраняем:', userId, newCoins);

    try {
      await saveUserData(userId, { coins: newCoins });
    } catch (err) {
      console.error('❌ Ошибка сохранения:', err);
    }
  };

  return (
    <motion.div
      className="relative w-[80vw] max-w-[180px] aspect-[3/5] cursor-pointer select-none"
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
    >
      <div
        className="w-[131px] h-[130px] rounded-full flex items-center justify-center select-none"
        style={{
          background: 'linear-gradient(to bottom right, #C9ABD4, #6B4479)',
          boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.25)'
        }}
      >
        <img
          src={clickIcon}
          alt="Click"
          className="w-10 h-10 pointer-events-none"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

export default MouseClicker;
