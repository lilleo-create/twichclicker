import MouseClicker from './MouseClicker';
import { useState } from 'react';

const MainSection = () => {
  const [points, setPoints] = useState(0);

  const handleClick = () => {
    setPoints((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-40 flex-1 text-center p-4">
      <h1 className="text-4xl font-bold text-white mb-4">{points}</h1>
      <MouseClicker onClick={handleClick} />
    </main>
  );
};

export default MainSection;
