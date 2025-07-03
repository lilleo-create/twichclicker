import React from 'react';
import Counter from './Counter';
import MouseClicker from './MouseClicker';
import ViewersCounter from './ViewersCounter';

const MainSection = ({ coins, onClick, viewers }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-40 pt-12 relative">
      <ViewersCounter viewers={viewers} />
      <Counter coins={coins} />
      <MouseClicker onClick={onClick} />
    </div>
  );
};

export default MainSection;
