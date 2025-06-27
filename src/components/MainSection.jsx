import React from 'react';
import Counter from './Counter';
import MouseClicker from './MouseClicker';

const MainSection = ({ coins, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-40 pt-12">
      <Counter coins={coins} />
      <MouseClicker onClick={onClick} />
    </div>
  );
};

export default MainSection;
