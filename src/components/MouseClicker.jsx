import { motion } from 'framer-motion';
import clickIcon from '../assets/icon-click.png';

const MouseClicker = ({ onClick }) => {
  return (
    <motion.div
      className="relative w-[80vw] max-w-[180px] aspect-[3/5] flex items-center justify-center cursor-pointer select-none"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      <div
        className="w-[170px] h-[170px] rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom right, #C9ABD4, #6B4479)',
          boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.25)',
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
