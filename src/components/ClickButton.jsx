// src/components/ClickButton.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const Spark = ({ id }) => {
  const angle = Math.random() * Math.PI * 2; // любое направление
  const distance = 40 + Math.random() * 20;

  return (
    <motion.div
      key={id}
      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
      initial={{
        opacity: 1,
        scale: 1,
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        opacity: 0,
        scale: 2,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 30, // вверх
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  );
};


const ClickButton = ({ onClick }) => {
  const [sparks, setSparks] = useState([]);

  const handleClick = () => {
    const id = Date.now();
    setSparks((prev) => [...prev, { id }]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, 500);
  
    onClick();
  };
  

  return (
    <div className="relative w-32 h-32">
      {sparks.map((s) => (
        <Spark key={s.id} x={s.x} y={s.y} />
      ))}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        onClick={handleClick}
        className="w-full h-full bg-[#9146FF] text-5xl text-white rounded-full flex items-center justify-center shadow-xl transition-all"
      >
        🎮
      </motion.button>
    </div>
  );
};

export default ClickButton;
