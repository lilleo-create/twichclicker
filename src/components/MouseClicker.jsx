import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clickIcon from "../assets/icon-click.png";

const MouseClicker = ({ onClick }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className="relative w-[80vw] max-w-[180px] aspect-[3/5] w-[131px] h-[130px] rounded-full flex items-center justify-center cursor-pointer select-none"
      style={{
        background: "linear-gradient(to bottom right, #C9ABD4, #6B4479)",
        boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.25)"
      }}
    >
      <img
        src={clickIcon}
        alt="Click"
        className="w-10 h-10 pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
};

export default MouseClicker;