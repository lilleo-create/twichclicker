import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clickIcon from "../assets/icon-click.png";

const MouseClicker = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      Telegram.WebApp.ready();
      Telegram.WebApp.sendData(JSON.stringify({ test: "hello from frontend" }));
      console.log("✅ TG WebApp initialized and test sent");
    } else {
      console.warn("❌ Telegram WebApp not available");
    }
  }, []);

  const handleClick = () => {
    setIsPressed(true);

    if (window.Telegram?.WebApp) {
      Telegram.WebApp.sendData(JSON.stringify({ clicks: 1 }));
      console.log("📤 Sent clicks: 1");
    }

    onClick?.();
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <motion.div
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className="w-[131px] h-[130px] rounded-full flex items-center justify-center select-none"
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
