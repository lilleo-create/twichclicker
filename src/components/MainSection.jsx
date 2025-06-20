// src/components/MainSection.jsx
import React from 'react';
import ClickButton from './ClickButton';

const MainSection = ({ coins, onClick }) => {
  return (
    <main className="flex flex-col items-center justify-center flex-1 text-center p-4">
      <h1 className="text-4xl font-bold text-white mb-4">{coins}</h1>
      <p className="text-sm text-purple-300 mb-6">Очки хайпа</p>
      <ClickButton onClick={onClick} />
    </main>
  );
};

export default MainSection;
