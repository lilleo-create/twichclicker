import { useState } from "react";
import { motion } from "framer-motion";
import mouseBody from "../assets/mouse-body.png";
import mouseButton from "../assets/mouse-button-left.png";

const MouseClicker = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick?.();
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <div
      className="relative w-[80vw] max-w-[120px] aspect-[3/5] cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Фон мыши */}
      <img
        src={mouseBody}
        alt="Mouse Body"
        className="absolute top-0 left-0 w-full h-full"
        draggable={false}
      />

      {/* Кнопка */}
      <motion.img
        src={mouseButton}
        alt="Left Button"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{ scale: isPressed ? 0.993 : 1 }}
        transition={{ duration: 0.1 }}
        draggable={false}
      />
    </div>
  );
};

export default MouseClicker;
