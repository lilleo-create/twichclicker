import React from 'react';
import eyeIcon from '../assets/eye.png';

const ViewersCounter = ({ viewers }) => {
  return (
    <div className="absolute top-4 left-4 flex items-center gap-2 text-white">
      <img src={eyeIcon} alt="Зрители" className="w-7 h-7" />
      <span className="text-sm font-medium">{viewers}</span>
    </div>
  );
};

export default ViewersCounter;
