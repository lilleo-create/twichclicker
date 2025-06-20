import { motion } from "framer-motion";
import ButtonClick from "../assets/ButtonClick.png";

function ClickButton({ handleClick }) {
  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      className="w-[120px] h-[120px] p-0 border-none bg-transparent rounded-full overflow-hidden"
    >
      <img
        src={ButtonClick}
        alt="Click"
        className="w-full h-full object-contain pointer-events-none"
      />
    </motion.button>
  );
}

export default ClickButton;
